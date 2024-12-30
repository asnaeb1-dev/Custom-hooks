import { useMemo, useState } from "react";
import useFetchData from "./CustomHooks/useFetchData/useFetchData";
import useToggle from "./CustomHooks/useToggle/useToggle";
import useLazyFetch from "./CustomHooks/useLazyFetch/useLazyFetch";
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
  const {
    data: lazyData,
    error: lazyError,
    isLoading: lazyLoading,
  } = useLazyFetch(
    "https://jsonplaceher.typicode.com/todos/1",
    mainOptions,
    [],
    initFetch,
    5
  );
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
    </>
  );
};

export default App;
