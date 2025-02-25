import React from "react";
import { Link } from "react-router-dom";
import GlobalTable from "../../../GlobalComponents/GlobalTable";

const StudentInformationTable = ({ 
  StudentData, 
  handleViewProfile, 
  handleEdit, 
  handleDeleteone,
}) => {
  const headers = [
    "Roll ID",
    "Profile Photo",
    "Name",
    "DOB",
    "Parents Name",
    "Parents Number",
    "Gender",
    "Email",
    "Status"
  ];

  const data = StudentData?.map((student) => {
    const profilePhotoUrl = student?.personalDetails?.profilePhoto || "/image/defaultImg.png";
    
    return {
      "Roll ID": (
        <Link to={`/studentdetail/${student?.secondaryId}`}>{student?.secondaryId}</Link>
      ),
      "Profile Photo": (
        <img
          src={profilePhotoUrl}
          alt="Avatar"
          className="rounded-circle border border-light"
          style={{ height: "50px", width: "50px", cursor: 'pointer' }}
          onClick={() => handleViewProfile(student)}
          onError={(e) => { e.target.src = "/image/defaultImg.png"; }}
        />
      ),
      "Name": `${student?.personalDetails?.firstName} ${student?.personalDetails?.lastName}`,
      "DOB": student?.personalDetails?.dateOfBirth
        ? new Date(student.personalDetails.dateOfBirth).toISOString().split("T")[0]
        : "-",
      "Parents Name": student?.parentDetails?.Father?.name || "-",
      "Parents Number": student?.parentDetails?.Father?.contactNumber || "-",
      "Gender": student?.personalDetails?.gender || "-",
      "Email": student?.contactInfo?.email || "-",
      "Status": student?.type || "Regular",
      "_id": student._id,
      "_profilePhoto": profilePhotoUrl,
      "_fullData": student
    };
  });

  const actions = [
    {
      label: "View Profile",
      icon: "bx bx-show",
      className: "btn-info btn-sm me-1",
      onClick: (row) => handleViewProfile(row._fullData),
    },
    {
      label: "Edit",
      icon: "bx bx-edit",
      className: "btn-primary btn-sm me-1",
      onClick: (row) => handleEdit(row._id, StudentData.find(s => s._id === row._id)),
    },
    {
      label: "Delete",
      icon: "bx bx-trash",
      className: "btn-danger btn-sm me-1",
      onClick: (row) => handleDeleteone(row._id),
    },
  ];

  return (
    <GlobalTable
      headers={headers}
      data={data}
      actions={actions}
      loading={!StudentData || StudentData.length === 0}
      noDataMessage="No students found"
    />
  );
};

export default StudentInformationTable;
