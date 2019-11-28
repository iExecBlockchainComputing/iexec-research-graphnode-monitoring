export default `
query subgraph_status($name: String)
{
  result: indexingStatusesForSubgraphName(subgraphName:$name)
  {
    chains
    {
      network
      ... on EthereumIndexingStatus
      {
        latestBlock { number }
        chainHeadBlock { number }
      }
    }
    synced
    failed
    error
  }
}
`
