import { useEffect, useState } from "react";
import { useParams } from "react-router";

import { API_END_POINT } from "../../config";
import { getLoggedInUserId, getLoggedInUserToken } from "../../utlils";

import avatar from "../../images/user.svg";
import Button from "../../components/Button/Button";

import "./UpdateStudent.css";

function UpdateStudent() {
  const [info, setInfo] = useState(null);
  const { studentId: sid } = useParams();
  const studentId = sid || getLoggedInUserId();
  const token = getLoggedInUserToken();

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

  function handleUpdate() {
    const { name, email, currentYear, semester, contactNumber, city } = info;
    window
      .fetch(`${API_END_POINT}/tutors/students/${studentId}`, {
        method: "PUT",
        body: JSON.stringify({
          name,
          email,
          currentYear,
          semester,
          contactNumber,
          city,
        }),
        headers: { token },
        mode: "cors",
        credentials: "include",
      })
      .then((response) => response.text())
      .then((result) => setInfo(JSON.parse(result)))
      .catch((e) => console.log(e));
  }

  function handleChange(e) {
    setInfo({ ...info, [e.target.name]: e.target.value });
  }

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
          <input value={info.name} name="name" onChange={handleChange} />
        </div>
        <div className="row">
          <div className="label">Student ID</div>
          <input value={info.id} disabled />
        </div>
        <div className="row">
          <div className="label">Email ID</div>
          <input value={info.email} name="email" onChange={handleChange} />
        </div>
        <div className="row">
          <div className="label">Department</div>
          <input value={info.department} disabled />
        </div>
        <div className="row">
          <div className="label">Year</div>
          <input
            value={info.currentYear}
            name="currentYear"
            onChange={handleChange}
          />
        </div>
        <div className="row">
          <div className="label">Semester</div>
          <input
            value={info.semester}
            name="semester"
            onChange={handleChange}
          />
        </div>
        <div className="row">
          <div className="label">Contact Number</div>
          <input
            value={info.contactNumber}
            name="contactNumber"
            onChange={handleChange}
          />
        </div>
        <div className="row">
          <div className="label">Year of Joining</div>
          <input value={info.yearOfJoining} disabled />
        </div>
        <div className="row">
          <div className="label">Graduation Year</div>
          <input value={info.graduationYear} disabled />
        </div>
        <div className="row">
          <div className="label">City</div>
          <input value={info.city} name="city" onChange={handleChange} />
        </div>
        <div className="tutor-actions">
          <Button onClick={handleUpdate}>Update</Button>
        </div>
      </div>
    </div>
  );
}

export default UpdateStudent;
