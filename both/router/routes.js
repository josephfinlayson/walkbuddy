"use strict"

/*****************************************************************************/
/* Client and Server Routes */
/*****************************************************************************/
Router.configure({
    layoutTemplate: 'MasterLayout',
    loadingTemplate: 'Loading',
    notFoundTemplate: 'NotFound',
    templateNameConverter: 'upperCamelCase',
    routeControllerNameConverter: 'upperCamelCase'
});

// Router.route('/', function () {
//   this.render('home');
// });


Router.map(function() {
    this.route('home', {
        path: '/'
    });
    this.route('postWalk', {
        path: '/postWalk',
        onBeforeAction: function(pause) {
            if (!Meteor.user()) {
                this.render('home');
                pause()
            };
        }

    });
    this.route('findWalk', {
        path: '/findWalk'

    });

});
