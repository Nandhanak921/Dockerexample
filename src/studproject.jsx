import React, { useEffect, useState } from "react";
import axios from "axios";

function Profron() {
  const [studentId, setStudentId] = useState("");
  const [projectname, setProjectName] = useState("");
  const [dos, setDos] = useState("");
  const [msg, setMsg] = useState("");

  const [projectList, setProjectList] = useState([]);

  // Add project
  const addProject = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/project/addpro", {
        studentId,
        projectname,
        dos,
      });

      setMsg("Project added successfully!");
      setStudentId("");
      setProjectName("");
      setDos("");

      fetchAllProjects(); // refresh list
    } catch (err) {
      setMsg("Error adding project");
    }
  };

  // Get projects of ONE student
  const getByStudent = async () => {
    if (!studentId) return alert("Enter student id first");

    try {
      const res = await axios.get(
        `http://localhost:5000/api/project/getp/${studentId}`
      );
      setProjectList(res.data);
      setMsg("Fetched student's projects");
    } catch (err) {
      setMsg("Error fetching student project");
    }
  };

  // Get ALL projects
  const fetchAllProjects = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/project/getall");
      setProjectList(res.data);
      setMsg("Fetched all projects");
    } catch (err) {
      setMsg("Error fetching projects");
    }
  };

  useEffect(() => {
    fetchAllProjects();
  }, []);

  return (
    <div style={{ width: "600px", margin: "auto", marginTop: "40px" }}>
      <h1>Project Management</h1>

     
      <div style={{ padding: "20px", border: "1px solid gray", marginBottom: "30px" }}>
        <h2>Add Project</h2>
        <form onSubmit={addProject}>
          <input  type="text" placeholder="Student ID"  value={studentId} onChange={(e) => setStudentId(e.target.value)}/>  <br /><br />
          <input type="text"placeholder="Project Name" value={projectname} onChange={(e) => setProjectName(e.target.value)}   />    <br /><br />
          <input type="date" value={dos}onChange={(e) => setDos(e.target.value)}  />     <br /><br />
          <button type="submit">Add Project</button>
        </form>
        <p>{msg}</p>
      </div>
      <div style={{ padding: "20px", border: "1px solid gray", marginBottom: "30px" }}>
        <h3>Get Projects of a Student</h3>
        <input  type="text"  placeholder="Enter Student ID"  value={studentId}   onChange={(e) => setStudentId(e.target.value)} />
        <button onClick={getByStudent} style={{ marginLeft: "10px" }}>
          Search
        </button>
      </div>

      <div style={{ padding: "20px", border: "1px solid gray" }}>
        <h2>Project List</h2>

        <table border="1" width="100%" cellPadding="10">
          <thead>
            <tr>
              <th>Project Name</th>
              <th>DOS</th>
              <th>Student Name</th>
              <th>Branch</th>
              <th>Email</th>
            </tr>
          </thead>

          <tbody>
            {projectList.map((pro) => (
              <tr key={pro._id}>
                <td>{pro.projectname}</td>
                <td>{pro.dos}</td>
                <td>{pro.studentdetails?.name}</td>
                <td>{pro.studentdetails?.branch}</td>
                <td>{pro.studentdetails?.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Profron;
