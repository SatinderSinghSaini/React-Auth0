import React, { useContext, useEffect, useState } from "react";
import AuthContext from "./AuthContext";

export default function Courses() {
  const auth = useContext(AuthContext);
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    ////Below code to check courses api. It is using Scope based Authorization
    fetch("/course", {
      headers: { Authorization: `Bearer ${auth.getAccessToken()}` },
    })
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error("Netwok response is not Ok.");
      })
      .then((res) => {
        setCourses(res.courses);
      })
      .catch((err) => console.log(err));
    //Below code to check admin api. It is using Role based Authorization
    fetch("/admin", {
      headers: { Authorization: `Bearer ${auth.getAccessToken()}` },
    })
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error("Netwok response is not Ok.");
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <div>Courses</div>
      <ul>
        {courses.map((course) => (
          <li key={course.id}>{course.title}</li>
        ))}
      </ul>
    </>
  );
}
