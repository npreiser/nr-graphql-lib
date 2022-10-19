
const query_nerdgraph = require('./libquery/nerdquery')
const fs = require("fs");
// LIB depends on either the API key or the browser cookie. 
// USE Enviornment Vars  
// API_KEY 
//process.env['API_KEY'] = <your api key here> 

// OR 
// NR_COOKIE (note must escape all quotes(") inside string),  or wrap with single quotes 

//process.env['NR_COOKIE'] = <your admin cookie here>;

const runner = async () => {

    try {
         await query_nerdgraph.workflows.getEnviroments(function (data) {   // wont work with cookie, 
             var k = 0; 
         });

        // await query_wf.getWorkflows("1015810", function (data) {
        //     var k = 0; 
        // });

        // await query_nerdgraph.alerts.getPolicies("2475805", function (data) {
        //     var k = 0; 
        // });

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