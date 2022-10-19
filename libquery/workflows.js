
const common = require('../libcommon/common')

module.exports = {
    getEnviroments: async function (callback) {
        var query = JSON.stringify({
            "query": `
                {actor {
                          incidentIntelligenceEnvironment {
                            authorizedEnvironments(kind: SINGLE_AND_CROSS_ACCOUNT) {
                              kind
                              associatedAuthorizedAccounts {
                                id
                                name
                              }
                              incidentIntelligenceAccount {
                                id
                                name
                              }
                              name
                            }
                      }
                }}`,
            "timeout": 120
        })
        await common.dispatchGraphQL(query, function (data) {
            callback(data.actor.incidentIntelligenceEnvironment.authorizedEnvironments);
        });
    },
    getWorkflows: async function (accountId, callback) {
        var query = JSON.stringify({
            "query": `
                {actor {
                    account(id: ${accountId}) {
                        aiWorkflows {
                            workflows {
                              entities {
                                name
                                issuesFilter {
                                  predicates {
                                    attribute
                                    operator
                                    values
                                  }
                                }
                                destinationConfigurations {
                                  type
                                }
                              }
                              totalCount
                            }
                          }
                    }
                }}`,
            "timeout": 120
        })

        await common.dispatchGraphQL(query, function (data) {
            callback(data.aiWorkflows.workflows);
        });
    }
}

