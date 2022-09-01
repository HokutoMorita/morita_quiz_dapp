// SPDX-License-Identifier: MIT
pragma solidity  ^0.8.9;
import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract TmpPenNFT is ERC721 {
    string public constant TOKEN_URL = "ipfs://bafybeig37ioir76s7mg5oobetncojcm3c3hxasyd4rvid4jqhy4gkaheg4/?filename=0-PUG.json";

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    event NftMinted(uint256 indexed tokenId);

    constructor() ERC721("PenNFT", "PNT") {}

    function safeMint() public {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(msg.sender, tokenId);
        emit NftMinted(tokenId);
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
        return TOKEN_URL;
    }

    function getTokenCounter() public view returns (uint256) {
        return _tokenIdCounter.current();
    }
}
