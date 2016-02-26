import config from './config';
import controller from './controller';
import './timeline';
import './share-photo';
import '../transversal/usersManager';

angular
    .module('inside', [
        'ui.router',
        'inside.timeline',
        'inside.sharePhoto',
        'transversal.usersManager'        
    ])
    .config(config)
    .controller('InsideController', controller);