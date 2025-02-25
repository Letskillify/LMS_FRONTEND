import React, { useState } from "react";
import useGlobalToast from "../../../GlobalComponents/GlobalToast";
import { TestSchedule } from "./TestSchedule";
import GlobalTable from "../../../GlobalComponents/GlobalTable";

const TestScheduleTable = () => {
  const showToast = useGlobalToast();
  const [TestScheduleData, setTestScheduleData] = useState([
    {
      date: "2024-02-01",
      day: "Thursday",
      type: "Weekly Test",
      class: "10th",
      section: "A",
      subject: "Mathematics",
    },
    {
      date: "2024-02-05",
      day: "Monday",
      type: "Monthly Test",
      class: "10th",
      section: "B",
      subject: "Science",
    },
    {
      date: "2024-02-10",
      day: "Saturday",
      type: "Yearly Test",
      class: "9th",
      section: "A",
      subject: "English",
    },
    {
      date: "2024-02-12",
      day: "Monday",
      type: "Weekly Test",
      class: "8th",
      section: "C",
      subject: "History",
    },
  ]);

  const headers = ["Date", "Day", "Type", "Class", "Section", "Subject"];

  const tableData =
    TestScheduleData?.map((TestSchedule, index) => ({
      Date: TestSchedule?.date || "N/A",
      Day: TestSchedule?.day || "N/A",
      Type: TestSchedule?.type || "N/A",
      Class: TestSchedule?.class || "N/A",
      Section: TestSchedule?.section || "N/A",
      Subject: TestSchedule?.subject || "N/A",
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

export default TestScheduleTable;
