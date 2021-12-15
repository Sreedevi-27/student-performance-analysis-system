import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { API_END_POINT } from "../../config";
import { getLoggedInUserId, getLoggedInUserToken } from "../../utlils";

import avatar from "../../images/user.svg";
import "./Student.css";

function Principal() {
  const [info, setInfo] = useState(null);
  const { principalId: pid } = useParams();
  const principalId = pid || getLoggedInUserId();
  const token = getLoggedInUserToken();
  useEffect(
    function () {
      window
        .fetch(`${API_END_POINT}/principal/${principalId}`, {
          headers: { token },
          mode: "cors",
          credentials: "include",
        })
        .then((response) => response.text())
        .then((result) => setInfo(JSON.parse(result)))
        .catch((error) => console.log("error", error));
    },
    [principalId, token]
  );

  if (!info) return null;

  return (
    <div className="home">
      <h1 className="home__heading">Profile</h1>
      <div className="details">
        <div className="avatar-img">
          <img src={avatar} height={100} alt="avatar" />
        </div>
        <div className="row">
          <div className="label">Name</div>
          <div className="value">{info.name}</div>
        </div>
        <div className="row">
          <div className="label">Principal ID</div>
          <div className="value">{info.id}</div>
        </div>
        <div className="row">
          <div className="label">Email ID</div>
          <div className="value">{info.email_id}</div>
        </div>
        <div className="row">
          <div className="label">Contact Number</div>
          <div className="value">{info.contact_number}</div>
        </div>
        <div className="row">
          <div className="label">City</div>
          <div className="value">{info.city}</div>
        </div>
      </div>
    </div>
  );
}

export default Principal;
