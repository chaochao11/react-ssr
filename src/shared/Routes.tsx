import React from "react";
import Home from './Home';
import About from './About';

{/*<Switch>*/}
    {/*<Route exact path="/">*/}
        {/*<Home />*/}
    {/*</Route>*/}
    {/*<Route path="/about">*/}
        {/*<About />*/}
    {/*</Route>*/}
{/*</Switch>*/}

const routes = [
    {
        path: "/",
        exact: true,
        component: Home
    },
    {
        path: "/about",
        component: About,
        loadData: About.loadData,
    }
];

export default routes;
