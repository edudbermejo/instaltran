import '../features/credentials/login';
import '../features/inside';
import '../features/credentials/register';

angular
    .module('entry', [
        'credentials.login',
        'credentials.register',
        'inside'
    ]);