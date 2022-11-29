// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const path = require("path");

async function main() {

    // ethers is available in the global scope
    const [deployer] = await ethers.getSigners();

    console.log(
      "Deploying the contracts with the account:",
      await deployer.getAddress()
    );

    console.log("Account balance:", (await deployer.getBalance()).toString());
    const _percentage = 15;
    const Escrow = await ethers.getContractFactory("Escrow");
    const escrow = await Escrow.deploy(_percentage);
    await escrow.deployed();
  
    console.log("Token address:", escrow.address);
      // We also save the contract's artifacts and address in the frontend directory
      saveFrontendFiles(escrow);
}

function saveFrontendFiles(escrow) {
  const fs = require("fs");
  const contractsDir = path.join(__dirname, "../..", "client", "src", "contracts");

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir,{recursive: true});
  }

  fs.writeFileSync(
    path.join(contractsDir, "contract-address.json"),
    JSON.stringify({ Escrow: escrow.address }, undefined, 2)
  );

  const EscrowArtifact = artifacts.readArtifactSync("Escrow");

  fs.writeFileSync(
    path.join(contractsDir, "Escrow.json"),
    JSON.stringify(EscrowArtifact, null, 2)
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
