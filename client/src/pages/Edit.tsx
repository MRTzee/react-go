import { useEffect, useState } from 'react';
import { ApiResponse, BlogRecord } from '../types/blog.type';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

const Edit = () => {
  const [apiData, setApiData] = useState<BlogRecord | null>(null);
  const params = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = `${import.meta.env.VITE_API_ROOT}/${params.id}`;

        if (!apiUrl) {
          throw new Error('API URL tidak ditemukan di environment variables');
        }
        const response = await axios.get(apiUrl);
        if (response.status === 200) {
          if (response?.data.statusText === 'Ok') {
            setApiData(response?.data?.record);
          }
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log(error.response);
        }
      }
    };

    fetchData();
  }, [params.id]);

  const saveForm = async (data: any) => {
    setIsLoading(true);
    try {
      const apiUrl = `${import.meta.env.VITE_API_ROOT}/${params.id}`;

      if (!apiUrl) {
        throw new Error('API URL tidak ditemukan di environment variables');
      }
      const response = await axios.put<ApiResponse>(apiUrl, data);
      if (response.status === 200) {
        console.log(response);
        navigate('/', {
          state: 'Save Successfully',
        });
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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Edit Post</h1>
      <form onSubmit={handleSubmit(saveForm)} className="space-y-6">
        <div>
          <label className="block mb-2 text-sm font-medium">Post Title</label>
          <input
            defaultValue={apiData?.title}
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
            <p className="text-red-500 text-sm mt-1">{errors.title.message as string}</p>
          )}
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium">Post Content</label>
          <textarea
            defaultValue={apiData?.post}
            className={`block w-full px-4 py-2 border rounded ${
              errors.post ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Please enter post content"
            {...register('post', {
              required: { value: true, message: 'Post content is required.' },
            })}
          />
          {errors.post?.message && (
            <p className="text-red-500 text-sm mt-1">{errors.post.message as string}</p>
          )}
        </div>

        <div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
