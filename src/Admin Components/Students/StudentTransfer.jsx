import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { MainContext } from "../../Controller/MainProvider";
const StudentTransfer = () => {
  const [Data, setData] = useState({});
  const { Student, userId } = useContext(MainContext);
  const [tcData, setTcData] = useState({});
  const [tcDataGet, setTcDataGet] = useState([]);

  const getData = async () => {
    const response = await axios
      .get(`/api/tc-request/get/institute/${userId}`)
      .then((res) => {
        if (res.status === 200) {
          setTcData(res.data);
          console.log("Transfer Certificate Data:", tcData);
        } else {
          console.log(res);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="main-wrapper container mt-4">
        {/* Page Wrapper */}
        <div className="page-wrapper">
          <div className="content content-two">
            {/* Page Header */}
            <div className="d-md-flex d-block align-items-center justify-content-between mb-3">
              <div className="my-auto mb-2">
                <nav>
                  <ol className="breadcrumb mb-0">
                    <li className="breadcrumb-item">
                      <Link to="/">Dashboard</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Transfer Certificate
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
            {/* /Page Header */}

            {/* Second Header */}
            <div className="bg-white p-3 border rounded-1 d-flex align-items-center justify-content-between flex-wrap mb-4 pb-0 shadow-sm">
              <h4 className="mb-3 fw-bold fs-5">Transfer Certificate</h4>
              <div className="d-flex align-items-center flex-wrap">
                <div className="dropdown mb-3 me-2">
                  <a
                    className="btn text-dark border border-2 bg-white"
                    data-bs-toggle="dropdown"
                    data-bs-auto-close="outside"
                  >
                    <i className="fa fa-filter me-2" />
                    Filter
                  </a>
                  <div className="dropdown-menu  shadow">
                    <form>
                      <div className="d-flex align-items-center border-bottom p-2 pb-0">
                        <h4>Filter</h4>
                      </div>
                      <div className="p-2 pb-0 border-bottom">
                        <div className="row align-items-center">
                          <div className=" col-lg-12 col-md-12">
                            <div className="mb-3">
                              <label className="form-label">Name</label>
                              <input
                                type="search"
                                placeholder="Search Name"
                                className="w-100 p-2 border rounded"
                                // onChange={(e) => setFind(e.target.value)}
                              />
                            </div>
                            <div className="mb-3">
                              <label className="form-label">Roll No.</label>
                              <input
                                type="search"
                                placeholder="Search Roll No."
                                className="w-100 p-2 border rounded"
                                // onChange={(e) => setFind(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="p-3 d-flex align-items-center justify-content-end">
                        <button
                          className="btn btn-secondary me-2"
                          // onClick={resetFilters}
                        >
                          Reset
                        </button>
                        <button
                          className="btn btn-primary"
                          // onClick={applyFilter}
                        >
                          Apply
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            {/* Second Header */}

            {/* Student List */}
            <div className="card-body p-0 py-3">
              <div className="custom-datatable-filter table-responsive border-0">
                <table className="table datatable text-center">
                  <thead>
                    <tr>
                      <th className="fw-bold">Roll No.</th>
                      <th className="fw-bold">Name</th>
                      <th className="fw-bold">Class</th>
                      <th className="fw-bold">Section</th>
                      <th className="fw-bold">Gender</th>
                      <th className="fw-bold">Reason</th>
                      <th className="fw-bold">Action</th>
                    </tr>
                  </thead>
                  {/* {tcData?.map((studentData, index) => {
                    <tbody className="border-0">
                      <tr>
                        <td className="fw-bold">
                          {studentData?.academicDetails.previous.rollNo}
                        </td>
                        <td>{studentData?.personalDetails?.firstName}</td>
                        <td>{studentData?.academicDetails?.previous?.class}</td>
                        <td>
                          {studentData?.academicDetails?.previous?.section}
                        </td>
                        <td>{studentData?.personalDetails?.gender}</td>
                        <td>{studentData?.reson}</td>
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
                                    className="dropdown-item btn-warning rounded-1 bg-purple-200 text-purple-600 fw-bold hover:bg-purple-500 hover:text-purple-50"
                                    data-bs-toggle="modal"
                                    data-bs-target="#view_hostel"
                                    // onClick={() => setSelectedHostel(hostel)}
                                  >
                                    <i
                                      className="fa fa-eye me-2"
                                      aria-hidden="true"
                                    ></i>
                                    View Details
                                  </button>
                                </li>
                                <li>
                                  <button
                                    className="dropdown-item btn-success rounded-1 bg-orange-200 text-orange-600 mt-2 fw-bold  hover:bg-orange-500 hover:text-orange-50"
                                    data-bs-toggle="modal"
                                    data-bs-target={``}
                                    // onClick={() => setSelectedId(hostel?._id)}
                                    type="button"
                                  >
                                    <i
                                      className="fa fa-pencil-square me-2"
                                      aria-hidden="true"
                                    ></i>
                                    Approve
                                  </button>
                                </li>
                                <li>
                                  <button
                                    className="dropdown-item btn-danger rounded-1 bg-red-200 text-red-600 mt-2 fw-bold  hover:bg-red-500 hover:text-red-50"
                                    data-bs-toggle="modal"
                                    data-bs-target="#delete-modal"
                                    // onClick={() => setSelectedId(hostel?._id)}
                                  >
                                    <i
                                      className="fa fa-trash me-2"
                                      aria-hidden="true"
                                    ></i>
                                    Reject
                                  </button>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>;
                  })} */}
                </table>
              </div>
            </div>
            {/* Student List */}
          </div>
        </div>
        {/* /Page Wrapper */}
      </div>{" "}
    </>
  );
};

export default StudentTransfer;
