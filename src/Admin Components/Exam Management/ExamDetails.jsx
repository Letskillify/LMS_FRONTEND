import React, { useState, useEffect } from 'react';
import { useGetExamByInstituteIdQuery } from '../../Redux/Api/examDataSlice';
import { getCommonCredentials } from '../../GlobalHelper/CommonCredentials';
import GlobalTable from '../../GlobalComponents/GlobalTable';
import { Link } from 'react-router-dom';
import { CSVLink } from 'react-csv';
import { useReactToPrint } from 'react-to-print';
import useGlobalToast from '../../GlobalComponents/GlobalToast';

const ExamDetails = () => {
    const { InstituteId } = getCommonCredentials();
    const [exams, setExams] = useState([]);
    const [filteredExams, setFilteredExams] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const showToast = useGlobalToast();

    const { data: Exam, isLoading } = useGetExamByInstituteIdQuery(InstituteId, {
        skip: !InstituteId,
    });

    useEffect(() => {
        if (Exam?.items) {
            const formattedExams = Exam.items.map(exam => ({
                'Exam Name': exam.examName,
                'Exam Type': exam.examType?.examTypeName || '-',
                'Classes': exam.class?.map(c => c.className).join(', ') || '-',
                'Start Date': new Date(exam.startingDate).toLocaleDateString(),
                'End Date': new Date(exam.endingDate).toLocaleDateString(),
                'Total Marks': exam.totalMarks || '-',
                'Mode': exam.examMode || '-',
                'Status': exam.status,
                '_raw': exam
            }));
            setExams(formattedExams);
            setFilteredExams(formattedExams);
        }
    }, [Exam]);

    // Search and Filter functionality
    useEffect(() => {
        let result = exams;

        if (searchTerm) {
            result = result.filter(exam =>
                exam['Exam Name'].toLowerCase().includes(searchTerm.toLowerCase()) ||
                exam['Exam Type'].toLowerCase().includes(searchTerm.toLowerCase()) ||
                exam['Classes'].toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (filterStatus !== 'all') {
            result = result.filter(exam => exam.Status === filterStatus);
        }

        setFilteredExams(result);
    }, [searchTerm, filterStatus, exams]);

    const headers = [
        'Exam Name',
        'Exam Type',
        'Classes',
        'Start Date',
        'End Date',
        'Total Marks',
        'Mode',
        'Status'
    ];

    const [selectedExam, setSelectedExam] = useState(null);
    const [showDetails, setShowDetails] = useState(false);

    const actions = [
        {
            icon: "fa fa-eye",
            className: "btn-info btn-sm",
            label: "View Details",
            onClick: (row) => {
                setSelectedExam(row._raw);
                setShowDetails(true);
            }
        }
    ];

    // Create a ref for the printable content
    const printRef = React.useRef(null);

    // Update print functionality
    const handlePrint = useReactToPrint({
        content: () => {
            const content = printRef.current;
            if (!content) {
                showToast('Nothing to print. Please try again.', 'error');
                throw new Error('Nothing to print');
            }
            return content;
        },
        documentTitle: 'Exam_Schedule',
        onBeforeGetContent: () => {
            if (!printRef.current) {
                showToast('Print content not ready. Please try again.', 'error');
                return Promise.reject('Print content not ready');
            }
            return Promise.resolve();
        },
        onBeforePrint: () => {
            showToast('Preparing to print...', 'info');
        },
        onAfterPrint: () => {
            showToast('Schedule printed successfully!', 'success');
        },
        onPrintError: (error) => {
            console.error('Print failed:', error);
            if (error.message?.includes('contentRef')) {
                showToast('Print content not properly loaded. Please try again.', 'error');
            } else if (error.message?.includes('nothing to print')) {
                showToast('No content available for printing. Please try again.', 'error');
            } else {
                showToast('Failed to print schedule. Please try again.', 'error');
            }
        },
        removeAfterPrint: true
    });

    // CSV Export Data
    const csvData = filteredExams.map(exam => ({
        ...exam,
        '_raw': undefined // Remove raw data from export
    }));

    // Get status counts
    const getStatusCount = (status) => {
        return exams.filter(exam => exam.Status === status).length;
    };

    return (
        <div className="container-fluid px-4">
            <nav aria-label="breadcrumb" className="mt-3">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/dashboard">Home</Link></li>
                    <li className="breadcrumb-item"><Link to="/exam-management">Exam Management</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Exam Details</li>
                </ol>
            </nav>

            {/* Wrap the printable content in a div with ref */}
            <div ref={printRef}>
                <div className="row">
                    <div className="col-12">
                        <div className="card border-0 shadow-sm">
                            <div className="card-header bg-themprimary d-flex justify-content-between align-items-center py-3 mb-3">
                                <h5 className="mb-0 text-white">
                                    <i className="fa fa-calendar-check-o me-2"></i>
                                    Exam Schedule
                                </h5>
                                <div className="d-flex gap-2 d-print-none">
                                    <CSVLink
                                        data={csvData}
                                        filename={"exam_schedule.csv"}
                                        className="btn btn-outline-light btn-sm d-flex align-items-center"
                                        onClick={() => showToast('Schedule downloaded successfully!', 'success')}
                                    >
                                        <i className="fa fa-download me-2"></i>
                                        <span className="d-none d-md-inline">Export CSV</span>
                                    </CSVLink>
                                    <button
                                        className="btn btn-outline-light btn-sm d-flex align-items-center"
                                        onClick={handlePrint}
                                    >
                                        <i className="fa fa-print me-2"></i>
                                        <span className="d-none d-md-inline">Print</span>
                                    </button>
                                </div>
                            </div>

                            <div className="card-body">
                                <div className="row mb-4">
                                    {[
                                        { status: 'Upcoming', icon: 'fa-clock-o', bgClass: 'bg-info' },
                                        { status: 'Ongoing', icon: 'fa-play-circle-o', bgClass: 'bg-success' },
                                        { status: 'Completed', icon: 'fa-check-circle-o', bgClass: 'bg-warning' },
                                        { status: 'Cancelled', icon: 'fa-times-circle-o', bgClass: 'bg-danger' }
                                    ].map((item) => (
                                        <div key={item.status} className="col-md-3 col-sm-6 mb-3">
                                            <div className={`card ${item.bgClass} text-white border-0`}>
                                                <div className="card-body d-flex align-items-center p-3">
                                                    <i className={`fa ${item.icon} fa-3x me-3`}></i>
                                                    <div>
                                                        <h6 className="mb-1  text-white">{item.status} Exams</h6>
                                                        <h3 className="mb-0 text-white">{getStatusCount(item.status)}</h3>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="row mb-3 d-print-none">
                                    <div className="col-md-6 mb-2 mb-md-0">
                                        <div className="input-group">
                                            <span className="input-group-text bg-light border-end-0">
                                                <i className="fa fa-search text-muted"></i>
                                            </span>
                                            <input
                                                type="text"
                                                className="form-control border-start-0"
                                                placeholder="Search exams..."
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <select
                                            className="form-select"
                                            value={filterStatus}
                                            onChange={(e) => setFilterStatus(e.target.value)}
                                        >
                                            <option value="all">Filter by Status</option>
                                            <option value="Upcoming">Upcoming</option>
                                            <option value="Ongoing">Ongoing</option>
                                            <option value="Completed">Completed</option>
                                            <option value="Cancelled">Cancelled</option>
                                        </select>
                                    </div>
                                </div>

                                <hr className="d-print-none" />

                                <div className="table-responsive">
                                    <GlobalTable
                                        headers={headers}
                                        data={filteredExams}
                                        actions={actions}
                                        loading={isLoading}
                                        noDataMessage="No exams found"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Detailed View Modal */}
            {showDetails && selectedExam && (
                <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content border-0">
                            <div className="modal-header bg-primary text-white">
                                <h5 className="modal-title">{selectedExam.examName} Details</h5>
                                <button type="button" className="btn-close btn-close-white" onClick={() => setShowDetails(false)}></button>
                            </div>
                            <div className="modal-body">
                                <div className="alert alert-info">
                                    <strong>Important Notice:</strong> Please read all instructions carefully before the exam.
                                </div>

                                <div className="card mb-3">
                                    <div className="card-header">
                                        <h6 className="mb-0">General Information</h6>
                                    </div>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-md-6 mb-2">
                                                <strong>Exam Type:</strong> {selectedExam.examType?.examTypeName}
                                            </div>
                                            <div className="col-md-6 mb-2">
                                                <strong>Classes:</strong> {selectedExam.class?.map(c => c.className).join(', ')}
                                            </div>
                                            <div className="col-md-6 mb-2">
                                                <strong>Mode:</strong> {selectedExam.examMode}
                                            </div>
                                            <div className="col-md-6 mb-2">
                                                <strong>Status:</strong>
                                                <span className={`badge ${selectedExam.status === 'Upcoming' ? 'bg-primary' :
                                                    selectedExam.status === 'Ongoing' ? 'bg-success' :
                                                        selectedExam.status === 'Completed' ? 'bg-warning' : 'bg-danger'
                                                    } ms-1`}>
                                                    {selectedExam.status}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="card mb-3">
                                    <div className="card-header">
                                        <h6 className="mb-0">Subject Schedule</h6>
                                    </div>
                                    <div className="card-body">
                                        <div className="table-responsive">
                                            <table className="table table-bordered table-hover">
                                                <thead className="table-light">
                                                    <tr>
                                                        <th>Subject</th>
                                                        <th>Date</th>
                                                        <th>Time</th>
                                                        <th>Duration</th>
                                                        <th>Marks</th>
                                                        <th>Status</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {selectedExam.subjects?.map((subject, index) => (
                                                        <tr key={index}>
                                                            <td>{subject.subjectName?.subjectName}</td>
                                                            <td>{new Date(subject.examDate).toLocaleDateString()}</td>
                                                            <td>{subject.startTime} - {subject.endTime}</td>
                                                            <td>{subject.duration || '-'}</td>
                                                            <td>
                                                                Total: {subject.totalMarks}<br />
                                                                Passing: {subject.passingMarks}
                                                            </td>
                                                            <td>
                                                                <span className={`badge ${subject.status === 'Scheduled' ? 'bg-primary' :
                                                                    subject.status === 'Completed' ? 'bg-success' :
                                                                        subject.status === 'Cancelled' ? 'bg-danger' : 'bg-warning'
                                                                    }`}>
                                                                    {subject.status}
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>

                                {selectedExam.examInstructions && (
                                    <div className="card">
                                        <div className="card-header">
                                            <h6 className="mb-0">Instructions</h6>
                                        </div>
                                        <div className="card-body">
                                            <p className="mb-0">{selectedExam.examInstructions}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary d-flex align-items-center"
                                    onClick={() => setShowDetails(false)}
                                >
                                    <i className="fa fa-times me-2"></i>
                                    Close
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-primary d-flex align-items-center"
                                    onClick={handlePrint}
                                >
                                    <i className="fa fa-print me-2"></i>
                                    Print Schedule
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ExamDetails;
