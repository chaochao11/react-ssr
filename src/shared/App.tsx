import React from 'react';
import { renderRoutes } from "react-router-config";
import { Link } from "react-router-dom";
import routes from './Routes';

const App = () => {
    return (
        <div>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
                <li>
                    <Link to="/dashboard">Dashboard</Link>
                </li>
            </ul>

            <hr />
            {renderRoutes(routes)}
        </div>
    );
};

export default App;
