import { useState } from "react";

const UseInputHook = (initialValues) => {
  const [value, setValue] = useState(initialValues);

  const bind = {
    value,
    onChange: (e) => {
      setValue(e.target.value);
    },
  };

  let reset = () => {
    setValue(initialValues);
  };
  return [value, bind, reset];
};

export default UseInputHook;
