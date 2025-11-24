import { createContext, useContext } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const appContext = createContext();

export const AppProvider = ({children}) => {

    const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    delete axios.defaults.headers.common['Authorization'];
    navigate("/");  // or whatever your login route is
};

     const navigate = useNavigate();

     const [token, setToken] = useState(null);
     const [blogs, setBlogs] = useState([]);
     const [input, setInput] = useState("");

     const fetchBlogs = async () => {
        try {
            const {data} = await axios.get('/api/blogs/all');
            data.success ? setBlogs(data.blogs) : popup.error("Could not fetch blogs")
        }
        catch (error) {
            alert("Error fetching blogs:", error);
        }
        }
        useEffect(() => {
            fetchBlogs();
            const token = localStorage.getItem("token");
            if (token) {
                setToken(token);
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            }
        }
    , []);

    return (
        <appContext.Provider value={{token, setToken, blogs, setBlogs, input, setInput, navigate , axios,logout}}>
            {children}
        </appContext.Provider>
    )
}

export const useAppContext = () => {
    return useContext(appContext);
}