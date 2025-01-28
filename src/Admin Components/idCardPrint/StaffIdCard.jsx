import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function StaffIdCard() {
    
    const[Camp, setCamp] = useState('')
    const[Staff, setStaff] = useState('');
    const[Card, setCard] = useState('')
    function CampChangeHandler(e){
        setCamp(e.target.value);        
    }

    function StaffChangeHandler(e){
        setStaff(e.target.value);
    }
    function CardChangeHandler(e){
        setCard(e.target.value);
    }
  return (
<>
   <div className="container-fluid container-p-y">
   <h4 className="fw-bold py-3 mb-4"><span className="text-muted fw-light">Dashboard /</span> Print Staff Id Card</h4>
   <div className="d-flex justify-content-between m-4">
            <div className="">
                <label htmlFor="campus"> Campus</label><br/>
                <select name="campus" id="camp" className='py-2 pe-5  form-select' onChange={CampChangeHandler}>
                    <option selected >Open this select menu</option>
                    <option  name="campus">Main Campus</option>
                    <option  name="campus">Outer Campus</option>
                    <option  name="campus">Inner Campus</option>
                </select>
            </div>
            <div className="">
            <label htmlFor="staffType">Staff Type</label><br/>
            <select name="staffType" id="staffType" className='py-2 pe-5 form-select' onChange={StaffChangeHandler}>
                    <option selected>Open this select menu</option>
                    <option value="main" name="staffType">Main Campus</option>
                    <option value="outer" name="staffType">Outer Campus</option>
                    <option value="inner" name="staffType">Inner Campus</option>
                </select>
            </div>
            <div className="">
            <label htmlFor="cardType"> Card Type</label><br/>
            <select name="cardType" id="cardType" className='py-2 pe-5  form-select' onChange={CardChangeHandler}>
                    <option selected>Open this select menu</option>
                    <option value="main" name="cardType">Front side</option>
                    <option value="outer" name="cardType">Back side</option>
                    <option value="inner" name="cardType">Both side</option>
                </select>
            </div>
            
            <div className="">
              <Link className='mt-4 px-4 me-2 btn btn-success' to={`/id-card-staff?campus=${Camp}&staff=${Staff}&card=${Card}`}>Filter Data </Link>
            </div>
        </div>
   </div>
   </>
  )
}

export default StaffIdCard;
