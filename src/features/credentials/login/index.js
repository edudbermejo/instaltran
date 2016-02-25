import '../../transversal/usersManager';
import '../../transversal/externalCalls';
import config from './config';
import controller from './controller';

angular
    .module('credentials.login', [
        'ui.router',        
        'transversal.usersManager',
        'transversal.externalCalls'
    ])
    .config(config)
    .controller('LoginController', controller);