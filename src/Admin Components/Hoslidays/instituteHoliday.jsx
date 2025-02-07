import React, { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, parse, startOfWeek, getDay } from "date-fns";
import axios from "axios";
import './Holiday.css';
import enUS from "date-fns/locale/en-US";

// Localization for calendar (using date-fns)
const locales = {
  "en-US": enUS,
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const InstituteHoliday = () => {
  const [events, setEvents] = useState([]); // Calendar events
  const [selectedDate, setSelectedDate] = useState(null); // Selected date for popup
  const [holidayDetails, setHolidayDetails] = useState({
    title: "",
    description: "",
    startingDate: "",
    endingDate: "",
    status: "Holiday",
  });
  const [showPopup, setShowPopup] = useState(false);

  // Fetch holidays on mount
  useEffect(() => {
    fetchHolidays();
  }, []);

  // Fetch holidays from API
  const fetchHolidays = async () => {
    try {
      const { data } = await axios.get("/api/holidays"); // Replace with your backend API endpoint
      const formattedHolidays = data.map((holiday) => ({
        title: `${holiday.title} (${holiday.status})`,
        start: new Date(holiday.startingDate),
        end: new Date(holiday.endingDate),
        allDay: true,
        status: holiday.status,
      }));
      setEvents(formattedHolidays);
    } catch (error) {
      console.error("Error fetching holidays:", error);
    }
  };

  // Handle date click
  const handleSelectDate = (slotInfo) => {
    setSelectedDate(slotInfo.start);
    setShowPopup(true);
  };

  // Handle popup input change
  const handleChange = (e) => {
    setHolidayDetails({
      ...holidayDetails,
      [e.target.name]: e.target.value,
    });
  };

  // Submit holiday details
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newHoliday = {
        ...holidayDetails,
        startingDate: selectedDate,
        endingDate: holidayDetails.endingDate || selectedDate, // Handling both single and range date selection
      };
      await axios.post("/api/holidays", newHoliday); // Replace with your backend API endpoint
      setShowPopup(false);
      fetchHolidays(); // Refresh events
    } catch (error) {
      console.error("Error adding holiday:", error);
      alert("There was an error adding the holiday. Please try again.");
    }
  };

  // Function to assign color based on the event type (status)
  const getEventStyle = (event) => {
    let backgroundColor = '';
    switch (event.status) {
      case "Holiday":
        backgroundColor = "#4CAF50"; // Green for Holiday
        break;
      case "Event":
        backgroundColor = "#2196F3"; // Blue for Event
        break;
      case "Day-Out":
        backgroundColor = "#FF9800"; // Orange for Day-Out
        break;
      case "Half-Day":
        backgroundColor = "#FFEB3B"; // Yellow for Half-Day
        break;
      case "Celebration":
        backgroundColor = "#9C27B0"; // Purple for Celebration
        break;
      default:
        backgroundColor = "#9E9E9E"; // Grey if no type is matched
    }
    return {
      style: {
        backgroundColor,
        color: "white", // Text color for better contrast
        borderRadius: "4px",
      }
    };
  };

  return (
    <div className="holiday-calendar">
      <h1 className="text-2xl font-bold mb-4 text-center">Holiday Calendar</h1>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, margin: "50px" }}
        selectable
        onSelectSlot={handleSelectDate}
        eventPropGetter={getEventStyle} // Use eventPropGetter to apply styles
        popup
      />

      {/* Popup for adding holiday details */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2 className="text-xl font-bold">Add Holiday Details</h2>
            <form onSubmit={handleSubmit} className="holiday-form">
              <div className="form-group">
                <label>Title:</label>
                <input
                  type="text"
                  name="title"
                  value={holidayDetails.title}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Description:</label>
                <textarea
                  name="description"
                  value={holidayDetails.description}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <div className="form-group">
                <label>Status:</label>
                <select
                  name="status"
                  value={holidayDetails.status}
                  onChange={handleChange}
                >
                  <option value="Holiday">Holiday</option>
                  <option value="Event">Event</option>
                  <option value="Day-Out">Day-Out</option>
                  <option value="Half-Day">Half-Day</option>
                  <option value="Celebration">Celebration</option>
                </select>
              </div>
              <div className="form-group">
                <label>End Date:</label>
                <input
                  type="date"
                  name="endingDate"
                  value={holidayDetails.endingDate}
                  onChange={handleChange}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Save
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setShowPopup(false)}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default InstituteHoliday;
