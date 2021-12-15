import LinkWithIcon from "../LinkWithIcon/LinkWithIcon";
import { getLoggedInUserId, getLoggedInUserRole } from "../../utlils";
import { ROLES } from "../../constants";

import markIcon from "../../images/mark.svg";
import attendanceIcon from "../../images/attendance.svg";
import performanceIcon from "../../images/performance.svg";
import quizIcon from "../../images/quiz.svg";
import logoutIcon from "../../images/logout.svg";
import studentsIcon from "../../images/students.svg";
import addStudentIcon from "../../images/addStudent.svg";

function NavigationLinks() {
  const role = getLoggedInUserRole();
  const id = getLoggedInUserId();

  const links = [
    {
      text: "Marks",
      url: `/students/${id}/marks`,
      icon: markIcon,
      roles: [ROLES.STUDENT],
    },
    {
      text: "Attendance",
      url: `/students/${id}/attendance`,
      icon: attendanceIcon,
      roles: [ROLES.STUDENT],
    },

    {
      text: "Quiz",
      url: `/students/${id}/quiz`,
      icon: quizIcon,
      roles: [ROLES.STUDENT],
      size: 25,
    },
    {
      text: "Performance",
      url: `/students/${id}/performance`,
      icon: performanceIcon,
      roles: [ROLES.STUDENT],
    },
    {
      text: "Students",
      url: `tutors/${id}/students`,
      icon: studentsIcon,
      roles: [ROLES.TUTOR],
    },
    {
      text: "Add Student",
      url: "/students/add",
      icon: addStudentIcon,
      roles: [ROLES.TUTOR],
    },
    {
      text: "Tutors",
      url: `/principal/${id}/tutors`,
      icon: studentsIcon,
      roles: [ROLES.PRINCIPAL],
    },
    {
      text: "Logout",
      url: "/logout",
      icon: logoutIcon,
      roles: [ROLES.STUDENT, ROLES.TUTOR, ROLES.PRINCIPAL],
    },
  ];

  return links
    .filter((l) => l.roles.includes(role))
    .map((l) => {
      return (
        <LinkWithIcon icon={l.icon} url={l.url} key={l.url} size={l.size}>
          {l.text}
        </LinkWithIcon>
      );
    });
}

export default NavigationLinks;
