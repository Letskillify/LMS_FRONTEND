import React, { useState } from 'react'
import { Link } from 'react-router-dom';


function idCard() {
    const[Camp, setCamp] = useState('')
    const[Type, setType] = useState('');
    const[Class, setClass] = useState('');
    const[Section, setSection] = useState('');
    function CampChangeHandler(e){
        setCamp(e.target.value);        
    }

    function TypeChangeHandler(e){
        setType(e.target.value);
    }
    function ClassChangeHandler(e){
        setClass(e.target.value);
    }
    function SectionChangeHandler(e){
        setSection(e.target.value);
    }
  return (
    <>
       
       <div className="container-fluid container-p-y">
              <h4 className="fw-bold py-3 mb-4"><span className="text-muted fw-light">Dashboard /</span> Print Student Id Card</h4>
               <div className="d-flex justify-content-between m-4">
            <div className="">
                <label htmlFor="campus"> Campus</label><br/>
                <select name="campus" id="camp" className='py-2 pe-5  form-select' onChange={CampChangeHandler}>
                    <option selected>Open this select menu</option>
                    <option  name="campus">Main Campus</option>
                    <option name="campus">Outer Campus</option>
                    <option name="campus">Inner Campus</option>
                </select>
            </div>
            <div className="">
            <label htmlFor="type"> Type</label><br/>
                <select name="type" id="type" className='py-2 pe-5  form-select' onChange={TypeChangeHandler}>
                    <option selected>Open this select menu</option>
                    <option  name="type">Front side</option>
                    <option  name="type">Back side</option>
                    <option  name="type">Both side</option>
                </select>
            </div>
            <div className="">
            <label htmlFor="Class"> Class</label><br/>
                <select name="Class" id="camp" className='py-2 pe-5  form-select' onChange={ClassChangeHandler}>
                    <option selected>Select Class</option>
                    <option name="Class">10</option>
                    <option  name="Class">11</option>
                    <option  name="Class">12</option>
                </select>
            </div>
            <div className="">
            <label htmlFor="section"> Section</label><br/>
                <select name="section" id="camp" className='py-2 pe-5  form-select' onChange={SectionChangeHandler}>
                    <option selected>Select Class First</option>
                    <option name="section">Main Campus</option>
                    <option  name="section">Outer Campus</option>
                    <option  name="section">Inner Campus</option>
                </select>
            </div>
            
            <div className="">
              <Link className='mt-4 px-4 me-2 btn btn-success' to={`/id-card-stu?campus=${Camp}&type=${Type}&class=${Class}`}>Filter Data </Link>
      
            </div>
        </div>
         


      </div>
    </>
  )
}

export default idCard
