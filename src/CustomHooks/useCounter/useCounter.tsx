import { useState } from "react"

type useCounterType = [number, () => void, () => void]

const useCounter = (value = 0): useCounterType => {
  const [counter, setCounter] = useState(value);
  const increment = () => {
    setCounter(counter + 1);
  }

  const decrement = () => {
    setCounter(counter - 1);
  }

  return [counter, increment, decrement];
}

export default useCounter