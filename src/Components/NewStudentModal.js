import React, { useState, useEffect } from "react";
import { Modal, Box, TextField, Button } from "@mui/material";
import axios from "axios";

const NewStudentModal = ({ open, onClose, onSave, student, token }) => {
  const [name, setName] = useState("");
  const [subjects, setSubjects] = useState("");
  const [marks, setMarks] = useState("");

  useEffect(() => {
    if (student) {
      setName(student.name);
      setSubjects(student.subjects);
      setMarks(student.marks);
    } else {
      setName("");
      setSubjects("");
      setMarks("");
    }
  }, [student]);
  //for new Student data and update
  const handleSubmit = async () => {
    const newStudent = { name, subjects, marks };
    try {
      const res = student
        ? await axios.put(
            `http://localhost:8000/api/students/edit/${student._id}`,
            newStudent,
            {
              headers: { "x-auth-token": token },
            }
          )
        : await axios.post(
            "http://localhost:8000/api/students/add",
            newStudent,
            {
              headers: { "x-auth-token": token },
            }
          );

      onSave(res.data);
      onClose();
    } catch (err) {
      console.error("Error saving student:", err);
    }
  };

  return (
    <div>
      <Modal open={open} onClose={onClose}>
        <Box
          sx={{
            p: 3,
            bgcolor: "background.paper",
            margin: "50px auto",
            width: 400,
          }}
        >
          <h2>{student ? "Edit Student" : "Add New Student"}</h2>
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Subject"
            fullWidth
            margin="normal"
            value={subjects}
            onChange={(e) => setSubjects(e.target.value)}
          />
          <TextField
            label="Marks"
            type="number"
            fullWidth
            margin="normal"
            value={marks}
            onChange={(e) => setMarks(e.target.value)}
          />
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            fullWidth
          >
            Save
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default NewStudentModal;
