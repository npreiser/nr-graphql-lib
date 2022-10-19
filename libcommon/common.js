const axios = require('axios');


module.exports = {
    setCookie: function (cookie) {
        mycookie = cookie;
    },
    dispatchGraphQL: async function (payload, callback) {
        try {

            var _headers = {   //base headers.
                'Content-type': 'application/json',
                'Accept': 'application/json',
                'Accept-Charset': 'utf-8',
                'x-api-key' : '' //blank by default
            };

            var url_cust = 'https://api.newrelic.com/graphql';
            var url_product = 'https://nerd-graph.service.newrelic.com/graphql';

            var _url = url_cust; //default;
            // if api key is there, its presumed valid use the cust url.. and use the key 
            if (process.env['API_KEY'] != undefined && process.env['API_KEY'].length > 0) {
                _headers['x-api-key'] = process.env['API_KEY'];  // modfiy headers add key
                _url = url_cust;  
            }
            else if (process.env['NR_COOKIE'] != undefined && process.env['NR_COOKIE'].length > 0) // else, check cookie, if valid, use product url 
            {
                _headers.Cookie = process.env['NR_COOKIE'];  // add cookie to the headers 
                _url = url_product;    
            }
            // NOTE:  when using cookie,  the x-api-key header must be there regardless if it is blank or not, the key
            // must be present. !!


            const result = await axios({
                method: "POST",
                url: _url,
                headers: _headers,
                data: payload
            });
            if (result.data.errors) {
                throw new Error(JSON.stringify(result.data.errors))
            }
            else {
                const data = (result.data && result.data.data) ? result.data.data : null;
                callback(data);
            }
        } catch (err) {
            throw new Error(err.message + " : " + err.response.statusText)
        }
        finally {
        }
    },
}