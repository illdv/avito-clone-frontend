import React from 'react';

import { SpinerSize } from './interface';
export { SpinerSize };

require('./Spinner.sass');

interface IProps {
	size?: SpinerSize;
}

const Spinner: React.SFC<IProps> = ({ size = SpinerSize.md }) => (
	<div className={`spinner spinner_${size}`} />
);

export default Spinner;