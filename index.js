
const query_nerdgraph = require('./libquery/nerdquery')
const fs = require("fs");
// LIB depends on either the API key or the browser cookie. 
// USE Enviornment Vars  
// API_KEY 
//process.env['API_KEY'] = <your api key here> 

// OR 
// NR_COOKIE (note must escape all quotes(") inside string),  or wrap with single quotes 

process.env['NR_COOKIE'] = 'TSNGUID=447c9abf-c1b8-48e7-982a-646aec06105e; optimizelyEndUserId=oeu1606362483890r0.2878838515427362; _ga=GA1.1.1556395862.1664218571; _rdt_uuid=1664218571494.41cd2032-f68d-4d5b-9afa-553e6018d7ca; __qca=P0-665150667-1664218571720; _biz_uid=51b45e80f4b840678d03b9bbb00e3a38; campaign_f=zoom; campaign_l=zoom; medium_f=zoom; medium_l=zoom; source_f=zoom; source_l=zoom; ref_page_url=https://newrelic.zoom.us/; ref_page_cat=public; ref_page_sub_cat=signup; _biz_flagsA=%7B%22Version%22%3A1%2C%22ViewThrough%22%3A%221%22%2C%22XDomain%22%3A%221%22%2C%22Mkto%22%3A%221%22%7D; intercom-id-cyym0u3i=b7bc02e0-d6af-4f0b-b913-52751c6f7f38; intercom-session-cyym0u3i=; intercom-id-nj08vq9l=db13f2fa-3ce0-4fec-9223-ad7d3ef4ced7; fs_uid=#17PKB7#5629297529556992:5560743945932800:::#dccb1138#/1682096145; ajs_group_id=1; staging-login_idle_session_timeout={"lastInteractionAt":1664812805,"warningTime":180,"lastIdleLimitCheck":1664812615,"idleLimit":28800}; ajs_user_id=2702726; intercom-session-nj08vq9l=; _biz_ABTestA=%5B-19402981%2C-715106686%5D; _mkto_trk=id:341-XKP-310&token:_mch-newrelic.com-1664218571718-25382; _clck=i0w96v|1|f5u|0; cebs=1; cebsp=1; _clsk=159agjo|1666214170303|1|1|h.clarity.ms/collect; _ce.s=v~e67e88f6d902a39b8c8ca0b0ca7008be7e119cae~vpv~6~v11.rlc~1666210176577~ir~1~gtrk.la~l9fvfge7~v11nv~-1~v11.sla~1666210176842~v11.s~f49f5390-4fe9-11ed-b3dd-5514d1008c95~v11.send~1666214175741; _ga_GZEX285W2X=GS1.1.1666217333.23.0.1666217333.0.0.0; _biz_sid=1439f0; _biz_nA=51; _uetsid=3aa54c804fce11eda0542dcb419a8a81; _uetvid=33c6804091b211eb82a57f3dc370f57e; _biz_pendingA=%5B%5D; TessenSessionId=1666217331965,1666217333648; ajs_anonymous_id=fba2c0dd-109b-4ea2-a64f-56db8a5255d2; login_service_login_newrelic_com_tokens=%7B%22token%22%3A+%22GdmK1SQr%2B6pDvtUWW%2BAqtDxo5%2FYbX2PcVnZO4ktuhRS28bR0dHzIG75vc5ZS9rYvoCNgjPWAmBaBdt0yrYx6LFkMnqVRkaYYu0m0xtTYu40DQ%2BqQwf9gJ99SwQ0THZydC%2BiYEhzXajBEy3eG88Ehg16T238aiHkZNOdm2Es8ZW5aX6HtMh9ySlJWqCHSQqpgieyKeus86p2Om%2FUKdySLg%2Fyk6QvckQjmfhzTLmyIfyWf%2FZP5k1lIfRBG%2BgUatjJsu4ItVcRvqWI%2BB8K%2FMcjV639%2BeVhvUe1EaEKD2ohXlHk3yjzCDBWE3SSDLMSZhFYlwZ%2FaQDlVpPKGU9tC%2Fc4iSw%3D%3D%22%2C+%22refresh_token%22%3A+%22qTRdBeRnja2vaBnm6v%2B8xNc%2FJS1T1w8aRIij6BNY7aeL28YWPOmkf5W6HAZrye6l946yXZf9VE0zTSuBcHbKyoNx6wM89k%2BTCrck5yLexRYybJf%2FFRjDdQqZO7FoK07s2UPoYmbUu2cDBXF5EV3G0All95qxaJSYhp6v5wyHmX5OiV7EDdv%2B2mDpgJfkpyBEO83rbfhLx0XvidRx57s5rLhgRr6EOgPv7m4I7iTvyvowkGYOqUS7WiPjXIL98P3dj1bM4tIwbPNreah%2FtVmmq65YGofk6JhC155M%2BKqRnMhyKO9deo4O7kUpBXjip0LSTlOYgg%2B%2BOTWHfFCfk0ZYig%3D%3D%22%7D; login_idle_session_timeout={"lastInteractionAt":1666218556,"warningTime":180,"lastIdleLimitCheck":1666217974,"idleLimit":1209600}';

const runner = async () => {

    try {
        // await query_nerdgraph.workflows.getEnviroments(function (data) {   // wont work with cookie, 
        //     var k = 0; 
        // });

         await query_nerdgraph.workflows.getWorkflows("2475805", function (data) {
             var k = 0; 
         });

         await query_nerdgraph.alerts.getPolicies("2475805", function (data) {
             var k = 0; 
         });

        // NOTE!!!, this makes many calls(paginated) may take some time to return. 
        // await query_nerdgraph.synthetics.getSyntheticMonitorList(function(data){
         //    var k = 0; 

            
        //});

        //  await query_synth.getSyntheticMonitor("MTMyMjQ4MHxTWU5USHxNT05JVE9SfDhmZjYwZjRiLTFmZGYtNDhiMi05NjE0LTQ3MDM3NzYxMWVhZg", function(data){
        //     var k = 0; 
        // })

       // await query_nerdgraph.synthetics.getSyntheticMonitor("MTMyMjQ4MHxTWU5USHxNT05JVE9SfDhmZjYwZjRiLTFmZGYtNDhiMi05NjE0LTQ3MDM3NzYxMWVhZg", function (data) {
       //     var k = 0;
       // })
    } catch (err) {
        var k = 0;
        console.log(err.message)
    }
}
runner();