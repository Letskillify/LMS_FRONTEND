import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState, useEffect } from "react";
import axios from "axios";
import { useFileUploader } from "../../Custom Hooks/CustomeHook";

function Hostel() {
  const [hostelData, setHostelData] = useState([]);
  const [orghostelData, setOrgHostelData] = useState([]);
  const [selectedHostel, setSelectedHostel] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [find, setFind] = useState("");
  const [hostelType, setHostelType] = useState("");
  const [edit, setEdit] = useState("");
  const { uploadedData, handleFileUpload } = useFileUploader();

  // Initial form values
  const initialValues = {
    hostelId: "",
    name: "",
    type: "",
    contactInfo: {
      email: "",
      mobile: "",
      whatsapp: "",
      alternateContact: "",
      address: "",
    },
    maximumStudentCapacity: "",
    description: "",
    imageUrl: "",
  };
  // Validation schema using Yup
  const validationSchema = Yup.object({
    hostelId: Yup.string().required("Hostel ID is required"),
    imageUrl: Yup.string().required("Image is required"),
    name: Yup.string().required("Hostel Name is required"),
    type: Yup.string().required("Hostel Type is required"),
    maximumStudentCapacity: Yup.number()
      .typeError("Intake must be a number")
      .required("Intake is required"),
    description: Yup.string().required("Description is required"),
    contactInfo: Yup.object({
      email: Yup.string().email("Invalid email").required("Email is required"),
      mobile: Yup.string().required("Contact Number is required"),
      whatsapp: Yup.string().required("Whatsapp Number is required"),
      alternateContact: Yup.string().optional(),
      address: Yup.string().required("Address is required"),
    }),
  });

  async function getData() {
    const response = await axios
      .get("http://localhost:5500/api/hostel/get")
      .then((res) => {
        if (res.status === 200) {
          setHostelData(res.data);
          setOrgHostelData(res.data);
        } else {
          console.log(res);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function handleHostelDetails(e) {
    const data = { ...e, imageUrl: uploadedData?.imageUrl };
    try {
      const response = await axios.post("/api/hostel/post", data);
      if (response.status === 200) {
        // Close modal
        // setIsModalOpen(false);

        // Update the hostelData state without reloading
        setHostelData((prevData) => [...prevData, response.data]);
      }
      console.log("API response:", response.data);

      // Close the modal after the data has been successfully submitted
      const modal = document.getElementById("add_hostel");
      const modalInstance = bootstrap.Modal.getInstance(modal);
      modalInstance.hide(); // Close the modal

      // Optionally, refresh the page to reflect the new changes
      window.location.reload();
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      alert("Error adding Hostel Details. Please try again.");
    }
  }

  const deletePost = async (id) => {
    if (!id) {
      console.error("Error: id is not defined.");
      return;
    }

    console.log("Deleting post with ID:", id); // Debugging log
    try {
      const response = await axios.delete(
        `http://localhost:5500/api/hostel/delete/${id}`
      );
      console.log("Post deleted:", response.data);
      // Close the modal programmatically
      const modal = document.getElementById("delete-modal");
      const modalInstance = bootstrap.Modal.getInstance(modal);
      modalInstance.hide(); // This will close the modal
      // Refresh the page
      window.location.reload();
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  function refreshBtn() {
    window.location.reload(true);
  }

  // Apply Button
  const applyFilter = (e) => {
    e.preventDefault();
    console.log("Filter applied");

    const newFilteredData = orghostelData?.filter((data) => {
      const matchesName = data?.name
        ?.toLowerCase()
        .includes(find.toLowerCase());
      const matchesHostelType =
        !hostelType || data?.type?.toLowerCase() === hostelType.toLowerCase();

      return matchesName && matchesHostelType;
    });

    setHostelData(newFilteredData);
  };
  // Restart Button
  const resetFilters = (e) => {
    e.preventDefault();
    setFind("");
    setHostelType("");
    setHostelData(orghostelData);
  };

  const handleSubmit = (values, { setSubmitting }, modalId) => {
    const data = { ...values, imageUrl: uploadedData?.imageUrl };
    axios
      .put(`/api/hostel/update/${selectedId}`, data)
      .then((response) => {
        console.log("Hostel updated successfully:", response.data);
        // Close the modal programmatically
        const modal = document.getElementById(modalId);
        const modalInstance = bootstrap.Modal.getInstance(modal);
        modalInstance.hide();

        // Refresh the page
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error updating hostel:", error.response?.data || error);
        alert("Error updating hostel. Please try again.");
        setSubmitting(false);
      });
  };

  // useEffect(() => {
  //   if (selectedId) {
  //     axios
  //       .get(`http://localhost:5500/api/hostel/${selectedId}`)
  //       .then((response) => {
  //         console.log(response.data);
  //       })
  //       .catch((error) => console.error("Error fetching hostel data:", error));
  //   }
  // }, [selectedId]);

  return (
    <>
      <div className="container">
        {/* Page Wrapper */}
        <div className="page-wrapper">
          <div className="content">
            {/* Page Header */}
            <div className="d-md-flex d-block align-items-center justify-content-between mb-3 mt-4">
              <div className="my-auto mb-2 ms-3">
                <h3 className="page-title mb-1 fw-bold fs-5">Hostel</h3>
                <nav>
                  <ol className="breadcrumb mb-0">
                    <li className="breadcrumb-item">
                      <Link to="/">Dashboard</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Hostel
                    </li>
                  </ol>
                </nav>
              </div>
              <div className="d-flex my-xl-auto right-content align-items-center flex-wrap">
                <div className="pe-1 mb-2">
                  <button
                    className="btn shadow-sm bg-white btn-icon me-1"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    aria-label="Refresh"
                    data-bs-original-title="Refresh"
                    onClick={refreshBtn}
                  >
                    <i className="fa fa-refresh" />
                  </button>
                </div>
                <div className="mb-2 ms-2">
                  <button
                    className="p-2 px-3 bg-primary text-white fw-bold shadow-sm d-flex align-items-center"
                    data-bs-toggle="modal"
                    data-bs-target="#add_hostel"
                    onClick={() => setIsModalOpen(true)}
                  >
                    <i className="fa fa-plus me-2" aria-hidden="true"></i>
                    Add Hostel
                  </button>
                </div>
              </div>
            </div>
            {/* Add Hostel */}
            {isModalOpen && (
              <div className="modal fade" id="add_hostel">
                <div className="modal-dialog modal-dialog-centered modal-lg">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h4 className="modal-title fs-5 fw-bold bg-blue-200 text-blue-700 px-3 rounded shadow-sm p-1">
                        <i
                          className="fa fa-plus me-2 border "
                          aria-hidden="true"
                        ></i>
                        Add Hostel
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
                    <div className="modal-body pt-0 pb-2">
                      <Formik
                        initialValues={initialValues}
                        // validationSchema={validationSchema}
                        onSubmit={handleHostelDetails}
                      >
                        <Form>
                          <div className="modal-body pb-1">
                            <div className="row">
                              {/* Hostel Id */}
                              {/* <div className="col-6 mb-3">
                                  <label className="form-label">
                                    Hostel ID
                                  </label>
                                  <Field
                                    type="text"
                                    name="hostelId"
                                    className="form-control"
                                    placeholder="Hostel ID"
                                  />
                                  <ErrorMessage
                                    name="hostelId"
                                    component="div"
                                    className="text-danger"
                                  />
                                </div> */}
                              {/* Hostel Name */}
                              <div className="col-6 mb-3">
                                <label className="form-label">
                                  Hostel Name
                                </label>
                                <Field
                                  type="text"
                                  name="name"
                                  className="form-control"
                                  placeholder="Hostel Name"
                                />
                                <ErrorMessage
                                  name="name"
                                  component="div"
                                  className="text-danger"
                                />
                              </div>
                              {/* Hostel Type */}
                              <div className="col-6 mb-3">
                                <label className="form-label">
                                  Hostel Type
                                </label>
                                <Field
                                  as="select"
                                  name="type"
                                  className="form-control"
                                >
                                  <option value="" disabled>
                                    Select Hostel Type
                                  </option>
                                  <option value="Boys">Boys</option>
                                  <option value="Girls">Girls</option>
                                  <option value="Co-ed">Co-Ed</option>
                                </Field>
                                <ErrorMessage
                                  name="type"
                                  component="div"
                                  className="text-danger"
                                />
                              </div>
                              {/* Hostel Images */}
                              <div className="col-6 mb-3">
                                <label className="form-label">
                                  Hostel Images
                                </label>
                                <Field
                                  type="file"
                                  name="imageUrl"
                                  className="form-control"
                                  placeholder="Hostel Images"
                                  onChange={(e) =>
                                    handleFileUpload(e, "imageUrl")
                                  }
                                />
                                <ErrorMessage
                                  name="imageUrl"
                                  component="div"
                                  className="text-danger"
                                />
                              </div>

                              {/* Intake */}
                              <div className="col-6 mb-3">
                                <label className="form-label">Intake</label>
                                <Field
                                  type="number"
                                  name="maximumStudentCapacity"
                                  className="form-control"
                                  placeholder="Maximum Capacity"
                                />
                                <ErrorMessage
                                  name="maximumStudentCapacity"
                                  component="div"
                                  className="text-danger"
                                />
                              </div>
                              {/* Address */}
                              <div className="col-6 mb-3">
                                <label className="form-label">Address</label>
                                <Field
                                  type="text"
                                  name="contactInfo.address"
                                  className="form-control"
                                  placeholder="Address"
                                />
                                <ErrorMessage
                                  name="contactInfo.address"
                                  component="div"
                                  className="text-danger"
                                />
                              </div>
                              {/* Email */}
                              <div className="col-6 mb-3">
                                <label className="form-label">Email</label>
                                <Field
                                  type="text"
                                  name="contactInfo.email"
                                  className="form-control"
                                  placeholder="Email"
                                />
                                <ErrorMessage
                                  name="contactInfo.email"
                                  component="div"
                                  className="text-danger"
                                />
                              </div>
                              {/* Mobile Number */}
                              <div className="col-6 mb-3">
                                <label className="form-label">
                                  Contact Number
                                </label>
                                <Field
                                  type="text"
                                  name="contactInfo.mobile"
                                  className="form-control"
                                  placeholder="Contact Number"
                                />
                                <ErrorMessage
                                  name="contactInfo.mobile"
                                  component="div"
                                  className="text-danger"
                                />
                              </div>
                              {/* Whatsapp Number */}
                              <div className="col-6 mb-3">
                                <label className="form-label">
                                  Whatsapp Number
                                </label>
                                <Field
                                  type="text"
                                  name="contactInfo.whatsapp"
                                  className="form-control"
                                  placeholder="Whatsapp Number"
                                />
                                <ErrorMessage
                                  name="contactInfo.whatsapp"
                                  component="div"
                                  className="text-danger"
                                />
                              </div>
                              {/* Description */}
                              <div className="col-6 mb-3">
                                <label className="form-label">
                                  Description
                                </label>
                                <Field
                                  as="textarea"
                                  name="description"
                                  className="form-control"
                                  placeholder="Description"
                                  rows={1}
                                />
                                <ErrorMessage
                                  name="description"
                                  component="div"
                                  className="text-danger"
                                />
                              </div>
                              {/* Alternative Number */}
                              <div className="col-6 mb-3">
                                <label className="form-label">
                                  Alternative Contact No.
                                </label>
                                <Field
                                  type="text"
                                  name="contactInfo.alternateContact"
                                  className="form-control"
                                  placeholder="Alternative Contact No."
                                />
                                <ErrorMessage
                                  name="contactInfo.alternateContact"
                                  component="div"
                                  className="text-danger"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="modal-footer pb-0 pt-0">
                            <button
                              type="button"
                              className="btn bg-red-200 text-red-600 fw-bold me-2 hover:bg-red-500 hover:text-red-50"
                              data-bs-dismiss="modal"
                            >
                              <i
                                className="fa fa-times me-2"
                                aria-hidden="true"
                              ></i>
                              Cancel
                            </button>
                            <button
                              type="submit"
                              className="btn bg-blue-200 text-blue-600 fw-bold hover:bg-blue-500 hover:text-blue-50"
                              // disabled={isSubmitting}
                            >
                              <i
                                className="fa fa-thumbs-up me-2"
                                aria-hidden="true"
                              ></i>
                              Submit
                            </button>
                          </div>
                        </Form>
                      </Formik>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* /Add Hostel */}

            {/* /Page Header */}

            {/* Hostel List */}
            <div className="card">
              <div className="card-header d-flex align-items-center justify-content-between flex-wrap py-3 bg-dark text-white">
                <h4 className=" fs-4 fw-bold text-white">Hostel</h4>
                <div className="d-flex align-items-center flex-wrap">
                  <div className="dropdown me-2">
                    <button
                      className="text-dark bg-white border border-2 px-3 py-1"
                      data-bs-toggle="dropdown"
                      data-bs-auto-close="outside"
                    >
                      <i className="fa fa-filter me-2" />
                      Filter
                    </button>
                    <div className="dropdown-menu drop-width">
                      <form action="hostel-list.html">
                        <div className="d-flex align-items-center border-bottom p-3">
                          <h4>Filter</h4>
                        </div>
                        <div className="p-3 border-bottom">
                          <div className="row">
                            <div className="col-md-12">
                              <div className="mb-3">
                                <label className="form-label col-12">
                                  Search by Name
                                </label>
                                <input
                                  type="search"
                                  className="col-12 border border-2 p-2 rounded"
                                  placeholder="Search"
                                  onChange={(e) => setFind(e.target.value)}
                                />
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="mb-3">
                                <label className="form-label col-12">
                                  Hostel Type
                                </label>
                                <select
                                  className="select col-12 border border-2 p-2 rounded"
                                  onChange={(e) =>
                                    setHostelType(e.target.value)
                                  }
                                  value={hostelType}
                                >
                                  <option value="" disabled>
                                    Select Type
                                  </option>
                                  <option value="boys">Boys</option>
                                  <option value="girls">Girls</option>
                                  <option value="co-ed">Co-Ed</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="p-3 d-flex align-items-center justify-content-end">
                          <button
                            className="btn bg-gray-200 text-gray-600 fw-bold me-3 hover:bg-gray-500 hover:text-gray-50"
                            onClick={resetFilters}
                          >
                            Reset
                          </button>
                          <button
                            type="submit"
                            className="btn bg-blue-200 text-blue-600 fw-bold hover:bg-blue-500 hover:text-blue-50"
                            onClick={applyFilter}
                          >
                            Apply
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-body p-0 py-3">
                <div className="custom-datatable-filter table-responsive border-0">
                  <table className="table datatable text-center">
                    <thead>
                      <tr>
                        {/* <th className="fw-bold">ID</th> */}
                        <th className="fw-bold">Images</th>
                        <th className="fw-bold">Hostel Name</th>
                        <th className="fw-bold">Hostel Type</th>
                        <th className="fw-bold">Address</th>
                        <th className="fw-bold">Intake</th>
                        <th className="fw-bold">Description</th>
                        <th className="fw-bold">Action</th>
                      </tr>
                    </thead>
                    <tbody className="border-0">
                      {hostelData.map((hostel, index) => (
                        <tr key={hostel?.hostelId}>
                          {/* <td>
                            <p className="">{hostel?.hostelId}</p>
                          </td> */}
                          <td className="d-flex justify-content-center">
                            <img
                              src={hostel?.imageUrl}
                              alt="img"
                              className="img-fluid rounded-circle"
                              style={{width:"50px",height:"45px"}}
                            />
                          </td>
                          <td className="fw-bold">{hostel?.name}</td>
                          <td>{hostel?.type}</td>
                          <td>{hostel?.contactInfo.address}</td>
                          <td>{hostel?.maximumStudentCapacity}</td>
                          <td
                            style={{
                              maxWidth: "300px",
                              whiteSpace: "normal",
                              wordWrap: "break-word",
                            }}
                            className="text-start"
                          >
                            {hostel?.description}
                          </td>
                          <td className="">
                            <div className="d-flex align-items-center justify-content-center">
                              <div className="dropdown">
                                <p
                                  className="btn btn-icon btn-sm d-flex align-items-center justify-content-center rounded-circle p-2 bg-violet-200 text-violet-600	"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                >
                                  <i
                                    className="fa fa-ellipsis-v fs-5"
                                    aria-hidden="true"
                                  ></i>
                                </p>
                                <ul className="dropdown-menu dropdown-menu-right p-3">
                                  <li>
                                    <button
                                      className="dropdown-item btn-success rounded-1 bg-purple-200 text-purple-600 fw-bold hover:bg-purple-500 hover:text-purple-50"
                                      data-bs-toggle="modal"
                                      data-bs-target="#view_hostel"
                                      onClick={() => setSelectedHostel(hostel)}
                                    >
                                      <i
                                        className="fa fa-eye me-2"
                                        aria-hidden="true"
                                      ></i>
                                      View More
                                    </button>
                                  </li>
                                  <li>
                                    <button
                                      className="dropdown-item btn-secondary rounded-1 bg-orange-200 text-orange-600 mt-2 fw-bold  hover:bg-orange-500 hover:text-orange-50"
                                      data-bs-toggle="modal"
                                      data-bs-target={`#edit_hostel_${index}`}
                                      onClick={() => setSelectedId(hostel?._id)}
                                      type="button"
                                    >
                                      <i
                                        className="fa fa-pencil-square me-2"
                                        aria-hidden="true"
                                      ></i>
                                      Edit
                                    </button>
                                  </li>
                                  <li>
                                    <button
                                      className="dropdown-item btn-primary rounded-1 bg-red-200 text-red-600 mt-2 fw-bold  hover:bg-red-500 hover:text-red-50"
                                      data-bs-toggle="modal"
                                      data-bs-target="#delete-modal"
                                      onClick={() => setSelectedId(hostel?._id)}
                                    >
                                      <i
                                        className="fa fa-trash me-2"
                                        aria-hidden="true"
                                      ></i>
                                      Delete
                                    </button>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </td>

                          {/* Edit Hostel */}
                          <div
                            className="modal fade"
                            id={`edit_hostel_${index}`}
                          >
                            <div className="modal-dialog modal-dialog-centered modal-lg">
                              <div className="modal-content">
                                <div className="modal-header">
                                  <h4 className="modal-title fw-bold fs-5 bg-blue-200 text-blue-700 px-3 rounded shadow-sm p-1">
                                    <i
                                      className="fa fa-pencil-square-o me-2"
                                      aria-hidden="true"
                                    ></i>
                                    Edit Hostel
                                  </h4>
                                  <button
                                    type="button"
                                    className="btn-close btn-secondary custom-btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                  >
                                    <i className="ti ti-x" />
                                  </button>
                                </div>
                                <Formik
                                  enableReinitialize
                                  initialValues={{
                                    hostelId: hostel?.hostelId,
                                    name: hostel?.name,
                                    type: hostel?.type,
                                    contactInfo: {
                                      email: hostel?.contactInfo.email,
                                      mobile: hostel?.contactInfo.mobile,
                                      whatsapp: hostel?.contactInfo.whatsapp,
                                      alternateContact:
                                        hostel?.contactInfo.alternateContact,
                                      address: hostel?.contactInfo.address,
                                    },
                                    maximumStudentCapacity:
                                      hostel?.maximumStudentCapacity,
                                    description: hostel?.description,
                                    imageUrl: null,
                                  }}
                                  // validationSchema={validationSchema}
                                  onSubmit={(e, setSubmitting) =>
                                    handleSubmit(
                                      e,
                                      { setSubmitting },
                                      `edit_hostel_${index}`
                                    )
                                  }
                                >
                                  {({ isSubmitting }) => (
                                    <Form>
                                      <div className="modal-body pb-0 text-start">
                                        <div className="row">
                                          {/* Hostel Id
                                          <div className="col-6 mb-3">
                                            <label className="form-label">
                                              Hostel ID
                                            </label>
                                            <Field
                                              type="text"
                                              name="hostelId"
                                              className="form-control"
                                              placeholder="Hostel ID"
                                            />
                                          </div> */}

                                          {/* Hostel Name */}
                                          <div className="col-6 mb-3">
                                            <label className="form-label">
                                              Hostel Name
                                            </label>
                                            <Field
                                              type="text"
                                              name="name"
                                              className="form-control"
                                              placeholder="Hostel Name"
                                            />
                                          </div>
                                          {/* Hostel Type */}
                                          <div className="col-6 mb-3">
                                            <label className="form-label">
                                              Hostel Type
                                            </label>
                                            <Field
                                              as="select"
                                              name="type"
                                              className="form-control"
                                            >
                                              <option value="" disabled>
                                                Select Hostel Type
                                              </option>
                                              <option value="Boys">Boys</option>
                                              <option value="Girls">
                                                Girls
                                              </option>
                                              <option value="Co-ed">
                                                Co-Ed
                                              </option>
                                            </Field>
                                          </div>
                                          {/* Hostel Images */}
                                          <div className="col-6 mb-3">
                                            <label className="form-label">
                                              Hostel Images
                                            </label>
                                            {hostel?.imageUrl ? (
                                              <div>
                                                {edit === "FileUrl" ? (
                                                  <Field
                                                    type="file"
                                                    name="imageUrl"
                                                    accept="image/png, image/jpeg"
                                                    className="form-control shadow-sm border-2"
                                                    placeholder="Image"
                                                    aria-label="Image"
                                                    onChange={(e) =>
                                                      handleFileUpload(
                                                        e,
                                                        "imageUrl"
                                                      )
                                                    }
                                                  />
                                                ) : (
                                                  <button
                                                    className="btn border w-100 text-start"
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
                                                name="imageUrl"
                                                accept="image/png, image/jpeg"
                                                className="form-control shadow-sm border-2"
                                                placeholder="Image"
                                                aria-label="Image"
                                                onChange={(e) =>
                                                  handleFileUpload(
                                                    e,
                                                    "imageUrl"
                                                  )
                                                }
                                              />
                                            )}
                                          </div>

                                          {/* Intake */}
                                          <div className="col-6 mb-3">
                                            <label className="form-label">
                                              Intake
                                            </label>
                                            <Field
                                              type="number"
                                              name="maximumStudentCapacity"
                                              className="form-control"
                                              placeholder="Maximum Capacity"
                                            />
                                          </div>
                                          {/* Address */}
                                          <div className="col-6 mb-3">
                                            <label className="form-label">
                                              Address
                                            </label>
                                            <Field
                                              type="text"
                                              name="contactInfo.address"
                                              className="form-control"
                                              placeholder="Address"
                                            />
                                          </div>
                                          {/* Email */}
                                          <div className="col-6 mb-3">
                                            <label className="form-label">
                                              Email
                                            </label>
                                            <Field
                                              type="text"
                                              name="contactInfo.email"
                                              className="form-control"
                                              placeholder="Email"
                                            />
                                          </div>
                                          {/* Mobile Number */}
                                          <div className="col-6 mb-3">
                                            <label className="form-label">
                                              Contact Number
                                            </label>
                                            <Field
                                              type="text"
                                              name="contactInfo.mobile"
                                              className="form-control"
                                              placeholder="Contact Number"
                                            />
                                          </div>
                                          {/* Whatsapp Number */}
                                          <div className="col-6 mb-3">
                                            <label className="form-label">
                                              Whatsapp Number
                                            </label>
                                            <Field
                                              type="text"
                                              name="contactInfo.whatsapp"
                                              className="form-control"
                                              placeholder="Whatsapp Number"
                                            />
                                          </div>
                                          {/* Description */}
                                          <div className="col-6 mb-3">
                                            <label className="form-label">
                                              Description
                                            </label>
                                            <Field
                                              as="textarea"
                                              name="description"
                                              className="form-control"
                                              placeholder="Description"
                                              rows={1}
                                            />
                                          </div>
                                          {/* Alternative Number */}
                                          <div className="col-6 mb-3">
                                            <label className="form-label">
                                              Alternative Contact No.
                                            </label>
                                            <Field
                                              type="text"
                                              name="contactInfo.alternateContact"
                                              className="form-control"
                                              placeholder="Alternative Contact No."
                                            />
                                          </div>
                                        </div>
                                      </div>

                                      <div className="modal-footer pb-2">
                                        <button
                                          type="button"
                                          className="btn bg-red-200 text-red-600 fw-bold me-2 hover:bg-red-500 hover:text-red-50"
                                          data-bs-dismiss="modal"
                                        >
                                          <i
                                            className="fa fa-times me-2"
                                            aria-hidden="true"
                                          ></i>
                                          Cancel
                                        </button>
                                        <button
                                          type="submit"
                                          className="btn bg-blue-200 text-blue-600 fw-bold hover:bg-blue-500 hover:text-blue-50"
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
                          {/* /Edit Hostel */}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            {/* /Hostel List */}
          </div>
        </div>
        {/* /Page Wrapper */}

        {/* View Hostel */}
        <div className="modal fade" id="view_hostel">
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title fs-5 fw-bold bg-blue-200 text-blue-700 px-3 rounded shadow-sm p-1">
                  <i className="fa fa-eye me-2" aria-hidden="true"></i>
                  View Hostel Details
                </h4>
                <button
                  type="button"
                  className="btn-close btn-secondary custom-btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <i className="ti ti-x" />
                </button>
              </div>
              <div className="modal-body p-1 pt-4">
                {selectedHostel?.imageUrl && (
                  <div className="row">
                    <div className="col-md-12">
                      {/* Image Carousel */}
                      <div
                        id="hostelImagesCarousel"
                        className="carousel slide mb-3"
                        data-bs-ride="carousel"
                      >
                        <div className="carousel-inner">
                          <div className="carousel-item active">
                            <div className="d-flex justify-content-center">
                              <img
                                src={selectedHostel?.imageUrl}
                                className="d-block w-25"
                                alt="Hostel Image 1"
                              />{" "}
                              <img
                                src={selectedHostel?.imageUrl}
                                className="d-block w-25 ms-3"
                                alt="Hostel Image 2"
                              />
                            </div>
                          </div>
                          <div className="carousel-item">
                            <div className="d-flex justify-content-center">
                              <img
                                src={selectedHostel?.imageUrl}
                                className="d-block w-25"
                                alt="Hostel Image 2"
                              />
                              <img
                                src={selectedHostel?.imageUrl}
                                className="d-block w-25 ms-3"
                                alt="Hostel Image 2"
                              />
                            </div>
                          </div>
                          <div className="carousel-item">
                            <div className="d-flex justify-content-center">
                              <img
                                src={selectedHostel?.imageUrl}
                                className="d-block w-25"
                                alt="Hostel Image 3"
                              />{" "}
                              <img
                                src={selectedHostel?.imageUrl}
                                className="d-block w-25 ms-3"
                                alt="Hostel Image 2"
                              />
                            </div>
                          </div>
                        </div>
                        <button
                          className="carousel-control-prev"
                          type="button"
                          data-bs-target="#hostelImagesCarousel"
                          data-bs-slide="prev"
                        >
                          <span
                            className="carousel-control-prev-icon btn-primary"
                            aria-hidden="true"
                          ></span>
                          <span className="visually-hidden">Previous</span>
                        </button>
                        <button
                          className="carousel-control-next"
                          type="button"
                          data-bs-target="#hostelImagesCarousel"
                          data-bs-slide="next"
                        >
                          <span
                            className="carousel-control-next-icon btn-primary"
                            aria-hidden="true"
                          ></span>
                          <span className="visually-hidden">Next</span>
                        </button>
                      </div>

                      {/* Hostel Details */}
                      <div className="p-3 pt-2 pb-2 details-container">
                        <div className="row mb-3 mx-auto">
                          <div className="detail-item col-6">
                            <span className="detail-title">Hostel Name :</span>
                            <span className="detail-value fw-bold ms-1">
                              {selectedHostel?.name}
                            </span>
                          </div>
                          <div className="detail-item col-6">
                            <span className="detail-title">
                              Hostel Address :
                            </span>
                            <span className="detail-value fw-bold ms-1">
                              {selectedHostel?.contactInfo.address}
                            </span>
                          </div>
                        </div>
                        <div className="row mb-3 mx-auto">
                          <div className="detail-item col-6">
                            <span className="detail-title">Hostel Type :</span>
                            <span className="detail-value fw-bold ms-1">
                              {selectedHostel?.type}
                            </span>
                          </div>
                          <div className="detail-item col-6">
                            <span className="detail-title">
                              Hostel Intake :
                            </span>
                            <span className="detail-value fw-bold ms-1">
                              {selectedHostel?.maximumStudentCapacity} Students
                            </span>
                          </div>
                        </div>
                        <div className="row mb-3 mx-auto">
                          <div className="detail-item col-6">
                            <span className="detail-title">
                              Contact Number :
                            </span>
                            <span className="detail-value fw-bold ms-1">
                              {selectedHostel?.contactInfo.mobile}
                            </span>
                          </div>
                          <div className="detail-item col-6">
                            <span className="detail-title">
                              Whatsapp Number :
                            </span>
                            <span className="detail-value fw-bold ms-1">
                              {selectedHostel?.contactInfo.whatsapp}
                            </span>
                          </div>
                        </div>
                        <div className="row mb-3 mx-auto">
                          <div className="detail-item col-6">
                            <span className="detail-title">
                              Alternative Contact Number :
                            </span>
                            <span className="detail-value fw-bold ms-1">
                              {selectedHostel?.contactInfo.alternateContact}
                            </span>
                          </div>
                          <div className="detail-item col-6">
                            <span className="detail-title">
                              Email Address :
                            </span>
                            <span className="detail-value fw-bold ms-1">
                              {selectedHostel?.contactInfo.email}
                            </span>
                          </div>
                        </div>
                        <div className="row mx-auto">
                          <div className="detail-item">
                            <span className="detail-title">
                              Hostel Description :
                            </span>
                            <span className="detail-value fw-bold ms-1">
                              {selectedHostel?.description}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="modal-footer p-1">
                <button
                  className="btn bg-red-100 text-red-600 fw-bold me-2  hover:bg-red-500 hover:text-red-50"
                  data-bs-dismiss="modal"
                >
                  <i className="fa fa-times me-2" aria-hidden="true"></i>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* View Hostel */}

        {/* Delete Modal */}
        <div className="modal fade" id="delete-modal">
          <div className="modal-dialog modal-dialog-centered ">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title fs-5 fw-bold  bg-blue-200 text-blue-700 px-3 rounded shadow-sm p-1">
                  <i className="fa fa-trash me-2" aria-hidden="true"></i>
                  Delete
                </h4>
                <button
                  type="button"
                  className="btn-close btn-secondary custom-btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <i className="ti ti-x" />
                </button>
              </div>
              <div className="modal-body">
                <p className="fs-3 fw-bold text-gray-600">
                  Are you sure you want to delete?
                </p>
                <div className="d-flex justify-content-end mt-4">
                  <button
                    type="button"
                    className="btn bg-blue-200 text-blue-600 fw-bold me-2 hover:bg-blue-500 hover:text-blue-50 "
                    data-bs-dismiss="modal"
                  >
                    <i className="fa fa-times me-2" aria-hidden="true"></i>
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn bg-red-200 text-red-600 fw-bold hover:bg-red-500 hover:text-red-50"
                    onClick={() => {
                      deletePost(selectedId);
                      setSelectedId(null);
                    }}
                  >
                    <i className="fa fa-trash me-2" aria-hidden="true"></i>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Delete Modal */}
      </div>
    </>
  );
}
export default Hostel;
