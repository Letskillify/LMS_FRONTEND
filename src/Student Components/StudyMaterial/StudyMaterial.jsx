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
  useImageUploader,
  useVideoUploader,
} from "../../Custom Hooks/CustomeHook";
import { MainContext } from "../../Controller/MainProvider";

function StudyMaterial() {
  const [mainData, setMainData] = useState([]);
  const [studyMaterialData, setStudyMaterialData] = useState([]);
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
  const [edit, setEdit] = useState("");
  const { uploadedData, handleImageUpload } = useImageUploader();
  // const [fileType, setFileType] = useState("image");
  const { uploadedVideos, uploadProgress, isLoading, handleVideoUpload } =
    useVideoUploader();
  const [uploadCompleted, setUploadCompleted] = useState(false);
  const [uploadfileCompleted, setUploadFileCompleted] = useState(false);
  const { userId } = useContext(MainContext);
  const { uploadedFiles, isfileLoading, fileuploadProgress, handleFileUpload } =
    useFileUploader();

  async function getData() {
    const response = await axios
      .get("http://localhost:5500/api/study-material/get")
      .then((res) => {
        if (res.status === 200) {
          setStudyMaterialData(res.data);
          setOriginalStudyMaterialData(res.data);
        } else {
          console.log(res);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const deletePost = async (id) => {
    if (!id) {
      console.error("Error: id is not defined.");
      return;
    }

    console.log("Deleting post with ID:", id); // Debugging log
    try {
      const response = await axios.delete(
        `http://localhost:5500/api/study-material/delete/${id}`
      );
      console.log("Post deleted:", response.data);

      // Close the modal programmatically
      const modal = document.getElementById("delete_material");
      const modalInstance = bootstrap.Modal.getInstance(modal);
      modalInstance.hide(); // This will close the modal
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  console.log(uploadedFiles);

  const handleSubmit = (values, { setSubmitting }, modalId) => {
    const data = {
      ...values,
      fileURL: uploadedData?.fileURL || uploadedVideos?.fileURL,
      document: uploadedFiles?.document,
    };
    // console.log("Form Data:", data);
    axios
      .put(
        `http://localhost:5500/api/study-material/update/${selectedId}`,
        data
      )
      .then((response) => {
        console.log("Hostel updated successfully:", response.data);
        // Close the modal programmatically
        const modal = document.getElementById(modalId); // Update with the correct modal ID if needed
        const modalInstance = bootstrap.Modal.getInstance(modal);
        modalInstance.hide(); // This will close the modal
        setSubmitting(false);
      })
      .catch((error) => {
        console.error("Error updating hostel:", error.response?.data || error);
        // alert("Error updating hostel. Please try again.");
        setSubmitting(false);
      });
  };

  useEffect(() => {
    if (selectedId) {
      axios
        .get(`http://localhost:5500/api/study-material/${selectedId}`)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => console.error("Error fetching hostel data:", error));
    }
  }, [selectedId]);

  useEffect(() => {
    getData();
  }, []);

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
                {studyMaterialData
                  .slice(0, visibleTeachers)
                  .map((teacher, index) =>
                    teacher?.category === Material?.toLowerCase() ? (
                      <div
                        className={`col-xxl-4 col-xl-4 col-md-6 d-flex mt-4  `}
                        key={index}
                      >
                        <div className="card flex-fill shadow">
                          <div className="card-body pb-1">
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
                                    style={{ maxWidth: "100%", height: "200px" }}
                                  />
                                )}
                              </div>

                              <div className="card-footer pb-0 pt-2 text-dark bg-white">
                                <div className="d-flex">
                                  <p className="mb-2 fw-bold">Title : </p>
                                  <p className="ms-1"> {teacher?.title}</p>
                                </div>
                                <div className="d-flex">
                                  <p className="mb-2 fw-bold">Subject :</p>
                                  <p className="ms-1">{teacher?.subject}</p>
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
                              data-bs-target=""
                              // onClick={() => setSelectedId(teacher._id)}
                            >
                              <i
                                className="fa fa-pencil-square me-2"
                                aria-hidden="true"
                              ></i>
                              Download
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : null
                  )}
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
