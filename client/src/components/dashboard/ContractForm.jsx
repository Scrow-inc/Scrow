import { PolygonIcon } from '../PolygonIcon';
import { TextInput, TextInputArea } from '../ui/Form';

export default function ContractForm() {
	return (
		<div>
			<h5 className='font-orbitron text-[20px] leading-[30px] text-white'>Creat new cintract agreement</h5>

			<div className='my-8'>
				<TextInput label={'Price'} name='price' type={'number'} marker={<PolygonIcon />} />

				<TextInputArea />
			</div>
		</div>
	);
}
