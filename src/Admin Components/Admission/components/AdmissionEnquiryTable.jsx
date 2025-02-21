import React from "react";
import GlobalTable from "../../../GlobalComponents/GlobalTable";

const EnquiryTable = ({
  filteredEnquiries,
  setViewEnquiry,
  handleDeleteEnquiry,
}) => {
  const headers = ["Name", "Phone No", "Email", "Gender", "Status"];

  const data = filteredEnquiries.map((enquiry) => ({
    Name: enquiry.name,
    "Phone No": enquiry.phoneNo,
    Email: enquiry.email,
    Gender: enquiry.gender,
    Status: enquiry.status,
  }));

  const actions = [
    {
      label: "View",
      icon: "bx bx-show",
      className: "btn btn-primary btn-sm",
      onClick: (row) => setViewEnquiry(row),
    },
    {
      label: "Delete",
      icon: "bx bx-trash",
      className: "btn btn-danger btn-sm mx-2",
      onClick: (row) => handleDeleteEnquiry(row["_id"]),
    },
  ];

  return (
      <GlobalTable
        headers={headers}
        data={data}
        actions={actions}
        loading={false}
        noDataMessage="No enquiries found"
      />
  );
};

export default EnquiryTable;
