'use client';

import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form } from 'react-bootstrap';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaFilter, FaInfoCircle } from 'react-icons/fa';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';

const localizer = momentLocalizer(moment);

const InstituteHoliday = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [filter, setFilter] = useState('all');

  const fetchData = async () => {
    try {
      const response = await axios.get(`/api/institute-holiday/get`);
      const formattedEvents = response.data.map(event => ({
        ...event,
        start: new Date(event?.startingDate || event?.date),
        end: new Date(event?.endingDate || event?.date),
      }));
      setEvents(formattedEvents);
      showDefaultEvent(formattedEvents);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(events);
  

  const showDefaultEvent = (events) => {
    const today = new Date();
    const defaultEvent = events.find(event => 
      moment(event.start).isSame(today, 'day') || 
      moment(event.end).isSame(today, 'day')
    );
    if (defaultEvent) {
      setSelectedEvent(defaultEvent);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredEvents = events.filter(event => filter === 'all' || event.status.toLowerCase() === filter.toLowerCase());

  const EventComponent = ({ event }) => <div className="rbc-event-content"><strong>{event.title}</strong></div>;

  const handleSelectEvent = event => setSelectedEvent(event);

  const handleFilterChange = e => setFilter(e.target.value);

  return (
    <Container fluid className="mt-4">
      <Row className="d-md-flex">
        <Col>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className="shadow-lg mb-3">
              <Card.Body>
                <Card.Title className="mb-3 d-flex align-items-center">
                  <FaFilter className="me-2" /> Filter Events
                </Card.Title>
                <Form.Select onChange={handleFilterChange} value={filter}>
                  <option value="all">All Events</option>
                  <option value="event">Events</option>
                  <option value="holiday">Holidays</option>
                  <option value="Day-Out">Day Out</option>
                  <option value="Half-Day">Half Days</option>
                  <option value="Celebration">Celebrations</option>
                </Form.Select>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>
      </Row>
      <Row>
        <Col md={{ span: 9, order: 2 }} lg={{ span: 9, order: 1 }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className="shadow-lg">
              <Card.Body>
                <Card.Title className="mb-4 d-flex align-items-center">
                  <FaCalendarAlt className="me-2" /> Holiday Calendar
                </Card.Title>
                <div style={{ height: '600px' }}>
                  <Calendar
                    localizer={localizer}
                    events={filteredEvents}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: '100%' }}
                    components={{ event: EventComponent }}
                    onSelectEvent={handleSelectEvent}
                  />
                </div>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>
        <Col md={{ span: 3, order: 1 }} lg={{ span: 3, order: 2 }} className="mt-sm-3 mt-md-0">
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
            {selectedEvent && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <Card className="shadow-lg">
                  <Card.Body>
                    <Card.Title className="mb-3 d-flex align-items-center">
                      <FaInfoCircle className="me-2" /> Event Details
                    </Card.Title>
                    {selectedEvent.thumbnail && <img src={selectedEvent.thumbnail} alt={selectedEvent.title} className="img-fluid mt-1 border rounded" />}
                    <hr />
                    <h5 className='text-info border p-2 rounded text-center'>{selectedEvent.title}</h5>
                    <div className='ms-2'>
                      <p><strong>Status:</strong> {selectedEvent.status}</p>
                      <p><strong>Start:</strong> {moment(selectedEvent.start).format('MMMM D, YYYY') || moment(selectedEvent.date).format('MMMM D, YYYY')}</p>
                      <p><strong>End:</strong> {moment(selectedEvent.end).format('MMMM D, YYYY')}</p>
                      {selectedEvent.description && <p><strong>Description:</strong> {selectedEvent.description}</p>}
                    </div>
                    <hr className='pb-0 mb-0' />
                  </Card.Body>
                </Card>
              </motion.div>
            )}
          </motion.div>
        </Col>
      </Row>
    </Container>
  );
};

export default InstituteHoliday;

