const https = require('https')
const options = require("./config.json");

/**
 * Callback for processing the api response
 * @param {(data) => void} callback
 * Makes an asynchronus api call to the backend
 */
export async function punkApiRequest(requestOptions, callback)
{
    let responseData = "";
    const queryOptions =
    {
        ...options,
        path: `/v2/beers`,//?page=${requestOptions.page}&per_page=${requestOptions.perPage}`,
    }
    const req = https.request(queryOptions, result => {
        // console.log(`statusCode: ${res.statusCode}`)
      
        result.on('data', data =>
        {
        //   console.log(`${data}`);
          responseData += data;
        })
        result.on('end', result => {
            callback(JSON.parse(responseData))
        });
    });

    
    req.on('error', error => {
        // console.error(error)
        throw Error(`An error occured while communicating with PunkAPI:\n${error}`);
    });
    
    req.end()
}

/** Dummy function to mock up getting initial store config */
export async function initRequest()
{
    return {
        cart:
        {
            maxUnits: 10
        }
    }
}