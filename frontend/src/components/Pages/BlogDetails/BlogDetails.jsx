import { useEffect , useState} from "react";
import { useLocation, useParams } from "react-router-dom";
import Layout from "../../Layout/Layout";
import "./BlogDetails.css"
import axiosInstance from "../../../utils/authUtils";


const BlogDetails = () => {
    const {slug} = useParams();
    const location = useLocation();
    const [blog , setBlog] = useState(null);

    const blogId = location.state?.blogId;

    useEffect(() => {
      if (blogId) {
        fetchBlogById(blogId);
      } else if (slug) {
        fetchBlogBySlug(slug);
    }      
    }, [blogId , slug]);

    const fetchBlogById = async (id) => {
      try {
        const response = await axiosInstance.get(`/api/ai/blog/id/${id}`);
        if (response.data.success) {
          setBlog(response.data.data);
        }
      } catch (error) {
        console.error("ERROR:", error);
      }
    };
    const fetchBlogBySlug = async (slug) => {
      try {
        const response = await axiosInstance.get(`/api/ai/blog/slug/${slug}`);
        if (response.data.success) {
          setBlog(response.data.data);
        }
      } catch (error) {
        console.error("ERROR:", error);
      }
    };

  if (!blog) {
    return (
      <Layout>
        <div style={{ padding: "40px" }}>Loading...</div>
      </Layout>
    );
  }

    return (
    <Layout>
      <div className="blog-details">
        <h1>{blog.topic}</h1>
        <p className="time">
          {new Date(blog.createdAt).toLocaleString()}
        </p>
        <div className="full-content">{blog.script}</div>
      </div>
    </Layout>
  );
};

export default BlogDetails;