import gql from 'graphql-tag';

export default gql`
query subgraph_status($name: String)
{
  result: indexingStatusForCurrentVersion(subgraphName:$name)
  {
    subgraph
    node
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
    health
    fatalError {
      handler
    }
    nonFatalErrors {
      handler
    }
  }
}
`
