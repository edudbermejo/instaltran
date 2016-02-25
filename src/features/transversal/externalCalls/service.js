export default function ($usersManager, $http, $q) {
    'ngInject';
    
    var _url = 'http://localhost:2222';
    
    // Recupera fotos con paginacion. Se pasan los followed para hacer join.
    this.getPhotosTimeline = function(page) {
        var _qu = $q.defer();
        
        var _user = $usersManager.getLoggedUser();
        
        return $http({
            url : _url + '/photos',
            method : 'GET',
            params : { page : page,
                userid : _user._id}
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
    
    // Recupera un usuario haciendo uso de su id (en tabla de mongo)
    this.getUserById = function(id){
        
        var _qu = $q.defer();
        
        return $http({
            url : _url + '/users/'+ id,
            method : 'GET'
        }).then(backUserOK)
        .catch(backUserWrong);
        
        function backUserOK(response) {
            if(response.data){
                _qu.resolve(response.data);
            } else {
                _qu.reject('Nothing found');
            }
        };
        
        function backUserWrong(error) {
            _qu.reject('Error');
        }
        
        return _qu.promise;
    };
    
    // Recupera un usuario haciendo uso de su username 
    this.getUserByUsername = function(username){
        
        var _qu = $q.defer();
        
        $http({
            url : _url + '/users',
            params : {
                username : username,
                strict : "s"
            },
            method : 'GET'
        }).then(backUserOK)
        .catch(backUserWrong);
        
        function backUserOK(response) {
            if(response.data){
                _qu.resolve(response.data);
            } else {
                _qu.reject('Nothing found');
            }
        };
        
        function backUserWrong(error) {
            _qu.reject('Error');
        }
        
        return _qu.promise;
    };
    
    
}