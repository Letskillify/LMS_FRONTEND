import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function BookListTrash() {
    const [Data, setData] = useState()

    const handlerecoverall = async () => {
        try {
            const res = await axios.post('http://localhost:5500/api/book/revive-all', {
                headers: {
                    'Content-Type': "application/json",
                },
                method: "POST"
            });
            if (res?.status === 200) {
                alert('ABCD')
            }
        } catch (error) {
            console.error("Error in book recovery:", error)
        }
    }

    const handlposttransh = async () => {
        try {
            const res = await axios.delete('http://localhost:5500/api/book/permanent-delete-all', {
                headers: {
                    'Content-Type': "application/json",
                },
                method: "DELETE"
            });
            if (res.status === 200) {
                alert("your all data deleted successfully")


            }
        } catch (error) {
            console.error("Error deleting the book:", error)
        }
    }

    useEffect(() => {
        axios.get('http://localhost:5500/api/book/get-trash').then(res => setData(res.data)).catch(err => console.log(err))
    }, [])

    const handledelete1 = async (id) => {
        try {
            const res = await axios.delete(`http://localhost:5500/api/book/permanent-delete/${id}`, {
                headers: {
                    'Content-Type': "application/json",
                },
                method: "DELETE"
            });
            if (res.status === 200) {
                alert("your data is deleted successfully")


            }
        } catch (error) {
            console.error("Error deleting the book:", error)
        }
    }
    const handlerecoverid = async (id) => {
        try {
            const res = await axios.post(`http://localhost:5500/api/book/revive/${id}`, {
                headers: {
                    'Content-Type': "application/json",
                },
                method: "POST"
            });
            if (res.status === 200) {
                alert("your data recover successfully")


            }
        } catch (error) {
            console.error("Error deleting the book:", error)
        }
    }

    return (
        <>
            <div className="main-wrapper container mt-5">
                {/* <!-- Page Wrapper --> */}
                <div className="page-wrapper">
                    <div className="content">
                        {/* <!-- Page Header --> */}
                        <div className="d-md-flex d-block align-items-center justify-content-between mb-3 ms-2">
                            <div className="my-auto mb-2">
                                <h3 className="page-title mb-1">Trash Books</h3>
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
                                <div className="mb-2">
                                    <Link className="btn btn-primary d-flex align-items-center" onClick={handlerecoverall}><i className="ti ti-refresh me-2"></i>Recover All</Link>
                                </div>
                                <div className="mb-2">

                                    <Link className="btn btn-danger ms-2 d-flex align-items-center" onClick={handlposttransh} ><i className="ti ti-trash me-2"></i>Delete All</Link>
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
                                        <input type="text" className="form-control date-range bookingrange" placeholder="Search Your Book"
                                        />
                                    </div>
                                    <div className="dropdown mb-3">
                                        <a href="javascript:void(0);" className="btn btn-outline-light bg-white dropdown-toggle"
                                            data-bs-toggle="dropdown"><i className="ti ti-sort-ascending-2 me-2"></i>Sort by A-Z
                                        </a>

                                    </div>
                                </div>
                            </div>
                            <div className="card-body p-0 py-3">

                                {/* <!-- Student List --> */}
                                <div className="custom-datatable-filter table-responsive">
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
                                            {(Data)?.map((BookList, index) =>
                                                <tr key={index}>
                                                    {/* <td>
                                                        <div className="form-check form-check-md">
                                                            <input className="form-check-input" type="checkbox" />
                                                        </div>
                                                    </td> */}
                                                    <td><a href="#" className="link-primary">{BookList.bookID}</a></td>
                                                    <td>{BookList.bookName}</td>
                                                    <td>{BookList.bookNumber}
                                                    </td>
                                                    <td>{BookList.publisher}</td>
                                                    <td> {BookList.author}</td>
                                                    <td> {BookList.subject}</td>
                                                    <td> {BookList.rackNo}</td>
                                                    <td> {BookList.quantity}</td>
                                                    <td> {BookList.availability ? "Available" : "Not Available"}</td>
                                                    <td> {BookList.price}</td>
                                                    <td>{BookList.postDate}</td>
                                                    <td>
                                                        <button className="btn btn-primary ti ti ti-refresh" onClick={() => handlerecoverid(BookList._id)}></button>
                                                        <button className="btn ms-2 btn-danger ti ti ti-trash" onClick={() => handledelete1(BookList._id)}></button>
                                                    </td>

                                                </tr>
                                            )}

                                        </tbody>
                                    </table>
                                </div>
                                {/* <!-- /Student List --> */}
                            </div>
                        </div>
                        {/* <!-- /Students List --> */}

                    </div>
                </div>
            </div>

        </>
    )
}

export default BookListTrash