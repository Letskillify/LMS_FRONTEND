import React, { useContext, useEffect, useState } from 'react'
import { getCommonCredentials } from '../../GlobalHelper/CommonCredentials';

const StudentDetail = () => {
  const [data, setData] = useState(null)
  const [tables, setTables] = useState("viewDeatils");
  const { Student } = getCommonCredentials();

  useEffect(() => {
    if (Student) {
      setData(Student)
    }
  }, [Student])



  const handleDownload = async (Data) => {
    const response = await fetch(Data);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = Data.split('/').pop();
    a.click();
    window.URL.revokeObjectURL(url);
  }

  return (
    <>
      <div className="container mt-4">
        {/* Top Profile */}
        <div className="card p-3 mb-4 shadow">
          <div
            className="row pb-3"
            style={{ borderBottom: "1px solid rgb(113 113 113)" }}
          >
            <div className="col-lg-2 col-md-4 col-sm-12 text-center my-auto">
              <img
                src={data?.personalDetails?.profilePhoto}
                alt=""
                style={{ width: "140px", height: "140px", borderRadius: "60%" }}
                onError={(e) => { e.target.src = "/image/defaultImg.png"; }}
              />
            </div>
            <div className="col-lg-4 col-md-4 col-sm-10">
              <table className="table table-borderless mt-2">
                <tbody>
                  <tr>
                    <td className="p-0">Name :</td>
                    <td className="p-0">{data?.personalDetails?.firstName + " " + data?.personalDetails?.lastName}</td>
                  </tr>
                  <tr>
                    <td className="p-0">Admission No :</td>
                    <td className="p-0">{data?.enrollmentDetails?.admissionNO}</td>
                  </tr>
                  <tr>
                    <td className="p-0">Father Name :</td>
                    <td className="p-0">{data?.parentDetails?.Father?.name}</td>
                  </tr>
                  <tr>
                    <td className="p-0">Mother Name :</td>
                    <td className="p-0">{data?.parentDetails?.Mother?.name}</td>

                  </tr>
                  <tr>
                    <td className="p-0">Class :</td>
                    <td className="p-0">Ist. - A (Hi Eng His)</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="col-lg-6 col-md-4 col-sm-2 d-flex justify-content-end">
              <i
                className="fa fa-ellipsis-v fs-4 text-primary threedot"
                aria-hidden="true"
              ></i>
            </div>
          </div>
          <div className="mt-3 mx-auto row">
            <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
              <button
                className="btn profilebtn  fw-bold rounded-0"
                style={{ border: "2px solid black", margin: "6px", }}
                onClick={() => setTables("viewDeatils")}
              >
                VIEW DETAILS
              </button>
              {/* <button
                className="btn profilebtn  fw-bold rounded-0 btn-hover"
                style={{ border: "2px solid black", margin: "6px", }}
                onClick={() => setTables("siblings")}
              >
                SIBLINGS
              </button> */}
              <button
                className="btn profilebtn  fw-bold rounded-0 btn-hover"
                style={{ border: "2px solid black", margin: "6px", }}
                onClick={() => setTables("fees")}
              >
                FEES
              </button>
              <button
                className="btn profilebtn  fw-bold rounded-0 btn-hover"
                style={{ border: "2px solid black", margin: "6px", }}
                onClick={() => setTables("activity")}
              >
                ACTIVITY
              </button>
              <button
                className="btn profilebtn  fw-bold rounded-0 btn-hover"
                style={{ border: "2px solid black", margin: "6px", }}
                onClick={() => setTables("feesStructure")}
              >
                DELETED FEES STRUCTURES
              </button>
              <button
                className="btn profilebtn  fw-bold rounded-0 btn-hover"
                style={{ border: "2px solid black", margin: "6px", }}
                onClick={() => setTables("attendance")}
              >
                ATTENDANCE
              </button>
              <button
                className="btn profilebtn  fw-bold rounded-0 btn-hover"
                style={{ border: "2px solid black", margin: "6px", }}
                onClick={() => setTables("idCard")}
              >
                DOWNLOAD ID CARD
              </button>
              <button
                className="btn profilebtn  fw-bold rounded-0 btn-hover"
                style={{ border: "2px solid black", margin: "6px", }}
                onClick={() => setTables("documents")}
              >
                DOCUMENTS
              </button>
              <button
                className="btn profilebtn  fw-bold rounded-0 btn-hover"
                style={{ border: "2px solid black", margin: "6px", }}
                onClick={() => setTables("subject")}
              >
                SUBJECTS
              </button>
            </div>
          </div>
        </div>
        {/* Top Profile */}

        {/* View Details */}
        <div className={`${tables === "viewDeatils" ? "d-initail" : "d-none"}`}>
          <div className="row mx-auto">
            {/* Admission Details */}
            <div className="col-lg-6 col-md-12 col-sm-12 mb-3 p-0 ">
              <div className="card border rounded shadow me-3">

                <div
                  className=" p-1 ps-3 pt-2"
                  style={{ backgroundColor: "rgb(227 222 242 / 63%)" }}
                >
                  <h4>Admission Details</h4>
                </div>
                <div className="p-3  px-0">
                  <table className="table table-bordered ">
                    <tbody>
                      <tr>
                        <td className="w-50">ID</td>
                        <td>{data?.StuID}</td>
                      </tr>
                      {/* <tr>
                        <td>PEN No.:</td>
                        <td>{data?.enrollmentDetails?.PENno}</td>
                      </tr> */}
                      <tr>
                        <td>Admission No</td>
                        <td>{data?.enrollmentDetails?.admissionNO} </td>
                      </tr>

                      <tr>
                        <td>Admission Type</td>
                        <td>{data?.enrollmentDetails?.admissionType}</td>
                      </tr>
                      <tr>
                        <td>Roll No</td>
                        <td>{data?.enrollmentDetails?.rollNo}</td>
                      </tr>
                      <tr>
                        <td>Admission Date</td>
                        <td>{data?.enrollmentDetails?.admissionDate}</td>
                      </tr>

                      <tr>
                        <td>Section</td>
                        <td>{data?.enrollmentDetails?.section}</td>
                      </tr>
                      <tr>
                        <td>Medium</td>
                        <td>{data?.enrollmentDetails?.instituteMedium}</td>
                      </tr>
                      <tr>
                        <td>Stream</td>
                        <td>{data?.enrollmentDetails?.courseStream}</td>
                      </tr>

                    </tbody>
                  </table>
                </div>
              </div>
              {/* University Section */}
              <div className="card border rounded shadow mt-3">
                <div
                  className="card-header"
                  style={{ backgroundColor: "rgb(227 222 242 / 63%)" }}
                >
                  <strong>University</strong>
                </div>
                <div className="card-body px-0">
                  <div className="row p-2 px-0">
                    <table className="table table-bordered">
                      <tbody>
                        <tr>
                          <td>University/Board</td>
                          <td>{data?.enrollmentDetails?.boardName} </td>
                        </tr>
                        <tr>
                          <td>College/School</td>
                          <td>{data?.enrollmentDetails?.instituteName} </td>
                        </tr>
                        <tr>
                          <td>Course/Subject</td>
                          <td>{data?.enrollmentDetails?.course} </td>
                        </tr>
                        <tr>
                          <td>Location</td>
                          <td>{data?.enrollmentDetails?.instituteLocation} </td>
                        </tr>

                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              {/* University Section */}
            </div>
            {/* Admission Details */}



            {/* Personal Details */}
            <div className="col-lg-6 col-md-12 col-sm-12 mb-3 p-0">
              <div className="card border rounded shadow ms-2 ">
                <div
                  className="p-1 ps-3 pt-2"
                  style={{ backgroundColor: "rgb(227 222 242 / 63%)" }}
                >
                  <h4>Personal Details</h4>
                </div>
                <div className="p-3  px-0">
                  <table className="table table-bordered">
                    <tbody>
                      <tr>
                        <td>Name</td>
                        <td>{data?.personalDetails?.firstName + " " + data?.personalDetails?.lastName}</td>
                      </tr>
                      <tr>
                        <td>Email</td>
                        <td>{data?.contactInfo?.email} </td>
                      </tr>
                      <tr>
                        <td>Mobile</td>
                        <td>{data?.contactInfo?.mobile}</td>
                      </tr>
                      <tr>
                        <td>Whatsapp</td>
                        <td>{data?.contactInfo?.whatsapp}</td>
                      </tr>
                      <tr>
                        <td>Alternate Number</td>
                        <td>{data?.contactInfo?.alternateContact}</td>
                      </tr>
                      <tr>
                        <td>Gender</td>
                        <td>{data?.personalDetails?.gender}</td>
                      </tr>
                      <tr>
                        <td>Blood Group</td>
                        <td>{data?.personalDetails?.bloodGroup}+</td>
                      </tr>
                      {/* <tr>
                        <td>Height</td>
                        <td>{data?.personalDetails?.admissionNO}</td>
                      </tr>
                      <tr>
                        <td>Weight</td>
                        <td>60KG</td>
                      </tr> */}
                      <tr>
                        <td>D.O.B</td>
                        <td>{data?.personalDetails?.dateOfBirth}</td>
                      </tr>

                      <tr>
                        <td>Nationality</td>
                        <td>{data?.personalDetails?.nationality}</td>
                      </tr>
                      <tr>
                        <td>Religion</td>
                        <td>{data?.personalDetails?.religion}</td>
                      </tr>
                      <tr>
                        <td>Category</td>
                        <td>{data?.personalDetails?.category}</td>
                      </tr>
                      {/* <tr>
                        <td>Referred By</td>
                        <td>{data?.personalDetails?.admissionNO}</td>
                      </tr> */}
                      <tr>
                        <td>Caste</td>
                        <td>{data?.personalDetails?.caste}</td>
                      </tr>
                      <tr>
                        <td>Address</td>
                        <td>{data?.contactInfo?.address?.houseNo}</td>
                      </tr>
                      <tr>
                        <td>City</td>
                        <td>{data?.contactInfo?.address?.city}</td>
                      </tr>
                      <tr>
                        <td>State</td>
                        <td>{data?.contactInfo?.address?.state + " " + data?.contactInfo?.address?.country}</td>
                      </tr>
                      <tr>
                        <td>Pincode</td>
                        <td>{data?.contactInfo?.address?.pincode}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            {/* Personal Details */}
          </div>

          {/* Second */}
          <div className="row mb-4">


            {/* Parents Details Section */}
            <div className="col-lg-12 col-md-6 col-sm-12">
              <div className="card border rounded shadow">
                <div
                  className="card-header"
                  style={{ backgroundColor: "rgb(227 222 242 / 63%)" }}
                >
                  <strong>Parents Details</strong>
                </div>
                <div className="card-body  px-0">
                  <table className="table table-bordered">
                    <thead
                      className=""
                      style={{ backgroundColor: "rgb(208 228 204 / 70%)" }}
                    >
                      <tr className="border-dark ">
                        <th>Details</th>
                        <th>Father</th>
                        <th>Mother</th>
                        <th>Guardian</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Name</td>
                        <td>{data?.parentDetails?.Father.name} </td>
                        <td>{data?.parentDetails?.Mother.name} </td>
                        <td>{data?.parentDetails?.Guardian.name} </td>
                      </tr>
                      <tr>
                        <td>Qualification</td>
                        <td>{data?.parentDetails?.Father?.qualification} </td>
                        <td>{data?.parentDetails?.Mother?.qualification} </td>
                        <td>{data?.parentDetails?.Guardian?.qualification} </td>
                      </tr>
                      <tr>
                        <td>Residential Address</td>
                        <td>{data?.parentDetails?.Father?.residentialAddress} </td>
                        <td>{data?.parentDetails?.Mother?.residentialAddress} </td>
                        <td>{data?.parentDetails?.Guardian?.residentialAddress} </td>
                      </tr>
                      <tr>
                        <td>Occupation</td>
                        <td>{data?.parentDetails?.Father?.occupation} </td>
                        <td>{data?.parentDetails?.Mother?.occupation} </td>
                        <td>{data?.parentDetails?.Guardian?.occupation} </td>
                      </tr>
                      <tr>
                        <td>Official Address</td>
                        <td>{data?.parentDetails?.Father?.officialAddress} </td>
                        <td>{data?.parentDetails?.Mother?.officialAddress} </td>
                        <td>{data?.parentDetails?.Guardian?.officialAddress} </td>
                      </tr>
                      <tr>
                        <td>Annual Income</td>
                        <td>{data?.parentDetails?.Father?.annualIncome} </td>
                        <td>{data?.parentDetails?.Mother?.annualIncome} </td>
                        <td>{data?.parentDetails?.Guardian?.annualIncome} </td>
                      </tr>
                      <tr>
                        <td>Email Address</td>
                        <td>{data?.parentDetails?.Father?.email} </td>
                        <td>{data?.parentDetails?.Mother?.email} </td>
                        <td>{data?.parentDetails?.Guardian?.email} </td>

                      </tr>
                      <tr>
                        <td>Mobile No.:</td>
                        <td>{data?.parentDetails?.Father?.contactNumber} </td>
                        <td>{data?.parentDetails?.Mother?.contactNumber} </td>
                        <td>{data?.parentDetails?.Guardian?.contactNumber} </td>

                      </tr>

                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            {/* Parents Details Section */}
          </div>

          <div className="row mb-4">
            {/* Certificate Details Section */}
            <div className="col-lg-6 col-md-6 col-sm-12 mb-2">
              <div className="card border rounded shadow">
                <div
                  className="card-header"
                  style={{ backgroundColor: "rgb(227 222 242 / 63%)" }}
                >
                  <strong>Certificate Details</strong>
                </div>
                <div className="card-body px-0 ">
                  <table className="table table-bordered">
                    <tbody>
                      <tr>
                        <td className="w-50">PEN No.:</td>
                        {data?.bankDetails?.panNo}
                      </tr>
                      <tr>
                        <td>Aadhar No.:</td>
                        {data?.personalDetails?.aadharNo}
                      </tr>

                      <tr>
                        <td>Caste Certificate No.:</td>
                        {data?.personalDetails?.aadharNo}
                      </tr>

                      <tr>
                        <td>Scholarship ID & Password</td>
                        {data?.scholarDetails?.scholarID + " " + data?.scholarDetails?.scholarpassword}
                      </tr>
                      <tr>
                        <td>Govt. Student ID</td>
                        {data?.scholarDetails?.govermentStudentPortalID}
                      </tr>
                      <tr>
                        <td>Govt. Family ID</td>
                        {data?.scholarDetails?.govermentFamilyPortalID}
                      </tr>

                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            {/* Certificate Details Section */}

            {/* Last School Details */}
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div className="card border rounded shadow">
                <div
                  className="card-header"
                  style={{ backgroundColor: "rgb(227 222 242 / 63%)" }}
                >
                  <strong>Last School Details</strong>
                </div>
                <div className="card-body px-0">
                  <div className="row  p-2 px-0">
                    <table className="table table-bordered">
                      <tbody>
                        <tr>
                          <td className="w-50">School Name & Address</td>
                          <td>{data?.academicDetails?.previous?.schoolName + "" + data?.academicDetails?.previous?.location} </td>
                        </tr>
                        <tr>
                          <td>roll No</td>
                          <td>{data?.academicDetails?.previous?.rollNo} </td>
                        </tr>
                        <tr>
                          <td>TC No</td>
                          <td>{data?.academicDetails?.previous?.TCno} </td>
                        </tr>
                        <tr>
                          <td>Marks</td>
                          <td>{data?.academicDetails?.previous?.marks} </td>
                        </tr>
                        <tr>
                          <td>Pass Out Year</td>
                          <td>{data?.documents?.passOutYear} </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

            </div>
            {/* Last School Details */}
          </div>
          {/* Second */}

          {/* Third */}
          <div className="row mb-4">


            {/* Enrolled Details */}
            <div className='col-lg-6 col-md-6 col-sm-12'>
              <div className="card border rounded shadow ">
                <div
                  className="card-header"
                  style={{ backgroundColor: "rgb(227 222 242 / 63%)" }}
                >
                  <strong>Enrolled Details</strong>
                </div>
                <div className="card-body px-0">
                  <div className="row  p-2 px-0">
                    <table className="table table-bordered">
                      <tbody>
                        <tr>
                          <td className="w-50">Enrolled No</td>
                          <td>{data?.enrollmentDetails?.enrollmentNO} </td>
                        </tr>
                        <tr>
                          <td>Enroment status</td>
                          <td>{data?.enrollmentDetails?.enrollmentStatus} </td>
                        </tr>
                        <tr>
                          <td>Enrolled Year</td>
                          <td>{data?.enrollmentDetails?.name} </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            {/* Enrolled Details */}
            {/* Bank Details: Details */}
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div className="card border rounded shadow">
                <div
                  className="card-header"
                  style={{ backgroundColor: "rgb(227 222 242 / 63%)" }}
                >
                  <strong>Bank Details:</strong>
                </div>
                <div className="card-body px-0">
                  <table className="table table-bordered">
                    <tbody>
                      <tr>
                        <td className="w-50">Bank Name</td>
                        <td>{data?.bankDetails?.bankName} </td>
                      </tr>
                      <tr>
                        <td>Bank Branch</td>
                        <td>{data?.bankDetails?.branchName} </td>
                      </tr>
                      <tr>
                        <td>Bank Account No</td>
                        <td>{data?.bankDetails?.accountNumber} </td>
                      </tr>
                      <tr>
                        <td>Bank IFSC</td>
                        <td>{data?.bankDetails?.ifscCode} </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

              </div>
            </div>
          </div>
          {/* Third */}
        </div>
        {/* View Details */}

        {/* Siblings */}
        <div className={`${tables === "siblings" ? "d-initial" : "d-none"}`}>
          <div className="card border rounded shadow mt-4 mb-3">
            <div
              className="card-header"
              style={{ backgroundColor: "rgb(227 222 242 / 63%)" }}
            >
              <strong>Siblings</strong>
            </div>
            <div className="card-body  px-0">
              <table className="table table-bordered border-dark">
                <thead
                  className=""
                  style={{ backgroundColor: "rgb(208 228 204 / 70%)" }}
                >
                  <tr>
                    <th>Admission No.</th>
                    <th>Student</th>
                    <th>Fees</th>
                    <th>Class</th>
                    <th>Roll No.</th>
                  </tr>
                </thead>
              </table>
            </div>
          </div>
        </div>
        {/* Siblings */}

        {/* Deleted Fees Structure */}
        <div
          className={`${tables === "feesStructure" ? "d-initial" : "d-none"}`}
        >
          <div className="card border rounded shadow mt-4 mb-3">
            <div
              className="card-header"
              style={{ backgroundColor: "rgb(227 222 242 / 63%)" }}
            >
              <strong>Deleted Fees Structure</strong>
            </div>
            <div className="card-body  px-0">
              <table className="table table-bordered border-dark">
                <thead
                  className=""
                  style={{ backgroundColor: "rgb(208 228 204 / 70%)" }}
                >
                  <tr>
                    <th>#</th>
                    <th>Structure Name</th>
                    <th>Total Fees</th>
                    <th>Head Discount</th>
                    <th>Gross Total Fees</th>
                    <th>Deleted By</th>
                    <th>Deleted Remark</th>
                    <th>Deleted At</th>
                    <th>Created At</th>
                    <th>Restore</th>
                  </tr>
                </thead>
              </table>
            </div>
          </div>
        </div>
        {/* Deleted Fees Structure */}

        {/* Subject */}
        <div className={`${tables === "subject" ? "d-initial" : "d-none"}`}>
          <div className="card border rounded shadow mt-4 mb-3">
            <div
              className="card-header"
              style={{ backgroundColor: "rgb(227 222 242 / 63%)" }}
            >
              <strong>Deleted Fees Structure</strong>
            </div>
            <div className="card-body  px-0">
              <table className="table table-bordered border-dark">
                <thead
                  className=""
                  style={{ backgroundColor: "rgb(208 228 204 / 70%)" }}
                >
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Type</th>
                  </tr>
                </thead>
              </table>
            </div>
          </div>
        </div>
        {/* Subject */}

        {/* Fees Section */}
        <div className={`${tables === "fees" ? "d-initial" : "d-none"}`}>
          {/* Fees follow ups Section */}
          <div className="col-lg-12 col-md-12 col-sm-12">
            <div className="card border rounded shadow" >
              <div
                className="card-header"
                style={{ backgroundColor: "rgb(227 222 242 / 63%)" }}
              >
                <strong>Fees Logs</strong>


              </div>
              <div className="row mb-2 mt-3 px-3">
                <div className="col-lg-9 col-md-12 col-sm-12">
                  <div className="dropdown">
                    <label htmlFor="">Show</label>
                    <button
                      className="btn btn-light border border-dark ms-2 me-2"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Choose
                    </button>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      <li>
                        <p className="dropdown-item">20</p>
                      </li>
                      <li>
                        <p className="dropdown-item">50</p>
                      </li>
                      <li>
                        <p className="dropdown-item">100</p>
                      </li>
                      <li>
                        <p className="dropdown-item">200</p>
                      </li>
                      <li>
                        <p className="dropdown-item">500</p>
                      </li>
                      <li>
                        <p className="dropdown-item">All</p>
                      </li>
                    </ul>
                    <label htmlFor="">entries</label>
                  </div>
                </div>
                <div className="col-lg-3 col-md-12 col-sm-12 px-0 mt-2">
                  <label htmlFor="">Search :</label>
                  <input type="search" className="p-1 ms-2 border-1 rounded" />
                </div>
              </div>
              <div className="card-body  px-0" style={{ overflowX: "scroll" }}>
                <table className="table table-bordered">
                  <thead
                    className="border-dark"
                    style={{ backgroundColor: "rgb(208 228 204 / 70%)" }}
                  >
                    <tr>
                      <th className="px-5 text-center">total Fee</th>
                      <th className="px-5 text-center">total No Of Installments</th>
                      <th className="px-5 text-center">Paid Fees(Current)</th>
                      <th className="px-5 text-center">installment Paid</th>
                      <th className="px-5 text-center">due Fees</th>
                      <th className="px-5 text-center">Due Date</th>
                      <th className="px-5 text-center">Pay Date</th>
                      <th className="px-5 text-center">payment Method</th>
                      <th className="px-5 text-center">payment ReferenceID</th>
                      <th className="px-5 text-center">Receipt</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>

                      <td className="px-5 text-center">{data?.feeDetails?.totalFee}</td>
                      <td className="px-5 text-center">{data?.feeDetails?.totalNoOfInstallments}</td>
                      <td className="px-5 text-center">{data?.feeDetails?.amountPaid}</td>
                      <td className="px-5 text-center">{data?.feeDetails?.installmentPaid}</td>
                      <td className="px-5 text-center">{data?.feeDetails?.dueFees}</td>
                      <td className="px-5 text-center">{data?.feeDetails?.DueDate}</td>
                      <td className="px-5 text-center">{data?.feeDetails?.PayDate}</td>
                      <td className="px-5 text-center">{data?.feeDetails?.paymentMethod}</td>
                      <td className="px-5 text-center">{data?.feeDetails?.paymentReferenceID}</td>
                      <td className="px-5 d-flex">
                        <button className="btn">
                          {" "}
                          <i
                            className="fa fa-cloud-download"
                            aria-hidden="true"
                          ></i>
                        </button>
                        <button className="btn">
                          {" "}
                          <i
                            className="fa fa-cloud-download"
                            aria-hidden="true"
                          ></i>
                        </button>
                        <button className="btn">
                          <i
                            className="fa fa-cloud-download"
                            aria-hidden="true"
                          ></i>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

            </div>
          </div>


          {/* Fees Structure Variation */}
          <div className="col-lg-12 col-md-12 col-sm-12 mt-4 mb-5">
            <div className="card border rounded shadow" style={{ overflowX: "scroll" }}>
              <div
                className="card-header"
                style={{ backgroundColor: "rgb(227 222 242 / 63%)" }}
              >
                <div className="d-flex justify-content-between">
                  <div className="my-auto">
                    <strong>Fees Structure Variations</strong>
                  </div>
                  <div>
                    <button className="btn bg-primary text-light">
                      <i className="fa fa-print" aria-hidden="true"></i>
                    </button>
                    <button className="btn bg-primary text-light ms-3">
                      <i
                        className="fa fa-cloud-download"
                        aria-hidden="true"
                      ></i>
                    </button>
                  </div>
                </div>
              </div>
              <div className="card-body  px-0">
                <table className="table table-bordered">
                  <thead
                    className=""
                    style={{ backgroundColor: "rgb(208 228 204 / 70%)" }}
                  >
                    <tr className="border-dark">
                      <th>Fees Type</th>
                      <th>Total Fees</th>
                      <th>Paid Fees</th>
                      <th>Discount</th>
                      <th>Balance Fees</th>
                      <th>Last Updated At</th>
                      <th>Created At</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>Exam Fee I (jan)</th>
                      <td>500</td>
                      <td>500</td>
                      <td>0</td>
                      <td>0</td>
                      <td>29 Nov, 2024 12:41pm</td>
                      <td>29 Nov, 2024 12:41pm</td>
                      <td></td>
                    </tr>

                    <tr>
                      <td>
                        <th>Transport Fees (apr)</th> TRANSPORT (1 - 10)
                      </td>
                      <td>700</td>
                      <td>700</td>
                      <td>0</td>
                      <td>0</td>
                      <td>29 Nov, 2024 12:41pm</td>
                      <td>29 Nov, 2024 12:41pm</td>
                      <td></td>
                    </tr>
                    <tr>
                      <th>Total</th>
                      <td>1200</td>
                      <td>1200</td>
                      <td>0</td>
                      <td>0</td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {/* Fees Structure Variation */}
          {/* Fees Section */}
        </div>

        {/* Attendence */}
        <div className={`${tables === "attendance" ? "d-initial" : "d-none"}`}>
          <div className="col-lg-12 col-md-12 col-sm-12 mt-4">
            <div className="card border rounded shadow">
              <div
                className="card-header"
                style={{ backgroundColor: "rgb(227 222 242 / 63%)" }}
              >
                <div className="d-flex justify-content-between row">
                  <div className="my-auto col-lg-9 col-md-6 col-sm-12">
                    <strong className="fs-4">Dec</strong>
                    <div className="">
                      <span className="">
                        <strong>Present :</strong> {0},{" "}
                      </span>
                      <span className="ms-2">
                        <strong>Absent :</strong> {0},{" "}
                      </span>
                      <span className="ms-2">
                        <strong>Pending :</strong> {0},{" "}
                      </span>
                      <span className="ms-2">
                        <strong>Leave :</strong> {0},{" "}
                      </span>
                    </div>
                  </div>
                  <div className="d-flex col-lg-3 col-md-6 col-sm-12">
                    <button className="btn bg-primary text-light px-2 my-3">
                      <i
                        className="fa fa-cloud-download me-2"
                        aria-hidden="true"
                      ></i>
                      Monthly
                    </button>
                    <button className="btn bg-primary text-light ms-3 px-2 my-3">
                      <i
                        className="fa fa-cloud-download me-2"
                        aria-hidden="true"
                      ></i>
                      Session
                    </button>
                    <div className="dropdown ms-3 my-auto">
                      <button
                        className="btn border-dark dropdown-toggle"
                        type="button"
                        id="dropdownMenuButton"
                        data-bs-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        Select
                      </button>
                      <div
                        className="dropdown-menu "
                        aria-labelledby="dropdownMenuButton"
                      >
                        <span className="dropdown-item">Jan</span>
                        <span className="dropdown-item">Feb</span>
                        <span className="dropdown-item">Mar</span>
                        <span className="dropdown-item">Apr</span>
                        <span className="dropdown-item">May</span>
                        <span className="dropdown-item">Jun</span>
                        <span className="dropdown-item">Jul</span>
                        <span className="dropdown-item">Aug</span>
                        <span className="dropdown-item">Sep</span>
                        <span className="dropdown-item">Oct</span>
                        <span className="dropdown-item">Nov</span>
                        <span className="dropdown-item">Dec</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-body  px-0">
                <table className="table table-bordered">
                  <thead
                    className=""
                    style={{ backgroundColor: "rgb(208 228 204 / 70%)" }}
                  >
                    <tr className="border-dark">
                      <th>Date</th>
                      <th>Day</th>
                      <th>Present</th>
                      <th>Absent</th>
                      <th>Pending</th>
                      <th>Log Time</th>
                      <th>Late</th>
                      <th>Mode</th>
                      <th>Leave/Holiday</th>
                      <th>Remark</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Sun</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Mon</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>Tue</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td>Wed</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>5</td>
                      <td>Thu</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>6</td>
                      <td>Fri</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>7</td>
                      <td>Sat</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>8</td>
                      <td>Sun</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>9</td>
                      <td>Mon</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>10</td>
                      <td>Tue</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>11</td>
                      <td>Wed</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>12</td>
                      <td>Thu</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>13</td>
                      <td>Fri</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>14</td>
                      <td>Sat</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>15</td>
                      <td>Sun</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>16</td>
                      <td>Mon</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>17</td>
                      <td>Tue</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>18</td>
                      <td>Wed</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>19</td>
                      <td>Thu</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>20</td>
                      <td>Fri</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>21</td>
                      <td>Sat</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>22</td>
                      <td>Sun</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>23</td>
                      <td>Mon</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>24</td>
                      <td>Tue</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>25</td>
                      <td>Wed</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>26</td>
                      <td>Thu</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>27</td>
                      <td>Fri</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>28</td>
                      <td>Sat</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>29</td>
                      <td>Sun</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>30</td>
                      <td>Mon</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>31</td>
                      <td>Tue</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        {/* Attendance */}

        {/* Documents */}
        <div className={`${tables === "documents" ? "d-initial" : "d-none"}`}>
          <div className="col-lg-12 col-md-12 col-sm-12 mt-4 mb-5">
            <div className="card border rounded shadow">
              <div
                className="card-header mb-5"
                style={{ backgroundColor: "rgb(227 222 242 / 63%)" }}
              >
                <div className="d-flex justify-content-between">
                  <div className="my-auto">
                    <strong className="fs-5">Documents</strong>
                    <p>You can drag and drop image (jpeg, png) or pdf files.</p>
                  </div>
                </div>
              </div>
              <div className="card-body px-0">
                <div className="row">
                  <div className="col-md-6 col-lg-3 mb-4">
                    <div className="card shadow border-2">
                      <div className="card-body text-center">
                        {data?.documents?.marksheet ? <> <img src={data?.documents?.marksheet} alt="" style={{ maxWidth: "35%", height: "auto" }} /></> :
                          <p className="text-muted mb-3">
                            Document Not Submit
                          </p>

                        }
                      </div>

                      <div
                        className="card-footer text-center"
                        style={{ backgroundColor: "#f9f1f1" }}
                      >
                        <div className="d-flex justify-content-between align-items-center">
                          <button className="btn btn-primary rounded-circle p-1">
                            <i
                              className="fa fa-cloud-download fs-4"
                              aria-hidden="true"
                              onClick={() => handleDownload(data.documents.marksheet)}
                            ></i>
                          </button>
                          <span className="fw-bold">Marksheet</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6 col-lg-3 mb-4">
                    <div className="card shadow border-2">
                      <div className="card-body text-center">
                        {data?.documents?.birthCertificate ? <> <img src={data?.documents?.birthCertificate} alt="" style={{ maxWidth: "35%", height: "auto" }} /></> :
                          <p className="text-muted mb-3">
                            Document Not Submit
                          </p>

                        }
                      </div>

                      <div
                        className="card-footer text-center"
                        style={{ backgroundColor: "#f9f1f1" }}
                      >
                        <div className="d-flex justify-content-between align-items-center">
                          <button className="btn btn-primary rounded-circle p-1">
                            <i
                              className="fa fa-cloud-download fs-4"
                              aria-hidden="true"
                              onClick={handleDownload}
                            ></i>
                          </button>
                          <span className="fw-bold">Birth Certificate</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-3 mb-4">
                    <div className="card shadow border-2">
                      <div className="card-body text-center">
                        {data?.documents?.aadharCard?.front ? <> <img src={data?.documents?.aadharCard?.front + " " + data?.documents?.aadharCard?.back} alt="" style={{ maxWidth: "35%", height: "auto" }} /></> :
                          <p className="text-muted mb-3">
                            Document Not Submit
                          </p>

                        }
                      </div>

                      <div
                        className="card-footer text-center"
                        style={{ backgroundColor: "#f9f1f1" }}
                      >
                        <div className="d-flex justify-content-between align-items-center">
                          <button className="btn btn-primary rounded-circle p-1">
                            <i
                              className="fa fa-cloud-download fs-4"
                              aria-hidden="true"
                              onClick={handleDownload}
                            ></i>
                          </button>
                          <span className="fw-bold">Aadhar</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-3 mb-4">
                    <div className="card shadow border-2">
                      <div className="card-body text-center">
                        {data?.documents?.casteCertificate ? <> <img src={data?.documents?.casteCertificate} alt="" style={{ maxWidth: "35%", height: "auto" }} /></> :
                          <p className="text-muted mb-3">
                            Document Not Submit
                          </p>

                        }
                      </div>

                      <div
                        className="card-footer text-center"
                        style={{ backgroundColor: "#f9f1f1" }}
                      >
                        <div className="d-flex justify-content-between align-items-center">
                          <button className="btn btn-primary rounded-circle p-1">
                            <i
                              className="fa fa-cloud-download fs-4"
                              aria-hidden="true"
                              onClick={handleDownload}
                            ></i>
                          </button>
                          <span className="fw-bold">Caste Certificate</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-3 mb-4">
                    <div className="card shadow border-2">
                      <div className="card-body text-center">
                        {data?.documents?.transferCertificate ? <> <img src={data?.documents?.transferCertificate} alt="" style={{ maxWidth: "35%", height: "auto" }} /></> :
                          <p className="text-muted mb-3">
                            Document Not Submit
                          </p>

                        }
                      </div>

                      <div
                        className="card-footer text-center"
                        style={{ backgroundColor: "#f9f1f1" }}
                      >
                        <div className="d-flex justify-content-between align-items-center">
                          <button className="btn btn-primary rounded-circle p-1">
                            <i
                              className="fa fa-cloud-download fs-4"
                              aria-hidden="true"
                              onClick={handleDownload}
                            ></i>
                          </button>
                          <span className="fw-bold">Transfer Certificate</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-3 mb-4">
                    <div className="card shadow border-2">
                      <div className="card-body text-center">
                        {data?.documents?.bankPassbook ? <> <img src={data?.documents?.bankPassbook} alt="" style={{ maxWidth: "35%", height: "auto" }} /></> :
                          <p className="text-muted mb-3">
                            Document Not Submit
                          </p>

                        }
                      </div>

                      <div
                        className="card-footer text-center"
                        style={{ backgroundColor: "#f9f1f1" }}
                      >
                        <div className="d-flex justify-content-between align-items-center">
                          <button className="btn btn-primary rounded-circle p-1">
                            <i
                              className="fa fa-cloud-download fs-4"
                              aria-hidden="true"
                              onClick={handleDownload}
                            ></i>
                          </button>
                          <span className="fw-bold">Bank Passbook</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-3 mb-4">
                    <div className="card shadow border-2">
                      <div className="card-body text-center">
                        {data?.documents?.PANcard?.front ? <> <img src={data?.documents?.PANcard?.front + " " + data?.documents?.PANcard?.back} alt="" style={{ maxWidth: "35%", height: "auto" }} /></> :
                          <p className="text-muted mb-3">
                            Document Not Submit
                          </p>

                        }
                      </div>

                      <div
                        className="card-footer text-center"
                        style={{ backgroundColor: "#f9f1f1" }}
                      >
                        <div className="d-flex justify-content-between align-items-center">
                          <button className="btn btn-primary rounded-circle p-1">
                            <i
                              className="fa fa-cloud-download fs-4"
                              aria-hidden="true"
                              onClick={handleDownload}
                            ></i>
                          </button>
                          <span className="fw-bold">PAN cart</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-3 mb-4">
                    <div className="card shadow border-2">
                      <div className="card-body text-center">
                        {data?.documents?.migrationCertificate ? <> <img src={data?.documents?.migrationCertificate} alt="" style={{ maxWidth: "35%", height: "auto" }} /></> :
                          <p className="text-muted mb-3">
                            Document Not Submit
                          </p>

                        }
                      </div>

                      <div
                        className="card-footer text-center"
                        style={{ backgroundColor: "#f9f1f1" }}
                      >
                        <div className="d-flex justify-content-between align-items-center">
                          <button className="btn btn-primary rounded-circle p-1">
                            <i
                              className="fa fa-cloud-download fs-4"
                              aria-hidden="true"
                              onClick={handleDownload}
                            ></i>
                          </button>
                          <span className="fw-bold">Migration Certificate</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-3 mb-4">
                    <div className="card shadow border-2">
                      <div className="card-body text-center">
                        {data?.documents?.scholarship ? <> <img src={data?.documents?.scholarship} alt="" style={{ maxWidth: "35%", height: "auto" }} /></> :
                          <p className="text-muted mb-3">
                            Document Not Submit
                          </p>

                        }
                      </div>

                      <div
                        className="card-footer text-center"
                        style={{ backgroundColor: "#f9f1f1" }}
                      >
                        <div className="d-flex justify-content-between align-items-center">
                          <button className="btn btn-primary rounded-circle p-1">
                            <i
                              className="fa fa-cloud-download fs-4"
                              aria-hidden="true"
                              onClick={handleDownload}
                            ></i>
                          </button>
                          <span className="fw-bold">Scholarship Certificate</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-3 mb-4">
                    <div className="card shadow border-2">
                      <div className="card-body text-center">
                        {data?.documents?.otherCertificate ? <> <img src={data?.documents?.otherCertificate} alt="" style={{ maxWidth: "35%", height: "auto" }} /></> :
                          <p className="text-muted mb-3">
                            Document Not Submit
                          </p>

                        }
                      </div>

                      <div
                        className="card-footer text-center"
                        style={{ backgroundColor: "#f9f1f1" }}
                      >
                        <div className="d-flex justify-content-between align-items-center">
                          <button className="btn btn-primary rounded-circle p-1">
                            <i
                              className="fa fa-cloud-download fs-4"
                              aria-hidden="true"
                              onClick={handleDownload}
                            ></i>
                          </button>
                          <span className="fw-bold">Other Certificate</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Documents */}

        {/* Activity */}
        <div className={`${tables === "activity" ? "d-initial" : "d-none"}`}>
          <div className="col-lg-12 col-md-12 col-sm-12 mt-4 mb-5">
            <div className="card border rounded shadow">
              <div
                className="card-header"
                style={{ backgroundColor: "rgb(227 222 242 / 63%)" }}
              >
                <div className="d-flex justify-content-between">
                  <div className="my-auto">
                    <strong>Activities</strong>
                  </div>
                </div>
              </div>
              <div className="card-body  px-0">
                <table className="table table-bordered">
                  <thead
                    className=""
                    style={{ backgroundColor: "rgb(208 228 204 / 70%)" }}
                  >
                    <tr className="border-dark">
                      <th>#</th>
                      <th>Date</th>
                      <th>Event</th>
                      <th>Old</th>
                      <th>New</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>15 Oct, 2024 04:41:07pm BELC CLASSES</td>
                      <td>created</td>
                      <td></td>
                      <td>
                        <tr className="border">
                          <td className="w-25">Data</td>

                          <table className="table-bordered">
                            <tbody>
                              <td>
                                <table className="table-bordered">
                                  <tbody>
                                    <tr>
                                      <td>First Name</td>
                                      <td>Ajeet</td>
                                    </tr>
                                    <tr>
                                      <td>Type</td>
                                      <td>new</td>
                                    </tr>
                                    <tr>
                                      <td>Last Name</td>
                                      <td>Singh</td>
                                    </tr>
                                    <tr>
                                      <td>Mobile</td>
                                      <td>9090902929</td>
                                    </tr>
                                    <tr>
                                      <td>Whatsapp</td>
                                      <td></td>
                                    </tr>
                                    <tr>
                                      <td>Email</td>
                                      <td></td>
                                    </tr>
                                    <tr>
                                      <td>City</td>
                                      <td></td>
                                    </tr>
                                    <tr>
                                      <td>State</td>
                                      <td></td>
                                    </tr>
                                    <tr>
                                      <td>Country</td>
                                      <td></td>
                                    </tr>
                                    <tr>
                                      <td>Whatsapp</td>
                                      <td></td>
                                    </tr>
                                    <tr>
                                      <td>Pincode</td>
                                      <td></td>
                                    </tr>
                                    <tr>
                                      <td>Address</td>
                                      <td></td>
                                    </tr>
                                    <tr>
                                      <td>Section</td>
                                      <td>A</td>
                                    </tr>
                                    <tr>
                                      <td>Username</td>
                                      <td></td>
                                    </tr>
                                    <tr>
                                      <td>Registration No</td>
                                      <td>1001</td>
                                    </tr>
                                    <tr>
                                      <td>Pen No</td>
                                      <td></td>
                                    </tr>
                                    <tr>
                                      <td>Pan No</td>
                                      <td></td>
                                    </tr>
                                    <tr>
                                      <td>Enrollment No</td>
                                      <td></td>
                                    </tr>
                                    <tr>
                                      <td>Admission No</td>
                                      <td></td>
                                    </tr>
                                    <tr>
                                      <td>Sr No</td>
                                      <td></td>
                                    </tr>
                                    <tr>
                                      <td>Admission Date</td>
                                      <td></td>
                                    </tr>
                                    <tr>
                                      <td>Roll No</td>
                                      <td></td>
                                    </tr>
                                    <tr>
                                      <td>Gender</td>
                                      <td>Male</td>
                                    </tr>
                                    <tr>
                                      <td>Blood Group</td>
                                      <td></td>
                                    </tr>
                                    <tr>
                                      <td>Height</td>
                                      <td></td>
                                    </tr>
                                    <tr>
                                      <td>Weight</td>
                                      <td></td>
                                    </tr>
                                    <tr>
                                      <td>Dob</td>
                                      <td>2000-01-01</td>
                                    </tr>
                                    <tr>
                                      <td>Mother Name</td>
                                      <td>No name</td>
                                    </tr>
                                    <tr>
                                      <td>Father Name</td>
                                      <td>Yes name</td>
                                    </tr>
                                    <tr>
                                      <td>Mother Qualification</td>
                                      <td></td>
                                    </tr>
                                    <tr>
                                      <td>Father Qualification</td>
                                      <td></td>
                                    </tr>
                                    <tr>
                                      <td>Mother Residential Address</td>
                                      <td>None</td>
                                    </tr>
                                    <tr>
                                      <td>Father Residential Address</td>
                                      <td>None</td>
                                    </tr>
                                    <tr>
                                      <td>Mother Income</td>
                                      <td></td>
                                    </tr>
                                    <tr>
                                      <td>Father Income</td>
                                      <td></td>
                                    </tr>
                                    <tr>
                                      <td>Mother Email</td>
                                      <td></td>
                                    </tr>
                                    <tr>
                                      <td>Father Email</td>
                                      <td></td>
                                    </tr>
                                    <tr>
                                      <td>Mother Mobile</td>
                                      <td>9292929992</td>
                                    </tr>
                                    <tr>
                                      <td>Father Mobile</td>
                                      <td>9292992992</td>
                                    </tr>
                                    <tr>
                                      <td>Nationality</td>
                                      <td>INDIAN</td>
                                    </tr>
                                    <tr>
                                      <td>Religion</td>
                                      <td>HINDU</td>
                                    </tr>
                                    <tr>
                                      <td>Category</td>
                                      <td>General</td>
                                    </tr>
                                    <tr>
                                      <td>Aadhar No</td>
                                      <td>1212121212</td>
                                    </tr>
                                    <tr>
                                      <td>Attended School</td>
                                      <td></td>
                                    </tr>
                                    <tr>
                                      <td>Attended Class</td>
                                      <td></td>
                                    </tr>
                                    <tr>
                                      <td>School Affiliated</td>
                                      <td></td>
                                    </tr>
                                    <tr>
                                      <td>TC No</td>
                                      <td></td>
                                    </tr>
                                    <tr>
                                      <td>TC Date</td>
                                      <td></td>
                                    </tr>
                                    <tr>
                                      <td>Caste</td>
                                      <td></td>
                                    </tr>
                                    <tr>
                                      <td>Course</td>
                                      <td></td>
                                    </tr>
                                    <tr>
                                      <td>College Location</td>
                                      <td></td>
                                    </tr>
                                    <tr>
                                      <td>Medium</td>
                                      <td>Hindi</td>
                                    </tr>
                                    <tr>
                                      <td>Employee ID</td>
                                      <td></td>
                                    </tr>
                                    <tr>
                                      <td>Domicile Application No</td>
                                      <td></td>
                                    </tr>
                                    <tr>
                                      <td>Caste Application No</td>
                                      <td></td>
                                    </tr>
                                    <tr>
                                      <td>Income Application No</td>
                                      <td></td>
                                    </tr>
                                    <tr>
                                      <td>Is Rte Student</td>
                                      <td></td>
                                    </tr>
                                    <tr>
                                      <td>Rte Application No</td>
                                      <td></td>
                                    </tr>
                                    <tr>
                                      <td>Alternate Number</td>
                                      <td></td>
                                    </tr>
                                    <tr>
                                      <td>Guardian Name</td>
                                      <td></td>
                                    </tr>
                                    <tr>
                                      <td>Guardian Qualification</td>
                                      <td></td>
                                    </tr>
                                    <tr>
                                      <td>Guardian Residential Address</td>
                                      <td></td>
                                    </tr>
                                    <tr>
                                      <td>Guardian Occupation</td>
                                      <td></td>
                                    </tr>
                                    <tr>
                                      <td>Guardian Official Address</td>
                                      <td></td>
                                    </tr>
                                    <tr>
                                      <td>Guardian Income</td>
                                      <td></td>
                                    </tr>
                                    <tr>
                                      <td>Guardian Email</td>
                                      <td></td>
                                    </tr>
                                    <tr>
                                      <td>Guardian Mobile</td>
                                      <td></td>
                                    </tr>
                                    <tr>
                                      <td>Guardian Aadhar No</td>
                                      <td></td>
                                    </tr>
                                    <tr>
                                      <td>Father Aadhar No</td>
                                      <td></td>
                                    </tr>
                                    <tr>
                                      <td>Mother Aadhar No</td>
                                      <td></td>
                                    </tr>
                                    <tr>
                                      <td>Bank Name</td>
                                      <td></td>
                                    </tr>
                                    <tr>
                                      <td>Bank Branch</td>
                                      <td></td>
                                    </tr>
                                    <tr>
                                      <td>Bank Account No</td>
                                      <td></td>
                                    </tr>
                                    <tr>
                                      <td>Bank IFSC</td>
                                      <td></td>
                                    </tr>
                                    <tr>
                                      <td>Last Session</td>
                                      <td></td>
                                    </tr>
                                    <tr>
                                      <td>Scholarship Password</td>
                                      <td></td>
                                    </tr>
                                    <tr>
                                      <td>Scholarship ID</td>
                                      <td></td>
                                    </tr>
                                    <tr>
                                      <td>Dob Application No</td>
                                      <td></td>
                                    </tr>
                                    <tr>
                                      <td>Enrolled Session</td>
                                      <td></td>
                                    </tr>
                                    <tr>
                                      <td>Enrolled Year</td>
                                      <td>2024</td>
                                    </tr>
                                    <tr>
                                      <td>Enrolled Class</td>
                                      <td>
                                        0e2051a1-93f4-4812-9bf2-00fa84b19cb5
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Dropout Date</td>
                                      <td></td>
                                    </tr>
                                    <tr>
                                      <td>Dropout Reason</td>
                                      <td></td>
                                    </tr>
                                    <tr>
                                      <td>Govt Student ID</td>
                                      <td></td>
                                    </tr>
                                    <tr>
                                      <td>Govt Family ID</td>
                                      <td></td>
                                    </tr>
                                    <tr>
                                      <td>Name</td>
                                      <td>Ajeet Singh</td>
                                    </tr>
                                    <tr>
                                      <td>Dropout</td>
                                      <td>0</td>
                                    </tr>
                                    <tr>
                                      <td>Class</td>
                                      <td>1st</td>
                                    </tr>
                                    <tr>
                                      <td>Qualifications</td>
                                      <td>0</td>
                                    </tr>
                                    <tr>
                                      <td>Classes ID</td>
                                      <td>11150</td>
                                    </tr>
                                    <tr>
                                      <td>Class Name</td>
                                      <td>1st</td>
                                    </tr>
                                    <tr>
                                      <td>Registration No Prefix</td>
                                      <td>001</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tbody>
                          </table>
                        </tr>
                        <tr>
                          <td>Phone</td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>Remark</td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>Status</td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>Session</td>
                          <td>2024 - 2025</td>
                        </tr>
                        <tr>
                          <td>Website</td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>House ID</td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>Moved By</td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>Stream ID</td>
                          <td>442</td>
                        </tr>
                        <tr>
                          <td>Created At</td>
                          <td>2024-10-15T11:11:07.000000Z</td>
                        </tr>
                        <tr>
                          <td>Deleted At</td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>Deleted By</td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>Updated At</td>
                          <td>2024-10-15T11:11:07.000000Z</td>
                        </tr>
                        <tr>
                          <td>Is Migrated</td>
                          <td>0</td>
                        </tr>
                        <tr>
                          <td>Parent Type</td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>Restored At</td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>Reference ID</td>
                          <td>404783</td>
                        </tr>
                        <tr>
                          <td>Department ID</td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>Biometric Code</td>
                          <td>0</td>
                        </tr>
                        <tr>
                          <td>Deleted Remark</td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>No of Org</td>
                          <td>0</td>
                        </tr>
                        <tr>
                          <td>Migrated From Session</td>
                          <td></td>
                        </tr>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        {/* Activity */}
      </div>
    </>
  )
}

export default StudentDetail
