import { React , useEffect , useState , createContext } from "react";
import { ethers } from "ethers";
import { contractABI , contractAddress} from "../utils/constants"

export const TransactionContext = createContext();

const { ethereum } = window;

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);
    
    return transactionContract;
}


export const TransactionProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState("");
    const [formData, setformData] = useState({ price: "", agreement: "" });

    // Check if wallet is connected
    const checkWalletConnected = async () => {
        try {
          if (!ethereum) return alert("Please install MetaMask.");
    
          const accounts = await ethereum.request({ method: "eth_accounts" });
    
          if (accounts.length) {
            setCurrentAccount(accounts[0]);
          } else {
            console.log("No accounts found");
          }
        } catch (error) {
          console.log(error);
        }
      };

    // Connect Application to Metamask wallet
    const connectWallet = async () => {
        try {
          if (!ethereum) return alert("Please install MetaMask.");
    
          const accounts = await ethereum.request({ method: "eth_requestAccounts", });
          setCurrentAccount(accounts[0]);
          window.location.reload();
        } catch (error) {
          console.log(error);
          throw new Error("No ethereum object");
        }
      };

    // Create Contract
    const createContract = async () => {
        try {
            if (!ethereum) return alert("Please Install metamask");
            const transactionContract = getEthereumContract();
            const { price, agreement } = formData;
            const parsedAmount = ethers.utils.parseEther(price)
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object");
        }
    }

    useEffect(() => {
        checkWalletConnected();
      },[]);


      return(
        <TransactionContext.Provider value={{
            connectWallet,}}>
            {children}
        </TransactionContext.Provider>
    )

}