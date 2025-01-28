import axios from 'axios';
import { Field, Form, Formik } from 'formik';
import React, { useContext, useEffect, useState } from 'react'
import * as Yup from "yup"
import { useNavigate } from 'react-router-dom';
import { MainContext } from '../../Controller/MainProvider';

function StudentBookList() {
    const [querry, setquerry] = useState()
    const [SearchData, setSearchData] = useState()
    const [studentbook, setstudentbook] = useState([])
    const [StudentInfo, setStudentInfo] = useState('')
    const { userId } = useContext(MainContext)
    const [libraryDetail, setLibraryDetail] = useState([])
    const navigate = useNavigate()
    // filter  and search bar start
    const sortFunctions = {
        asc: (a, b) => a.bookName.localeCompare(b.bookName),
        desc: (a, b) => b.bookName.localeCompare(a.bookName),
        recentlyViewed: () => [...studentbook].reverse(),
        recentlyAdded: (a, b) => new Date(b.postDate) - new Date(a.postDate),
    };
    const handleSort = (type) => {
        const sortedBooks =
            type === 'recentlyViewed' ? sortFunctions[type]()
                : [...studentbook].sort(sortFunctions[type]);
        setstudentbook(sortedBooks);
    };

    function SearchFilter(v) {
        setquerry(v)
        const filterData = studentbook.filter((data) =>
            (data?.bookName ? data?.bookName.toLowerCase().includes(v.toLowerCase()) : false) || (data?.bookID ? data?.bookID.toString().includes(v.toLowerCase()) : false) || (data?.publisher ? data?.publisher.toString().includes(v.toLowerCase()) : false) || (data?.subject ? data?.subjectb.toString().includes(v.toLowerCase()) : false)

        );
        setSearchData(filterData);
    }


    // Api start
    function fetchData() {
        axios.get('http://localhost:5500/api/book/get').then(res => setstudentbook(res.data)
        ).catch(err => console.log(err))
    }
    useEffect(() => {
        fetchData();
    }, []);

    const postBookIssue = async (v, index) => {
        console.log(v);

        try {
            console.log('Submitting:', v);
            const res = await axios.post('http://localhost:5500/api/library/post', v, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            setStudentInfo(v);
            if (res?.status === 201) {
                alert('Issue Request Submitted');
                fetchData();
                // Close the modal
                const modalElement = document.getElementById(`book_details_${index}`);
                const modalInstance = bootstrap.Modal.getInstance(modalElement);
                if (modalInstance) {
                    modalInstance.hide();
                }
                navigate('/bookrequest')
            }
        } catch (error) {
            console.error('Error in book submission:', error.response?.data?.error || error);
            alert('Error in book submission:', error.response?.data?.error || error.message);
        }
    };
    function HandlelibraryDetail() {
        axios.get(`/api/student/${userId}/books-issued`).then(res => setLibraryDetail(res?.data?.booksIssued)
        ).catch(err => console.log(err))
    }
    useEffect(() => {
        HandlelibraryDetail()
    }, [])

    const matchBook = libraryDetail.reduce((acc, detail) => {
        const book = studentbook.find(book => book?._id === detail?.transactionID?.bookID?._id);
        if (book) {
            acc.push({ ...detail, ...book });
        }
        return acc;
    }, []);


    // api end



    // validation form start
    const validations = Yup.object({
        issueDate: Yup.string().required('Book Issue Date Is Required'),
        dueDate: Yup.string().required('Book Due Date Is Required'),
    })

    function HandlelibraryDetail() {
        axios.get(`http://localhost:5500/api/student/${userId}/books-issued`).then(res => setLibraryDetail(res?.data?.booksIssued)
        ).catch(err => console.log(err))
    }
    useEffect(() => {
        HandlelibraryDetail()
    }, [])
    // validation form end
    return (
        <>
            {/* <!-- Page Wrapper --> */}
            <div className="page-wrapper container mt-5">
                <div className="content">
                    {/* <!-- Students List --> */}
                    <div className="card">
                        <div className="card-header d-flex align-items-center justify-content-between flex-wrap pb-0">
                            <h4 className="mb-3">Books</h4>
                            <div className="d-flex align-items-center flex-wrap">
                                <div className="input-icon-start mb-3 me-2 position-relative">
                                    <span className="icon-addon">
                                        <i className="ti ti-search"></i>
                                    </span>
                                    <input type="text" value={querry} onChange={(e) => SearchFilter(e.target.value)} className="form-control date-range bookingrange" placeholder="Search"
                                    />
                                </div>


                                <div className="dropdown mb-3">
                                    <a href="javascript:void(0);" className="btn bg-white dropdown-toggle"
                                        data-bs-toggle="dropdown"><i className="ti ti-sort-ascending-2 me-2"></i>Sort by A-Z
                                    </a>
                                    <ul className="dropdown-menu p-3">
                                        <li>
                                            <a
                                                href="javascript:void(0);"
                                                className="dropdown-item rounded-1"
                                                onClick={() => handleSort('asc')}
                                            >
                                                Ascending
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="javascript:void(0);"
                                                className="dropdown-item rounded-1"
                                                onClick={() => handleSort('desc')}
                                            >
                                                Descending
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="javascript:void(0);"
                                                className="dropdown-item rounded-1"
                                                onClick={() => handleSort('recentlyViewed')}
                                            >
                                                Recently Viewed
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="javascript:void(0);"
                                                className="dropdown-item rounded-1"
                                                onClick={() => handleSort('recentlyAdded')}
                                            >
                                                Recently Added
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="card-body p-0 py-3">

                            {/* <!-- Student List --> */}
                            <div className="custom-datatable-filter">
                                <table className="table datatable">
                                    <thead className="thead-light">
                                        <tr>

                                            <th>ID</th>
                                            <th>Book Name</th>
                                            <th>Book No</th>
                                            <th>Publisher</th>
                                            <th>Author</th>
                                            <th>Subject</th>
                                            <th>Rack No</th>
                                            <th>Qty</th>
                                            <th>Available</th>
                                            <th>Price</th>
                                            <th>Post Date</th>
                                            <th>Action</th>

                                        </tr>
                                    </thead>
                                    <tbody>

                                        {(SearchData || studentbook).map((book, index) => (
                                            <tr key={index}>
                                                <td><a href="#" className="link-primary">{book.bookID}</a></td>
                                                <td>{book.bookName}</td>
                                                <td>{book.bookNumber}</td>
                                                <td>{book.publisher}</td>
                                                <td>{book.author}</td>
                                                <td>{book.subject}</td>
                                                <td>{book.rackNo}</td>
                                                <td>{book.quantity}</td>
                                                <td>{book.availability ? "Available" : "Not Available"}</td>
                                                <td>₹{book.price}</td>
                                                <td>{book.postDate ? new Date(book?.postDate)?.toISOString().split("T")[0] : ""}</td>
                                                <td>
                                                    <button
                                                        className={`${matchBook?.some((bookMatch) => bookMatch?._id === book._id && bookMatch?.transactionID?.status === "Issued") ? "disabled btn-success" : matchBook?.some((bookMatch) => bookMatch?._id === book._id) ? "disabled btn-warning" : " btn-primary"} btn w-100`}
                                                        data-bs-toggle="modal"
                                                        data-bs-target={`#book_details_${index}`}>
                                                        {matchBook.some((bookMatch) => bookMatch?._id === book._id) ? matchBook.find((bookMatch) => bookMatch?._id === book._id)?.transactionID?.status : "Issue Book"}
                                                    </button>
                                                </td>

                                                {/* Book Details Modal */}
                                                <div className="modal fade" id={`book_details_${index}`}>
                                                    <div className="modal-dialog modal-dialog-centered modal-lg">
                                                        <div className="modal-content">
                                                            <div className="booklist-container">
                                                                <div className="modal-header">
                                                                    <h2 className="booklist-title">Book Issue Form</h2>
                                                                    <button
                                                                        type="button"
                                                                        className="btn-close custom-btn-close"
                                                                        data-bs-dismiss="modal"
                                                                        aria-label="Close">
                                                                        <i className="ti ti-x"></i>
                                                                    </button>
                                                                </div>
                                                                <Formik
                                                                    initialValues={{
                                                                        issueDate: '',
                                                                        dueDate: '',
                                                                        bookID: book._id,
                                                                        studentID: userId,
                                                                        instituteId: book.instituteId,
                                                                        requestedDate: '2024-12-28'
                                                                    }}
                                                                    onSubmit={(values) => postBookIssue(values, index)}
                                                                    validationSchema={validations}
                                                                >
                                                                    {({ errors }) => (
                                                                        <Form>
                                                                            <div className="row p-4">
                                                                                <div className="col-6 form-group">
                                                                                    <label htmlFor="issueDate">Issue Date</label>
                                                                                    <Field
                                                                                        type="date"
                                                                                        id="issueDate"
                                                                                        name="issueDate"
                                                                                        className="form-control"
                                                                                    />
                                                                                    <div className='text-danger'>{errors?.issueDate}</div>
                                                                                </div>
                                                                                <div className="col-6 form-group">
                                                                                    <label htmlFor="dueDate">Due Date</label>
                                                                                    <Field
                                                                                        type="date"
                                                                                        id="dueDate"
                                                                                        name="dueDate"
                                                                                        className="form-control"
                                                                                    />
                                                                                    <div className='text-danger'>{errors?.dueDate}</div>
                                                                                </div>
                                                                            </div>
                                                                            <button type="submit" className="btn btn-primary ms-4 mb-3">
                                                                                Send Request
                                                                            </button>
                                                                        </Form>
                                                                    )}
                                                                </Formik>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            {/* <!-- /Student List --> */}
                        </div>
                    </div>
                    {/* <!-- /Students List --> */}
                </div>
            </div>
            {/* <!-- /Page Wrapper --> */}
        </>
    )
}

export default StudentBookList