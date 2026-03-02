import {BrowserRouter as Router , Routes , Route} from 'react-router-dom';
import { lazy , Suspense } from "react";
const BlogHistory = lazy(() => import('./components/Pages/BlogHistory/BlogHistory'));
const HomePage = lazy(() => import('./components/Pages/HomePage/HomePage'))
const BlogCreationPage = lazy(() => import('./components/Pages/BlogCreationPage/BlogCreationPage'))
const BlogDetails = lazy(() => import('./components/Pages/BlogDetails/BlogDetails'))
const Login = lazy(() => import('./components/Pages/Login/Login') );
const Editor = lazy(() => import('./components/Pages/Editor/Editor'))
function App( ){
  return (
    <Router>
      <Suspense fallback = {<div className="loader">Loading page...</div>}>
      <Routes>
        <Route path="/home" element={<HomePage />}/>
        <Route path="/create" element = {<BlogCreationPage/>} />
        <Route path = "/history" element = {<BlogHistory />} />
        <Route path="/blog/:slug" element={<BlogDetails />} />
        <Route path = "/" element = {<Login />} />
        <Route path = "/editor" element = {<Editor />} />
      </Routes>
      </Suspense>
    </Router>
  )
}

export default App;