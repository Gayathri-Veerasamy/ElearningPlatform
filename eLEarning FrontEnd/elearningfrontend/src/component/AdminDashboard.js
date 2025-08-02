import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { RichTextEditor } from "@mantine/tiptap";
import { Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import "@mantine/core/styles.css";
import "@mantine/tiptap/styles.css";
import "./AdminDashboard.css";

const DEFAULT_QUIZ = {
  question: "",
  option1: "",
  option2: "",
  option3: "",
  option4: "",
  correctOption: "",
};

const DEFAULT_COURSE = {
  courseName: "",
  courseInstructor: "",
  courseImage: "",
  durationInHours: "",
  enrollments: 0,
  contents: [""],
  quizzes: [DEFAULT_QUIZ],
};

function AdminDashboard() {
  const [newCourse, setNewCourse] = useState(DEFAULT_COURSE);
  const [isEditing, setIsEditing] = useState(false);
  const [editCourseId, setEditCourseId] = useState(null);
  const navigate = useNavigate();
  const BASE_URL = "http://localhost:8080/elearn";
  const editorsRef = useRef([]);

  useEffect(() => {
    editorsRef.current.forEach((ed) => ed?.destroy()); // Cleanup
    editorsRef.current = newCourse.contents.map((content, index) => {
      return new Editor({
        extensions: [StarterKit],
        content,
        onUpdate: ({ editor }) => {
          const updatedContents = [...newCourse.contents];
          updatedContents[index] = editor.getHTML();
          setNewCourse((prev) => ({
            ...prev,
            contents: updatedContents,
          }));
        },
      });
    });

    return () => {
      editorsRef.current.forEach((ed) => ed?.destroy());
    };
  }, [newCourse.contents.length]);

  useEffect(() => {
    const stored = localStorage.getItem("editCourse");
    if (stored) {
      const course = JSON.parse(stored);
      setNewCourse({
        courseName: course.courseName || "",
        courseInstructor: course.courseInstructor || "",
        courseImage: course.courseImage || "",
        durationInHours: course.courseDuration || "",
        enrollments: course.noOfEnrolments || 0,
        contents: course.contents?.map((c) => c.content) || [""],
        quizzes:
          course.quizzes?.map((q) => ({
            question: q.question,
            option1: q.option1,
            option2: q.option2,
            option3: q.option3,
            option4: q.option4,
            correctOption: q.correctAnswer,
          })) || [DEFAULT_QUIZ],
      });
      setEditCourseId(course.courseId);
      setIsEditing(true);
      localStorage.removeItem("editCourse");
    }
  }, []);

  const handleAddCourse = async () => {
    try {
      const payload = {
        courseName: newCourse.courseName,
        courseInstructor: newCourse.courseInstructor,
        courseImage: newCourse.courseImage,
        courseDuration: parseInt(newCourse.durationInHours, 10),
        noOfEnrolments: newCourse.enrollments,
        contents: newCourse.contents.map((c) => ({ content: c })),
        quizzes: newCourse.quizzes.map((q) => ({
          question: q.question,
          option1: q.option1,
          option2: q.option2,
          option3: q.option3,
          option4: q.option4,
          correctAnswer: q.correctOption,
        })),
      };

      const token = localStorage.getItem("token");

      if (isEditing && editCourseId) {
        await axios.put(`${BASE_URL}/courses/edit/${editCourseId}`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post(`${BASE_URL}/courses/add`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      alert("Course saved successfully!");
      setNewCourse(DEFAULT_COURSE);
      editorsRef.current.forEach((ed) => ed?.destroy());
      editorsRef.current = [];
      setIsEditing(false);
      setEditCourseId(null);
    } catch (err) {
      console.error("Failed to save course:", err);
    }
  };

  const addContentSection = () => {
    setNewCourse((prev) => ({
      ...prev,
      contents: [...prev.contents, ""],
    }));
  };

  const removeContentSection = (index) => {
    const updatedContents = newCourse.contents.filter((_, i) => i !== index);
    setNewCourse((prev) => ({
      ...prev,
      contents: updatedContents,
    }));
  };

  const addQuiz = () => {
    setNewCourse((prev) => ({
      ...prev,
      quizzes: [...prev.quizzes, { ...DEFAULT_QUIZ }],
    }));
  };

  const removeQuiz = (index) => {
    const updated = [...newCourse.quizzes];
    updated.splice(index, 1);
    setNewCourse({ ...newCourse, quizzes: updated });
  };

  return (
    <MantineProvider>
      <div className="admin-container">
        <h2 className="admin-title">Admin Dashboard</h2>
        <div className="tab-bar">
          <button className="active-tab">
            ➕ {isEditing ? "Edit" : "Add"} Course
          </button>
          <button onClick={() => navigate("/all-courses")}>📚 View All Courses</button>
        </div>

        <div className="admin-form">
          <input
            type="text"
            placeholder="Course Name"
            value={newCourse.courseName}
            onChange={(e) => setNewCourse({ ...newCourse, courseName: e.target.value })}
          />
          <input
            type="text"
            placeholder="Instructor"
            value={newCourse.courseInstructor}
            onChange={(e) => setNewCourse({ ...newCourse, courseInstructor: e.target.value })}
          />
          <input
            type="text"
            placeholder="Image URL"
            value={newCourse.courseImage}
            onChange={(e) => setNewCourse({ ...newCourse, courseImage: e.target.value })}
          />
          <input
            type="number"
            placeholder="Duration (hours)"
            value={newCourse.durationInHours}
            onChange={(e) => setNewCourse({ ...newCourse, durationInHours: e.target.value })}
          />
          <input
            type="number"
            placeholder="Enrollments"
            value={newCourse.enrollments}
            onChange={(e) =>
              setNewCourse({ ...newCourse, enrollments: parseInt(e.target.value || "0", 10) })
            }
          />

          <label className="content-label">Course Content:</label>
          {newCourse.contents.map((contentHtml, index) => {
            let headingText = `Section ${index + 1}`;
            try {
              const parser = new DOMParser();
              const doc = parser.parseFromString(contentHtml, "text/html");
              const headingTag = doc.querySelector("h1, h2, h3, h4, h5, h6");
              if (headingTag) {
                headingText = `Section ${index + 1}: ${headingTag.textContent}`;
              }
            } catch (e) {
              console.error("Error parsing HTML content:", e);
            }

            return (
              <div className="editor-wrapper" key={index}>
                <div className="editor-header">
                  <strong>{headingText}</strong>
                  {newCourse.contents.length > 1 && (
                    <button
                      className="remove-section-button"
                      onClick={() => removeContentSection(index)}
                    >
                      Remove
                    </button>
                  )}
                </div>
                {editorsRef.current[index] && (
                  <RichTextEditor editor={editorsRef.current[index]}>
                    <RichTextEditor.Toolbar sticky stickyOffset={60} />
                    <RichTextEditor.Content />
                  </RichTextEditor>
                )}
              </div>
            );
          })}
          <button className="add-course-button" onClick={addContentSection}>
            + Add More Content Section
          </button>

          <label className="content-label">Quizzes:</label>
          {newCourse.quizzes.map((quiz, index) => (
            <div key={index} className="quiz-section">
              <strong>Quiz {index + 1}</strong>
              <input
                type="text"
                placeholder="Question"
                value={quiz.question}
                onChange={(e) => {
                  const updated = [...newCourse.quizzes];
                  updated[index].question = e.target.value;
                  setNewCourse({ ...newCourse, quizzes: updated });
                }}
              />
              <div className="quiz-options-grid">
                {[1, 2, 3, 4].map((num) => (
                  <input
                    key={num}
                    type="text"
                    placeholder={`Option ${num}`}
                    value={quiz[`option${num}`]}
                    onChange={(e) => {
                      const updated = [...newCourse.quizzes];
                      updated[index][`option${num}`] = e.target.value;
                      setNewCourse({ ...newCourse, quizzes: updated });
                    }}
                  />
                ))}
              </div>
              <input
                type="text"
                placeholder="Correct Answer"
                value={quiz.correctOption}
                onChange={(e) => {
                  const updated = [...newCourse.quizzes];
                  updated[index].correctOption = e.target.value;
                  setNewCourse({ ...newCourse, quizzes: updated });
                }}
              />
              {newCourse.quizzes.length > 1 && (
                <button
                  className="remove-section-button"
                  onClick={() => removeQuiz(index)}
                >
                  Remove Quiz
                </button>
              )}
            </div>
          ))}
          <button className="add-course-button" onClick={addQuiz}>
            + Add Quiz
          </button>

          <button className="add-course-button" onClick={handleAddCourse}>
            {isEditing ? "Update Course" : "Add Course"}
          </button>
        </div>
      </div>
    </MantineProvider>
  );
}

export default AdminDashboard;
