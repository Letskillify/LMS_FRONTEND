import React from 'react';
import ExamForm from './ExamForm';

const EditExamForm = ({ 
  EditData, 
  InstituteId, 
  onSubmit,
  ExamType,
  Class,
  Subject,
  TeacherData,
  NonTeachingStaffData,
  onClose 
}) => {
  const getInitialValues = () => ({
    examType: EditData?.examType?._id || "",
    examName: EditData?.examName || "",
    examCode: EditData?.examCode || "",
    startingDate: EditData?.startingDate
      ? new Date(EditData.startingDate).toISOString().split('T')[0]
      : "",
    endingDate: EditData?.endingDate
      ? new Date(EditData.endingDate).toISOString().split('T')[0]
      : "",
    instituteId: InstituteId,
    class: EditData?.class?.map(c => c._id) || [],
    subjects: EditData?.subjects?.map((subject) => ({
      subjectName: subject?.subjectName?._id || "",
      examDate: subject?.examDate
        ? new Date(subject.examDate).toISOString().split('T')[0]
        : "",
      startTime: subject?.startTime || "",
      endTime: subject?.endTime || "",
      totalMarks: subject?.totalMarks || "",
      passingMarks: subject?.passingMarks || "",
      status: subject?.status || "Scheduled",
      typeOfStaff: subject?.typeOfStaff || "",
      incharge: subject?.incharge?._id || "",
    })) || [{
      subjectName: "",
      examDate: "",
      startTime: "",
      endTime: "",
      totalMarks: "",
      passingMarks: "",
      status: "Scheduled",
      typeOfStaff: "",
      incharge: "",
    }],
    assignedBy: EditData?.assignedBy?._id || "",
    status: EditData?.status || "Upcoming",
    examMode: EditData?.examMode || "Offline",
    examInstructions: EditData?.examInstructions || "",
  });

  return (
    <ExamForm
      initialValues={getInitialValues()}
      onSubmit={onSubmit}
      ExamType={ExamType}
      Class={Class}
      Subject={Subject}
      TeacherData={TeacherData}
      NonTeachingStaffData={NonTeachingStaffData}
      onClose={onClose}
      isEdit={true}
    />
  );
};

export default EditExamForm; 