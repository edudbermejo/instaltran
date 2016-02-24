export default function ($stateProvider) {
    'ngInject';
    $stateProvider.state('inside', {
        url: '/inside',
        abstract : true,
        templateUrl : 'src/features/inside/template.html',
        controller : 'InsideController as ic'
    })
    
}