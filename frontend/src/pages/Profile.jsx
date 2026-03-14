import React, { useEffect, useState } from "react";
import SectionCard from "../components/SectionCard";
import { getProfile, updateProfile } from "../services/api";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await getProfile();
        setProfile(data);
      } catch (error) {
        console.error(error);
      }
    };

    loadProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      await updateProfile(profile);
      setIsEditing(false);
      alert("Profile updated successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to update profile");
    }
  };

  if (!profile) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1 className="page-title">Profile</h1>

      <div className="profile-wrapper">
        <SectionCard
          title="Faculty Information"
          buttonText={isEditing ? "Save Profile" : "Edit Profile"}
          onButtonClick={isEditing ? handleSave : () => setIsEditing(true)}
        >
          {isEditing ? (
            <div className="profile-form">
              <div className="profile-field">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                />
              </div>

              <div className="profile-field">
                <label>Department</label>
                <input
                  type="text"
                  name="department"
                  value={profile.department}
                  onChange={handleChange}
                />
              </div>

              <div className="profile-field">
                <label>Employee ID</label>
                <input
                  type="text"
                  name="employeeId"
                  value={profile.employeeId}
                  disabled
                />
              </div>

              <div className="profile-field">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                />
              </div>

              <div className="profile-field">
                <label>Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                />
              </div>
            </div>
          ) : (
            <div className="profile-info">
              <p><strong>Name:</strong> {profile.name}</p>
              <p><strong>Department:</strong> {profile.department}</p>
              <p><strong>Employee ID:</strong> {profile.employeeId}</p>
              <p><strong>Email:</strong> {profile.email}</p>
              <p><strong>Phone:</strong> {profile.phone}</p>
            </div>
          )}
        </SectionCard>
      </div>
    </div>
  );
}