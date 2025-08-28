"use client";

import { Toaster } from "react-hot-toast";

const ToastProvider = () => {
  return (
    <Toaster
      toastOptions={{
        style: {
          background: "#333",
          color: "#fff",
          borderRadius: "10px",
        },

        success: {
          iconTheme: {
            primary: "#22c55e",
            secondary: "#1e1e1e",
          },
        },

        error: {
          iconTheme: {
            primary: "#ef4444",
            secondary: "#1e1e1e",
          },
        },
      }}
    />
  );
};

export default ToastProvider;
