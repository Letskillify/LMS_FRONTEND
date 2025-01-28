import axios from 'axios';
import { Field, Form, Formik } from 'formik';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import * as Yup from "yup"
import { useImageUploader } from '../../Custom Hooks/CustomeHook';
import { MainContext } from '../../Controller/MainProvider';

function BooksList() {
    const [querry, setquerry] = useState()
    const [SearchData, setSearchData] = useState()
    const [BookLists, setBookLists] = useState([])
    const { userId } = useContext(MainContext);
    const { uploadedData, handleImageUpload } = useImageUploader();

    const validations = Yup.object({
        bookName: Yup.string().required('Book Name is required'),
        bookNumber: Yup.number().required('Book Number is required'),
        rackNo: Yup.number().required('Rack Number is required'),
        publisher: Yup.string().required('Publisher is required'),
        author: Yup.string().required('Author is required'),
        subject: Yup.string().required('Subject is required'),
        quantity: Yup.number().required('Quantity is required'),
        availability: Yup.string().required('Availability is required'),
        price: Yup.number().required('Price is required'),
        postDate: Yup.date().required('Post Date is required'),
    })


    const fetchData = async () => {
        try {
            const res = await axios.get(`http://localhost:5500/api/book/get`);
            setBookLists(res.data)
        } catch (error) {
            console.error("Error fetching data:", error)
        }
    }

    useEffect(() => {
        fetchData();
    }, []);


    const sortFunctions = {
        asc: (a, b) => a.bookName.localeCompare(b.bookName),
        desc: (a, b) => b.bookName.localeCompare(a.bookName),
        recentlyViewed: () => [...BookLists].reverse(),
        recentlyAdded: (a, b) => new Date(b.postDate) - new Date(a.postDate),
    };
    const handleSort = (type) => {
        const sortedBooks =
            type === 'recentlyViewed' ? sortFunctions[type]()
                : [...BookLists].sort(sortFunctions[type]);
        setBookLists(sortedBooks);
    };

    function SearchFilter(v) {
        setquerry(v)
        const filterData = BookLists.filter((data) =>
            (data?.bookName ? data?.bookName.toLowerCase().includes(v.toLowerCase()) : false) || (data?.publisher ? data?.publisher.toLowerCase().includes(v.toLowerCase()) : false) ||
            (data?.bookNo ? data?.bookNo.toString().includes(v.toLowerCase()) : false) ||
            (data?.subject ? data?.subject.toLowerCase().includes(v.toLowerCase()) : false)
        );

        setSearchData(filterData);

    }


    const [initialvalue, setinitialvalue] = useState({
        instituteId: userId,
        bookName: "",
        bookNumber: "",
        publisher: "",
        author: "",
        subject: "",
        rackNo: "",
        quantity: "",
        availability: "",
        price: "",
        postDate: "",
        action: "",
        edition: "",
        publicationYear: "",
        genre: "",
        language: "",
        description: "",
        coverImageURL: uploadedData?.coverImageURL,
        issuedCount: "",
        lastIssuedDate: "",
        updatedAt: "",
    })

    const [popup, setpopup] = useState(false)

    console.log();

    const handlepost = async (v, { resetForm }) => {
        const data = { ...v, coverImageURL: uploadedData?.coverImageURL };
        try {
            const response = await axios.post('api/book/post', data, {
                headers: {
                    'Content-Type': "application/json",
                },
                method: 'POST'

            });
            if (response.status === 201) {
                alert("Data Sent Successfully")
                resetForm();
                fetchData();
                setpopup(false)
            } else {
                alert("Failed to Send Data")
            }
        } catch (error) {
            if (error.response) {
                console.log("something is wrong", error.response.data)
            }
        }
    }

    const handledelete = async (id) => {
        try {
            const res = await axios.delete(`http://localhost:5500/api/book/add-trash/${id}`, {
                headers: {
                    'Content-Type': "application/json",
                },
                method: "DELETE"
            });
            if (res.status === 200) {
                alert("your data is delete successfully")
                fetchData();
            }
        } catch (error) {
            console.error("Error deleting the book:", error)
        }
    }
    // Handle Form Submit for Update
    const handleUpdate = async (values, id) => {
        const data = { ...values, coverImageURL: uploadedData?.coverImageURL };
        try {
            const response = await axios.put(`http://localhost:5500/api/book/update/${id}`, data);
            if (response.status === 200) {
                alert("Data Updated Successfully")
                fetchData();
            }
        } catch (error) {
            console.error("Error updating book:", error);
            alert("Failed to update book!");
        }
    };

    console.log(uploadedData);

    return (
        <>
            {/* <!-- Main Wrapper --> */}
            <div className="main-wrapper container mt-5">
                {/* <!-- Page Wrapper --> */}
                <div className="page-wrapper">
                    <div className="content">
                        {/* <!-- Page Header --> */}
                        <div className="d-md-flex d-block align-items-center justify-content-between mb-3 ms-3">
                            <div className="my-auto mb-2">
                                <h3 className="page-title mb-1">Books</h3>
                                <nav>
                                    <ol className="breadcrumb mb-0">
                                        <li className="breadcrumb-item">
                                            <a href="index.html">Dashboard</a>
                                        </li>
                                        <li className="breadcrumb-item">
                                            <a href="javascript:void(0);">Management</a>
                                        </li>
                                        <li className="breadcrumb-item active" aria-current="page">Books</li>
                                    </ol>
                                </nav>
                            </div>
                            <div className="d-flex my-xl-auto right-content align-items-center flex-wrap">
                                {/* <div className="pe-1 mb-2">
                                    <a href="#" className="btn btn-outline-light bg-white btn-icon me-1" data-bs-toggle="tooltip"
                                        data-bs-placement="top" aria-label="Refresh" data-bs-original-title="Refresh">
                                        <i className="ti ti-refresh"></i>
                                    </a>
                                </div>
                                <div className="pe-1 mb-2">
                                    <button type="button" className="btn btn-outline-light bg-white btn-icon me-1"
                                        data-bs-toggle="tooltip" data-bs-placement="top" aria-label="Print"
                                        data-bs-original-title="Print">
                                        <i className="ti ti-printer"></i>
                                    </button>
                                </div>
                                <div className="dropdown me-2 mb-2">
                                    <a href="javascript:void(0);"
                                        className="dropdown-toggle btn btn-light fw-medium d-inline-flex align-items-center"
                                        data-bs-toggle="dropdown">
                                        <i className="ti ti-file-export me-2"></i>Export
                                    </a>
                                    <ul className="dropdown-menu  dropdown-menu-end p-3">
                                        <li>
                                            <a href="javascript:void(0);" className="dropdown-item rounded-1"><i
                                                className="ti ti-file-type-pdf me-1"></i>Export as PDF</a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0);" className="dropdown-item rounded-1"><i
                                                className="ti ti-file-type-xls me-1"></i>Export as Excel </a>
                                        </li>
                                    </ul>
                                </div> */}
                                <div className="mb-2">

                                    <Link to="#" className="btn btn-primary d-flex align-items-center" onClick={() => setpopup(true)}><i className='menu-icon tf-icons bx bx-book-reader text-white '></i>Add
                                        Book</Link>
                                </div>
                                <div className="mb-2">

                                    <Link to="/booklisttrash" className="btn btn-danger ms-2 d-flex align-items-center" ><i className='menu-icon tf-icons bx bx-trash text-white '></i>Trash</Link>
                                </div>
                            </div>
                        </div>
                        {/* <!-- /Page Header --> */}

                        {/* <!-- Students List --> */}
                        <div className="card">
                            <div className="card-header d-flex align-items-center justify-content-between flex-wrap pb-0">
                                <h4 className="mb-3">Books</h4>
                                <div className="d-flex align-items-center flex-wrap">
                                    <div className="input-icon-start mb-3 me-2 position-relative">
                                        <span className="icon-addon">
                                            <i className="ti ti-search"></i>
                                        </span>
                                        <input type="text" value={querry} onChange={(e) => SearchFilter(e.target.value)} className="form-control date-range bookingrange" placeholder="Search Your Book"
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
                                            {(SearchData || BookLists).map((BookList, index) => (
                                                <tr key={index}>
                                                    <td><a href="#" className="link-primary">{BookList.bookID}</a></td>
                                                    <td>{BookList.bookName}</td>
                                                    <td>{BookList.bookNumber}</td>
                                                    <td>{BookList.publisher}</td>
                                                    <td>{BookList.author}</td>
                                                    <td>{BookList.subject}</td>
                                                    <td>{BookList.rackNo}</td>
                                                    <td>{BookList.quantity}</td>
                                                    <td>{BookList.availability ? "Available" : "Not Available"}</td>
                                                    <td>{BookList.price}</td>
                                                    <td>{BookList.postDate ? new Date(BookList.postDate).toLocaleDateString() : ''}</td>
                                                    <td>
                                                        <div className="d-flex align-items-center">
                                                            <div className="dropdown">
                                                                <a href="#"
                                                                    className="btn btn-black btn-icon btn-sm d-flex align-items-center justify-content-center rounded-circle p-0"
                                                                    data-bs-toggle="dropdown" aria-expanded="false">
                                                                    <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
                                                                </a>
                                                                <ul className="dropdown-menu dropdown-menu-right p-3">
                                                                    <li>
                                                                        <a className="dropdown-item rounded-1"
                                                                            href="#"
                                                                            data-bs-toggle="modal"
                                                                            data-bs-target={`#edit_library_book_${index}`}>
                                                                            <i className="fa fa-text-width me-1" aria-hidden="true"></i>Edit</a>
                                                                    </li>
                                                                    <li>
                                                                        <a className="dropdown-item rounded-1"
                                                                            onClick={() => handledelete(BookList._id)}>
                                                                            <i className="fa fa-trash me-1" aria-hidden="true"></i>Delete</a>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </td>

                                                    {/* Edit Book Modal */}
                                                    <div className="modal fade" id={`edit_library_book_${index}`}>
                                                        <div className="modal-dialog modal-dialog-centered">
                                                            <div className="modal-content">
                                                                <div className="modal-header">
                                                                    <h4 className="modal-title">Edit Book</h4>
                                                                    <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                                                                </div>
                                                                <Formik
                                                                    initialValues={{
                                                                        bookName: BookList?.bookName,
                                                                        bookNumber: BookList?.bookNumber,
                                                                        rackNo: BookList?.rackNo,
                                                                        publisher: BookList?.publisher,
                                                                        author: BookList?.author,
                                                                        subject: BookList?.subject,
                                                                        quantity: BookList?.quantity,
                                                                        availability: BookList?.availability,
                                                                        price: BookList?.price,
                                                                        postDate: BookList?.postDate,
                                                                    }}
                                                                    onSubmit={(values) => { handleUpdate(values, BookList._id) }}
                                                                >
                                                                    {({ values, handleChange }) => (
                                                                        <Form>
                                                                            <div className="modal-body">
                                                                                <div className="mb-3">
                                                                                    <label>Book Name</label>
                                                                                    <Field
                                                                                        type="text"
                                                                                        className="form-control"
                                                                                        name="bookName"
                                                                                        onChange={handleChange}
                                                                                    />
                                                                                </div>
                                                                                <div className="mb-3">
                                                                                    <label>Cover Image URL</label>
                                                                                    <Field
                                                                                        type="file"
                                                                                        className="form-control"
                                                                                        name="coverImageURL"
                                                                                        onChange={(e) => handleImageUpload(e, "coverImageURL")}
                                                                                    />
                                                                                </div>
                                                                                <div className="mb-3">
                                                                                    <label>Book No</label>
                                                                                    <Field
                                                                                        type="text"
                                                                                        className="form-control"
                                                                                        name="bookNumber"
                                                                                        onChange={handleChange}
                                                                                    />
                                                                                </div>
                                                                                <div className="mb-3">
                                                                                    <label>Rack No</label>
                                                                                    <Field
                                                                                        type="text"
                                                                                        className="form-control"
                                                                                        name="rackNo"
                                                                                        onChange={handleChange}
                                                                                    />
                                                                                </div>
                                                                                <div className="mb-3">
                                                                                    <label>Publisher</label>
                                                                                    <Field
                                                                                        type="text"
                                                                                        className="form-control"
                                                                                        name="publisher"
                                                                                        onChange={handleChange}
                                                                                    />
                                                                                </div>
                                                                                <div className="mb-3">
                                                                                    <label>Author</label>
                                                                                    <Field
                                                                                        type="text"
                                                                                        className="form-control"
                                                                                        name="author"
                                                                                        onChange={handleChange}
                                                                                    />
                                                                                </div>
                                                                                <div className="mb-3">
                                                                                    <label>Subject</label>
                                                                                    <Field
                                                                                        type="text"
                                                                                        className="form-control"
                                                                                        name="subject"
                                                                                        onChange={handleChange}
                                                                                    />
                                                                                </div>
                                                                                <div className="mb-3">
                                                                                    <label>Quantity</label>
                                                                                    <Field
                                                                                        type="text"
                                                                                        className="form-control"
                                                                                        name="quantity"
                                                                                        onChange={handleChange}
                                                                                    />
                                                                                </div>
                                                                                <div className="mb-3">
                                                                                    <label>Availability</label>
                                                                                    <Field
                                                                                        as="select"
                                                                                        className="form-select"
                                                                                        name="availability"
                                                                                        onChange={handleChange}
                                                                                    >
                                                                                        <option value={true}>Yes</option>
                                                                                        <option value={false}>No</option>
                                                                                    </Field>
                                                                                </div>
                                                                                <div className="mb-3">
                                                                                    <label>Price</label>
                                                                                    <Field
                                                                                        type="text"
                                                                                        className="form-control"
                                                                                        name="price"
                                                                                        onChange={handleChange}
                                                                                    />
                                                                                </div>
                                                                                <div className="mb-3">
                                                                                    <label>Post Date</label>
                                                                                    <Field
                                                                                        type="date"
                                                                                        className="form-control"
                                                                                        name="postDate"
                                                                                        onChange={handleChange}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                            <div className="modal-footer">
                                                                                <button
                                                                                    type="button"
                                                                                    className="btn btn-light"
                                                                                    data-bs-dismiss="modal"
                                                                                >
                                                                                    Cancel
                                                                                </button>
                                                                                <button type="submit" className="btn btn-primary">
                                                                                    Save Changes
                                                                                </button>
                                                                            </div>
                                                                        </Form>
                                                                    )}
                                                                </Formik>
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

                {/* <!-- Add Book --> */}

                <div className={`modal fade ${popup ? 'show d-block' : 'd-none'}`} id="add_library_book" style={{ background: '#0000007d' }}>
                    <div className="m-5 p-5 d-flex justify-content-center align-items-center modal-dialog-centered">
                        <div className="modal-content w-75 p-3">
                            <div className="modal-header" >
                                <h4 className="modal-title">Add Book</h4>
                                <button type="button" className="btn-close custom-btn-close" onClick={() => setpopup(false)} >
                                    <i className="ti ti-box"></i>
                                </button>
                            </div>
                            <Formik initialValues={initialvalue} onSubmit={handlepost} validationSchema={validations}>
                                {({ errors, resetForm }) => (
                                    <Form >
                                        <div className="modal-body">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="mb-3">
                                                        <label className="form-label">Book Name</label>
                                                        <Field type="text" name="bookName" className="form-control" placeholder="Enter Book Name" />
                                                        <div className="text-danger">
                                                            {errors?.bookName}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="mb-3">
                                                        <label className="form-label">Cover Image URL</label>
                                                        <Field
                                                            type="file"
                                                            className="form-control"
                                                            name="coverImageURL"
                                                            onChange={(e) => handleImageUpload(e, "coverImageURL")}
                                                            placeholder="Enter Cover Image URL"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="mb-3">
                                                        <label className="form-label">Book No</label>
                                                        <Field type="number" name="bookNumber" className="form-control" placeholder="Enter Book No" />
                                                        <div className='text-danger'>
                                                            {
                                                                errors?.bookNumber
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="mb-3">
                                                        <label className="form-label">Rack No</label>
                                                        <Field type="number" name="rackNo" className="form-control" placeholder="Enter Rack No" />
                                                        <div className='text-danger'>
                                                            {
                                                                errors?.rackNo
                                                            }
                                                        </div>

                                                    </div>
                                                </div>
                                                <div className='col-md-6'>
                                                    <div className="mb-3">
                                                        <label className="form-label">Publisher</label>
                                                        <Field type="text" name="publisher" className="form-control" placeholder="Enter Publisher" />
                                                        <div className='text-danger'>
                                                            {
                                                                errors?.publisher
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="mb-3">
                                                        <label className="form-label">Author</label>
                                                        <Field type="text" name="author" className="form-control" placeholder="Enter Author" />
                                                        <div className='text-danger'>
                                                            {
                                                                errors?.author
                                                            }
                                                        </div>

                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="mb-3">
                                                        <label className="form-label">Subject</label>
                                                        <Field type="text" name="subject" className="form-control" placeholder="Enter Subject" />
                                                        <div className='text-danger'>
                                                            {
                                                                errors?.subject
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* <div className="mb-3">
                                                            <label className="form-label">Book ID</label>
                                                            <Field type="number" name="bookID" className="form-control" placeholder="Enter Book ID" />
                                                            <div className='text-danger'>
                                                                {
                                                                    errors?.bookID
                                                                }
                                                            </div>
                                                        </div> */}
                                                <div className="col-md-6">
                                                    <div className="mb-3">
                                                        <label className="form-label">Qty</label>
                                                        <Field type="number" name="quantity" className="form-control" placeholder="Enter Qty" />
                                                        <div className='text-danger'>
                                                            {
                                                                errors?.quantity
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="mb-3">
                                                        <label className="form-label">Available</label>
                                                        <Field as="select" name="availability" className="form-control" placeholder="Select Availability" >
                                                            <option value="">Select</option>
                                                            <option value="true">Yes</option>
                                                            <option value="false">No</option>
                                                        </Field>
                                                        <div className='text-danger'>
                                                            {
                                                                errors?.availability
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="mb-3">
                                                        <label className="form-label">Price</label>
                                                        <Field type="number" name="price" className="form-control" placeholder="Enter Price" />
                                                        <div className='text-danger'>
                                                            {
                                                                errors?.price
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="mb-0">
                                                        <label className="form-label">Post Date</label>
                                                        <Field type="date" name="postDate" className="form-control" placeholder="Enter Post Date" />
                                                        <div className='text-danger'>
                                                            {
                                                                errors?.postDate
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='d-flex justify-content-between m-2'>
                                            <div></div>
                                            <div>
                                                <button type='reset' onClick={() => { resetForm, setpopup(false) }} className='btn btn-transparent border-primary me-3'>Cancel</button>
                                                <button type='submit' className='btn btn-primary me-3'>Submit</button>
                                            </div>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
                {/* <!-- Add Book --> */}
            </div >
            {/* <!-- /Main Wrapper --> */}
        </>
    )
}

export default BooksList