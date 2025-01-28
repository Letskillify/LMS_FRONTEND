import React from 'react'

const SalaryLoanReport = () => {
    return (
        <>
            <div className="container-fluid container-p-y">
                <h4 className="fw-bold py-3"><span className="text-muted fw-light">Dashboard /</span> Loan Management</h4>
                <div className='ps-2 py-2 border rounded' style={{ color: '#fff', backgroundColor: '#013473', fontSize: '19px' }}>
                    <i className="fa fa-arrow-circle-o-right me-2" aria-hidden="true"></i>Loan Management
                </div>
                <div class="row mt-4">
                    <div class="col-md-3 col-sm-6 mb-4">
                        <div class="card bg-primary">
                            <div class="card-body pb-0">
                                <h2 class="card-title mb-2 text-white">10</h2>
                                <p class="text-white fw-semibold">Total Teachers</p>
                            </div>
                            <span className='btn text-center' style={{ color: '#fff', backgroundColor: '#4e51d2' }}>view Report</span>
                        </div>
                    </div>
                    <div class="col-md-3 col-sm-6 mb-4">
                        <div class="card bg-success">
                            <div class="card-body pb-0">
                                <h2 class="card-title mb-2 text-white">5</h2>
                                <p class="text-white fw-semibold">Present Today</p>
                            </div>
                            <span className='btn text-center' style={{ color: '#fff', backgroundColor: '#61ba31' }}>view Report</span>

                        </div>
                    </div>
                    <div class="col-md-3 col-sm-6 mb-4">
                        <div class="card bg-danger">
                            <div class="card-body pb-0">
                                <h2 class="card-title mb-2 text-white">3</h2>
                                <p class="text-white fw-semibold">Absent Today</p>
                            </div>
                            <span className='btn text-center' style={{ color: '#fff', backgroundColor: '#e2371a' }}>view Report</span>

                        </div>
                    </div>
                    <div class="col-md-3 col-sm-6 mb-4">
                        <div class="card bg-info">
                            <div class="card-body pb-0">
                                <h2 class="card-title mb-2 text-white">2</h2>
                                <p class="text-white fw-semibold">Leave Today</p>
                            </div>
                            <span className=' btn text-center' style={{ color: '#fff', backgroundColor: '#0aaddded' }}>view Report</span>
                        </div>
                    </div>


                </div>

                <div className="div mt-1 ">
                    <h5 style={{ color: 'darkgreen', backgroundColor: '#1899183b' }} className='py-4 ps-3 rounded-top'>Printable Attendance Reports</h5>
                    <ul className='row mx-2'>
                        <li className='col-6'>
                            <h5 className='d-inline-block my-4 me-3'>Unpaid Salaries Report</h5>
                            <button className='  btn-outline-primary borderColor'><i class="fa fa-print" aria-hidden="true"></i> Print </button> <br />
                            <p>List Unpaid Salaries from current campus.  </p>
                        </li>
                        <li className='col-6'>
                            <h5 className='d-inline-block my-4 me-3'>Loan Applications Report</h5>
                            <button className='  btn-outline-primary borderColor'><i class="fa fa-print" aria-hidden="true"></i> Print </button> <br />
                            <p>List all active loan applications. </p>
                        </li>
                        <li className='col-6'>
                            <h5 className='d-inline-block my-4 me-3'>Paid Salaries Report</h5>
                            <button className=' btn-outline-primary borderColor' ><i class="fa fa-print" aria-hidden="true"></i> Print </button> <br />
                            <p>List of all paid salaries from current month. </p>
                        </li>
                        <li className='col-6'>
                            <h5 className='d-inline-block my-4 me-3'>Loan Defaulter Teachers</h5>
                            <button className=' btn-outline-primary borderColor' ><i class="fa fa-print" aria-hidden="true"></i> Print </button> <br />
                            <p>List of all teachers having loan due amount. </p>
                        </li>
                        <li className='col-12'>
                            <hr />
                            <h6 className='d-inline-block'>Note:</h6>
                            <p className='d-inline-block'>Please ensure that all reports are printed in A4 size for optimal viewing. Adjust your printer setting Accordingly.</p>
                            <hr />
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default SalaryLoanReport
