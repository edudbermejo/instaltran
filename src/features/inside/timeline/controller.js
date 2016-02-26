export default function ($externalCalls) {
    'ngInject';
    var tc = this;

    var _page = 1;
    
    /*tc.photos = [{
        user_id : 'Gastly',
        image : 'img/prueba.png',
        likes : 123,
        title : 'Buh!'
    }, {
        user_id : 'Haunter',
        image : 'img/haunter.png',
        likes : 321,
        title : 'Buh++!'
    }];*/

    $externalCalls.getPhotosTimeline(_page)
        .then(function (response) {
            console.log(response);
            tc.photos = response;
        });

    tc.morePhotos = function () {
        _page++ ,
        tc.photos.push($externalCalls.getPhotos(_page));
    }
}