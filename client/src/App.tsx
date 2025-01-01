import { useEffect, useState } from "react"
import { Col, Container, Row } from "react-bootstrap"
import axios from "axios"
import "./App.css"

interface BlogRecord {
  title: string;
  post: string;
}

interface ApiResponse {
  blog_records: BlogRecord[];
  message: string;
  statusText: string;
}

function App() {
  const [apiData, setApiData] = useState<BlogRecord[]>([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_ROOT;
        if (!apiUrl) {
          throw new Error('API URL tidak ditemukan di environment variables');
        }
        const response = await axios.get<ApiResponse>(apiUrl);
        if (response.status === 200) {
          if (response?.data.statusText === "Ok"){
            setApiData(response?.data?.blog_records);
          }
        }
      
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log(error.response)
        }
      }
    }

    fetchData()
  }, [])
  console.log(apiData)

  return (
    <Container>
      <Row>
        <Col xs={12}>
          <h1 className="text-center">React with golang</h1>
        </Col>
        {apiData.length > 0 && (
          apiData.map((record, index) => {
            return (
              <Col xs={4} key={index} className="py-5 box"> 
                <div className="title">{record.title}</div>
                <div>{record.post}</div>
              </Col>
            )
          })
        )}
      </Row>
    </Container>
  )
}

export default App
