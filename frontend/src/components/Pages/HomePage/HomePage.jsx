import { Link } from 'react-router-dom';
import Layout from '../../Layout/Layout';
import "./HomePage.css"
const HomePage = () => (
    <Layout>
        <div className="home-container">
            <h1 className="home-title">Welcome to Human Blog Creator</h1>
            <p className="home-subtitle">
                Generate  blogs effortlessly in seconds.
            </p>
            <Link to="/create" className="home-button">
                Get Started
            </Link>
        </div>
    </Layout>

);

export default HomePage;