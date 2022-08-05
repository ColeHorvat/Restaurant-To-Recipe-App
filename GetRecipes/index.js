const fetch = require('node-fetch')
const axios = require('axios')
module.exports = async function (context, req) {

    context.log('JavaScript HTTP trigger function processed a request.');

    const ENDPOINT = "https://api.edamam.com/api/recipes/v2"//process.env.RECIPE_API_ENDPOINT;
    const KEY = "359341c39d1f576448efec83ea438bf8"//process.env.RECIPE_API_APP_KEY;
    const APP_ID = "7e6e923f"//process.env.RECIPE_API_APP_ID;

    const query = req.headers['query'];
    const cuisineType = req.headers['cuisinetype'];
    const fieldParams = ["image", "source", "url", "totalTime", "cuisineType", "mealType", "dishType"]

    let params = new URLSearchParams({
        'type' : "public",
        'q' : query,
        'app_id' : APP_ID,
        'app_key' : KEY,
        'cuisineType' : cuisineType,
        'random' : "true",
    });

    fieldParams.forEach((param) => {
        params.append('field', param)
    })

    let data = await getEndpoint();


    context.res = {
        // status: 200, /* Defaults to 200 */
        body: data
    };

    async function getEndpoint() {
        context.log(ENDPOINT + "?" + params.toString());
        let response = await axios.get(ENDPOINT + "?" + params.toString())
        return response.data
    }
}

