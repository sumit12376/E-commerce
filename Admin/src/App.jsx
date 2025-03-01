import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";

import Add from "./pages/Add";
import List from "./pages/List";
import Order from "./pages/Order";
import Layout from "./Layout";
import Login from "./components/Login";

export const backendurl = import.meta.env.VITE_BACKEND_URL;

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : "");

  useEffect(() => {
    localStorage.setItem('token', token);
  }, [token]);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout token={token} setToken={setToken} />}>
      <Route index element={<Add token={token} />} /> 
      <Route path="/order" element={<Order token={token} />} />
      <Route path="/list" element={<List />} />
    </Route>
    
    )
  );

  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      {token ? <RouterProvider router={router} /> : <Login setToken={setToken} />}
      
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;