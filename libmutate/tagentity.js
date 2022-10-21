const common = require('../libcommon/common')

module.exports = {

    addTagToEntity: async function (entityguid, tagkey, tagvalue, callback) {
        var queryobj = JSON.stringify({
            query: `mutation ($guidval: EntityGuid!, $tag_key: String!, $tag_value: String!) {
    taggingAddTagsToEntity(guid: $guidval,tags: { key: $tag_key, values: [$tag_value]}) {
            errors {
                message
            }
        }
     }`,
            variables: { "guidval": entityguid, "tag_key": tagkey, "tag_value": tagvalue }
        });


        await common.dispatchGraphQL(queryobj, function (data) {
            callback(data);
        });
    },
    deleteTagFromEntity: async function (entityguid, tagkey, callback) {
        queryobj = JSON.stringify({
            query: `mutation ($guidval: EntityGuid!, $tag_key: String!) {
    taggingDeleteTagFromEntity(guid: $guidval,tagKeys:  [$tag_key]) {
            errors {
                message
            }
        }
     }`,
            variables: { "guidval": entityguid, "tag_key": tagkey }
        });


        await common.dispatchGraphQL(queryobj, function (data) {
            callback(data);
        });
    }
}