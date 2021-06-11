import React from 'react';
import {Link} from 'react-router-dom';

import './index.sass';

const Main = () => {
	return(
		<div className="main_page">
			<div className="container-xxl">
				<Link to={`/game`}>
					<div className="btn">Новая игра</div>
				</Link>
			</div>
		</div>
	)
}

export default Main;