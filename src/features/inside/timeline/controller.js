export default function ($externalCalls) {
    'ngInject';
    var tc = this;
    
    var _page = 1;
    
    tc.photos = [{
        user_id : 'usuario de prueba',
        image : 'img/prueba.png',
        likes : 123,
        title : 'Buh!'
    }, {
        user_id : 'usuario de prueba',
        image : 'img/prueba.png',
        likes : 123,
        title : 'Buh!'
    }];
    
    tc.photoss = $externalCalls.getPhotos(_page);
    
    tc.morePhotos = function () {
        _page++,
        tc.photos.push($externalCalls.getPhotos(_page));
    }
}