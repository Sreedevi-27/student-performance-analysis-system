import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { useParams } from "react-router";

import { API_END_POINT } from "../../config";
import { getLoggedInUserToken } from "../../utlils";

import Button from "../../components/Button/Button";
import "./Attendance.css";

function Attendance() {
  const [attendance, setAttendance] = useState([]);
  const [sem, setSem] = useState(1);
  const { studentId } = useParams();
  const token = getLoggedInUserToken();
  useEffect(
    function () {
      window
        .fetch(`${API_END_POINT}/students/${studentId}/attendance`, {
          headers: { token },
          mode: "cors",
          credentials: "include",
        })
        .then((response) => response.text())
        .then((result) => setAttendance(JSON.parse(result)))
        .catch((error) => console.log("error", error));
    },
    [studentId, token]
  );

  const attendanceSubjectWise = attendance.filter((m) => m.semester === sem);

  const data = {
    labels: attendanceSubjectWise.map((a) => a.subjectId),
    datasets: [
      {
        label: "Attendance",
        data: attendanceSubjectWise.map((a) => a.attendance),
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="attendance">
      <div className="attendance__btns">
        {[...new Set(attendance.map((a) => a.semester)).values()].map(
          (s, i) => (
            <Button
              onClick={() => setSem(s)}
              key={i}
              btnType={sem === s ? "primary" : "outline"}
            >
              sem {s}
            </Button>
          )
        )}
      </div>

      <div className="attendance__graph-and-table">
        <div className="attendance__graph">
          <Line data={data} plugins={{ legend: { display: false } }} />
        </div>
        <div className="attendance__table">
          <table id="attendance-table-style">
            <thead>
              <tr>
                <th>Subject code</th>
                <th>Name</th>
                <th>Attendance</th>
              </tr>
            </thead>
            <tbody>
              {attendanceSubjectWise.map((a, i) => {
                return (
                  <tr key={i}>
                    <td>{a.subjectId}</td>
                    <td>{a.subjectName}</td>
                    <td>{a.attendance}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Attendance;
