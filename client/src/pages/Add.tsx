import { useState } from 'react';
import { ApiResponse, BlogRequest } from '../types/blog.type';
import axios from 'axios';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const Add = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BlogRequest>();

  const saveForm: SubmitHandler<BlogRequest> = async (data) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('post', data.post);
    if (data.image && data.image[0]) {
      formData.append('file', data.image[0]);
    }
    try {
      const apiUrl = import.meta.env.VITE_API_ROOT;

      if (!apiUrl) {
        throw new Error('API URL tidak ditemukan di environment variables');
      }
      const response = await axios.post<ApiResponse>(apiUrl, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status === 201) {
        console.log(response);
        navigate('/');
      }
      setIsLoading(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response);
      }
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-6">Add New Post</h1>
      <form onSubmit={handleSubmit(saveForm)} className="space-y-6">
        <div>
          <label className="block mb-2 text-sm font-medium">Post Title</label>
          <input
            defaultValue=""
            className={`block w-full px-4 py-2 border rounded ${
              errors.title ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Please enter title"
            {...register('title', {
              required: { value: true, message: 'Title is required.' },
              minLength: {
                value: 3,
                message: 'Title should be minimum 3 characters.',
              },
            })}
          />
          {errors.title?.message && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium">Post Content</label>
          <textarea
            defaultValue=""
            className={`block w-full px-4 py-2 border rounded ${
              errors.post ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Please enter post content"
            {...register('post', {
              required: { value: true, message: 'Post content is required.' },
            })}
          />
          {errors.post?.message && (
            <p className="text-red-500 text-sm mt-1">{errors.post.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium">Image</label>
          <input
            type="file"
            className={`block w-full px-4 py-2 border rounded ${
              errors.image ? 'border-red-500' : 'border-gray-300'
            }`}
            {...register('image')}
          />
        </div>

        <div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default Add;
