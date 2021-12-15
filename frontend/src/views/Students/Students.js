import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { API_END_POINT } from "../../config";
import {
  getLoggedInUserId,
  getLoggedInUserRole,
  getLoggedInUserToken,
} from "../../utlils";
import { ROLES } from "../../constants";

import updateIcon from "../../images/update.svg";
import viewIcon from "../../images/view.svg";
import deleteIcon from "../../images/delete.svg";
import IconWithToolTip from "../../components/IconWithToolTip/IconWithToolTip";

import "./Students.css";

function Students() {
  const [students, setStudents] = useState([]);
  const { tutorId: idOfTutor } = useParams();
  const tutorId = idOfTutor || getLoggedInUserId();
  const token = getLoggedInUserToken();
  const role = getLoggedInUserRole();

  useEffect(
    function () {
      window
        .fetch(`${API_END_POINT}/tutors/${tutorId}/students`, {
          headers: { token },
          mode: "cors",
          credentials: "include",
        })
        .then((response) => response.text())
        .then((result) => setStudents(JSON.parse(result)))
        .catch((error) => console.log("error", error));
    },
    [tutorId, token]
  );

  function deleteStudent(e, studentId) {
    e.preventDefault();
    window
      .fetch(`${API_END_POINT}/tutors/students/${studentId}`, {
        method: "DELETE",
        headers: { token },
        mode: "cors",
        credentials: "include",
      })
      .then((response) => response.text())
      .then((result) => {
        if (result === "SUCCESS") {
          setStudents(students.filter((s) => s.id !== studentId));
        }
      })
      .catch((e) => console.log(e));
  }

  return (
    <div className="students-list">
      <table id="student-table-list">
        <thead>
          <tr>
            <th>S.No</th>
            <th> ID</th>
            <th>Name</th>
            <th>View Details</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s, i) => {
            return (
              <tr key={i}>
                <td width="30px"> {i + 1}</td>
                <td width="100px">{s.id}</td>
                <td width="150px">{s.name}</td>
                <td width="150px" className="action-icons">
                  {role === ROLES.TUTOR && (
                    <Link to={`/students/${s.id}/update`}>
                      <IconWithToolTip
                        src={updateIcon}
                        alt="update"
                        toolTipText="Update"
                      />
                    </Link>
                  )}

                  <Link to={`/students/${s.id}`}>
                    <IconWithToolTip
                      src={viewIcon}
                      alt="view"
                      toolTipText="View"
                    />
                  </Link>

                  {role === ROLES.TUTOR && (
                    <Link to="" onClick={(e) => deleteStudent(e, s.id)}>
                      <IconWithToolTip
                        src={deleteIcon}
                        alt="delete"
                        toolTipText="Delete"
                      />
                    </Link>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Students;
