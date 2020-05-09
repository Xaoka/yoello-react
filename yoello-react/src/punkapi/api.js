const https = require('https')
const options = require("./config.json");

/**
 * Callback for processing the api response
 * @param {(data) => void} callback
 * Makes an asynchronus api call to the backend
 */
export default async function punkApiRequest(callback)
{
    const req = https.request(options, result => {
        // console.log(`statusCode: ${res.statusCode}`)
      
        result.on('data', data =>
        {
          console.log(`${data}`);
        //   responseData += data;
            callback(JSON.parse(data));
        })
    })
    
    req.on('error', error => {
        // console.error(error)
        throw Error(`An error occured while communicating with PunkAPI:\n${error}`);
    })
    
    req.end()
}