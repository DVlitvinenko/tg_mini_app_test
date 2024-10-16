import React, { ReactElement } from "react";

const Button = ({
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <div>
      <button className="" {...props}></button>
    </div>
  );
};

export default Button;
