import React from "react";
import { Link } from "react-router-dom";
import GlobalTable from "../../../GlobalComponents/GlobalTable";

const StudentInformationTable = ({ StudentData, StudentDataShow, handleViewProfile, handleApproveRequest }) => {
  const headers = [
    "Roll ID",
    "Profile",
    "Name",
    "DOB",
    "Parents Name",
    "Parents Number",
    "Gender",
    "Email",
    "Request Status",
    "Profile",
  ];

  const data = StudentData?.map((student) => ({
    "Roll ID": (
      <Link to={`/studentdetail/${student?.StuID}`}>{student?.StuID}</Link>
    ),
    Profile: (
      <img
        src={student?.personalDetails?.profilePhoto || "/image/defaultImg.png"}
        alt="Avatar"
        className="rounded-circle border border-light"
        style={{ height: "50px", width: "50px" }}
        onError={(e) => { e.target.src = "/image/defaultImg.png"; }}
      />
    ),
    Name: `${student?.personalDetails?.firstName} ${student?.personalDetails?.lastName}`,
    DOB: student?.personalDetails?.dateOfBirth
      ? new Date(student.personalDetails.dateOfBirth).toISOString().split("T")[0]
      : "-",
    "Parents Name": student?.parentDetails?.Father?.name || "-",
    "Parents Number": student?.parentDetails?.Father?.contactNumber || "-",
    Gender: student?.personalDetails?.gender || "-",
    Email: student?.contactInfo?.email || "-",
    "Request Status": student?.requestStatus || "Pending",
    Profile: (
      <button
        className="btn btn-primary btn-sm"
        onClick={() => handleViewProfile(student)}
      >
        View
      </button>
    ),
  }));

  const actions = [
    {
      label: "Approve",
      icon: "bx bx-check",
      className: "btn btn-success btn-sm",
      onClick: (row) => handleApproveRequest(row["_id"]),
    },
  ];

  return (
    <GlobalTable
      headers={headers}
      data={data}
      actions={actions}
      loading={false}
      noDataMessage="No student requests found"
    />
  );
};

export default StudentInformationTable;
