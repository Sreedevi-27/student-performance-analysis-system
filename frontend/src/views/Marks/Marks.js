import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { useParams } from "react-router";

import { API_END_POINT } from "../../config";
import { getLoggedInUserToken } from "../../utlils";

import Button from "../../components/Button/Button";
import "./Marks.css";

function Marks() {
  const [marks, setMarks] = useState([]);
  const [sem, setSem] = useState(1);
  const { studentId } = useParams();
  const token = getLoggedInUserToken();

  useEffect(
    function () {
      window
        .fetch(`${API_END_POINT}/students/${studentId}/marks`, {
          headers: { token },
          mode: "cors",
          credentials: "include",
        })
        .then((response) => response.text())
        .then((result) => setMarks(JSON.parse(result)))
        .catch((error) => console.log("error", error));
    },
    [studentId, token]
  );

  const marksSubjectWise = marks.filter((m) => m.semester === sem);

  const data = {
    labels: marksSubjectWise.map((m) => m.subjectId),
    datasets: [
      {
        label: "Marks",
        data: marksSubjectWise.map((m) => m.marks),
        barThickness: "flex",
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="marks">
      <div className="marks__btns">
        {[...new Set(marks.map((m) => m.semester)).values()].map((s, i) => (
          <Button
            onClick={() => setSem(s)}
            key={i}
            btnType={sem === s ? "primary" : "outline"}
          >
            sem {s}
          </Button>
        ))}
      </div>

      <div className="marks__graph-and-table">
        <div className="marks__graph">
          <Bar data={data} plugins={{ legend: { display: false } }} />
        </div>

        <div className="marks__table">
          <table className="marks-table-style">
            <thead>
              <tr>
                <th>Subject code</th>
                <th>Subject Name</th>
                <th>Marks</th>
              </tr>
            </thead>
            <tbody>
              {marksSubjectWise.map((m, i) => {
                return (
                  <tr key={i}>
                    <td>{m.subjectId}</td>
                    <td>{m.subjectName}</td>
                    <td>{m.marks}</td>
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

export default Marks;
