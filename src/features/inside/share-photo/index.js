import '../../transversal/externalCalls';
import config from './config';
import controller from './controller';

angular
    .module('inside.sharePhoto', [
        'transversal.externalCalls'
    ])
    .config(config)
    .controller('SharePhotoController', controller);