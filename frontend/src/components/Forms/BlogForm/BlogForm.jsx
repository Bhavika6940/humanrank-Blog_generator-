import {useState} from 'react';
import "./BlogForm.css";
import axiosInstance from '../../../utils/authUtils';



const BlogForm = () => {
    const [topic , setTopic]= useState("");
    const [result, setResult] = useState(null);
    const [loading , setLoading] = useState(false);

    const parseBlogContent = (rawScript) => {
        if (!rawScript) return null;
        const cleanText = rawScript.replace(/```/g,"").trim();

        
        const parts = cleanText.split("|||").map(part => part.trim());

        return {
            intro : parts[0] || "",
            toc : parts[1] || "",
            body : parts[2] || "",
            faqs : parts[3] || "",
            bottomLine : parts[4] || ""
        };
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setResult(null);
        
        try{
            const response = await axiosInstance.post(
                "/api/ai",
                {topic}
            );
            if(response.data.success){
                const parsedContent = parseBlogContent(response.data.result.script);
                setResult({
                    ...response.data.result,
                   splitContent : parsedContent
            });
            }
            else{
                alert("API return an error");
            }
        }
        catch(error){
            console.error("Error calling API:", error);
            Swal.fire({
            icon: 'warning',
            title: 'Mission Failed',
            text: 'Something went wrong while generating the blog!',
            confirmButtonColor: '#f39c12'
        });
        }
        finally{
            setLoading(false);
        }
    };

    return (
        <div className="blog-container">
            <div className="blog-card">
            <h2>Create Blog</h2>

            <form onSubmit={handleSubmit} className="blog-form">
                <div className="form-group">
                <label>Topic</label>
                <input
                    type="text"
                    placeholder="Enter blog topic..."
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    required
                />
                </div>

                <button type="submit" className="generate-btn" disabled={loading}>
                    {loading ? "Generating..." : "Generate Blog"}
                </button>
            </form>
            </div>

            {loading && <div className= "loading-spinner">Processing...</div>}

            {result && !loading && (
            <div className="result-card">
                
                <div className="blog-section intro-content">
                    {result.splitContent.intro}
                </div>

                <div className="blog-section toc-content">
                    <h3>Table Of Content</h3>
                    <div className="pre-wrap">{result.splitContent.toc}</div>
                </div>

                <div className="blog-section body-content">
                    <div className="pre-wrap">{result.splitContent.body}</div>
                </div>

                <div className = "blog-section faqs-content">
                    <h3>FAQs</h3>
                    <div className="pre-wrap">{result.splitContent.faqs}</div>
                </div>

                <div className="blog-section bottom-line-content">
                    <strong>{result.splitContent.bottomLine}</strong>
                </div>
                < hr/>


                <div className="seo-report">
                <h3>SEO Report</h3>
                <div className="seo-item">
                    <span>Helpfulness Score</span>
                    <strong>{result.seo_report.helpfulness_score * 100}%</strong>
                </div>
                <div className="seo-item">
                    <span>E-E-A-T Score</span>
                    <strong>{result.seo_report.eeat_score * 100}%</strong>
                </div>
                </div>
            </div>
            )}
        </div>
);

};

export default BlogForm;