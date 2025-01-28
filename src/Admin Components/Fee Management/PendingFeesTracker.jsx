import axios from 'axios';
import React, { useEffect, useState } from 'react';
// import { Textarea } from 'vite';

const PendingFeesTracker = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [studentsDatareminder, setStudentsDatareminder] = useState([]);

  const handleSendReminder = (student) => {
    setSelectedStudent(student);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedStudent(null);
  };


  useEffect(() => {
    axios.get('api/fees/get').then(res => setStudentsDatareminder(res.data)).catch(err => console.log(err));
  }, []);

  console.log(studentsDatareminder);

  const handleSendRemindermsg = (student) => {
    try {
      const response = axios.post('http://localhost:5500/api/fees/reminder', student, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(response.data);
      alert('Reminder sent successfully!');
    } catch (error) {
      console.error('Error sending reminder:', error);
      alert('Failed to send reminder. Please try again.');
    }
    console.log(student, 'student');
    
  };

  return (


    <div className="tracker-container">
      <h3 className="pending-fees-title text-center m-4 rounded fw-bold border p-3">Pending Fees Tracker</h3>
      <table className="pending-fees-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Class</th>
            <th>Amount Due</th>
            <th>Due Date</th>
            <th>Days Overdue</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {studentsDatareminder?.map((student, index) => (
            <tr key={index}>
              <td>{student?.studentId?.personalDetails?.firstName + ' ' + student?.studentId?.personalDetails?.lastName}</td>
              <td>{student?.studentId?.enrollmentDetails?.courseStream}</td>
              <td>&#8377;{student?.amountDue}</td>
              <td>{student?.dueDate ? new Date(student?.dueDate).toLocaleDateString() : ''}</td>
              <td>
                {(() => {
                  if (!student?.dueDate) return "N/A";

                  const dueDate = new Date(student?.dueDate);
                  const currentDate = new Date();
                  const diffInMs = currentDate - dueDate;
                  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

                  return diffInDays > 0 ? diffInDays : 0;
                })()} Days
              </td>

              <td>

                <button
                  className="action-button send-reminder-button"
                  onClick={() => handleSendReminder(student)}
                >
                  Send Reminder
                </button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showPopup && (
        <div className="popup-container">
          <div className="popup-content">
            <h2 className="popup-title">Send Reminder</h2>
            <div className="section">

              <div className="info-grid">
                <div>
                  <span>Name</span>
                  <strong>{selectedStudent?.studentId?.personalDetails?.firstName + ' ' + selectedStudent?.studentId?.personalDetails?.lastName}</strong>
                </div>
                <div>
                  <span>Class</span>
                  <strong>{selectedStudent?.studentId?.enrollmentDetails?.courseStream} </strong>
                </div>
                <div>
                  <span>Due Amount</span>
                  <strong>{selectedStudent?.amountDue}</strong>
                </div>

                <div>
                  <span>Due Date</span>
                  <strong>{selectedStudent?.dueDate ? new Date(selectedStudent?.dueDate).toLocaleDateString() : ''}</strong>
                </div>
                <div>
                  <span>Paynalty</span>
                  <strong>{selectedStudent?.paynalty}</strong>
                </div>
                <div>
                  <span>day Over due</span>
                  <strong>
                    {(() => {
                      if (!selectedStudent?.dueDate) return "N/A";

                      const dueDate = new Date(selectedStudent?.dueDate);
                      const currentDate = new Date();
                      const diffInMs = currentDate - dueDate;
                      const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

                      return diffInDays > 0 ? diffInDays : 0;
                    })()} Days
                  </strong>
                </div>
              </div>
              <label className='mt-4'>
                <textarea name="" rows={4} cols={40} />

              </label>
            </div>
            <div className="popup-actions ">
              <button className="popup-button confirm-button me-2" onClick={closePopup} >
                Confirm
              </button>
              <button className="popup-button cancel-button" onClick={closePopup}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingFeesTracker;
