import React, { useRef, forwardRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useReactToPrint } from "react-to-print";

// Move the IDCard component outside the main component function
const IDCard = forwardRef((props, ref) => {
  return (
    <>
      <div  className="d-flex">
        <div className="border rounded m-2" style={{ height: "400px", width: '350px', backgroundImage: 'url("/image/card-bg.jpg")', backgroundSize: 'cover' }}>
          <div className="d-flex justify-content-center align-items-center flex-column">
            <img src="/image/school-logo.png" width={"100px"} alt="" />
            <h1>Staff Id</h1>
            <img src="/image/stu-img.png" width={'100px'} className='border' style={{ borderRadius: "50%" }} alt="" /> <br />
            <img src="/image/barcode.png" alt="" width={'300px'} height={'100px'} />
          </div>
        </div>

        <div className="border rounded m-2" style={{ height: "400px", width: '350px', backgroundImage: 'url("/image/card-bg.jpg")', backgroundSize: 'cover', backgroundPosition: 'bottom' }}>
          <div className="d-flex flex-column ms-5 ps-2 mt-5 pt-4">
            <br />
            <p>Campus: {props.id1}</p>
            <p>Staff ID: 01</p>
            <p>Emergency Cony.: 0987654321</p>
            <br />
            <address>123, Shalimar building</address>
            <a href="mailto:xyz@gmail.com">xyz@gmail.com</a>
          </div>
        </div>

        <div className="border rounded m-2" style={{ height: "400px", width: '350px', backgroundImage: 'url("/image/card-bg.jpg")', backgroundSize: 'cover' }}>
          <div className="d-flex justify-content-center align-items-center flex-column">
            <img src="/image/school-logo.png" width={"100px"} alt="" />
            <h1>Staff Id</h1>
            <img src="/image/stu-img.png" width={'100px'} className='border' style={{ borderRadius: "50%" }} alt="" /> <br />
            <img src="/image/barcode.png" alt="" width={'300px'} height={'100px'} />
          </div>
        </div>

        <div className="border rounded m-2" style={{ height: "400px", width: '350px', backgroundImage: 'url("/image/card-bg.jpg")', backgroundSize: 'cover', backgroundPosition: 'bottom' }}>
          <div className="d-flex flex-column ms-5 ps-2 mt-5 pt-4">
            <br />
            <p>Campus: {props.id1}</p>
            <p>Staff ID: 01</p>
            <p>Emergency Cony.: 0987654321</p>
            <br />
            <address>123, Shalimar building</address>
            <a href="mailto:xyz@gmail.com">xyz@gmail.com</a>
          </div>
        </div>
      </div>
    </>
  );
});

function IdCardStaff() {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const id1 = queryParams.get('campus');
  const id2 = queryParams.get('staff');
  const id3 = queryParams.get('card');
  console.log(id1);
  console.log(id2);
  console.log(id3);

  return (
    <>
      <div className="container-fluid">
        <div>
          {/* IDCard component */}
          <IDCard ref={componentRef} id1={id1} id2={id2} id3={id3} />

          {/* Print button */}
          <button onClick={handlePrint} style={{ marginTop: "20px" }}>
            Print ID Card
          </button>
        </div>
      </div>
    </>
  );
}

export default IdCardStaff;
