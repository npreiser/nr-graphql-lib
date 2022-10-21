
const common = require('../libcommon/common')

module.exports = {

    addDashboardToAccount: async function (account, customized_db, callback) {
        var queryobj = JSON.stringify({
            query: `mutation ($accountidval: Int!, $dashboardval: DashboardInput!) {
        dashboardCreate(accountId: $accountidval, dashboard: $dashboardval) {
                errors {
                    description
                }
            }
         }`,
            variables: { "accountidval": account, "dashboardval": customized_db }
        });


        await common.dispatchGraphQL(queryobj, function (data) {
            callback(data);
        });
    }
}