import React from 'react';
import { Formik, Form, Field } from 'formik';

const AdmitBulk = () => {
    return (
        <Formik
            initialValues={{
                class: '',
                section: '',
                csvFile: null,
                createParentsAccount: 'No',
            }}
            onSubmit={(values) => {
                console.log(values);
            }}
        >
            {({ setFieldValue }) => (
                <Form>
                    <div className="card m-4">
                        <h5 className="card-header">Admit Bulk Students</h5>
                        <div className="card-body">
                            <div className="row">
                                <div className="col">
                                    <label className="form-label">Class</label>
                                    <Field as="select" name="class" className="form-select">
                                        <option value="">Select Class</option>
                                        <option value="Nursery">Nursery</option>
                                        <option value="LKG">LKG</option>
                                        <option value="UKG">UKG</option>
                                        <option value="1st">1st</option>
                                        <option value="2nd">2nd</option>
                                        <option value="3rd">3rd</option>
                                        <option value="4th">4th</option>
                                        <option value="5th">5th</option>
                                        <option value="6th">6th</option>
                                        <option value="7th">7th</option>
                                        <option value="8th">8th</option>
                                        <option value="9th">9th</option>
                                        <option value="10th">10th</option>
                                        <option value="11th">11th</option>
                                        <option value="12th">12th</option>
                                    </Field>
                                </div>
                                <div className="col">
                                    <label className="form-label">Section</label>
                                    <Field as="select" name="section" className="form-select">
                                        <option value="">Select Section</option>
                                        <option value="A">A</option>
                                        <option value="B">B</option>
                                        <option value="C">C</option>
                                        <option value="D">D</option>
                                        <option value="E">E</option>
                                        <option value="F">F</option>
                                        <option value="G">G</option>
                                        <option value="H">H</option>
                                        <option value="I">I</option>
                                        <option value="J">J</option>
                                    </Field>
                                </div>
                                <div className="col">
                                    <label className="form-label">Upload CSV File</label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        onChange={(event) => {
                                            setFieldValue('csvFile', event.currentTarget.files[0]);
                                        }}
                                    />
                                </div>
                                <div className="col">
                                    <label className="form-label">Create Parents Account</label>
                                    <Field as="select" name="createParentsAccount" className="form-select">
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                    </Field>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col d-flex justify-content-end">
                                    <button type="submit" className="btn btn-primary me-2">Import Student Data</button>
                                    <button type="button" className="btn btn-secondary">Download Sample File</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default AdmitBulk;

