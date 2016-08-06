/**
 * Http Api
 * Use chrome or firefox but not safari.
 * Because of self certified https webserver, you won't be able to access the page on safari.
 */

 var Cylon = require('cylon');

 Cylon.api('http');

 Cylon.robot({
     connections: {
         loopback: { adaptor: 'loopback' }
     },

     devices: {
         ping: { driver: 'ping' }
     },

     work: function() {
     }
 }).start();
