import { useEffect, useState } from "react";

import { API_END_POINT } from "../../config";
import StudentImage from "../../images/student.svg";

function PersonalDetails(props) {
  const [info, setInfo] = useState(null);
  const IMAGE_SIZE = 100;

  // useEffect(function() {
  //     window.fetch(`${API_END_POINT}/students/18cs01`)
  //         .then(function(res) {
  //             return res.json()
  //         })
  //         .then(setInfo)
  // }, [])

  return (
    <div className="std-info">
      {info !== null ? (
        <>
          <div className="std-head"></div>
          <div className="std-details">
            <div className="std-name">NAME : {info.name}</div>
            <div className="std-roll-no">REG NO : {info.id}</div>
            <div className="std-email">EMAIL ID :{info.email}</div>
            <div className="std-current-year">
              CURRENT YEAR : {info.currentYear}
            </div>
            <div className="std-department">DEPARTMENT : {info.department}</div>
            <div className="std-semester">SEMESTER : {info.semester}</div>
            <div className="std-contact-number">
              CONTACT NUMBER : {info.contactNumber}
            </div>
            <div className="std-dob">DATE OF BIRTH : {info.dob}</div>
            <div className="std-year-of-joining">
              YEAR OF JOINING : {info.yearOfJoining}
            </div>
            <div className="std-graduation-year">
              BATCH : {info.graduationYear}
            </div>
            <div className="std-semester">CITY : {info.city}</div>
          </div>
        </>
      ) : null}
    </div>
  );
}

export default PersonalDetails;
