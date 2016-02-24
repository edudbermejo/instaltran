export default function ($stateProvider) {
    'ngInject';
    $stateProvider.state('inside.timeline', {
        url: '/timeline',
        templateUrl : '/src/features/inside/timeline/template.html',
        controller : 'TimelineController as tc'
    })
    
}