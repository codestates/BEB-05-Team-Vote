// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/// @custom:security-contact jadenyoon@havruta.guru
contract HADAPASS2022 is ERC721URIStorage, Ownable {

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    IERC20 token;
    address private _tokenAdress;
    uint256 public nftPrice;

    constructor() ERC721("HADA Pass NFT 2022", "HADAPASS2022") {

    }

    event NewNFTPrice(uint256 nftPrice);

    function updateNFTPrice(uint256 _value) public onlyOwner  {
        nftPrice = _value;
        emit NewNFTPrice(_value);
    }

    function mintNFT(address recipient, string memory tokenURI) public returns (uint256) {
        require(nftPrice > 0, "you must set nft price!");
        require(token.balanceOf(recipient) > nftPrice);

        token.transferFrom(recipient, _tokenAdress, nftPrice);
        
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }

    function updateTokenContractAdress (address tokenAddress) public onlyOwner returns (bool) {
        require(tokenAddress != address(0x0));
        token = IERC20(tokenAddress);
        _tokenAdress = tokenAddress;
        return true;
    }

    function TokenContractAdress() public view virtual returns (IERC20) {
        return token;
    }

}