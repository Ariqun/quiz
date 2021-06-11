import React from 'react';
import {Route} from 'react-router-dom';

import Main from '../../pages/main';
import Game from '../../pages/game';

import './app.sass';

const App = () => {
	return (
		<div className="app">
			<Route path="/" exact render={() => <Main />} />
			<Route path="/game" exact render={() => <Game />} />
		</div>
	);
}

export default App;
