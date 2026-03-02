import BlogForm from  "../../Forms/BlogForm/BlogForm";
import Layout from '../../Layout/Layout';
import './BlogCreationPage.css';

const BlogCreationPage = () => {
    return (
        <Layout>
            <div className="blog-page">
                
                <div className="page-header">
                    <h1>Create Your Blog</h1>
                    <p>Generate high-quality blog content with SEO insights.</p>
                </div>

                <div className="form-section">
                    <BlogForm />
                </div>

            </div>
        </Layout>
    );
};

export default BlogCreationPage;
