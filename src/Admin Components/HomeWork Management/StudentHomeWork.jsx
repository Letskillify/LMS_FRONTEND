import React, { useEffect, useState } from "react";
import { useGetHomeworkByInstituteQuery } from "../../Redux/Api/HomeworkSlice";
import { getCommonCredentials } from "../../GlobalHelper/CommonCredentials";
import { toast } from "react-toastify";
import html2pdf from "html2pdf.js";
import { ErrorMessage, Field, Formik, Form } from "formik";
import * as Yup from "yup";
import {
  useAddSubmissionMutation,
  useGetSubmissionsByInstituteIdQuery,
} from "../../Redux/Api/StudentHomeworkSlice";
import useGlobalToast from "../../GlobalComponents/GlobalToast";
import { useFileUploader } from "../../Custom Hooks/CustomeHook";

function StudentHomeWork() {
  const showToast = useGlobalToast();
  const { uploadedData, handleFileUpload, setUploadedData } = useFileUploader();
  const [homeworks, setHomeworks] = useState([]);
  const [SubmitData, setSubmitData] = useState([]);
  const [selectedHomework, setSelectedHomework] = useState(null);
  const { InstituteId, userId } = getCommonCredentials();
  const [popupData, setPopupData] = useState(null);
  const { data: AssignedHomework } = useGetHomeworkByInstituteQuery(
    InstituteId,
    { skip: !InstituteId }
  );
  const { data: StudentSubmission } = useGetSubmissionsByInstituteIdQuery(
    InstituteId,
    { skip: !InstituteId }
  );
  const [addSubmission] = useAddSubmissionMutation();
  const [viewSubmissionsModal, setViewSubmissionsModal] = useState(false);
  const [showImagesModal, setShowImagesModal] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  useEffect(() => {
    if (StudentSubmission) {
      setSubmitData(StudentSubmission);
    }
  }, [StudentSubmission]);
  useEffect(() => {
    if (AssignedHomework) {
      setHomeworks(AssignedHomework);
    }
  }, [AssignedHomework]);

  const handleStudenthomework = async (value) => {
    const data = { ...value, fileUrl: uploadedData?.fileUrl };
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
    const extension = url.split('.').pop().toLowerCase();
    if (extension === 'pdf') return 'pdf';
    if (['jpg', 'jpeg', 'png', 'gif'].includes(extension)) return 'image';
    return 'other';
  };

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
                View ubmissions
              </button>
            </div>
            <div className="card-body">
              <div style={{ overflowX: "auto" }}>
                <table className="table">
                  <thead>
                    <tr className="text-center">
                      <th>Title</th>
                      <th>Assigned By</th>
                      <th>Class</th>
                      <th>Date</th>
                      <th>Discripton</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {homeworks?.items?.map((item) => (
                      <tr key={item?._id} className="text-center">
                        <td>{item?.title || "N/A"}</td>
                        <td>
                          {item?.assignedBy?.fullName?.firstName +
                            " " +
                            item?.assignedBy?.fullName?.lastName || "N/A"}
                        </td>
                        <td>
                          {item?.assignedTo?.className
                            ?.map((c) => c.className)
                            .join(", ") || "N/A"}
                        </td>
                        <td>
                          {new Date(item?.dueDate).toLocaleDateString() ||
                            "N/A"}
                        </td>
                        <td>{item?.assignedTaskdescription || "N/A"}</td>
                        <td>
                          <span className="d-flex justify-content-center">
                            <button
                              className="btn btn-info mx-2"
                              onClick={() => {
                                setPopupData(true);
                                setSelectedHomework(item);
                              }}
                            >
                              Submit
                            </button>

                            <button
                              className="btn btn-primary mx-2"
                              onClick={() => handleDownloadPDF(item)}
                              title="Download PDF"
                            >
                              <i
                                className="fa fa-download"
                                aria-hidden="true"
                              ></i>
                            </button>
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {popupData && (
          <div className="modal show d-block" tabIndex="-1">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Submit Homework</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setPopupData(false)}
                  ></button>
                </div>

                <Formik
                  initialValues={{
                    instituteId: InstituteId,
                    homeworkId: selectedHomework?._id,
                    studentId: userId,
                    fileUrl: "",
                    feedback: "",
                  }}
                  onSubmit={(value) => handleStudenthomework(value)}
                >
                  {({}) => (
                    <Form className="modal-body">
                      <div className="mb-3">
                        <label className="form-label">File URL</label>
                        <input
                          type="file"
                          name="fileUrl"
                          className="form-control"
                          onChange={(e) => {
                            handleFileUpload(e, "fileUrl");
                          }}
                        />
                        <ErrorMessage
                          name="fileUrl"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Feedback</label>
                        <Field
                          component="textarea"
                          name="feedback"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="feedback"
                          component="div"
                          className="text-danger"
                        />
                      </div>

                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          onClick={() => setPopupData(false)}
                        >
                          Close
                        </button>
                        <button type="submit" className="btn btn-primary">
                          Submit
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        )}

        {viewSubmissionsModal && SubmitData?.items?.length > 0 && (
          <div className="modal show d-block" tabIndex="-1">
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">My Homework Submissions</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setViewSubmissionsModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>File</th>
                          <th>Submission Date</th>
                          <th>Feedback</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {SubmitData?.items?.map((submission) => (
                          <tr key={submission._id}>
                            <td>
                              <div className="d-flex align-items-center justify-content-between">
                                <div 
                                  className="position-relative cursor-pointer"
                                  onClick={() => {
                                    setSelectedSubmission(submission);
                                    setShowImagesModal(true);
                                  }}
                                >
                                  {submission.fileUrl && (
                                    getFileType(submission.fileUrl) === 'pdf' ? (
                                      <div className="d-flex align-items-center">
                                        <i className="fa fa-file-pdf-o fa-2x text-danger"></i>
                                        <span className="ms-2">View PDF</span>
                                      </div>
                                    ) : (
                                      <div className="d-flex align-items-center">
                                        <img 
                                          src={submission.fileUrl || '-'}
                                          alt="submission preview" 
                                          style={{ 
                                            width: '50px', 
                                            height: '50px', 
                                            objectFit: 'cover',
                                            borderRadius: '4px'
                                          }}
                                        />
                                      </div>
                                    )
                                  )}
                                </div>
                                </div>
                            </td>
                            <td>{new Date(submission.submissionDate).toLocaleDateString()}</td>
                            <td>{submission.feedback || "No feedback"}</td>
                            <td>
                              <span className="badge bg-success">Submitted</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setViewSubmissionsModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {showImagesModal && selectedSubmission && (
          <div className="modal show d-block" tabIndex="-1">
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">
                    {getFileType(selectedSubmission.fileUrl) === 'pdf' 
                      ? 'PDF Document' 
                      : 'Submitted Image'
                    }
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => {
                      setShowImagesModal(false);
                      setSelectedSubmission(null);
                    }}
                  ></button>
                </div>
                <div className="modal-body">
                  {getFileType(selectedSubmission.fileUrl) === 'pdf' ? (
                    <div className="ratio ratio-16x9" style={{ height: '80vh' }}>
                      <iframe
                        src={selectedSubmission.fileUrl}
                        title="PDF Viewer"
                        width="100%"
                        height="100%"
                        style={{ border: 'none' }}
                      ></iframe>
                    </div>
                  ) : (
                    <div className="text-center">
                      <img
                        src={selectedSubmission.fileUrl}
                        alt="submission"
                        className="img-fluid rounded"
                        style={{
                          maxHeight: '70vh',
                          objectFit: 'contain'
                        }}
                      />
                    </div>
                  )}
                </div>
                <div className="modal-footer">
                  <a 
                    href={selectedSubmission.fileUrl}
                    download
                    className="btn btn-primary"
                  >
                    <i className="fa fa-download me-2"></i>
                    Download {getFileType(selectedSubmission.fileUrl) === 'pdf' ? 'PDF' : 'Image'}
                  </a>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      setShowImagesModal(false);
                      setSelectedSubmission(null);
                    }}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default StudentHomeWork;
