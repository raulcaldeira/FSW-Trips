"use client"

import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";

const ToastProvider = ({ children }: {children: ReactNode}) => {

    return (
        <>
            {children}
            <ToastContainer />
        </>
    )
}

export default ToastProvider;