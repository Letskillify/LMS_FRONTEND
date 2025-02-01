import React, { useState, useEffect } from "react";
import { Modal, Button, Table, Form } from "react-bootstrap";
import axios from "axios";
import { GET_ATTENDANCE_BY_COURSE_SECTION } from "../../ApiConstants/Routes";
const base_url = import.meta.env.VITE_BASE_URL;

const AttendanceModal = ({
  show,
  onHide,
  date,
  type,
  data,
  submitUrl,
  columns,
  instituteId,
  userId,
  courseId,
  sectionId,
}) => {
  const [dataToMapp, setDataToMapp] = useState([]);
  const [loading, setLoading] = useState(true);
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    setDataToMapp(data);
    setLoading(false);
  }, [data]);

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const res = await axios.get(`${GET_ATTENDANCE_BY_COURSE_SECTION}`, {
          params: {
            courseId: courseId,
            section: sectionId,
            date: date,
          },
        });

        if (res?.data) {
          const fetchedAttendanceData = res?.data?.attendees;
          console.log("fetchedAttendanceData", fetchedAttendanceData);
          setAttendanceData(fetchedAttendanceData);

          setDataToMapp((prevData) =>
            prevData.map((item) => {
              const attendanceItem = fetchedAttendanceData?.find(
                (attendee) => attendee.studentId._id === item._id
              );
              if (attendanceItem) {
                return { ...item, attendance: attendanceItem.status };
              }
              return item;
            })
          );
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching attendance data:", error);
        setLoading(false);
      }
    };

    fetchAttendanceData();
  }, [courseId, sectionId, date]);

  const handleAttendanceChange = (id, status) => {
    setDataToMapp((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, status: status } : item
      )
    );
  };

  const submitAttendance = async () => {
    try {
      const attendanceData = dataToMapp
        .filter(({ attendance }) => attendance)
        .map(({ _id, attendance }) => ({
          studentId: _id,
          status: attendance,
        }));

      if (!attendanceData.length) {
        alert("No attendance marked!");
        return;
      }

      await axios.post(`${submitUrl}`, {
        date,
        attendees: attendanceData,
        instituteId: instituteId,
        courseId: courseId,
        section: sectionId,
        markedBy: userId,
      });
      alert("Attendance saved successfully!");
      onHide();
    } catch (error) {
      console.error("Error submitting attendance", error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>
          Attendance for {type} on {date}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table striped bordered hover>
          <thead>
            <tr>
              {columns.map((col, index) => (
                <th key={index}>{col.label}</th>
              ))}
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {dataToMapp && dataToMapp.length > 0
              ? dataToMapp.map((item) => (
                  <tr key={item._id}>
                    {columns.map((col, index) => (
                      <td key={index}>{col.accessor(item)}</td>
                    ))}
                    <td>
                      <Form.Group>
                        {["Present", "Absent", "Leave"].map((status) => (
                          <Form.Check
                            key={status}
                            type="radio"
                            name={`attendance-${item._id}`}
                            label={status}
                            value={status}
                            checked={item.attendance === status}
                            onChange={() =>
                              handleAttendanceChange(item._id, status)
                            }
                          />
                        ))}
                      </Form.Group>
                    </td>
                  </tr>
                ))
              : null}
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={submitAttendance}>
          Save Attendance
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AttendanceModal;
