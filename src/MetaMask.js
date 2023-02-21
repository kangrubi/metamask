import React, { useState } from "react";
import { ethers } from "ethers";
import { useStateValue } from "./StateProvider";

const MetaMask = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [userBalance, setUserBalance] = useState(null);

  const [{ user }, dispatch] = useStateValue();

  // 이더리움 또는 메타마스크를 가지고 있는지 확인
  const connectwallet = () => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result) => {
          accountChanged([result[0]]);
          localStorage.setItem("token", result);

          console.log(result);
        });
    } else {
      setErrorMessage("Install MetaMask please!");
    }
  };

  // 금액 불러오기
  const getUserBalance = (accountAddress) => {
    window.ethereum
      .request({
        method: "eth_getBalance",
        params: [String(accountAddress), "latest"],
      })
      .then((balance) => {
        setUserBalance(ethers.formatEther(balance));
        console.log("result", balance);
      });
  };

  const accountChanged = (accountName) => {
    setDefaultAccount(accountName);
    getUserBalance(accountName);
    dispatch({
      type: "SET_USER",
      user: accountName,
    });
  };

  return (
    <div>
      <h1>MetaMask Wallet Connection</h1>

      <button onClick={connectwallet}>Connect Wallet</button>
      <h3>Address: {user}</h3>
      <h3>Balance: {userBalance}</h3>
      {errorMessage}
    </div>
  );
};

export default MetaMask;
