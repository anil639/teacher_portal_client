import React from "react";
import StudentList from "../Components/StudentList";

const Home = ({ token }) => {
  return (
    <div>
      <StudentList token={token} />
    </div>
  );
};

export default Home;
