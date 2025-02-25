import React, { useState } from "react";
import useGlobalToast from "../../../GlobalComponents/GlobalToast";
import { Subject } from "@mui/icons-material";
import GlobalTable from "../../../GlobalComponents/GlobalTable";

const PositionHoldersTable = () => {
  const showToast = useGlobalToast();
  const [PositionHoldersData, setPositionHoldersData] = useState([
    {
      studentCode: "STU-1001",
      name: "Aarav Sharma",
      parent: "Rajesh Sharma",
      totalMarksObtained: 475,
      position: 1,
    },
    {
      studentCode: "STU-1002",
      name: "Rohan Verma",
      parent: "Sandeep Verma",
      totalMarksObtained: 420,
      position: 3,
    },
    {
      studentCode: "STU-1003",
      name: "Vihan Patel",
      parent: "Amit Patel",
      totalMarksObtained: 450,
      position: 2,
    },
    {
      studentCode: "STU-1004",
      name: "Ishita Mehta",
      parent: "Pankaj Mehta",
      totalMarksObtained: 390,
      position: 4,
    },
    {
      studentCode: "STU-1005",
      name: "Kabir Singh",
      parent: "Anil Singh",
      totalMarksObtained: 360,
      position: 5,
    },
  ]);

  const headers = [
    "StudentCode",
    "Name",
    "Parent",
    "TotalMarkObtained",
    "Position",
  ];

  const tableData = PositionHoldersData?.map((PositionHoldersTable, index) => ({
    StudentCode: PositionHoldersTable?.studentCode || "N/A",
    Name: PositionHoldersTable?.name || "N/A",
    Parent: PositionHoldersTable?.parent || "N/A",
    TotalMarkObtained: PositionHoldersTable?.totalMarksObtained || "N/A",
    Position: PositionHoldersTable?.position || "N/A",
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

export default PositionHoldersTable;
