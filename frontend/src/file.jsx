import { useEffect , useState} from "react";
import { useParams } from "react-router-dom";
import Layout from "../../Layout/Layout";
import "./BlogDetails.css"
import axiosInstance from "../../../utils/authUtils";


const BlogDetails = () => {
    const {id} = useParams();;
    const [blog , setBlog] = useState(null);
    const [splitContent, setSplitContent] = useState(null);

    useEffect(() => {
        fetchBlog();
    }, [id]);

    const fetchBlog = async () => {
    try {
      const response = await axiosInstance.get( `/api/ai/blog/${id}`);

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