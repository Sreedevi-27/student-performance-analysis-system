import NavigationLinks from "../NavigationLinks/NavigationLinks";
import Avatar from "../Avatar/Avatar";

import "./Header.css";
import { isLoggedIn } from "../../utlils";
import { useRouteMatch } from "react-router";

function Header() {
  const loginMatch = useRouteMatch("/login");

  if (loginMatch && loginMatch.isExact) return null;
  return (
    <header className="header">
      <div className="heading-container">
        <h1 className="heading">STS</h1>
      </div>
      <div className="nav-links-and-avatar-container">
        {isLoggedIn() && (
          <>
            <NavigationLinks />
            <div className="avatar-container">
              <Avatar letter="s" />
            </div>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
