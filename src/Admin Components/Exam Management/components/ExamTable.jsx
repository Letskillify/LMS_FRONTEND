import React from 'react';
import GlobalTable from '../../../GlobalComponents/GlobalTable';

const ExamTable = ({ exams, onView, onEdit, onDelete }) => {

  // Define headers for the table
  const headers = ["#", "Exam Name", "Exam Code", "Exam Type", "Starting Date", "Ending Date", "Mode", "Status"];

  // Transform exam data to match header format
  const transformedData = exams ? exams.map((exam, index) => ({
    "ExamData": exam,
    "#": index + 1,
    "Exam Name": exam?.examName || "N/A",
    "Exam Code": exam?.examCode || "N/A",
    "Exam Type": exam?.examType?.examTypeName || "N/A",
    "Starting Date": exam?.startingDate ? new Date(exam?.startingDate).toLocaleDateString() : "N/A",
    "Ending Date": exam?.endingDate ? new Date(exam?.endingDate).toLocaleDateString() : "N/A",
    "Mode": exam?.examMode || "N/A",
    "Status": (
      <span
        className={`badge ${exam?.status === "Upcoming"
            ? "bg-primary"
            : exam?.status === "Ongoing"
              ? "bg-success"
              : "bg-danger"
          }`}
      >
        {exam?.status || "N/A"}
      </span>
    )
  })) : [];

  // Define actions for the table
  const actions = [
    {
      icon: "fa fa-eye",
      className: "btn-primary btn-sm",
      onClick: onView,
      label: "View Exam"
    },
    {
      icon: "fa fa-pencil-square-o",
      className: "btn-secondary btn-sm",
      onClick: onEdit,
      label: "Edit Exam"
    },
    {
      icon: "fa fa-trash-o",
      className: "btn-danger btn-sm",
      onClick: (exam) => onDelete(exam?._id),
      label: "Delete Exam"
    }
  ];

  return (
    <GlobalTable
      headers={headers}
      data={transformedData}
      actions={actions}
      noDataMessage="No exams found"
      tooltipProps={{ placement: "top" }}
    />
  );
};

export default ExamTable; 