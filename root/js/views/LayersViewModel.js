/* 
 * Copyright (c) 2016 Bruce Schubert <bruce@emxsys.com>.
 * Released under the MIT License
 * http://www.opensource.org/licenses/mit-license.php
 */

/**
 * Layers content module
 *
 * @param {type} ko
 * @param {type} $
 * @returns {LayersViewModel}
 */
define(['knockout', 'jquery', 'jqueryui', 'bootstrap', 'model/Constants'],
        function (ko, $, jqueryui, boostrap, constants) {

            /**
             * The view model for the Layers panel.
             * @param {Globe} globe The globe that provides the layer manager.
             * @constructor
             */
            function LayersViewModel(globe) {
                var self = this,
                        layerManager = globe.layerManager;

                // Create view data sources from the LayerManager's observable arrays
                self.baseLayers = layerManager.baseLayers;
                self.overlayLayers = layerManager.overlayLayers;
				self.overlay1Layers = layerManager.overlay1Layers;
                self.dataLayers = layerManager.dataLayers;
                //self.effectsLayers = layerManager.effectsLayers;
                //self.widgetLayers = layerManager.widgetLayers;

                // Layer type options
                self.optionValues = ["WMS Layer", "WMTS Layer", "KML file", "Shapefile"];
                self.selectedOptionValue = ko.observable(self.optionValues[0]);
				self.curr = ko.observable(0.8);
                //self.rangeValue = ko.observable(0.8);
                /**
                 * An observable array of servers
                 */
               /*this.servers = layerManager.servers;
                self.serverAddress = ko.observable("http://neowms.sci.gsfc.nasa.gov/wms/wms");

                /**
                 * Toggles the selected layer's visibility on/off
                 * @param {Object} layer The selected layer in the layer collection
                 */
                self.onToggleLayer = function (layer) {
					
                    layer.enabled(!layer.enabled());
                    globe.redraw();
                };
				self.chag = function (data,event,layer)
				{
					
					var layerName = event.target.id;
					var layers = globe.wwd.layers,i, len;
              for (i = 0, len = layers.length; i < len; i++) 
			  {
                  if (layers[i].displayName === layerName) {
                   layers[i].opacity = data.value;
				   //console.log(layers[i].urlBuilder.layerNames);
					 globe.redraw();
                 }
             }
		};
		
		self.parxm = function (layerName,orgnam,crs,servadd,imgfr,prj,doc)
				{
					try{
					var layn = layerName;
					var xmd = doc;
					var orgi = orgnam;
					var srs = crs;
					var add = servadd;
					var imfo = imgfr;
					var proj = prj;
					var test,property,property1,i,h,text,key = 0,str=" ";
					var result = [];
					var prop = [];
					var propv = [];
					var serty = "WMS";
					var users = xmd.getElementsByTagName("Layer");
					for(var i = 0; i < users.length; i++) {
					var user = users[i];
					var names = user.getElementsByTagName("Title");
					for(var j = 0; j < names.length; j++) {
					if(names[j].childNodes[0].nodeValue === layn)
					{
						var abst = user.getElementsByTagName('Abstract')[0].lastChild.nodeValue;
						var westb = user.getElementsByTagName('westBoundLongitude')[0].lastChild.nodeValue;
						var eastb = user.getElementsByTagName('eastBoundLongitude')[0].lastChild.nodeValue;
						var northb = user.getElementsByTagName('northBoundLatitude')[0].lastChild.nodeValue;
						var southb = user.getElementsByTagName('southBoundLatitude')[0].lastChild.nodeValue;
					}
					}
					}
                var my_url = add+'SERVICE=WMS&VERSION=1.1.1&REQUEST=GetFeatureInfo&FORMAT=image/png&TRANSPARENT=true&QUERY_LAYERS='+orgi+'&STYLES&LAYERS='+orgi+'&INFO_FORMAT=application/json&FEATURE_COUNT=50&X=50&Y=50&SRS=EPSG:4326&WIDTH=101&HEIGHT=101&BBOX='+westb+','+southb+','+eastb+','+northb;
                fetch(my_url)
                 .then(res => res.json())
                .then((out) => {
					try{
                    if(out.crs == null){
                       str = "Attribute list is not visible for this layer";
                     }else{
                        property = out.features[0].properties;
						property1 = out.features[0].geometry.type;
						h = 1;
						for(var name in property)
						{
							 prop[i] = name;
							 str = str.concat(h);
							 str = str.concat(".");
							 str = str.concat(prop[i]);
							str = str.concat("\n");
							h++;
							//console.log(str);
						}
					 }
					   
                        var $featuredialog =  $("#feature")                    
                        .html('Data Name : '+orgi+
                            '<br>Data Name Alias(wms_title) : '+layn+
							'<br>Feature Type : '+property1+
                            '<br>Projection(wms_srs) : '+srs+
                            '<br>Projection(coordsys_name) : '+proj+
							'<br>Source Name : '+add+
							'<br>Web Service Type : '+serty+
							'<br>Imge Format Returned : '+imfo+
							'<br>westBoundLongitude : '+westb+
							'<br>northBoundLatitude : '+northb+
							'<br>southBoundLatitude : '+southb+
							'<br>eastBoundLongitude : '+eastb+
							'<br>----------------------------------------------<br>Description : '+abst+
							'<br>----------------------------------------------<br>Attributes : '+str
							)
                        .dialog({ 
                             autoOpen: false,
                              title: "MetaData",
							  width: 600,
							  height: 'auto'
                            });
                             $featuredialog.dialog("open").parent(".ui-dialog").css("background","TRANSPARENT").find(".ui-dialog-content").css("color","white").prev(".ui-dialog-titlebar").css("background","grey");

				}
				catch(e)
				{
					var $featuredialog =  $("#feature")                    
                        .html('Data Name : '+orgi+
                            '<br>Data Name Alias(wms_title) : '+layn+
							'<br>Feature Type : '+property1+
                            '<br>Projection(wms_srs) : '+srs+
                            '<br>Projection(coordsys_name) : '+proj+
							'<br>Source Name : '+add+
							'<br>Web Service Type : '+serty+
							'<br>Imge Format Returned : '+imfo+
							'<br>westBoundLongitude : '+westb+
							'<br>northBoundLatitude : '+northb+
							'<br>southBoundLatitude : '+southb+
							'<br>eastBoundLongitude : '+eastb+
							'<br>----------------------------------------------<br>Description : '+abst+
							'<br>----------------------------------------------<br>Attributes : Layers not queryable'
							)
                        .dialog({ 
                             autoOpen: false,
                              title: "MetaData",
							  width: 600,
							  height: 'auto'
                            });
                            $featuredialog.dialog("open").parent(".ui-dialog").css("background","TRANSPARENT").find(".ui-dialog-content").css("color","white").prev(".ui-dialog-titlebar").css("background","grey");
				}
				
				})
				.catch(function(err) {
					var $featuredialog =  $("#feature")                    
                        .html('Data Name : '+orgi+
                            '<br>Data Name Alias(wms_title) : '+layn+
							'<br>Feature Type : '+property1+
                            '<br>Projection(wms_srs) : '+srs+
                            '<br>Projection(coordsys_name) : '+proj+
							'<br>Source Name : '+add+
							'<br>Web Service Type : '+serty+
							'<br>Imge Format Returned : '+imfo+
							'<br>westBoundLongitude : '+westb+
							'<br>northBoundLatitude : '+northb+
							'<br>southBoundLatitude : '+southb+
							'<br>eastBoundLongitude : '+eastb+
							'<br>----------------------------------------------<br>Description : '+abst+
							'<br>----------------------------------------------<br>Attributes : Layers not queryable'
							)
                        .dialog({ 
                             autoOpen: false,
                              title: "MetaData",
							  width: 600,
							  height: 'auto'
                            });
                             $featuredialog.dialog("open").parent(".ui-dialog").css("background","TRANSPARENT").find(".ui-dialog-content").css("color","white").prev(".ui-dialog-titlebar").css("background","grey");
					})
				}
				catch(e)
				{
					var $featuredialog =  $("#feature")                    
                        .html('Data Name : '+orgi+
                            '<br>Data Name Alias(wms_title) : '+layn+
							'<br>Feature Type : '+property1+
                            '<br>Projection(wms_srs) : '+srs+
                            '<br>Projection(coordsys_name) : '+proj+
							'<br>Source Name : '+add+
							'<br>Web Service Type : '+serty+
							'<br>Imge Format Returned : '+imfo+
							'<br>westBoundLongitude : '+westb+
							'<br>northBoundLatitude : '+northb+
							'<br>southBoundLatitude : '+southb+
							'<br>eastBoundLongitude : '+eastb+
							'<br>----------------------------------------------<br>Description : '+abst+
							'<br>----------------------------------------------<br>Attributes : Layers not queryable'
							)
                        .dialog({ 
                             autoOpen: false,
                              title: "MetaData",
							  width: 600,
							  height: 'auto'
                            });
                             $featuredialog.dialog("open").parent(".ui-dialog").css("background","TRANSPARENT").find(".ui-dialog-content").css("color","white").prev(".ui-dialog-titlebar").css("background","grey");
				}
				
				 
		};
		
		
		self.chd = function (data,event,layer)
		{
			try{
				
				var layerName = data.name();
				var orgnam,crs,servadd,imgfr,prj,wmsCapsDoc;
					var layers = globe.wwd.layers,i, len;
              for (i = 0, len = layers.length; i < len; i++) 
			  {
                  if (layers[i].displayName === layerName) {
				   orgnam = layers[i].urlBuilder.layerNames;
				   crs = layers[i].urlBuilder.crs;
					servadd = layers[i].urlBuilder.serviceAddress;
				imgfr = layers[i].retrievalImageFormat;
				prj = layers[i].lastGlobeStateKey;
                 }
             }
				var asm;
				asm = servadd+"SERVICE=WMS&VERSION=1.3.0&REQUEST=GetCapabilities";
				
				var x = new XMLHttpRequest();
				x.open("GET", asm, true);
				x.onreadystatechange = function () {
				if (x.readyState == 4 && x.status == 200)
					{
					var doc = x.responseXML;
					
					self.parxm(layerName,orgnam,crs,servadd,imgfr,prj,doc);
					}
					};
					x.send(null);
		}
		catch(e)
				{
					var $featuredialog =  $("#feature")                    
                        .html('This layer doesnot have any metadata. Layer doesnot belongs to WMS'
							)
                        .dialog({ 
                             autoOpen: false,
                              title: "MetaData",
							  width: 500,
							  height: 'auto'
                            });
                             $featuredialog.dialog("open").parent(".ui-dialog").css("background","TRANSPARENT").find(".ui-dialog-content").css("color","white").prev(".ui-dialog-titlebar").css("background","grey");
				}
		};
				
		

                /**
                 * Opens a dialog to edit the layer settings.
                 * @param {Object} layer The selected layer in the layer collection
                 */
                self.onEditSettings = function (layer) {
                    
                    $('#opacity-slider').slider({
                        animate: 'fast',
                        min: 0,
                        max: 1,
                        orientation: 'horizontal',
                        slide: function (event, ui) {
                            //console.log(layer.name() + ":  " + layer.opacity());
                            layer.opacity(ui.value);
                        },
                        step: 0.1
                    });
                    
                    $("#layer-settings-dialog").dialog({
                        autoOpen: false,
                        title: layer.name()
                    });
                    
                    //console.log(layer.name() + ":  " + layer.opacity());
                    $("#opacity-slider").slider("option", "value", layer.opacity());
                    $("#layer-settings-dialog").dialog("open");
                };
                
                
                /**
                 * Opens the Add Layer dialog.
                 */
                self.onAddLayer = function() {
                    $("#add-layer-dialog").dialog({
                        autoOpen: false,
                        title: "Add Layer"
                    });
                    
                    $("#add-layer-dialog").dialog("open");
                };
                
                
                /*self.onAddServer  = function() {
                    layerManager.addServer(self.serverAddress());
                    return true;
                };

                /**
                 * Add the supplied layer from the server's capabilities to the active layers
                 
                this.onServerLayerClicked = function(layerNode, event){
                    if (!layerNode.isChecked()) {
                        // TODO: Open dialog to select a layer category
                        layerManager.addLayerFromCapabilities(layerNode.layerCaps, constants.LAYER_CATEGORY_OVERLAY);
                    } else {
                        layerManager.removeLayer(layerNode.layerCaps);
                    }
                    return true;
                };*/
            }

            return LayersViewModel;
        }
);
