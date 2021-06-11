import React from 'react';

import './index.sass';

const Btn = ({text, func}) => {
	return(
		<div onClick={() => func()} className="btn">{text}</div>
	)
}

export default Btn;