import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { ApiResponse } from '../types/blog.type';

const Delete = () => {
  const params = useParams();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const apiUrl = `${import.meta.env.VITE_API_ROOT}/${params.id}`;

      if (!apiUrl) {
        throw new Error('API URL tidak ditemukan di environment variables');
      }
      const response = await axios.delete<ApiResponse>(apiUrl);
      if (response.status === 200) {
        navigate('/', {
          state: 'Record Deleted Successfully',
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-center mb-6">
        Are you sure you want to delete this record?
      </h1>
      <div className="flex justify-center">
        <button
          className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
          onClick={handleDelete}
        >
          Proceed
        </button>
      </div>
    </div>
  );
};

export default Delete;
