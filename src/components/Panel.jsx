import React, { useEffect, useState } from "react";
import styled from "styled-components";

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

const Panel = ({ contract }) => {
  const [firstValue, setFirstValue] = useState("");
  const [secondValue, setSecondValue] = useState("");

  useEffect(() => {
    console.log(contract);
  }, [contract]);

  const handlerDeposit = (e) => {
    setFirstValue(e.target.value);
  };

  const handlerWithdraw = (e) => {
    setSecondValue(e.target.value);
  };

  const handlerSubmit = (e) => {
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
      console.log(`deposit ${firstValue}`);
    }

    if (secondValue) {
      //withdraw
      console.log(`withdraw ${secondValue}`);
    }

    setFirstValue("");
    setSecondValue("");
  };

  return (
    <Container>
      <form onSubmit={handlerSubmit}>
        <h3>DEPOSIT</h3>
        <input
          type="text"
          value={firstValue}
          onChange={(e) => handlerDeposit(e)}
        />
        <br />
        <button>Deposit</button>
        <h3>WITHDRAW</h3>
        <input
          type="text"
          value={secondValue}
          onChange={(e) => handlerWithdraw(e)}
        />
        <br />
        <button>Withdraw</button>
      </form>
    </Container>
  );
};

export default Panel;
