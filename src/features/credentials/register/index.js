import '../../transversal/usersManager';
import '../../transversal/externalCalls';
import config from './config';
import controller from './controller';

angular
    .module('credentials.register', [
        'ui.router',
        'transversal.externalCalls'
    ])
    .config(config)
    .controller('RegisterController', controller);