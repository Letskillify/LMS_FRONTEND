import React, { useState, useEffect, useContext } from "react";
import { Modal, Button, Form, Row, Col, Table } from "react-bootstrap";
import AttendanceModal from "./attendanceModal";
import axios from "axios";
import "./attendance.css";
import { GET_STUDENTS, GET_STUDENTS_BY_COURSE_AND_SECTION, GET_TEACHERS, MARK_ATTENDANCE } from "../../ApiConstants/Routes";
import { getCommonCredentials } from "../../GlobalHelper/CommonCredentials";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [filters, setFilters] = useState({
    course: "",
    section: "",
  });
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [coursesOptions, setCoursesOptions] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [sectionsOptions, setSectionsOptions] = useState([]);

  const { InstituteId } = getCommonCredentials();

  useEffect(() => {
    if (!InstituteId) return;
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          `/api/courses/get/institute/${InstituteId}`
        );
        // setFilters((prev) => ({ ...prev, course: response.data }));
        setCoursesOptions(response?.data);
        // setSectionsOptions(response?.data?.section);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    const fetchSections = async () => {
      try {
        const response = await axios.get(
          `/api/section/get/institute/${InstituteId}`
        );
        // setSectionsOptions(response?.data);
      } catch (error) {
        console.error("Error fetching sections:", error);
      }
    };

    fetchCourses();
    fetchSections();

    return () => {
      setStudents([]);
    };
  }, [InstituteId]);

  const handleFilterChange = (key, value) => {
    console.log("key", key, "value", value);
    setFilters((prev) => ({ ...prev, [key]: value._id }));

    if (key === "section") {
      setSelectedSection(value);
    }

    if (key === "course") {
      setSelectedCourse(value);
      setSectionsOptions(value.section);
      console.log("kfhjdskjfgdsjhgfuygdsuygf");
    }
  };

  const applyFilters = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        GET_STUDENTS_BY_COURSE_AND_SECTION,
        {
          params: {
            courseId: selectedCourse?._id,
            sectionId: selectedSection?._id,
            instituteId: InstituteId,
          },
        }
      );
      setStudents(response?.data);
      setShowCalendar(true);
    } catch (error) {
      console.error("Error fetching students:", error);
      alert("Failed to fetch students. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
      calendarDays.push(
        <div key={`empty-${i}`} className="calendar-day empty"></div>
      );
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = `${year}-${(month + 1)
        .toString()
        .padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
      const isFutureDate = new Date(dateString) > today;

      calendarDays.push(
        <div
          key={day}
          className={`calendar-day border p-4 text-center ${isFutureDate ? "disabled" : ""
            }`}
          onClick={() => !isFutureDate && handleDateClick(dateString)}
          style={{
            cursor: isFutureDate ? "not-allowed" : "pointer",
            backgroundColor: isFutureDate ? "#f8d7da" : "inherit",
            zIndex: isFutureDate ? 0 : 1,
          }}
        >
          {day}
        </div>
      );
    }

    return calendarDays;
  };

  return (
    <div className="container-fluid container-p-y">
      <h4 className="fw-bold py-3">
        <span className="text-muted fw-light">Dashboard /</span> Manage Student
        Attendance
      </h4>

      <div className="ps-2 bg-light py-2 border rounded mb-4 text-center">
        <h1>UNDER WORK</h1>
      </div>

      {/* <div className="ps-2 bg-light py-2 border rounded mb-4">
        <h5>Filters</h5>
        <Row className="align-items-end">
          <Col>
            <Form.Group>
              <Form.Label>Course</Form.Label>
              <Form.Control
                as="select"
                value={filters.course}
                onChange={(e) => {
                  const selectedCourse = coursesOptions.find(
                    (course) => course._id === e.target.value
                  );
                  handleFilterChange("course", selectedCourse);
                }}
              >
                <option disabled value="">
                  Select Course
                </option>
                {coursesOptions?.map((course) => (
                  <option key={course._id} value={course._id}>
                    {course.courseName}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Section</Form.Label>
              <Form.Control
                as="select"
                value={filters.section}
                onChange={(e) => {
                  const selectedSection = sectionsOptions.find(
                    (section) => section._id === e.target.value
                  )
                  handleFilterChange("section", selectedSection);
                }}
                disabled={!filters.course}
              >
                <option disabled value="">
                  {!filters.course
                    ? "Please select a course first"
                    : "Select Section"}
                </option>
                {sectionsOptions?.map((section) => (
                  <option key={section?._id} value={section?._id}>
                    {section?.sectionName}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Button variant="primary" onClick={applyFilters}>
              Apply Filters
            </Button>
          </Col>
        </Row>
      </div>

      {loading && <p>Loading...</p>}

      {showCalendar && (
        <div className="bg-light mx-2 p-4 rounded">
          <div className="calendar-header d-flex justify-content-between align-items-center mb-3">
            <div>
              <Button
                variant="outline-secondary"
                onClick={() => changeYear(-1)}
              >
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
              <Button
                variant="outline-secondary mx-2"
                onClick={() => changeMonth(1)}
              >
                Month &gt;
              </Button>
              <Button variant="outline-secondary" onClick={() => changeYear(1)}>
                Year &gt;&gt;
              </Button>
            </div>
          </div>

          <div className="calendar-grid row row-cols-7 g-3">
            {renderCalendarDays()}
          </div>
        </div>
      )}

      {showModal && (
        <AttendanceModal
          show={showModal}
          onHide={closeModal}
          date={selectedDate}
          type="Students"
          data = {students}
          fetchUrl={GET_TEACHERS}
          submitUrl={MARK_ATTENDANCE}
          instituteId={instituteId}
          userId = {userId} 
          sectionId={selectedSection?._id}
          courseId={selectedCourse?._id}
          columns={[
            {
              label: "Student Name",
              accessor: (item) =>
                item.personalDetails.firstName +
                " " +
                item.personalDetails.lastName,
            },
          ]}
        />
      )} */}
    </div>
  );
};

export default Calendar;
