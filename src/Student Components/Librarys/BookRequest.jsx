import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { getCommonCredentials } from '../../GlobalHelper/CommonCredentials'

const BookRequest = () => {
    const [libraryDetail, setLibraryDetail] = useState([])

    const { userId } = getCommonCredentials();

    function HandlelibraryDetail() {
        axios.get(`/api/student/${userId}/books-issued`).then(res => setLibraryDetail(res?.data?.booksIssued)
        ).catch(err => console.log(err))
    }
    useEffect(() => {
        HandlelibraryDetail()
    }, [])
    return (
        <div className="page-wrapper container mt-5">
            <div className='content'>
                <div className="card-header flex-wrap pb-0">
                    <h4 className="mb-3 border p-3 px-3 bg-light fw-bold text-dark rounded text-center">Books Requests</h4>
                </div>
                {/* <!-- Request List --> */}
                <div className="card">
                    <div className="card-header d-flex align-items-center justify-content-between flex-wrap pb-0 bg-dark ">
                        <h4 className="mb-3 text-white">Requested Books</h4>
                        <div className="d-flex align-items-center flex-wrap">
                        </div>
                    </div>
                    <div className="card-body p-0">

                        <div className="custom-datatable-filter table-responsive">
                            <table className="table datatable">
                                <thead className="thead-light">
                                    <tr>

                                        <th>ID</th>
                                        <th>Book Name</th>
                                        <th>Publisher</th>
                                        <th>Author</th>
                                        <th>Subject</th>
                                        <th>Qty</th>
                                        <th>Price</th>
                                        <th>Post Date</th>
                                        <th>Request Status</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {libraryDetail?.map((RequestDtl, index) => (
                                        <tr key={index}>
                                            <td><a href="#" className="link-primary">{RequestDtl?.transactionID?.bookID?.bookID}</a></td>
                                            <td>{RequestDtl?.transactionID?.bookID?.bookName}</td>
                                            <td>{RequestDtl?.transactionID?.bookID?.publisher}</td>
                                            <td>{RequestDtl?.transactionID?.bookID?.author}</td>
                                            <td>{RequestDtl?.transactionID?.bookID?.subject}</td>
                                            <td>{RequestDtl?.transactionID?.bookID?.quantity}</td>
                                            {/* <td>{book.availability ? "Available" : "Not Available"}</td> */}
                                            <td>₹{RequestDtl?.transactionID?.bookID?.price}</td>
                                            <td>{RequestDtl?.transactionID?.bookID?.postDate ? new Date(RequestDtl?.transactionID?.bookID?.postDate)?.toISOString().split("T")[0] : ""}</td>
                                            <td className={`fw-bold text-center ${RequestDtl?.transactionID?.status === "Issued" ? "text-success" : "text-danger"}`}>{RequestDtl?.transactionID?.status}</td>
                                        </tr>
                                    ))}



                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                {/* <!-- /Request List --> */}
            </div>
        </div>
    )
}

export default BookRequest
