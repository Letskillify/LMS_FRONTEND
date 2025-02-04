import { toast, Bounce } from "react-toastify";

const useGlobalToast = () => {
  const showToast = (message, type = "info") => {
    toast[type](message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
      transition: Bounce,
    });
  };

  return showToast;
};

export default useGlobalToast;
