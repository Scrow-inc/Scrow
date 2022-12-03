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
    const [isLoading, setIsLoading] = useState(false);
    const [balance, setBalance] = useState(undefined);

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
          console.log("accounts",accounts);
          setCurrentAccount(accounts[0]);
          // window.location.reload();
        } catch (error) {
          console.log(error);
          throw new Error("No ethereum object");
        }
      };

    // Handle Form Input Event
    const handleChange = (e, name) => {
      setformData((prevState) => ({ ...prevState, [name]: e.target.value }));
      console.log(name);
    };

    // Create Contract
    const createContract = async () => {
        try {
            if (!ethereum) return alert("Please Install metamask");
            const transactionContract = getEthereumContract();
            const { price, agreement } = formData;
            const parsedAmount = ethers.utils.parseEther(price);

            await ethereum.request({
              method: "eth_sendTransaction",
              params : [{
                  from: currentAccount,
                  to: contractAddress,
                  gas: "0x55555",
                  maxFeePerGas: "0x1234",
                  maxPriorityFeePerGas: "0x1234",
                  value: parsedAmount._hex,
              }]
            });

            const transactionHash = transactionContract.createAggrement(agreement, price);

            setIsLoading(true);
            console.log(`Loading = ${transactionHash}`);
            await transactionHash.wait();
            setIsLoading(false);
            console.log(`Success = ${transactionHash.hash}`);

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
            connectWallet,
            currentAccount, 
            formData,
            handleChange,
            createContract}}>
            {children}
        </TransactionContext.Provider>
    )

}