import config from './config';
import controller from './controller';
import './timeline';
import './share-photo';

angular
    .module('inside', [
        'ui.router',
        'inside.timeline',
        'inside.sharePhoto'        
    ])
    .config(config)
    .controller('InsideController', controller);