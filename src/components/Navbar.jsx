import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return(
        <div>
            <nav>
                <ul className="flex h-14 justify-end bg-indigo-600 font-semibold text-white text-lg">
                    <Link to='/home' className="mx-8 my-3" >Home</Link>
                    {/* <li className="mx-8 my-3">About It</li> */}
                    {/* <Link to='/profile' className="mx-8 my-3">Profile</Link> */}
                    <Link to='/Register' className="mx-8 my-3">LogOut</Link>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar;