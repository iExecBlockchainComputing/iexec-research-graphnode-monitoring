import React from 'react';
import { Container } from 'react-bootstrap';
import '../css/App.css';

import Subgraph from './Subgraph';

const config = {
	endpoint: 'http://thegraph.iex.ec:8030/graphql',
	subgraphs:
	[
		"iexecblockchaincomputing/iexec-poco-v3",
		"iexecblockchaincomputing/iexec-poco-v3-kovan",
		"iexecblockchaincomputing/iexec-poco-v3-goerli",
		"iexecblockchaincomputing/iexec-poco-v3-bellecour",
		"iexecblockchaincomputing/iexec-poco-v3-viviani",
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
