import {useState} from "react";
import "./NewsForm.css";
import axiosInstance  from "../../../utils/authUtils";
import Swal from "sweetalert2";

const NewsForm = () => {
    const [topic , setTopic] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const cleanArticle = (text) => {
        if (!text) return "";

        return text
            .replace(/Here's an improved version of the news article:/gi, "")
            .replace(/\*\*\*/g, "")
            .replace(/\*\*/g, "")
            .replace(/\*/g, "")
            .replace(/\s+/g, " ")
            .trim();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setResult(null);

        try {
            const response = await axiosInstance.post("/api/ai/news" , {
                topic : topic
            });

            if(response.data.success){
                const cleanedArticle = cleanArticle(response.data.article);

                setResult({
                    topic: response.data.topic,
                    slug : response.data.slug,
                    article : cleanedArticle,
                    seo_report : response.data.seo_report
                })
            }
            else{
                Swal.fire({
                    icon : "error",
                    title : "API Error",
                    text : "API returned an error"
                });
            }
        }
        catch(error){
            console.error("API Error:", error);

            Swal.fire({
                icon : "warning",
                title : "Mission Failed",
                text : "Something went wrong while generating the news!",
                confirmButtonColor: "#f39c12"
            });
        }
        finally{
            setLoading(false);
        }
    };

    return (
        <div className="news-container">
            <div className = "news-card">
                <h2>Generate News Article</h2>
                <form onSubmit={handleSubmit} className="news-form">
                    <div className="form-group">
                        <label>News Topic</label>
                        <input 
                           type="text"
                           placeholder="Enter news topic..."
                           value={topic}
                           onChange={(e) => setTopic(e.target.value)}
                           required />

                           <button
                              type="submit"
                              className="generate-btn"
                              disabled={loading}>
                                {loading ? "Generating..." : "Generate News"}
                            </button>
                    </div>

                    <div>
                        {loading && (
                            <div className="loading-spinner">
                                   Processing News...   
                            </div>
                        )}

                        {result && !loading && (
                            <div className="result-card"> 
                                <h2>{result.topic}</h2>
                               
                               <div className="news-article">
                                    <p>{result.article}</p>
                                </div>

                                <hr />

                                <div className="seo-report"></div>
                                     <h3>SEO Report</h3>

                                     <div className="seo-item">
                                        <span>Helpfulness Score</span>
                                        <strong>
                                            {Math.round(result.seo_report.helpfulness_score* 100)}%
                                        </strong>
                                     </div>
                                     <div className="seo-item">
                                        <span>E-E-A-T Score</span>
                                        <strong>
                                            {Math.round(result.seo_report.eeat_score * 100)}%
                                        </strong>
                                        </div>
                                   
                                </div>
                            
                            
                            
                        )}
                    </div>
                </form>
            </div>
        </div>
    )
}

export default NewsForm;