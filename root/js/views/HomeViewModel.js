/* 
 * Copyright (c) 2016 Bruce Schubert <bruce@emxsys.com>.
 * Released under the MIT License
 * http://www.opensource.org/licenses/mit-license.php
 */

/**
 * Output content module
 *
 * @param {type} ko
 * @param {type} $
 * @returns {HomeViewModel}
 */
define(['knockout',
        'jquery',
        'model/Constants'],
    function (ko, $, constants) {

        /**
         * The view model for the Home panel.
         * @constructor
         */
        function HomeViewModel(globe) {
            var self = this,layerManager = globe.layerManager;

            this.globe = globe;
            this.timeZoneDetectEnabled = globe.timeZoneDetectEnabled;
            this.use24Time = globe.use24Time;
            this.servers = layerManager.servers;
            self.serverAddress = ko.observable("http://geospatial.springfield-or.gov/cgi-bin/mapserv?map=WorldWind.map&");
            self.onAddServer  = function() {
                layerManager.addServer(self.serverAddress());
                return true;
            };
            this.onServerLayerClicked = function(layerNode, event){
                if (!layerNode.isChecked()) {
                    // TODO: Open dialog to select a layer category
                    layerManager.addLayerFromCapabilities(layerNode.layerCaps, constants.LAYER_CATEGORY_OVERLAY);
                    //blinker(1);
                    blink("ul:first > li:nth-child(2)", 5, 100);
                } else {
                    //console.log(layerNode.layerCaps);
                    layerManager.removeLayer(layerNode.layerCaps);
                }
                return true;

            };
            //layerManager.addServer("http://10.9.3.238:8080/geoserver/BASE_WMS/wms?");
			//layerManager.addServer("http://10.9.3.238:8080/geoserver/FAC_WMS/wms?");
            layerManager.addServer("http://127.0.0.1:8080/geoserver/topp/wms?");
        }

        return HomeViewModel;
    }











);
function blink(elem, times, speed) {
    if (times > 0 || times < 0) {
        if ($(elem).hasClass("blink"))
            $(elem).removeClass("blink");
        else
            $(elem).addClass("blink");
    }

    clearTimeout(function () {
        blink(elem, times, speed);
    });

    if (times > 0 || times < 0) {
        setTimeout(function () {
            blink(elem, times, speed);
        }, speed);
        times -= .5;
    }
}