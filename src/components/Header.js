import React from "react";
import { Link } from "react-router-dom";
export const Header = () => {
  return (
    <div className="">
      <nav className="nav--top">
        <ul>
          <li className="nav__item">
            <Link className="nav__item--link" to="/">
              Home
            </Link>
          </li>
          <li className="nav__item">
            <Link className="nav__item--link" to="/contact">
              Contact
            </Link>
          </li>
          <li className="nav__item">
            <Link className="nav__item--link" to="/about">
              About
            </Link>
          </li>
          <li className="nav__item">
            <Link className="nav__item--link" to="/dashboard">
              Dash board
            </Link>
          </li>
          
        </ul>
      </nav>
    </div>
  );
};
