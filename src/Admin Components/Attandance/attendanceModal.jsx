import React, { useState, useEffect } from "react";
import { Modal, Button, Table, Form, Row, Col } from "react-bootstrap";
import axios from "axios";
const base_url = import.meta.env.VITE_BASE_URL;

const AttendanceModal = ({
  show,
  onHide,
  date,
  type,
  fetchUrl,
  submitUrl,
  columns,
  filters,
}) => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filterValues, setFilterValues] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${base_url}${fetchUrl}`, {
          params: { date },
        });
        setData(response.data.map((item) => ({ ...item, attendance: "" })));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, [fetchUrl, date]);

  useEffect(() => {
    applyFilters();
  }, [filterValues, data]);

  const applyFilters = () => {
    let filtered = [...data];
    Object.keys(filterValues).forEach((key) => {
      if (filterValues[key]) {
        filtered = filtered.filter((item) =>
          filters[key].accessor(item).includes(filterValues[key])
        );
      }
    });
    setFilteredData(filtered);
  };

  const handleFilterChange = (key, value) => {
    setFilterValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleAttendanceChange = (id, status) => {
    setData((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, attendance: status } : item
      )
    );
  };

  const submitAttendance = async () => {
    try {
      const attendanceData = data
        .filter(({ attendance }) => attendance)
        .map(({ _id, attendance }) => ({
          id: _id,
          status: attendance,
          date: date,
        }));

      if (!attendanceData.length) {
        alert("No attendance marked!");
        return;
      }

      //   const courseId = data[0]?.courseDetails?._id;
      //   const section = data[0]?.section?._id;
      //   const subjectId = data[0]?.subjectDetails?._id;

      //   const payload = {
      //     instituteId: instituteId,
      //     courseId: courseId,
      //     section: section,
      //     subjectId: subjectId,
      //     attendees: attendanceData,
      //     date: date,
      //   };

      await axios.post(`${base_url}${submitUrl}`, {
        date,
        attendees: attendanceData,
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
            {filteredData.map((item) => (
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
            ))}
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
