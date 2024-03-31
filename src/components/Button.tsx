import React from "react";

type TButton = {
  bgColor: string,
  color: string,
  size?: string,
  text: string,
  borderRadius: string
}

const Button: React.FC<TButton> = ({ bgColor, color, size, text, borderRadius }) => {
  return (
    <button
      type="button"
      style={{
        color,
        backgroundColor: bgColor,
        borderRadius,
      }}
      className={`text-${size} p-3 hover:drop-shadow-xl`}
    >{text}</button>
  );
};

export default Button;
