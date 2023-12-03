import { Button } from "@mui/material";
import Blogs from "./Blog";
import ViewBlogs from "./viewBlog";
import BlogForm from "./addBlog";

export default function TestComponent() {
    return (
        <>
            <BlogForm />
            <Blogs />
            {/* <BlogForm /> */}
        </>
    );
}
