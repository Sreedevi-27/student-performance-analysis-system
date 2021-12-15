import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { useParams } from "react-router";

import { API_END_POINT } from "../../config";
import { getLoggedInUserToken } from "../../utlils";
import "./Performance.css";

function Performance() {
  const [performance, setPerformance] = useState([]);
  const { studentId } = useParams();
  const token = getLoggedInUserToken();
  useEffect(
    function () {
      window
        .fetch(`${API_END_POINT}/students/${studentId}/performance`, {
          headers: { token },
          mode: "cors",
          credentials: "include",
        })
        .then((response) => response.text())
        .then((result) => setPerformance(JSON.parse(result)))
        .catch((error) => console.log("error", error));
    },
    [studentId, token]
  );

  const data = {
    labels: ["marks", "attendance", "quiz"],
    datasets: [
      {
        data: [performance.marks, performance.attendance, 69],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],

        hoverOffset: 5,
      },
    ],
  };

  return (
    <div className="performance">
      <div className="performance-graph">
        <h2 className="performance-heading">
          Over All Performance of {studentId}
        </h2>
        <Doughnut data={data} plugins={{ legend: { display: false } }} />
      </div>
    </div>
  );
}

export default Performance;
