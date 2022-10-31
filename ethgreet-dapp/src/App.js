import './App.css';
import { useState } from 'react';
import { ethers } from 'ethers';
import Greeter from './artifacts/contracts/Greeter.sol/Greeter.json';

// My ethereum contract address 
const greeterAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

function App() {
  // storing greetings in a local storage
  const [greeting, setGreetingValue] = useState()

  // requesting for users ethereum address (Metamask)
  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts'});
  }

  // reading the current value from the smart contract
  async function fetchGreeting() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, provider);
      try {
        const data = await contract.greet();
        console.log('Hi :', data);
      } catch (err) {
        console.log('Error :', err);
      }
    }
  }

  // setting the value on the smart contract
  async function setGreeting() {
    if (!greeting) return
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, signer);
      const transaction = await contract.setGreeting(greeting);
      await transaction.wait()
      fetchGreeting();
    }
  }
  return (
    <div className="App">
      <header className='app-header'>
        < button onClick={fetchGreeting}> Fetch Greeting</button>
        < button onClick={setGreeting}> Set Greeting</button>
        < input onChange={e => setGreetingValue(e.target.value)} placeholder=" Set Greeting" />
      </header>
    </div>
  );
}

export default App;
