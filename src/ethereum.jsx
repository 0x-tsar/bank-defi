import { ethers } from "ethers";
import Bank from "./build/Bank";

export async function connectEthereum() {
  const account = await window.ethereum.request({ method: "eth_accounts" });
  const netId = await window.ethereum.request({ method: "net_version" });
  return [account, netId];
}

// export default connectEthereum();
