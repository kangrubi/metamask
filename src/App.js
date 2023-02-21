import React, { useEffect } from "react";
import MetaMask from "./MetaMask";
import { useStateValue } from "./StateProvider";

function App() {
  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    if (localStorage) {
      dispatch({
        type: "SET_USER",
        user: localStorage.getItem("token"),
      });
    } else {
      dispatch({
        type: "SET_USER",
        user: null,
      });
    }
  }, [dispatch]);

  return (
    <div className="App">
      <MetaMask />
    </div>
  );
}

export default App;
