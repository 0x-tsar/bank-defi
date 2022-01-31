import { ethers } from "ethers";
import Bank from "./build/Bank";

export async function connectEthereum() {
  const [account] = await window.ethereum.request({ method: "eth_accounts" });
  const netId = await window.ethereum.request({ method: "net_version" });

  if (!account) {
    return;
  }

  if (typeof window.ethereum === "undefined") {
    alert("Metamask not installed");
  }

  ethereum.on("chainChanged", (chainId) => {
    window.location.reload();
  });

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  let contract;

  if (netId === "5777") {
    contract = new ethers.Contract(
      Bank.networks["5777"].address,
      Bank.abi,
      signer
    );
  } else {
    contract = new ethers.Contract(
      Bank.networks["80001"].address,
      Bank.abi,
      signer
    );
  }

  const balance = await provider.getBalance(account);
  const balanceWeth = await contract.balanceOf(account);

  return [account, netId, contract, balance, balanceWeth];
}
