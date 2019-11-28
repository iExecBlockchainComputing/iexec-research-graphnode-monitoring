import React from 'react';
import { Row, Col, ProgressBar } from 'react-bootstrap';

import graphql from '../graphql';

class Subgraph extends React.Component
{
	state= { data: null }

	componentDidMount()
	{
		this.tick()
		this.interval = setInterval(() => this.tick(), 10 * 1000);
	}

	componentWillUnmount()
	{
		clearInterval(this.interval);
	}

	tick()
	{
		graphql.run(this.props.config.endpoint, graphql.query.subgraph, { name: this.props.name })
		.then(chunk => this.setState({ data: chunk.data.result[0] }))
		.catch(console.error)
	}

	render()
	{
		if (!this.state.data)
		{
			return null;
		}

		const chain   = this.state.data.chains[0];
		const variant = this.state.data.synced ? 'success' : this.state.data.failed ? 'danger' : 'info'

		return (
			<Row>
				<Col md="2">
					{ chain.network }
				</Col>
				<Col md="10">
					<ProgressBar
						animated
						variant={variant}
						now={chain.latestBlock.number}
						max={chain.chainHeadBlock.number}
						label={`${chain.latestBlock.number} / ${chain.chainHeadBlock.number}`}
					/>
				</Col>
			</Row>
		);
	}
}

export default Subgraph;
