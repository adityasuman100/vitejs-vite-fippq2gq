// file: App.js
import React from "react";
import ToastProvider, { useToast } from "../hooks/ToastProvider";

const App = () => {
    const showToast = useToast();

    const handleShowToast = () => {
        showToast("This is an info message!", "info");
        // showToast("Warning! Something might be wrong.", "warning");
        // showToast("Success! Operation completed.", "success");
    };

    return (
        <div>
            <h1>React Toast Notification Demo</h1>
            <button onClick={handleShowToast}>Show Toasts</button>
        </div>
    );
};

export default function Main() {
    return (
        <ToastProvider>
            <App />
        </ToastProvider>
    );
}
