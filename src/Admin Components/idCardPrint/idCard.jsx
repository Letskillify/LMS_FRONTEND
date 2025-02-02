import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainContext } from "../../Controller/MainProvider";


function IdCard() {
  const { studentData } = useContext(MainContext);
  console.log(studentData)
  const [filtered, setFiltered] = useState(studentData);
  const [filters, setFilters] = useState({
    class: "",
    section: "",
    type: "",
  });

  const navigate = useNavigate();

  // Handle Filter Change
  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  // Handle ID Card Generation
  const handleGenerateIDCard = (stuID) => {
    navigate(`/id-card-print?stuID=${stuID}`);
  };

  // Apply Filters
  const HandleFilter = () => {
    const filteredData = studentData.filter((stu) => {
      const isIDGenerated = stu?.isIDgenerated ? "Generated" : "Non-Generated";

      return (
        (filters.class === "" || stu.enrollmentDetails.class.className.includes(filters.class) === true) &&
        (filters.section === "" || stu.enrollmentDetails.class.className.includes(filters.section) === true) &&
        (filters.type === "" || filters.type === isIDGenerated)
      );
    });

    setFiltered(filteredData);
  };

  return (
    <>
      <div style={{ margin: "25px" }}>
        <div className="card">
          <div className="d-flex justify-content-between text-center">
            <div className="container-fluid container-p-y">
              <h5 className="card-header">Student ID Card</h5>

              <div className="d-flex justify-content-between m-4">
                {/* Class Filter */}
                <div>
                  <label htmlFor="class">Class</label>
                  <br />
                  <select
                    name="class"
                    id="class"
                    className="py-2 pe-5 form-select"
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

                {/* Section Filter */}
                <div>
                  <label htmlFor="section">Section</label>
                  <br />
                  <select
                    name="section"
                    id="section"
                    className="py-2 pe-5 form-select"
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

                {/* Type Filter */}
                <div>
                  <label htmlFor="type">Type</label>
                  <br />
                  <select
                    name="type"
                    id="type"
                    className="py-2 pe-5 form-select"
                    onChange={handleFilterChange}
                  >
                    <option value="">Select Type</option>
                    <option value="Generated">Generated</option>
                    <option value="Non-Generated">Non-Generated</option>
                  </select>
                </div>

                {/* Filter Button */}
                <div className="align-self-end" >
                  <button className="bg-themprimary"
                    style={{ padding: "10px", color: "white" }} onClick={HandleFilter}>
                    Filter Data
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Table */}
          {filtered.length > 0 ? (
            <div className="table-responsive text-nowrap">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Photo</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Class</th>
                    <th>Email</th>
                    <th>Roll Number</th>
                    <th>Father Name</th>
                    <th>Created At</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((student, index) => (
                    <tr key={index}>
                      <td>{student.StuID}</td>
                      <td>
                        <img
                          src={student.documents.profilePhoto}
                          alt="Avatar"
                          className="rounded-circle border border-light"
                          style={{ height: "50px", width: "50px" }}
                        />
                      </td>
                      <td>{student.personalDetails.firstName}</td>
                      <td>{student.personalDetails.lastName}</td>
                      <td>{student.enrollmentDetails.class.className}</td>
                      <td>{student.contactInfo.email}</td>
                      <td>{student.enrollmentDetails.rollNo}</td>
                      <td>{student.parentDetails.Father.name}</td>
                      <td>{new Date(student.updatedAt).toLocaleDateString()}</td>
                      <td>
                        <button
                          className="bg-themprimary"
                          style={{ padding: "10px", color: "white" }}
                          onClick={() => handleGenerateIDCard(student._id)}
                        >
                          Generate ID Card
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center">No students found matching the filter.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default IdCard;
