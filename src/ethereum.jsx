import { ethers } from "ethers";
import Bank from "./build/Bank";

export async function connectEthereum() {
  const [account] = await window.ethereum.request({ method: "eth_accounts" });
  const netId = await window.ethereum.request({ method: "net_version" });

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(
    Bank.networks["5777"].address,
    Bank.abi,
    signer
  );

  const balance = await provider.getBalance(account);

  // contract.once("ANYMETHOD", () => {
  // do something
  // });

  return [account, netId, contract, balance];
}
