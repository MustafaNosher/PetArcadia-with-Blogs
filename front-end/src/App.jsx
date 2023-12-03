import TestComponent from './components/TestComponent'
import Blogs from "./components/Blog";
import ViewBlogs from "./components/viewBlog";
import BlogForm from "./components/addBlog";
import BlogDetails from './components/Blogdetail';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path='/addblog' element={<BlogForm />}></Route>
          <Route path='/getblogs' element={<Blogs />}></Route>
          <Route path='/blogdetails/:id' element={<BlogDetails />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}
export default App
