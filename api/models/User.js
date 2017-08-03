/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  autoCreatedAt: false,
  autoUpdatedAt: false,
attributes: {

 email: {
   type: 'string',
   email: true,
   required: true,
   unique: true
 },
 password: {
   type: 'string',
   required: true
 },
 balance: {
   type: 'float',
   defaultsTo: 0.00
 },

 userTypes: {
             collection: 'UserTypes',
             via: 'user',
             defaultsTo: [{"userType":"normaluser"}]
 },
 userAddresses: {
             collection: 'UserAddresses',
             via: 'user',
             defaultsTo: [{"userAddress":""}]
 },
 toJSON: function() {
  var obj = this.toObject();
  return obj;
}

}
};
