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
        onBeforeAction: function() {
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
// Router.map(function() {
//     this.route('/postWalk')
//     this.route('/findWalk')
// });


// Router.onBeforeAction(function() {
//     if (!Meteor.user()) {
//         // if the user is not logged in, render the Login template
//         console.log("not logged in")
//         console.log(this)
//         Router.current().render('home')
//         this.render('home')
//         // this.render('findWalk')
//         // this.render('adads')
//     } else {
//         // otherwise don't hold up the rest of hooks or our route/action function
//         // from running
//         console.log("asd")
//         // this.next();
//     }
// }, {
//     // only: ['postWalk']
// })
