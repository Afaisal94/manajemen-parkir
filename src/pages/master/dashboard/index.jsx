import React, { useEffect } from "react";
import { redirect } from "react-router-dom";

function Dashboard() {
  
  useEffect(() => {
    redirect("/biaya-parkir");
  }, []);

  return <div></div>;
}

export default Dashboard;
