import React from 'react'

const FeeManage = () => {
    return (
        <>
            <div className='m-4'>
                <div style={{ backgroundColor: "darkblue", borderRadius: "10px" }}>
                    <h3 style={{ color: 'white'}} className='p-2'>Student Fee Management</h3>
                </div>
                <div className="card-body">
                        <div className="row">
                            <div className="col" >
                                <select className="form-select" style={{width:"100px"}}>
                                    <option selected="">1</option>
                                    <option value="1">2</option>
                                    <option value="2">3</option>
                                    <option value="3">4</option>
                                </select>
                            </div>
                            <div className="col-auto">
                                <div className="btn-group" style={{margin:"0px 20px 0px 0px"}}>
                                    <button type="button" className="btn btn-secondary">
                                        <i className="tf-icons bx bx-pencil me-1"></i>
                                        Edit All
                                    </button>
                                    <button type="button" className="btn btn-danger">
                                        <i className='tf-icons bx bx-trash me-1'></i>
                                        Delete All
                                    </button>
                                    <button type="button" className="btn btn-success">
                                        <i className='tf-icons bx bxs-file me-1'></i>
                                        Excel
                                    </button>
                                    <button type="button" className="btn btn-warning">
                                        <i className='tf-icons bx bxs-file-doc me-1'></i>
                                        CSV
                                    </button>
                                    <button type="button" className="btn btn-danger">
                                        <i className='tf-icons bx bxs-file-pdf me-1'></i>
                                        PDF
                                    </button>
                                    <button type="button" className="btn btn-info">
                                        <i className='tf-icons bx bxs-printer me-1'></i>
                                        Print
                                    </button>
                                </div>
                                <input type="text"  placeholder="Search..."/>
                                      
                            </div>
                        </div>
                    </div>
            </div>

        </>
    )
}

export default FeeManage
