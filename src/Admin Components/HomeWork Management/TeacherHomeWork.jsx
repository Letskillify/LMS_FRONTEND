import { Field, Form, Formik } from "formik";
import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import * as Yup from "yup";
import { getCommonCredentials } from "../../GlobalHelper/CommonCredentials";
import {
  useCreateHomeworkMutation,
  useGetAllHomeworkQuery,
  useGetHomeworkByInstituteQuery,
} from "../../Redux/Api/HomeworkSlice";
import { useFileUploader } from "../../Custom Hooks/CustomeHook";
import { toast } from "react-toastify";
import html2pdf from 'html2pdf.js';

const ClassHomeWork = () => {
  const { Class, TeacherData, Course, Subject, InstituteId } =
    getCommonCredentials();
  console.log(InstituteId, "InstituteId");
  const [allData, setAllData] = useState({});
  console.log("allData", allData);
  const [editingHomework, setEditingHomework] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const { uploadedData, handleFileUpload, isLoading, setUploadedData } = useFileUploader();

  const formatDateForInput = (isoDate) => {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const { data: AssignedHomework } = useGetHomeworkByInstituteQuery(InstituteId, {
    skip: !InstituteId,
  });
  const [createHomework] = useCreateHomeworkMutation();
  //   const [deleteHomework] = useDeleteHomeworkMutation();

  console.log("AssignedHomework", AssignedHomework);
  useEffect(() => {
    if (AssignedHomework) {
      setAllData(AssignedHomework);
    }
  }, [AssignedHomework]);

  const handleDeleteOne = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5500/api/homework/add-trash/${id}`
      );
      if (response.status === 200) {
        setAllData((prevClasses) =>
          prevClasses.filter((item) => item._id !== id)
        );
      } else {
        console.error("Failed to delete homework:", response.data);
      }
    } catch (error) {
      console.error(
        "Error deleting homework:",
        error.response?.data || error.message
      );
    }
  };

  // Handle file selection and upload to Cloudinary
  const handleFileChange = async (e, setFieldValue, values) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(prev => [...prev, ...files]);
    
    // Upload each file to Cloudinary with unique identifiers
    files.forEach((file, index) => {
      // Create a unique filename by combining multiple unique identifiers
      const uniqueId = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const fileExtension = file.name.split('.').pop();
      const safeFileName = file.name.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
      
      const uniqueFileName = `homework_${uniqueId}_${safeFileName}`;
      
      handleFileUpload({
        target: {
          files: [file]
        }
      }, uniqueFileName);
    });
  };

  // Handle file removal
  const handleRemoveFile = (index, setFieldValue, values) => {
    const fileToRemove = selectedFiles[index];
    const fileNameToRemove = fileToRemove.name.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
    
    // Remove from selectedFiles
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    
    // Remove from uploadedData by finding the matching key
    const keyToRemove = Object.keys(uploadedData).find(key => key.includes(fileNameToRemove));
    if (keyToRemove) {
      const newUploadedData = { ...uploadedData };
      delete newUploadedData[keyToRemove];
      setUploadedData(newUploadedData);
    }

    // Update form values
    const updatedAttachments = [...values.attachments];
    updatedAttachments.splice(index, 1);
    setFieldValue("attachments", updatedAttachments);
  };

  const handleSubmitHomework = async (values, { resetForm }) => {
    try {
      if (isLoading) {
        toast.warning("Please wait while files are uploading...");
        return;
      }

      // Create homework data with Cloudinary URLs
      const homeworkData = {
        ...values,
        instituteId: InstituteId,
        attachments: Object.entries(uploadedData).map(([key, url]) => {
          // Extract the original filename from the key
          const originalFileName = key.split('_').slice(2).join('_');
          
          // Find the matching file from selectedFiles
          const matchingFile = selectedFiles.find(file => 
            file.name.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase() === originalFileName
          );

          return {
            fileName: matchingFile?.name || originalFileName,
            fileUrl: url,
            fileType: matchingFile?.type || 'unknown',
            fileSize: matchingFile?.size || 0,
            uploadedAt: new Date().toISOString()
          };
        })
      };

      console.log("Submitting homework with attachments:", homeworkData.attachments);

      const response = await createHomework(homeworkData);
      
      if (response.error) {
        toast.error(response.error.message || 'Error creating homework');
        return;
      }

      toast.success('Homework created successfully!');
      resetForm();
      setSelectedFiles([]);
      // Clear the uploaded data
      setUploadedData({});
      const addModal = document.getElementById("add_home_work");
      const modal = bootstrap.Modal.getInstance(addModal);
      modal.hide();
    } catch (error) {
      console.error("Error adding homework:", error);
      toast.error(error.response?.data?.message || 'Error creating homework');
    }
  };

  const handleEditClick = (homework) => {
    setEditingHomework({
      ...homework,
      dueDate: formatDateForInput(homework.dueDate),
    });

    const editModal = new bootstrap.Modal(
      document.getElementById("edit_homework_modal")
    );
    editModal.show();
  };

  const handleUpdateHomework = async (values, { resetForm }) => {
    try {
      const response = await axios.put(
        `http://localhost:5500/api/homework/update/${values._id}`,
        values
      );

      const updatedHomework = response.data;
      console.log("Updated Homework:", updatedHomework);

      const fetchHomework = async () => {
        try {
          const homeworkResponse = await axios.get(
            "http://localhost:5500/api/homework/get"
          );
          setAllData(homeworkResponse.data);
        } catch (error) {
          console.error(
            "Error fetching updated homework:",
            error.response?.data || error.message
          );
        }
      };

      fetchHomework();

      resetForm();
      setEditingHomework(null);
      const editModal = document.getElementById("edit_homework_modal");
      const modal = bootstrap.Modal.getInstance(editModal);
      modal.hide();
    } catch (error) {
      console.error(
        "Error updating homework:",
        error.response?.data || error.message
      );
    }
  };

  const handleDownloadPDF = (homework) => {
    const content = document.createElement('div');
    content.innerHTML = `
      <div style="padding: 30px; font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto;">
        <div style="text-align: center; margin-bottom: 30px; border-bottom: 2px solid #003467; padding-bottom: 20px;">
          <h1 style="color: #003467; margin: 0; font-size: 24px;">Homework Assignment</h1>
          <p style="color: #666; margin: 10px 0 0 0; font-size: 14px;">
            Due Date: ${new Date(homework.dueDate).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>

        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h2 style="color: #003467; margin: 0 0 15px 0; font-size: 20px;">${homework.title}</h2>
          <div style="color: #666; font-size: 14px;">
            <span>Assigned By: ${homework.assignedBy?.fullName?.firstName} ${homework.assignedBy?.fullName?.lastName}</span>
          </div>
        </div>

        <div style="margin-bottom: 25px; background-color: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
          <h3 style="color: #003467; margin: 0 0 15px 0; font-size: 18px;">Description</h3>
          <p style="margin: 0 0 20px 0; line-height: 1.6;">${homework.assignedTaskdescription || 'No description provided'}</p>
          
          <h3 style="color: #003467; margin: 20px 0 15px 0; font-size: 18px;">Additional Instructions</h3>
          <p style="margin: 0; line-height: 1.6;">${homework.additionalInstructions || 'No additional instructions'}</p>
        </div>

        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-bottom: 25px;">
          <div style="background-color: #e3f2fd; padding: 15px; border-radius: 8px;">
            <h4 style="color: #003467; margin: 0 0 10px 0; font-size: 16px;">Classes</h4>
            <p style="margin: 0; font-size: 14px;">${homework.assignedTo?.className?.map(c => c.className).join(', ') || 'N/A'}</p>
          </div>
          <div style="background-color: #e8f5e9; padding: 15px; border-radius: 8px;">
            <h4 style="color: #003467; margin: 0 0 10px 0; font-size: 16px;">Courses</h4>
            <p style="margin: 0; font-size: 14px;">${homework.assignedTo?.course?.map(c => c.courseName).join(', ') || 'N/A'}</p>
          </div>
          <div style="background-color: #fff3e0; padding: 15px; border-radius: 8px;">
            <h4 style="color: #003467; margin: 0 0 10px 0; font-size: 16px;">Subjects</h4>
            <p style="margin: 0; font-size: 14px;">${homework.assignedTo?.subject?.map(s => s.subjectName).join(', ') || 'N/A'}</p>
          </div>
        </div>

        ${homework.attachments?.length ? `
          <div style="margin-top: 25px;">
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;">
              ${homework.attachments.map(attachment => `
                <div style="break-inside: avoid; margin-bottom: 20px;">
                  ${attachment.fileUrl ? `
                    <img 
                      src="${attachment.fileUrl}" 
                      alt="${attachment.fileName}"
                      style="width: 100%; max-height: 300px; object-fit: contain; border-radius: 8px; margin-bottom: 10px;"
                      crossorigin="anonymous"
                    />
                  ` : `
                    <div style="padding: 15px; background-color: #f8f9fa; border-radius: 8px; text-align: center;">
                      <i class="fa fa-file-o" style="font-size: 24px; color: #666;"></i>
                      <p style="margin: 10px 0 0 0; color: #666;">${attachment.fileName}</p>
                    </div>
                  `}
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}
      </div>
    `;

    // PDF options with better image handling
    const options = {
      margin: [0.5, 0.5],
      filename: `homework_${homework.title.replace(/\s+/g, '_').toLowerCase()}.pdf`,
      image: { 
        type: 'jpeg', 
        quality: 0.98
      },
      html2canvas: { 
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: true,
        imageTimeout: 15000,
        onclone: function(clonedDoc) {
          // Force images to load in cloned document
          Array.from(clonedDoc.images).forEach(img => {
            img.crossOrigin = "anonymous";
          });
        }
      },
      jsPDF: { 
        unit: 'in', 
        format: 'a4', 
        orientation: 'portrait',
        compress: true
      }
    };

    // Generate PDF with loading indicator
    toast.info('Generating PDF...', { autoClose: false, toastId: 'pdfGeneration' });
    
    // Wait for images to load before generating PDF
    const images = content.getElementsByTagName('img');
    const imagePromises = Array.from(images).map(img => {
      return new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        // Force image reload
        const originalSrc = img.src;
        img.src = '';
        img.src = originalSrc;
      });
    });

    Promise.all(imagePromises)
      .then(() => {
        html2pdf().from(content).set(options).save()
          .then(() => {
            toast.dismiss('pdfGeneration');
            toast.success('PDF downloaded successfully!');
          })
          .catch(error => {
            toast.dismiss('pdfGeneration');
            console.error('Error generating PDF:', error);
            toast.error('Error downloading PDF');
          });
      })
      .catch(error => {
        toast.dismiss('pdfGeneration');
        console.error('Error loading images:', error);
        toast.error('Error loading images');
      });
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    assignedTaskdescription: Yup.string(),
    additionalInstructions: Yup.string(),
    assignedBy: Yup.string().required("Assigned By is required"),
    assignedTo: Yup.object().shape({
      className: Yup.array()
        .of(Yup.string().required("Class is required"))
        .min(1, "Class is required"),
      course: Yup.array()
        .of(Yup.string().required("Course is required"))
        .min(1, "Course is required"),
      subject: Yup.array()
        .of(Yup.string().required("Subject is required"))
        .min(1, "Subject is required"),
    }),
    dueDate: Yup.date().required("Due Date is required"),
    attachments: Yup.array().of(
      Yup.object().shape({
        fileName: Yup.string().required("File Name is required"),
        fileUrl: Yup.string()
          .url("Invalid URL format")
          .required("File URL is required"),
      })
    ),
  });

  return (
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
          <div className="card-header d-flex align-items-center justify-content-between">
            <h4>Class Home Work</h4>
            <button
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#add_home_work"
            >
              <i className="ti ti-square-rounded-plus-filled me-2" /> Add Home
              Work
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
                  {allData?.items?.map((item) => (
                    <tr key={item?._id} className="text-center">
                      <td>{item?.title || "N/A"}</td>
                      <td>{item?.assignedBy?.fullName?.firstName + " " + item?.assignedBy?.fullName?.lastName || "N/A"}</td>
                      <td>{item?.assignedTo?.className?.map((c) => c.className).join(", ") || "N/A"}</td>
                      <td>{new Date(item?.dueDate).toLocaleDateString() || "N/A"}</td>
                      <td>{item?.assignedTaskdescription || "N/A"}</td>
                      <td>
                        <span className="d-flex justify-content-center">
                          <button
                            className="btn btn-primary mx-2"
                            onClick={() => handleDownloadPDF(item)}
                            title="Download PDF"
                          >
                            <i className="fa fa-download" aria-hidden="true"></i>
                          </button>
                          <button
                            className="btn btn-warning mx-2"
                            onClick={() => handleEditClick(item)}
                          >
                            <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                          </button>
                          <button
                            className="btn btn-danger mx-2"
                            onClick={() => handleDeleteOne(item?._id)}
                          >
                            <i className="fa fa-trash-o" aria-hidden="true"></i>
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

      <div
        className="modal fade pt-5"
        id="add_home_work"
        tabIndex="-1"
        aria-labelledby="addHomeworkModal"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addHomeworkModal">
                Add Homework
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <Formik
                initialValues={{
                  instituteId: InstituteId,
                  title: "",
                  assignedTaskdescription: "",
                  additionalInstructions: "",
                  assignedBy: "",
                  assignedTo: { className: [], course: [], subject: [] },
                  dueDate: "",
                  attachments: [],
                }}
                enableReinitialize
                // validationSchema={validationSchema}
                onSubmit={handleSubmitHomework}
              >
                {({ values, errors, touched, setFieldValue, handleChange }) => (
                  <Form>
                    <div className="row">
                      <div className="mb-3 col-md-6">
                        <label htmlFor="title" className="form-label">
                          Title
                        </label>
                        <Field name="title" className="form-control" />
                        {errors.title && touched.title && (
                          <div className="text-danger">{errors.title}</div>
                        )}
                      </div>
                      <div className="mb-3 col-md-6">
                        <label htmlFor="dueDate" className="form-label">
                          Due Date
                        </label>
                        <Field
                          name="dueDate"
                          type="date"
                          className="form-control"
                        />
                        {errors.dueDate && touched.dueDate && (
                          <div className="text-danger">{errors.dueDate}</div>
                        )}
                      </div>

                      <div className="row">
                        <div className="mb-3 col-md-6">
                          <label>Assigned By</label>
                          <Field
                            as="select"
                            name="assignedBy"
                            className="form-select"
                          >
                            <option value="">Select Teacher</option>
                            {TeacherData?.map((teacher) => (
                              <option key={teacher?._id} value={teacher?._id}>
                                {teacher.fullName.firstName +
                                  " " +
                                  teacher.fullName.lastName}
                              </option>
                            ))}
                          </Field>
                        </div>

                        {/* Assigned to Class */}
                        <div className="mb-3 col-md-6">
                          <label>Assigned To Class</label>
                          <Field name="assignedTo.className">
                            {({ field, form }) => (
                              <Select
                                isMulti
                                options={Class?.map((cls) => ({
                                  value: cls._id,
                                  label: cls.className,
                                }))}
                                value={
                                  field.value?.map((id) => ({
                                    value: id,
                                    label: Class.find((cls) => cls._id === id)
                                      ?.className,
                                  })) || []
                                }
                                onChange={(selected) => {
                                  form.setFieldValue(
                                    "assignedTo.className",
                                    selected.map((s) => s.value)
                                  );
                                  setShowModal(true);
                                }}
                                placeholder="Select Classes"
                                styles={{
                                  multiValue: (base) => ({
                                    ...base,
                                    backgroundColor: "#e0f7fa",
                                    borderRadius: "5px",
                                    padding: "2px",
                                  }),
                                }}
                              />
                            )}
                          </Field>
                          {errors.assignedTo?.class &&
                            touched.assignedTo?.class && (
                              <div className="text-danger">
                                {errors.assignedTo.class}
                              </div>
                            )}
                        </div>

                        {showModal && (
                          <>
                            {/* Course Selection */}
                            <div className="mb-3 col-md-6">
                              <label>Course</label>
                              <Field name="assignedTo.course">
                                {({ field, form, value }) => (
                                  <Select
                                    isMulti
                                    options={Course?.map((c) => ({
                                      value: c._id,
                                      label: c.courseName,
                                    }))}
                                    value={
                                      field.value?.map((id) => ({
                                        value: id,
                                        label: Course.find((c) => c._id === id)
                                          ?.courseName,
                                      })) || []
                                    }
                                    onChange={(selected) =>
                                      form.setFieldValue(
                                        "assignedTo.course",
                                        selected.map((s) => s.value)
                                      )
                                    }
                                    placeholder="Select Courses"
                                    styles={{
                                      multiValue: (base) => ({
                                        ...base,
                                        backgroundColor: "#e0f7fa",
                                        borderRadius: "5px",
                                        padding: "2px",
                                      }),
                                    }}
                                  />
                                )}
                              </Field>
                              {errors.assignedTo?.course &&
                                touched.assignedTo?.course && (
                                  <div className="text-danger">
                                    {errors.assignedTo.course}
                                  </div>
                                )}
                            </div>

                            {/* Subject Selection */}
                            <div className="mb-3 col-md-6">
                              <label>Subject</label>
                              <Field name="assignedTo.subject">
                                {({ field, form }) => (
                                  <Select
                                    isMulti
                                    options={Subject?.map((sub) => ({
                                      value: sub._id,
                                      label: sub.subjectName,
                                    }))}
                                    // name = "subject"
                                    value={
                                      field.value?.map((id) => ({
                                        value: id,
                                        label: Subject.find(
                                          (sub) => sub._id === id
                                        )?.subjectName,
                                      })) || []
                                    }
                                    onChange={(selected) =>
                                      form.setFieldValue(
                                        "assignedTo.subject",
                                        selected.map((s) => s.value)
                                      )
                                    }
                                    placeholder="Select Subjects"
                                    styles={{
                                      multiValue: (base) => ({
                                        ...base,
                                        backgroundColor: "#e0f7fa",
                                        borderRadius: "5px",
                                        padding: "2px",
                                      }),
                                    }}
                                  />
                                )}
                              </Field>
                              {errors.assignedTo?.subject &&
                                touched.assignedTo?.subject && (
                                  <div className="text-danger">
                                    {errors.assignedTo.subject}
                                  </div>
                                )}
                            </div>
                          </>
                        )}
                      </div>

                      <div className="row">
                        <div className="mb-3 col-md-6">
                          <label
                            htmlFor="assignedTaskdescription"
                            className="form-label"
                          >
                            Description
                          </label>
                          <Field
                            as="textarea"
                            name="assignedTaskdescription"
                            className="form-control"
                          />
                          {errors.assignedTaskdescription &&
                            touched.assignedTaskdescription && (
                              <div className="text-danger">
                                {errors.assignedTaskdescription}
                              </div>
                            )}
                        </div>
                        <div className="mb-3 col-md-6">
                          <label
                            htmlFor="additionalInstructions"
                            className="form-label"
                          >
                            Additional Instructions
                          </label>
                          <Field
                            as="textarea"
                            name="additionalInstructions"
                            className="form-control"
                          />
                          {errors.additionalInstructions &&
                            touched.additionalInstructions && (
                              <div className="text-danger">
                                {errors.additionalInstructions}
                              </div>
                            )}
                        </div>
                      </div>

                      <div className="mb-3 col-md-12">
                        <label htmlFor="attachments" className="form-label">
                          Attachments
                        </label>
                        
                        {/* File Preview Section */}
                        <div className="selected-files mb-3">
                          {selectedFiles.map((file, index) => (
                            <div key={index} className="selected-file-item d-flex align-items-center mb-2 p-2 border rounded">
                              {file.type.startsWith('image/') && (
                                <img 
                                  src={URL.createObjectURL(file)} 
                                  alt={`Preview ${index}`} 
                                  style={{height: '50px', width: '50px', objectFit: 'cover'}}
                                  className="me-2"
                                />
                              )}
                              <span className="flex-grow-1">{file.name}</span>
                              <div className="d-flex align-items-center">
                                {isLoading && (
                                  <div className="spinner-border spinner-border-sm text-primary me-2" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                  </div>
                                )}
                                <button 
                                  type="button" 
                                  className="btn btn-danger btn-sm"
                                  onClick={() => handleRemoveFile(index, setFieldValue, values)}
                                >
                                  <i className="fa fa-times"></i>
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* File Input */}
                        <div className="file-upload-wrapper">
                          <input
                            type="file"
                            className="form-control"
                            multiple
                            accept="image/*"
                            onChange={(e) => handleFileChange(e, setFieldValue, values)}
                            disabled={isLoading}
                          />
                          <small className="text-muted d-block mt-1">You can select multiple images</small>
                          {isLoading && (
                            <small className="text-primary d-block mt-1">
                              Uploading files... Please wait
                            </small>
                          )}
                        </div>
                      </div>
                    </div>
                    <button type="submit" className="btn btn-primary mx-2">
                      Submit
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger mx-2"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    >
                      Close
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>

      {/* <div
        className="modal fade mt-5 pt-5"
        id="edit_homework_modal"
        tabIndex="-1"
        aria-labelledby="editHomeworkModal"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editHomeworkModal">
                Edit Homework
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {editingHomework && (
                <Formik
                  enableReinitialize
                  initialValues={editingHomework}
                  // validationSchema={validationSchema}
                  onSubmit={handleUpdateHomework}
                >
                  {({ errors, touched }) => (
                    <Form>
                      <div className="row">
                        <div className="mb-3 col-md-6">
                          <label htmlFor="class" className="form-label">
                            Class
                          </label>
                          <Field
                            name="assignedTo.class"
                            className="form-control"
                          />
                          {errors.assignedTo?.class &&
                            touched.assignedTo?.class && (
                              <div className="text-danger">
                                {errors.assignedTo.class}
                              </div>
                            )}
                        </div>
                        <div className="mb-3 col-md-6">
                          <label htmlFor="section" className="form-label">
                            Section
                          </label>
                          <Field
                            name="assignedTo.section"
                            className="form-control"
                          />
                          {errors.assignedTo?.section &&
                            touched.assignedTo?.section && (
                              <div className="text-danger">
                                {errors.assignedTo.section}
                              </div>
                            )}
                        </div>
                        <div className="mb-3 col-md-6">
                          <label htmlFor="subject" className="form-label">
                            Subject
                          </label>
                          <Field name="subject" className="form-control" />
                          {errors.subject && touched.subject && (
                            <div className="text-danger">{errors.subject}</div>
                          )}
                        </div>

                        <div className="mb-3 col-md-6">
                          <label htmlFor="title" className="form-label">
                            Title
                          </label>
                          <Field name="title" className="form-control" />
                          {errors.title && touched.title && (
                            <div className="text-danger">{errors.title}</div>
                          )}
                        </div>
                        <div className="mb-3 col-md-6">
                          <label htmlFor="description" className="form-label">
                            Description
                          </label>
                          <Field
                            as="textarea"
                            name="description"
                            className="form-control"
                          />
                          {errors.description && touched.description && (
                            <div className="text-danger">
                              {errors.description}
                            </div>
                          )}
                        </div>
                        <div className="mb-3 col-md-6">
                          <label htmlFor="dueDate" className="form-label">
                            Due Date
                          </label>
                          <Field
                            name="dueDate"
                            type="date"
                            className="form-control"
                          />
                          {errors.dueDate && touched.dueDate && (
                            <div className="text-danger">{errors.dueDate}</div>
                          )}
                        </div>
                      </div>
                      <button type="submit" className="btn btn-success mx-2">
                        Update
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger mx-2"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      >
                        Close
                      </button>
                    </Form>
                  )}
                </Formik>
              )}
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default ClassHomeWork;
