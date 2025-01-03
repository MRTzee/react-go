import { useEffect, useState } from 'react';
import { BlogRecord } from '../types/blog.type';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Blog = () => {
  const [apiData, setApiData] = useState<BlogRecord | null>(null);
  const params = useParams();
  console.log(params);

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
  console.log(apiData);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">{apiData?.title}</h1>
      </div>
      <div>
        <p className="text-gray-700">{apiData?.post}</p>
      </div>
    </div>
  );
};

export default Blog;
