import { useState } from 'react'
import { ApiResponse } from '../types/blog.type'
import axios from 'axios'
import { Col, Container, Row, Spinner } from 'react-bootstrap'
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom'

const Add = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const navigate = useNavigate()
    const {register, handleSubmit, formState : {errors}} = useForm()
    const saveForm = async(data : any) => {
        setIsLoading(true)
        try {
            const apiUrl = import.meta.env.VITE_API_ROOT;
            
            if (!apiUrl) {
            throw new Error('API URL tidak ditemukan di environment variables');
            }
            const response = await axios.post<ApiResponse>(apiUrl, data);
            if (response.status === 201) {
                console.log(response)
                navigate("/")
            }
            setIsLoading(false)
        } catch (error) {
            if (axios.isAxiosError(error)) {
            console.log(error.response)
            }
            setIsLoading(false)
        }
    }

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
        <h1>Add New Post</h1>
        <form onSubmit={handleSubmit(saveForm)}>
            <Row>
                <Col xs={12} className='py-3'>
                    <label>Post Title</label>
                    <input defaultValue="" className={`$errors.title && "text-danger"`} placeholder='Please enter title' 
                    {...register("title", 
                        { 
                            required : {value : true, message: "Title is required. "},
                            minLength : {value : 3, message: "Title should be minimum 3 character"},
                        }) 
                    }/>
                    { errors.title && <div className='text-danger'>{errors.title.message}</div>}
                </Col>
                <Col xs={12} className='py-3'>
                    <label>Post Content</label>
                    <input defaultValue="" className={`$errors.post && "text-danger"`} placeholder='Please enter Post' 
                    {...register("post", 
                        { 
                            required : {value : true, message: "Post content is required. "},
                        }) 
                    }/>
                    { errors.post && <div className='text-danger'>{errors.post.message}</div>}
                </Col>
                <Col>
                    <button type='submit'>Save</button>
                </Col>
            </Row>
        </form>
    </Container>
  )
}

export default Add