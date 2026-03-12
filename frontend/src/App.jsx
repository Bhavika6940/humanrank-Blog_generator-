import {BrowserRouter as Router , Routes , Route} from 'react-router-dom';
import { lazy , Suspense } from "react";
import ProtectedRoute from "./components/AuthGuard/AuthGuard";
import { AuthProvider } from './components/context/AuthContext';
const BlogHistory = lazy(() => import('./components/Pages/BlogHistory/BlogHistory'));
const HomePage = lazy(() => import('./components/Pages/HomePage/HomePage'))
const BlogCreationPage = lazy(() => import('./components/Pages/BlogCreationPage/BlogCreationPage'))
const BlogDetails = lazy(() => import('./components/Pages/BlogDetails/BlogDetails'))
const Login = lazy(() => import('./components/Pages/Login/Login') );
const Editor = lazy(() => import('./components/Pages/Editor/Editor'));
const NewsCreationPage = lazy(() => import('./components/Pages/NewsCreationPage/NewsCreationPage'));
const PageNotFound = lazy(() => import('./components/Layout/PageNotFound/PageNotFound'))

function App( ){
  return (
    <AuthProvider>
    <Router>
      <Suspense fallback = {<div className="loader">Loading page...</div>}>
      <Routes>
        <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>}/>
        <Route path="/create" element = {<ProtectedRoute><BlogCreationPage/></ProtectedRoute>} />
        <Route path = "/history" element = {<ProtectedRoute><BlogHistory /></ProtectedRoute>} />
        <Route path="/blog/:slug" element={<ProtectedRoute><BlogDetails /></ProtectedRoute>} />
        <Route path = "/" element = {<Login />} />
        <Route path = "/editor" element = {<ProtectedRoute><Editor /></ProtectedRoute>} />
        <Route path = "/create-news" element = {<ProtectedRoute><NewsCreationPage /></ProtectedRoute>} />  
        <Route path='*' element= {<PageNotFound />} />
      </Routes>
      </Suspense>
    </Router>
    </AuthProvider>
  )
}

export default App;