import { useEffect , useState , useRef} from "react";
import Layout from "../../Layout/Layout";
import "./BlogHistory.css"
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../utils/authUtils";


const BlogHistory = () => {

    const navigate = useNavigate();

    const [blogs , setBlogs] = useState([]);
    const [page , setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading , setLoading] = useState(false);
    const lastFetchedPage = useRef(0);

    useEffect(() => {
        const fetchBlogs = async () => {
            
            if (loading || !hasMore || lastFetchedPage.current === page) return;
            
            try {
                setLoading(true);
                const response = await axiosInstance.get(`/api/ai/blogs?page=${page}&limit=10`);

                if (response.data.success) {
                    const newBlogs = response.data.data;
                    
                    
                    lastFetchedPage.current = page;

                    if (newBlogs.length === 0) {
                        setHasMore(false);
                    } else {
                        
                        setBlogs((prev) => {
                            const existingIds = new Set(prev.map(b => b.id));
                            const uniqueNewBlogs = newBlogs.filter(b => !existingIds.has(b.id));
                            return [...prev, ...uniqueNewBlogs];
                        });
                    }
                }
            } catch (error) {
                console.error("Error fetching blogs:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, [page, hasMore]); 

    console.log(blogs);
    


    useEffect(() => {
        const handleScroll = () => {
            const scrollPos = window.innerHeight + document.documentElement.scrollTop;
            const threshold = document.documentElement.scrollHeight - 100;
            
            if (scrollPos >= threshold && hasMore && !loading) {
                setPage((prev) => prev + 1);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [hasMore, loading]);

    
    const groupedBlogs = blogs.reduce((acc, blog) => {
        const date = new Date(blog.createdAt).toLocaleDateString();
        if (!acc[date]) acc[date] = [];
        acc[date].push(blog);
        return acc;
    }, {});

    const sortedDates = Object.keys(groupedBlogs).sort((a, b) => new Date(b) - new Date(a));

    return (
        <Layout>
        <div className="blog-history">
            <h2>Blog History</h2>

            {sortedDates.map((date) => (
                <section key={date} className="date-section">
                    <h3 className="date-heading">{date}</h3>

                    {groupedBlogs[date]
                        .sort(
                            (a,b) => 
                                new Date(b.createdAt) - new Date(a.createdAt)
                        )
                        .map((blog) => (
                            <div 
                                key={blog.id} 
                                className= "blog-card"
                                onClick={() => navigate(`/blog/${blog.slug}`,{
                                    state : {blogId: blog.id}
                                })}
                                style={{ cursor : "pointer"}}
                            >
                                <h4>{blog.topic}</h4>
                                <p className = "time">
                                    {new Date(blog.createdAt).toLocaleTimeString()}
                                </p>
                                <p className="preview">
                                    {blog.script.substring(0,120)}...
                                </p>
                            </div>
                        ))}
                </section>
            ))}

            { loading && <p style = {{ textAlign : "center"}}>Loading...</p>}
            { !hasMore && (
                <p style={{ textAlign : "center"}}>
                    No more blogs to load
                </p>
            )
            }
        </div>
        </Layout>

    )
}

export default BlogHistory;


