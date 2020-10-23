import React from 'react';
import { NavLink } from "react-router-dom";

function NavBar() {
    const activeStyle = { color: "Orange" };
    return (
        <nav>
            <NavLink activeStyle={activeStyle} exact to="/">
                Home
            </NavLink>
            {" | "}
            <NavLink activeStyle={activeStyle} to="/tasks">
                Tasks
            </NavLink>
            {" | "}
            <NavLink activeStyle={activeStyle} exact to="/about">
                About
            </NavLink>
        </nav>
    )
}

export default NavBar;