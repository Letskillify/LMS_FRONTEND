import React from 'react'

const Balancesheet = () => {
    // Mock data
    const payments = [
        { roll: "ST26369", name: "Ali Hassan", class: "One", title: "Monthly Fee Of July", amount: 4444 },
        { roll: "ST0008-1", name: "Sahib Ali", class: "One", title: "Monthly Fee Of July", amount: 50 },
    ];

    const expenses = [
        { id: 6, title: "Staff Salary Issuance(Slip Id: 1: Abdul)", amount: 300 },
        { id: 7, title: "Staff Salary Issuance(Slip Id: 5: Sahib Ali)", amount: 322.58 },
    ];

    const summary = {
        totalPayment: 4494,
        totalExpenses: 622.58,
        unsettled: 3994,
        cashInHand: 7865.42,
    };
    return (
        <>
            <div className="container mt-4">
                {/* Header Section */}
                <div className=" align-items-center mb-4">
                    <div>
                        <ul class="nav nav-tabs" id="myTab" role="tablist">
                            <li class="nav-item" role="presentation">
                                <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Current Day</button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Yesterday</button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button class="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button" role="tab" aria-controls="twodays" aria-selected="false">Two Days Ago</button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button class="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button" role="tab" aria-controls="threedays" aria-selected="false">Three Days Ago</button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button class="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button" role="tab" aria-controls="fourdays" aria-selected="false">Four Days Ago</button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button class="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button" role="tab" aria-controls="fivedays" aria-selected="false">Six Days Ago</button>
                            </li>
                        </ul>
                        <div className="text-end">
                            <button className="btn btn-primary">Print Balancesheet</button>
                        </div>
                        <div class="tab-content" id="myTabContent">
                            <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab"> {/* Payment Table */}
                                <table class="esi-table">
                                    <thead>
                                        <tr>
                                            <th>For Date</th>
                                            <th>Campus</th>
                                            <th>Accountant</th>
                                            <th>Print Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>29-07-2023</td>
                                            <td>Main Campus</td>
                                            <td>Super Admin</td>
                                            <td>29-07-2023 22:18:12</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table class="unique-esi-table">
                                    <thead>
                                        <tr>
                                            <th>St. Roll</th>
                                            <th>Name</th>
                                            <th>Class</th>
                                            <th>Payment Title</th>
                                            <th>Amount</th>
                                            <th>Expense Id</th>
                                            <th>Expense Title</th>
                                            <th>Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td class="unique-highlight-red">2000</td>
                                            <td>2</td>
                                            <td>Test</td>
                                            <td class="unique-highlight-red">2000</td>
                                        </tr>
                                        <tr>
                                            <td colspan="8" class="unique-unsettled">Unsettled</td>
                                        </tr>
                                        <tr>
                                            <td colspan="7">Total Payment:</td>
                                            <td class="unique-highlight-green">Rs. 0</td>
                                        </tr>
                                        <tr>
                                            <td colspan="7">Total Expenses:</td>
                                            <td class="unique-highlight-red">Rs. 2000</td>
                                        </tr>
                                        <tr>
                                            <td colspan="7">Previous Unsettled Amount:</td>
                                            <td class="unique-highlight-red">Rs. 4444</td>
                                        </tr>
                                        <tr>
                                            <td colspan="7">Cash in hand:</td>
                                            <td class="unique-highlight-green">Rs. 2444</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">...</div>
                            <div class="tab-pane fade" id="twodays" role="tabpanel" aria-labelledby="contact-tab">...</div>
                            <div class="tab-pane fade" id="threedays" role="tabpanel" aria-labelledby="contact-tab">...</div>
                            <div class="tab-pane fade" id="fourdays" role="tabpanel" aria-labelledby="contact-tab">...</div>
                            <div class="tab-pane fade" id="fivedays" role="tabpanel" aria-labelledby="contact-tab">...</div>
                        </div>
                    </div>

                </div>


            </div>
        </>
    )
}
export default Balancesheet;
