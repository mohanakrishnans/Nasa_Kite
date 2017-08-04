/**
 * View content module
 *
 * @param {type} ko
 * @param {type} $
 * @returns {ViewsViewModel}
 */
define(['knockout', 'jquery', 'jqueryui', 'bootstrap', 'model/Constants'],
        function (ko, $, jqueryui, boostrap, constants) {

            /**
             * The view model for the Layers panel.
             * @param {Globe} globe The globe that provides the layer manager.
             * @constructor
			 **/
             var flag = true;
             var temp = 1;
			 function ViewsViewModel(globe) {
                var self = this,
                        layerManager = globe.layerManager;
				
                // Create view data sources from the LayerManager's observable array
                self.effectsLayers = layerManager.effectsLayers;
                self.widgetLayers = layerManager.widgetLayers;
				self.onToggleLayer = function (layer) {
					console.log("TOPP"+layer.name());
                    layer.enabled(!layer.enabled());
                    flag = layer.enabled();
                    console.log("Success "+flag);
                    globe.redraw();
                };
				self.chag = function (data,event,layer)
				{
					
					var layerName = event.target.id;
					var layers = globe.wwd.layers,i, len;
              for (i = 0, len = layers.length; i < len; i++) 
			  {
                  if (layers[i].displayName === layerName && flag==false){
                    temp = layers[i].opacity;
                    console.log("DISABLED");
                    globe.redraw();
                  }
                   else if (layers[i].displayName === layerName && flag==true) {
                      layers[i].opacity = temp;
                      $('#opacity-slider').val(temp);
                      globe.redraw();
                      layers[i].opacity = data.value;
                      console.log("ENABLED");
                      console.log("Opacity: "+layers[i].opacity);
					  //globe.redraw();
                  }
             }
		};
		
				self.onEditSettings = function (layer) 
					{
                    
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
                    
                    console.log("NEW FUNC"+layer.name() + ":  " + layer.opacity());
                    $("#opacity-slider").slider("option", "value", layer.opacity());
                    $("#layer-settings-dialog").dialog("open");
                };
				 self.onAddLayer = function() {
                    $("#add-layer-dialog").dialog({
                        autoOpen: false,
                        title: "Add Layer"
                    });
                    
                    $("#add-layer-dialog").dialog("open");
                };
				
			 }
				 return ViewsViewModel;
		}
		
		);