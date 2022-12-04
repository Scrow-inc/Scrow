import React from 'react';

export default function Button({ title, variant = 'primary', ...rest }) {
	const color =
		variant === 'primary'
			? 'bg-[#7b3fe4] text-white hover:bg-[#6433b9]'
			: variant === 'secondary'
			? 'bg-[#2952E3] text-white hover:bg-[#2952E7]'
			: variant === 'plain' && 'bg-gray-500 text-white hover:bg-gray-600';

	return (
		<button className={`${color} py-2 px-7 mx-4 rounded-full cursor-pointer`} {...rest}>
			{title}
		</button>
	);
}
