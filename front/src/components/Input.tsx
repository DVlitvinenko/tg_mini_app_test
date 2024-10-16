import React, { HTMLInputTypeAttribute } from "react";
import MaskedInput from "react-text-mask";
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  type?: HTMLInputTypeAttribute;
}

const CustomInput: React.FC<InputProps> = ({ label, type, ...inputProps }) => {
  return (
    <div className="w-full">
      <label>
        {label}
        {type !== "phone" && (
          <input
            className="p-2 border-2 rounded-sm w-full h-10 "
            {...inputProps}
          />
        )}
        {type === "phone" && (
          <MaskedInput
            mask={[
              "+",
              "7",
              "(",
              /[0-9]/,
              /[0-9]/,
              /[0-9]/,
              ")",
              " ",
              /[0-9]/,
              /[0-9]/,
              /[0-9]/,
              "-",
              /[0-9]/,
              /[0-9]/,
              "-",
              /[0-9]/,
              /[0-9]/,
            ]}
            className="p-2 border-2 rounded-sm w-full h-10 "
            placeholder="+7(999) 999-99-99"
            guide={false}
            {...inputProps}
          />
        )}
      </label>
    </div>
  );
};

export default CustomInput;
