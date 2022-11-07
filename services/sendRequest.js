const request = require('request');

async function sendRequest(text){
    // Configure the request
    var options = {
        url: 'http://localhost:8000/spam/predict',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        form: {'text' : text}
    }

    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            // Print out the response body
            // console.log(body)
            console.log(body);
            return body
        }
        console.error(error);
        throw error;
    })
}

module.exports = sendRequest