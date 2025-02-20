import React from "react";
import { Link } from "react-router-dom";
import GlobalTable from "../../../GlobalComponents/GlobalTable";

const StudentTable = ({ StudentData, StudentDataShow, handleEdit, handleDeleteone }) => {
  console.log(StudentData, "StudentDataShow");
  
  const headers = [
    "Roll ID",
    "Profile",
    "Name",
    "DOB",
    "Parents Name",
    "Parents Number",
    "Gender",
    "Email",
    "Status",
  ];

  const data = StudentData?.slice(0, StudentDataShow)?.map((student) => ({
    _id: student._id,
    data: student,
    "Roll ID": (
      <Link to={`/studentdetail/${student?.secondaryId}`}>{student?.secondaryId}</Link>
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
    Status: <span className="text-center">Active</span>,
  }));

  const actions = [
    {
      label: "Edit",
      icon: "bx bx-edit",
      className: "btn btn-success btn-icon rounded-pill me-1",
      onClick: (row) => handleEdit(row._id, row.data),
    },
    {
      label: "Delete",
      icon: "bx bx-trash",
      className: "btn btn-danger btn-icon rounded-pill",
      onClick: (row) => handleDeleteone(row?._id),
    },
  ];

  return (
    <GlobalTable
      headers={headers}
      data={data}
      actions={actions}
      loading={false}
      noDataMessage="No students found"
    />
  );
};

export default StudentTable;
