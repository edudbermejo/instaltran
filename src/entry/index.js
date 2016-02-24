import '../features/credentials/login';
import '../features/inside'

angular
    .module('entry', [
        'credentials.login',
        'inside'
    ]);