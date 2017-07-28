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
            self.serverAddress = ko.observable("http://199.79.36.156/cgi-bin/mapserv?map=WorldWind.map&");
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
            layerManager.addServer("http://199.79.36.156/cgi-bin/mapserv?map=BASE_WMS.map&");
			layerManager.addServer("http://199.79.36.156/cgi-bin/mapserv?map=FAC_WMS.map&");
            //
            layerManager.addServer("http://giswebservices.massgis.state.ma.us/geoserver/wms?");
            layerManager.addServer("http://localhost:8080/geoserver/Mohan/wms?");
            layerManager.addServer("http://localhost:8080/geoserver/topp/wms?");
            
            //
			layerManager.addServer("http://199.79.36.156/cgi-bin/mapserv?map=LAND_MGT_WMS.map&");
			layerManager.addServer("http://199.79.36.156/cgi-bin/mapserv?map=ES_WMS.map&");
			layerManager.addServer("http://199.79.36.156/cgi-bin/mapserv?map=ENVIRON_WMS.map&");
            //http://giswebservices.massgis.state.ma.us/geoserver/wms? http://localhost:8080/geoserver/topp/wms?
            //http://localhost:8080/geoserver/Mohan/wms?
			
			
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