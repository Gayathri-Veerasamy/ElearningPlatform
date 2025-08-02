import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./CourseList.css";

function CourseList() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [view, setView] = useState("all"); // "all" or "my"

  const BASE_URL = "http://localhost:8080/elearn";
  const IMAGE_BASE_URL = "https://yourwebsite.com/images/courses/";

  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  const storedUser = JSON.parse(localStorage.getItem("user")) || {
    userId: null,
    name: "Guest",
  };
  const userId = storedUser.userId;
  const userInitial = storedUser.name?.charAt(0)?.toUpperCase() || "G";

  const navigate = useNavigate();

  useEffect(() => {
    if (!token || !username || !userId) {
      alert("Session expired or unauthorized. Please log in again.");
      localStorage.clear();
      navigate("/login");
    }
  }, [token, username, userId, navigate]);

  useEffect(() => {
    if (token && userId) {
      fetchCourses();
      fetchEnrolledCourses();
    }
  }, [token, userId]);

  const fetchCourses = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/enrollment/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const updatedCourses = response.data.map((course) => ({
        ...course,
        courseImage: course.courseImage?.startsWith("http")
          ? course.courseImage
          : `${IMAGE_BASE_URL}${course.courseImage}`,
      }));

      setCourses(updatedCourses);
      setError("");
    } catch (err) {
      console.error("Error fetching courses:", err);
      setError("Failed to load courses.");
    } finally {
      setLoading(false);
    }
  };

  const fetchEnrolledCourses = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/enrollment/my-courses/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setEnrolledCourses(response.data.map((course) => course.id));
    } catch (err) {
      console.error("Error fetching enrolled courses:", err);
    }
  };

 const handleEnroll = async (courseId) => {
  if (!courseId) {
    console.error("courseId is undefined");
    return;
  }

  try {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");

    const response = await axios.post(
      `${BASE_URL}/enrollment/enroll?courseId=${courseId}`,
      null,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          username: username,
        },
      }
    );

    console.log("Enrollment successful:", response.data);
  } catch (error) {
    console.error("Enrollment error:", error);
  }
};


  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const goToProfile = () => {
    navigate("/profile", { state: { user: storedUser } });
  };

  const filteredCourses =
    view === "my"
      ? courses.filter((course) => enrolledCourses.includes(course.id))
      : courses;

  return (
    <>
      {/* Top Navbar */}
      <div className="navbar">
        <div className="nav-left">
          <span className="nav-logo">eLearn</span>
          <button
            className={`nav-button ${view === "all" ? "active" : ""}`}
            onClick={() => setView("all")}
          >
            All Courses
          </button>
          <button
            className={`nav-button ${view === "my" ? "active" : ""}`}
            onClick={() => setView("my")}
          >
            My Courses
          </button>
        </div>

        <div className="nav-right">
          <div className="user-profile" onClick={goToProfile}>
            <div className="user-icon">{userInitial}</div>
            
          </div>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="course-container">
        <h1 className="course-title">
          {view === "all" ? "All Available Courses" : "My Enrolled Courses"}
        </h1>

        {error && <p className="course-error">{error}</p>}
        {loading ? (
          <p className="loading-text">Loading courses...</p>
        ) : filteredCourses.length === 0 ? (
          <p className="loading-text">
            {view === "my"
              ? "You haven't enrolled in any courses yet."
              : "No courses found."}
          </p>
        ) : (
          <div className="course-list">
            {filteredCourses.map((course) => (
              <div key={course.id} className="course-card">
                <img
                  src={course.courseImage}
                  alt={course.courseName}
                  className="course-image"
                  onError={(e) =>
                    (e.target.src =
                      "https://dummyimage.com/300x180/cccccc/000000.png&text=No+Image")
                  }
                />
                <div className="course-details">
                  <h3 className="course-name">{course.courseName}</h3>
                  <p className="course-instructor">
                    Instructor: {course.courseInstructor}
                  </p>
                  <p className="course-desc">
                    Learn {course.courseName} with expert guidance.
                  </p>
                  {view === "all" && (
                    <button
                      className={`enroll-button ${
                        enrolledCourses.includes(course.id) ? "disabled" : ""
                      }`}
                      onClick={() => handleEnroll(course.id)}
                      disabled={enrolledCourses.includes(course.id)}
                    >
                      {enrolledCourses.includes(course.id)
                        ? "Enrolled"
                        : "Enroll Now"}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default CourseList;
