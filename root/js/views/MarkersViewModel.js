/*
 * The MIT License - http://www.opensource.org/licenses/mit-license
 * Copyright (c) 2016 Bruce Schubert.
 */

/*global WorldWind*/

define(['knockout', 'model/Constants'],
        function (ko, constants) {
            "use strict";
            /**
             *
             * @param {Globe} globe
             * @param {MarkerManager} markerManager
             * @constructor
             */
            function MarkersViewModel(globe, markerManager) {
                var self = this,
                        wwd = globe.wwd;
                self.dataLayers = globe.layerManager.dataLayers;
                self.onToggleLayer = function (layer) {
                    
                    layer.enabled(!layer.enabled());
                    globe.redraw();
                };
                self.chag = function(data, event, layer) {

                    var layerName = event.target.id;
                    var layers = globe.wwd.layers,
                        i, len;
                    for (i = 0, len = layers.length; i < len; i++) {
                        if (layers[i].displayName === layerName) {
                            layers[i].opacity = data.value;
                            globe.redraw();
                        }
                    }
                };

                self.markersLayer = globe.layerManager.findLayer(constants.LAYER_NAME_MARKERS);
                self.markers = markerManager.markers;   // observable array

                /** "Goto" function centers the globe on a selected marker */
                self.gotoMarker = function (marker) {
                    globe.goto(marker.latitude(), marker.longitude());
                };

                /** "Edit" function invokes a modal dialog to edit the marker attributes */
                self.editMarker = function (marker) {
                    if (marker.isOpenable()) {
                        globe.selectController.doSelect(marker);
                        marker.open();
                    }
                };
                
                /** "Remove" function removes a marker from the globe */
                self.removeMarker = function (marker) {
                    if (marker.isRemovable()) {
                        marker.remove();
                    }
                };

            }

            return MarkersViewModel;
        }
);