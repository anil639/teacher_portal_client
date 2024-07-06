import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";

import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import NewStudentModal from "./NewStudentModal";
import NavBar from "./NavBar";

const StudentList = ({ token }) => {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      const res = await axios.get("http://localhost:8000/api/students", {
        headers: {
          "x-auth-token": token,
        },
      });
      setStudents(res.data);
    };

    fetchStudents();
  }, [token]);
  //handle dropdown change
  const handleMenuClick = (event, student) => {
    setAnchorEl(event.currentTarget);
    setSelectedStudent(student);
  };
  //handle dropdown change
  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedStudent(null);
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:8000/api/students/delete/${id}`, {
      headers: { "x-auth-token": token },
    });
    setStudents(students.filter((student) => student._id !== id));
  };

  const handleSave = (newStudent) => {
    if (editingStudent) {
      setStudents(
        students.map((student) =>
          student._id === newStudent._id ? newStudent : student
        )
      );
    } else {
      setStudents([...students, newStudent]);
    }
    setEditingStudent(null);
    setShowModal(false);
  };

  const handleAdd = () => {
    setEditingStudent(null);
    setShowModal(true);
  };
  return (
    <div>
      <NavBar />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          marginTop: "20px",
        }}
      >
        <TableContainer component={Paper} sx={{ width: "80%" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Subject</TableCell>
                <TableCell>Marks</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student._id}>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.subjects}</TableCell>
                  <TableCell>{student.marks}</TableCell>
                  <TableCell>
                    <IconButton
                      aria-controls="simple-menu"
                      aria-haspopup="true"
                      onClick={(event) => handleMenuClick(event, student)}
                    >
                      <ExpandCircleDownIcon />
                    </IconButton>
                    <Menu
                      id="simple-menu"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl) && selectedStudent === student}
                      onClose={handleMenuClose}
                    >
                      <MenuItem onClick={() => handleEdit(student)}>
                        Edit
                      </MenuItem>
                      <MenuItem onClick={() => handleDelete(student._id)}>
                        Delete
                      </MenuItem>
                    </Menu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <NewStudentModal
            open={showModal}
            onClose={() => setShowModal(false)}
            onSave={handleSave}
            student={editingStudent}
            token={token}
          />
        </TableContainer>
        <div
          style={{
            width: "80%",
            display: "flex",
            justifyContent: "flex-start",
            marginTop: "30px",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleAdd}
            sx={{ backgroundColor: "#1A1919" }}
          >
            Add New Student
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StudentList;
