import React from "react";
import Direct from "./Components/Direct";
import Explore from "./Components/Explore";
import Home from "./Components/Home";

const routes = [
    {
        path: '/',
        element: () => <Home />
    },
    {
        path: '/direct',
        element: () => <Direct />
    },
    {
        path: '/explore',
        element: () => <Explore />
    }
]

export default routes;