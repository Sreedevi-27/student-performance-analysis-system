import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { API_END_POINT } from "../../config";
import { getLoggedInUserId, getLoggedInUserToken } from "../../utlils";

import studentsIconDataURI from "../../images/asDataURIs/students";
import IconWithToolTip from "../../components/IconWithToolTip/IconWithToolTip";
import viewIcon from "../../images/view.svg";

import "./Tutors.css";

const SIZE = 20;

function Tutors() {
  const [tutors, setTutors] = useState([]);
  const principalId = getLoggedInUserId();
  const token = getLoggedInUserToken();

  useEffect(
    function () {
      window
        .fetch(`${API_END_POINT}/principal/${principalId}/tutors`, {
          headers: { token },
          mode: "cors",
          credentials: "include",
        })
        .then((response) => response.text())
        .then((result) => setTutors(JSON.parse(result)))
        .catch((error) => console.log("error", error));
    },
    [principalId, token]
  );

  return (
    <div className="tutors">
      <div className="tutors-container">
        <table className="tutors-container__list">
          <thead>
            <tr>
              <th>S.No</th>
              <th>ID</th>
              <th>Name</th>
              <th>View Details</th>
            </tr>
          </thead>
          <tbody>
            {tutors.map((t, i) => {
              return (
                <tr key={i}>
                  <td width={30}> {i + 1}</td>
                  <td width={100}>{t.id}</td>
                  <td width={150}>{t.name}</td>
                  <td width={150} className="tutors-container__list-actions">
                    <Link to={`/tutors/${t.id}`}>
                      <IconWithToolTip
                        src={viewIcon}
                        alt="tutor"
                        toolTipText="View details"
                      />
                    </Link>
                    <Link to={`/tutors/${t.id}/students`}>
                      <IconWithToolTip
                        src={studentsIconDataURI("#000")}
                        alt="students"
                        size={SIZE}
                        toolTipText="View students"
                      />
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Tutors;
