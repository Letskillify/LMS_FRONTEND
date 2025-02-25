import React, { useState } from "react";
import useGlobalToast from "../../../../GlobalComponents/GlobalToast";
import GlobalTable from "../../../../GlobalComponents/GlobalTable";

const SMSFPTTable = () => {
  const showToast = useGlobalToast();
  const [SMSFPTData, setSMSFPTData] = useState([
    {
      rollNo: "ST-1001",
      studentName: "Aarav Sharma",
      parentName: "Rajesh Sharma",
    },
    {
      rollNo: "ST-1002",
      studentName: "Rohan Verma",
      parentName: "Sandeep Verma",
    },
    {
      rollNo: "ST-1003",
      studentName: "Vihan Patel",
      parentName: "Amit Patel",
    },
    {
      rollNo: "ST-1004",
      studentName: "Ishita Mehta",
      parentName: "Pankaj Mehta",
    },
    {
      rollNo: "ST-1005",
      studentName: "Kabir Singh",
      parentName: "Anil Singh",
    },
    {
      rollNo: "ST-1006",
      studentName: "Sanya Kapoor",
      parentName: "Vikram Kapoor",
    },
  ]);

  const headers = ["Select", "RollNo", "StudentName", "ParentName"];

  const tableData =
    SMSFPTData?.map((SMSFPTTable, index) => ({
      Select: <input type="checkbox" />,
      RollNo: SMSFPTTable?.rollNo || "N/A",
      StudentName: SMSFPTTable?.studentName || "N/A",
      ParentName: SMSFPTTable?.parentName,
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

export default SMSFPTTable;
