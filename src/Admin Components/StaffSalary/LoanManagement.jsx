import { React, useState } from 'react'
import Json from './manageSalaries.json'

const LoanManagement = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    const totalPages = Math.ceil(Json.length / itemsPerPage);
    const CurrentItem = Json.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) setCurrentPage(page);
    };
    const [form, setForm] = useState(false);

    return (
        <>
            <div className="container-fluid container-p-y">
                <h4 className="fw-bold py-3"><span className="text-muted fw-light">Dashboard /</span> Loan Management</h4>
                <div className='ps-2 py-2 border rounded' style={{ color: '#fff', backgroundColor: '#013473', fontSize: '19px' }}>
                    <i className="fa fa-arrow-circle-o-right me-2" aria-hidden="true"></i>Loan Management
                </div>
                <div className="bg-light  mx-2 pb-3  pt-3 ">
                    <div className="row mb-2 p-3 pb-4">
                        {/* Items Per Page Selector */}
                        <div className="col-12 col-sm-4 col-md-2 mb-3 mb-sm-0">
                            <label>
                                <select
                                    className="form-select"
                                    value={itemsPerPage}
                                    onChange={(e) => {
                                        setItemsPerPage(Number(e.target.value));
                                        setCurrentPage(1); // Reset to first page
                                    }}
                                >
                                    <option value="5">5</option>
                                    <option value="10">10</option>
                                    <option value="20">20</option>
                                </select>
                            </label>
                        </div>

                        {/* Buttons */}
                        <div className="manage col-12 col-sm-8 col-md-6 mb-3 mb-sm-0">
                            <div className="row gx-1 gy-2"> {/* Add spacing with gx (horizontal gap) and gy (vertical gap) */}
                                <button className="col-6 col-lg-2  col-sm-3 btn btn-success mx-1 px-1">
                                    <i className="fa fa-file-excel-o" aria-hidden="true"></i> Excel
                                </button>
                                <button className="col-6 col-lg-2 col-sm-3 btn btn-warning mx-1 px-1">
                                    <i className="fa fa-file-word-o" aria-hidden="true"></i> CVS
                                </button>
                                <button className="col-6 col-lg-2 col-sm-3 btn btn-danger mx-1 px-1">
                                    <i className="fa fa-file-pdf-o" aria-hidden="true"></i> PDF
                                </button>
                                <button className="col-6 col-lg-2 col-sm-3 btn btn-primary mx-1 px-1">
                                    <i className="fa fa-print" aria-hidden="true"></i> Print
                                </button>
                            </div>
                        </div>


                        {/* Search Bar */}
                        <div className="col-12 col-md-4">
                            <label htmlFor="">Search:</label>
                            <input type="search" className='border rounded  py-2' placeholder=' Type here to Search' />
                        </div>
                    </div>

                    {/* dummy */}
                    {/* Student List */}
                    <div className="mx-2">
                        <div className=" border table-responsives text-nowrap student-attend pb-3" >
                            <table className=" mx-auto table table-stripedd table-striped text-center px-3">
                                <thead>
                                    <tr className="table-headd align-text-top ">
                                        <th>ID</th>
                                        <th>Photo</th>
                                        <th>Teacher</th>
                                        <th>Requested Amount</th>
                                        <th>Approved Amount</th>
                                        <th>Installments</th>
                                        <th>Repaid Amount</th>
                                        <th>Remaining Amount</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        CurrentItem.map(v => (
                                            <tr key={v.id}>
                                                <td>{v.id}</td>
                                                <td><img width={'30px'} className='rounded-circle ' src={v.photo} alt="" /></td>
                                                <td>{v.name}</td>
                                                <td>1000</td>
                                                <td>1000</td>
                                                <td>3</td>
                                                <td>0</td>
                                                <td>5000</td>
                                                <td>  <button className='btn btn-success px-1 py-1 w-100 ' data-bs-toggle="modal" data-bs-target="#modalCenter01" style={{ fontSize: '13px' }} >Approved</button> </td>
                                                <td> <button className='btn btn-danger px-1 py-1 w-100 ' data-bs-toggle="modal" data-bs-target="#modalCenter01" style={{ fontSize: '13px' }} >Active</button> </td>
                                            </tr>
                                        ))
                                    }

                                </tbody>
                            </table>
                            {/* Pagination Controls */}
                            <div style={{ marginTop: "1rem" }}>
                                <button className='btn btn-secondary px-2 py-1 me-2 '
                                    disabled={currentPage === 1}
                                    onClick={() => handlePageChange(currentPage - 1)}
                                >
                                    <i className="tf-icon bx bx-chevrons-left"></i>
                                </button>
                                <span>
                                    <button className="btn btn-primary px-3 py-1 me-2">{currentPage} </button>
                                    <button className="btn btn-primary px-3 py-1 me-2"> {totalPages}</button>

                                </span>
                                <button className='btn btn-secondary px-2 py-1 me-2'
                                    disabled={currentPage === totalPages}
                                    onClick={() => handlePageChange(currentPage + 1)}
                                >
                                    <i className="tf-icon bx bx-chevrons-right"></i>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Save Button */}
                    {/* <button className="btn btn-primary mb-4 mt-4  ">Save Attendance</button> */}



                </div>
            </div >

        </>
    )
}

export default LoanManagement
