import {React , useState , useContext} from 'react';
import { PolygonIcon } from '../PolygonIcon';
import Button from '../ui/Button';
import { TextInput, TextInputArea } from '../ui/Form';
import ToggleNutton from '../ui/ToggleButton';
import { TransactionContext } from '../../context/transactionContext';

export default function ContractForm() {
	const [available, setAvailable] = useState(false);
    const { formData, createContract} = useContext(TransactionContext);

    const handleSubmit = (e) => {
        const { price , agreement } = formData;

        e.preventDefault();

        if (!price || !agreement) return;

        createContract();
    };

	return (
		<div>
			<h5 className='font-orbitron text-[20px] leading-[30px] text-white'>Create new contract agreement</h5>

			<div className='my-8'>
				<TextInput
					label={'Price'}
					name='price'
					type={'number'}
					marker={<PolygonIcon />}
					// value={currValue}
					// onChange={(e) => setCurrValue(e.target.value)}
				/>
				<TextInputArea/>

				<div className='my-4'>
					<ToggleNutton label={'Contract available'} enabled={available} setEnabled={setAvailable} />
				</div>
			</div>
			<div className='flex justify-end '>
				<Button 
				title={'Create Contract'}
				onClick={handleSubmit} />
			</div>
		</div>
	);
}
