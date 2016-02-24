export default function ($usersManager, $http, $q) {
    'ngInject';
    
    var _url = 'localhost:2222'
    
    function getPhotosTimeline(page) {
        var _qu = $q.defer();
        
        var _data = $usersManager.getLoggedUser().followed;
        
        return $http({
            url : _url + '/photos',
            method : 'GET',
            params : { page : page},
            data : _data
        }).then(backPhotosOK)
        .catch(backPhotosWrong);
        
        function backPhotosOK(response) {
            if(response.data){
                _qu.resolve(response.data);
            } else {
                _qu.reject('Nothing found');
            }
        };
        
        function backPhotosWrong(error) {
            _qu.reject('Error');
        }
        
        return _qu.promise;        
    };
    
    
}