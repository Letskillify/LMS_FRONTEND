import React from 'react'
import { Link } from 'react-router-dom'

function StudentReport() {
    function handler() {
        let ele = document.getElementById('hide');
        ele.classList.contains("hide") ? ele.classList.remove("hide") : id.classList.add("hide");
    }
    function PrintHandler() {
        const prtContent = document.getElementById('reportSheet').innerHTML;
        const WinPrint = window.open('', '', 'left=0,top=0,width=1000,height=900,toolbar=0,scrollbars=0,status=0');
    
        if (WinPrint) {
          WinPrint.document.write(`
            <html>
              <head>
                <title>Print Attendance Sheet</title>
                <style>
                  body {
                    font-family: Arial, sans-serif;
                    text-align: center;
                  }
                  .table-report {
                    width: 100%;
                    border-collapse: collapse;
                  }
                  .table-report th, .table-report td {
                    border: 1px solid #000;
                    padding: 5px;
                    text-align: center;
                  }
                  .table-report th {
                    background-color: #f2f2f2;
                  }
                </style>
              </head>
              <body>
                ${prtContent}
              </body>
            </html>
          `);
          WinPrint.document.close();
          WinPrint.focus();
          
          setTimeout(() => {
            WinPrint.print();
            WinPrint.close();
          }, 1000); // Delay to ensure content loads before printing
        }
      }


    return (
        <>
            <div className="container-fluid container-p-y">
                <h4 className="fw-bold py-3  "><span className="text-muted fw-light">Dashboard /</span> Manage Accountant</h4>
                <div className='ps-2 py-2 border rounded' style={{ color: '#fff', backgroundColor: '#013473', fontSize: '19px' }}>
                    <i className="fa fa-arrow-circle-o-right me-2" aria-hidden="true"></i>Student Attendance Report
                </div>
                <div className="d-flex justify-content-between mt-3">
                    <div className="">
                        <label htmlFor="campus"> Campus</label><br />
                        <select name="campus" id="camp" className='py-2 pe-5  form-select' >
                            <option selected>Open this select menu</option>
                            <option name="campus">Main Campus</option>
                            <option name="campus">Outer Campus</option>
                            <option name="campus">Inner Campus</option>
                        </select>
                    </div>
                    <div className="">
                        <label htmlFor="Class"> Class</label><br />
                        <select name="Class" id="camp" className='py-2 pe-5  form-select' >
                            <option selected>Select Class</option>
                            <option name="Class">10</option>
                            <option name="Class">11</option>
                            <option name="Class">12</option>
                        </select>
                    </div>
                    <div className="">
                        <label htmlFor="section"> Section</label><br />
                        <select name="section" id="camp" className='py-2 pe-5  form-select' >
                            <option selected>Select Class First</option>
                            <option name="section">Main Campus</option>
                            <option name="section">Outer Campus</option>
                            <option name="section">Inner Campus</option>
                        </select>
                    </div>
                    <div className="">
                        <label htmlFor="type"> Month</label><br />
                        <select name="type" id="type" className='py-2 pe-5  form-select' >
                            <option selected>Open this select menu</option>
                            <option name="type">Front side</option>
                            <option name="type">Back side</option>
                            <option name="type">Both side</option>
                        </select>
                    </div>
                    <div className="">
                        <label htmlFor="type"> Year</label><br />
                        <select name="type" id="type" className='py-2 pe-5  form-select' >
                            <option selected>Open this select menu</option>
                            <option name="type">Front side</option>
                            <option name="type">Back side</option>
                            <option name="type">Both side</option>
                        </select>
                    </div>

                    <div className="">
                        <Link onClick={handler} className='mt-4 px-4 me-2 btn btn-success' >Filter Data </Link>
                    </div>

                </div>
                <div className='hide' id='hide'>
                    <div className="text-center bg-light my-3 py-5 boxes px-2" id='reportSheet'>
                        <img src="/image/school-logo.png" alt="" width={'100px'} />
                        <h3>DEMO SCHOOL</h3>
                        <span>Attendance Sheet</span><br />
                        <span>Campus: Main Campus</span><br />
                        <span>Class: One</span><br />
                        <span>Section: A</span><br />
                        <span>July, 2024</span><br />

                        <table className='table-report mt-2'>
                            <thead>
                                <tr>
                                    <th className='studentTable'>Roll</th>
                                    <th className='studentTable'>Students</th>
                                    <th className='studentTable'>Parent <i className="fa fa-long-arrow-down" aria-hidden="true"></i> &nbsp; Date <i className="fa fa-long-arrow-right" aria-hidden="true"></i></th>
                                    {Array.from({ length: 31 }, (_, i) => (
                                        <th className='studentTable' key={i}>{i + 1}</th>
                                    ))}
                                    <th className='studentTable'>Present Days</th>
                                    <th className='studentTable'>Absent Days</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className='studentTable'>ST123456</td>
                                    <td className='studentTable'>Radhe</td>
                                    <td className='studentTable'>we</td>
                                    {Array.from({ length: 31 }, (_, i) => (
                                        <td className='studentTable' key={i}></td>
                                    ))}
                                    <td className='studentTable'></td>
                                    <td className='studentTable'></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="text-center"><button className='btn btn-danger' onClick={PrintHandler} >Print Attendance Sheet <i className='fa fa-search'></i></button></div>
                </div>
            </div>

        </>
    )
}

export default StudentReport
