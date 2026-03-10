import Layout from "../../Layout/Layout";
import "./NewsCreationPage.css";
import NewsForm from "../../Forms/NewsForm/NewsForm";

const NewsCreationPage = () => {
    return(
        <Layout>
            <div className="news-page">
                <div className="page-header">
                    <h1>Create News Article</h1>
                    <p>Generate fact-based news articles.</p>
                </div>

                <div className="form-section">
                    <NewsForm />
                </div>
            </div>
        </Layout>
    )
};

export default NewsCreationPage;