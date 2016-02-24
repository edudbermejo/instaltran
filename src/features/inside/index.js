import config from './config';
import controller from './controller';
import './timeline'

angular
    .module('inside', [
        'ui.router',
        'inside.timeline'        
    ])
    .config(config)
    .controller('InsideController', controller);