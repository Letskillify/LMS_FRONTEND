import React, { useEffect } from 'react'
import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import avatar1 from "../../assets/img/avatars/7.png"
import PersonalDetailsForm from './Forms/PersonalDetailsForm';
import EmploymentAndSalaryDetailsForm from './Forms/EmploymentAndSalaryDetailsForm';
import DocumentationAndPasswordForm from './Forms/DocumentationAndPasswordForm';
import axios from 'axios';
const base_url = import.meta.env.VITE_BASE_URL



function StaffManagement() {

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
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
      lastDegree: "",
      college: "",
      university: "",
      passingYear: "",
    },
    bankDetails: {
      accountHolderName: "",
      bankName: "",
      PANno: "",
      accountNumber: "",
      ifscCode: "",
    },
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
      allowances: "",
      deductions: {
        PF: "",
        TDS: "",
        ESIC: "",
        LDA: "",
        DA: "",
        HRA: "",
      },
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
  });

  const [staffs, setStaffs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/staff/get-all`);
        console.log(response);
        setStaffs(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  },[])

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

  const handleFileChange = (fieldName,e) => {
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


  const handleSubmit = (formData) => {
    console.log('Form Data:', formData);

    const imageFormData = new FormData();
    imageFormData.append('profilePhoto', formData.documents.profilePhoto);
    imageFormData.append('casteCertificate', formData.documents.casteCertificate);
    imageFormData.append('idProof', formData.documents.idProof);
    imageFormData.append('resume', formData.documents.resume);
    imageFormData.append('uploadBankPassbook', formData.documents.uploadBankPassbook);
    imageFormData.append('signature', formData.documents.signature);
    formData.documents.otherDocuments.forEach((file) => {
      imageFormData.append('otherDocuments', file);
    });

    try{
      const uploadResponse = axios.post(`${base_url}/api/upload`, imageFormData);
      console.log(uploadResponse);
    }catch(error){
      console.log(error);
    }
  };
  return (
    <div>
      <div className="layout-wrapper layout-content-navbar">
        <div className="layout-container">
          <div className="layout-page">
            <div className="content-wrapper">
              <div className="container-fluid container-p-y">
                <h4 className="fw-bold py-3 mb-4"><span className="text-muted fw-light">Dashboard /</span> Staff Management</h4>
                <div className="row">
                  <div className="col-md-3 col-sm-6 mb-4">
                    <div className="card bg-primary">
                      <div className="card-body">
                        <h2 className="card-title mb-2 text-white">10</h2>
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
                        <p style={{ direction: 'rtl', cursor: 'pointer' }} className='btn w-100 mb-0 btn-danger' data-bs-toggle="modal" data-bs-target="#modalCenter0">Add New Staff &nbsp;<i className='bx bx-message-square-add me-1' ></i></p>
                      </div>
                      {/* Add new Acountant */}
                      <div className="modal fade" id="modalCenter0" tabIndex="-1" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered manage-xl" role="document">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5 className="modal-title" id="modalCenterTitle">Demo School</h5>
                              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                              <div className="nav-align-top mb-4">
                                <h1 className='px-2 py-3' style={{ color: '#fff', fontSize: '25px', backgroundColor: '#8e8d8dfe' }}><i className="fa fa-plus-circle" aria-hidden="true"></i> Add Staff</h1>
                                <div className="table-responsive text-nowrap" style={{ border: 'none' }}>
                                  <form>
                                    {step === 1 && <PersonalDetailsForm formData={formData} handleChange={handleChange} />}
                                    {step === 2 && <EmploymentAndSalaryDetailsForm formData={formData} handleChange={handleChange} />}
                                    {step === 3 && <DocumentationAndPasswordForm formData={formData} handleChange={handleChange} handleFileChange={handleFileChange} />}
                                  </form>
                                  {step !== 3 ? (
                                    <>
                                      <button
                                        type="button"
                                        className="btn btn-secondary me-2"
                                        disabled={step === 1}
                                        onClick={handlePrevious}
                                      >
                                        Previous
                                      </button>
                                      <button
                                        type="button"
                                        className="btn btn-primary"
                                        disabled={step === 3}
                                        onClick={handleNext}
                                        style={{ float: 'right', cursor:step === 3 ? 'not-allowed' : 'pointer' }}
                                      >
                                        Next
                                      </button>
                                    </>
                                  ) : (
                                    <>
                                      <button
                                        type="button"
                                        className="btn btn-secondary me-2"
                                        disabled={step === 1}
                                        onClick={handlePrevious}
                                      >
                                        Previous
                                      </button>
                                      <button type="button" style={{ float: 'right' }} onClick={() => handleSubmit(formData)} className="btn btn-primary">
                                        Submit
                                      </button>
                                    </>
                                  )}
                                </div>

                              </div>
                              <div className='text-end'>
                                <button className='btn btn-secondary ' data-bs-dismiss="modal" aria-label="Close">Close</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col">
                        <button type="button" className="btn btn-success w-100">
                          <i className="bx bx-pie-chart-alt me-1"></i> Teachers Performance Report
                        </button>
                      </div>
                      <div className="col">
                        <button type="button" className="btn btn-danger w-100">
                          <i className="bx bx-pie-chart-alt me-1"></i> Staff Attendance Overview
                        </button>
                      </div>
                      <div className="col">
                        <button type="button" className="btn btn-info w-100">
                          <i className="bx bx-money me-1"></i> Staff Salary Overview
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
                          <span className="input-group-text"><i className="bx bx-search"></i></span>
                          <input type="text" className="form-control" placeholder="Search..." />
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
                            <i className='tf-icons bx bx-trash me-1'></i>
                            Delete All
                          </button>
                          <button type="button" className="btn btn-success">
                            <i className='tf-icons bx bxs-file me-1'></i>
                            Excel
                          </button>
                          <button type="button" className="btn btn-warning">
                            <i className='tf-icons bx bxs-file-doc me-1'></i>
                            CSV
                          </button>
                          <button type="button" className="btn btn-danger">
                            <i className='tf-icons bx bxs-file-pdf me-1'></i>
                            PDF
                          </button>
                          <button type="button" className="btn btn-info">
                            <i className='tf-icons bx bxs-printer me-1'></i>
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
                        <tr>
                          <td>096654</td>
                          <td>
                            <span className="d-flex align-items-center fw-bold">
                              <span className="me-2">
                                <img src={avatar1} alt="Avatar" className="rounded-circle border border-light" style={{ height: "50px" }} />
                              </span>
                              Ankush Sharma
                            </span>
                          </td>
                          <td>Teacher</td>
                          <td>staff@gmail.com</td>
                          <td>9876543210</td>
                          <td>
                            <div className="btn-group" id="dropdown-icon-demo">
                              <button type="button" className="btn btn-info dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                Certificate & Reports
                              </button>
                              <ul className="dropdown-menu">
                                <li>
                                  <a href="javascript:void(0);" className="dropdown-item"> Experience Certificate</a>
                                </li>
                                <li>
                                  <a href="javascript:void(0);" className="dropdown-item">Salary Report</a>
                                </li>
                                <li>
                                  <a href="javascript:void(0);" className="dropdown-item">Performance Report</a>
                                </li>
                                <li>
                                  <a href="javascript:void(0);" className="dropdown-item">Attendance Report</a>
                                </li>
                                <li>
                                  <a href="javascript:void(0);" className="dropdown-item">ID Card Generate</a>
                                </li>
                              </ul>
                            </div>
                          </td>
                          <td>
                            <a className="btn btn-warning" href="javascript:void(0);">
                              <i className="bx bxs-key me-1"></i>
                              Reset Password
                            </a>
                          </td>
                          <td>
                            <a className="btn btn-success btn-icon rounded-pill me-1" href="javascript:void(0);"><i className="bx bx-edit"></i></a>
                            <a className="btn btn-danger btn-icon rounded-pill" href="javascript:void(0);"><i className="bx bx-trash"></i></a>
                          </td>
                        </tr>
                        {staffs?.map((staff) => 
                        (<><tr>
                          <td></td>
                          <td>
                            <span className="d-flex align-items-center fw-bold">
                              <span className="me-2">
                                <img src={avatar1} alt="Avatar" className="rounded-circle border border-light" style={{ height: "50px" }} />
                              </span>
                              Ankush Sharma
                            </span>
                          </td>
                          <td>Teacher</td>
                          <td>staff@gmail.com</td>
                          <td>9876543210</td>
                          <td>
                            <div className="btn-group" id="dropdown-icon-demo">
                              <button type="button" className="btn btn-info dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                Certificate & Reports
                              </button>
                              <ul className="dropdown-menu">
                                <li>
                                  <a href="javascript:void(0);" className="dropdown-item"> Experience Certificate</a>
                                </li>
                                <li>
                                  <a href="javascript:void(0);" className="dropdown-item">Salary Report</a>
                                </li>
                                <li>
                                  <a href="javascript:void(0);" className="dropdown-item">Performance Report</a>
                                </li>
                                <li>
                                  <a href="javascript:void(0);" className="dropdown-item">Attendance Report</a>
                                </li>
                                <li>
                                  <a href="javascript:void(0);" className="dropdown-item">ID Card Generate</a>
                                </li>
                              </ul>
                            </div>
                          </td>
                          <td>
                            <a className="btn btn-warning" href="javascript:void(0);">
                              <i className="bx bxs-key me-1"></i>
                              Reset Password
                            </a>
                          </td>
                          <td>
                            <a className="btn btn-success btn-icon rounded-pill me-1" href="javascript:void(0);"><i className="bx bx-edit"></i></a>
                            <a className="btn btn-danger btn-icon rounded-pill" href="javascript:void(0);"><i className="bx bx-trash"></i></a>
                          </td>
                        </tr></>))}
                      </tbody>
                      <tfoot>
                        <tr>
                          <td colspan="8">
                            <nav aria-label="Page navigation">
                              <ul className="pagination my-2">
                                <li className="page-item prev">
                                  <a className="page-link" href="javascript:void(0);"><i className="tf-icon bx bx-chevrons-left"></i></a>
                                </li>
                                <li className="page-item active">
                                  <a className="page-link" href="javascript:void(0);">1</a>
                                </li>
                                <li className="page-item">
                                  <a className="page-link" href="javascript:void(0);">2</a>
                                </li>
                                <li className="page-item">
                                  <a className="page-link" href="javascript:void(0);">3</a>
                                </li>
                                <li className="page-item next">
                                  <a className="page-link" href="javascript:void(0);"><i className="tf-icon bx bx-chevrons-right"></i></a>
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
  )
}

export default StaffManagement
