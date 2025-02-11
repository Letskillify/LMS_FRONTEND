import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { getApi } from '../../Custom Hooks/CustomeHook'; // Custom hook for GET request
import axios from 'axios';

const Applications = () => {
  const [applications, setApplications] = useState([]);

  // Fetch all applications when the component is mounted
  const AllApplication = async () => {
    const res = await getApi("/api/student/get-application");
    setApplications(res.applications.filter(application => application.status === 'Pending')); // Only show pending applications
  };

  const handleApprove = async (id) => {
    try {
      const response = await axios.put('http://localhost:5500/api/student/approve-application', { studentId: id });
      if (response.status === 200) {
        console.log(`Student with ID ${id} approved`);
        AllApplication();
      }
    } catch (error) {
      console.error("Error approving application:", error);
    }
  };

  // Reject application
  const handleReject = async (id) => {
    try {
      const response = await axios.put('http://localhost:5500/api/student/reject-application', { studentId: id });
      if (response.status === 200) {
        console.log(`Student with ID ${id} rejected`);
        // Refresh the list of applications
        AllApplication();
      }
    } catch (error) {
      console.error("Error rejecting application:", error);
    }
  };
console.log(applications)
  useEffect(() => {
    AllApplication();
  }, []);

  return (
    <div className="container mt-3">
      <h3>Student Details</h3>
      <Table striped bordered hover responsive className="w-100">
        <thead>
          <tr>
            <th>ID</th>
            <th>Roll No</th>
            <th>Name</th>
            <th>Class</th>
            <th>Date</th>
            <th>Reason</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.map(student => (
            <tr key={student.student.StuID}>
              <td>{student.student.StuID}</td>
              <td>{student.student.enrollmentDetails.rollNo}</td>
              <td>{student.student.personalDetails.firstName + " " + student.student.personalDetails.lastName}</td>
              <td>{student.student.enrollmentDetails.class}</td>
              <td>{student.applicationDate}</td>
              <td>{student.reason}</td>
              <td>
                <Button variant="success" onClick={() => handleApprove(student.studentId)} className="mr-4">
                  Approve
                </Button>
                <Button variant="danger" onClick={() => handleReject(student.studentId)} className="mr-2">
                  Reject
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Applications;
