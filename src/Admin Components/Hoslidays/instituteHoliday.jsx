import React, { useState, useEffect, useContext } from "react";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import { MainContext } from "../../Controller/MainProvider";

function InstituteHoliday() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [holidays, setHolidays] = useState([]);
  const { userId } = useContext(MainContext)
  useEffect(() => {
    if (userId) {
      axios
        .get(`/api/institute-holiday/get/institute/${userId}`)
        .then((res) => {
          setHolidays(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [userId]);

  console.log("Holidays", holidays);

  const changeMonth = (direction) => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  const changeYear = (direction) => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setFullYear(prev.getFullYear() + direction);
      return newDate;
    });
  };

  const handleDateClick = (dateString) => {
    setSelectedDate(dateString);
    setShowModal(true);
  };

  const renderCalendarDays = () => {
    const today = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const calendarDays = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      calendarDays.push(
        <div key={`empty-${i}`} className="calendar-day empty"></div>
      );
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = `${year}-${(month + 1)
        .toString()
        .padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
      const isFutureDate = new Date(dateString) > today;
      const holidayTitle = holidays.find((h) => h.startingDate === dateString);

      calendarDays.push(
        <div
          key={day}
          className={`calendar-day border p-4 text-center position-relative ${isFutureDate ? "disabled" : ""}`}
          onClick={() => !isFutureDate && handleDateClick(dateString)}
          style={{
            cursor: isFutureDate ? "not-allowed" : "pointer",
            backgroundColor: isFutureDate ? "#f8d7da" : "inherit",
            zIndex: isFutureDate ? 0 : 1,
          }}
        >
          {day}
          {holidayTitle && (
            <div
              className="holiday-title"
              style={{
                fontSize: "0.8rem",
                fontWeight: "bold",
                color: "#d9534f",
                position: "absolute",
                top: "2px",
                width: "100%",
                textAlign: "center",
              }}
            >
              {holidayTitle.title}
            </div>
          )}
        </div>
      );
    }

    return calendarDays;
  };

  return (
    <div className="bg-light mx-2 p-4 rounded">
      <Button variant="outline-secondary" onClick={() => setShow(true)}>
        +
      </Button>
      <div className="calendar-header d-flex justify-content-between align-items-center mb-3">
        <div>
          <Button variant="outline-secondary" onClick={() => changeYear(-1)}>
            &lt;&lt; Year
          </Button>
          <Button variant="outline-secondary mx-2" onClick={() => changeMonth(-1)}>
            &lt; Month
          </Button>
        </div>
        <h4>
          {currentDate.toLocaleString("default", { month: "long" })} {currentDate.getFullYear()}
        </h4>
        <div>
          <Button variant="outline-secondary mx-2" onClick={() => changeMonth(1)}>
            Month &gt;
          </Button>
          <Button variant="outline-secondary" onClick={() => changeYear(1)}>
            Year &gt;&gt;
          </Button>
        </div>
      </div>
      <div className="calendar-grid row row-cols-7 g-3">{renderCalendarDays()}</div>

      <div className="d-flex justify-content-between align-items-center mt-3">
        <Link to="/admin/holidays">
          <Button variant="outline-secondary">View All Holidays</Button>
        </Link>
      </div>

      {/* Modal for Holiday Details */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Holiday Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <strong>Date:</strong> {selectedDate}
          </p>
          <p>
            <strong>Holiday:</strong>{" "}
            {holidays.find((h) => h.startingDate === selectedDate)
              ? holidays.find((h) => h.startingDate === selectedDate).title
              : "No holiday on this day"}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>


      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Holiday List</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            {holidays.map((holiday) => (
              <li key={holiday._id}>
                <strong>Date:</strong> {holiday.startingDate}
                <br />
                <strong>Title:</strong> {holiday.title}
                <br />
                <strong>Description:</strong> {holiday.description}
                <br />
                <strong>Updated By:</strong> {holiday.updatedBy}
              </li>
            ))}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>



    </div>
  );
}

export default InstituteHoliday;

