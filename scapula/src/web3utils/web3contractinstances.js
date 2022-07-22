import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import scaap from "../abi/ScapulaToken.json"
import iscaap from "../abi/ISCAAP.json"
import scaapReward from "../abi/ScapulaRewardMinter.json"
import  HDWalletProvider from "@truffle/hdwallet-provider";
const Web3 =require("web3")

//const scapulaVidAddress ="0xCBB33Fa1829DCBd0aD366c2163fb99C31E63790C"
const privateKey="b008f256a7077cfb370e84be807022169d2f1f33c02615549cc5e13b66cc24d9"
const https_provider = new HDWalletProvider(
    privateKey,
    "https://polygon-mumbai.g.alchemy.com/v2/5-PAZiyQpRy1ouUxhD2vW3_KjGwxPRWi"
     )
 const web3 =createAlchemyWeb3("https://polygon-mumbai.g.alchemy.com/v2/5-PAZiyQpRy1ouUxhD2vW3_KjGwxPRWi",{writeProvider:https_provider})

export const scaapContract = new web3.eth.Contract(
    scaap.abi,
    "0x98bba3188397038834EFbc0d80B6bCF9a9efFBe3"
)

export const scaapRewardContract = new web3.eth.Contract(
    scaapReward.abi,
    "0xe1E8843E93b66b3889EfEfBF478fB1a956A1DBFa"
)

