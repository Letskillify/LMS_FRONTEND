import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Form, Modal } from "react-bootstrap";

const HolidayModule = () => {
  const [holidays, setHolidays] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newHoliday, setNewHoliday] = useState({
    date: "",
    title: "",
    description: "",
    sessionYear: "",
  });

  useEffect(() => {
    fetchHolidays();
  }, []);

  const fetchHolidays = async () => {
    try {
      const response = await axios.get("/api/holidays");
      setHolidays(response.data);
    } catch (error) {
      console.error("Error fetching holidays", error);
    }
  };

  const handleInputChange = (e) => {
    setNewHoliday({ ...newHoliday, [e.target.name]: e.target.value });
  };

  const addHoliday = async () => {
    try {
      const response = await axios.post("/api/holidays", newHoliday);
      setHolidays([...holidays, response.data]);
      setShowModal(false);
      setNewHoliday({ date: "", title: "", description: "", sessionYear: "" });
    } catch (error) {
      console.error("Error adding holiday", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Holiday List</h2>
      <Button onClick={() => setShowModal(true)}>Add Holiday</Button>

      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Date</th>
            <th>Title</th>
            <th>Description</th>
            <th>Session Year</th>
          </tr>
        </thead>
        <tbody>
          {holidays.map((holiday) => (
            <tr key={holiday._id}>
              <td>{new Date(holiday.date).toLocaleDateString()}</td>
              <td>{holiday.title}</td>
              <td>{holiday.description}</td>
              <td>{holiday.sessionYear}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Add Holiday Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Holiday</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Date</Form.Label>
              <Form.Control type="date" name="date" value={newHoliday.date} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" name="title" value={newHoliday.title} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" name="description" value={newHoliday.description} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Session Year</Form.Label>
              <Form.Control type="text" name="sessionYear" value={newHoliday.sessionYear} onChange={handleInputChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
          <Button variant="primary" onClick={addHoliday}>Add Holiday</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default HolidayModule;
