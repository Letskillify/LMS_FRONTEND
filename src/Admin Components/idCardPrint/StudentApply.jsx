import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const StudentApply = () => {
  const [applicationStatus, setApplicationStatus] = useState(''); 
  const [isLoading, setIsLoading] = useState(true);
  const studentId = "679a030dd286fddf07dfd591"; 
  const navigate = useNavigate();
  useEffect(() => {
    // Fetch application status using Axios
    const fetchApplicationStatus = async () => {
      try {
        const response = await axios.get(`http://localhost:5500/api/student/get-application/${studentId}`);
        setApplicationStatus(response.data.status);  
      } catch (error) {
        console.error("Error fetching application status:", error);
        setApplicationStatus(''); 
      } finally {
        setIsLoading(false);
      }
    };

    fetchApplicationStatus();
  }, []); 


  const StuApply = async (id, reason) => {
    try {
      const response = await axios.post('/api/student/apply-for-id', {
        studentId: id,
        reason: reason
      });
      setApplicationStatus('Pending');
    } catch (error) {
      console.error("Error applying for ID card:", error);
    }
  };

  const handleApplyClick = () => {
    const reason = 'New Enrollment'; 
    StuApply(studentId, reason);
  };

  const handleShowID = (studentId) => {
    navigate(`/id-card-print?stuID=${studentId}`);
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-6 col-lg-4">
          <div className="card shadow-lg p-4">
            <div className="card-body text-center">
              <h5 className="card-title">John Doe</h5>
              <p className="card-text">
                New student enrolled in the Computer Science program. Passionate about learning and technology!
              </p>

              {isLoading ? (
                <p>Loading...</p>
              ) : applicationStatus === 'Approved' ? (
                <button className="btn btn-success" onClick={()=>handleShowID(studentId)}>
                  Show ID
                </button>
              ) : applicationStatus === 'Pending' ? (
                <button className="btn btn-warning " disabled>
                  Pending
                </button>
              ) : applicationStatus === 'Rejected' ? (
                <button className="btn btn-danger " disabled>
                  Rejected
                </button>
              ):(
                <div>
                  <button
                    className="btn btn-primary"
                    onClick={handleApplyClick}
                  >
                    Apply for ID Card
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentApply;
