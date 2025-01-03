import { Route, Routes } from "react-router-dom"
import "./App.css"
import Home from "./pages/Home"
import Blog from "./pages/Blog"
import Add from "./pages/Add"
import Edit from "./pages/Edit"
import Delete from "./pages/Delete"

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/blog/:id" element={<Blog/>}/>
      <Route path="/add" element={<Add/>}/>
      <Route path="/edit/:id" element={<Edit/>}/>
      <Route path="/delete/:id" element={<Delete/>}/>
    </Routes> 
  )
}

export default App