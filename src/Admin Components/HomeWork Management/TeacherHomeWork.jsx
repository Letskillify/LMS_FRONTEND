import { Field, Form, Formik } from "formik";
import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { getCommonCredentials } from "../../GlobalHelper/CommonCredentials";
import {
  useCreateHomeworkMutation,
  useDeleteHomeworkMutation,
  useGetHomeworkByInstituteQuery,
} from "../../Redux/Api/HomeworkSlice";
import { useFileUploader } from "../../Custom Hooks/CustomeHook";
import html2pdf from "html2pdf.js";
import useGlobalToast from "../../GlobalComponents/GlobalToast";
import { toast } from "react-toastify";
import PostTeacherHomework from "./components/PostTeacherhomework";
import GlobalTable from "../../GlobalComponents/GlobalTable";

const ClassHomeWork = () => {
  const showToast = useGlobalToast();
  const [createHomework] = useCreateHomeworkMutation();
  const [deleteHomework] = useDeleteHomeworkMutation();
  
  useEffect(() => {
    if (AssignedHomework) {
      console.log("Assigned Homework:", AssignedHomework);
      setAllData(AssignedHomework?.items);
    }
  }, [AssignedHomework]);

  const handleDeleteOne = async (id) => {
    try {
      const response = await deleteHomework(id);
      if (response.status === 200) {
        showToast("Data Delete Successfully", "success");
        setAllData((prevClasses) =>
          prevClasses.filter((item) => item._id !== id)
        );
      } else {
        console.error("Failed to delete homework:", response.data);
      }
    } catch (error) {
      showToast("Data Deleting Failed", "error");
      console.error(
        "Error deleting homework:",
        error.response?.data || error.message
      );
    }
  };

  // Handle file selection and upload to Cloudinary
  const handleFileChange = async (e, setFieldValue, values) => {
    const files = Array.from(e.target.files);
    setSelectedFiles((prev) => [...prev, ...files]);

    // Upload each file to Cloudinary with unique identifiers
    files.forEach((file, index) => {
      // Create a unique filename by combining multiple unique identifiers
      const uniqueId = `${Date.now()}_${Math.random()
        .toString(36)
        .substr(2, 9)}`;
      const fileExtension = file.name.split(".").pop();
      const safeFileName = file.name
        .replace(/[^a-zA-Z0-9]/g, "_")
        .toLowerCase();

      const uniqueFileName = `homework_${uniqueId}_${safeFileName}`;

      handleFileUpload(
        {
          target: {
            files: [file],
          },
        },
        uniqueFileName
      );
    });
  };

  // Handle file removal
  const handleRemoveFile = (index, setFieldValue, values) => {
    const fileToRemove = selectedFiles[index];
    const fileNameToRemove = fileToRemove.name
      .replace(/[^a-zA-Z0-9]/g, "_")
      .toLowerCase();

    // Remove from selectedFiles
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));

    // Remove from uploadedData by finding the matching key
    const keyToRemove = Object.keys(uploadedData).find((key) =>
      key.includes(fileNameToRemove)
    );
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
          const originalFileName = key.split("_").slice(2).join("_");

          // Find the matching file from selectedFiles
          const matchingFile = selectedFiles.find(
            (file) =>
              file.name.replace(/[^a-zA-Z0-9]/g, "_").toLowerCase() ===
              originalFileName
          );

          return {
            fileName: matchingFile?.name || originalFileName,
            fileUrl: url,
            fileType: matchingFile?.type || "unknown",
            fileSize: matchingFile?.size || 0,
            uploadedAt: new Date().toISOString(),
          };
        }),
      };

      const response = await createHomework(homeworkData);

      if (response.error) {
        toast.error(response.error.message || "Error creating homework");
        return;
      }

      toast.success("Homework created successfully!");
      resetForm();
      setSelectedFiles([]);
      // Clear the uploaded data
      setUploadedData({});
      const addModal = document.getElementById("add_home_work");
      const modal = bootstrap.Modal.getInstance(addModal);
      modal.hide();
    } catch (error) {
      console.error("Error adding homework:", error);
      toast.error(error.response?.data?.message || "Error creating homework");
    }
  };

  const handleDownloadPDF = (homework) => {
    const content = document.createElement("div");
    content.innerHTML = `
      <div style="padding: 30px; font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto;">
        <div style="text-align: center; margin-bottom: 30px; border-bottom: 2px solid #003467; padding-bottom: 20px;">
          <h1 style="color: #003467; margin: 0; font-size: 24px;">Homework Assignment</h1>
          <p style="color: #666; margin: 10px 0 0 0; font-size: 14px;">
            Due Date: ${new Date(homework.dueDate).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h2 style="color: #003467; margin: 0 0 15px 0; font-size: 20px;">${
            homework.title
          }</h2>
          <div style="color: #666; font-size: 14px;">
            <span>Assigned By: ${homework.assignedBy?.fullName?.firstName} ${
      homework.assignedBy?.fullName?.lastName
    }</span>
          </div>
        </div>

        <div style="margin-bottom: 25px; background-color: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
          <h3 style="color: #003467; margin: 0 0 15px 0; font-size: 18px;">Description</h3>
          <p style="margin: 0 0 20px 0; line-height: 1.6;">${
            homework.assignedTaskdescription || "No description provided"
          }</p>
          
          <h3 style="color: #003467; margin: 20px 0 15px 0; font-size: 18px;">Additional Instructions</h3>
          <p style="margin: 0; line-height: 1.6;">${
            homework.additionalInstructions || "No additional instructions"
          }</p>
        </div>

        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-bottom: 25px;">
          <div style="background-color: #e3f2fd; padding: 15px; border-radius: 8px;">
            <h4 style="color: #003467; margin: 0 0 10px 0; font-size: 16px;">Classes</h4>
            <p style="margin: 0; font-size: 14px;">${
              homework.assignedTo?.className
                ?.map((c) => c.className)
                .join(", ") || "N/A"
            }</p>
          </div>
          <div style="background-color: #e8f5e9; padding: 15px; border-radius: 8px;">
            <h4 style="color: #003467; margin: 0 0 10px 0; font-size: 16px;">Courses</h4>
            <p style="margin: 0; font-size: 14px;">${
              homework.assignedTo?.course
                ?.map((c) => c.courseName)
                .join(", ") || "N/A"
            }</p>
          </div>
          <div style="background-color: #fff3e0; padding: 15px; border-radius: 8px;">
            <h4 style="color: #003467; margin: 0 0 10px 0; font-size: 16px;">Subjects</h4>
            <p style="margin: 0; font-size: 14px;">${
              homework.assignedTo?.subject
                ?.map((s) => s.subjectName)
                .join(", ") || "N/A"
            }</p>
          </div>
        </div>

        ${
          homework.attachments?.length
            ? `
          <div style="margin-top: 25px;">
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;">
              ${homework.attachments
                .map(
                  (attachment) => `
                <div style="break-inside: avoid; margin-bottom: 20px;">
                  ${
                    attachment.fileUrl
                      ? `
                    <img 
                      src="${attachment.fileUrl}" 
                      alt="${attachment.fileName}"
                      style="width: 100%; max-height: 300px; object-fit: contain; border-radius: 8px; margin-bottom: 10px;"
                      crossorigin="anonymous"
                    />
                  `
                      : `
                    <div style="padding: 15px; background-color: #f8f9fa; border-radius: 8px; text-align: center;">
                      <i class="fa fa-file-o" style="font-size: 24px; color: #666;"></i>
                      <p style="margin: 10px 0 0 0; color: #666;">${attachment.fileName}</p>
                    </div>
                  `
                  }
                </div>
              `
                )
                .join("")}
            </div>
          </div>
        `
            : ""
        }
      </div>
    `;

    // PDF options with better image handling
    const options = {
      margin: [0.5, 0.5],
      filename: `homework_${homework.title
        .replace(/\s+/g, "_")
        .toLowerCase()}.pdf`,
      image: {
        type: "jpeg/png",
        quality: 0.98,
      },
      html2canvas: {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: true,
        imageTimeout: 15000,
        onclone: function (clonedDoc) {
          // Force images to load in cloned document
          Array.from(clonedDoc.images).forEach((img) => {
            img.crossOrigin = "anonymous";
          });
        },
      },
      jsPDF: {
        unit: "in",
        format: "a4",
        orientation: "portrait",
        compress: true,
      },
    };

    // Generate PDF with loading indicator
    toast.info("Generating PDF...", {
      autoClose: false,
      toastId: "pdfGeneration",
    });

    // Wait for images to load before generating PDF
    const images = content.getElementsByTagName("img");
    const imagePromises = Array.from(images).map((img) => {
      return new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        // Force image reload
        const originalSrc = img.src;
        img.src = "";
        img.src = originalSrc;
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

  const headerTable = [
    " Title",
    "Assigned By",
    "Class",
    "Date",
    " Discripton",
    "Actions",
  ];
  const tableData = allData?.map((teacherHomework) => ({
    teacherHomework: teacherHomework,
    Title: teacherHomework?.title || "N/A",
    AssignedBy:
      teacherHomework?.assignedBy?.fullName?.firstName +
        " " +
        teacherHomework?.assignedBy?.fullName?.lastName || "N/A",
    Class:
      teacherHomework?.assignedTo?.className
        ?.map((c) => c.className)
        .join(", ") || "N/A",
    Date: teacherHomework?.dueDate
      ? new Date(teacherHomework?.dueDate).toLocaleDateString()
      : "N/A",
    Description: teacherHomework?.assignedTaskdescription || "N/A",
  }));
  console.log("allData", allData);

  const actions = [
    {
      label: "Download",
      className: "btn btn-primary mx-2",
      icon: "fa fa-download",
      onClick: (row) => handleDownloadPDF(row.teacherHomework),
    },
    {
      label: "Delete",
      name: "delete",
      className: "btn btn-danger mx-2",
      icon: "fa fa-trash-o",
      onClick: (row) => {
        handleDeleteOne(row.teacherHomework);
      },
    },
  ];
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
              <GlobalTable
                headers={headerTable}
                actions={actions}
                data={tableData}
                loading={isAssignedHomeworkLoading}
                noDataMessage={"No data available"}
              />
            </div>
          </div>
        </div>
      </div>
      <PostTeacherHomework
        handleFileChange={handleFileChange}
        handleRemoveFile={handleRemoveFile}
        selectedFiles={selectedFiles}
        handleSubmitHomework={handleSubmitHomework}
        isLoading={isAssignedHomeworkLoading}
        validationSchema={validationSchema}
      />
    </div>
  );
};
export default ClassHomeWork;