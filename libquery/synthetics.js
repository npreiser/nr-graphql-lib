
const common = require('../libcommon/common')

/* 
 this will fetch a page of monitors ()
*/
async function fetchSyntheticMonitorPage(callback) {

  var query = JSON.stringify({
    "query": `
                {
                    actor {
                      entitySearch(queryBuilder: {domain: SYNTH, type: MONITOR, reporting: true, tags: {key: "accountId", value: "1322480"}}) {
                        results {
                          entities {
                            ... on SyntheticMonitorEntityOutline {
                              guid
                              name
                              monitoredUrl
                              account {
                                id
                                name
                              }
                              monitorSummary {
                                locationsRunning
                                status
                              }
                              monitorType
                              period
                            }
                          }
                          nextCursor
                        }
                      }
                    }
                  }`,
    "timeout": 120
  })

  await common.dispatchGraphQL(query, function (data) {
    callback(data.actor.entitySearch.results);
  });

}

async function fetchSyntheticMonitorPageFromCursor(cursor, callback) {

  var query = JSON.stringify({
    "query": `
                {
                    actor {
                      entitySearch(queryBuilder: {domain: SYNTH, type: MONITOR, reporting: true, tags: {key: "accountId", value: "1322480"}}) {
                        results(cursor: "${cursor}"){
                          entities {
                            ... on SyntheticMonitorEntityOutline {
                              guid
                              name
                              monitoredUrl
                              account {
                                id
                                name
                              }
                              monitorSummary {
                                locationsRunning
                                status
                              }
                              monitorType
                              period
                            }
                          }
                          nextCursor
                        }
                      }
                    }
                  }`,
    "timeout": 120
  })
  await common.dispatchGraphQL(query, function (data) {
    callback(data.actor.entitySearch.results);
  });

}

module.exports = {

  // this function makesa loop of paginated calls to get a full list of monitors.. 
  getSyntheticMonitorList: async function (callback) {

    var datablob = [];
    var cursor = undefined;
    while (true) {
      var nextcursor = undefined;
      if (cursor == undefined)
        await fetchSyntheticMonitorPage(function (data) {
          datablob = datablob.concat(data.entities);
          nextcursor = data.nextCursor;
        });
      else
        await fetchSyntheticMonitorPageFromCursor(cursor, function (data) {
          datablob = datablob.concat(data.entities);
          nextcursor = data.nextCursor;
        });

      if (nextcursor != undefined && nextcursor.length > 0) {
        cursor = nextcursor;
        continue;
      }
      else {
        break;
      }
    }
    return callback(datablob);

  },
  getSyntheticMonitor: async function (guid, callback) {
    var query = JSON.stringify({
      "query": `
                    {
                        actor {
                          entity(guid: "${guid}") {
                            ... on SyntheticMonitorEntity {
                                account {
                                    id
                                    name
                                },
                              guid
                              name
                              monitorId
                            }
                          }
                        }
                      }`,
      "timeout": 120
    })

    await common.dispatchGraphQL(query, function (data) {
      callback(data.actor.entity);
    });
  }
}
