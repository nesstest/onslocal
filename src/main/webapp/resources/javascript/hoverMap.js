function hoverMap(details, validpostCode, levelname, childname){
    dojoConfig = {
       locale: "en",
       parseOnLoad: true	    	     
     };		
	
        var map;

		require([    
		"esri/map", 
		"esri/dijit/HomeButton",
		"esri/InfoTemplate",
		"esri/dijit/Scalebar", 
		"dojo/parser", 
		"esri/geometry/Extent", 
		"esri/layers/FeatureLayer",  
		"esri/symbols/SimpleLineSymbol", 
		"esri/symbols/SimpleFillSymbol", 
		"esri/symbols/TextSymbol", 
		"esri/renderers/SimpleRenderer", 
		"esri/renderers/UniqueValueRenderer",  
		"esri/InfoTemplate",         
		"esri/layers/LabelLayer",  
		"dojo/_base/Color",
		"dojo/on",
		"dojo/dom",
		"esri/graphic",
		"esri/tasks/query",
	    "esri/tasks/QueryTask",
		"dojo/domReady!",
		"dijit/layout/BorderContainer", 
		"dijit/layout/ContentPane"
		
		  ], function( 
		    Map, HomeButton, InfoTemplate, Scalebar, parser, Extent, FeatureLayer, 
		    SimpleLineSymbol, SimpleFillSymbol, TextSymbol,SimpleRenderer, UniqueValueRenderer, InfoTemplate,   
		    LabelLayer, Color, on, dom, Graphic, Query, QueryTask
		  ) 
		  { 
		
			parser.parse(); 
			detailsArray = details.split(":");
			
			var xmin_env      = parseInt(detailsArray[0]);
			var ymin_env      = parseInt(detailsArray[1]);
			var xmax_env      = parseInt(detailsArray[2]);
			var ymax_env      = parseInt(detailsArray[3]);
			var area          = detailsArray[4];
			var areacode      = detailsArray[5];
			var arealayername = detailsArray[6];
			var xCoord        = detailsArray[7];
			var yCoord        = detailsArray[8];
			var parentLevelName = detailsArray[9];
			
			var childarealist = detailsArray[10];			
			var childcode     = detailsArray[11];
			var childarea     = detailsArray[12];			
			var childareaname = detailsArray[13];
			
			var childlayername     = detailsArray[14];
			
			// markerenvelope not required
			var childLevelName = detailsArray[15];
			
		   // var reformList    = childarealist.replace(/,/g, "','");		   
		   // var childAreaDef       = childcode  + " = '" + reformList + "'";	
			
			var postcode      = validpostCode;	
			
			var diff = xmax_env-xmin_env;
			newxmin  = xmin_env - diff;	
			var bbox = new esri.geometry.Extent({xmin:newxmin,ymin:ymin_env,xmax:xmax_env,ymax:ymax_env,spatialReference:{wkid:27700}});
			if (postcode == null || postcode.length == 0) {
				map = new Map("map", { 
					extent: bbox,
					slider:false,
					showAttribution: false,
					logo:false
					});		           
			}
			else {
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
			}
			
			esriConfig.defaults.io.corsEnabledServers.push("http://services.arcgisonline.com");
			esriConfig.defaults.io.corsEnabledServers.push("https://mapping.statistics.gov.uk");
			
			var dynamicMSLayer = new esri.layers.ArcGISDynamicMapServiceLayer("http://services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer");      
			map.addLayer(dynamicMSLayer);         
			map.setExtent(bbox.expand(1.1)); 
		
			if (postcode == null || postcode.length == 0){
				
			}
			else{
			 map.on("load", function(){		         
				 var symbol = new esri.symbol.PictureMarkerSymbol({
			     "angle": 0,
			     "xoffset": 0,
			     "yoffset": 12,
			     "type": "esriPMS",
			     "url": "resources/images/map-marker-128.png",
			     "contentType": "image/png",
			     "width": 24,
			     "height": 24
			  });	        
				 map.graphics.add(new esri.Graphic(new esri.geometry.Point(xCoord, yCoord, new esri.SpatialReference({ wkid: 27700 })),symbol));
		    });				
		   }
								
		   var defaultSymbol = new SimpleFillSymbol().setStyle(SimpleFillSymbol.STYLE_NULL); 
		   defaultSymbol.outline.setStyle(SimpleLineSymbol.STYLE_NULL); 
			 
			//create renderer 
			var renderer = new UniqueValueRenderer(defaultSymbol, areacode); 
			//add symbol for each possible value 
			renderer.addValue(area, 
					new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
			                new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
			                new Color([229,78,22]),2),new Color([229,78,22, 0.2])));  	  
			
			var infoTemplate = new InfoTemplate();
			infoTemplate.setTitle("Area:" );
			infoTemplate.setContent("content to go here");
			var labelField = areacode; 			
			var featureLayer = new FeatureLayer("https://mapping.statistics.gov.uk/arcgis/rest/services/"+arealayername+"/MapServer/0", { 
				infoTemplate: infoTemplate,
				mode: FeatureLayer.SNAPSHOT, 
				outFields: [labelField]
			 });
			
			// child details
			var featureChildLayer1 = new FeatureLayer("https://mapping.statistics.gov.uk/arcgis/rest/services/"+childLayerName+"/MapServer/0", { 
				infoTemplate: infoTemplate,
				mode: FeatureLayer.SNAPSHOT, 
				outFields: [childName]
			 });
			
		    
			
			featureLayer.setRenderer(renderer); 
			//featureLayer.infoTemplate.setContent(templateContent);
			map.addLayer(featureLayer);		
			
			map.on("load", function(){ 				
			   map.disableMapNavigation();
			   map.disableKeyboardNavigation();
			   map.disablePan();
			   map.disableRubberBandZoom();
			   map.disableScrollWheelZoom();
		   }); 
		});		
	}	
