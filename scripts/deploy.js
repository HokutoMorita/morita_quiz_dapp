const { ethers, upgrades } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  const PenNFT = await ethers.getContractFactory("PenNFT");
  console.log("Deploying PenNFT...");

  const penNFT = await upgrades.deployProxy(PenNFT, [], {
    deployer,
    kind: 'uups',
    initializer: "initialize",
  });
  await penNFT.deployed();

  console.log("PenNFT deployed to:", penNFT.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
