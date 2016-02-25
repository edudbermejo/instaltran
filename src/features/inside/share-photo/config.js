export default function ($stateProvider) {
    'ngInject';
    
    $stateProvider.state('inside.sharePhoto', {
        url: '/sharephoto',
        templateUrl : '/src/features/inside/share-photo/template.html',
        controller : 'SharePhotoController as spc'
    });
}