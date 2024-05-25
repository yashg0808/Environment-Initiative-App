import { forwardRef, useId, useState } from "react";
import ErrorMessage from "./ErrorMessage";
import HidePasswordIcon from "../icons/HidePasswordIcon";
import ShowPasswordIcon from "../icons/ShowPasswordIcon";

const Input = forwardRef(
  function InputComponent({ placeholder = "", type = "text", className = "", containerClassName = "", autoComplete = "", errorMessage = "", ...otherProps }, ref) {
    /* Unique id */
    const id = useId();

    /* Password visibility state */
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    /* Toggle password visibility */
    const togglePassword = () => {
      setIsPasswordVisible((prev) => !prev);
    };

    /* Password Input */
    if (type === "password") {
      return (
        <div className={`flex flex-col ${containerClassName}`}>
          <div
            className={`flex justify-between border-b border-b-grey pb-1 focus-within:border-b-black`}
          >
            <input
              ref={ref}
              placeholder={placeholder}
              type={isPasswordVisible ? "text" : type}
              {...otherProps}
              id={id}
              className={`flex-1 outline-none ${className}`}
            //   dir={isRTL ? "rtl" : "ltr"}
              autoComplete={autoComplete}
            />
            <button
              onClick={togglePassword}
              className="h-fit self-end ml-2"
              type="button"
            >
              {isPasswordVisible ? (
                <HidePasswordIcon className="w-4 h-4 text-black" />
              ) : (
                <ShowPasswordIcon className="w-4 h-4 text-black" />
              )}
            </button>
          </div>
          {errorMessage && <ErrorMessage className="mt-1 text-sm" message={errorMessage} isErrorIconShown={false} />}
        </div>
      );
    }
    return (
      <div className={`flex flex-col ${containerClassName}`}>
        <input
          ref={ref}
          placeholder={placeholder}
          type={type}
          {...otherProps}
          id={id}
          className={`outline-none border-b border-b-grey pb-1 focus:border-b-black ${className}`}
        //   dir={isRTL ? "rtl" : "ltr"}
          autoComplete={autoComplete}
        />
        {errorMessage && <ErrorMessage className="mt-1 text-sm" message={errorMessage} isErrorIconShown={false} />}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
