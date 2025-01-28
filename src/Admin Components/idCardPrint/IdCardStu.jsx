import React from 'react'
import { useLocation } from 'react-router-dom';




function IdCardStu() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const id1 = queryParams.get('campus');
  const id2 = queryParams.get('type');
  const id3 = queryParams.get('class');
  console.log(id1);
  console.log(id2);
  console.log(id3);
  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <div className="container-fluid">
        <button className='btn btn-primary' onClick={handlePrint}>Print</button>
        <div className="d-flex">
          <div className=" border rounded m-2" style={{ height: "400px", width: '350px', backgroundImage: 'url("/image/card-bg.jpg")', backgroundSize: 'cover' }}>
            <div className="d-flex justify-content-center align-items-center flex-column">
              <img src="/image/school-logo.png" width={"100px"} alt="" />
              <h1>Student Id</h1>
              <img src="/image/stu-img.png" width={'100px'} className='border' style={{ borderRadius: "50%" }} alt="" /> <br />
              <img src="/image/barcode.png" alt="" width={'300px'} height={'100px'} />
            </div>
          </div>
          <div className=" border rounded m-2" style={{ height: "400px", width: '350px', backgroundImage: 'url("/image/card-bg.jpg")', backgroundSize: 'cover', backgroundPosition:'bottom' }}>
            <div className="d-flex  flex-column ms-5 ps-2 mt-5">
              <p>Campus: {id1}</p>
              <p>Class: {id3}</p>
              <p>Student ID: 01</p>
              <p>F. name: --</p>
              <p>Emergency Cony.: 0987654321</p>
              <br />
              <address>123, Shalimar building</address>
              <a href="mailto:xyz@gmail.com">xyz@gmail.com</a>
            </div>
          </div>
          <div className=" border rounded m-2" style={{ height: "400px", width: '350px', backgroundImage: 'url("/image/card-bg.jpg")', backgroundSize: 'cover' }}>
            <div className="d-flex justify-content-center align-items-center flex-column">
              <img src="/image/school-logo.png" width={"100px"} alt="" />
              <h1>Student Id</h1>
              <img src="/image/stu-img.png" width={'100px'} className='border' style={{ borderRadius: "50%" }} alt="" /> <br />
              <img src="/image/barcode.png" alt="" width={'300px'} height={'100px'} />
            </div>
          </div>
          <div className=" border rounded m-2"  style={{ height: "400px", width: '350px', backgroundImage: 'url("/image/card-bg.jpg")', backgroundSize: 'cover', backgroundPosition:'bottom' }}>
            <div className="d-flex  flex-column  ms-5 ps-2 mt-5">
              <p>Campus: ${id1}</p>
              <p>Class: ${id2}</p>
              <p>Student ID: 01</p>
              <p>F. name: --</p>
              <p>Emergency Cony.: 0987654321</p>
              <br />
              <address>123, Shalimar building</address>
              <a href="mailto:xyz@gmail.com" >xyz@gmail.com</a>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default IdCardStu;
