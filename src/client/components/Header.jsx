import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <nav>
      <div className="nav-wrapper">
        <Link className="brand-logo" to="/">
          Logo
        </Link>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li>
            <Link to="/countries">Countries</Link>
          </li>
          <li>
            <Link to="/todos">Todos</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;
