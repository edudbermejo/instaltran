export default function ($externalCalls, $state) {

    var spc = this;

    spc.upPhoto = function () {

        if (!spc.imgUrl) {
            Materialize.toast('No se ha introducido una ruta', 2000);
        } else {
            $externalCalls.postPhoto(spc.imgUrl, spc.title)
                .then(function () {
                    $state.go('inside.timeline');
                })
                .catch(function () {
                    Materialize.toast('Ocurrio un problema. Intentalo mas tarde', 2000);
                });
        }
    }

}