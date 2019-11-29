import React from 'react';
import { Badge, Card, ProgressBar } from 'react-bootstrap';

import graphql from '../graphql';

function getStyle(data)
{
	if      (data.failed) return { class: 'danger',  descr: 'failed'  }
	else if (data.synced) return { class: 'success', descr: 'synched' }
	else                  return { class: 'info',    descr: 'pending' }
}

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

		const chain = this.state.data.chains[0];
		const style = getStyle(this.state.data);

		return (
			<Card bg="light" border={style.class} text={style.class} className="shadow mb-3">
				<Card.Header className="font-weight-bold text-capitalize p-3">
					<h3>
						{ chain.network }
					</h3>
					<Badge pill variant={style.class} className="float-right">
						{style.descr}
					</Badge>
				</Card.Header>
				<Card.Body>
					<ProgressBar
						animated
						variant={style.class}
						now={chain.latestBlock.number}
						max={chain.chainHeadBlock.number}
						label={`${chain.latestBlock.number} / ${chain.chainHeadBlock.number}`}
					/>
					<Card.Text>
						<code>
							{this.state.data.error}
						</code>
					</Card.Text>
				</Card.Body>
			</Card>
		);
	}
}

export default Subgraph;
