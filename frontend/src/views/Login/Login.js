import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import Button from "../../components/Button/Button";
import TextBox from "../../components/TextBox/TextBox";
import { API_END_POINT } from "../../config";
import { ROLES } from "../../constants";
import {
  setLoggedInUserToken,
  setLoggedInUserId,
  setLoggedInUserRole,
} from "../../utlils";

import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(ROLES.STUDENT);

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleRoleChange(e) {
    setRole(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    const urlEncoded = new URLSearchParams();
    urlEncoded.append("email", email);
    urlEncoded.append("password", password);
    urlEncoded.append("role", role);

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlEncoded,
      redirect: "follow",
      mode: "cors",
    };

    fetch(`${API_END_POINT}/login`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        const [id, token, role] = result.split(" ");
        setLoggedInUserId(id);
        setLoggedInUserToken(token);
        setLoggedInUserRole(role);
        window.location.replace("/");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Invalid email or password", {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  }
  return (
    <div className="login-page">
      <div className="college-name">
        <h1 className="college-name__heading-1">Southern Technical</h1>
        <h2 className="college-name__heading-2">School of Engineering</h2>
        <h3 className="college-name__heading-3">
          An Autonoumous Institution, Accredeted by NAAC with 'A' Grade
        </h3>
      </div>
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-form__heading">User Login</h2>
        <div className="email-password">
          <TextBox
            type="text"
            placeholder="Email Id"
            name="email"
            required
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="email-password">
          <TextBox
            type="password"
            placeholder="Password"
            name="password"
            required
            value={password}
            onChange={handlePasswordChange}
          />
        </div>

        <div className="select-box">
          <label className="select-role" defaultValue={role}>
            Select Role
          </label>
          <select name="role" className="role" onChange={handleRoleChange}>
            <option value={ROLES.STUDENT}>Student</option>
            <option value={ROLES.TUTOR}>Tutor</option>
            <option value={ROLES.PRINCIPAL}>Principal</option>
          </select>
        </div>
        <div className="login-btn">
          <Button type="submit">Login</Button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Login;
