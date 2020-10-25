import React from "react";
import NavBar from "../NavBar/NavBar"

function Header() {
    return (
        <>
            <header>
                <div style={{ position: "absolute", top: "6px", left: "10px", fontSize:"2em" }}>React-Crud-Demo</div>
                <NavBar />
            </header>
        </>
    );
}

export default Header;