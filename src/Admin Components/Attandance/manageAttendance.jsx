import React from 'react'
import { Link } from 'react-router-dom'
function AttendanceReport() {
  return (
    <>
      <div className="container-fluid container-p-y">
        <h4 className="fw-bold py-3 mb-4 "><span className="text-muted fw-light">Dashboard /</span> Manage Accountant</h4>
        <div className="d-flex justify-content-between">
          <div style={{ height: '140px', width: '280px' }} className=" pt-3 p-0 bg-primary border rounded">
            <div>
              <h2 className='ps-3' style={{ color: '#fff' }}>10</h2>
              <h5 className='pt-0 ps-3' style={{ color: '#fff' }}>Present Staff Today</h5>
            </div><br />
            <div className='text-center  py-1 ' style={{ borderEndEndRadius: '8px', borderEndStartRadius: '8px', color: '#fff', backgroundColor: '#4f52e6' }}>View Report <i className="fa fa-arrow-circle-right" aria-hidden="true"></i></div>
          </div>
          <div style={{ height: '140px', width: '280px', color: '#fff' }} className="pt-3 p-0 bg-success border rounded">
            <div>
              <h2 className='ps-3' style={{ color: '#fff' }}>10</h2>
              <h5 className='pt-0 ps-3' style={{ color: '#fff' }}>Absent Staff Today</h5></div><br />
            <div className='text-center py-1  ' style={{ borderEndEndRadius: '8px', borderEndStartRadius: '8px', color: '#fff', backgroundColor: '#66cd2f' }}>View Report <i className="fa fa-arrow-circle-right" aria-hidden="true"></i></div>
          </div>
          <div style={{ height: '140px', width: '280px', color: '#fff' }} className="pt-3  bg-danger p-0 border rounded-3">
            <div className=''>
              <h2 className='ps-3' style={{ color: '#fff' }}>10</h2>
              <h5 className='pt-0 ps-3' style={{ color: '#fff' }}>Present Student Today</h5></div><br />
            <div className='text-center  py-1 ' style={{ borderEndEndRadius: '8px', borderEndStartRadius: '8px', color: '#fff', backgroundColor: '#ef0505' }}>View Report <i className="fa fa-arrow-circle-right" aria-hidden="true"></i></div>
          </div> 
          
          <div style={{ height: '140px', width: '280px', color: '#fff' }} className="pt-3  bg-danger p-0 border rounded-3">
            <div className=''>
              <h2 className='ps-3' style={{ color: '#fff' }}>10</h2>
              <h5 className='pt-0 ps-3' style={{ color: '#fff' }}>Absent Student Today</h5></div><br />
            <div className='text-center  py-1 ' style={{ borderEndEndRadius: '8px', borderEndStartRadius: '8px', color: '#fff', backgroundColor: '#ef0505' }}>View Report <i className="fa fa-arrow-circle-right" aria-hidden="true"></i></div>
          </div> 
        </div> 
        {/* section */}
        <div className="div mt-5 ">
          <h5 style={{color:'darkgreen',backgroundColor:'#1899183b'}} className='py-4 ps-3 rounded-top'>Printable Attendance Reports</h5>
        <ul className='row'>
          <li className='col-5'>
            <h5 className='d-inline-block my-4 me-3'>Student Attendance Sheet</h5> 
            <button className='  btn-outline-primary borderColor'><i class="fa fa-print" aria-hidden="true"></i> Print </button> <br />
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
          </li>
          <li className='col-5'>
            <h5 className='d-inline-block my-4 me-3'>Staff Attendance Sheet</h5> 
            <button className='  btn-outline-primary borderColor'><i class="fa fa-print" aria-hidden="true"></i> Print </button> <br />
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
          </li>
          <li className='col-5'>
            <h5 className='d-inline-block my-4 me-3'>Staff Attendance Summary</h5> 
            <button className=' btn-outline-primary borderColor' ><i class="fa fa-print" aria-hidden="true"></i> Print </button> <br />
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
          </li>
          <li className='col-5'>
            <h5 className='d-inline-block my-4 me-3'>Student Attendance Summary</h5> 
            <button className=' btn-outline-primary borderColor' ><i class="fa fa-print" aria-hidden="true"></i> Print </button> <br />
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
          </li>
          <li className='col-5'>
            <h5 className='d-inline-block my-4 me-3'>Subject/Lacture Attendance Summary</h5> 
            <button className=' btn-outline-primary borderColor' ><i class="fa fa-print" aria-hidden="true"></i> Print </button> <br />
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
          </li>
          <li className='col-5'>
            <h5 className='d-inline-block my-4 me-3'>Staff Hourly Attendance Summary</h5> 
            <button className=' btn-outline-primary borderColor' ><i class="fa fa-print" aria-hidden="true"></i> Print </button> <br />
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
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

export default AttendanceReport;
