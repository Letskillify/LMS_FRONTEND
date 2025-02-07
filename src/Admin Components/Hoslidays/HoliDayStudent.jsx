import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";

const HoliDayStudent = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [holidays, setHolidays] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedHoliday, setSelectedHoliday] = useState(null);

  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        const response = await axios.get("/api/holiday-list/get");

        const holidayData = response.data.reduce((acc, holiday) => {
          const formattedDate = new Date(holiday.startingDate)
            .toISOString()
            .split("T")[0]; // Convert to YYYY-MM-DD format

          acc[formattedDate] = holiday; // Store full holiday object
          return acc;
        }, {});

        setHolidays(holidayData);
      } catch (error) {
        console.error("Error fetching holidays:", error);
      }
    };

    fetchHolidays();
  }, []);

  const changeMonth = (direction) =>
    setCurrentDate((prev) => new Date(prev.setMonth(prev.getMonth() + direction)));

  const changeYear = (direction) =>
    setCurrentDate((prev) => new Date(prev.setFullYear(prev.getFullYear() + direction)));

  const handleDateClick = (dateString) => {
    if (holidays[dateString]) {
      setSelectedHoliday(holidays[dateString]);
      setShowModal(true);
    }
  };

  const renderCalendarDays = () => {
    const today = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const calendarDays = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      calendarDays.push(<div key={`empty-${i}`} className="calendar-day empty" />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = `${year}-${(month + 1)
        .toString()
        .padStart(2, "0")}-${day.toString().padStart(2, "0")}`;

      const isFutureDate = new Date(dateString) > today;
      const holiday = holidays[dateString];

      calendarDays.push(
        <div
          key={day}
          className={`calendar-day border p-3 text-center position-relative ${isFutureDate ? "disabled" : ""}`}
          onClick={() => !isFutureDate && handleDateClick(dateString)}
          style={{
            cursor: isFutureDate ? "not-allowed" : "pointer",
            backgroundColor: isFutureDate ? "#f8d7da" : "inherit",
            zIndex: isFutureDate ? 0 : 1,
          }}
        >
          <span style={{ fontSize: "1.2rem", fontWeight: "bold" }}>{day}</span>

          {holiday && (
            <div
              className="holiday-title"
              style={{
                fontSize: "0.8rem",
                fontWeight: "bold",
                color: "#d9534f",
                position: "absolute",
                bottom: "2px",
                width: "100%",
                textAlign: "center",
              }}
            >
              {holiday.title}
            </div>
          )}
        </div>
      );
    }

    return calendarDays;
  };

  return (
    <div className="bg-light mx-2 p-4 rounded">
      <div className="calendar-header d-flex justify-content-between align-items-center mb-3">
        <Button variant="outline-secondary" onClick={() => changeYear(-1)}>
          &lt;&lt; Year
        </Button>
        <Button variant="outline-secondary mx-2" onClick={() => changeMonth(-1)}>
          &lt; Month
        </Button>
        <h4>
          {currentDate.toLocaleString("default", { month: "long" })} {currentDate.getFullYear()}
        </h4>
        <Button variant="outline-secondary mx-2" onClick={() => changeMonth(1)}>
          Month &gt;
        </Button>
        <Button variant="outline-secondary" onClick={() => changeYear(1)}>
          Year &gt;&gt;
        </Button>
      </div>

      <div className="calendar-grid row row-cols-7 g-3">{renderCalendarDays()}</div>

      {/* Holiday Details Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Holiday Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedHoliday && (
            <>
              <p>
                <strong>Title:</strong> {selectedHoliday.title}
              </p>
              <p>
                <strong>Starting Date:</strong> {new Date(selectedHoliday.startingDate).toLocaleDateString()}
              </p>
              <p>
                <strong>Ending Date:</strong> {new Date(selectedHoliday.endingDate).toLocaleDateString()}
              </p>
              {selectedHoliday.thumbnail && (
                <div className="text-center mb-3">
                  <img
                    src={selectedHoliday.thumbnail}
                    alt="Holiday Thumbnail"
                    style={{ maxWidth: "100%", height: "auto", borderRadius: "5px" }}
                  />
                </div>
              )}
              <p>
                <strong>Description:</strong> {selectedHoliday.description || "No description available."}
              </p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default HoliDayStudent;
