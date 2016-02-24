export default function () {
    'ngInject';
    var _logged;

    function setLoggedUser(user) {
        _logged = user;
    };

    function getLoggedUser() {
        return _logged;
    };

    function loggout() {
        _logged = null;
    }
}