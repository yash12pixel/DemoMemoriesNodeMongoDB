import { toast } from "react-toastify";

export const toastMessageFailure = (message) =>
  toast.error(`${message}`, {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    progress: undefined,
  });
