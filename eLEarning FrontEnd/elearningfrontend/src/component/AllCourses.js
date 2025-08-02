import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AllCourses.css";

const BASE_URL = "http://localhost:8080/elearn";

function AllCourses() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${BASE_URL}/courses/all`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCourses(res.data);
      } catch (err) {
        console.error("Error fetching courses:", err);
      }
    };

    fetchCourses();
  }, []);

  const handleEdit = (course) => {
    localStorage.setItem("editCourse", JSON.stringify(course));
    navigate("/admin");
  };

  const handleDelete = async (courseId) => {
    if (!courseId) {
      console.error("Invalid course ID:", courseId);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${BASE_URL}/courses/delete/${courseId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCourses(courses.filter((course) => course.courseId !== courseId));
    } catch (err) {
      console.error("Failed to delete course:", err);
    }
  };

  return (
    <div className="admin-container">
      <h2 className="admin-title">All Courses</h2>
      <div className="tab-bar">
        <button onClick={() => navigate("/admin")}>➕ Add Course</button>
        <button className="active-tab">📚 View All Courses</button>
      </div>

      <div className="course-grid">
        {courses.map((course) => (
          <div className="course-card" key={course.courseId}>
            <div className="image-wrapper">
              <img src={course.courseImage} alt={course.courseName} />
            </div>
            <div className="card-content">
              <div className="course-header">
                <span className="course-name">{course.courseName}</span>
                <span className="course-duration">{course.courseDuration} hrs</span>
              </div>
              <div className="course-info">
                <span className="course-enrolls">{course.noOfEnrolments} enrolled</span>
                <span className="course-instructor">{course.courseInstructor}</span>
              </div>
              <div className="course-actions">
                <button onClick={() => handleEdit(course)}>✏️ Edit</button>
                <button onClick={() => handleDelete(course.courseId)}>🗑️ Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllCourses;
