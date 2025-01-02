import { useEffect, useState } from "react"
import { Col, Container, Row } from "react-bootstrap"
import axios from "axios"
import { ApiResponse, BlogRecord } from "../types/blog.type"
import { Link, useLocation } from "react-router-dom"
import Spinner from 'react-bootstrap/Spinner';

function Home() {
  const [apiData, setApiData] = useState<BlogRecord[]>([])
  const [isLoading, setIsLoading] = useState<Boolean>(true)
  const location = useLocation()
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
        setIsLoading(false)
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log(error.response)
        }
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])
  console.log(apiData)

  if (isLoading) {
    return (
        <>
        <Container className="spinner">
            <Spinner animation="border" />
        </Container>
        </>
    )
  }
  return (
    <Container>
      <Row>
        <Col xs={12}>
          <h1 className="text-center">React with golang</h1>
        </Col>
        <h3>
            <Link to={`/add`} className="btn btn-primary">Add New</Link>
        </h3>
        <h5>{location.state && location.state}</h5>
        {apiData.length > 0 && (
          apiData.map((record, index) => {
            return (
              <Col xs={4} key={index} className="py-5 box"> 
                    <div className="title">
                        <Link to={`/blog/${record.id}`}>{record.title}</Link>
                    </div>
                    <div>
                        <Link to={`/edit/${record.id}`}><div className="btn btn-warning">Edit</div></Link>
                        <Link to={`/delete/${record.id}`}><div className="btn btn-danger">Delete</div></Link>
                    </div>
                <div>{record.post}</div>
              </Col>
            )
          })
        )}
      </Row>
    </Container>
  )
}

export default Home
