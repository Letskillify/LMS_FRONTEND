import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";

export const getApi = (url) => {
    return fetch(url).then(resp => {
        if (!resp.ok) return resp.statusText;
        else return resp.json();
    }).catch(error => { return error })
}

export const PostApi = (url, msg, data) => {
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then(resp => {
        if (!resp.ok) {
            toast.warn(resp.statusText, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
            });
            return resp.statusText;
        }
        else {
            toast.success(msg, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
            });
        }
    }).catch(error => { return error })
}

export const HitApi = async (url, successMessage) => {
    try {
        const response = await axios.post(url);
        console.log(response.data);
        alert(successMessage);
    } catch (error) {
        console.error('Error hitting API:', error.response ? error.response.data : error.message);
        alert(error.response ? error.response.data.message : error.message);
    }
};

export const DeleteApi = async (url, successMessage) => {
    try {
        const response = await axios.delete(url);
        console.log(response.data);
        toast.success(successMessage, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
        });
    } catch (error) {
        console.error('Error hitting API:', error.response ? error.response.data : error.message);
        toast.error(error.response ? error.response.data.message : error.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
        });
    }
}

export const PutApi = async (url, successMessage) => {
    try {
        const response = await axios.put(url);
        console.log(response.data);
        alert(successMessage);
    } catch (error) {
        console.error('Error hitting API:', error.response ? error.response.data : error.message);
        alert(error.response ? error.response.data.message : error.message);
    }
};

export const EditApi = async (url, Data, successMessage) => {
    try {
        const response = await axios.put(url, Data);
        toast.success(successMessage, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
        });
    } catch (error) {
        console.error('Error hitting API:', error.response ? error.response.data : error.message);
        toast.warn('Error hitting API:', error.response ? error.response.data.message : error.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
        });
    }
};



export const useImageUploader = () => {
    const [uploadedData, setUploadedData] = useState({});

    const handleImageUpload = (event, key) => {
        const file = event.target.files[0];
        if (file) {
            const data = new FormData();
            data.append("file", file);
            data.append("upload_preset", "uglykgfd");
            data.append("cloud_name", "duzwys877");

            fetch("https://api.cloudinary.com/v1_1/duzwys877/image/upload", {
                method: "POST",
                body: data,
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.error) {
                        console.error("Upload failed:", data.error.message);
                    } else {
                        console.log("Upload successful!", data?.url);

                        // Update the state with key-value pair
                        setUploadedData((prevState) => ({
                            ...prevState,
                            [key]: data?.url,
                        }));
                    }
                })
                .catch((error) => {
                    console.error("Error uploading file:", error);
                });
        }
    };

    return {
        uploadedData,
        setUploadedData,
        handleImageUpload,
    };
};


export const useVideoUploader = () => {
    const [uploadedVideos, setUploadedVideos] = useState({});
    const [uploadProgress, setUploadProgress] = useState(0); // For tracking progress percentage
    const [isLoading, setIsLoading] = useState(false); // Loader state

    const handleVideoUpload = (event, key) => {
        const file = event.target.files[0];
        if (file) {
            const data = new FormData();
            data.append("file", file);
            data.append("upload_preset", "uglykgfd"); // Replace with your actual upload preset
            data.append("cloud_name", "duzwys877"); // Replace with your Cloudinary cloud name
            data.append("resource_type", "video"); // For video uploads

            const xhr = new XMLHttpRequest(); // Create XMLHttpRequest instance
            setIsLoading(true);

            // Track upload progress
            xhr.upload.onprogress = (event) => {
                if (event.lengthComputable) {
                    const progress = Math.round((event.loaded / event.total) * 100);
                    setUploadProgress(progress); // Update progress state
                }
            };

            // Handle successful upload
            xhr.onload = () => {
                if (xhr.status === 200) {
                    const response = JSON.parse(xhr.responseText);
                    console.log("Video upload successful!", response.secure_url);

                    // Update state with uploaded video URL
                    setUploadedVideos((prevState) => ({
                        ...prevState,
                        [key]: response.secure_url,
                    }));
                } else {
                    console.error("Upload failed:", xhr.responseText);
                }
                setIsLoading(false);
                setUploadProgress(0); // Reset progress bar after completion
            };

            // Handle upload errors
            xhr.onerror = () => {
                console.error("Error uploading video.");
                setIsLoading(false);
                setUploadProgress(0);
            };

            // Open connection and send request
            xhr.open("POST", "https://api.cloudinary.com/v1_1/duzwys877/video/upload");
            xhr.send(data);
        } else {
            console.error("No file selected.");
        }
    };

    return {
        uploadedVideos,
        uploadProgress,
        isLoading,
        handleVideoUpload,
    };
};



export const useFileUploader = () => {
    const [uploadedFiles, setUploadedFiles] = useState({});
    const [isfileLoading, setFileIsLoading] = useState(false); // Loader state
    const [fileuploadProgress, setFileUploadProgress] = useState(0); // Progress bar

    const handleFileUpload = (event, key) => {
        const file = event.target.files[0];
        if (file) {
            const data = new FormData();
            data.append("file", file);
            data.append("upload_preset", "uglykgfd"); // Replace with your upload preset
            data.append("cloud_name", "duzwys877"); // Replace with your Cloudinary cloud name
            data.append("resource_type", "raw"); // Important for non-media files

            const xhr = new XMLHttpRequest();
            setFileIsLoading(true);

            // Track upload progress
            xhr.upload.onprogress = (event) => {
                if (event.lengthComputable) {
                    const progress = Math.round((event.loaded / event.total) * 100);
                    setFileUploadProgress(progress); // Update progress state
                }
            };

            // Handle successful upload
            xhr.onload = () => {
                if (xhr.status === 200) {
                    const response = JSON.parse(xhr.responseText);
                    console.log("File upload successful!", response.secure_url);

                    // Update state with uploaded file URL
                    setUploadedFiles((prevState) => ({
                        ...prevState,
                        [key]: response.secure_url,
                    }));
                } else {
                    console.error("Upload failed:", xhr.responseText);
                }
                setFileIsLoading(false);
                setFileUploadProgress(0); // Reset progress after upload
            };

            // Handle upload errors
            xhr.onerror = () => {
                console.error("Error uploading file.");
                setFileIsLoading(false);
                setFileUploadProgress(0);
            };

            // Open connection and send request
            xhr.open("POST", "https://api.cloudinary.com/v1_1/duzwys877/raw/upload");
            xhr.send(data);
        } else {
            console.error("No file selected.");
        }
    };

    return {
        uploadedFiles,
        fileuploadProgress,
        isfileLoading,
        handleFileUpload,
    };
};





// For razerpay payment


export const useRazorpay = () => {
    const [loading, setLoading] = useState(false);
    const Navigate = useNavigate();

    const handlePayment = async ({ amount, currency = "INR", productId, name, redirectUrl }) => {
        try {
            setLoading(true);

            // Create order on the server
            const response = await fetch("/api/payment/create-order", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ amount, currency, productId, name }),
            });

            const data = await response.json();

            if (!data.id) {
                alert("Failed to create order");
                setLoading(false);
                return;
            }

            // Load Razorpay script
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.onload = () => initializeRazorpay(data, redirectUrl);
            script.onerror = () => {
                alert("Failed to load Razorpay script");
                setLoading(false);
            };
            document.body.appendChild(script);
        } catch (error) {
            console.error("Error during payment initialization:", error);
            setLoading(false);
        }
    };

    const initializeRazorpay = (data, redirectUrl) => {
        const options = {
            key: "rzp_test_8wpObaz2TjH2YC", // Replace with your Razorpay key
            amount: data.amount,
            currency: data.currency,
            name: "Brigatech",
            image: "https://razorpay.com/docs/build/browser/static/razorpay-docs-light.009264f2.svg",
            description: "Thank you for shopping with us",
            order_id: data.id,
            handler: async (response) => {
                // console.log("Payment Successful:", response);
                const paymentDetails = {
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_signature: response.razorpay_signature,
                };

                // Verify payment on the server
                const verifyResponse = await fetch("/api/payment/verify-payment", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(paymentDetails),
                });

                const verifyData = await verifyResponse.json();
                if (verifyData.status === "success") {
                    alert("Payment Successful!");
                    if (redirectUrl) {
                        Navigate(redirectUrl)
                    }
                } else {
                    alert("Payment Verification Failed!");
                }
            },
            modal: {
                ondismiss: function () {
                    alert("Payment Failed");
                },
            },
            // this work done after login 
            prefill: {
                name: "Abhay Mewada", // Replace with dynamic user data
                email: "abhay.mewada@gmail.com", // Replace with dynamic user data
                contact: "1234567890", // Replace with dynamic user data
            },
            theme: {
                color: "#003467",
            },
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();
        setLoading(false);
    };

    return { handlePayment, loading };
};
