import {useState, useEffect} from "react";
import {ethers} from "ethers";
import token_abi from "../artifacts/contracts/MToken.sol/Mtoken.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [token, setToken] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const [supply, setSupply] = useState(undefined);
  const [data, setData] = useState({
    account: "",
    amount: 0
  });

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const tokenABI = token_abi.abi;

  // handle wallet ----------------------------------------------------------------------------
  const getWallet = async() => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const account = await ethWallet.request({method: "eth_accounts"});
      handleAccount(account);
    }
  }

  // handle account ----------------------------------------------------------------------------
  const handleAccount = (account) => {
    if (account) {
      console.log ("Account connected: ", account);
      setAccount(account);
    }
    else {
      console.log("No account found");
    }
  }

  const connectAccount = async() => {
    if (!ethWallet) {
      alert('MetaMask wallet is required to connect');
      return;
    }
  
    const accounts = await ethWallet.request({ method: 'eth_requestAccounts' });
    handleAccount(accounts);
    
    // once wallet is set we can get a reference to our deployed contract
    getTokenContract();
  };

  // handle contract --------------------------------------------------------------------------
  const getTokenContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const tokenContract = new ethers.Contract(contractAddress, tokenABI, signer);
 
    setToken(tokenContract);
  }

  // get input box value -----------------------------------------------------------------------
  const getValue = (val) => {
    const name = val.target.name;
    const value = val.target.value;

    // update data
    setData((prev) => {
      return {...prev, [name]: value}
    })
  }

  // contract functions -----------------------------------------------------------------------
  const getBalance = async() => {
    if (token) {
      setBalance((await token.getBalance(String(account))).toNumber());
    }
  }

  const getTotalSupply = async() => {
    if (token) {
      setSupply((await token.getTotalSupply()).toNumber());
    }
  }

  const mint = async(event) => {
    event.preventDefault(); //stop page from refreshing

    if (token) {
      let tx = await token.mintToken(data.account);
      await tx.wait()

      getBalance();
      getTotalSupply();
    }
  }

  const burn = async(event) => {
    event.preventDefault(); //stop page from refreshing

    if (token) {
      let tx = await token.burnToken(String(account), data.amount);
      await tx.wait()

      getBalance();
      getTotalSupply();
    }
  } 

  const transfer = async(event) => {
    event.preventDefault(); //stop page from refreshing

    if (token) {
      let tx = await token.transferToken(data.account, data.amount);
      await tx.wait()

      getBalance();
    }
  }
  
  // initialize page -----------------------------------------------------------------------------
  const initUser = () => {
    // Check to see if user has Metamask
    if (!ethWallet) {
      return <p>Please install Metamask in order to use CrafterToken Wizard.</p>
    }

    // Check to see if user is connected. If not, connect to their account
    if (!account) {
      return <button onClick={connectAccount}>Please connect your Metamask wallet</button>
    }

    if (balance == undefined) {
      getBalance();
    }

    if (supply == undefined) {
      getTotalSupply();
    }

    return (
      <div>
        <p>Your Account: {account}</p>
        <p>Total Supply of CTK: {supply}</p>
        <p>Your Balance: {balance}</p>
        
        <form action="">
          <div>
            <label>Enter account address:    </label>
            <input type ="text" name="account" onChange={getValue}/>
          </div>

          <div>
            <label>Enter amount:    </label>
            <input type ="number" name="amount" onChange={getValue}/>
          </div>

          <button onClick={mint}>Mint 100 CTK</button>
          <button onClick={burn}>Burn CTK</button>
          <button onClick={transfer}>Transfer CTK</button>
        </form>
      </div>
    )
  }

  useEffect(() => {getWallet();}, []);

  return (
    <main className="container">
      <header><h1>Welcome to the CrafterToken Wizard!</h1></header>
      {initUser()}
      <style jsx>{`
        .container {
          text-align: center
        }
      `}
      </style>
    </main>
  )
}