import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import AttendanceModal from "./attendanceModal";
import "./attendance.css";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleDateClick = (date) => {
    if (new Date(date) > new Date()) {
      alert("Cannot mark attendance for future dates.");
      return;
    }
    setSelectedDate(date);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedDate(null);
  };

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

  const renderCalendarDays = () => {
    const today = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const calendarDays = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      calendarDays.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = `${year}-${(month + 1).toString().padStart(2, "0")}-${day
        .toString()
        .padStart(2, "0")}`;
      const isFutureDate = new Date(dateString) > today;

      calendarDays.push(
        <div
          key={day}
          className={`calendar-day border p-4 text-center ${
            isFutureDate ? "disabled" : ""
          }`}
          onClick={() => !isFutureDate && handleDateClick(dateString)}
          style={{
            cursor: isFutureDate ? "not-allowed" : "pointer",
            backgroundColor: isFutureDate ? "#f8d7da" : "inherit",
          }}
        >
          {day}
        </div>
      );
    }

    return calendarDays;
  };

  return (
    <div className="calendar-container container mt-4 mb-5">
      <div className="calendar-header d-flex justify-content-between align-items-center mb-3">
        <div>
          <Button variant="outline-secondary" onClick={() => changeYear(-1)}>
            &lt;&lt; Year
          </Button>
          <Button
            variant="outline-secondary mx-2"
            onClick={() => changeMonth(-1)}
          >
            &lt; Month
          </Button>
        </div>
        <h4>
          {currentDate.toLocaleString("default", { month: "long" })}{" "}
          {currentDate.getFullYear()}
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
      {showModal && (
        <AttendanceModal
        show={showModal}
        onHide={closeModal}
        date={selectedDate}
        type="Students"
        fetchUrl="/api/student/get"
        submitUrl="/api/attendance/mark"
        columns={[
          { label: "Student Name", accessor: (item) => { return item.personalDetails.firstName + " " + item.personalDetails.lastName} },
        ]}
      />      
      )}
    </div>
  );
};

export default Calendar;
