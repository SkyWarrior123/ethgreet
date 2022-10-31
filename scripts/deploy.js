const hre = require("hardhat");

async function main() {
  const Greeter = await hre.ethers.getContractFactory("Greeter");
  const greeter = await Greeter.deploy("Hello Ether");
  await greeter.deployed();

  console.log(`Greeter contract was successfully deployed to ${greeter.address} `);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// Contract address : 0x5FbDB2315678afecb367f032d93F642f64180aa3
