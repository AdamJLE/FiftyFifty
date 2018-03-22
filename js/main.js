/* global StatusBar, update */

var app = {

    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function () {
        StatusBar.hide();
    }
    
};

app.initialize();
