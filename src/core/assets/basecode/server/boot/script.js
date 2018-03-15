module.exports = function (app) {
  var _ = require('lodash');
  var User = app.models.User;
  var Role = app.models.Role;
  var RoleMapping = app.models.RoleMapping;
  var ACL = app.models.ACL;

  User.create([{
      email: 'admin@haska.io',
      password: 'qwertyuiop',
      type: 'admin'
   }], function(err, users) {

  Role.find({ name: 'admin' }, function(err, results) {
      //if (err) console.log(err);
      // Create the admin role
      Role.create({
        name: 'admin'
      }, function(err, role) {
        if (err);

        //debug(role);
        role.principals.create({
          principalType: RoleMapping.USER,
          principalId: users[0].id
        }, function(err, principal) {
          if (err) console.log(err);

        });
      });

    });

    });
};
