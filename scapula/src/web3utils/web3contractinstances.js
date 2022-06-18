import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import scapulaVidAbi from "../abi/ScapulaVids.json"
const Web3 =require("web3")

const scapulaVidAddress ="0xCBB33Fa1829DCBd0aD366c2163fb99C31E63790C"
export const web3 = new Web3(window.ethereum)

export const vidContract = new web3.eth.Contract(
    scapulaVidAbi.abi,
    scapulaVidAddress
)
