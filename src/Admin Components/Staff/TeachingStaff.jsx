import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
// import avatar1 from "../../assets/img/avatars/7.png"
import PersonalDetailsForm from "./Forms/PersonalDetailsForm";
import EmploymentAndSalaryDetailsForm from "./Forms/EmploymentAndSalaryDetailsForm";
import DocumentationAndPasswordForm from "./Forms/DocumentationAndPasswordForm";
import axios from "axios";
// import { MainContext } from "../../Controller/MainProvider";
import {
  useAddTeacherMutation,
  useGetTeachersByInstituteIdQuery,
  usePermanentlyDeleteTeacherByIdMutation,
  useUpdateTeacherByIdMutation,
} from "../../Redux/Api/teacherSlice";
import { getCommonCredentials } from "../../GlobalHelper/CommonCredentials";
import { Modal, Spinner } from "react-bootstrap";
import useGlobalToast from "../../GlobalComponents/GlobalToast";
import { useFileUploader } from "../../GlobalHelper/FileUploader";
import {
  useGetAllRolesQuery,
  useGetRolesByInstituteIdQuery,
} from "../../Redux/Api/rolesSlice";
import { useGetDeductionsByInstituteIdQuery } from "../../Redux/Api/SalaryDeductionSlice";
import { useGetAllowancesByInstituteIdQuery } from "../../Redux/Api/SalaryAllowanceSlice";
const base_url = import.meta.env.VITE_BASE_URL;

function TeachingStaff() {
  const { InstituteId, userId, TeacherData } = getCommonCredentials();

  const showToast = useGlobalToast();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    instituteId: "",
    fullName: { firstName: "", lastName: "" },
    personalDetails: {
      dateOfBirth: "",
      gender: "",
      disability: false,
      maritalStatus: "",
      spouseName: "",
      fatherName: "",
      aadharNo: "",
    },
    contactInfo: {
      email: "",
      mobile: "",
      whatsapp: "",
      alternateContact: "",
      address: "",
    },
    religionCategory: {
      nationality: "",
      religion: "",
      category: "",
      caste: "",
    },
    experience: {
      lastOrganizationName: "",
      jobPosition: "",
      duration: "",
    },
    qualification: {
      highestDegree: "",
      university: "",
      passOutyear: "",
      specialization: "",
      certifications: [],
      experience: 0,
    },
    bankDetails: {
      accountHolderName: "",
      bankName: "",
      PANno: "",
      accountNumber: "",
      ifscCode: "",
    },
    workArea: "",
    emergencyContact: {
      name: "",
      relation: "",
      contactNumber: "",
    },
    employeementDetails: {
      role: "",
      joiningDate: "",
      designation: "",
      department: "",
      employmentType: "",
      employeeStatus: "",
    },
    salaryDetails: {
      baseSalary: "",
      allowances: [],
      deductions: [],
      netSalary: "",
      salaryPackage: "",
      paymentMethod: "",
    },
    documents: {
      profilePhoto: "",
      casteCertificate: "",
      idProof: "",
      resume: "",
      uploadBankPassbook: "",
      signature: "",
      otherDocuments: [],
    },
    loginPassword: "",
    isIDgenerated: false,
    subjectsHandled: [],
    classTeacher: {
      isClassTeacher: false,
      ofClass: "",
    },
  });
  const resetFormData = () => {
    setFormData({
      instituteId: InstituteId,
      fullName: { firstName: "", lastName: "" },
      personalDetails: {
        dateOfBirth: "",
        gender: "",
        disability: false,
        maritalStatus: "",
        spouseName: "",
        fatherName: "",
        aadharNo: "",
      },
      contactInfo: {
        email: "",
        mobile: "",
        whatsapp: "",
        alternateContact: "",
        address: "",
      },
      religionCategory: {
        nationality: "",
        religion: "",
        category: "",
        caste: "",
      },
      experience: {
        lastOrganizationName: "",
        jobPosition: "",
        duration: "",
      },
      qualification: {
        highestDegree: "",
        university: "",
        passOutyear: "",
        specialization: "",
        certifications: [],
        experience: 0,
      },
      bankDetails: {
        accountHolderName: "",
        bankName: "",
        PANno: "",
        accountNumber: "",
        ifscCode: "",
      },
      workArea: "",
      emergencyContact: {
        name: "",
        relation: "",
        contactNumber: "",
      },
      employeementDetails: {
        role: "",
        joiningDate: "",
        designation: "",
        department: "",
        employmentType: "",
        employeeStatus: "",
      },
      salaryDetails: {
        baseSalary: "",
        allowances: [],
        deductions: [],
        netSalary: "",
        salaryPackage: "",
        paymentMethod: "",
      },
      documents: {
        profilePhoto: "",
        casteCertificate: "",
        idProof: "",
        resume: "",
        uploadBankPassbook: "",
        signature: "",
        otherDocuments: [],
      },
      loginPassword: "",
      isIDgenerated: false,
      subjectsHandled: [],
      classTeacher: {
        isClassTeacher: false,
        ofClass: "",
      },
    });
  };
  const [roles, setRoles] = useState(null);
  const [allowances, setAllowances] = useState(null);
  const [deductions, setDeductions] = useState(null);
  const { uploadDocuments } = useFileUploader();
  const [staffs, setStaffs] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [staffIdToDelete, setStaffIdToDelete] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    resetFormData();
    setStep(1);
    setEditMode(false);
  };

  const { data: rolesData } = useGetRolesByInstituteIdQuery(InstituteId, {
    skip: !InstituteId,
    refetchOnMountOrArgChange: true,
  });

  const { data: allowancesData } = useGetAllowancesByInstituteIdQuery(
    InstituteId,
    {
      skip: !InstituteId,
      refetchOnMountOrArgChange: true,
    }
  );

  const { data: deductionsData } = useGetDeductionsByInstituteIdQuery(
    InstituteId,
    {
      skip: !InstituteId,
      refetchOnMountOrArgChange: true,
    }
  );
  const [addTeacher] = useAddTeacherMutation();
  const [
    updateTeacher,
    { isLoading: isLoadingUpdate, isSuccess: isSuccessUpdate },
  ] = useUpdateTeacherByIdMutation();

  const [deleteTeacher] = usePermanentlyDeleteTeacherByIdMutation();

  useEffect(() => {
    if (InstituteId) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        instituteId: InstituteId,
      }));
    }
  }, [InstituteId]);

  useEffect(() => {
    setStaffs(TeacherData);
    setRoles(rolesData);
    setAllowances(allowancesData);
    setDeductions(deductionsData);
  }, [TeacherData, rolesData, allowancesData, deductionsData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prevState) => ({
        ...prevState,
        [parent]: {
          ...prevState[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleFileChange = (fieldName, e) => {
    const file = e.target.files[0];
    setFormData((prevFormData) => ({
      ...prevFormData,
      documents: {
        ...prevFormData.documents,
        [fieldName]: file,
      },
    }));
  };

  const handleNext = () => setStep((prev) => prev + 1);
  const handlePrevious = () => setStep((prev) => prev - 1);

  const handleSubmit = async (formData) => {
    try {
      // Upload images
      const imageResponse = await uploadDocuments({
        documents: formData.documents,
      });

      const imageData = imageResponse?.data;

      console.log("imageData", imageData);

      if (imageData.success) {
        // Update formData with URLs from image upload response
        Object.keys(imageData.files).forEach((fieldName) => {
          const cloudinaryUrl = imageData.files[fieldName];
          if (formData.documents.hasOwnProperty(fieldName)) {
            formData.documents[fieldName] = cloudinaryUrl;
          }
        });

        const finalResponse = await addTeacher(formData);
        console.log("finalResponse", finalResponse);
        if (
          finalResponse.data.status_code === 201 ||
          finalResponse.data.status_code === 200 ||
          finalResponse.data.success
        ) {
          handleCloseModal();
          setEditMode(false);
        }
        showToast("Teacher added successfully", "success");
      } else {
        console.error("Error uploading images:", imageData);
        alert("Error uploading images");
        // setIsModalOpen(false);
      }
    } catch (error) {
      console.error("Error during form submission:", error);
      alert("Error during form submission");
      // setIsModalOpen(false);
    }
  };

  const handleUpdate = async (formData, staff_id) => {
    try {
      await updateTeacher({
        teacherData: formData,
        teacherId: staff_id,
      });

      if (!isSuccessUpdate) {
        resetFormData();
        setStep(1);
        setEditMode(false);
        setIsModalOpen(false);
        showToast("Teacher updated successfully", "success");
      } else {
        console.error("Error posting to teachers API:");
        alert("Error posting to teachers API");
        // setIsModalOpen(false);
      }
    } catch (error) {
      console.error("Error during form submission:", error);
      alert("Error during form submission");
      // setIsModalOpen(false);
    }
  };

  const handleDelete = async (staff_id) => {
    try {
      await deleteTeacher(staff_id);

      showToast("Teacher deleted successfully", "success");
    } catch (error) {
      console.error("Error deleting staff:", error);
    }
  };

  // if (isLoading) {
  //   return (
  //     <div className="d-flex justify-content-center align-items-center vh-100">
  //       <Spinner animation="border" variant="primary" color="primary" />
  //     </div>
  //   );
  // }

  return (
    <div>
      <div className="layout-wrapper layout-content-navbar">
        <div className="layout-container">
          <div className="layout-page">
            <div className="content-wrapper">
              <div className="container-fluid container-p-y">
                <h4 className="fw-bold py-3 mb-4">
                  <span className="text-muted fw-light">
                    Dashboard /Staff Management /
                  </span>{" "}
                  Teaching Staff
                </h4>
                <div className="row">
                  <div className="col-md-3 col-sm-6 mb-4">
                    <div className="card bg-primary">
                      <div className="card-body">
                        <h2 className="card-title mb-2 text-white">
                          {staffs?.length}
                        </h2>
                        <p className="text-white fw-semibold">Total Teachers</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 col-sm-6 mb-4">
                    <div className="card bg-success">
                      <div className="card-body">
                        <h2 className="card-title mb-2 text-white">5</h2>
                        <p className="text-white fw-semibold">Present Today</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 col-sm-6 mb-4">
                    <div className="card bg-danger">
                      <div className="card-body">
                        <h2 className="card-title mb-2 text-white">3</h2>
                        <p className="text-white fw-semibold">Absent Today</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 col-sm-6 mb-4">
                    <div className="card bg-info">
                      <div className="card-body">
                        <h2 className="card-title mb-2 text-white">2</h2>
                        <p className="text-white fw-semibold">Leave Today</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card mb-4">
                  <div className="card-body">
                    <div className="row">
                      <div className="col">
                        <p
                          style={{ direction: "rtl", cursor: "pointer" }}
                          className="btn w-100 mb-0 btn-danger"
                          data-bs-toggle="modal"
                          data-bs-target="#modalCenter"
                          onClick={() => setIsModalOpen(true)}
                        >
                          Add New Staff &nbsp;
                          <i className="bx bx-message-square-add me-1"></i>
                        </p>
                      </div>
                      <Modal
                        show={isModalOpen}
                        onHide={handleCloseModal}
                        size="lg"
                        centered
                        backdrop="static"
                      >
                        {isLoadingUpdate ? (
                          <Modal.Body className="d-flex justify-content-center align-items-center">
                            <Spinner animation="border" variant="primary" />
                          </Modal.Body>
                        ) : (
                          <>
                            <Modal.Header closeButton>
                              <Modal.Title>Demo School</Modal.Title>
                            </Modal.Header>

                            <Modal.Body>
                              <h1 className="px-2 py-3 text-white fs-5 bg-secondary">
                                <i
                                  className="fa fa-plus-circle"
                                  aria-hidden="true"
                                ></i>{" "}
                                Add Staff
                              </h1>
                              <form>
                                {step === 1 && (
                                  <PersonalDetailsForm
                                    formData={formData}
                                    handleChange={handleChange}
                                  />
                                )}
                                {step === 2 && (
                                  <EmploymentAndSalaryDetailsForm
                                    formData={formData}
                                    setFormData={setFormData}
                                    handleChange={handleChange}
                                    roles={roles}
                                    allowances={allowances}
                                    deductions={deductions}
                                  />
                                )}
                                {step === 3 && (
                                  <DocumentationAndPasswordForm
                                    formData={formData}
                                    handleChange={handleChange}
                                    handleFileChange={handleFileChange}
                                  />
                                )}
                              </form>
                            </Modal.Body>

                            <Modal.Footer>
                              {step !== 1 && (
                                <button
                                  type="button"
                                  className="btn btn-secondary"
                                  onClick={handlePrevious}
                                >
                                  Previous
                                </button>
                              )}

                              {step !== 3 ? (
                                <button
                                  type="button"
                                  className="btn btn-primary"
                                  onClick={handleNext}
                                  disabled={step === 3}
                                >
                                  Next
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  className="btn btn-primary"
                                  onClick={() =>
                                    editMode
                                      ? handleUpdate(formData, formData?._id)
                                      : handleSubmit(formData)
                                  }
                                >
                                  {editMode ? "Update" : "Submit"}
                                </button>
                              )}
                            </Modal.Footer>
                          </>
                        )}
                      </Modal>
                      <div
                        className="modal fade"
                        id="DeleteModalCenter"
                        tabIndex="-1"
                        aria-hidden="true"
                      >
                        <div className="modal-dialog modal-dialog-centered">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5
                                className="modal-title"
                                id="DeleteModalLongTitle"
                              >
                                Confirm Delete
                              </h5>
                              <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              ></button>
                            </div>
                            <div className="modal-body">
                              <p>
                                Are you sure you want to delete this record?
                              </p>
                            </div>
                            <div className="modal-footer">
                              <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                              >
                                Close
                              </button>
                              <button
                                type="button"
                                className="btn btn-danger"
                                data-bs-dismiss="modal"
                                onClick={() => handleDelete(staffIdToDelete)}
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col">
                        <button type="button" className="btn btn-success w-100">
                          <i className="bx bx-pie-chart-alt me-1"></i> Teachers
                          Performance Report
                        </button>
                      </div>
                      <div className="col">
                        <button type="button" className="btn btn-danger w-100">
                          <i className="bx bx-pie-chart-alt me-1"></i> Staff
                          Attendance Overview
                        </button>
                      </div>
                      <div className="col">
                        <button type="button" className="btn btn-info w-100">
                          <i className="bx bx-money me-1"></i> Staff Salary
                          Overview
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card mb-4">
                  <div className="card-body">
                    <div className="row">
                      <div className="col">
                        <div className="input-group input-group-merge">
                          <span className="input-group-text">
                            <i className="bx bx-search"></i>
                          </span>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Search..."
                          />
                        </div>
                      </div>
                      <div className="col">
                        <select className="form-select">
                          <option selected="">Open this select menu</option>
                          <option value="1">One</option>
                          <option value="2">Two</option>
                          <option value="3">Three</option>
                        </select>
                      </div>
                      <div className="col-auto">
                        <div className="btn-group">
                          <button type="button" className="btn btn-secondary">
                            <i className="tf-icons bx bx-pencil me-1"></i>
                            Edit All
                          </button>
                          <button type="button" className="btn btn-danger">
                            <i className="tf-icons bx bx-trash me-1"></i>
                            Delete All
                          </button>
                          <button type="button" className="btn btn-success">
                            <i className="tf-icons bx bxs-file me-1"></i>
                            Excel
                          </button>
                          <button type="button" className="btn btn-warning">
                            <i className="tf-icons bx bxs-file-doc me-1"></i>
                            CSV
                          </button>
                          <button type="button" className="btn btn-danger">
                            <i className="tf-icons bx bxs-file-pdf me-1"></i>
                            PDF
                          </button>
                          <button type="button" className="btn btn-info">
                            <i className="tf-icons bx bxs-printer me-1"></i>
                            Print
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <h5 className="card-header">Staff Information</h5>
                  <div className="table-responsive text-nowrap">
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th>Emp ID</th>
                          <th>Name</th>
                          <th>Designation</th>
                          <th>Email</th>
                          <th>Phone Number</th>
                          <th>Reprts</th>
                          <th>Password</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody className="table-border-bottom-0">
                        {staffs?.map((staff) => (
                          <>
                            <tr key={staff?.StaffID}>
                              <td>{staff?.StaffID}</td>
                              <td>
                                <span className="d-flex align-items-center fw-bold">
                                  <span className="me-2">
                                    <img
                                      src={staff?.profilePhoto}
                                      alt="Avatar"
                                      className="rounded-circle border border-light"
                                      style={{ height: "50px" }}
                                    />
                                  </span>
                                  {staff?.fullName?.firstName}{" "}
                                  {staff?.fullName?.lastName}
                                </span>
                              </td>
                              <td>Teacher</td>
                              <td>{staff?.contactInfo?.email}</td>
                              <td>{staff?.contactInfo?.mobile}</td>
                              <td>
                                <div
                                  className="btn-group"
                                  id="dropdown-icon-demo"
                                >
                                  <button
                                    type="button"
                                    className="btn btn-info dropdown-toggle"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                  >
                                    Certificate & Reports
                                  </button>
                                  <ul className="dropdown-menu">
                                    <li>
                                      <a
                                        href="javascript:void(0);"
                                        className="dropdown-item"
                                      >
                                        {" "}
                                        Experience Certificate
                                      </a>
                                    </li>
                                    <li>
                                      <a
                                        href="javascript:void(0);"
                                        className="dropdown-item"
                                      >
                                        Salary Report
                                      </a>
                                    </li>
                                    <li>
                                      <a
                                        href="javascript:void(0);"
                                        className="dropdown-item"
                                      >
                                        Performance Report
                                      </a>
                                    </li>
                                    <li>
                                      <a
                                        href="javascript:void(0);"
                                        className="dropdown-item"
                                      >
                                        Attendance Report
                                      </a>
                                    </li>
                                    <li>
                                      <a
                                        href="javascript:void(0);"
                                        className="dropdown-item"
                                      >
                                        ID Card Generate
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </td>
                              <td>
                                <a
                                  className="btn btn-warning"
                                  href="javascript:void(0);"
                                >
                                  <i className="bx bxs-key me-1"></i>
                                  Reset Password
                                </a>
                              </td>
                              <td>
                                <a
                                  className="btn btn-success btn-icon rounded-pill me-1"
                                  data-bs-toggle="modal"
                                  data-bs-target="#modalCenter"
                                  onClick={() => {
                                    console.log("staff clickeed", staff);
                                    setFormData((prevFormData) => ({
                                      ...prevFormData,
                                      ...staff,
                                      salaryDetails: {
                                        ...staff?.salaryDetails,
                                        allowances:
                                          staff?.salaryDetails?.allowances?.map(
                                            (allowance) => ({
                                              typeOfAllowance:
                                                allowance?.typeOfAllowance?._id,
                                              amount: allowance?.amount,
                                              allowanceName:
                                                allowance?.typeOfAllowance
                                                  ?.allowanceName,
                                              type: allowance?.amountType,
                                            })
                                          ) || [],
                                        deductions:
                                          staff?.salaryDetails?.deductions?.map(
                                            (deduction) => ({
                                              typeOfDeduction:
                                                deduction?.typeOfDeduction?._id,
                                              amount: deduction.amount,
                                              deductionName:
                                                deduction?.typeOfDeduction
                                                  ?.deductionName,
                                              type: deduction.amountType,
                                            })
                                          ) || [],
                                      },
                                    }));
                                    setStep(1);
                                    setEditMode(true);
                                    setIsModalOpen(true);
                                  }}
                                >
                                  <i className="bx bx-edit"></i>
                                </a>
                                <a
                                  className="btn btn-danger btn-icon rounded-pill"
                                  onClick={() => {
                                    // handleDelete(staff.StaffID);
                                    setStaffIdToDelete(staff._id);
                                  }}
                                  data-bs-toggle="modal"
                                  data-bs-target="#DeleteModalCenter"
                                >
                                  <i className="bx bx-trash"></i>
                                </a>
                              </td>
                            </tr>
                          </>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr>
                          <td colspan="8">
                            <nav aria-label="Page navigation">
                              <ul className="pagination my-2">
                                <li className="page-item prev">
                                  <a
                                    className="page-link"
                                    href="javascript:void(0);"
                                  >
                                    <i className="tf-icon bx bx-chevrons-left"></i>
                                  </a>
                                </li>
                                <li className="page-item active">
                                  <a
                                    className="page-link"
                                    href="javascript:void(0);"
                                  >
                                    1
                                  </a>
                                </li>
                                <li className="page-item">
                                  <a
                                    className="page-link"
                                    href="javascript:void(0);"
                                  >
                                    2
                                  </a>
                                </li>
                                <li className="page-item">
                                  <a
                                    className="page-link"
                                    href="javascript:void(0);"
                                  >
                                    3
                                  </a>
                                </li>
                                <li className="page-item next">
                                  <a
                                    className="page-link"
                                    href="javascript:void(0);"
                                  >
                                    <i className="tf-icon bx bx-chevrons-right"></i>
                                  </a>
                                </li>
                              </ul>
                            </nav>
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              </div>
              <div className="content-backdrop fade"></div>
            </div>
          </div>
        </div>
        <div className="layout-overlay layout-menu-toggle"></div>
      </div>
    </div>
  );
}

export default TeachingStaff;
