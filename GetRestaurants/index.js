const CosmosClient = require('@azure/cosmos').CosmosClient
module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    const endpoint = process.env.COSMOS_DB_ENDPOINT
    const key = process.env.COSMOS_DB_KEY
    
    const options = {
        endpoint: endpoint,
        key: key,
        userAgentSuffix: 'Restaurant-To-Recipe'
      };
      

      const client = await new CosmosClient(options)

      const result = await queryContainer(client, "Restaurants")

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: result
    };
}

/**
 * Query the container using SQL
 */
 async function queryContainer(client, containerId) {
    console.log(`Querying container:\n${containerId}`)
    let resultString = ""
    // query to return all children in a family
    // Including the partition key value of country in the WHERE filter results in a more efficient query
    const querySpec = {
      query: 'SELECT * from c',
    }
  
    const { resources: results } = await client
      .database("Restaurant-To-Recipe")
      .container("Restaurants")
      .items.query(querySpec)
      .fetchAll()
      for (var queryResult of results) {
        resultString = JSON.stringify(queryResult)
        console.log(`\tQuery returned ${resultString}\n`)
      }
    
    return resultString;
  }