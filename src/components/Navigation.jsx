import React from "react";
import { NavLink } from "react-router-dom";
import {
  AiOutlineHome,
  AiOutlineUser,
  AiOutlineBook,
  AiOutlineFileUnknown,
  AiOutlineThunderbolt

} from "react-icons/ai";


function Navigation() {
  return (
    <div className="navigation">
      <nav className="navbar navbar-expand ">
        <div className="container">
          <NavLink className="navbar-brand" to="/">
            DEGEN BOUNTY KILLER
          </NavLink>
          <div>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  <AiOutlineHome style={{ marginBottom: "2px" }} /> Home
                  <span className="sr-only">(current)</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/hunt">
                  <AiOutlineThunderbolt style={{ marginBottom: "2px" }} /> Hunt
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/roadmap">
                  <AiOutlineFileUnknown style={{ marginBottom: "2px" }} /> Roadmap
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/whitepaper">
                  <AiOutlineBook style={{ marginBottom: "2px" }} /> White paper
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/about">
                  <AiOutlineUser style={{ marginBottom: "2px" }} /> About
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navigation;
