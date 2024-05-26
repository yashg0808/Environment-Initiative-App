import React, { useState } from "react";
import { useAppSelector } from "../../store";
import SearchIcon from "../icons/SearchIcon";

const SearchInput = (props) => {
  const { placeholder, onChangeHandler, onBlurHandler, submitHandler, className = '' } = props;

  const isRTL = useAppSelector((state) => state.language.isRTL);

  const [inputValue, setInputValue] = useState("");

  const onChange = (event) => {
    setInputValue(event.target.value);

    if (typeof onChangeHandler === "function") {
      onChangeHandler(event.target.value);
    }
  };

  const onBlur = (event) => {
    if (typeof onBlurHandler === "function") {
      onBlurHandler(event.target.value);
    }
  };

  const submit = (event) => {
    event.preventDefault();
    if (typeof submitHandler === "function") {
      submitHandler(inputValue);
    }
  };

  return (
    <form
      className={`flex justify-between items-center rounded-xl bg-neutral-100 px-4 py-2 ${className}`}
      onSubmit={submit}
    >
      <input
        type="text"
        placeholder={placeholder}
        dir={isRTL ? 'rtl' : 'ltr'}
        className="flex-1 bg-neutral-100 outline-none text-xs"
        onChange={onChange}
        onBlur={onBlur}
      />
      <button type="submit">
        <SearchIcon className="w-6 h-6 text-black" />
      </button>
    </form>
  );
};

export default SearchInput;
