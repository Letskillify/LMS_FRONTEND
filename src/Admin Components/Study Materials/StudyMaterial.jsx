import { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import {
  useFileUploader,
  // useFileUploader,
  // useFileUploader,
  useVideoUploader,
} from "../../Custom Hooks/CustomeHook";
import { getCommonCredentials } from "../../GlobalHelper/CommonCredentials";
import { useCreateStudyMaterialMutation, useDeleteStudyMaterialMutation, useGetStudyMaterialsByInstituteIdQuery, useUpdateStudyMaterialMutation } from "../../Redux/Api/studyMaterialSlice";

function StudyMaterial() {
  const [mainData, setMainData] = useState([]);
  const [studyMaterialData, setStudyMaterialData] = useState([]);
  console.log("studyMaterialData", studyMaterialData);
  const [originalstudyMaterialData, setOriginalStudyMaterialData] = useState(
    []
  );
  const [visibleTeachers, setVisibleTeachers] = useState(20);
  const [Material, setMaterial] = useState("Book");
  const [find, setFind] = useState("");
  // const [ShowForm, setShowForm] = useState("");
  const [addMaterial, setAddMaterial] = useState("");
  const [filteredData, setFilteredData] = useState();
  const [selectedId, setSelectedId] = useState(null);
  // const [edit, setEdit] = useState("");
  // const { uploadedData, handleFileUpload } = useFileUploader();
  // const [fileType, setFileType] = useState("image");
  const { uploadedVideos, uploadProgress, isLoading, handleVideoUpload } =
    useVideoUploader();
  const [uploadCompleted, setUploadCompleted] = useState(false);
  const [uploadfileCompleted, setUploadFileCompleted] = useState(false);
  const { userId, InstituteId } = getCommonCredentials();
  const { uploadedFiles, isfileLoading, fileuploadProgress, handleFileUpload } =
    useFileUploader();

    const {data} = useGetStudyMaterialsByInstituteIdQuery(InstituteId, {skip: !InstituteId});
    const [addStudyMaterial] = useCreateStudyMaterialMutation();
    const [updateStudyMaterial] = useUpdateStudyMaterialMutation();
    const [deleteStudyMaterial] = useDeleteStudyMaterialMutation();

    useEffect(() => {
      if (data) {
        setStudyMaterialData(data?.items);
        setOriginalStudyMaterialData(data);
      }
    }, [data]);
    const deletePost = async (id) => {
      if (!id) {
        console.error("Error: id is not defined.");
        return;
      }

      console.log("Deleting post with ID:", id);
      try {
        const response = await deleteStudyMaterial(id);

        const modal = document.getElementById("delete_material");
        const modalInstance = bootstrap.Modal.getInstance(modal);
        modalInstance.hide();
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    };

  const handleSubmit = async(values, { setSubmitting }, modalId) => {
    const data = {
      ...values,
      fileURL: uploadedData?.fileURL || uploadedVideos?.fileURL,
      document: uploadedFiles?.document,
    };
    // console.log("Form Data:", data);
    await updateStudyMaterial({ id: selectedId, data })
  };

  const loadMoreTeachers = () => {
    setVisibleTeachers((prevCount) => prevCount + 3);
  };

  // Filter select or search bar
  const applyFilter = (e) => {
    const searchValue = e.target.value.toLowerCase();
    console.log("Search value:", searchValue);
    setFind(searchValue);

    const filteredData = studyMaterialData.filter(
      (item) =>
        item.title.toLowerCase().includes(searchValue) ||
        item.subject.toLowerCase().includes(searchValue)
    );

    setStudyMaterialData(filteredData);
  };
  const resetFilters = (e) => {
    console.log("clicked");
    e.preventDefault();
    setFind("");
    setStudyMaterialData(originalstudyMaterialData);
  };

  function refreshBtn() {
    window.location.reload(true);
  }

  async function handleMaterial(e) {
    if (!isLoading) {
      const data = {
        ...e,
        fileURL: uploadedData?.fileURL || uploadedVideos?.fileURL,
        document: uploadedFiles?.document,
      };
      console.log("Form Data:", e);

      try {
        // Make the POST request to add the material
        const response = await axios.post(
          "http://localhost:5500/api/study-material/add",
          data
        );
        console.log("Material added successfully:", response.data);

        // Close the modal after the data has been successfully submitted
        const modal = document.getElementById("add_material");
        const modalInstance = bootstrap.Modal.getInstance(modal);
        modalInstance.hide(); // Close the modal
      } catch (error) {
        console.error("Error adding material:", error.response?.data || error);
        // alert("Error adding material. Please try again.");
      }
    } else {
      alert("Please wait while the data is being uploaded");
    }
    setUploadCompleted(false);
    setUploadFileCompleted(false);
  }

  useEffect(() => {
    console.log(Material);
    const materialData = studyMaterialData?.filter(
      (data) => data?.category === Material?.toLowerCase()
    );
    setMainData(materialData);
    setFilteredData(materialData);
  }, [Material]);

  useEffect(() => {
    if (uploadProgress === 100) {
      setUploadCompleted(true);
    }
  }, [uploadProgress]);

  useEffect(() => {
    if (uploadedFiles === 100) {
      setUploadFileCompleted(true);
    }
  }, [uploadedFiles]);

  // useEffect(() => {
  //   if (uploadedFiles === 100) {
  //     setUploadCompleted(true);
  //   }
  // },[uploadedFiles]);

  console.log(filteredData);
  console.log(mainData);

  return (
    <>
      {/* Main Wrapper */}
      <div className="main-wrapper container mt-4">
        {/* Page Wrapper */}
        <div className="page-wrapper">
          <div className="content content-two">
            {/* Page Header */}
            <div className="d-md-flex d-block align-items-center justify-content-between mb-3">
              <div className="my-auto mb-2">
                <h3 className="page-title mb-1">StudyMaterial </h3>
                <nav>
                  <ol className="breadcrumb mb-0">
                    <li className="breadcrumb-item">
                      <Link to="/">Dashboard</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      StudyMaterial
                    </li>
                  </ol>
                </nav>
              </div>
              <div className="d-flex my-xl-auto right-content align-items-center flex-wrap">
                <div className="pe-1 mb-2">
                  <p
                    onClick={refreshBtn}
                    className="btn bg-white btn-icon me-1 shadow-sm"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    aria-label="Refresh"
                    data-bs-original-title="Refresh"
                  >
                    <i className="fa fa-refresh" aria-hidden="true"></i>
                  </p>
                </div>
              </div>
            </div>
            {/* /Page Header */}

            {/* Second Header */}
            <div className="bg-white p-3 border rounded-1 d-flex align-items-center justify-content-between flex-wrap mb-4 pb-0 shadow-sm">
              <h4 className="mb-3 fw-bold fs-5">{Material}</h4>
              <div className="d-flex align-items-center flex-wrap">
                <div className="mb-3 me-2">
                  <input
                    type="search"
                    placeholder="Search"
                    className="form-control w-100 p-2 border rounded "
                    value={find}
                    onChange={applyFilter}
                  />
                </div>
                <div className={`mb-3 ${find ? "d-block" : "d-none"}`}>
                  <button
                    className="btn btn-secondary me-2"
                    onClick={resetFilters}
                  >
                    Reset
                  </button>
                </div>
                {/* Second Header */}

                <div className="mb-3">
                  <button
                    className="btn btn-primary border border-2 bg-primary fw-bold  px-3"
                    onClick={() => setAddMaterial("Add")}
                    data-bs-toggle="modal"
                    data-bs-target="#add_material"
                  >
                    <i className="fa fa-plus me-2" aria-hidden="true"></i>
                    Add Material
                  </button>
                </div>

                {/* Add Material Modal */}
                <div className="modal fade" id="add_material">
                  <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h4 className="modal-title fs-5 fw-bold p-1">
                          Add Material
                        </h4>
                        <button
                          type="button"
                          className="btn-close custom-btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        >
                          <i className="ti ti-x" />
                        </button>
                      </div>
                      <div className="modal-body pt-0">
                        <Formik
                          initialValues={{
                            instituteId: userId,
                            title: "",
                            subject: "",
                            course: "",
                            semester: "",
                            description: "",
                            fileURL: "",
                            document: "",
                            uploaderName: "",
                            uploadedDate: "",
                            category: "",
                            tags: "",
                          }}
                          onSubmit={handleMaterial}
                          disabled={uploadProgress < 100}
                        >
                          {({ setFieldValue, values }) => (
                            <Form>
                              <div className="row mt-4">
                                <div className="col-6">
                                  <label
                                    htmlFor=""
                                    className="form-label fw-normal mb-1 fs-6"
                                  >
                                    Title
                                  </label>
                                  <Field
                                    type="text"
                                    name="title"
                                    className="form-control shadow-sm border-2"
                                    placeholder="Title"
                                    aria-label="Title"
                                  />
                                </div>
                                <div className="col-6">
                                  <label
                                    htmlFor=""
                                    className="form-label fw-normal mb-1 fs-6"
                                  >
                                    Subject
                                  </label>
                                  <Field
                                    type="text"
                                    name="subject"
                                    className="form-control shadow-sm border-2"
                                    placeholder="Subject"
                                    aria-label="Subject"
                                  />
                                </div>
                              </div>
                              <div className="row mt-2">
                                <div className="col-6">
                                  <label
                                    htmlFor=""
                                    className="form-label fw-normal mb-1 fs-6"
                                  >
                                    Course
                                  </label>
                                  <Field
                                    type="text"
                                    name="course"
                                    className="form-control shadow-sm border-2"
                                    placeholder="Course"
                                    aria-label="Course"
                                  />
                                </div>
                                <div className="col-6">
                                  <label
                                    htmlFor=""
                                    className="form-label fw-normal mb-1 fs-6"
                                  >
                                    Semester
                                  </label>
                                  <Field
                                    type="text"
                                    name="semester"
                                    className="form-control shadow-sm border-2"
                                    placeholder="Semester"
                                    aria-label="Semester"
                                  />
                                </div>
                              </div>
                              <div className="row  mt-3">
                                <div className="col-6">
                                  <label
                                    htmlFor=""
                                    className="form-label fw-normal mb-1 fs-6"
                                  >
                                    Description
                                  </label>
                                  <Field
                                    type="text"
                                    name="description"
                                    className="form-control shadow-sm border-2"
                                    placeholder="Description"
                                    aria-label="Description"
                                  />
                                </div>
                                <div className="col-6">
                                  <label
                                    htmlFor=""
                                    className="form-label fw-normal mb-1 fs-6"
                                  >
                                    Category
                                  </label>
                                  <Field
                                    as="select"
                                    name="category"
                                    aria-label="Category"
                                    className="form-select shadow-sm border-2"
                                  >
                                    <option value="">Select</option>
                                    <option value="book">Book</option>
                                    <option value="note">Notes</option>
                                    <option value="video">Video</option>
                                  </Field>
                                </div>
                              </div>
                              <div className="row mt-3">
                                {/* Dynamic File Upload */}
                                <div className="col-6">
                                  <label
                                    htmlFor="fileURL"
                                    className="form-label fw-normal mb-1 fs-6"
                                  >
                                    {values.category === "video"
                                      ? "Upload Thumbnail Video"
                                      : "Upload Thumbnail Image"}
                                  </label>
                                  {values.category === "video" ? (
                                    <Field
                                      type="file"
                                      name="fileURL"
                                      accept="video/mp4, video/webm, video/ogg"
                                      className="form-control shadow-sm border-2"
                                      onChange={(e) =>
                                        handleVideoUpload(e, "fileURL")
                                      }
                                    />
                                  ) : (
                                    <Field
                                      type="file"
                                      name="fileURL"
                                      accept="image/png, image/jpeg"
                                      className="form-control shadow-sm border-2"
                                      onChange={(e) =>
                                        handleFileUpload(e, "fileURL")
                                      }
                                    />
                                  )}
                                  {/* Progress Bar */}
                                  <div className="upload-container">
                                    {values.category === "video" ? (
                                      uploadProgress < 100 ? (
                                        isLoading ? (
                                          <div
                                            className="progress mt-3"
                                            role="progressbar"
                                            aria-label="Example with label"
                                            aria-valuenow={uploadProgress}
                                            aria-valuemin="0"
                                            aria-valuemax="100"
                                          >
                                            <div
                                              className="progress-bar"
                                              style={{
                                                width: `${uploadProgress}%`,
                                              }}
                                            >
                                              {uploadProgress}%
                                            </div>
                                          </div>
                                        ) : uploadCompleted ? (
                                          <div className="text-success fw-semibold mt-3">
                                            Upload Completed!
                                          </div>
                                        ) : null
                                      ) : null
                                    ) : null}
                                  </div>
                                  {/* Progress Bar */}
                                </div>

                                <div className="col-6">
                                  <label
                                    htmlFor=""
                                    className="form-label fw-normal mb-1 fs-6"
                                  >
                                    Upload File
                                  </label>
                                  {values.category === "video" ? (
                                    <Field
                                      type="file"
                                      name="document"
                                      accept="video/mp4, video/webm, video/ogg"
                                      className="form-control shadow-sm border-2"
                                      onChange={(e) =>
                                        handleVideoUpload(e, "document")
                                      }
                                    />
                                  ) : (
                                    <Field
                                      type="file"
                                      name="document"
                                      accept="application/pdf, .doc, .docx"
                                      className="form-control shadow-sm border-2"
                                      onChange={(e) =>
                                        handleFileUpload(e, "document")
                                      }
                                    />
                                  )}
                                  <div className="upload-container">
                                    {fileuploadProgress < 100 ? (
                                      isfileLoading ? (
                                        <div
                                          className="progress mt-3"
                                          role="progressbar"
                                          aria-label="Example with label"
                                          aria-valuenow={fileuploadProgress}
                                          aria-valuemin="0"
                                          aria-valuemax="100"
                                        >
                                          <div
                                            className="progress-bar"
                                            style={{
                                              width: `${fileuploadProgress}%`,
                                            }}
                                          >
                                            {fileuploadProgress}%
                                          </div>
                                        </div>
                                      ) : uploadfileCompleted ? (
                                        <div className="text-success fw-semibold mt-3">
                                          Upload Completed!
                                        </div>
                                      ) : null
                                    ) : null}
                                  </div>
                                </div>
                              </div>
                              <div className="row mt-3">
                                <div className="col-6">
                                  <label
                                    htmlFor=""
                                    className="form-label fw-normal mb-1 fs-6"
                                  >
                                    Uploader Name
                                  </label>
                                  <Field
                                    type="text"
                                    name="uploaderName"
                                    className="form-control shadow-sm border-2"
                                    placeholder="UploaderName"
                                    aria-label="UploaderName"
                                  />
                                </div>
                                <div className="col-6">
                                  <label
                                    htmlFor=""
                                    className="form-label fw-normal mb-1 fs-6"
                                  >
                                    Uploader Date
                                  </label>
                                  <Field
                                    type="date"
                                    name="uploaderDate"
                                    className="form-control shadow-sm border-2"
                                    placeholder="UploaderDate"
                                    aria-label="UploaderDate"
                                  />
                                </div>
                              </div>

                              <div className="d-flex mt-4 justify-content-end text-center">
                                <button
                                  className="btn btn-danger "
                                  data-bs-dismiss="modal"
                                >
                                  <i
                                    className="fa fa-times me-2"
                                    aria-hidden="true"
                                  ></i>
                                  Close
                                </button>
                                <button
                                  className="btn btn-primary ms-2"
                                  type="submit"
                                >
                                  <i
                                    className="fa fa-check me-2"
                                    aria-hidden="true"
                                  ></i>
                                  Submit
                                </button>
                              </div>
                            </Form>
                          )}
                        </Formik>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Add Material Modal */}
              </div>
            </div>
            {/* Second Header */}

            {/* Three Buttons */}
            <div className="text-center">
              <button
                className={`btn rounded-2 m-2 border-primary border-3 fw-bold ${
                  Material === "Book"
                    ? "bg-primary text-white "
                    : "text-primary bg-white"
                }`}
                onClick={() => setMaterial("Book")}
              >
                <i className="fa fa-book me-2" aria-hidden="true"></i>
                Books Section
              </button>
              <button
                className={`btn rounded-2 m-2 border-primary border-3 fw-bold ${
                  Material === "Note"
                    ? "bg-primary text-white"
                    : "text-primary bg-white"
                }`}
                onClick={() => setMaterial("Note")}
              >
                <i className="fa fa-sticky-note me-2" aria-hidden="true"></i>
                Notes Section
              </button>
              <button
                className={`btn rounded-2 m-2 border-primary border-3 fw-bold ${
                  Material === "Video"
                    ? "bg-primary text-white"
                    : "text-primary bg-white"
                }`}
                onClick={() => setMaterial("Video")}
              >
                <i className="fa fa-video-camera me-2" aria-hidden="true"></i>
                Video Section
              </button>
            </div>
            {/* Three Buttons */}

            <div>
              {/* Books Section */}
              <div
                className={`row
                }`}
              >
                {studyMaterialData?.slice(0, visibleTeachers)
                  .map((teacher, index) =>
                    teacher?.category === Material?.toLowerCase() ? (
                      <div
                        className={`col-xxl-4 col-xl-4 col-md-6 d-flex mt-4  `}
                        key={index}
                      >
                        <div className="card flex-fill shadow">
                          <div className="card-body pb-1 pt-3">
                            <div>
                              <div className="col-12 text-center mx-auto mb-3">
                                {Material === "Video" ? (
                                  <video
                                    src={teacher?.fileURL}
                                    className="img-fluid mx-auto"
                                    style={{ maxWidth: "100%" }}
                                    controls
                                    alt={teacher?.fileURL}
                                  >
                                    Your browser does not support the video tag.
                                  </video>
                                ) : (
                                  <img
                                    src={teacher?.fileURL}
                                    className="img-fluid mx-auto"
                                    alt={teacher?.fileURL}
                                    style={{
                                      maxWidth: "100%",
                                      height: "210px",
                                    }}
                                  />
                                )}
                              </div>
                              <div className="card-footer pb-0 pt-2 text-dark bg-white">
                                <div className="d-flex">
                                  <p className="fw-bold mb-2">Title : </p>
                                  <p className="ms-1 mb-0"> {teacher?.title}</p>
                                </div>
                                <div className="d-flex">
                                  <p className="fw-bold mb-2">Subject :</p>
                                  <p className="ms-1 mb-0">
                                    {teacher?.subject}
                                  </p>
                                </div>
                                <div className="">
                                  <p className="mb-0 fw-bold">Description :</p>
                                  <p className="ms-1">{teacher?.description}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="card-footer pb-3 pt-0 d-flex align-items-center justify-content-between ">
                            <button
                              className="btn btn-primary text-white fw-bold btn-sm"
                              style={{ fontSize: "14px" }}
                              data-bs-toggle="modal"
                              data-bs-target={`#edit_material_${index}`}
                              onClick={() => setSelectedId(teacher._id)}
                            >
                              <i
                                className="fa fa-pencil-square me-2"
                                aria-hidden="true"
                              ></i>
                              Edit
                            </button>
                            <button
                              type="button"
                              className="btn btn-danger text-white fw-bold btn-sm"
                              style={{ fontSize: "14px" }}
                              onClick={() => setSelectedId(teacher._id)}
                              data-bs-toggle="modal"
                              data-bs-target="#delete_material"
                            >
                              <i
                                className="fa fa-trash me-2"
                                aria-hidden="true"
                              ></i>
                              Delete
                            </button>
                          </div>
                        </div>

                        {/* Edit Modal */}
                        <div
                          className="modal fade"
                          id={`edit_material_${index}`}
                        >
                          <div className="modal-dialog modal-dialog-centered modal-lg">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h4 className="modal-title fs-5 bg-primary text-white fw-bold px-2 rounded shadow-sm p-1">
                                  <i
                                    className="fa fa-pencil-square me-2"
                                    aria-hidden="true"
                                  ></i>
                                  Edit Material
                                </h4>
                                <button
                                  type="button"
                                  className="btn-close custom-btn-close"
                                  data-bs-dismiss="modal"
                                  aria-label="Close"
                                >
                                  <i className="ti ti-x" />
                                </button>
                              </div>
                              <div className="modal-body pt-0">
                                <Formik
                                  enableReinitialize
                                  //  validationSchema={validationSchema}
                                  onSubmit={(e, setSubmitting) =>
                                    handleSubmit(
                                      e,
                                      { setSubmitting },
                                      `edit_material_${index}`
                                    )
                                  }
                                  initialValues={{
                                    title: teacher?.title,
                                    subject: teacher?.subject,
                                    course: teacher?.course,
                                    semester: teacher?.semester,
                                    description: teacher?.description,
                                    fileURL: null,
                                    document: null,
                                    uploaderName: teacher?.uploaderName,
                                    uploadedDate: teacher?.uploadedDate,
                                    category: teacher?.category,
                                  }}
                                >
                                  {({ isSubmitting }) => (
                                    <Form>
                                      <div className="row mt-4">
                                        <div className="col-6">
                                          <label
                                            htmlFor=""
                                            className="form-label fw-normal mb-1 fs-6"
                                          >
                                            Title
                                          </label>
                                          <Field
                                            type="text"
                                            name="title"
                                            className="form-control shadow-sm border-2"
                                            placeholder="Title"
                                            aria-label="Title"
                                          />
                                        </div>
                                        <div className="col-6">
                                          <label
                                            htmlFor=""
                                            className="form-label fw-normal mb-1 fs-6"
                                          >
                                            Subject
                                          </label>
                                          <Field
                                            type="text"
                                            name="subject"
                                            className="form-control shadow-sm border-2"
                                            placeholder="Subject"
                                            aria-label="Subject"
                                          />
                                        </div>
                                      </div>
                                      <div className="row mt-2">
                                        <div className="col-6">
                                          <label
                                            htmlFor=""
                                            className="form-label fw-normal mb-1 fs-6"
                                          >
                                            Course
                                          </label>
                                          <Field
                                            type="text"
                                            name="course"
                                            className="form-control shadow-sm border-2"
                                            placeholder="Course"
                                            aria-label="Course"
                                          />
                                        </div>
                                        <div className="col-6">
                                          <label
                                            htmlFor=""
                                            className="form-label fw-normal mb-1 fs-6"
                                          >
                                            Semester
                                          </label>
                                          <Field
                                            type="text"
                                            name="semester"
                                            className="form-control shadow-sm border-2"
                                            placeholder="Semester"
                                            aria-label="Semester"
                                          />
                                        </div>
                                      </div>
                                      <div className="row  mt-3">
                                        <div className="col-6">
                                          <label
                                            htmlFor=""
                                            className="form-label fw-normal mb-1 fs-6"
                                          >
                                            {teacher.category === "video"
                                              ? "Edit Thumbnail Video"
                                              : "Edit Thumbnail Image"}
                                          </label>
                                          {teacher.fileURL ? (
                                            <div>
                                              {edit === "FileUrl" ? (
                                                teacher.category === "video" ? (
                                                  <Field
                                                    type="file"
                                                    name="fileURL"
                                                    accept="video/mp4, video/webm, video/ogg"
                                                    className="form-control shadow-sm border-2"
                                                    onChange={(e) =>
                                                      handleVideoUpload(
                                                        e,
                                                        "fileURL"
                                                      )
                                                    }
                                                  />
                                                ) : (
                                                  <Field
                                                    type="file"
                                                    name="fileURL"
                                                    accept="image/png, image/jpeg"
                                                    className="form-control shadow-sm border-2"
                                                    onChange={(e) =>
                                                      handleFileUpload(
                                                        e,
                                                        "fileURL"
                                                      )
                                                    }
                                                  />
                                                )
                                              ) : (
                                                <button
                                                  className="btn border w-100 text-start shadow-sm"
                                                  onClick={() =>
                                                    setEdit("FileUrl")
                                                  }
                                                >
                                                  Edit
                                                </button>
                                              )}
                                            </div>
                                          ) : (
                                            <Field
                                              type="file"
                                              name="fileURL"
                                              accept="image/png, image/jpeg"
                                              className="form-control shadow-sm border-2"
                                              placeholder="Image"
                                              aria-label="Image"
                                              onChange={(e) =>
                                                handleFileUpload(e, "fileURL")
                                              }
                                            />
                                          )}
                                          {/* Progress Bar */}
                                          <div className="upload-container">
                                            {teacher.category === "video" ? (
                                              uploadProgress < 100 ? (
                                                isLoading ? (
                                                  <div
                                                    className="progress mt-3"
                                                    role="progressbar"
                                                    aria-label="Example with label"
                                                    aria-valuenow={
                                                      uploadProgress
                                                    }
                                                    aria-valuemin="0"
                                                    aria-valuemax="100"
                                                  >
                                                    <div
                                                      className="progress-bar"
                                                      style={{
                                                        width: `${uploadProgress}%`,
                                                      }}
                                                    >
                                                      {uploadProgress}%
                                                    </div>
                                                  </div>
                                                ) : uploadCompleted ? (
                                                  <div className="text-success fw-semibold mt-3">
                                                    Upload Completed!
                                                  </div>
                                                ) : null
                                              ) : null
                                            ) : null}
                                          </div>
                                          {/* Progress Bar */}
                                        </div>
                                        <div className="col-6">
                                          <label
                                            htmlFor=""
                                            className="form-label fw-normal mb-1 fs-6"
                                          >
                                            Edit File
                                          </label>
                                          {teacher.document ? (
                                            <div>
                                              {edit === "Document" ? (
                                                <Field
                                                  type="file"
                                                  name="document"
                                                  id="document"
                                                  accept="application/pdf, .doc, .docx"
                                                  className="form-control shadow-sm border-2"
                                                  onChange={(e) =>
                                                    handleFileUpload(
                                                      e,
                                                      "document"
                                                    )
                                                  }
                                                />
                                              ) : (
                                                <button
                                                  className="btn border w-100 text-start shadow-sm"
                                                  onClick={() =>
                                                    setEdit("Document")
                                                  }
                                                >
                                                  Edit
                                                </button>
                                              )}
                                              <div className="upload-container">
                                                {fileuploadProgress < 100 ? (
                                                  isfileLoading ? (
                                                    <div
                                                      className="progress mt-3"
                                                      role="progressbar"
                                                      aria-label="Example with label"
                                                      aria-valuenow={
                                                        fileuploadProgress
                                                      }
                                                      aria-valuemin="0"
                                                      aria-valuemax="100"
                                                    >
                                                      <div
                                                        className="progress-bar"
                                                        style={{
                                                          width: `${fileuploadProgress}%`,
                                                        }}
                                                      >
                                                        {fileuploadProgress}%
                                                      </div>
                                                    </div>
                                                  ) : uploadfileCompleted ? (
                                                    <div className="text-success fw-semibold mt-3">
                                                      Upload Completed!
                                                    </div>
                                                  ) : null
                                                ) : null}
                                              </div>
                                            </div>
                                          ) : (
                                            <Field
                                              type="file"
                                              name="document"
                                              id="document"
                                              accept="application/pdf, .doc, .docx"
                                              className="form-control shadow-sm border-2"
                                              onChange={(e) =>
                                                handleFileUpload(e, "document")
                                              }
                                            />
                                          )}
                                        </div>
                                      </div>
                                      <div className="row mt-3">
                                        <div className="col-6">
                                          <label
                                            htmlFor=""
                                            className="form-label fw-normal mb-1 fs-6"
                                          >
                                            Uploader Name
                                          </label>
                                          <Field
                                            type="text"
                                            name="uploaderName"
                                            className="form-control shadow-sm border-2"
                                            placeholder="UploaderName"
                                            aria-label="UploaderName"
                                          />
                                        </div>
                                        <div className="col-6">
                                          <label
                                            htmlFor=""
                                            className="form-label fw-normal mb-1 fs-6"
                                          >
                                            Description
                                          </label>
                                          <Field
                                            type="text"
                                            name="description"
                                            className="form-control shadow-sm border-2"
                                            placeholder="Description"
                                            aria-label="Description"
                                          />
                                        </div>
                                      </div>
                                      <div className="row mt-3">
                                        <div className="col-6">
                                          <label
                                            htmlFor=""
                                            className="form-label fw-normal mb-1 fs-6"
                                          >
                                            Uploader Date
                                          </label>
                                          <Field
                                            type="date"
                                            name="uploaderDate"
                                            className="form-control shadow-sm border-2"
                                            placeholder="UploaderDate"
                                            aria-label="UploaderDate"
                                          />
                                        </div>
                                        <div className="col-6">
                                          <label
                                            htmlFor=""
                                            className="form-label fw-normal mb-1 fs-6"
                                          >
                                            Category
                                          </label>
                                          <Field
                                            as="select"
                                            name="category"
                                            aria-label="Category"
                                            className="form-select shadow-sm border-2"
                                          >
                                            <option value="">Select</option>
                                            <option value="book">Book</option>
                                            <option value="note">Notes</option>
                                            <option value="video">Video</option>
                                          </Field>
                                        </div>
                                      </div>
                                      <div className="d-flex mt-4 justify-content-end text-center">
                                        <button
                                          className="btn btn-danger me-2"
                                          data-bs-dismiss="modal"
                                        >
                                          <i
                                            className="fa fa-times me-2"
                                            aria-hidden="true"
                                          ></i>
                                          Close
                                        </button>
                                        <button
                                          className="btn btn-primary"
                                          type="submit"
                                          disabled={isSubmitting}
                                        >
                                          <i
                                            className="fa fa-check me-2"
                                            aria-hidden="true"
                                          ></i>
                                          Submit
                                        </button>
                                      </div>
                                    </Form>
                                  )}
                                </Formik>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* Edit Modal */}
                      </div>
                    ) : null
                  )}

                {/* Delete Modal */}
                <div className="modal fade" id="delete_material">
                  <div className="modal-dialog modal-dialog-centered ">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h4 className="modal-title fs-5 fw-bold btn-primary px-2 p-1 rounded shadow-sm">
                          {" "}
                          <i
                            className="fa fa-trash me-2"
                            aria-hidden="true"
                          ></i>
                          Delete
                        </h4>
                        <button
                          type="button"
                          className="btn-close custom-btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        >
                          <i className="ti ti-x" />
                        </button>
                      </div>
                      <div className="modal-body">
                        <p className="fs-4 fw-bold text-gray-600 ">
                          Are you sure you want to delete?
                        </p>
                        <div className="d-flex justify-content-end mt-4">
                          <button
                            type="button"
                            className="btn btn-primary me-2"
                            data-bs-dismiss="modal"
                          >
                            <i
                              className="fa fa-times me-2"
                              aria-hidden="true"
                            ></i>
                            Close
                          </button>
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => {
                              deletePost(selectedId);
                              setSelectedId(null);
                            }}
                          >
                            <i
                              className="fa fa-trash me-2"
                              aria-hidden="true"
                            ></i>
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Delete Modal */}
              </div>
              {/* Books Section */}
            </div>

            {/* Load More Button */}
            {visibleTeachers < studyMaterialData.length && (
              <div className="text-center mt-4">
                <button
                  onClick={loadMoreTeachers}
                  className="btn btn-primary d-inline-flex align-items-center"
                >
                  <i className="fa fa-spinner me-2" />
                  Load More
                </button>
              </div>
            )}
            {/* Load More Button */}
          </div>
        </div>
        {/* /Page Wrapper */}
      </div>
    </>
  );
}
export default StudyMaterial;
