import config from './config';
import controller from './controller';
import component from '../components/photoInList';
import '../../transversal/externalCalls'

angular
    .module('inside.timeline', [
        'ui.router',
        'transversal.externalCalls'
    ])
    .config(config)
    .controller('TimelineController', controller)
    .component('instTimePhoto', component);