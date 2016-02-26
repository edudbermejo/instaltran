export default function () {
    'ngInject';
    var _logged;

    this.setLoggedUser = function(user) {
         _logged = angular.copy(user);
    };

    this.getLoggedUser = function() {
        return _logged;
    };

    this.loggout = function() {
        _logged = null;
    }
}