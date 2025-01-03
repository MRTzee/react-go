import { useEffect, useState } from "react";
import axios from "axios";
import { ApiResponse, BlogRecord } from "../types/blog.type";
import { Link, useLocation } from "react-router-dom";

function Home() {
  const [apiData, setApiData] = useState<BlogRecord[]>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_ROOT;
        if (!apiUrl) {
          throw new Error("API URL tidak ditemukan di environment variables");
        }
        const response = await axios.get<ApiResponse>(apiUrl);
        if (response.status === 200) {
          if (response?.data.statusText === "Ok") {
            setApiData(response?.data?.blog_records);
          }
        }
        setIsLoading(false);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log(error.response);
        }
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
  console.log(apiData);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">React with Golang</h1>
      </div>
      <div className="mb-4">
        <Link
          to={`/add`}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add New
        </Link>
      </div>
      {location.state && (
        <h5 className="text-gray-600 mb-4">{location.state}</h5>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {apiData.length > 0 &&
          apiData.map((record, index) => (
            <div
              key={index}
              className="p-4 border rounded shadow-md bg-white"
            >
              <div className="text-xl font-semibold mb-2">
                <Link to={`/blog/${record.id}`} className="text-blue-500">
                  {record.title}
                </Link>
              </div>
              <div className="flex gap-2 mb-2">
                <Link
                  to={`/edit/${record.id}`}
                  className="px-4 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                >
                  Edit
                </Link>
                <Link
                  to={`/delete/${record.id}`}
                  className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </Link>
              </div>
              <div>{record.post}</div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Home;
