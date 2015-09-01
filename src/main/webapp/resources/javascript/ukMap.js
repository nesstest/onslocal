function ukMap(details){	
	
	dojoConfig = {
		       locale: "en",
		       parseOnLoad: true	    	     
		     };		
			        
		 var map;

		 require([    
			"esri/map",				
			"dojo/parser", 
			"esri/geometry/Extent", 
			"dojo/on",				
			"dojo/domReady!"				
		  ], function( 
		      Map, parser, Extent, on
			 ) 
		  
		  {			
								
			parser.parse(); 
			detailsArray = details.split(":");
		
			var xmin_env      = parseInt(detailsArray[0]);
			var ymin_env      = parseInt(detailsArray[1]);
			var xmax_env      = parseInt(detailsArray[2]);
			var ymax_env      = parseInt(detailsArray[3]);				
			
			
			var diff = xmax_env-xmin_env;
			newxmin  = xmin_env - diff;	
			var bbox = new esri.geometry.Extent({xmin:newxmin,ymin:ymin_env,xmax:xmax_env,ymax:ymax_env,spatialReference:{wkid:27700}});
			
			map = new Map("map", { 
			  extent: bbox,
			  slider:false,
			  showAttribution: false,
			  logo:false
			});		     
		
			
			esriConfig.defaults.io.corsEnabledServers.push("http://services.arcgisonline.com");			
			esriConfig.defaults.io.corsEnabledServers.push("http://js.arcgis.com");				
			
			var dynamicMSLayer = new esri.layers.ArcGISDynamicMapServiceLayer("http://services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer");      
			map.addLayer(dynamicMSLayer);         
			map.setExtent(bbox.expand(1.1));		
			
			map.on("load", function(){ 				
			   map.disableMapNavigation();
			   map.disableKeyboardNavigation();
			   map.disablePan();
			   map.disableRubberBandZoom();
			   map.disableScrollWheelZoom();			  		 
		   }); 
		});		
	}