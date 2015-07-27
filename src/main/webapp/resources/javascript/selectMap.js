function selectMap(queryExtent,extCode,arealayername,areacode,areaname){	
	alert("selectMap");
	
	var extent = queryExtent;
	alert("extent" + extent.toSource());
	var extCode = extCode;
	alert("extCode" + extCode);
	var arealayername = arealayername;
	alert("arealayername" + arealayername);
	var areacode = areacode;
	alert("areacode" + areacode);
	var areaname = areaname;
	alert("areaname" + areaname);
	
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
		"esri/renderers/UniqueValueRenderer",		
		"dojo/_base/Color",
		"dojo/on",
		"dojo/dom",
		"esri/graphic",		
		"esri/lang",
		"dojo/number", 
		"dojo/dom-style", 
        "dijit/TooltipDialog", 
        "dijit/popup",       
		"dojo/domReady!"		
		
		  ], function( 
		    Map, HomeButton, parser, Extent, FeatureLayer, SimpleLineSymbol, SimpleFillSymbol, TextSymbol,SimpleRenderer, UniqueValueRenderer, 
		    Color, on, dom, Graphic, esriLang, number, domStyle, TooltipDialog, dijitPopup
		  ) 
		  { 
		
			var queryTask, query;
			parser.parse(); 
			
			var diff = xmax_env-xmin_env;
			newxmin  = xmin_env - diff;	
			var bbox = new esri.geometry.Extent({xmin:newxmin,ymin:ymin_env,xmax:xmax_env,ymax:ymax_env,spatialReference:{wkid:27700}});
			map = new Map("map", { 
			   extent: bbox,
			   slider:true,
			   showAttribution: false,
			   logo:false,
			   smartNavigation: false
			});	
			
			home = new HomeButton({
				map: map
			}, "HomeButton");
			home.startup();			
			
			esriConfig.defaults.io.corsEnabledServers.push("http://services.arcgisonline.com");
			esriConfig.defaults.io.corsEnabledServers.push("https://mapping.statistics.gov.uk");
			esriConfig.defaults.io.corsEnabledServers.push("http://js.arcgis.com");			
			esriConfig.defaults.io.corsEnabledServers.push("http://ajax.googleapis.com");	
			
			var dynamicMSLayer = new esri.layers.ArcGISDynamicMapServiceLayer("http://services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer");      
			map.addLayer(dynamicMSLayer);         
			map.setExtent(bbox.expand(1.1)); 					
		   
		    var defaultSymbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
                 new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                 new Color([229,78,22]),1),new Color([0,0,0,0]));  
		   
		    var highlightSymbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, 
			     new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,new Color([229,78,22]), 2), 
			     new Color([229,78,22,0.1]));		
		
		    if (levelname === "OA") {
		    	var dynamicLayer = "https://mapping.statistics.gov.uk/arcgis/rest/services/"+arealayername+"/featureServer/0";
		    	var featureLayer = new FeatureLayer(dynamicLayer, {outFields: [areacode]});
		    	//create renderer 
				var renderer = new UniqueValueRenderer(defaultSymbol, areacode);
		    }
		    else{			    	
		    	var dynamicLayer = "https://mapping.statistics.gov.uk/arcgis/rest/services/"+arealayername+"/featureServer/0";
		    	var featureLayer = new FeatureLayer(dynamicLayer, {outFields: [areaname]});
		    	//create renderer 
				var renderer = new UniqueValueRenderer(defaultSymbol, areaname);
		    }
		    
		    //add symbol for each possible value 
			renderer.addValue(area, 
			   new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
			   new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
			   new Color([229,78,22]),2),new Color([229,78,22, 0.45])));			
		
			featureLayer.setRenderer(renderer); 		
			
			map.addLayer(featureLayer);	
			
			map.infoWindow.resize(245,125);
		    
		    dialog = new TooltipDialog({
		       id: "tooltipDialog",
		       style: "position:  absolute; width: auto; font: normal normal normal 10pt Helvetica;z-index:100;"
		    });
		    dialog.startup();		 
		    
	        //listen for when the onMouseOver event fires on the countiesGraphicsLayer
	        //when fired, create a new graphic with the geometry from the event.graphic and add it to the maps graphics layer		   
		    var t;
		    featureLayer.on("mouse-over", function(evt){
		      map.setMapCursor("pointer");		      
		      
	          if (levelname === "OA") {
	        	   t = "<b>${"+ areacode + "}</b>";
	          }
	          else {
	        	   t = "<b>${"+ areaname + "}</b>";
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
			
	        map.on("load", function(){ 				
			   map.disableMapNavigation();
			   map.disableKeyboardNavigation();
			   map.enablePan();
			   map.disableRubberBandZoom();
			   map.enableScrollWheelZoom();
			   map.graphics.enableMouseEvents();
		       map.graphics.on("mouse-out", closeDialog);
		       map.on("mouse-drag-end", closeDialog);
		   }); 
		});		
	}