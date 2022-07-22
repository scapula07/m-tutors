//SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;
pragma abicoder v2;
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/interfaces/IERC20.sol";
import  "./token.sol";

 contract ScapulaRewardMinter is Ownable{
   IERC20 public SCAAP;
   ISCAAP public SCAPULA;
   mapping(address => uint) public rewards;
   event setreward (
       uint amount,
       address indexed account
  );
  event claim (
      uint amount,
      address indexed account
  );

    constructor(address _SCAAPaddress) {
        SCAAP = IERC20(_SCAAPaddress);
        SCAPULA=ISCAAP(_SCAAPaddress);
    }
      
     function getReward(address account)  public view returns(uint256)  {
       uint256 balance= rewards[account];
        return balance;
    }

     function setReward(address account,uint256 amount)  public onlyOwner  {
        rewards[account] = amount;
        emit setreward(amount,account);
    }

    function claimReward(address _address, address _spender) public{
        uint256 rewardAmount = rewards[_address];
        SCAPULA._mintReward(_address,rewardAmount);
       
        SCAAP.transferFrom(_spender,_address, rewardAmount);
        emit claim(rewardAmount,_address);
    }
    
 }
