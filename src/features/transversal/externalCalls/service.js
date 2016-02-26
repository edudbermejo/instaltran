export default function ($usersManager, $http, $q) {
    'ngInject';
    
    var _url = 'http://localhost:2222';
    
    // Recupera fotos con paginacion. Se pasan los followed para hacer join.
    this.getPhotosTimeline = function(page) {
        var _qu = $q.defer();
        
        var _user = $usersManager.getLoggedUser();
        
        $http({
            url : _url + '/photos',
            method : 'GET',
            params : { page : page,
                userid : _user._id}
        }).then(backPhotosOK)
        .catch(backPhotosWrong);
        
        function backPhotosOK(response) {
            if(response.data){
                _qu.resolve(response.data.docs);
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
                _qu.resolve(null);
            }
        };
        
        function backUserWrong(error) {
            _qu.reject('Error');
        }
        
        return _qu.promise;
    };
    
    this.postPhoto = function(url, title){
        
        var _qu = $q.defer();
        
        var _user = $usersManager.getLoggedUser();
        
        $http({
            url : _url + '/photos',
            data : {
                image : url,
                user : _user.username,
                user_id : _user._id,
                title : title,
            },
            method : 'POST'
        }).then(upPhotoOK)
        .catch(upPhotoWrong);
        
        function upPhotoOK(response) {
            _qu.resolve(response.data);
        };
        
        function upPhotoWrong(error) {
            _qu.reject('Error');
        }
        
        return _qu.promise;
    };
    
    this.postUser = function(username, password){
        
        var _qu = $q.defer();
        
        $http({
            url : _url + '/users',
            data : {
               username : username,
               password : password,
            },
            method : 'POST'
        }).then(upUserOK)
        .catch(upUserWrong);
        
        function upUserOK(response) {
            _qu.resolve(response.data);
        };
        
        function upUserWrong(error) {
            _qu.reject('Error');
        }
        
        return _qu.promise;
    };
    
    
}