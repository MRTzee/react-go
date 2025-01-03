import { useEffect, useState } from 'react'
import { BlogRecord } from '../types/blog.type'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Col, Container, Row } from 'react-bootstrap'

const Blog = () => {
    const [apiData, setApiData] = useState<BlogRecord | null>(null)
    const params = useParams()
    console.log(params)
    useEffect(() => {
        const fetchData = async () => {
        try {
            const apiUrl = import.meta.env.VITE_API_ROOT+"/"+params.id;
            
            if (!apiUrl) {
            throw new Error('API URL tidak ditemukan di environment variables');
            }
            const response = await axios.get(apiUrl);
            if (response.status === 200) {
            if (response?.data.statusText === "Ok"){
                setApiData(response?.data?.record);
            }
            }
        
        } catch (error) {
            if (axios.isAxiosError(error)) {
            console.log(error.response)
            }
        }
        }

        fetchData()
    }, [params.id])
    console.log(apiData)
  return (
    <Container>
        <Row>
            <Col xs={12}>
                <h1>{apiData?.title}</h1>
            </Col>
            <Col xs={12}>
                <p>{apiData?.post}</p>
            </Col>
        </Row>
    </Container>
  )
}

export default Blog