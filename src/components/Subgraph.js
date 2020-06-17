import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Badge, Card, ProgressBar } from 'react-bootstrap';

import graphql from '../graphql';

const Subgraph = (props) => {
	const [ show, setShow ] = React.useState(false)

	const { data, loading, error } = useQuery(
		graphql.subgraph,
		{
			variables:
			{
				name: props.name
			},
			pollInterval: 10000
		}
	)

	if (loading) { return null; }
	if (error  ) { return null; }

	const details =
		data.result.health === 'healthy'
		? data.result.synced
		? { class: 'success', descr: 'synced',  ...data.result }
		: { class: 'info',    descr: 'pending', ...data.result }
		: { class: 'danger',  descr: 'failed',  ...data.result }

	return (
		<Card bg="light" border={details.class} text={details.class} className="shadow mb-3">
			<Card.Header className="pointer font-weight-bold text-capitalize p-3" onClick={() => setShow(!show)}>
				<h3>
					{ props.name.split('/')[1] }
				</h3>
				<Badge pill variant={details.class} className="float-right">
					{details.descr}
				</Badge>
			</Card.Header>
			<Card.Body>
				{
					details.chains.map((chain, i) =>
						<ProgressBar
							key={i}
							animated
							variant={details.class}
							now={chain.latestBlock.number}
							max={chain.chainHeadBlock.number}
							label={`${chain.latestBlock.number} / ${chain.chainHeadBlock.number} [${chain.network}]`}
						/>
					)
				}
				<table className='mx-auto' hidden={!show}>
					<tbody>
					<tr>
						<td className='text-right font-weight-bold pr-2'>Subgraph:</td>
						<td><code>{ details.subgraph }</code></td>
					</tr>
					<tr>
						<td className='text-right font-weight-bold pr-2'>Node:</td>
						<td><code>{ details.node }</code></td>
					</tr>
					</tbody>
				</table>
			</Card.Body>
		</Card>
	);
}

export default Subgraph;
