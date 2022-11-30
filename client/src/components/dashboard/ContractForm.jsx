import React, { useState } from 'react';
import { PolygonIcon } from '../PolygonIcon';
import Button from '../ui/Button';
import { TextInput, TextInputArea } from '../ui/Form';
import ToggleNutton from '../ui/ToggleButton';

export default function ContractForm() {
	// const [currValue, setCurrValue] = useState(initialState);
	const [available, setAvailable] = useState(false);
	return (
		<div>
			<h5 className='font-orbitron text-[20px] leading-[30px] text-white'>Creat new cintract agreement</h5>

			<div className='my-8'>
				<TextInput
					label={'Price'}
					name='price'
					type={'number'}
					marker={<PolygonIcon />}
					// value={currValue}
					onChange={(e) => setCurrValue(e.target.value)}
				/>
				<TextInputArea />

				<div className='my-4'>
					<ToggleNutton label={'Contract available'} enabled={available} setEnabled={setAvailable} />
				</div>
			</div>
			<div className='flex justify-end '>
				<Button title={'Create Contract'} />
			</div>
		</div>
	);
}
