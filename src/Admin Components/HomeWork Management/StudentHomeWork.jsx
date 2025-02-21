import React, { useEffect, useState } from "react";
import { useGetHomeworkByInstituteQuery } from "../../Redux/Api/HomeworkSlice";
import { getCommonCredentials } from "../../GlobalHelper/CommonCredentials";
import { toast } from "react-toastify";
import html2pdf from "html2pdf.js";
import {
  useAddSubmissionMutation,
  useGetSubmissionsByInstituteIdQuery,
} from "../../Redux/Api/StudentHomeworkSlice";
import useGlobalToast from "../../GlobalComponents/GlobalToast";
import { useFileUploader } from "../../Custom Hooks/CustomeHook";
import GlobalTable from "../../GlobalComponents/GlobalTable";
import ShowHomework from "./components/ShowHomework";
import PosthomeWork from "./components/PosthomeWork";

function StudentHomeWork() {
  const showToast = useGlobalToast();
  const { uploadedData, handleFileUpload, setUploadedData } = useFileUploader();
  const [homeworks, setHomeworks] = useState([]);
  const [SubmitData, setSubmitData] = useState([]);
  const [selectedHomework, setSelectedHomework] = useState(null);
  const { InstituteId, userId } = getCommonCredentials();
  const [popupData, setPopupData] = useState(null);
  const { data: AssignedHomework, isLoading: isAssignedHomeworkLoading } =
    useGetHomeworkByInstituteQuery(InstituteId, { skip: !InstituteId });
  const { data: StudentSubmission, isLoading: isStudentSubmissionLoading } =
    useGetSubmissionsByInstituteIdQuery(InstituteId, { skip: !InstituteId });
  const [addSubmission] = useAddSubmissionMutation();
  const [viewSubmissionsModal, setViewSubmissionsModal] = useState(false);
  useEffect(() => {
    if (StudentSubmission) {
      setSubmitData(StudentSubmission?.items);
    }
  }, [StudentSubmission]);
  useEffect(() => {
    if (AssignedHomework) {
      setHomeworks(AssignedHomework?.items);
    }
  }, [AssignedHomework]);

  const handleStudenthomework = async (value) => {
    const data = { ...value, fileUrl: uploadedData?.fileUrl };
    console.log(data);
    
    try {
      const response = await addSubmission(data);
      if (response.data.status === 201) {
        showToast("Submission Success", "success");
        setPopupData(false);
      }
    } catch (error) {
      console.error("Error submitting homework:", error);
      showToast("You Have already submitted", "error");
    }
  };
  const handleDownloadPDF = (homework) => {
    const content = document.createElement("div");
    content.innerHTML = `
          <div style="padding: 30px; font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto;">
            <div style="text-align: center; margin-bottom: 30px; border-bottom: 2px solid #003467; padding-bottom: 20px;">
              <h1 style="color: #003467; margin: 0; font-size: 24px;">Homework Assignment</h1>
              <p style="color: #666; margin: 10px 0 0 0; font-size: 14px;">
                Due Date: ${new Date(homework.dueDate).toLocaleDateString(
                  "en-US",
                  {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                )}
              </p>
            </div>
      
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #003467; margin: 0 0 15px 0; font-size: 20px;">${
                homework.title
              }</h2>
              <div style="color: #666; font-size: 14px;">
                <span>Assigned By: ${
                  homework.assignedBy?.fullName?.firstName
                } ${homework.assignedBy?.fullName?.lastName}</span>
              </div>
            </div>
      
            ${
              homework.attachments?.length
                ? `<div style="margin-top: 25px;">
                    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;">
                      ${homework.attachments
                        .map(
                          (attachment) => `
                            <div style="break-inside: avoid; margin-bottom: 20px;">
                              ${
                                attachment.fileUrl
                                  ? `<img 
                                      src="${attachment.fileUrl}" 
                                      alt="${attachment.fileName}"
                                      style="width: 100%; max-height: 300px; object-fit: contain; border-radius: 8px; margin-bottom: 10px;"
                                      crossorigin="anonymous"
                                    />`
                                  : `<div style="padding: 15px; background-color: #f8f9fa; border-radius: 8px; text-align: center;">
                                      <i class="fa fa-file-o" style="font-size: 24px; color: #666;"></i>
                                      <p style="margin: 10px 0 0 0; color: #666;">${attachment.fileName}</p>
                                    </div>`
                              }
                            </div>`
                        )
                        .join("")}
                    </div>
                  </div>`
                : ""
            }
          </div>
        `;

    const options = {
      margin: [0.5, 0.5],
      filename: `homework_${homework.title
        .replace(/\s+/g, "_")
        .toLowerCase()}.pdf`,
      image: { type: "jpeg/png", quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: true,
        imageTimeout: 15000,
      },
      jsPDF: {
        unit: "in",
        format: "a4",
        orientation: "portrait",
        compress: true,
      },
    };

    toast.info("Generating PDF...", {
      autoClose: false,
      toastId: "pdfGeneration",
    });

    const images = content.getElementsByTagName("img");
    const imagePromises = Array.from(images).map((img) => {
      return new Promise((resolve) => {
        img.onload = resolve;
        img.onerror = resolve; // Agar koi image load na ho to bhi process chale
      });
    });

    Promise.all(imagePromises)
      .then(() => {
        html2pdf()
          .from(content)
          .set(options)
          .save()
          .then(() => {
            toast.dismiss("pdfGeneration");
            toast.success("PDF downloaded successfully!");
          })
          .catch((error) => {
            toast.dismiss("pdfGeneration");
            console.error("Error generating PDF:", error);
            toast.error("Error downloading PDF");
          });
      })
      .catch((error) => {
        toast.dismiss("pdfGeneration");
        console.error("Error loading images:", error);
        toast.error("Error loading images");
      });
  };
  const getFileType = (url) => {
    if (!url) return null;
    const extension = url.split(".").pop().toLowerCase();
    if (extension === "pdf") return "pdf";
    if (["jpg", "jpeg", "png", "gif"].includes(extension)) return "image";
    return "other";
  };

  const headerTable1 = ["Title", "Assigned", "Class", "Date", "Description"];
  const tableData1 = homeworks?.map((homework) => ({
    homework: homework,
    Title: homework.title,
    Assigned:
      homework?.assignedBy?.fullName?.firstName +
        " " +
        homework?.assignedBy?.fullName?.lastName || "N/A",
    Class:
      homework?.assignedTo?.className?.map((c) => c.className).join(", ") ||
      "N/A",
    Date: new Date(homework?.dueDate).toLocaleDateString() || "N/A",
    Description: homework?.assignedTaskdescription || "N/A",
  }));
  const actions1 = [
    {
      label: "Submit",
      name: "Submit",
      className: "btn btn-info mx-2",
      onClick: (row) => {
        setPopupData(true);
        setSelectedHomework(row.homework);
      },
    },
    {
      label: "Download",
      className: "btn btn-primary mx-2",
      icon: "fa fa-download",
      onClick: (row) => handleDownloadPDF(row.homework),
    },
  ];

   return (
    <>
      <div className="page-wrapper container pt-5">
        <div className="content">
          <div className="d-md-flex d-block align-items-center justify-content-between mb-3">
            <div className="my-auto mb-2">
              <h3 className="page-title mb-1">Home Work</h3>
              <nav>
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    <a href="index.html">Dashboard</a>
                  </li>
                  <li className="breadcrumb-item">
                    <a href="#">Academic</a>
                  </li>
                  <li className="breadcrumb-item active">Home Work</li>
                </ol>
              </nav>
            </div>
          </div>
          <div className="card">
            <div className="d-flex justify-content-end mt-3 me-4">
              <button
                className="btn btn-primary"
                onClick={() => setViewSubmissionsModal(true)}
              >
                View Submissions
              </button>
            </div>
            <div className="card-body">
              <GlobalTable
                headers={headerTable1}
                actions={actions1}
                data={tableData1}
                loading={
                  isAssignedHomeworkLoading || isStudentSubmissionLoading
                }
                noDataMessage={"No data available"}
              />
            </div>
          </div>
        </div>
        <PosthomeWork
        popupData={popupData}
        setPopupData={setPopupData}
        selectedHomework={selectedHomework}
        handleStudenthomework={handleStudenthomework}
        handleFileUpload={handleFileUpload}
        />
        <ShowHomework
          viewSubmissionsModal={viewSubmissionsModal}
          SubmitData={SubmitData}
          setViewSubmissionsModal={setViewSubmissionsModal}
          getFileType={getFileType}
        />
      </div>
    </>
  );
}
export default StudentHomeWork;
