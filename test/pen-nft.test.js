const { expect } = require("chai");
const { ethers, upgrades } = require("hardhat");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

describe("PenNFT", () => {
    const deployMyNftFixture = async () => {
        const PenNFT = await ethers.getContractFactory("PenNFT");
        // const penNFT = await PenNFT.deploy(0);
        // const penNFT =  await upgrades.deployProxy(PenNFT)
        const penNFT =  await upgrades.deployProxy(PenNFT, [], {
            kind: 'uups',
            initializer: "initialize",
          });

        const initTokenId = await penNFT.getTokenCounter();
        return { penNFT, initTokenId };
    };

    it("ミントできること", async () => {
        const { penNFT, initTokenId } = await loadFixture(deployMyNftFixture);
        const [ owner ] = await ethers.getSigners();

        const mintTx = await penNFT.connect(owner).safeMint();
        await mintTx.wait(1);

        // ミントすることでtokenIdに紐づくtokenURIを取得することができる
        const expectedTokenUri = "ipfs://bafybeig37ioir76s7mg5oobetncojcm3c3hxasyd4rvid4jqhy4gkaheg4/?filename=0-PUG.json";
        const actualTokenUri = await penNFT.tokenURI(initTokenId);
        expect(actualTokenUri).to.equal(expectedTokenUri);
    });

    it("ミントすることでtokenIdが変わること", async () => {
        const { penNFT, initTokenId } = await loadFixture(deployMyNftFixture);
        const [ owner ] = await ethers.getSigners();

        const mintTx = await penNFT.connect(owner).safeMint();
        await mintTx.wait(1);

        const expectedTokenId = initTokenId.add(1);
        const actualTokenId = await penNFT.getTokenCounter();
        expect(actualTokenId).to.equal(expectedTokenId);
    })
});
