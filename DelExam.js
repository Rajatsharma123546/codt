import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ManageExams = () => {
  const [exams, setExams] = useState([
    // Example data: Replace this with actual data fetched from your backend
    { id: 1, name: "Math Exam" },
    { id: 2, name: "Science Exam" },
  ]);

  // Function to delete an exam
  const deleteExam = async (examId) => {
    if (!window.confirm("Are you sure you want to delete this exam?")) {
      return;
    }

    try {
      const response = await axios.get(
        `https://yourdomain.com/api/delete_exam.php?id=${examId}`
      );

      if (response.data.success) {
        // Update the local state to remove the deleted exam
        setExams((prevExams) => prevExams.filter((exam) => exam.id !== examId));
        toast.success("Exam deleted successfully.");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("An error occurred while deleting the exam.");
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Manage Exams</h1>
      <ul>
        {exams.map((exam) => (
          <li key={exam.id}>
            {exam.name}
            <button
              onClick={() => deleteExam(exam.id)}
              style={{
                marginLeft: "10px",
                background: "red",
                color: "white",
                border: "none",
                cursor: "pointer",
                padding: "5px 10px",
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageExams;
