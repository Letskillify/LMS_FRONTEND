import React from 'react'

function StaffSalarySetting() {
    return (
        <>
            <div className="container-fluid container-p-y">
                <h4 className="fw-bold py-3 mb-2"><span className="text-muted fw-light">Dashboard /</span>Staff Salary Management / Staff Salary Generation </h4>
                <div className='mt-2 ps-2 py-2 border rounded' style={{ color: '#fff', backgroundColor: '#013473', fontSize: '19px' }}>
                    <i className="fa fa-arrow-circle-o-right me-2" aria-hidden="true"></i> Staff Salary Generation Settings
                </div>
                <div className="bg-light m-5  p-3">
                    <p className='pb-3 '>Note:These settings are only useful for monthly salaries, and will not affect subject/lecture wise or hourly salary generations.</p>
                    <form action="">
                        <div className="row  p-4 pt-2">
                            <div className="col-6 row">
                                <label className='col-4' htmlFor="arrival">Late Arrival Time:</label>
                                <div className='col-8'>
                                    <input className='col-12 form-control' type="time" value={'08:00'} /><br />
                                    <p>Mark as late arrival on attendance after this time</p>
                                </div>
                            </div>
                            <div className="col-6 row">
                                <label className='col-4' htmlFor="arrival"> Free Absents:</label>
                                <div className='col-8'>
                                    <input type="tel" className='col-12 form-control' name="" id="" value={1} />
                                    <br />
                                    <p>Do not deduct salary if absent are less or equal to this</p>
                                </div>
                            </div>
                            <div className="col-6 row">
                                <label className='col-4' htmlFor="arrival"> Free Absents:</label>
                                <div className='col-8'>
                                    <select className='col-12 form-select' name="" id="" value={1} >
                                        <option value="">Yes</option>
                                        <option value="">No</option>
                                    </select>
                                    <br />
                                    <p>Deduct Salary for the day if teacher is on leave</p>
                                </div>
                            </div>
                            <div className="text-center mt-4 pt-4 mb-5">
                                <button className="btn btn-primary ">Save Changes</button>
                            </div>

                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default StaffSalarySetting
