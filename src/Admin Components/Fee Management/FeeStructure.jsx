import React, { useState } from 'react';

function FeeStructureManagement() {
    const [feeStructures, setFeeStructures] = useState([
        { class: 10, tuitionFee: 5000, labFee: 1000, transportFee: 1500, lateFee: 100, total: 7500 },
        { class: 11, tuitionFee: 6000, labFee: 1200, transportFee: 1500, lateFee: 120, total: 8700 },
        { class: 12, tuitionFee: 7000, labFee: 1500, transportFee: 1500, lateFee: 140, total: 10000 },
    ]);

    const [formData, setFormData] = useState({
        class: '',
        tuitionFee: '',
        labFee: '',
        transportFee: '',
        lateFee: '',
    });

    const [editingIndex, setEditingIndex] = useState(null);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const addFeeStructure = () => {
        const newFeeStructure = {
            ...formData,
            tuitionFee: parseFloat(formData.tuitionFee) || 0,
            labFee: parseFloat(formData.labFee) || 0,
            transportFee: parseFloat(formData.transportFee) || 0,
            lateFee: parseFloat(formData.lateFee) || 0,
            total:
                (parseFloat(formData.tuitionFee) || 0) +
                (parseFloat(formData.labFee) || 0) +
                (parseFloat(formData.transportFee) || 0),
        };

        setFeeStructures([...feeStructures, newFeeStructure]);
        setFormData({ class: '', tuitionFee: '', labFee: '', transportFee: '', lateFee: '' }); // Reset form
    };

    const editFeeStructure = (index) => {
        setFormData(feeStructures[index]);
        setEditingIndex(index);
    };

    const updateFeeStructure = () => {
        const updatedFeeStructure = {
            ...formData,
            tuitionFee: parseFloat(formData.tuitionFee) || 0,
            labFee: parseFloat(formData.labFee) || 0,
            transportFee: parseFloat(formData.transportFee) || 0,
            lateFee: parseFloat(formData.lateFee) || 0,
            total:
                (parseFloat(formData.tuitionFee) || 0) +
                (parseFloat(formData.labFee) || 0) +
                (parseFloat(formData.transportFee) || 0),
        };

        const updatedFeeStructures = [...feeStructures];
        updatedFeeStructures[editingIndex] = updatedFeeStructure;
        setFeeStructures(updatedFeeStructures);

        setFormData({ class: '', tuitionFee: '', labFee: '', transportFee: '', lateFee: '' });
        setEditingIndex(null); // Reset editing mode
    };

    const deleteFeeStructure = (index) => {
        const updatedFeeStructures = feeStructures.filter((_, i) => i !== index);
        setFeeStructures(updatedFeeStructures);
    };

    return (
        <div className="container FeeStructure">
            <h1 className="title border p-3 shadow-sm fw-bold m-1 card">Fee Structure Management</h1>
            <div className="card p-5 row">
                <h3 className="card-title">{editingIndex === null ? 'Add' : 'Edit'} Fee Structure</h3>
                <div className="form-group">
                    <label htmlFor="class">Class</label>
                    <input
                        type="text"
                        id="class"
                        value={formData.class}
                        onChange={handleInputChange}
                        placeholder="Enter class"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="tuitionFee">Tuition Fee</label>
                    <input
                        type="text"
                        id="tuitionFee"
                        value={formData.tuitionFee}
                        onChange={handleInputChange}
                        placeholder="Enter tuition fee"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="labFee">Lab Fee</label>
                    <input
                        type="text"
                        id="labFee"
                        value={formData.labFee}
                        onChange={handleInputChange}
                        placeholder="Enter lab fee"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="transportFee">Transport Fee</label>
                    <input
                        type="text"
                        id="transportFee"
                        value={formData.transportFee}
                        onChange={handleInputChange}
                        placeholder="Enter transport fee"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="lateFee">Late Fee (per day)</label>
                    <input
                        type="text"
                        id="lateFee"
                        value={formData.lateFee}
                        onChange={handleInputChange}
                        placeholder="Enter late fee"
                    />
                </div>
                <button className="btn btn-primary p-2" onClick={editingIndex === null ? addFeeStructure : updateFeeStructure}>
                    {editingIndex === null ? 'Add Fee Structure' : 'Update Fee Structure'}
                </button>
            </div>

            <div className="current-structures">
                <h3 className='card-title border p-3'>Current Fee Structures</h3>
                <div className="card">
                    <table className="fee-table">
                        <thead>
                            <tr>
                                <th>Class</th>
                                <th>Tuition Fee</th>
                                <th>Lab Fee</th>
                                <th>Transport Fee</th>
                                <th>Late Fee (per day)</th>
                                <th>Total</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {feeStructures.map((fee, index) => (
                                <tr key={index}>
                                    <td>{fee.class}</td>
                                    <td>₹{fee.tuitionFee}</td>
                                    <td>₹{fee.labFee}</td>
                                    <td>₹{fee.transportFee}</td>
                                    <td>₹{fee.lateFee}</td>
                                    <td>₹{fee.total}</td>
                                    <td>
                                        <button
                                            className="btn btn-success"
                                            onClick={() => editFeeStructure(index)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="btn btn-danger ms-2"
                                            onClick={() => deleteFeeStructure(index)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default FeeStructureManagement;
