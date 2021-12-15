import { useState } from "react";

import { API_END_POINT } from "../../config";
import { getLoggedInUserToken } from "../../utlils";

import Button from "../../components/Button/Button";
import avatar from "../../images/user.svg";

import "./AddStudent.css";

function AddStudent() {
  const [info, setInfo] = useState({});
  const token = getLoggedInUserToken();

  function handleAdd() {
    window
      .fetch(`${API_END_POINT}/tutors/students`, {
        method: "POST",
        body: JSON.stringify(info),
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

  return (
    <div className="home">
      <h1 className="home__heading">Profile</h1>
      <form className="details" onSubmit={handleAdd}>
        <div className="avatar-img">
          <img src={avatar} height={100} alt="avatar" />
        </div>
        <div className="row">
          <div className="label">Name</div>
          <input
            value={info.name}
            name="name"
            onChange={handleChange}
            required
          />
        </div>
        <div className="row">
          <div className="label">Student ID</div>
          <input value={info.id} name="id" onChange={handleChange} required />
        </div>
        <div className="row">
          <div className="label">Email ID</div>
          <input
            value={info.email}
            name="email"
            onChange={handleChange}
            required
          />
        </div>
        <div className="row">
          <div className="label">Password</div>
          <input
            value={info.password}
            name="password"
            onChange={handleChange}
            required
          />
        </div>
        <div className="row">
          <div className="label">Confirm Password</div>
          <input
            value={info.confirmPassword}
            name="confirmPassword"
            onChange={handleChange}
            required
          />
        </div>
        <div className="row">
          <div className="label">Department</div>
          <input
            value={info.department}
            name="department"
            onChange={handleChange}
            required
          />
        </div>
        <div className="row">
          <div className="label">Year</div>
          <input
            value={info.currentYear}
            name="currentYear"
            onChange={handleChange}
            required
          />
        </div>
        <div className="row">
          <div className="label">Semester</div>
          <input
            value={info.semester}
            name="semester"
            onChange={handleChange}
            required
          />
        </div>
        <div className="row">
          <div className="label">Contact Number</div>
          <input value={info.dob} name="dob" onChange={handleChange} required />
        </div>
        <div className="row">
          <div className="label">Date Of Birth </div>
          <input
            value={info.contactNumber}
            name="contactNumber"
            onChange={handleChange}
            required
          />
        </div>
        <div className="row">
          <div className="label">Year of Joining</div>
          <input
            value={info.yearOfJoining}
            name="yearOfJoining"
            onChange={handleChange}
            required
          />
        </div>
        <div className="row">
          <div className="label">Graduation Year</div>
          <input
            value={info.graduationYear}
            name="graduationYear"
            onChange={handleChange}
            required
          />
        </div>
        <div className="row">
          <div className="label">City</div>
          <input
            value={info.city}
            name="city"
            onChange={handleChange}
            required
          />
        </div>

        <div className="tutor-actions">
          <Button type="submit">Add</Button>
        </div>
      </form>
    </div>
  );
}

export default AddStudent;
