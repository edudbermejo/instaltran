import config from './config';
import controller from './controller';
import component from '../components/photoInList';

angular
    .module('inside.timeline', [
        'ui.router'
    ])
    .config(config)
    .controller('TimelineController', controller)
    .component('instTimePhoto', component);