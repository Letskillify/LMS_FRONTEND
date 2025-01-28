import React from "react";

const PersonalDetailsForm = ({ formData, handleChange }) => {
  return (
    <div className="container">
      <h2>Personal Details</h2>
      <div className="row mb-3">
        <div className="col-md-6">
          <label className="form-label">First Name:</label>
          <input
            type="text"
            className="form-control"
            name="fullName.firstName"
            value={formData.fullName.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Last Name:</label>
          <input
            type="text"
            className="form-control"
            name="fullName.lastName"
            value={formData.fullName.lastName}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-md-6">
          <label className="form-label">Date of Birth:</label>
          <input
            type="date"
            className="form-control"
            name="personalDetails.dateOfBirth"
            value={formData.personalDetails.dateOfBirth}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Gender:</label>
          <select
            className="form-select"
            name="personalDetails.gender"
            value={formData.personalDetails.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-md-6">
          <label className="form-label">Email Address:</label>
          <input
            type="email"
            className="form-control"
            name="contactInfo.email"
            value={formData.contactInfo.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Mobile Number:</label>
          <input
            type="tel"
            className="form-control"
            name="contactInfo.mobile"
            value={formData.contactInfo.mobile}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-md-12">
          <label className="form-label">Address:</label>
          <input
            type="text"
            className="form-control"
            name="contactInfo.address"
            value={formData.contactInfo.address}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <h2>Emergency Contact</h2>
      <div className="row mb-3">
        <div className="col-md-6">
          <label className="form-label">Emergency Contact Name:</label>
          <input
            type="text"
            className="form-control"
            name="emergencyContact.name"
            value={formData.emergencyContact.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Relation:</label>
          <input
            type="text"
            className="form-control"
            name="emergencyContact.relation"
            value={formData.emergencyContact.relation}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-md-6">
          <label className="form-label">Contact Number:</label>
          <input
            type="tel"
            className="form-control"
            name="emergencyContact.contactNumber"
            value={formData.emergencyContact.contactNumber}
            onChange={handleChange}
            required
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalDetailsForm;
 