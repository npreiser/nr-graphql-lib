const common = require('../libcommon/common')

module.exports = {

    getPolicies: async function (accountId, callback) {
        var query = JSON.stringify({
            "query": `
                {actor {
                    account(id: ${accountId}) {
                        alerts {
                            policiesSearch(searchCriteria: {nameLike: "%"}) {
                              policies {
                                id
                                name
                                accountId
                              }
                            }
                          }
                    
                    }
                }}`,
            "timeout": 120
        })

        await common.dispatchGraphQL(query, function (data) {
            callback(data.actor.account.alerts.policiesSearch.policies);
        });

    }
}