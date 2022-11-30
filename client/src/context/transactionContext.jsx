import { useEffect , useState , createContext } from "react";
import { ethers } from "ethers";

export const TransactionContext = createContext();

const { ethereum } = window;