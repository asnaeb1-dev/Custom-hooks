import { useEffect, useMemo, useRef, useState } from "react";
import useFetchData from "./CustomHooks/useFetchData/useFetchData";
import useToggle from "./CustomHooks/useToggle/useToggle";
import useLazyFetch from "./CustomHooks/useLazyFetch/useLazyFetch";
import useCounter from "./CustomHooks/useCounter/useCounter";
import useEventListener from "./CustomHooks/useEventListener/useEventListener";
import useHover from "./CustomHooks/useHover/useHover";
import useOnlineStatus from "./CustomHooks/useOnlineStatus/useOnlineStatus";

import "./App.css";
const App = () => {
  const options = useMemo(
    () => ({
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }),
    []
  );
  const mainOptions = useMemo(
    () => ({
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }),
    []
  );
  const { data, error, isLoading } = useFetchData(
    "https://jsonplaceholder.typicode.com/todos/1",
    options
  );
  const [toggle, setToggle] = useToggle(false);
  const [initFetch, setInitFetch] = useState(false);
  const [counter, increment, decrement] = useCounter(10);
  const divRef = useRef<HTMLElement | null>(null);
  const hoverRef = useRef<HTMLElement | null>(null);
  const eventDataMouseOver = useEventListener(divRef, 'mouseover');
  const eventDataMouseOut = useEventListener(divRef, 'mouseout');
  const [text, setText] = useState("");
  const isHovering: boolean = useHover(hoverRef);
  const isOnline: boolean = useOnlineStatus();
  const {
    data: lazyData,
    error: lazyError,
    isLoading: lazyLoading,
  } = useLazyFetch(
    "https://jsonplaceholder.typicode.com/todos/1",
    mainOptions,
    [],
    initFetch,
    5
  );

  useEffect(() => {
    console.log("mouse over", eventDataMouseOver)
    console.log("mouse out", eventDataMouseOut)

  }, [eventDataMouseOver, eventDataMouseOut]);

  useEffect(() => {
    console.log("isHovering", isHovering);
  }, [isHovering])

  useEffect(() => {
    console.log("is online", isOnline);
  }, [isOnline]);

  return (
    <>
      <div>
        {isLoading
          ? "Data Loading..."
          : error
          ? "Error"
          : "no error-->" + data?.data?.title}
      </div>
      <button onClick={setToggle}>CLick</button>
      <div>Is Enabled: {toggle ? "hello" : "bye"}</div>
      <div>
        <p>Lazy fetch</p>
        <button onClick={() => setInitFetch(true)}>Fetch</button>
        <div>
          {lazyLoading && "Loading..."}
          {lazyError && "Error"}
          {lazyData && "Data: " + lazyData?.responseData.title}
        </div>
      </div>
      <div>
        <p>{counter}</p>
        <button onClick={increment}>Increment</button>
        <button onClick={decrement}>Decrement</button>
      </div>
      <div ref={divRef} style={{ width: "100%", background: "red" }}>
          hello!!
      </div>
      <div ref={hoverRef} style={{ width: "200px", height: "200px", background: "blue" }}>
      </div>
    </>
  );
};

export default App;
