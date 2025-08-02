import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ProfilePage.css";

function ProfilePage() {
  const token = localStorage.getItem("token");
  const storedUser = JSON.parse(localStorage.getItem("user")) || {
    userId: null,
    name: "Guest",
    email: "",
  };

  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState(storedUser.name);
  const [email, setEmail] = useState(storedUser.email || "");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (!token || !storedUser.userId) {
      alert("Unauthorized. Please log in.");
      localStorage.clear();
      window.location.href = "/login";
    }
  }, [token, storedUser.userId]);

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8080/elearn/users/update/${storedUser.userId}`,
        {
          name: username,
          email: email,
          password: password || undefined, // Send only if changed
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data) {
        alert("Profile updated successfully!");
        localStorage.setItem(
          "user",
          JSON.stringify({
            ...storedUser,
            name: username,
            email: email,
          })
        );
        setIsEditing(false);
        setPassword("");
      }
    } catch (err) {
      console.error("Update error:", err);
      alert("Failed to update profile.");
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-avatar">{username?.charAt(0).toUpperCase()}</div>
        <div className="profile-info">
          <p>
            <strong>Username:</strong>{" "}
            {isEditing ? (
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            ) : (
              username
            )}
          </p>
          <p>
            <strong>Email:</strong>{" "}
            {isEditing ? (
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            ) : (
              email
            )}
          </p>
          {isEditing && (
            <p>
              <strong>New Password:</strong>{" "}
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Leave blank to keep current"
              />
            </p>
          )}
        </div>
      </div>

      <div className="profile-actions">
        {isEditing ? (
          <>
            <button onClick={handleUpdate} className="save-button">
              Save Changes
            </button>
            <button onClick={() => setIsEditing(false)} className="cancel-button">
              Cancel
            </button>
          </>
        ) : (
          <button onClick={() => setIsEditing(true)} className="edit-button">
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;
