import '../../transversal/usersManager';
import config from './config';
import controller from './controller';

angular
    .module('credentials.login', [
        'ui.router',        
        'transversal.usersManager'
    ])
    .config(config)
    .controller('LoginController', controller);