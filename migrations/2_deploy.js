const Bank = artifacts.require("Bank");

module.exports = async (deployer) => {
  await deployer.deploy(Bank);
  const bank = await Bank.deployed();
  console.log(`deployed at ${bank.address}`);
};
