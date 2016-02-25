export default function ($usersManager, $state, $externalCalls) {
    'ngInject';
    var lc = this;

    lc.tryLogin = function () {

        if (!lc.user) {
            Materialize.toast('No se ha introducido usuario', 2000);
        } else {
            if (!lc.pass) {
                Materialize.toast('El campo contraseña es obligatorio', 2000);
            } else {

                $externalCalls.getUserByUsername(lc.user)
                    .then(logAndJump)
                    .catch(function () {
                        Materialize.toast('El usuario introducido no existe', 2000);
                    });
            }
        }

        function logAndJump(user) {
            if (lc.pass === user.password) {
                $usersManager.setLoggedUser(user);
                $state.go('inside.timeline');
            } else {
                Materialize.toast('La contraseña no es correcta', 2000);
            }
        }
    };
}