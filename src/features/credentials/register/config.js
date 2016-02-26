export default function ($stateProvider) {
    'ngInject';

    $stateProvider.state('register', {
        url: '/register',
        templateUrl: 'src/features/credentials/register/template.html',
        controller: 'RegisterController as rc'
    })
}