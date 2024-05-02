import React, { useEffect } from "react";

interface RazorpayButtonProps {
  onCheckout: any;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

const RazorpayButton: React.FC<RazorpayButtonProps> = ({ onCheckout }) => {
  useEffect(() => {
    const loadRazorpayScript = () => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);
    };

    const button = document.getElementById("rzp-button1");

    if (button) {
      button.onclick = function (e) {
        if (window.Razorpay) {
          onCheckout();
          e.preventDefault();
        } else {
          loadRazorpayScript();
          e.preventDefault();
          button.click();
        }
      };
    }
  }, [onCheckout]);

  return (
    <button id="rzp-button1" className=" bg-green-600 h-14 w-36 my-10 text-white  text-xl font-semibold rounded-xl hover:bg-black">
      Enroll Now
    </button>
  );
};

export default RazorpayButton;
