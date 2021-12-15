import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";

import { API_END_POINT } from "../../config";
import {
  getLoggedInUserId,
  getLoggedInUserRole,
  getLoggedInUserToken,
} from "../../utlils";
import { ROLES } from "../../constants";
import Button from "../../components/Button/Button";

import avatar from "../../images/user.svg";

import "./Student.css";

function Student() {
  const [info, setInfo] = useState(null);
  const { studentId: sid } = useParams();
  const studentId = sid || getLoggedInUserId();
  const role = getLoggedInUserRole();
  const token = getLoggedInUserToken();
  const history = useHistory();
  useEffect(
    function () {
      window
        .fetch(`${API_END_POINT}/students/${studentId}`, {
          headers: { token },
          mode: "cors",
          credentials: "include",
        })
        .then((response) => response.text())
        .then((result) => setInfo(JSON.parse(result)))
        .catch((error) => console.log("error", error));
    },
    [studentId, token]
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
          <div className="label">Student ID</div>
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
          <div className="value">{info.currentYear}</div>
        </div>
        <div className="row">
          <div className="label">Semester</div>
          <div className="value">{info.semester}</div>
        </div>
        <div className="row">
          <div className="label">Contact Number</div>
          <div className="value">{info.contactNumber}</div>
        </div>
        <div className="row">
          <div className="label">Year of Joining</div>
          <div className="value">{info.yearOfJoining}</div>
        </div>
        <div className="row">
          <div className="label">Graduation Year</div>
          <div className="value">{info.graduationYear}</div>
        </div>
        <div className="row">
          <div className="label">City</div>
          <div className="value">{info.city}</div>
        </div>
        {(role === ROLES.TUTOR || role === ROLES.PRINCIPAL) && (
          <div className="tutor-actions">
            <Button
              onClick={() => history.push(`/students/${studentId}/marks`)}
            >
              Marks
            </Button>
            <Button
              onClick={() => history.push(`/students/${studentId}/attendance`)}
            >
              Attendance
            </Button>
            <Button
              onClick={() => history.push(`/students/${studentId}/performance`)}
            >
              Performance
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Student;
