import React, { useEffect, useState } from 'react';
import { getCommonCredentials } from "../../GlobalHelper/CommonCredentials";
import {
  useAddNewExamMutation,
  useDeleteExamMutation,
  useGetExamByInstituteIdQuery,
  useUpdateExamByIdMutation,
} from "../../Redux/Api/examDataSlice";
import useGlobalToast from "../../GlobalComponents/GlobalToast";
import ExamTable from './components/ExamTable';
import ExamForm from './components/ExamForm';
import ExamDetails from './components/ExamDetails';
import Modal from '../../GlobalComponents/Modal';
import EditExamForm from './components/EditExamForm';

const AssignExam = () => {
  const {
    InstituteId,
    TeacherData,
    Subject,
    Class,
    ExamType,
    NonTeachingStaffData,
  } = getCommonCredentials();
  const showToast = useGlobalToast();
  const [popup, setPopup] = useState(false);
  const [exams, setExams] = useState([]);
  const [EditData, setEditData] = useState(null);
  const [Editpopup, setEditpopup] = useState(false);
  const [viewPopup, setViewPopup] = useState(false);
  const { data: Exam, isLoading } = useGetExamByInstituteIdQuery(InstituteId, {
    skip: !InstituteId,
  });
  const [addNewExam] = useAddNewExamMutation();
  const [updateExam] = useUpdateExamByIdMutation();
  const [deleteExam] = useDeleteExamMutation();

  useEffect(() => {
    setExams(Exam?.items);
    console.log("examdata", Exam?.items);
  }, [Exam]);

  const handleSubmit = async (Exam) => {
    console.log("Submit Value", Exam);
    
    try {
      const response = await addNewExam(Exam);
      if (response.data) {
        showToast("Exam Added Successfully", "success");
        setPopup(false);
      } else {
        showToast(response.error?.data?.message || "Error Adding Exam", "error");
        console.log(response);
        
      }
    } catch (error) {
      console.error("Error submitting exam:", error);
      showToast(error.response?.data?.message || "Error Adding Exam", "error");
    }
  };
  
  const editExam = async (values) => {
    if (!EditData || !EditData._id) {
      showToast("No exam selected for editing", "error");
      return;
    }

    try {
      const response = await updateExam({
        id: EditData._id,
        examData: values,
      });

      if (response.data) {
        showToast("Exam updated successfully", "success");
        setEditpopup(false);
      } else {
        showToast(response.error?.data?.message || "Error updating exam", "error");
      }
    } catch (error) {
      console.error("Error updating exam:", error);
      showToast(error.response?.data?.message || "Error updating exam", "error");
    }
  };
  const handledeleteExam = async (exam) => {
    const response = await deleteExam(exam);
    if (response.data) {
      showToast("Exam Deleted Successfully", "success");
    } else {
      console.log("Error deleting exam");
      showToast("Error Deleting Data", "error");
    }
  };
  const initialValues = {
    examType: "",
    instituteId: InstituteId,
    examName: "",
    examCode: "",
    startingDate: "",
    endingDate: "",
    class: [],
    subjects: [
      {
        subjectName: "",
        examDate: "",
        startTime: "",
        endTime: "",
        totalMarks: "",
        passingMarks: "",
        typeOfStaff: "",
        incharge: "",
        status: "Scheduled",
      },
    ],
    assignedBy: {},
    status: "Upcoming",
    examMode: "Offline",
    examInstructions: "",
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between mb-4">
        <div className="text-center fw-bold fs-3">Exam Form</div>
        <button className="btn btn-primary" onClick={() => setPopup(true)}>
          Add new Exam
        </button>
      </div>
      <div className="card">
        <div className="card-body">
          <ExamTable
            exams={exams}
            onView={(exam) => {
              setViewPopup(true);
              setEditData(exam.ExamData);
            }}
            onEdit={(exam) => {
              console.log("Edit Data received:", exam.ExamData);
              setEditData(exam.ExamData);
              setEditpopup(true);
            }}
            onDelete={handledeleteExam}
          />
        </div>
      </div>

      {popup && (
        <Modal onClose={() => setPopup(false)}>
          <ExamForm
            initialValues={initialValues}
            onSubmit={handleSubmit}
            ExamType={ExamType}
            Class={Class}
            Subject={Subject}
            TeacherData={TeacherData}
            NonTeachingStaffData={NonTeachingStaffData}
            onClose={() => setPopup(false)}
          />
        </Modal>
      )}

      {Editpopup && EditData && (
        <Modal onClose={() => setEditpopup(false)}>
          <EditExamForm
            EditData={EditData}
            InstituteId={InstituteId}
            onSubmit={editExam}
            ExamType={ExamType}
            Class={Class}
            Subject={Subject}
            TeacherData={TeacherData}
            NonTeachingStaffData={NonTeachingStaffData}
            onClose={() => setEditpopup(false)}
          />
        </Modal>
      )}

      {viewPopup && EditData && (
        <Modal onClose={() => setViewPopup(false)}>
          <ExamDetails
            exam={EditData}
            onClose={() => setViewPopup(false)}
          />
        </Modal>
      )}
    </div>
  );
};

export default AssignExam;