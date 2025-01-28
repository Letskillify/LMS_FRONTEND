import React from 'react'

const StudentInfo = () => {
  return (
    <>
      <div className="container-fluid container-p-y">
        <h4 className="fw-bold py-3 mb-4"><span className="text-muted fw-light">Dashboard /</span> Student Info Report</h4>
        <div className="row">
          <div className="col-md-3 col-sm-6 mb-4">
            <div className="card bg-primary">
              <div className="card-body">
                <h2 className="card-title mb-2 text-white">10</h2>
                <p className="text-white fw-semibold">Total Teachers</p>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6 mb-4">
            <div className="card bg-success">
              <div className="card-body">
                <h2 className="card-title mb-2 text-white">5</h2>
                <p className="text-white fw-semibold">Present Today</p>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6 mb-4">
            <div className="card bg-danger">
              <div className="card-body">
                <h2 className="card-title mb-2 text-white">3</h2>
                <p className="text-white fw-semibold">Absent Today</p>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6 mb-4">
            <div className="card bg-info">
              <div className="card-body">
                <h2 className="card-title mb-2 text-white">2</h2>
                <p className="text-white fw-semibold">Leave Today</p>
              </div>
            </div>
          </div>
        </div>
        <div className="card mb-4">
          <div className="card-body">
            <div className="row">
              <div class="alert alert-success" role="alert" style={{fontSize:"20px"}}>
                Print Student Information
              </div>
              <div className="col">
                <button style={{ fontSize: "20px" }} type="button" className="btn btn-primary w-100 h-100">
                  <i className='bx bx-message-square-add me-1' ></i> All Active Students
                  <p>
                    List of all active students
                  </p>
                  <button type="button" className="btn btn-success ">Print</button>
                </button>
              </div>
              <div className="col">
                <button type="button" className="btn btn-success w-100" style={{ fontSize: "20px" }}>
                  <i className="bx bx-pie-chart-alt me-1"></i> All InActive Students
                  <p>
                    List of all active students
                  </p>
                  <button type="button" className="btn btn-danger ">Print</button>
                </button>
              </div>
              <div className="col">
                <button type="button" className="btn btn-danger w-100" style={{ fontSize: "20px" }}>
                  <i className="bx bx-pie-chart-alt me-1"></i> Class Wise Student
                  <p>
                    List of all active students
                  </p>
                  <button type="button" className="btn btn-success ">Print</button>
                </button>
              </div>
              <div className="col">
                <button type="button" className="btn btn-info w-100" style={{ fontSize: "20px" }}>
                  <i className="bx bx-money me-1"></i> All Passout Students
                  <p>
                    List of all active students
                  </p>
                  <button type="button" className="btn btn-danger ">Print</button>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="card">

        </div>
      </div>
    </>
  )
}

export default StudentInfo
