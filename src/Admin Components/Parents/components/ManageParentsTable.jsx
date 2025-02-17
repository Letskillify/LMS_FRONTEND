import React from "react";
import GlobalTable from "../../../GlobalComponents/GlobalTable";

const ManageParentsTable = ({
  data,
  ParentDataShow,
  handleViewMore,
  handleEdit,
  handleDeleteone,
}) => {
  const Headers = [
    "Name",
    "Email",
    "Phone",
    "Qualification",
    "Reset Passwords",
    "Actions",
  ];

  const tableData = data?.map((student) => ({
        "Name" : `${student?.personalDetails?.firstName} ${student?.personalDetails?.lastName}`,
    "Email" : student?.personalDetails?.email,
    "Phone" : student?.personalDetails?.phoneNo,
    "Reset Passwords" : "Reset Passwords",
    "Actions",
  }))
  return (
    <GlobalTable
      headers={Headers}
      data={data}
      noDataMessage={"No Data Found"}
    />
  );
};

export default ManageParentsTable;
