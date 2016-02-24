export default function ($usersManager, $state) {
    'ngInject';
    var lc = this;

    lc.tryLogin = function () {
        $state.go('inside.timeline');
    };
}