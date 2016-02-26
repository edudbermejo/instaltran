export default function ($state, $externalCalls) {
    'ngInject';
    var rc = this;

    rc.tryRegister = function () {

        if (!rc.user) {
            Materialize.toast('No se ha introducido usuario', 2000);
        } else {
            if (!rc.pass) {
                Materialize.toast('El campo contraseña es obligatorio', 2000);
            } else {

                if (!rc.passre) {
                    Materialize.toast('Repita la contraseña', 2000);
                } else {

                    if (rc.pass !== rc.passre) {

                        Materialize.toast('Las contraseñas no coinciden', 2000);
                    } else {

                        var _username = rc.user.toLowerCase();
                        console.log(_username);
                        $externalCalls.getUserByUsername(_username)
                            .then(keepTryingRegister);
                    }
                }
            }
        }

        function keepTryingRegister(user) {
            if (user) {
                Materialize.toast('Ya existe ese nombre de usuario', 2000);
            } else {
                $externalCalls.postUser(_username, rc.pass)
                    .then(finishing);
            };

            function finishing() {
                Materialize.toast('Usuario creado correctamente', 1500,'', function () { $state.go('login'); });
            }
        }
    };
}