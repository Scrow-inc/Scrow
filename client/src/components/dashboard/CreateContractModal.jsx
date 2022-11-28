import { useState } from 'react';
import Modal from '../ui/Modal';
import ContractForm from './ContractForm';
import { ContractTerms } from './ContractTerms';

export default function CreatecontractModal({ isOpen, openModal, closeModal }) {
	const [step, setStep] = useState(0);

	// move to the next step
	const nextStep = () => {
		setStep(step + 1);
	};

	// Go back to previous step
	const prevStep = () => {
		setStep(step - 1);
	};
	return (
		<Modal isOpen={isOpen} openModal={openModal} step={step} prevStep={prevStep} closeModal={closeModal}>
			{modalHandler(step, nextStep)}
		</Modal>
	);
}

function modalHandler(step, nextStep) {
	const handlers = {
		0: <ContractTerms nextStep={nextStep} />,
		1: <ContractForm />,
	};

	return handlers[step];
}
