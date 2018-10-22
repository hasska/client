'use strict';

module.exports = function(User) {

    /*User.upload = function(req, res, Uploads_id, cb) {
        var StorageContainer = Uploads.app.models.StorageContainer;
        StorageContainer.getContainers(function (err, containers) {
            if (containers.some(function(e) { return e.name == Uploads_id; })) {
                StorageContainer.upload(req, res, {container: Uploads_id}, cb);
            }
            else {
                StorageContainer.createContainer({name: Uploads_id}, function(err, c) {
                    StorageContainer.upload(req, res, {container: c.name}, cb);
                });
            }
        });
    }
    User.remoteMethod (
        'upload',
        {
         http: {path: '/upload', verb: 'post'},
         accepts: [
            {arg: 'req', type: 'object', 'http': {source: 'req'}},
            {arg: 'res', type: 'object', 'http': {source: 'res'}}
         ],
         returns: {arg: 'status', type: 'string'}
        }
    );*/

};