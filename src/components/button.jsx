import React from "react";
import "./button.css";
export const CustomButton = ({ onClick, children, whatsapp }) => {
  return !whatsapp ? (
    <div className="custom-button text-secondary" onClick={onClick}>
      {children}
    </div>
  ) : (
    <div className="custom-button whatsapp text-secondary" onClick={onClick}>
      {children}
    </div>
  );
};
