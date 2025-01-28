import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { MainContext } from '../../Controller/MainProvider';

function Accountant() {
    const data = Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        name: `Item ${i + 1}`,
        value: `Value ${i + 1}`,
    }));

    const {HandleLogOut} = useContext(MainContext)
    return (
        <>
            <div className="container-fluid container-p-y">
                <h4 className="fw-bold py-3 mb-3 "><span className="text-muted fw-light">Dashboard /</span> Accountant</h4>
                <div className="acc-resp d-flex justify-content-between flex-wrap" >
                    <div style={{ height: '130px', width: '240px' }} className="acc-inner pt-3 p-0 bg-primary border rounded">
                        <div>
                            <h2 className='ps-3' style={{ color: '#fff' }}>10</h2>
                            <h5 className='pt-0 ps-3' style={{ color: '#fff' }}>Total Accountants</h5>
                        </div>
                        <div className="text-center py-2 mt-3 rounded-bottom"
                            style={{ fontSize: '14px', color: '#fff', backgroundColor: '#4f52e6' }}>
                            View Report <i className="fa fa-arrow-circle-right" aria-hidden="true"></i>
                        </div>
                    </div>
                    <div style={{ height: '130px', width: '240px', color: '#fff' }} className="acc-inner pt-3 p-0 bg-success border rounded">
                        <div>
                            <h2 className='ps-3' style={{ color: '#fff' }}>10</h2>
                            <h5 className='pt-0 ps-3' style={{ color: '#fff' }}>Restricted Accountants</h5></div>
                        <div className="text-center py-2 mt-3 rounded-bottom"
                            style={{ fontSize: '14px', color: '#fff', backgroundColor: '#67b93c' }}>
                            View Report <i className="fa fa-arrow-circle-right" aria-hidden="true"></i>
                        </div>
                    </div>
                    <div style={{ height: '130px', width: '240px', color: '#fff' }} className="acc-inner-lasts acc-inner pt-3  bg-danger p-0 border rounded">
                        <div className=''>
                            <h2 className='ps-3' style={{ color: '#fff' }}>10</h2>
                            <h5 className='pt-0 ps-3' style={{ color: '#fff' }}>Restricted Accountants</h5></div>
                        <div className="text-center py-2 mt-3 rounded-bottom"
                            style={{ fontSize: '14px', color: '#fff', backgroundColor: '#b93721' }}>
                            View Report <i className="fa fa-arrow-circle-right" aria-hidden="true"></i>
                        </div>
                    </div>
                    <div className="acc-inner acc-inner-last d-flex justify-content-between flex-column" style={{ color: '#fff', width: '250px' }}>
                        <p style={{ direction: 'rtl', fontSize: '14px', cursor: 'pointer' }} className='mb-0 border rounded-1 pe-1 py-1 bg-danger' data-bs-toggle="modal" data-bs-target="#modalCenter0">Add New Accountant &nbsp;<i className="fa fas fa-solid fa-plus"></i></p>
                        <p style={{ direction: 'rtl', fontSize: '14px', cursor: 'pointer' }} className='mb-0 border rounded-1 pe-1 py-1 bg-primary'>Accountants Settlement Overview &nbsp;<i className="fa fa-clock-o"></i></p>
                        <p style={{ direction: 'rtl', fontSize: '14px', cursor: 'pointer' }} className='mb-0 border rounded-1 pe-1 py-1 bg-warning' data-bs-toggle="modal" data-bs-target="#modalCenter1">Today's Balancesheet &nbsp;<i className="fa fa-clock-o"></i></p>
                    </div>
                </div>
                {/* Add new Acountant */}
                <div className="modal fade" id="modalCenter0" tabIndex="-1" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered manage-xl" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="modalCenterTitle">Demo School</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="nav-align-top mb-4">
                                    <h2 className='py-3 ps-3 mb-0' style={{ color: '#fff', fontSize: '15px', backgroundColor: '#8e8d8dba'}}><i className="fa fa-plus-circle" aria-hidden="true"></i> Add Accountant </h2>                                    <div className="table-responsive text-nowrap">
                                        <table className="table-reports table table-striped ">

                                            <tbody className="table-border-bottom-0">
                                                <tr>
                                                    <td>Name</td>
                                                    <td className='text-end'>
                                                        <input type="text" name="" className='inpt ps-2' placeholder='Enter your name ' id="" />
                                                    </td>

                                                </tr>
                                                <tr>
                                                    <td >Email</td>
                                                    <td className="text-end">
                                                        <input type="email" className='ps-2 inpt' placeholder='Enter your email' />
                                                    </td>

                                                </tr>
                                                <tr>
                                                    <td >Campus</td>
                                                    <td className="text-end">
                                                        <select name="stuAdd" id="">
                                                            <option value="">Main Campus</option>
                                                            <option value="">Main Campus</option>
                                                        </select>
                                                    </td>

                                                </tr>
                                                <tr>
                                                    <td >Password</td>
                                                    <td className='text-end'>
                                                        <input type="password" className='ps-2 inpt' name="" id="" placeholder='Enter your password' />
                                                    </td>

                                                </tr>

                                            </tbody>
                                        </table>
                                        <div className="text-center mb-3">
                                            <button className='btn btn-success'>Add Accountant <i className="fa fa-thumbs-up" aria-hidden="true"></i></button>
                                        </div>
                                    </div>

                                </div>
                                <div className='text-end'>
                                    <button className='btn btn-secondary ' data-bs-dismiss="modal" aria-label="Close">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Today's Balancesheet */}
                <div className="modal fade" id="modalCenter1" tabIndex="-1" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered modal-xl" role="document">
                        <div className="modal-content">
                            <div className="modal-header pt-4">
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="text-center">
                                <div className="d-flex justify-content-between">
                                    <img className='logo-balance' src="/image/school-logo.png" alt="" />
                                    <h5 className="mid" >Demo School</h5>
                                    <img className='logo-balance' src="/image/school-logo.png" alt="" />
                                </div>
                                <a>Dummy address: +91000 </a>
                                <h5 className=''>Accountants BalanceSheet</h5>
                            </div>
                            <div className="modal-body">
                                <div className="nav-align-top mb-4">
                                    <div className="table-responsive text-nowrap">
                                        <table className='table1 '>
                                            <thead>
                                                <tr>
                                                    <th>For Date</th>
                                                    <th>Campus</th>
                                                    <th>Accountant</th>
                                                    <th>Print Date</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>01-01-2024</td>
                                                    <td>Main Campus</td>
                                                    <td>aaa</td>
                                                    <td>01-01-24 22:07:24</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <table className="mt-3 table table2 table-striped">
                                            <thead>
                                                <tr>
                                                    <th>St. Roll</th>
                                                    <th>Name</th>
                                                    <th>Class</th>
                                                    <th>Payment Title</th>
                                                    <th>Amount</th>
                                                    <th>Expense Id</th>
                                                    <th>Expense Title</th>
                                                    <th>Amount</th>
                                                </tr>
                                            </thead>
                                            <tbody className="table-border-bottom-0">
                                                <tr>
                                                    <td>Password</td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                </tr>

                                            </tbody>
                                        </table>
                                        <div className="text-center">
                                            <button className='btn btn-success'>Today's Balancesheet &nbsp;<i className="fa fa-thumbs-up" aria-hidden="true"></i></button>
                                        </div>
                                    </div>

                                </div>
                                <div className='text-end'>
                                    <button className='btn btn-secondary ' data-bs-dismiss="modal" aria-label="Close">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='mt-4 ps-2 py-2 border rounded' style={{ color: '#fff', backgroundColor: '#013473', fontSize: '19px' }}>
                    <i className="fa fa-arrow-circle-o-right me-2" aria-hidden="true"></i>Manage Accountants
                </div>
                <div>
                    <div className='mt-2 p-2' style={{ backgroundColor: '#fff', boxShadow: '0px 1px 3px #d2caca' }}>
                        <div className='d-flex justify-content-between mb-2' >
                            <div className=" ">
                                <select className='p-1  mt-2' style={{ fontSize: '14px', border: '1px solid grey' }}>
                                    <option value="1">01</option>
                                    <option value="2">02</option>
                                    <option value="3">03</option>
                                </select>
                            </div>
                            <div className="manage d-flex justify-content-between mt-2">
                                <div className='me-3 mt-1 '>
                                    <span style={{ fontSize: '14px' }} className='bg-success'><i className="fa fa-file-excel-o" aria-hidden="true"></i> Excel</span>
                                    <span style={{ fontSize: '14px' }} className='bg-warning'><i className="fa fa-file-word-o" aria-hidden="true"></i> CVS</span>
                                    <span style={{ fontSize: '14px' }} className='bg-danger'><i className="fa fa-file-pdf-o" aria-hidden="true"></i> PDF</span>
                                    <span style={{ fontSize: '14px' }} className='bg-primary'><i className="fa fa-print" aria-hidden="true"></i> Print</span>
                                </div>
                                <div className='inner me-2 mb-1 '>
                                    <label htmlFor="" style={{ fontSize: '15px' }}>Search:</label><input type="search" placeholder='Search' name="" id="" />
                                </div>
                            </div>
                        </div>
                        <div className="table-responsive">
                            <table className="table-th">
                                <thead>
                                    <tr>
                                        <th className="py-1">Acc. ID</th>
                                        <th className="py-1">Photo</th>
                                        <th className="py-1">Name</th>
                                        <th className="py-1">Email</th>
                                        <th className="py-1">Campus</th>
                                        <th className="py-1">App Login</th>
                                        <th className="py-1">Web Login</th>
                                        <th className="py-1">Password</th>
                                        <th className="py-1">Permissions</th>
                                        <th className="py-1">Options</th>
                                    </tr>
                                </thead>
                                <tbody className='mt-3'>
                                    <tr>
                                        <td>&nbsp;&nbsp;1</td>
                                        <td><img src="..." alt="stu" /></td>
                                        <td>aaa</td>
                                        <td>example@123</td>
                                        <td>Main Campus</td>
                                        <td>
                                            <input type="checkbox" id="checkbox1" className="inputs" />
                                            <label htmlFor="checkbox1" className="labels"></label>
                                        </td>
                                        <td>
                                            <input type="checkbox" id="checkbox2" className="inputs" />
                                            <label htmlFor="checkbox2" className="labels"></label>
                                        </td>
                                        <td>
                                            <button className="btn1 p-1 px-2">
                                                Reset Password <i className="ps-1 fa fa-key" aria-hidden="true"></i>
                                            </button>
                                        </td>
                                        <td>
                                            <button className="btn2 p-1 px-2" data-bs-toggle="modal" data-bs-target="#modalCenter">
                                                Permission <i className="ps-1 fa fa-lock" aria-hidden="true"></i>
                                            </button>
                                        </td>
                                        <td>
                                            <button className="btn3 p-1 px-2">
                                                Active <i className="ps-1 fa fa-sort-desc" aria-hidden="true"></i>
                                            </button>
                                        </td>
                                    </tr> <tr>
                                        <td>&nbsp;&nbsp;2</td>
                                        <td><img src="..." alt="stu" /></td>
                                        <td>aaa</td>
                                        <td>example@123</td>
                                        <td>Main Campus</td>
                                        <td>
                                            <input type="checkbox" id="checkbox1" className="inputs" />
                                            <label htmlFor="checkbox1" className="labels"></label>
                                        </td>
                                        <td>
                                            <input type="checkbox" id="checkbox2" className="inputs" />
                                            <label htmlFor="checkbox2" className="labels"></label>
                                        </td>
                                        <td>
                                            <button className="btn1 p-1 px-2">
                                                Reset Password <i className="ps-1 fa fa-key" aria-hidden="true"></i>
                                            </button>
                                        </td>
                                        <td>
                                            <button className="btn2 p-1 px-2" data-bs-toggle="modal" data-bs-target="#modalCenter">
                                                Permission <i className="ps-1 fa fa-lock" aria-hidden="true"></i>
                                            </button>
                                        </td>
                                        <td>
                                            <button className="btn3 p-1 px-2">
                                                Active <i className="ps-1 fa fa-sort-desc" aria-hidden="true"></i>
                                            </button>
                                        </td>
                                    </tr> <tr>
                                        <td>&nbsp;&nbsp;3</td>
                                        <td><img src="..." alt="stu" /></td>
                                        <td>aaa</td>
                                        <td>example@123</td>
                                        <td>Main Campus</td>
                                        <td>
                                            <input type="checkbox" id="checkbox1" className="inputs" />
                                            <label htmlFor="checkbox1" className="labels"></label>
                                        </td>
                                        <td>
                                            <input type="checkbox" id="checkbox2" className="inputs" />
                                            <label htmlFor="checkbox2" className="labels"></label>
                                        </td>
                                        <td>
                                            <button className="btn1 p-1 px-2">
                                                Reset Password <i className="ps-1 fa fa-key" aria-hidden="true"></i>
                                            </button>
                                        </td>
                                        <td>
                                            <button className="btn2 p-1 px-2" data-bs-toggle="modal" data-bs-target="#modalCenter">
                                                Permission <i className="ps-1 fa fa-lock" aria-hidden="true"></i>
                                            </button>
                                        </td>
                                        <td>
                                            <button className="btn3 p-1 px-2">
                                                Active <i className="ps-1 fa fa-sort-desc" aria-hidden="true"></i>
                                            </button>
                                        </td>
                                    </tr>
                                    {/* Additional rows can be added here */}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colSpan="10">
                                            <nav aria-label="Page navigation">
                                                <ul className="pagination mt-3">
                                                    <li className="page-item prev">
                                                        <a className="page-link" href="javascript:void(0);">
                                                            <i className="tf-icon bx bx-chevrons-left"></i>
                                                        </a>
                                                    </li>
                                                    <li className="page-item active">
                                                        <a className="page-link" href="javascript:void(0);">1</a>
                                                    </li>
                                                    <li className="page-item">
                                                        <a className="page-link" href="javascript:void(0);">2</a>
                                                    </li>
                                                    <li className="page-item">
                                                        <a className="page-link" href="javascript:void(0);">3</a>
                                                    </li>
                                                    <li className="page-item next">
                                                        <a className="page-link" href="javascript:void(0);">
                                                            <i className="tf-icon bx bx-chevrons-right"></i>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </nav>
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                    <div className="modal fade" id="modalCenter" tabIndex="-1" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered manage-xl" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="modalCenterTitle">Demo School</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <div className="nav-align-top mb-4">
                                        <div className="table-responsive text-nowrap">
                                            <table className="table table-striped">
                                                <thead>
                                                    <caption className='border' style={{ color: '#fff', fontSize: '15px', backgroundColor: '#8e8d8dba', width: '348%' }}><i className="fa fa-plus-circle" aria-hidden="true"></i> Manage Permission</caption>
                                                </thead>
                                                <tbody className="table-border-bottom-0">
                                                    <tr>
                                                        <td>Student Admission</td>
                                                        <td>
                                                            <select name="stuAdd" id="">
                                                                <option value="" >Yes</option>
                                                                <option value="" >No</option>
                                                            </select>
                                                        </td>

                                                    </tr>
                                                    <tr>
                                                        <td>Print Vouchers</td>
                                                        <td>
                                                            <select name="stuAdd" id="">
                                                                <option value="" >Yes</option>
                                                                <option value="" >No</option>
                                                            </select>
                                                        </td>

                                                    </tr>
                                                    <tr>
                                                        <td>Fee Defaulter SMS</td>
                                                        <td>
                                                            <select name="stuAdd" id="">
                                                                <option value="" >Yes</option>
                                                                <option value="" >No</option>
                                                            </select>
                                                        </td>

                                                    </tr>
                                                    <tr>
                                                        <td>Generate Monthly Fee</td>
                                                        <td>
                                                            <select name="stuAdd" id="">
                                                                <option value="" >Yes</option>
                                                                <option value="" >No</option>
                                                            </select>
                                                        </td>

                                                    </tr>
                                                    <tr>
                                                        <td>Generate Custom Fee</td>
                                                        <td>
                                                            <select name="stuAdd" id="">
                                                                <option value="" >Yes</option>
                                                                <option value="" >No</option>
                                                            </select>
                                                        </td>

                                                    </tr>
                                                    <tr>
                                                        <td>Generate Transport Fee</td>
                                                        <td>
                                                            <select name="stuAdd" id="">
                                                                <option value="" >Yes</option>
                                                                <option value="" >No</option>
                                                            </select>
                                                        </td>

                                                    </tr>
                                                    <tr>
                                                        <td>Family Credit System</td>
                                                        <td>
                                                            <select name="stuAdd" id="">
                                                                <option value="" >Yes</option>
                                                                <option value="" >No</option>
                                                            </select>
                                                        </td>

                                                    </tr>
                                                    <tr>
                                                        <td>Show Deleted Fees</td>
                                                        <td>
                                                            <select name="stuAdd" id="">
                                                                <option value="" >Yes</option>
                                                                <option value="" >No</option>
                                                            </select>
                                                        </td>

                                                    </tr>

                                                    <tr>
                                                        <td>Stock & Investary</td>
                                                        <td>
                                                            <select name="stuAdd" id="">
                                                                <option value="" >Yes</option>
                                                                <option value="" >No</option>
                                                            </select>
                                                        </td>

                                                    </tr>
                                                    <tr>
                                                        <td>Mobile App Login</td>
                                                        <td>
                                                            <select name="stuAdd" id="">
                                                                <option value="" >Yes</option>
                                                                <option value="" >No</option>
                                                            </select>
                                                        </td>

                                                    </tr>

                                                    <tr>
                                                        <td>Web Login</td>
                                                        <td>
                                                            <select name="stuAdd" id="">
                                                                <option value="" >Yes</option>
                                                                <option value="" >No</option>
                                                            </select>
                                                        </td>

                                                    </tr>
                                                </tbody>
                                            </table>
                                            <div className="text-center">
                                                <button className='btn btn-success'>Save Changes <i className="fa fa-thumbs-up" aria-hidden="true"></i></button>
                                            </div>
                                        </div>

                                    </div>
                                    <div className='text-end'>
                                        <button className='btn btn-secondary ' data-bs-dismiss="modal" aria-label="Close">Close</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="sessions d-flex justify-content-between">
                        <div className="">
                            <label htmlFor="session"> Running Session:</label>
                            <select className='p-1 session' style={{ fontSize: '16px', border: 'none', backgroundColor: 'transparent', color: 'grey' }}>
                                <option value="1">2024-25</option>
                                <option value="2">2024-25</option>
                                <option value="3">2024-25</option>
                            </select>
                        </div>
                        <div className="web d-flex">
                            <div>
                                <Link href="#" className='me-4'><i className="fa fa-globe" aria-hidden="true"></i> Website</Link>
                            </div>
                            <div>
                                <Link href="#" className='me-4'><i className="fa fa-user" aria-hidden="true"></i> Super Admin</Link>
                            </div>
                            <div>
                                <Link onClick={HandleLogOut} className='me-4'><i className="fa fa-sign-out" aria-hidden="true"></i> Log Out</Link>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </>
    )
}

export default Accountant
