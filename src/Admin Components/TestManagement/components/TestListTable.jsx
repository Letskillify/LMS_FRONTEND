import React, { useState } from "react";
import { Link } from "react-router-dom";
import GlobalTable from "../../../GlobalComponents/GlobalTable";
import useGlobalToast from "../../../GlobalComponents/GlobalToast";

export const TestListTable = ({TestList  ,handleTest ,handleTestEdit}) => {
  const showToast = useGlobalToast();
  const [TestListData, setTestListData] = useState([
    {
      testId: 1,
      testName: "Test 1",
      class: "Class 1",
      subject: "Maths",
      description: "Description 1",
      testDate: "2023-06-01",
      addInFinal: "Yes",
      type: "Online",
      session: "Session 1",
      resultStatus: "Not Published",
    },
    {
      testId: 2,
      testName: "Test 2",
      class: "Class 2",
      subject: "Science",
      description: "Description 2",
      testDate: "2023-06-02",
      addInFinal: "No",
      type: "Offline",
      session: "Session 2",
      resultStatus: "Published",
    },
    {
      testId: 3,
      testName: "Test 3",
      class: "Class 3",
      subject: "English",
      description: "Description 3",
      testDate: "2023-06-03",
      addInFinal: "Yes",
      type: "Online",
      session: "Session 3",
      resultStatus: "Not Published",
    },
  ]);

  const handledelete = async (id) => {
    try {
      const res = await deleteTest(id);
      if (res.data.status === 200) {
        showToast("Test List Deleted Successfully", "success");
      }
    } catch (error) {
      console.error("Error deleting the List:", error);
      showToast(`Error deleting the List ${error}`, "error");
    }
  };

  const headers = [
    "Test Id",
    "Test Name",
    "For Class",
    "Of Subject",
    "Description",
    "Test Date",
    "Add In Final",
    "Type",
    "Session",
    "Result Status",
    "Action",
  ];

  const tabledata =
    TestList?.map((test) => ({
      "Test Id": test?.testId,
      "Test Name": test?.testName,
      "For Class": test?.class,
      "Of Subject": test?.subject,
      Description: test?.description,
      "Test Date": test?.testDate,
      "Add In Final": test?.addInFinal,
      Type: test?.type,
      Session: test?.session,
      "Result Status": test?.resultStatus,
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
        data={tabledata}
        actions={actions}
        loading={false}
        noDataMessage="No Test Lsit found"
      />
    </>
  );
};
export default TestListTable;
