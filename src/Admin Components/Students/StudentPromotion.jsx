import React, { useState } from 'react';

const StudentPromotion = () => {
    const [formData, setFormData] = useState({
        mainCampus: '',
        promotionFromClass: '',
        fromSection: '',
        promotionToClass: '',
        toSection: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

    };

    const handlePromotion = () => {
        console.log('Promotion Data:', formData);
    };

    return (
        <div>
            <div className="card m-4">
                <h5 className="card-header">Promote Students</h5>
                <div className="card-body">
                    <form>
                        <div className="row">
                            <div className="col">
                                <label className="form-label">Main Campus</label>
                                <select
                                    name="mainCampus"
                                    className="form-select"
                                    value={formData.mainCampus}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Campus</option>
                                    <option value="Campus One">Campus One</option>
                                    <option value="Campus Two">Campus Two</option>
                                    <option value="Campus Three">Campus Three</option>
                                </select>
                            </div>
                            <div className="col">
                                <label className="form-label">Promotion from Class</label>
                                <select
                                    name="promotionFromClass"
                                    className="form-select"
                                    value={formData.promotionFromClass}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Class</option>
                                    <option value="One">One</option>
                                    <option value="Two">Two</option>
                                    <option value="Three">Three</option>
                                </select>
                            </div>

                            <div className="col">
                                <label className="form-label">Section</label>
                                <select
                                    name="fromSection"
                                    className="form-select"
                                    value={formData.fromSection}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Section</option>
                                    <option value="A">A</option>
                                    <option value="B">B</option>
                                    <option value="C">C</option>
                                </select>
                            </div>
                            <div className="col">
                                <label className="form-label">Promotion to Class</label>
                                <select
                                    name="promotionToClass"
                                    className="form-select"
                                    value={formData.promotionToClass}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Class</option>
                                    <option value="One">One</option>
                                    <option value="Two">Two</option>
                                    <option value="Three">Three</option>
                                </select>
                            </div>
                            <div className="col">
                                <label className="form-label">Section</label>
                                <select
                                    name="toSection"
                                    className="form-select"
                                    value={formData.toSection}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Section</option>
                                    <option value="A">A</option>
                                    <option value="B">B</option>
                                    <option value="C">C</option>
                                </select>
                            </div>
                            <div className="col">
                                <label className="form-label">Promote</label>
                                <button
                                    type="button"
                                    className="btn btn-success w-100"
                                    onClick={handlePromotion}
                                >
                                    Manage Promotion
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default StudentPromotion;
