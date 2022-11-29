import React, { useState, useEffect } from 'react';
import { Navbar, Hero, Steps, NoWalletDetected, NetworkErrorMessage, AppSection } from './components/components';
import { ethers } from 'ethers';

import EscrowArtifacts from './contracts/Escrow.json';
import contractAddress from './contracts/contract-address.json';

const HARDHAT_NETWORK_ID = '8545';
const ERROR_CODE_TX_REJECTED_BY_USER = 4001;

function App() {
	const [balance, setBalance] = useState(undefined);
	const [networkError, setNetworkError] = useState(undefined);
	const [currentAccount, setCurrentAccount] = useState(undefined);
	const [chainId, setChainId] = useState(undefined);
	const [chainname, setChainName] = useState(undefined);

	const provider = new ethers.providers.Web3Provider(window.ethereum);
	const escrow = new ethers.Contract(contractAddress.Escrow, EscrowArtifacts.abi, provider.getSigner(0));

	useEffect(() => {
		if (!currentAccount || !ethers.utils.isAddress(currentAccount)) return;
		//client side code

		Initailize();
	}, [currentAccount]);

	useEffect(() => {
		getMyEscrowAggrements();
	}, []);

	// get all agrrements of current User
	const getMyEscrowAggrements = async () => {
		const data = await escrow.myAggrements();

		console.log('mydata', data);
	};

	const Initailize = async () => {
		await provider.getBalance(currentAccount).then((result) => {
			setBalance(ethers.utils.formatEther(result));
		});

		await provider.getNetwork().then((result) => {
			setChainId(result.chainId);
			setChainName(result.name);
		});

		console.log('balance', balance);
		console.log('chainId', chainId);
		console.log('chainname', chainname);
		console.log('currentAccount', currentAccount);
	};
	const onClickConnect = () => {
		//client side code
		if (!window.ethereum) {
			console.log('please install MetaMask');
			return;
		}

		//we can do it using ethers.js
		const provider = new ethers.providers.Web3Provider(window.ethereum);

		// MetaMask requires requesting permission to connect users accounts
		provider
			.send('eth_requestAccounts', [])
			.then((accounts) => {
				if (accounts.length > 0) setCurrentAccount(accounts[0]);
			})
			.catch((e) => console.log(e));
	};

	const dismissNetworkError = () => {
		setNetworkError(undefined);
	};

	if (window.ethereum === undefined) {
		return <NoWalletDetected />;
	}

	return (
		<div className='w-full gradient-bg'>
			{networkError && <NetworkErrorMessage message={networkError} dismiss={() => dismissNetworkError()} />}
			<Navbar connectWallet={onClickConnect} balance={balance} />
			{currentAccount && (
				<>
					<AppSection />
				</>
			)}
			{!currentAccount && (
				<>
					<Hero />
					<Steps />
				</>
			)}
		</div>
	);
}

export default App;
