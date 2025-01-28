import React from "react";

const DocumentationAndPasswordForm = ({
  formData,
  handleChange,
  handleFileChange,
}) => {
  return (
    <div className="container">
      <h2>Documents</h2>
      <div className="row mb-3">
        <div className="col-md-6">
          <label className="form-label">Profile Photo:</label>
          {/* {formData?.documents?.profilePhoto !== "" ||
          formData?.documents?.profilePhoto ? (
            <>
              <button
                type="button"
                onClick={() =>
                  window.open(formData.documents.profilePhoto, "_blank")
                }
                style={{
                  margin: "10px 0",
                  padding: "5px 10px",
                  backgroundColor: "#007bff",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                View
              </button>
            </>
          ) : (
            <input
              type="file"
              className="form-control"
              name="documents.profilePhoto"
              onChange={(e) => handleFileChange("profilePhoto", e)}
              required
              accept="image/*" // Accepts all image formats
            />
          )} */}
          <input
            type="file"
            className="form-control"
            name="documents.profilePhoto"
            onChange={(e) => handleFileChange("profilePhoto", e)}
            required
            accept="image/*" // Accepts all image formats
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Caste Certificate:</label>
          <input
            type="file"
            className="form-control"
            name="documents.casteCertificate"
            onChange={(e) => handleFileChange("casteCertificate", e)}
            required
            accept=".pdf,.jpg,.jpeg,.png" // Accepts PDF and common image formats
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-md-6">
          <label className="form-label">ID Proof:</label>
          <input
            type="file"
            className="form-control"
            name="documents.idProof"
            onChange={(e) => handleFileChange("idProof", e)}
            required
            accept=".pdf,.jpg,.jpeg,.png" // Accepts PDF and common image formats
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Resume:</label>
          {/* {formData?.documents?.resume !== "" || formData?.documents?.resume ? (
            <>
              <button
                type="button"
                onClick={() => {
                  console.log("resume ",formData.documents.resume);
                  window.open(formData.documents.resume, "_blank");
                }}
                style={{
                  margin: "10px 0",
                  padding: "5px 10px",
                  backgroundColor: "#007bff",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                View
              </button>
              <input
                type="file"
                className="form-control"
                name="documents.resume"
                onChange={(e) => handleFileChange("resume", e)}
                required
                accept=".pdf,.doc,.docx" // Accepts PDF and Word document formats
              />
            </>
          ) : (
            <input
              type="file"
              className="form-control"
              name="documents.resume"
              onChange={(e) => handleFileChange("resume", e)}
              required
              accept=".pdf,.doc,.docx" // Accepts PDF and Word document formats
            />
          )} */}
          <input
            type="file"
            className="form-control"
            name="documents.resume"
            onChange={(e) => handleFileChange("resume", e)}
            required
            accept=".pdf,.doc,.docx" // Accepts PDF and Word document formats
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-md-6">
          <label className="form-label">Bank Passbook:</label>
          <input
            type="file"
            className="form-control"
            name="documents.uploadBankPassbook"
            onChange={(e) => handleFileChange("uploadBankPassbook", e)}
            required
            accept=".pdf,.jpg,.jpeg,.png" // Accepts PDF and common image formats
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Signature:</label>
          <input
            type="file"
            className="form-control"
            name="documents.signature"
            onChange={(e) => handleFileChange("signature", e)}
            required
            accept=".jpg,.jpeg,.png" // Accepts image formats for signature
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-md-12">
          <label className="form-label">Other Documents:</label>
          <input
            type="file"
            className="form-control"
            name="documents.otherDocuments"
            onChange={(e) => handleFileChange("otherDocuments", e)}
            required
            accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" // Accepts multiple formats
          />
        </div>
      </div>

      <h2>Login Password</h2>
      <div className="row mb-3">
        <div className="col-md-12">
          <label className="form-label">Login Password:</label>
          <input
            type="password"
            className="form-control"
            name="loginPassword"
            value={formData.loginPassword}
            onChange={handleChange}
            required
          />
        </div>
      </div>
    </div>
  );
};

export default DocumentationAndPasswordForm;
