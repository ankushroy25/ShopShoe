import React from "react";
import Alert from "@mui/material/Alert";

const OrderConfirm = () => {
  return (
    <div>
      <Alert severity="success" onClose={() => setShowAlert(false)}>
        Your order has been placed successfully!
      </Alert>
    </div>
  );
};

export default OrderConfirm;
