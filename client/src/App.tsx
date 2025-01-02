import { Route, Routes } from "react-router-dom"
import "./App.css"
import Home from "./pages/home"
import Blog from "./pages/blog"
import Add from "./pages/Add"

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/blog/:id" element={<Blog/>}/>
      <Route path="/add" element={<Add/>}/>
    </Routes> 
  )
}

export default App