import React from "react";

const Button: React.FC<{ onClick?: () => void; }> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600"
    >
      Press me
    </button>
  );
};

export default Button;