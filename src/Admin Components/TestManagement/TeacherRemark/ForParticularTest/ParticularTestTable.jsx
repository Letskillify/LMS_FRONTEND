import React, { useState } from "react";
import useGlobalToast from "../../../../GlobalComponents/GlobalToast";
import GlobalTable from "../../../../GlobalComponents/GlobalTable";

const ParticularTestTable = () => {
  const showToast = useGlobalToast();
  const [ParticularTestData, setParticularTestData] = useState([
    {
      rollNo: "ST-1001",
      name: "Aarav Sharma",
      parent: "Rajesh Sharma",
      marksObtained: 85,
      teacherRemark: "Excellent performance! Keep up the good work.",
    },
    {
      rollNo: "ST-1002",
      name: "Rohan Verma",
      parent: "Sandeep Verma",
      marksObtained: 72,
      teacherRemark: "Good effort, but there's room for improvement.",
    },
    {
      rollNo: "ST-1003",
      name: "Vihan Patel",
      parent: "Amit Patel",
      marksObtained: 90,
      teacherRemark: "Outstanding results! Keep excelling.",
    },
    {
      rollNo: "ST-1004",
      name: "Aryan Joshi",
      parent: "Mahesh Joshi",
      marksObtained: 60,
      teacherRemark: "Needs improvement. Focus on weak areas.",
    },
  ]);

  const headers = [
    "#",
    "Roll No",
    "Name",
    "Parents",
    "Mark Obtained", 
    "Teacher Remark For Selected Exam",
  ];

  const tableData =
    ParticularTestData?.map((ParticluarTest, index) => ({
      "#": index + 1,
      "Roll No": ParticluarTest?.rollNo || `ST-${1000 + index}`,
      Name: ParticluarTest?.name,
      Parents: ParticluarTest?.parent || "N/A",
      "Mark Obtained": ParticluarTest?.marksObtained || 0, 
      "Teacher Remark For Selected Exam": ParticluarTest?.teacherRemark || "N/A", 
    })) || [];

  const actions = [
    {
      label: "Edit",
      className: "btn-primary",
      icon: "fa fa-edit",
      onClick: (row) => handlerecoverid(row._id),
    },
    {
      label: "Move To Trash",
      className: "btn-danger ms-2",
      icon: "fa fa-trash",
      onClick: (row) => handledelete(row._id),
    },
  ];

  return (
    <>
      <GlobalTable
        headers={headers}
        data={tableData}
        actions={actions}
        loading={false}
        noDataMessage="No Test List found"
      />
    </>
  );
};

export default ParticularTestTable;
