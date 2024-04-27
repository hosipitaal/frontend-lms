import React from "react";
import { Link } from "react-router-dom";
import './Navbar.css'

function Navbar(){  
    return (
        <div className="navbar">
        <div className="navbar-logo">
            LMS
        </div>
        <ul id="navigation">
            <li><Link to={'/'}>Sign Out</Link></li>
            {/* <li><Link to={'/ApplyLeave'}>Apply Leave</Link></li> */}
            <li><Link to={'/AllLeaves'}>Leaves</Link></li>
        </ul>
    </div>
    )
}

export default Navbar;