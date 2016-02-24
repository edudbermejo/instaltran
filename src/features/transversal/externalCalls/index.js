import service from './service';
import '../usersManager';

angular
    .module('transversal.externalCalls', [
        'transversal.usersManager'
    ])
    .service('$externalCalls', service);