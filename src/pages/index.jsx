import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "../../styles/Home.module.css";
import { connectEthereum } from "../ethereum";
import styled from "styled-components";
import Panel from "../components/Panel";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: yellowgreen;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  min-height: 70px;
  max-height: 70px;
  background-color: purple;
  padding: 10px;

  color: white;
  font-size: 17px;
  font-family: monospace, Arial, Helvetica, sans-serif;

  div {
    display: inline-block;
    margin: 5px;
    padding: 0;
  }
`;

export const Main = styled.div`
  height: 100vh;
  background-color: black;
  font-family: monospace, Impact, Haettenschweiler, "Arial Narrow Bold",
    sans-serif;
  color: white;

  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

export default function Home() {
  const [info, setInfo] = useState({});

  useEffect(() => {
    const done = async () => {
      const [account, netId, contract, balance] = await connectEthereum();
      setInfo((info) => ({
        ...info,
        account: account,
        balance: parseInt(balance),
        contract: contract,
        netId: netId,
      }));
    };
    done();
  }, []);

  return (
    <Container className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header>
        <div>Address: {info.account} | </div>
        <div>Balance: {info.balance} | </div>
        <div>NetId: {info.netId}</div>
      </Header>
      <Main>
        <Panel></Panel>
      </Main>
    </Container>
  );
}
