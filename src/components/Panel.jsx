import styled from "styled-components";
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { isEmpty } from "lodash";

export const Container = styled.div`
  width: 350px;
  height: 400px;
  border-radius: 10px;
  margin: 10px;
  background-color: violet;

  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  color: black;
  font-size: 18px;

  * {
    margin: 0 auto;
    margin-top: 5px;
  }

  input {
    height: 35px;
    font-size: 20px;
  }

  button {
    height: 35px;
    font-size: 20px;
  }
`;

const Panel = ({ info, type }) => {
  const [firstValue, setFirstValue] = useState("");
  const [secondValue, setSecondValue] = useState("");
  const [isForm, setIsForm] = useState(true);
  const [totalSupply, setTotalSupply] = useState(0);

  useEffect(() => {
    //
    if (type === 1) {
      setIsForm(true);
    } else {
      setIsForm(false);
    }

    if (!info) {
      setIsForm(false);
    } else {
      const done = async () => {
        if (!isEmpty(info)) {
          console.log(info);
          const ts = await info.contract.totalSupply();
          setTotalSupply(parseInt(ts));
        }
      };

      done();
    }
  }, [info]);

  const handlerDeposit = (e) => {
    setFirstValue(e.target.value);
  };

  const handlerWithdraw = (e) => {
    setSecondValue(e.target.value);
  };

  const handlerSubmit = async (e) => {
    e.preventDefault();

    if (firstValue && secondValue) {
      alert("error");
      return;
    }

    if (!parseInt(firstValue) && !parseInt(secondValue)) {
      console.log(`Only number are allowed!`);
      setFirstValue("");
      setSecondValue("");
      return;
    }

    if (firstValue) {
      //deposit

      // const ethValue = ethers.utils.formatEther(weiValue);
      // const balanceOf = await info.contract.balanceOf(info.account);

      // const value = ethers.utils.parseEther(firstValue.toString());
      let value = ethers.utils.parseUnits(firstValue.toString(), "wei");
      value = value.toString();

      const tx = await info.contract.deposit({ value: value });
      console.log(tx);
    }

    if (secondValue) {
      //withdraw
      console.log(`withdraw ${secondValue}`);

      let value = ethers.utils.parseUnits(secondValue.toString(), "wei");
      value = value.toString();

      const tx = await info.contract.withdraw(value);
      console.log(tx);
    }

    setFirstValue("");
    setSecondValue("");
  };

  return (
    <Container>
      {isForm ? (
        <form onSubmit={handlerSubmit}>
          <h3>DEPOSIT</h3>
          <input
            type="text"
            value={firstValue}
            placeholder="in Weis"
            onChange={(e) => handlerDeposit(e)}
          />
          <br />
          <button>Deposit</button>
          <h3>WITHDRAW</h3>
          <input
            type="text"
            value={secondValue}
            placeholder="in Weis"
            onChange={(e) => handlerWithdraw(e)}
          />
          <br />
          <button>Withdraw</button>
        </form>
      ) : (
        <div>
          <h3>Total ETH Lended</h3>
          <h3 style={{ textAlign: "center" }}>{totalSupply}</h3>
        </div>
      )}
    </Container>
  );
};

export default Panel;
