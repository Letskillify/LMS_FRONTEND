import React, { useEffect, useState } from "react";
import { getApi } from "../../Custom Hooks/CustomeHook";
import { useNavigate } from "react-router-dom";

function StaffIdCard() {
  const [Staff, setStaff] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filters, setFilters] = useState({
    class: "10",
    section: "A",
    type: "Generated",
    staffType: "Teaching",
  });
  const navigate = useNavigate();
  const handleGenerateIDCard = (staffId) => {
    if(filters.staffType === "Teaching"){
      navigate(`/id-card-print?teacher=${staffId}`);
    }
    else{
      navigate(`/id-card-print?staff=${staffId}`);
    }
  };

  const Staffdata = async () => {
    getApi(`/api/teacher/get-all`).then((data) => {
      setStaff(data);
    });
  };
  const NonTeaching = async () => {   
    getApi(`/api/staff/get-all`).then((data) => {
      setStaff(data); 
    });
  };
console.log(Staff)

useEffect(() => {
  if (filters.staffType === "Teaching") {
    Staffdata();
  } else {
    NonTeaching();
  }
}, [filters.staffType]); 
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    console.log()
    setFilters((prev) => ({ ...prev, [name]: value }));
  };
  const HandleFilter = () => {
    const filteredData = Staff.filter((staff) => {
      const staffRole = staff?.employeementDetails?.role;
      const classTeacher = staff?.classTeacher?.ofClass || ""; 
      const isIDGenerated = staff?.isIDgenerated ? "Generated" : "Non-Generated"; 
    
      if (filters.staffType === "Teaching") {
        return (
          staffRole === "Teacher" &&
          (filters.class === "" || classTeacher === `${filters.class}th Grade`) &&
          (filters.type === "" || filters.type === isIDGenerated)
        );
      }
    
      if (filters.staffType === "Non-Teaching") {
        return (
          staffRole !== "Teacher" &&
          (filters.type === "" || filters.type === isIDGenerated)
        );
      }
  
      return true;
    });
    setFiltered(filteredData); 
  };

  return (
    <>
      <div>
        <div>
          <div style={{ margin: "10px" }}>
            <div className="card">
              <div className="d-flex justify-content-between text-center">
                <div className="container-fluid container-p-y">
                  <h5 className="card-header">Staff ID Card</h5>

                  <div className="d-flex justify-content-between m-4">
                    {/* Campus Dropdown */}
                    <div>
                      <label htmlFor="campus">Campus</label>
                      <br />
                      <select
                        name="campus"
                        id="campus"
                        className="py-2 pe-5 form-select"
                        value={filters.campus}
                        onChange={handleFilterChange}
                      >
                        <option value="Main Campus">Main Campus</option>
                        <option value="Second Campus">Second Campus</option>
                        <option value="both">Both</option>
                      </select>
                    </div>

                    {/* Class Dropdown */}
                    <div>
                      <label htmlFor="class">Class</label>
                      <br />
                      <select
                        name="class"
                        id="class"
                        className="py-2 pe-5 form-select"
                        value={filters.class}
                        onChange={handleFilterChange}
                      >
                        <option value="">Select Class</option>
                        {Array.from({ length: 12 }, (_, i) => (
                          <option key={i + 1} value={i + 1}>
                            {i + 1 === 1
                              ? "Nursery"
                              : i + 1 === 2
                              ? "LKG"
                              : i + 1 === 3
                              ? "UKG"
                              : `${i + 1}th`}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Section Dropdown */}
                    <div>
                      <label htmlFor="section">Section</label>
                      <br />
                      <select
                        name="section"
                        id="section"
                        className="py-2 pe-5 form-select"
                        value={filters.section}
                        onChange={handleFilterChange}
                      >
                        <option value="">Select Section</option>
                        {["A", "B", "C", "D", "E", "F"].map((section) => (
                          <option key={section} value={section}>
                            {section}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Type Dropdown */}
                    <div>
                      <label htmlFor="type">Type</label>
                      <br />
                      <select
                        name="type"
                        id="type"
                        className="py-2 pe-5 form-select"
                        value={filters.type}
                        onChange={handleFilterChange}
                      >
                        <option value="Non-Generated">Non-Generated</option>
                        <option value="Generated">Generated</option>
                      </select>
                    </div>

                    {/* Staff Dropdown */}
                    <div>
                      <label htmlFor="staffType">Staff</label>
                      <br />
                      <select
                        name="staffType"
                        id="staffType"
                        className="py-2 pe-5 form-select"
                        value={filters.staffType}
                        onChange={handleFilterChange}
                      >
                        <option value="Teaching">Teaching</option>
                        <option value="Non-Teaching">Non-Teaching</option>
                      </select>
                    </div>

                    {/* Filter Button */}
                    <div className="align-self-end">
                      <button className="btn btn-success mt-3" onClick={HandleFilter}>
                        Filter Data
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Table */}
              <div className="table-responsive text-nowrap">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Photo</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Experience</th>
                      <th>Department</th>
                      <th>Email</th>
                      <th>Highest Degree</th>
                      <th>Father Name</th>
                      <th>Created At</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((staff, index) => (
                      <tr key={index}>
                        <td>{staff.StaffID}</td>
                        <td>
                          {/* <img
                            src={staff.documents.profilePhoto}
                            alt="Avatar"
                            className="rounded-circle border border-light"
                            style={{ height: "50px", width: "50px" }}
                          /> */}
                        </td>
                        <td>{staff.fullName.firstName}</td>
                        <td>{staff.fullName.lastName}</td>
                        <td>{staff.qualifications.experience}</td>
                        <td>{staff.employeementDetails.department}</td>
                        <td>{staff.contactInfo.email}</td>
                        <td>{staff.qualifications.highestDegree}</td>
                        <td>{staff.personalDetails.fatherName}</td>
                        <td>{new Date(staff.updatedAt).toLocaleDateString()}</td>
                        <td>
                          <button
                            className="btn btn-success"
                            onClick={() => handleGenerateIDCard(staff._id)}
                          >
                            Generate ID Card
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default StaffIdCard;
