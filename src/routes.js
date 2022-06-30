import {DashBoard} from "./pages/DashBoard";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Home from "./pages/Home";

export const routes = [
    {
        path: "/",
        exact: true,
        main: <Home/>
    },
    {
        path: "/about",
        exact: true,
        main: <About/>
    },
    {
        path: "/contact",
        exact: true,
        main:<Contact/>
    },
    {
        path: "/dashboard",
        exact: true,
        main:<DashBoard/>
    },
    
]