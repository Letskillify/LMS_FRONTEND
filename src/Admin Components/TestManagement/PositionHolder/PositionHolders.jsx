import React, { useState } from 'react'
import { getCommonCredentials } from '../../../GlobalHelper/CommonCredentials';
import { Formik } from 'formik';
import InputFieldComponet from '../../../GlobalComponents/GlobalInputField';
import useGlobalToast from '../../../GlobalComponents/GlobalToast';
import PositionHoldersTable from './PositionHoldersTable';

const PositionHolders = () => {
    const showToast = useGlobalToast();
    const {PositionHolders, InstituteId,Class,Section,Subject} = getCommonCredentials();
    const [filters,setFilters] = useState({
        campus: "",
        class: "",
        section: "",
        subject: "",
        test: "",
        searchQuery: "",
    });

    const filtersFileds = [
        {
          name: "campus",
          label: "Main Campus",
          type: "select",
          placeholder: "Campus",
        },
        {
          name: "classValue",
          label: "Class",
          type: "select",
          placeholder: "Class",
          option: Class?.map((item) => ({ value: item, label: item?.className })),
        },
        {
          name: "section",
          label: "Section",
          type: "select",
          placeholder: "Section",
          option: Section?.map((item) => ({
            value: item,
            label: item?.sectionName,
          })),
        },
        {
          name: "subject",
          label: "Subject",
          type: "select",
          placeholder: "Subject",
          option: Subject?.map((item) => ({
            value: item,
            label: item?.subjectName,
          })),
        },
        { name: "test", label: "Test", type: "select", placeholder: "Test" },
      ];

      const handleFilterChange = (e) => {
        const {name , value} = e.target;
        setFilters((prev) => ({...prev, [name]:value}));
      }
  return (
    <>
     <div className="container mt-5 mb-5">
        <div className="card mb-4">
          <div className="card-body">
            <h3 className="text-start fw-bold">Manage Position Holders</h3>
            <div className="row g-3">
              <Formik>
                <div className="row d-flex flex-wrap mt-4 text-center">
                  {filtersFileds?.map((filed, index) => (
                    <div className="col-md-2" key={index}>
                      <InputFieldComponet
                        type={filed.type}
                        className="form-control"
                        Placeholder={filed.Placeholder}
                        name={filed.name}
                        lableName={filed.label}
                        options={filed.option}
                        value={filters[filed.name]}
                        onChange={handleFilterChange}
                      />
                    </div>
                  ))}
                  <div className="col-md-2">
                    <button className="btn btn-success  fw-bold">
                      View Report
                    </button>
                  </div>
                </div>
              </Formik>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h5 className="fw-bold mb-0">Position Holders </h5>
            <input
              type="text"
              className="form-control w-25"
              placeholder="Search..."
              name="searchQuery"
              value={filters.searchQuery}
              onChange={handleFilterChange}
            />
          </div>

          <div className="card-body text-center">
           <PositionHoldersTable PositionHolders={PositionHolders}/>
            <div className="card-footer d-flex justify-content-end mt-4">
              <button className="btn btn-success text-uppercase fw-bold">
                Print Position Holders List
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PositionHolders