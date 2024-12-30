import { useState } from "react"


const useToggle = (init = false) => {
  const [isEnabled, setEnabled] = useState(init);

  const toggle = () => {
    setEnabled(!isEnabled); // Functional update
  };

  return [ isEnabled, toggle ];
};


export default useToggle