import React from 'react';
import { useRazorpay } from '../../Custom Hooks/CustomeHook';

const RazerpayTest = () => {
    const { handlePayment, loading } = useRazorpay();

    const initiatePayment = () => {
        handlePayment({
            name: "Product Name",
            productId: "123",
            amount: 50000, // Amount in paise (500 INR)
            // currency: "INR",
            redirectUrl: "/instituteprofile", // Redirect URL after successful payment
        });
    };

    return (
        <div>
            <button onClick={initiatePayment} disabled={loading}>
                {loading ? "Processing..." : "Pay Now"}
            </button>
        </div>
    );
};
export default RazerpayTest;

