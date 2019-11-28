function run(endpoint, query, variables)
{
	return new Promise((resolve, reject) => {
		fetch(
			endpoint,
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ query, variables })
			}
		)
		.then((response) => response.text())
		.then(raw => resolve(JSON.parse(raw)))
		.catch(reject);
	});
}

export default run;
