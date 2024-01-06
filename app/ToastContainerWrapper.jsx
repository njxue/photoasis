"use client";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastContainerWrapper = () => {
  return <ToastContainer position={toast.POSITION.BOTTOM_RIGHT} limit={1} />;
};
export default ToastContainerWrapper;
