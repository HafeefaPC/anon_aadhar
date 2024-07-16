'use client';
import { useState, useEffect } from 'react';
import Web3 from 'web3';
import { LogInWithAnonAadhaar, useAnonAadhaar, AnonAadhaarProof } from '@anon-aadhaar/react';

const Home = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [ethBalance, setEthBalance] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [revealAge, setRevealAge] = useState(false);
  const [revealGender, setRevealGender] = useState(false);
  const [revealState, setRevealState] = useState(false);
  const [revealPinCode, setRevealPinCode] = useState(false);
  const [anonAadhaar] = useAnonAadhaar();

  const detectCurrentProvider = () => {
    let provider;
    if (window.ethereum) {
      provider = window.ethereum;
    } else if (window.web3) {
      provider = window.web3.currentProvider;
    } else {
      console.log('Non-ethereum browser detected. You should install Metamask');
    }
    return provider;
  };

  const onConnect = async () => {
    try {
      const currentProvider = detectCurrentProvider();
      if (currentProvider) {
        await currentProvider.request({ method: 'eth_requestAccounts' });
        const web3 = new Web3(currentProvider);
        const userAccounts = await web3.eth.getAccounts();
        const account = userAccounts[0];
        let balance = await web3.eth.getBalance(account);
        setEthBalance(balance);
        setWalletAddress(account);
        setIsConnected(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const onDisconnect = () => {
    setIsConnected(false);
    setEthBalance('');
    setWalletAddress('');
  };

  const handleRevealToggle = (field) => {
    switch (field) {
      case 'age':
        setRevealAge(!revealAge);
        break;
      case 'gender':
        setRevealGender(!revealGender);
        break;
      case 'state':
        setRevealState(!revealState);
        break;
      case 'pincode':
        setRevealPinCode(!revealPinCode);
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-blue-500 rounded-lg p-12 text-white">
        <h1 className="text-2xl font-bold mb-4">Connect Your Wallet</h1>
        {!isConnected ? (
          <div>
            <button
              className="bg-pink-400 hover:bg-slate-100 text-black font-bold py-2 px-4 rounded"
              onClick={onConnect}
            >
              Connect
            </button>
          </div>
        ) : (
          <div className="app-wrapper">
            <div>
              <h2>You are connected to MetaMask.</h2>
              <div>
                <span>Address: {walletAddress}</span>
              </div>
              <div>
                <span>Balance: {ethBalance}</span>
              </div>
            </div>
            <div className="flex flex-row gap-4 p-3">
              <button
                className="bg-black hover:bg-slate-600 text-white font-bold py-2 px-4 rounded"
                onClick={onDisconnect}
              >
                Disconnect
              </button>
            </div>
          </div>
        )}
      </div>

      {isConnected && (
        <div className="flex justify-center p-8 items-center space-x-4">
          <div className="border rounded-lg p-4 border-white">
            <LogInWithAnonAadhaar
              nullifierSeed={1234}
              fieldsToReveal={[
                revealAge && 'revealAgeAbove18',
                revealGender && 'revealGender',
                revealState && 'revealState',
                revealPinCode && 'revealPinCode',
              ].filter(Boolean)}
            />
          </div>

          <div className="ml-3 border rounded-lg p-6">
            <p>{anonAadhaar.status}</p>
            {anonAadhaar.status === 'logged-in' && (
              <>
                <p>✅ Proof is valid</p>
                <AnonAadhaarProof code={JSON.stringify(anonAadhaar.anonAadhaarProof, null, 2)} />
              </>
            )}
          </div>

          <div className="flex flex-col ml-3 border rounded-lg p-6">
            <p>Choose data to reveal:</p>
            <label>
              <input type="checkbox" checked={revealAge} onChange={() => handleRevealToggle('age')} />
              Reveal Age Above 18
            </label>
            <label>
              <input type="checkbox" checked={revealGender} onChange={() => handleRevealToggle('gender')} />
              Reveal Gender
            </label>
            <label>
              <input type="checkbox" checked={revealState} onChange={() => handleRevealToggle('state')} />
              Reveal State
            </label>
            <label>
              <input type="checkbox" checked={revealPinCode} onChange={() => handleRevealToggle('pincode')} />
              Reveal PinCode
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
