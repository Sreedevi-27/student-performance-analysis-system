import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { API_END_POINT } from "../../config";
import { getLoggedInUserId, getLoggedInUserToken } from "../../utlils";

import avatar from "../../images/user.svg";
import "./Student.css";

function Tutor() {
  const [info, setInfo] = useState(null);
  const { tutorId: tid } = useParams();
  const tutorId = tid || getLoggedInUserId();
  const token = getLoggedInUserToken();
  useEffect(
    function () {
      window
        .fetch(`${API_END_POINT}/tutors/${tutorId}`, {
          headers: { token },
          mode: "cors",
          credentials: "include",
        })
        .then((response) => response.text())
        .then((result) => setInfo(JSON.parse(result)))
        .catch((error) => console.log("error", error));
    },
    [tutorId, token]
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
          <div className="label">Tutor ID</div>
          <div className="value">{info.id}</div>
        </div>
        <div className="row">
          <div className="label">Email ID</div>
          <div className="value">{info.email}</div>
        </div>
        <div className="row">
          <div className="label">Department</div>
          <div className="value">{info.department}</div>
        </div>
        <div className="row">
          <div className="label">Year</div>
          <div className="value">{info.handlingYear}</div>
        </div>
        <div className="row">
          <div className="label">Department</div>
          <div className="value">{info.department}</div>
        </div>
        <div className="row">
          <div className="label">Contact Number</div>
          <div className="value">{info.contactNumber}</div>
        </div>
        <div className="row">
          <div className="label">City</div>
          <div className="value">{info.city}</div>
        </div>
      </div>
    </div>
  );
}

export default Tutor;
