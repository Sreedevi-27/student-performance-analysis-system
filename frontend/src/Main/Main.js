import { Route, Switch, Redirect } from "react-router-dom";
import { ROLES } from "../constants";

import { getLoggedInUserRole, isLoggedIn } from "../utlils";

import Attendance from "../views/Attendance/Attendance";
import Performance from "../views/Performance/Performance";
import Quiz from "../views/Quiz/Quiz";
import Tutors from "../views/Tutors/Tutors";
import Student from "../views/Home/Student";
import Tutor from "../views/Home/Tutor";
import Login from "../views/Login/Login";
import Logout from "../views/Logout/Logout";
import Marks from "../views/Marks/Marks";
import NoMatch from "../views/NoMatch/NoMatch";
import Students from "../views/Students/Students";
import UpdateStudent from "../views/UpdateStudent/UpdateStudent";
import AddStudent from "../views/AddStudent/AddStudent";
import Principal from "../views/Home/Principal";

import "./Main.css";

function ProtectedRoute(props) {
  return isLoggedIn() ? props.children : <Redirect to="/login" />;
}

function Main() {
  const role = getLoggedInUserRole();
  return (
    <div className="main">
      <Switch>
        <Route path="/" exact>
          <ProtectedRoute>
            {role === ROLES.STUDENT ? (
              <Student />
            ) : role === ROLES.TUTOR ? (
              <Tutor />
            ) : (
              <Principal />
            )}
          </ProtectedRoute>
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/students/:studentId/marks">
          <ProtectedRoute>
            <Marks />
          </ProtectedRoute>
        </Route>
        <Route path="/students/:studentId/attendance">
          <ProtectedRoute>
            <Attendance />
          </ProtectedRoute>
        </Route>
        <Route path="/students/:studentId/performance">
          <ProtectedRoute>
            <Performance />
          </ProtectedRoute>
        </Route>
        <Route path="/students/:studentId/quiz">
          <ProtectedRoute>
            <Quiz />
          </ProtectedRoute>
        </Route>
        <Route path="/students/add">
          <ProtectedRoute>
            <AddStudent />
          </ProtectedRoute>
        </Route>
        <Route path="/students/:studentId" exact>
          <ProtectedRoute>
            <Student />
          </ProtectedRoute>
        </Route>
        <Route path="/students/:studentId/update">
          <ProtectedRoute>
            <UpdateStudent />
          </ProtectedRoute>
        </Route>
        <Route path="/tutors/:tutorId/students">
          <ProtectedRoute>
            <Students />
          </ProtectedRoute>
        </Route>
        <Route path="/tutors/:tutorId" exact>
          <ProtectedRoute>
            <Tutor />
          </ProtectedRoute>
        </Route>

        <Route path="/principal/:principalId/tutors">
          <ProtectedRoute>
            <Tutors />
          </ProtectedRoute>
        </Route>
        <Route path="/principal/:principalId" exact>
          <ProtectedRoute>
            <Principal />
          </ProtectedRoute>
        </Route>
        <Route path="/logout">
          <Logout />
        </Route>
        <Route path="*">
          <NoMatch />
        </Route>
      </Switch>
    </div>
  );
}

export default Main;
