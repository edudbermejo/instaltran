export default function ($state, $usersManager) {
    'ngInject';
    var ic = this;
    var _darkBackground = "col s6 center-align green darken-3";
    var _lightBackground = "col s6 center-align light-green accent-1";
    var _darkIcon = "material-icons medium light-green-text text-darken-4";
    var _lightIcon = "material-icons medium light-green-text text-lighten-4"

    ic.classTimelineBackground = _darkBackground;
    ic.classTimelineIcon = _lightIcon;
    ic.classSharePhotoBackground = _lightBackground;
    ic.classSharePhotoIcon = _darkIcon;

    ic.goTimeline = function () {
        ic.classTimelineBackground = _darkBackground;
        ic.classTimelineIcon = _lightIcon;
        ic.classSharePhotoBackground = _lightBackground;
        ic.classSharePhotoIcon = _darkIcon;
        $state.go('^.timeline');
    };

    ic.goSharePhoto = function () {
        ic.classTimelineBackground = _lightBackground;
        ic.classTimelineIcon = _darkIcon;
        ic.classSharePhotoBackground = _darkBackground;
        ic.classSharePhotoIcon = _lightIcon;
        $state.go('^.sharephoto');
    };
    
    ic.loggout = function () {
        $usersManager.loggout();
        $state.go('login');
    };
}