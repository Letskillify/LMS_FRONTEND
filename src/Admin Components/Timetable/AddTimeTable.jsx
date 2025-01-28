import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
const TimetableManagement = () => {

    const [Camp, setCamp] = useState('')
    const [cls, setCls] = useState('');
    const [section, setSection] = useState('')
    function CampChangeHandler(e) {
        setCamp(e.target.value);
    }

    function ClsHandler(e) {
        setCls(e.target.value);
    }
    console.log(cls);
    console.log(section);

    function SectionHandler(e) {
        setSection(e.target.value);
    }
    function hiddenHandler() {
        let ele = document.getElementById("hide");
        // id.classList.contains("open") ? id.classList.remove("open") : id.classList.add("open")
        // ele.classList.contains('hide') ? ele.classList.remove('hide') : ele.classList.add('hide')
        ele.classList.contains("hide") ? ele.classList.remove("hide") : id.classList.add("hide");
    }
    return (
        <>
            <div className="container-fluid container-p-y">
                <h4 className="fw-bold py-3 mb-4"><span className="text-muted fw-light">Dashboard /</span> Manage Timetable</h4>
                <div className='mt-4 ps-2 py-2 border rounded' style={{ color: '#fff', backgroundColor: '#013473', fontSize: '19px' }}>
                    <i className="fa fa-arrow-circle-o-right me-2" aria-hidden="true"></i>Manage Timetable
                </div>
                <div className="row mx-1 py-5  bg-light ">
                    <div className="col-12 col-md-3 col-sm-6">
                        <label htmlFor="campus"> Campus</label><br />
                        <select name="campus" id="camp" className='py-2 pe-5  form-select' onChange={CampChangeHandler}>

                            <option name="campus">Main Campus</option>
                            <option name="campus">Outer Campus</option>
                            <option name="campus">Inner Campus</option>
                        </select>
                    </div>
                    <div className="col-12 col-md-3 col-sm-6">
                        <label htmlFor="staffType">Class</label><br />
                        <select name="staffType" id="staffType" className='py-2 pe-5 form-select' onChange={ClsHandler}>

                            <option name="staffType">One</option>
                            <option name="staffType">Two</option>
                            <option name="staffType">Three</option>
                        </select>
                    </div>
                    <div className="col-12 col-md-3 col-sm-6">
                        <label htmlFor="cardType"> Section</label><br />
                        <select name="cardType" id="cardType" className='py-2 pe-5  form-select' onChange={SectionHandler}>

                            <option name="cardType">A</option>
                            <option name="cardType">B</option>
                            <option name="cardType">C</option>
                        </select>
                    </div>

                    <div className="col-12 col-md-3 col-sm-6 ">
                        <button className='mt-4 px-4 me-2 btn btn-success' onClick={hiddenHandler} >Filter Data </button>
                    </div>
                </div>

                <div className="hide" id='hide'>
                    <div className='mt-4 ps-2 py-2 border rounded' style={{ color: '#fff', backgroundColor: '#013473', fontSize: '19px' }}>
                        <i className="fa fa-arrow-circle-o-right me-2" aria-hidden="true"></i>Timetable for Class - {cls} : Section - {section}
                    </div>
                    <div className="table">
                        <table border={1}>     
                                <tr >
                                    <th>Monday</th>
                                    <td><button  className=' bg-secondary text-light'>English (7:00-9:00)</button> </td>
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
                                    <th>Tuesday</th>
                                    <td></td>
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
                                    <th>Wednesday</th>
                                    <td></td>
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

                                    <th>Thursday</th>
                                    <td></td>
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
                                    <th>Friday</th>
                                    <td></td>
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
                                    <th>Saturday</th>
                                    <td></td>
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
                                    <th>Sunday</th>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
 
                        </table>
                    </div>
                </div>

            </div>
        </>
    )
}
export default TimetableManagement
