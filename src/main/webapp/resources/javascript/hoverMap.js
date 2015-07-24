function hoverMap(details, validpostCode){
    dojoConfig = {
       locale: "en",
       parseOnLoad: true	    	     
     };		
	
        var map;

		require([    
		"esri/map", 
		"esri/dijit/HomeButton",		
		"dojo/parser", 
		"esri/geometry/Extent", 
		"esri/layers/FeatureLayer",  
		"esri/symbols/SimpleLineSymbol", 
		"esri/symbols/SimpleFillSymbol", 
		"esri/symbols/TextSymbol", 
		"esri/renderers/SimpleRenderer",		 
		"dojo/_base/Color",
		"dojo/on",
		"dojo/dom",
		"esri/graphic", 
		"esri/lang",
		"dojo/number", 
		"dojo/dom-style", 
        "dijit/TooltipDialog", 
        "dijit/popup",
        "dojo/query",
		"dojo/domReady!"		
		  ], function( 
		    Map, HomeButton, parser, Extent, FeatureLayer, 
		    SimpleLineSymbol, SimpleFillSymbol, TextSymbol,SimpleRenderer, Color, on, dom, Graphic, 
		    esriLang, number, domStyle, TooltipDialog, dijitPopup, query
		  ) 
		  { 
		
			parser.parse(); 
			detailsArray = details.split(":");
			
			var xmin_env      = parseInt(detailsArray[0]);
			var ymin_env      = parseInt(detailsArray[1]);
			var xmax_env      = parseInt(detailsArray[2]);
			var ymax_env      = parseInt(detailsArray[3]);
			var area          = detailsArray[4];
			var areaname      = detailsArray[5];
			var arealayername = detailsArray[6];
			
			var parentLevelName = detailsArray[9];
			var areacode        = detailsArray[10];					
			var childarealist   = detailsArray[11];
			var extcode         = detailsArray[12];
			
			var childcode       = detailsArray[13];
			var childarea       = detailsArray[14];	
			var childareaname   = detailsArray[15];			
			var childlayername  = detailsArray[16];			
			var childLevelName  = detailsArray[17];
			
		    var reformList    = childarealist.replace(/,/g, "','");	
		    var childAreaDef  = childcode + " IN ('" + reformList + "')";    
		
			var postcode      = validpostCode;	
			
			var diff = xmax_env-xmin_env;
			newxmin  = xmin_env - diff;	
			var bbox = new esri.geometry.Extent({xmin:newxmin,ymin:ymin_env,xmax:xmax_env,ymax:ymax_env,spatialReference:{wkid:27700}});
			
			map = new Map("map", { 
			  extent: bbox,
		 	  slider:true,
			  showAttribution: false,
			  logo:false
			});	
				
			home = new HomeButton({
			  map: map
			}, "HomeButton");
			home.startup();
						
			esriConfig.defaults.io.corsEnabledServers.push("http://services.arcgisonline.com");
			esriConfig.defaults.io.corsEnabledServers.push("https://mapping.statistics.gov.uk");
			esriConfig.defaults.io.corsEnabledServers.push("http://js.arcgis.com");			
			esriConfig.defaults.io.corsEnabledServers.push("http://ajax.googleapis.com");
			
			// parent layer
			var dynamicMSLayer = new esri.layers.ArcGISDynamicMapServiceLayer("http://services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer");      
			map.addLayer(dynamicMSLayer);  
			
			map.setExtent(bbox.expand(1.1)); 				
		
			var parentAreaDef       = areacode  + " = '" + extcode + "'";				
			
			var labelField = areacode; 			
			var featureLayer = new FeatureLayer("https://mapping.statistics.gov.uk/arcgis/rest/services/"+arealayername+"/FeatureServer/0", { 							
				mode: FeatureLayer.SNAPSHOT, 
				outFields: [labelField]
			 });
						
			// child details
			var featureChildLayer1 = new FeatureLayer("https://mapping.statistics.gov.uk/arcgis/rest/services/"+childlayername+"/FeatureServer/0", { 				
				mode: FeatureLayer.SNAPSHOT, 
				outFields: [childcode, childareaname]
				
			 });						
			
			var parentMapSymbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
                                  new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                                  new Color([229,78,22]),2),new Color([229,78,22, 0.2]));  	  		
			
			var defaultSymbol   = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
                                  new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                                  new Color([229,78,22]),2),new Color([229,78,22, 0.2]));  	
           
            
            featureChildLayer1.setDefinitionExpression(childAreaDef);
	        featureChildLayer1.setRenderer(new SimpleRenderer(defaultSymbol)); 
	         
	        featureLayer.setDefinitionExpression(parentAreaDef);		   	                    	     
	        featureLayer.setRenderer(new SimpleRenderer(parentMapSymbol));			
		   
			map.addLayers([featureLayer, featureChildLayer1]);	
			
		    map.infoWindow.resize(245,125);
		    
		    dialog = new TooltipDialog({
		       id: "tooltipDialog",
		       style: "position:  absolute; width: auto; font: normal normal normal 10pt Helvetica;z-index:100;"
		    });
		    dialog.startup();
		    
		    var highlightSymbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, 
		          new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,new Color([229,78,22]), 3), 
		            new Color([229,78,22,0.45])
		     );
		    
	        //listen for when the onMouseOver event fires on the countiesGraphicsLayer
	        //when fired, create a new graphic with the geometry from the event.graphic and add it to the maps graphics layer
		    var t;
		    featureChildLayer1.on("mouse-over", function(evt){
		      map.setMapCursor("pointer"); 
	          if (childLevelName === "OA") {
	        	   t = "<b>${"+ childcode + "}</b>";
	          }
	          else {
	        	   t = "<b>${"+ childareaname + "}</b>";
	          }	  
	          
	          var content = esriLang.substitute(evt.graphic.attributes,t);
	          var highlightGraphic = new Graphic(evt.graphic.geometry,highlightSymbol);
	          map.graphics.add(highlightGraphic);
	          
	          dialog.setContent(content);

	          domStyle.set(dialog.domNode, "opacity", 0.85);
	         
	          dijitPopup.open({
	            popup: dialog, 
	            x: evt.pageX,
	            y: evt.pageY
	          });
	        });
	    
	        function closeDialog() {
	          map.graphics.clear();
	          map.setMapCursor("default"); 
	          dijitPopup.close(dialog);
	        } 
			
	        map.on("load", function(){ 				
			   map.enableMapNavigation();
			   map.disableKeyboardNavigation();
			   map.enablePan();
			   map.disableRubberBandZoom();
			   map.enableScrollWheelZoom();
			   map.graphics.enableMouseEvents();
		       map.graphics.on("mouse-out", closeDialog);
		   }); 
		});		
	}	