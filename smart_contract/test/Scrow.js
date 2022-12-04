const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Escrow", function () {
  let contract;
  beforeEach(async function () {
    const Escrow = await ethers.getContractFactory("Escrow");
    contract = await Escrow.deploy(5);
  });

  describe("createAggrement", () => {
    it("it should revert with message Details cannot be empty", async () => {
      await contract.deployed();

      await expect(contract.createAggrement("", 0.2)).to.be.revertedWith(
        "Details cannot be empty"
      );
    });
  });
});
