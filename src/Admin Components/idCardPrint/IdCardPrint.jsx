import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import html2canvas from "html2canvas";
import { getApi } from "../../Custom Hooks/CustomeHook";
import Profile from "./profile1.jpg"

import axios from "axios";
const IdCardPrint = () => {
  const location = useLocation();
  const [studentData, setStudentData] = useState(null);
  const [staff, setStaff] = useState(null);
  const [fields,setFields] = useState({});
  console.log(studentData)
  const fetchSettings = async () => {
    try {
        const response = await axios.get("http://localhost:5500/api/student/id-card-settings");
        setFields(response.data); 
        console.log("Fetched settings:", response.data);
    } catch (error) {
        console.error("Error fetching settings:", error);
    }
};

useEffect(() => {
    fetchSettings();
}, []);
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("stuID");
  const staffid = queryParams.get("staff");
  const teacherid = queryParams.get("teacher");
  const StudentId = async () => {
    getApi(`/api/student/generate-id-card/${id}`).then((data) =>
      setStudentData(data.data)
    );
  };
  const StaffId = async () => {
    getApi(`api/staff/generate-id-card/${staffid}`).then((data) =>
      setStaff(data)
    );
  };
  const TeacherId = async () => {
    getApi(`/api/teacher/generate-id-card/${teacherid}`).then((data) =>
      setStaff(data)
    );
  };
  useEffect(() => {
    if (id) {
      StudentId();
    } else if (staffid) {
      StaffId();
    } else {
      TeacherId();
    }
  }, []);

  const downloadCard = (id) => {
    const element = document.getElementById(id);
    html2canvas(element, {
      backgroundColor: "#fff",
    }).then((canvas) => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = `${id}.png`;
      link.click();
    });
  };
  return (
    <>
         <div className="d-flex justify-content-center gap-3 flex-wrap m-5">
                      {/* ID Card (Front Side) */}
                      <div
                          className="card"
                          style={{
                              width: fields.vertical ? "2.125in" : "3.375in",
                              height: fields.vertical ? "3.375in" : "2.125in",
                              borderRadius: "10px",
                              backgroundImage: fields.bgImage ? `url(${fields.bgImage})` : "none",
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                              backgroundColor: "white",
                              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                              padding: "12px",
                          }}
                      >
                          <h6 className="text-center fw-bold">
                              Saint Paul's Convent
                          </h6>
                          <div
                              style={{
                                  display: "flex",
                                  flexDirection: fields.vertical ? "column" : "row",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                              }}
                          >
                              {fields.vertical === true && (
                                <img
                                style={{ marginBottom: "20px", width: "80px", height: "80px", borderRadius: "10%" }}
                                alt="Photo"
                                src={Profile}
                            />
                              )}
                              {fields.imageAlignment === "left" && (
                                  <img
                                      style={{ marginBottom: "20px", width: "80px", height: "80px", borderRadius: "10%", marginRight: "20px" }}
                                      alt="Photo"
                                      src={Profile}
                                  />
                              )}
                              <ul className="list-unstyled" style={{ fontSize: "10px", flex: 1 }}>
                                  {fields.name && <li><b>Name:</b> {studentData?.personalDetails?.firstName + studentData?.personalDetails?.lastName}</li>}
                                  {fields.rollNo && <li><b>Roll No:</b> {studentData?.enrollmentDetails.rollNo}</li>}
                                  {fields.motherName && <li><b>Mother's Name:</b> Jane Doe</li>}
                                  {fields.fatherName && <li><b>Father's Name:</b> Richard Doe</li>}
                                  {fields.class && <li><b>Class:</b> 10th</li>}
                                  {fields.dob && <li><b>Date of Birth:</b> 10/05/2004</li>}
                                  {fields.mobile && <li><b>Mobile No:</b> +1234567890</li>}
                              </ul>
                              {fields.imageAlignment === "right" && !fields.vertical && (
                                  <img
                                      style={{ marginBottom: "20px", width: "80px", height: "80px", borderRadius: "10%" }}
                                      alt="Photo"
                                      src={Profile}
                                  />
                              )}
                          </div>
                          <div className="row mt-2" style={{ fontSize: "10px" }}>
                              <div className="col-12 text-center">
                                  <div className="d-flex justify-content-between align-items-center">
                                      <b>Class Teacher</b>
                                      <b>Principal</b>
                                  </div>
                              </div>
                          </div>
                      </div>
      
                      {/* ID Card (Back Side) */}
                      <div
                          className="card"
                          style={{
                              width: fields.vertical ? "2.125in" : "3.375in",
                              height: fields.vertical ? "3.375in" : "2.125in",
                              borderRadius: "10px",
                              padding: "12px",
                              fontFamily: "Arial, sans-serif",
                              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                              fontSize: "10px",
                              backgroundImage: fields.bgImage ? `url(${fields.bgImage})` : "none",
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                              backgroundColor: "white",
                          }}
                      >
                          <div
                              style={{
                                  display: "flex",
                                  flexDirection: fields.vertical ? "column" : "row",
                                  alignItems: "center",
                                  justifyContent: "space-between",
                              }}
                          >
                              {fields.qrAlignment === "left" && (
                                  <div
                                      style={{
                                          width: "120px",
                                          height: "120px",
                                          backgroundColor: "#ddd",
                                          borderRadius: "4px",
                                          margin: "10px",
                                      }}
                                  ></div>
                              )}
      
                              <ul className="list-unstyled" style={{ fontSize: "10px", flex: 1 }}>
                                  {fields.department && <li><b>Department:</b> Computer Science</li>}
                                  {fields.studentId && <li><b>Student ID:</b> CS2024001</li>}
                                  {fields.year && <li><b>Year:</b> 2024-25</li>}
                                  {fields.bloodGroup && <li><b>Blood Group:</b> O+</li>}
                                  {fields.emergencyContact && <li><b>Emergency Contact:</b> +91 9876543210</li>}
                                  {fields.address && <li><b>Address:</b> 123 Main Street, City, Country</li>}
      
                                  {fields.email && <li><b>Email:</b> student@example.com</li>}
                              </ul>
      
                              {fields.qrAlignment === "right" && (
                                  <div
                                      style={{
                                          width: "100px",
                                          height: "100px",
                                          backgroundColor: "#ddd",
                                          borderRadius: "4px",
                                          margin: "10px",
                                      }}
                                  ></div>
                              )}
                          </div>
      
                          <div style={{ textAlign: "center", marginTop: "10px", fontSize: "10px" }}>
                              <p><strong>Issued by:</strong> University Name</p>
                              <p><strong>Valid Until:</strong> 2026</p>
                          </div>
                      </div>
                  </div>
    </>
  );
};

export default IdCardPrint;
