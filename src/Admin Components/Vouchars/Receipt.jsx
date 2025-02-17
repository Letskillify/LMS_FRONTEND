import axios from 'axios'
import { Field, Formik, Form } from 'formik'
import React, { useState } from 'react'
import * as Yup from 'yup';

const initialValues = {
    payerDetails: {
        name: '',
        email: '',
        phone: '',
        address: '',
    },
    receiptItems: [
        {
            itemName: '',
            quantity: 1,
            unitPrice: 0,
            subTotal: 0,
        },
    ],
    totalAmount: 0,
    taxDetails: [
        {
            taxName: '',
            percentage: 0,
            amount: 0,
        },
    ],
    grandTotalAmount: 0,
    paymentMethod: 'Cash',
    currency: 'INR',
    receiptStatus: 'Pending',
    notes: '',
};

const validationSchema = Yup.object().shape({
    payerDetails: Yup.object().shape({
        name: Yup.string().required('Payer name is required'),
        email: Yup.string().email('Invalid email format').required('Email is required'),
        phone: Yup.string().matches(/^\d{10}$/, 'Phone number must be 10 digits').required('Phone number is required'),
        address: Yup.string().required('Address is required'),
    }),
    receiptItems: Yup.array().of(
        Yup.object().shape({
            itemName: Yup.string().required('Item name is required'),
            quantity: Yup.number().min(1, 'Quantity must be at least 1').required('Quantity is required'),
            unitPrice: Yup.number().min(0, 'Unit price cannot be negative').required('Unit price is required'),
            subTotal: Yup.number().min(0, 'Subtotal cannot be negative').required(),
        })
    ),
    taxDetails: Yup.array().of(
        Yup.object().shape({
            taxName: Yup.string().required('Tax name is required'),
            percentage: Yup.number().min(0, 'Tax percentage cannot be negative').required(),
            amount: Yup.number().min(0, 'Tax amount cannot be negative').required(),
        })
    ),
    paymentMethod: Yup.string().oneOf(['Cash', 'Bank Transfer', 'Credit Card', 'Cheque', 'Other'], 'Invalid payment method').required('Payment method is required'),
    currency: Yup.string().oneOf(['USD', 'INR', 'EUR', 'Other'], 'Invalid currency').required('Currency is required'),
    receiptStatus: Yup.string().oneOf(['Pending', 'Verified', 'Rejected'], 'Invalid receipt status').required('Receipt status is required'),
});


function Receipt() {
    const [receiptItems, setReceiptItems] = useState([{ itemName: '', quantity: 1, unitPrice: 0, subTotal: 0 }])
    const [taxDetails, setTaxDetails] = useState([{ taxName: '', percentage: 0, amount: 0 }])
    const [totalAmount, setTotalAmount] = useState(0)
    const [grandTotalAmount, setGrandTotalAmount] = useState(0)

    const handleAddItem = () => {
        setReceiptItems([...receiptItems, { itemName: '', quantity: 1, unitPrice: 0, subTotal: 0 }])
    }
    const handleAddTax = () => {
        setTaxDetails([...taxDetails, { taxName: '', percentage: 0, amount: 0 }])
    }
    const handleRemoveItem = (index) => {
        setReceiptItems(receiptItems.filter((item, i) => i !== index))
    }
    const handleRemoveTax = (index) => {
        setTaxDetails(taxDetails.filter((tax, i) => i !== index))
    }
    const handleTotalAmountChange = (event) => {
        setTotalAmount(event.target.value)
    }
    const handleGrandTotalAmountChange = (event) => {
        setGrandTotalAmount(event.target.value) 
    }
    const handleSubmit = async (values) => {
        console.log(values);
        
        try {
            const response = await axios.post('/api/voucher/reciept/post', values, {
                headers: { 'Content-Type': 'application/json' }
            });
            if (response.status === 201) {
                alert("Data sent successfully");
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };
    return (
        <>
            <div className="container-fluid mt-4 p-4">
                <div className="card p-4">
                    <h2 className="text-center">Receipt Entry</h2>
                    <Formik
                        initialValues={initialValues}
                        // validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        <Form className="row g-3">
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Receipt Attachment</label>
                                <Field type="file" className="form-control" name="receiptAttachment" />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Payer Name</label>
                                <Field type="text" className="form-control" name="payerDetails.name" placeholder="Enter Name" />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Payer Email</label>
                                <Field type="email" className="form-control" name="payerDetails.email" placeholder="Enter Email" />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Payer Phone</label>
                                <Field type="text" className="form-control" name="payerDetails.phone" placeholder="Enter Phone" />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Payer Address</label>
                                <Field type="text" className="form-control" name="payerDetails.address" placeholder="Enter Address" />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Currency</label>
                                <Field as="select" className="form-control" name="currency">
                                    <option value="" disabled selected>Select Currency</option>
                                    <option value="AED">AED - United Arab Emirates Dirham</option>
                                    <option value="AFN">AFN - Afghan Afghani</option>
                                    <option value="ALL">ALL - Albanian Lek</option>
                                    <option value="AMD">AMD - Armenian Dram</option>
                                    <option value="ANG">ANG - Netherlands Antillean Guilder</option>
                                    <option value="AOA">AOA - Angolan Kwanza</option>
                                    <option value="ARS">ARS - Argentine Peso</option>
                                    <option value="AUD">AUD - Australian Dollar</option>
                                    <option value="AWG">AWG - Aruban Florin</option>
                                    <option value="AZN">AZN - Azerbaijani Manat</option>
                                    <option value="BAM">BAM - Bosnia-Herzegovina Convertible Mark</option>
                                    <option value="BBD">BBD - Barbadian Dollar</option>
                                    <option value="BDT">BDT - Bangladeshi Taka</option>
                                    <option value="BGN">BGN - Bulgarian Lev</option>
                                    <option value="BHD">BHD - Bahraini Dinar</option>
                                    <option value="BIF">BIF - Burundian Franc</option>
                                    <option value="BMD">BMD - Bermudian Dollar</option>
                                    <option value="BND">BND - Brunei Dollar</option>
                                    <option value="BOB">BOB - Bolivian Boliviano</option>
                                    <option value="BRL">BRL - Brazilian Real</option>
                                    <option value="BSD">BSD - Bahamian Dollar</option>
                                    <option value="BTN">BTN - Bhutanese Ngultrum</option>
                                    <option value="BWP">BWP - Botswana Pula</option>
                                    <option value="BYN">BYN - Belarusian Ruble</option>
                                    <option value="BZD">BZD - Belize Dollar</option>
                                    <option value="CAD">CAD - Canadian Dollar</option>
                                    <option value="CDF">CDF - Congolese Franc</option>
                                    <option value="CHF">CHF - Swiss Franc</option>
                                    <option value="CLP">CLP - Chilean Peso</option>
                                    <option value="CNY">CNY - Chinese Yuan</option>
                                    <option value="COP">COP - Colombian Peso</option>
                                    <option value="CRC">CRC - Costa Rican Colón</option>
                                    <option value="CUP">CUP - Cuban Peso</option>
                                    <option value="CVE">CVE - Cape Verdean Escudo</option>
                                    <option value="CZK">CZK - Czech Koruna</option>
                                    <option value="DJF">DJF - Djiboutian Franc</option>
                                    <option value="DKK">DKK - Danish Krone</option>
                                    <option value="DOP">DOP - Dominican Peso</option>
                                    <option value="DZD">DZD - Algerian Dinar</option>
                                    <option value="EGP">EGP - Egyptian Pound</option>
                                    <option value="ERN">ERN - Eritrean Nakfa</option>
                                    <option value="ETB">ETB - Ethiopian Birr</option>
                                    <option value="EUR">EUR - Euro</option>
                                    <option value="FJD">FJD - Fijian Dollar</option>
                                    <option value="FKP">FKP - Falkland Islands Pound</option>
                                    <option value="GBP">GBP - British Pound Sterling</option>
                                    <option value="GEL">GEL - Georgian Lari</option>
                                    <option value="GHS">GHS - Ghanaian Cedi</option>
                                    <option value="GIP">GIP - Gibraltar Pound</option>
                                    <option value="GMD">GMD - Gambian Dalasi</option>
                                    <option value="GNF">GNF - Guinean Franc</option>
                                    <option value="GTQ">GTQ - Guatemalan Quetzal</option>
                                    <option value="GYD">GYD - Guyanese Dollar</option>
                                    <option value="HKD">HKD - Hong Kong Dollar</option>
                                    <option value="HNL">HNL - Honduran Lempira</option>
                                    <option value="HRK">HRK - Croatian Kuna</option>
                                    <option value="HTG">HTG - Haitian Gourde</option>
                                    <option value="HUF">HUF - Hungarian Forint</option>
                                    <option value="IDR">IDR - Indonesian Rupiah</option>
                                    <option value="ILS">ILS - Israeli New Shekel</option>
                                    <option value="INR">INR - Indian Rupee</option>
                                    <option value="IQD">IQD - Iraqi Dinar</option>
                                    <option value="IRR">IRR - Iranian Rial</option>
                                    <option value="ISK">ISK - Icelandic Króna</option>
                                    <option value="JMD">JMD - Jamaican Dollar</option>
                                    <option value="JOD">JOD - Jordanian Dinar</option>
                                    <option value="JPY">JPY - Japanese Yen</option>
                                    <option value="KES">KES - Kenyan Shilling</option>
                                    <option value="KGS">KGS - Kyrgyzstani Som</option>
                                    <option value="KHR">KHR - Cambodian Riel</option>
                                    <option value="KMF">KMF - Comorian Franc</option>
                                    <option value="KPW">KPW - North Korean Won</option>
                                    <option value="KRW">KRW - South Korean Won</option>
                                    <option value="KWD">KWD - Kuwaiti Dinar</option>
                                    <option value="KYD">KYD - Cayman Islands Dollar</option>
                                    <option value="KZT">KZT - Kazakhstani Tenge</option>
                                    <option value="LAK">LAK - Lao Kip</option>
                                    <option value="LBP">LBP - Lebanese Pound</option>
                                    <option value="LKR">LKR - Sri Lankan Rupee</option>
                                    <option value="LRD">LRD - Liberian Dollar</option>
                                    <option value="LSL">LSL - Lesotho Loti</option>
                                    <option value="LYD">LYD - Libyan Dinar</option>
                                    <option value="MAD">MAD - Moroccan Dirham</option>
                                    <option value="MDL">MDL - Moldovan Leu</option>
                                    <option value="MGA">MGA - Malagasy Ariary</option>
                                    <option value="MKD">MKD - Macedonian Denar</option>
                                    <option value="MMK">MMK - Myanmar Kyat</option>
                                    <option value="MNT">MNT - Mongolian Tögrög</option>
                                    <option value="MOP">MOP - Macanese Pataca</option>
                                    <option value="MUR">MUR - Mauritian Rupee</option>
                                    <option value="MVR">MVR - Maldivian Rufiyaa</option>
                                    <option value="MWK">MWK - Malawian Kwacha</option>
                                    <option value="MXN">MXN - Mexican Peso</option>
                                    <option value="MYR">MYR - Malaysian Ringgit</option>
                                    <option value="NAD">NAD - Namibian Dollar</option>
                                    <option value="NGN">NGN - Nigerian Naira</option>
                                    <option value="NOK">NOK - Norwegian Krone</option>
                                    <option value="NPR">NPR - Nepalese Rupee</option>
                                    <option value="NZD">NZD - New Zealand Dollar</option>
                                    <option value="OMR">OMR - Omani Rial</option>
                                    <option value="PEN">PEN - Peruvian Sol</option>
                                    <option value="PHP">PHP - Philippine Peso</option>
                                    <option value="PKR">PKR - Pakistani Rupee</option>
                                    <option value="PLN">PLN - Polish Złoty</option>
                                </Field>
                            </div>

                            <div className="col-12">
                                <h5>Receipt Items</h5>
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Item Name</th>
                                            <th>Quantity</th>
                                            <th>Unit Price</th>
                                            <th>Sub Total</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody id="itemTableBody">
                                        {receiptItems.map((_, index) => (
                                            <tr key={index}>
                                                <td><Field type="text" className="form-control" name={`receiptItems.${index}.itemName`} placeholder='Enter Item Name' /></td>
                                                <td><Field type="number" className="form-control" name={`receiptItems.${index}.quantity`} placeholder='Enter Quantity' /></td>
                                                <td><Field type="number" className="form-control" name={`receiptItems.${index}.unitPrice`} placeholder='Enter Unit Price' /></td>
                                                <td><Field type="number" className="form-control" name={`receiptItems.${index}.subTotal`} readOnly /></td>
                                                <div className="div">
                                                    <td><button type="button" className="btn btn-primary" onClick={handleAddItem}><i className="fa fa-plus" aria-hidden="true"></i></button></td>
                                                    <td><button type="button" className="btn btn-danger ms-2" onClick={() => handleRemoveItem(index)}><i className="fa fa-minus-circle" aria-hidden="true"></i></button></td>
                                                </div>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                            </div>
                            <div className="col-12">
                                <h5>Tax Details</h5>
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Tax Name</th>
                                            <th>Percentage</th>
                                            <th>Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {taxDetails.map((_, index) => (
                                            <tr key={index}>
                                                <td><Field type="text" className="form-control" name={`taxDetails.${index}.taxName`} placeholder='Enter Tax Name' /></td>
                                                <td><Field type="number" className="form-control" name={`taxDetails.${index}.percentage`} placeholder='Enter Percentage' /></td>
                                                <td><Field type="text" className="form-control" name={`taxDetails.${index}.amount`} placeholder='Enter Amount' /></td>
                                                <div>
                                                    <td><button type="button" className="btn btn-primary" onClick={handleAddTax}><i className="fa fa-plus" aria-hidden="true"></i></button></td>
                                                    <td><button type="button" className="btn btn-danger ms-2" onClick={() => handleRemoveTax(index)}><i className="fa fa-minus-circle" aria-hidden="true"></i></button></td>
                                                </div>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="form-label" >Payment Method</label>
                                <Field as="select" className="form-select" name="paymentMethod">
                                    <option value="" disabled>Select Payment Method</option>
                                    <option value="Cash">Cash</option>
                                    <option value="Bank Transfer">Bank Transfer</option>
                                    <option value="Credit Card">Credit Card</option>
                                    <option value="Cheque">Cheque</option>
                                    <option value="Other">Other</option>
                                </Field>
                            </div>
                            <div className="col-md-6 mb-3">
                                    <label className="form-label">Receipt Status</label>
                                    <Field as="select" className="form-select" name="receiptStatus">
                                        <option value="" disabled>Select Receipt Status</option>
                                        <option value="pending">Pending</option>
                                        <option value="verified">Verified</option>
                                        <option value="rejected">Rejected</option>
                                    </Field>
                            </div>
                            <div className="col-12">
                                <div className="mb-3">
                                    <label className="form-label">Notes</label>
                                    <textarea className="form-control" placeholder="Enter any notes" name="notes"></textarea>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Total Amount</label>
                                        <Field type="number" className="form-control" name="totalAmount" value={totalAmount} onChange={handleTotalAmountChange} />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Grand Total Amount</label>
                                        <Field type="number" className="form-control" name="grandTotalAmount" value={grandTotalAmount} onChange={handleGrandTotalAmountChange} />
                                    </div>
                                </div>

                                <button type="submit" className="btn btn-primary text-center">Submit</button>
                            </div>
                        </Form>

                    </Formik>
                </div>
            </div>
        </>
    )
}

export default Receipt

