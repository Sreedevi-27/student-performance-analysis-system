import { useEffect } from "react";
import {
  removeLoggedInUserId,
  removeLoggedInUserRole,
  removeLoggedInUserToken,
} from "../../utlils";

function Logout() {
  useEffect(() => {
    removeLoggedInUserId();
    removeLoggedInUserToken();
    removeLoggedInUserRole();
    window.location.replace("/login");
  }, []);

  return null;
}

export default Logout;
