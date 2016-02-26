export default function ($stateProvider) {
    'ngInject';
    
    $stateProvider.state('inside.sharephoto', {
        url: '/sharephoto',
        templateUrl : '/src/features/inside/share-photo/template.html',
        controller : 'SharePhotoController as spc'
    });
}