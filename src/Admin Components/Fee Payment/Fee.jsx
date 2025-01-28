import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
const Fee = () => {
    const [input,setinput] = useState('');
    const navigate = useNavigate();

    const handleinputChange = (e) => {
        setinput(e.target.value);
    }
    const handleSearch = () => {
        navigate(`search?query=${encodeURIComponent(input)}`)
    }
    return (
        <>
            <div className='m-4'>
                <h4 className="fw-bold py-3"><span className="text-muted fw-light">Dashboard /</span> Fee Payment</h4>
                <div className="row">
                    <div className="col-md-3 col-sm-6 mb-4">
                        <div className="card bg-primary">
                            <div className="card-body">
                                <h2 className="card-title mb-2 text-white">10</h2>
                                <p className="text-white fw-semibold">Unpaid Invoices</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-6 mb-4">
                        <div className="card bg-success">
                            <div className="card-body">
                                <h2 className="card-title mb-2 text-white">5</h2>
                                <p className="text-white fw-semibold">Income Today</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-6 mb-4">
                        <div className="card bg-danger">
                            <div className="card-body">
                                <h2 className="card-title mb-2 text-white">3</h2>
                                <p className="text-white fw-semibold">Expenses Today</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-6 mb-4">
                        <div className="card bg-info">
                            <div className="card-body">
                                <h2 className="card-title mb-2 text-white">2</h2>
                                <p className="text-white fw-semibold">Balance Today</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col d-flex justify-content-between gap-2'>
                    <div className='col-lg-6' style={{ border: "4px solid #FFDE21", borderRadius: "10px" }}>
                        <div style={{ backgroundColor: "#FFDE21" }} className='p-3'>Search Student By Name/Code</div>
                        <div className="input-group input-group-merge m-auto mt-3" style={{ width: "400px" }}>
                            <span className="input-group-text"><i className="bx bx-search"></i></span>
                            <input type="text" className="form-control" placeholder="Search..." onChange={handleinputChange} value={input}/>
                            <button className='btn btn-success' onClick={handleSearch}>Search</button>
                        </div>
                        <img src="/image/scanner.png" alt="" style={{backgroundColor:"crimson",borderRadius:"100px",height:"200px",width:"200px", margin:"20px 0px 20px 30%"}} />
                        <h5 style={{textAlign:"center"}}>Scan Fee Slip For Quick Payment...!</h5>
                    </div>
                    <div className='col-lg-6' style={{ border: "4px solid #FFDE21", borderRadius: "10px" }}>
                        <div style={{ backgroundColor: "#FFDE21" }} className='p-3'>Search Student By Parent ID / CNIC</div>
                        <div className="input-group input-group-merge m-auto mt-3" style={{ width: "400px" }}>
                            <span className="input-group-text"><i className="bx bx-search"></i></span>
                            <input type="text" className="form-control" placeholder="Search..." />
                            <button className='btn btn-success'>Search</button>
                        </div>
                        <img src="/image/ID.avif" alt="" style={{backgroundColor:"crimson",borderRadius:"100px",height:"200px",width:"200px", margin:"20px 0px 20px 30%"}} />
                        <h5 style={{textAlign:"center"}}>Type Father CNIC's / Father ID to Filter All Connected Students...!</h5>
                    </div>
                </div>
                <div className='FeeUpdates mt-3 ' style={{border:"4px solid lightgreen",borderRadius:"20px"}}>
                    <div className='p-3' style={{ backgroundColor: "lightgreen",borderRadius:"10px",fontSize:"17px" }}>
                        Latest Payments
                    </div>
                    <div className="table-responsive text-nowrap">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Roll</th>
                                    <th>Student</th>
                                    <th>Title</th>
                                    <th>Paid</th>
                                    <th>Late</th>
                                    <th>Date</th>
                                    <th>Accountant</th>
                                </tr>
                            </thead>
                            <tbody className="table-border-bottom-0">
                                <tr>
                                    <td>096654</td>
                                    <td>
                                        <span className="d-flex align-items-center fw-bold">
                                            Ankush Sharma
                                        </span>
                                    </td>
                                    <td>Monthly Fees of July</td>
                                    <td>56000</td>
                                    <td><div style={{backgroundColor:"red",height:"10px",width:"10px",borderRadius:"20px"}}></div></td>
                                    <td>27-07-2024 11:02:12 A.M </td>
                                    <td>Admin</td>
                                </tr>
                                <tr>
                                    <td>096654</td>
                                    <td>
                                        <span className="d-flex align-items-center fw-bold">
                                            Ankush Sharma
                                        </span>
                                    </td>
                                    <td>Monthly Fees of January</td>
                                    <td>10000</td>
                                    <td><div style={{backgroundColor:"red",height:"10px",width:"10px",borderRadius:"20px"}}></div></td>
                                    <td>27-07-2024 11:02:12 A.M </td>
                                    <td>SuperAdmin</td>
                                </tr><tr>
                                    <td>096654</td>
                                    <td>
                                        <span className="d-flex align-items-center fw-bold">
                                            Ankush Sharma
                                        </span>
                                    </td>
                                    <td>Monthly Fees of Feb</td>
                                    <td>12000</td>
                                    <td><div style={{backgroundColor:"red",height:"10px",width:"10px",borderRadius:"20px"}}></div></td>
                                    <td>27-07-2024 11:02:12 A.M </td>
                                    <td>SuperAdmin</td>
                                </tr><tr>
                                    <td>096654</td>
                                    <td>
                                        <span className="d-flex align-items-center fw-bold">
                                            Ankush Sharma
                                        </span>
                                    </td>
                                    <td>Monthly Fess of March</td>
                                    <td>23456</td>
                                    <td><div style={{backgroundColor:"red",height:"10px",width:"10px",borderRadius:"20px"}}></div></td>
                                    <td>27-07-2024 11:02:12 A.M </td>
                                    <td>SuperAdmin</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>

        </>
    )
}

export default Fee
