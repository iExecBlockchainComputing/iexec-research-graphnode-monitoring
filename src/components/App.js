import React from 'react';
import { Container } from 'react-bootstrap';
import '../css/App.css';

import Subgraph from './Subgraph';

const network = [
	{ name: 'mainnet',   suffix: ''           },
	{ name: 'ropsten',   suffix: '-ropsten'   },
	{ name: 'rinkeby',   suffix: '-rinkeby'   },
	{ name: 'goerli',    suffix: '-goerli'    },
	{ name: 'kovan',     suffix: '-kovan'     },
	{ name: 'bellecour', suffix: '-bellecour' },
	{ name: 'viviani',   suffix: '-viviani'   },
]

const config = {
	subgraphs:
	[
		...Object.values(network).map(({suffix}) => 'iexecblockchaincomputing/iexec-poco-v3' + suffix),
		...Object.values(network).map(({suffix}) => 'iexecblockchaincomputing/iexec-poco-v5' + suffix),
	],
}

const App = () => {
	return (
		<div className="app">
			<h1>iExec graphnode monitoring</h1>
			<Container>
				{
					config.subgraphs.map(name => <Subgraph key={name} name={name} config={config}/>)
				}
			</Container>
		</div>
	);
}

export default App;
