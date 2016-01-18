function highlightMap(details, postcode, envelope){	
	
	dojoConfig = {
			locale: "en",
			parseOnLoad: true	    	     
	};		

	var map, home;
	require([    
	         "esri/map",
	         "esri/config",
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
	         "esri/tasks/query",
	         "esri/tasks/QueryTask",
	         "esri/symbols/PictureMarkerSymbol",
	         "esri/layers/ArcGISDynamicMapServiceLayer",
	         "esri/SpatialReference",
	         "esri/geometry/Point",
	         "esri/domUtils",
	         "dojo/has",
	         "dojo/sniff",
	         "dojo/domReady!"		

	         ], function( 
	        		 Map, esriConfig, HomeButton, parser, Extent, FeatureLayer, SimpleLineSymbol, SimpleFillSymbol, TextSymbol, SimpleRenderer, UniqueValueRenderer, 
	        		 Color, on, dom, Graphic, esriLang, number, domStyle, TooltipDialog, dijitPopup, Query, QueryTask, PictureMarkerSymbol,
	        		 ArcGISDynamicMapServiceLayer, SpatialReference, Point, domUtils, has, sniff 
	         ) 
	         { 
		
		  // --------------------------------------------------------------------
		  // Environment is running on the browser platform
		  // check if the device supports touch
		  // touch-events
		  // --------------------------------------------------------------------
		  if (has("host-browser") && has("touch")) {
		    // touch specific code
			 alert("touch specific"); 
		  }
		  else {
		    // non-touch specific code
			  alert("non-touch specific"); 
		  }
		  
		 // if(sniff("android") > 5 && sniff("chrome") > 44) {
		    // --------------------------------------------------------------------
		    // Android Platform:
		    // Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58K)
		    // AppleWebKit/537.36 (KHTML, like Gecko)
		    // Chrome/46.0.2490.76 Mobile Safari/537.36
		    // --------------------------------------------------------------------
		  //  console.log("Android Platform: %s", navigator.userAgent);
		 // }
		 // else if(sniff("ios") > 8 && sniff("safari") > 7) {
		    // --------------------------------------------------------------------
		    // iOS Platform: Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X)
		    // AppleWebKit/601.1.46 (KHTML, like Gecko)
		    // Version/9.0 Mobile/13B143 Safari/601.1
		    // --------------------------------------------------------------------
		  //  console.log("iOS Platform: %s", navigator.userAgent);
		//  }
             
		parser.parse();				

		var detailsArray = details.split("|");
		
		var area          = detailsArray[0];            // ie OA,WD,LA,GOR,CTRY
		var areaname      = detailsArray[1];
		var arealayername = detailsArray[2];
		var markerParam   = detailsArray[3].split(':');
		var xCoord        = parseInt(markerParam[0]);
		var yCoord        = parseInt(markerParam[1]);
		var levelname     = detailsArray[4];
		var areacode      = detailsArray[5];
		var wardName      = detailsArray[6];	
		var laName        = detailsArray[7];
		var gorName       = detailsArray[8];			
		var ctryName      = detailsArray[9];
		var wardCode      = detailsArray[10];	
		var laCode        = detailsArray[11];
		var gorCode       = detailsArray[12];			
		var ctryCode      = detailsArray[13];			
		var parliConName  = detailsArray[14];		
		var healthName    = detailsArray[15];
		var parliConCode  = detailsArray[16];
		var healthCode    = detailsArray[17];			

		var markerEnvelope = xCoord + ":" + yCoord;

		var polygon;
		var selected = false;
        var extcode;        

		var loading = dom.byId("loadingImg");  //loading image. id 		
		
		// reformat envelope value xmin:nnnnnn,ymin:nnnnnn,xmax:nnnnnn,ymax:nnnnnn 
		// to xmin,ymin,xmax,ymax 		
		var param         = envelope.split(':');					            
	    var xmin_env      = parseInt(param[0]); 
	    var ymin_env      = parseInt(param[1]);
	    var xmax_env      = parseInt(param[2]);
	    var ymax_env      = parseInt(param[3]);
	   			    		
	    var diff = xmax_env-xmin_env;
	    var newxmin  = xmin_env - diff;    		
	    var queryExtent = new Extent({xmin:newxmin,ymin:ymin_env,xmax:xmax_env,ymax:ymax_env,spatialReference:{wkid:27700}});
		
		var bbox = new Extent(queryExtent);
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

		var dynamicMSLayer = new ArcGISDynamicMapServiceLayer("http://services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer");      
		var dynamicMSLayer2 = new ArcGISDynamicMapServiceLayer("http://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer");      
		var currentLayer = "street";
		map.addLayer(dynamicMSLayer);   
		
		map.setExtent(bbox.expand(1.1)); 
		
		on(dom.byId("btnSwap"), "click", function () {  
          if (currentLayer == "street")
          	 {
            	 map.removeLayer(dynamicMSLayer);  
            	 map.addLayer(dynamicMSLayer2);
            	 $("#btnSwap").attr('src','resources/images/street.jpg');
            	 currentLayer = "topo";
            	 } 
             else
             {
            	 map.removeLayer(dynamicMSLayer2);  
            	 map.addLayer(dynamicMSLayer);
            	 $("#btnSwap").attr('src','resources/images/aerial.jpg');
            	 currentLayer = "street";
             } 
       });  
		

		on(dynamicMSLayer, "load", function(){
		  showLoading();			   
		});	
		
		on(dynamicMSLayer,'error', function(err){			                  	 
	      hideLoading(err); 
	      dom.byId("mapFailed").innerHTML = "Map currently unavailable";     
		});

		on(map, 'update-start', showLoading);
		on(map, 'update-end', hideLoading);

		var renderer = new UniqueValueRenderer();

		var defaultSymbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
				new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
						new Color([0,0,0]),1),new Color([0,0,0,0]));  

		var highlightSymbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, 
				new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,new Color([0,0,0]), 2), 
				new Color([229,78,22,0.1]));  

		var selSymbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
				new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
						new Color([0,0,0]),2),new Color([229,78,22, 0.45]));		   

		var dynamicLayer = "https://mapping.statistics.gov.uk/arcgis/rest/services/"+arealayername+"/featureServer/0";
        var featureLayer;
             
		if (levelname === "OA") {
		   featureLayer = new FeatureLayer(dynamicLayer, {outFields: [areacode]});
		}
		else {
		   featureLayer = new FeatureLayer(dynamicLayer, {outFields: [areacode, areaname]});
		}
		
		//create renderer 
		renderer = new UniqueValueRenderer(defaultSymbol, areacode);
	
		featureLayer.setRenderer(renderer); 			
		map.addLayer(featureLayer);				

		map.infoWindow.resize(245,125);

		var dialog = new TooltipDialog({
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
			map.graphics.add(new Graphic(evt.graphic.geometry,highlightSymbol));

			dialog.setContent(content);

			domStyle.set(dialog.domNode, "opacity", 0.85);

			dijitPopup.open({
				popup: dialog, 
				x: evt.pageX,
				y: evt.pageY
			});
		});	 

		var selectionSymbol =  new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, 
				new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,new Color([0,0,0]), 2), 
				new Color([229,78,22,0.5]));

		featureLayer.setSelectionSymbol(selectionSymbol);
		
		map.on("click", executeQueryTask);
		map.on("dbl-click", executeQueryTask);

		map.on("load", function(){ 				
			map.disableMapNavigation();
			map.disableKeyboardNavigation();
			map.enablePan();
			map.disableRubberBandZoom();
			map.enableScrollWheelZoom();
			map.graphics.enableMouseEvents();
			map.graphics.on("mouse-out", closeDialog);
			map.on("mouse-drag-end", closeDialog);
			map.graphics.on("click", closeDialog);
			var query = new Query();
			
			if (levelname === "OA") {				   
				query.where = areacode +  "='" + area + "'";
			}
			if (levelname === "WD") {				   
				query.where = areacode +  "='" + wardCode + "'";
			}
			if (levelname === "LAD") {				   
				query.where = areacode +  "='" + laCode + "'";
			}
			if (levelname === "GOR") {				   
				query.where = areacode +  "='" + gorCode + "'";
			}
		    if (levelname === "CTRY") {				   
		    	query.where = areacode +  "='" + ctryCode + "'";
		    }
			
			query.returnGeometry = true;

			featureLayer.queryFeatures(query, function (featureSet){			    	
				polygon = featureSet.features[0].geometry;
				map.graphics.add(new Graphic(polygon, selSymbol));
				if (markerEnvelope === "0:0"  ){
				}
				else{
					var symbol = new PictureMarkerSymbol({
						"angle": 0,
						"xoffset": 0,
						"yoffset": 12,
						"type": "esriPMS",
						"url": "resources/images/map-marker-128.png",
						"contentType": "image/png",
						"width": 24,
						"height": 24
					});	        
					map.graphics.add(new Graphic(new Point(xCoord, yCoord, new SpatialReference({ wkid: 27700 })),symbol));
				}
				
			});			    
		}); 

		function clearHighlightArea(){
			map.graphics.clear(polygon, selSymbol);
			renderer = new UniqueValueRenderer(defaultSymbol, areacode);
			featureLayer.setRenderer(renderer);
			map.addLayer(featureLayer);
			if (markerEnvelope === "0:0" ){
			}
			else{
				var symbol = new PictureMarkerSymbol({
					"angle": 0,
					"xoffset": 0,
					"yoffset": 12,
					"type": "esriPMS",
					"url": "resources/images/map-marker-128.png",
					"contentType": "image/png",
					"width": 24,
					"height": 24
				});	        
				map.graphics.add(new Graphic(new Point(xCoord, yCoord, new SpatialReference({ wkid: 27700 })),symbol));
			}		
		} 

		featureLayer.on("mouse-out", function(evt) {
			//close the map dialog box after 1000 ms
			setTimeout(function () {  
				dijitPopup.close(dialog);
			}, 1000);	    	   
		});

		function closeDialog() {	    	   
			map.graphics.clear(highlightSymbol);
			map.setMapCursor("default"); 
			dijitPopup.close(dialog);

			if(!selected){	      
				map.graphics.add(new Graphic(polygon, selSymbol));	        	 
			}
			if (markerEnvelope === "0:0"  ){
			}
			else{
				var symbol = new PictureMarkerSymbol({
					"angle": 0,
					"xoffset": 0,
					"yoffset": 12,
					"type": "esriPMS",
					"url": "resources/images/map-marker-128.png",
					"contentType": "image/png",
					"width": 24,
					"height": 24
				});	        
				map.graphics.add(new Graphic(new Point(xCoord, yCoord, new SpatialReference({ wkid: 27700 })),symbol));
			}      
		}	       

		function showLoading() {    				
			domUtils.show(loading); 
		}

		function hideLoading() {
			domUtils.hide(loading);           
		}
		
		function  getTable() {		    		    
			 $('#selArea1').empty();
			 
			 if (levelname === "OA") { 			    		    
					OA_boxDetail();
					createTable(area, levelname);
					createReligion(area, levelname);
					createEconomy(area, levelname);
					createHousing(area, levelname);
					getData(area,laCode,laName,parliConCode,parliConName,wardCode,wardName,gorCode,gorName,ctryCode,ctryName,healthName,  levelname, area, 'popSexGeog');
					getData(area,laCode,laName,parliConCode,parliConName,wardCode,wardName,gorCode,gorName,ctryCode,ctryName,healthName,  levelname, area,'ageGeog');
					getData(area,laCode,laName,parliConCode,parliConName,wardCode,wardName,gorCode,gorName,ctryCode,ctryName,healthName,  levelname, area,'popTime');
					getData(area,laCode,laName,parliConCode,parliConName,wardCode,wardName,gorCode,gorName,ctryCode,ctryName,healthName,  levelname, area,'relGeog');
					getData(area,laCode,laName,parliConCode,parliConName,wardCode,wardName,gorCode,gorName,ctryCode,ctryName,healthName,  levelname, area,'relAgeGeog');
					getData(area,laCode,laName,parliConCode,parliConName,wardCode,wardName,gorCode,gorName,ctryCode,ctryName,healthName,  levelname, area,'relSexGeog');
					getData(area,laCode,laName,parliConCode,parliConName,wardCode,wardName,gorCode,gorName,ctryCode,ctryName,healthName,  levelname, area,'ecoActiv');
					getData(area,laCode,laName,parliConCode,parliConName,wardCode,wardName,gorCode,gorName,ctryCode,ctryName,healthName,  levelname, area,'ecoIndustry');
					getData(area,laCode,laName,parliConCode,parliConName,wardCode,wardName,gorCode,gorName,ctryCode,ctryName,healthName,  levelname, area,'ecoOccupation');
					getData(area,laCode,laName,parliConCode,parliConName,wardCode,wardName,gorCode,gorName,ctryCode,ctryName,healthName,  levelname, area,'housingHeating');
					getData(area,laCode,laName,parliConCode,parliConName,wardCode,wardName,gorCode,gorName,ctryCode,ctryName,healthName,  levelname, area,'housingBedroom');
					getData(area,laCode,laName,parliConCode,parliConName,wardCode,wardName,gorCode,gorName,ctryCode,ctryName,healthName,  levelname, area,'housingCar');
				}  									
			    
			    if (levelname ==="WD"){	 
					WD_boxDetail();
					createTable(wardCode, levelname);
					createReligion(wardCode, levelname);
					createEconomy(wardCode, levelname);	
					createHousing(wardCode, levelname);	
					getData(laCode,laCode,laName,parliConCode,parliConName,wardCode,wardName,gorCode,gorName,ctryCode,ctryName,healthName,  levelname, wardName, 'popSexGeog');
					getData(laCode,laCode,laName,parliConCode,parliConName,wardCode,wardName,gorCode,gorName,ctryCode,ctryName,healthName,  levelname, wardName,'ageGeog');
					getData(laCode,laCode,laName,parliConCode,parliConName,wardCode,wardName,gorCode,gorName,ctryCode,ctryName,healthName,  levelname, wardName,'popTime');
					getData(laCode,laCode,laName,parliConCode,parliConName,wardCode,wardName,gorCode,gorName,ctryCode,ctryName,healthName,  levelname, wardName,'relGeog');
					getData(laCode,laCode,laName,parliConCode,parliConName,wardCode,wardName,gorCode,gorName,ctryCode,ctryName,healthName,  levelname, wardName,'relAgeGeog');
					getData(laCode,laCode,laName,parliConCode,parliConName,wardCode,wardName,gorCode,gorName,ctryCode,ctryName,healthName,  levelname, wardName,'relSexGeog');
					getData(laCode,laCode,laName,parliConCode,parliConName,wardCode,wardName,gorCode,gorName,ctryCode,ctryName,healthName,  levelname, wardName,'ecoActiv');
					getData(laCode,laCode,laName,parliConCode,parliConName,wardCode,wardName,gorCode,gorName,ctryCode,ctryName,healthName,  levelname, wardName,'ecoIndustry');
					getData(laCode,laCode,laName,parliConCode,parliConName,wardCode,wardName,gorCode,gorName,ctryCode,ctryName,healthName,  levelname, wardName,'ecoOccupation');
					getData(laCode,laCode,laName,parliConCode,parliConName,wardCode,wardName,gorCode,gorName,ctryCode,ctryName,healthName,  levelname, wardName,'housingHeating');
					getData(laCode,laCode,laName,parliConCode,parliConName,wardCode,wardName,gorCode,gorName,ctryCode,ctryName,healthName,  levelname, wardName,'housingBedroom');
					getData(laCode,laCode,laName,parliConCode,parliConName,wardCode,wardName,gorCode,gorName,ctryCode,ctryName,healthName,  levelname, wardName,'housingCar');
				} 					
			   
			    if (levelname ==="LAD"){			    		    
					LA_boxDetail();
					createTable(laCode, levelname);
					createReligion(laCode, levelname);
					createEconomy(laCode, levelname);
					createHousing(laCode, levelname);
					getData(laCode,laCode,laName,parliConCode,parliConName,wardCode,wardName,gorCode,gorName,ctryCode,ctryName,healthName,  levelname, laName, 'popSexGeog');
					getData(laCode,laCode,laName,parliConCode,parliConName,wardCode,wardName,gorCode,gorName,ctryCode,ctryName,healthName,  levelname, laName,'ageGeog');
					getData(laCode,laCode,laName,parliConCode,parliConName,wardCode,wardName,gorCode,gorName,ctryCode,ctryName,healthName,  levelname, laName,'popTime');
					getData(laCode,laCode,laName,parliConCode,parliConName,wardCode,wardName,gorCode,gorName,ctryCode,ctryName,healthName,  levelname, laName,'relGeog');
					getData(laCode,laCode,laName,parliConCode,parliConName,wardCode,wardName,gorCode,gorName,ctryCode,ctryName,healthName,  levelname, laName,'relAgeGeog');
					getData(laCode,laCode,laName,parliConCode,parliConName,wardCode,wardName,gorCode,gorName,ctryCode,ctryName,healthName,  levelname, laName,'relSexGeog');
					getData(laCode,laCode,laName,parliConCode,parliConName,wardCode,wardName,gorCode,gorName,ctryCode,ctryName,healthName,  levelname, laName,'ecoActiv'); 
					getData(laCode,laCode,laName,parliConCode,parliConName,wardCode,wardName,gorCode,gorName,ctryCode,ctryName,healthName,  levelname, laName,'ecoIndustry'); 
					getData(laCode,laCode,laName,parliConCode,parliConName,wardCode,wardName,gorCode,gorName,ctryCode,ctryName,healthName,  levelname, laName,'ecoOccupation');
					getData(laCode,laCode,laName,parliConCode,parliConName,wardCode,wardName,gorCode,gorName,ctryCode,ctryName,healthName,  levelname, laName,'housingHeating');
					getData(laCode,laCode,laName,parliConCode,parliConName,wardCode,wardName,gorCode,gorName,ctryCode,ctryName,healthName,  levelname, laName,'housingBedroom');
					getData(laCode,laCode,laName,parliConCode,parliConName,wardCode,wardName,gorCode,gorName,ctryCode,ctryName,healthName,  levelname, laName,'housingCar');
				}				
								
			    if (levelname ==="GOR"){
					GOR_boxDetail();
					createTable(gorCode, levelname);
					createReligion(gorCode, levelname);
					createEconomy(gorCode, levelname);
					createHousing(gorCode, levelname);
					getData(gorCode,laCode,laName,parliConCode,parliConName,wardCode,wardName,gorCode,gorName,ctryCode,ctryName,healthName,  levelname, gorName, 'popSexGeog');
					getData(gorCode,laCode,laName,parliConCode,parliConName,wardCode,wardName,gorCode,gorName,ctryCode,ctryName,healthName,  levelname, gorName,'ageGeog');
					getData(gorCode,laCode,laName,parliConCode,parliConName,wardCode,wardName,gorCode,gorName,ctryCode,ctryName,healthName,  levelname, gorName,'popTime');
					getData(gorCode,laCode,laName,parliConCode,parliConName,wardCode,wardName,gorCode,gorName,ctryCode,ctryName,healthName,  levelname, gorName,'relGeog');
					getData(gorCode,laCode,laName,parliConCode,parliConName,wardCode,wardName,gorCode,gorName,ctryCode,ctryName,healthName,  levelname, gorName,'relAgeGeog');
					getData(gorCode,laCode,laName,parliConCode,parliConName,wardCode,wardName,gorCode,gorName,ctryCode,ctryName,healthName,  levelname, gorName,'relSexGeog');
					getData(gorCode,laCode,laName,parliConCode,parliConName,wardCode,wardName,gorCode,gorName,ctryCode,ctryName,healthName,  levelname, gorName,'ecoActiv');
					getData(gorCode,laCode,laName,parliConCode,parliConName,wardCode,wardName,gorCode,gorName,ctryCode,ctryName,healthName,  levelname, gorName,'ecoIndustry');
					getData(gorCode,laCode,laName,parliConCode,parliConName,wardCode,wardName,gorCode,gorName,ctryCode,ctryName,healthName,  levelname, gorName,'ecoOccupation');
					getData(gorCode,laCode,laName,parliConCode,parliConName,wardCode,wardName,gorCode,gorName,ctryCode,ctryName,healthName,  levelname, gorName,'housingHeating');
					getData(gorCode,laCode,laName,parliConCode,parliConName,wardCode,wardName,gorCode,gorName,ctryCode,ctryName,healthName,  levelname, gorName,'housingBedroom');
					getData(gorCode,laCode,laName,parliConCode,parliConName,wardCode,wardName,gorCode,gorName,ctryCode,ctryName,healthName,  levelname, gorName,'housingCar');
				} 
			    
			    if (levelname ==="CTRY"){			    		    
					CTRY_boxDetail();
					createTable(ctryCode, levelname);
					createReligion(ctryCode, levelname);
					createEconomy(ctryCode, levelname);
					createHousing(ctryCode, levelname);
					getData(ctryCode,laCode,laName,parliConCode,parliConName,wardCode,wardName,gorCode,gorName,ctryCode,ctryName,healthName,  levelname, ctryName, 'popSexGeog');
					getData(ctryCode,laCode,laName,parliConCode,parliConName,wardCode,wardName,gorCode,gorName,ctryCode,ctryName,healthName,  levelname, ctryName,'ageGeog');
					getData(ctryCode,laCode,laName,parliConCode,parliConName,wardCode,wardName,gorCode,gorName,ctryCode,ctryName,healthName,  levelname, ctryName,'popTime');
					getData(ctryCode,laCode,laName,parliConCode,parliConName,wardCode,wardName,gorCode,gorName,ctryCode,ctryName,healthName,  levelname, ctryName,'relGeog');
					getData(ctryCode,laCode,laName,parliConCode,parliConName,wardCode,wardName,gorCode,gorName,ctryCode,ctryName,healthName,  levelname, ctryName,'relAgeGeog');
					getData(ctryCode,laCode,laName,parliConCode,parliConName,wardCode,wardName,gorCode,gorName,ctryCode,ctryName,healthName,  levelname, ctryName,'relSexGeog');
					getData(ctryCode,laCode,laName,parliConCode,parliConName,wardCode,wardName,gorCode,gorName,ctryCode,ctryName,healthName,  levelname, ctryName,'ecoActiv');
					getData(ctryCode,laCode,laName,parliConCode,parliConName,wardCode,wardName,gorCode,gorName,ctryCode,ctryName,healthName,  levelname, ctryName,'ecoIndustry');
					getData(ctryCode,laCode,laName,parliConCode,parliConName,wardCode,wardName,gorCode,gorName,ctryCode,ctryName,healthName,  levelname, ctryName,'ecoOccupation');	
					getData(ctryCode,laCode,laName,parliConCode,parliConName,wardCode,wardName,gorCode,gorName,ctryCode,ctryName,healthName,  levelname, ctryName,'housingHeating');
					getData(ctryCode,laCode,laName,parliConCode,parliConName,wardCode,wardName,gorCode,gorName,ctryCode,ctryName,healthName,  levelname, ctryName,'housingBedroom');
					getData(ctryCode,laCode,laName,parliConCode,parliConName,wardCode,wardName,gorCode,gorName,ctryCode,ctryName,healthName,  levelname, ctryName,'housingCar');
				}	
		   }   

		// set orange info box OA details for postcode
		function  OA_postcode_boxDetail() {	
			var urlParams  = '&amp;cn='+ctryName+'&amp;cc='+ctryCode+'&amp;pn='+parliConName+'&amp;pc='+parliConCode+'&amp;hn='+healthName+'&amp;hc='+ healthCode + '&amp;markerenvelope=' + markerEnvelope + '&amp;pcSearch=false';
			var urlParams1 = '&amp;areaname='+ctryName+'&amp;areacode='+ctryCode+'&amp;pn='+parliConName+'&amp;pc='+parliConCode+'&amp;hn='+healthName+'&amp;hc='+ healthCode + '&amp;markerenvelope=' + markerEnvelope + '&amp;pcSearch=false';
			var regionText;
			
			if (ctryName === 'England') {
				regionText = '<div style="font-size: small;"> - Region (<a style="color: light blue;" href="index.html?nav-search=' + postcode + '&amp;levelname=GOR&amp;areaname=' + gorName + '&amp;areacode=' + gorCode + urlParams + '">' + gorName + '</a>)';	    		 
			}
			else{
				regionText = '<span style="display:none;"></span>';
			}    	     

			// set orange info box details	
			$('#selArea1').append('<div id="innerDIV"> <article class="box box--orange box--orange--separated-left">' +
					'<div style="background-color:white;width: -moz-max-content;width: -webkit-max-content;" class="box__inner border box--padded has-icon">'+			                   
					'<div style="min-width:211px;color: rgb(243,113,33); font-size:large"><strong>' +postcode+'</strong></div>' +
					'<div style="color: black; font-size:medium;">(Output area ' + area + ')<br><br><strong>Part of:</strong></div>' +
					'<div style="margin-top:5px;font-size: small;"> - Ward (<a style="color: light blue;" + href="index.html?nav-search=' + postcode + '&amp;levelname=WD&amp;areaname=' + encodeName(wardName) + '&amp;areacode=' + wardCode + '&amp;ln=' + encodeName(laName) + '&amp;lc=' + laCode +
					'&amp;gn=' + gorName + '&amp;gc=' + gorCode + urlParams + '">'+ wardName + '</a>)' +
					'<br> - Local Authority (<a style="color: light blue;" href="index.html?nav-search=' + postcode + '&amp;levelname=LAD&amp;areaname=' + encodeName(laName) + '&amp;areacode=' + laCode + '&amp;gn=' + gorName + '&amp;gc=' + gorCode + urlParams + '">'+ laName + '</a>)' + 
					regionText + 
					'<br> - Country (<a style="color: light blue;" href="index.html?nav-search='+ postcode + '&amp;levelname=CTRY' + urlParams1 + '">'+  ctryName + '</a>)</div>' + 
					'</div>' +
			'</article></div>');		     		 
		}	       

		// set orange info box OA details for an OA area
		function  OA_boxDetail() {							
			var urlParams  = '&amp;cn='+ctryName+'&amp;cc='+ctryCode+'&amp;pn='+parliConName+'&amp;pc='+parliConCode+'&amp;hn='+healthName+'&amp;hc='+ healthCode + '&amp;markerenvelope=' + markerEnvelope + '&amp;pcSearch=false';
			var urlParams1 = '&amp;areaname='+ctryName+'&amp;areacode='+ctryCode+'&amp;pn='+parliConName+'&amp;pc='+parliConCode+'&amp;hn='+healthName+'&amp;hc='+ healthCode + '&amp;markerenvelope=' + markerEnvelope + '&amp;pcSearch=false';
			var regionText;
			
			if (ctryName === 'England') {
				regionText = '<div style="font-size: small;"> - Region (<a style="color: light blue;" href="index.html?nav-search=' + encodeName(postcode) + '&amp;levelname=GOR&amp;areaname=' + gorName + '&amp;areacode=' + gorCode + urlParams + '">' + gorName + '</a>)';	    		
			}
			else{
				regionText = '<span style="display:none;"></span>';
			}  	 

			// set orange info box details	
			$('#selArea1').append('<div id="innerDIV"> <article class="box box--orange box--orange--separated-left">' +
					'<div style="background-color:white;width: -moz-max-content;width: -webkit-max-content;" class="box__inner border box--padded has-icon">'+			                   
					'<div style="min-width:211px;color: rgb(243,113,33); font-size:large"><strong>' +area+'</strong></div>' +
					'<div style="color: black; font-size:medium;">(Output area ' + area + ')<br><br><strong>Part of:</strong></div>' +
					'<div style="margin-top:5px;font-size: small;"> - Ward (<a style="color: light blue;" href="index.html?nav-search=' + encodeName(postcode) + '&amp;levelname=WD&amp;areaname=' + encodeName(wardName) + '&amp;areacode=' + wardCode + '&amp;ln=' + encodeName(laName) + '&amp;lc=' + laCode +
					'&amp;gn=' + gorName + '&amp;gc=' + gorCode + urlParams + '">'+ wardName + '</a>)' +
					'<br> - Local Authority (<a style="color: light blue;" href="index.html?nav-search='+ encodeName(postcode) + '&amp;levelname=LAD&amp;areaname=' + encodeName(laName) + '&amp;areacode=' + laCode + '&amp;gn=' + gorName + '&amp;gc=' + gorCode + urlParams + '">'+ laName + '</a>)' +  
					regionText + 
					'<br> - Country (<a style="color: light blue;" href="index.html?nav-search='+ encodeName(postcode) + '&amp;levelname=CTRY' + urlParams1 + '">' +  ctryName + '</a>)</div>' + 
					'</div>' +
			'</article></div>');
		}

		function  WD_boxDetail() {			
			var urlParams  = '&amp;cn='+ctryName+'&amp;cc='+ctryCode+'&amp;pn='+parliConName+'&amp;pc='+parliConCode+'&amp;hn='+healthName+'&amp;hc='+ healthCode + '&amp;markerenvelope=' + markerEnvelope + '&amp;pcSearch=false';
			var urlParams1 = '&amp;areaname='+ctryName+'&amp;areacode='+ctryCode+'&amp;pn='+parliConName+'&amp;pc='+parliConCode+'&amp;hn='+healthName+'&amp;hc='+ healthCode + '&amp;markerenvelope=' + markerEnvelope + '&amp;pcSearch=false';
			var regionText, regionDrillText;
			
			if (ctryName === 'England') {
				regionText = '<div style="font-size: small;"> - Region (<a style="color: light blue;" href="index.html?nav-search=' + encodeName(postcode) + '&amp;levelname=GOR&amp;areaname=' + gorName + '&amp;areacode=' + gorCode + urlParams + '">' + gorName + '</a>)';	    		 
				regionDrillText  = '- <a style="color: light blue;" href="index.html?nav-search=' + encodeName(postcode) + '&amp;levelname=WD&amp;childname=OA&amp;areacode=' + wardCode + '&amp;areaname=' + encodeName(wardName) + '&amp;ln=' + encodeName(laName) + '&amp;lc=' +
				laCode + '&amp;gn=' + gorName + '&amp;gc=' + gorCode + urlParams + '"> Output area </a></div>';
			}
			else{
				regionText = '<span style="display:none;"></span>';
				regionDrillText  = '- <a style="color: light blue;" href="index.html?nav-search=' + encodeName(postcode) + '&amp;levelname=WD&amp;childname=OA&amp;areacode=' + wardCode + '&amp;areaname=' + encodeName(wardName) + '&amp;ln=' + encodeName(laName) + '&amp;lc=' + laCode +
				 urlParams + '"> Output area </a></div>';
			} 	    	
			// set orange info box details    		
			$('#selArea1').append('<div id="innerDIV"> <article class="box box--orange box--orange--separated-left">' +
					'<div style="background-color:white;width: -moz-max-content;width: -webkit-max-content;min-width: 211px" class="box__inner border box--padded has-icon">'+			                   
					'<div style="min-width:211px;color: rgb(243,113,33); font-size:large"><strong>' +area+'</strong></div>' +
					'<div style="color: black; font-size:medium;">(Ward)<br><br><strong>Part of:</strong></div>' +
					'<div style="margin-top:5px;font-size: small;"> - Local Authority (<a style="color: light blue;" href="index.html?nav-search='+ encodeName(postcode) + '&amp;levelname=LAD&amp;areaname=' + encodeName(laName) + '&amp;areacode=' + laCode + '&amp;gn=' + gorName + '&amp;gc=' + gorCode + urlParams + '">'+ laName + '</a>)' +  
					regionText + 
					'<br> - Country (<a style="color: light blue;" href="index.html?nav-search='+ encodeName(postcode) + '&amp;levelname=CTRY' + urlParams1 + '">'+  ctryName + '</a>)</div>' + 
					'<div style="color: black; font-size:medium;padding-top:10px;"><strong>Drill down to :</strong></div>' +
					'<div style="font-size: small;">' + 
					regionDrillText +
					'</div>' +
			'</article></div>');			   
		}

		function  LA_boxDetail() {	
			var urlParams  = '&amp;cn='+ctryName+'&amp;cc='+ctryCode+'&amp;pn='+parliConName+'&amp;pc='+parliConCode+'&amp;hn='+healthName+'&amp;hc='+ healthCode + '&amp;markerenvelope=' + markerEnvelope + '&amp;pcSearch=false';
			var urlParams1 = '&amp;areaname='+ctryName+'&amp;areacode='+ctryCode+'&amp;pn='+parliConName+'&amp;pc='+parliConCode+'&amp;hn='+healthName+'&amp;hc='+ healthCode + '&amp;markerenvelope=' + markerEnvelope + '&amp;pcSearch=false';
			var regionText, regionDrillText;
			
			if (ctryName === 'England') {	    		
				regionText = '<div style="font-size: small;"> - Region (<a style="color: light blue;" href="index.html?nav-search=' + postcode + '&amp;levelname=GOR&amp;areaname=' + gorName + '&amp;areacode=' + gorCode + urlParams + '">' + gorName + '</a>)';
				regionDrillText  = '- <a style="color: light blue;" href="index.html?nav-search=' + postcode + '&amp;levelname=LAD&amp;childname=WD&amp;areacode=' + laCode + '&amp;areaname=' + encodeName(laName) + '&amp;gn=' + gorName + '&amp;gc=' + gorCode + urlParams + '"> Ward </a></div>' ;
			}
			else{
				regionText = '<span style="display:none;"></span>';
				regionDrillText  = '- <a style="color: light blue;" href="index.html?nav-search=' + postcode + '&amp;levelname=LAD&amp;childname=WD&amp;areacode=' + laCode + '&amp;areaname=' + encodeName(laName) + urlParams + '"> Ward </a></div>' ;
			} 
			// set orange info box details    		
			$('#selArea1').append('<div id="innerDIV"> <article class="box box--orange box--orange--separated-left">' +
					'<div style="background-color:white;width: -moz-max-content;width: -webkit-max-content;min-width: 211px;" class="box__inner border box--padded has-icon">'+			                   
					'<div style="min-width:211px;color: rgb(243,113,33); font-size:large"><strong>' +area+'</strong></div>' +
					'<div style="color: black; font-size:medium;">(Local Authority)<br><br><strong>Part of:</strong></div>' +
					regionText + 
					'<br><div style="font-size: small;"> - Country (<a style="color: light blue;" href="index.html?nav-search='+ postcode + '&amp;levelname=CTRY' + urlParams1 + '">'+  ctryName + '</a>)</div>' + 
					'<div style="color: black; font-size:medium;padding-top:10px;"><strong>Drill down to :</strong></div>' +
					'<div style="font-size: small;">' + 
					regionDrillText +
					'</div>' +
			'</article></div>');	
		}

		function  GOR_boxDetail() {	
			var urlParams  = '&amp;cn='+ctryName+'&amp;cc='+ctryCode+'&amp;pn='+parliConName+'&amp;pc='+parliConCode+'&amp;hn='+healthName+'&amp;hc='+ healthCode + '&amp;markerenvelope=' + markerEnvelope + '&amp;pcSearch=false';
			var urlParams1 = '&amp;areaname='+ctryName+'&amp;areacode='+ctryCode+'&amp;pn='+parliConName+'&amp;pc='+parliConCode+'&amp;hn='+healthName+'&amp;hc='+ healthCode + '&amp;markerenvelope=' + markerEnvelope + '&amp;pcSearch=false';
			var regionDrillText;
			
			if (ctryName === 'England') {	    		    		 
				regionDrillText  = '- <a style="color: light blue;" href="index.html?nav-search=' + postcode + '&amp;levelname=GOR&amp;childname=LAD&amp;areaname=' + gorName + '&amp;areacode=' + gorCode + urlParams + '"> Local Authority </a></div>';
			}
			else{		        
				regionDrillText = '<span style="display:none;"></span>';				   
			} 
			// set orange info box details    		
			$('#selArea1').append('<div id="innerDIV"> <article class="box box--orange box--orange--separated-left">' +
					'<div style="background-color:white;width: -moz-max-content;width: -webkit-max-content;" class="box__inner border box--padded has-icon">'+			                   
					'<div style="min-width:211px;color: rgb(243,113,33); font-size:large"><strong>' +area+'</strong></div>' +
					'<div style="color: black; font-size:medium;">(Region)<br><br><strong>Part of:</strong></div>' +
					'<div style="font-size: small;"> - Country (<a style="color: light blue;" href="index.html?nav-search='+ postcode + '&amp;levelname=CTRY' + urlParams1 + '">'+  ctryName + '</a>)</div>' + 
					'<div style="color: black; font-size:medium;padding-top:10px;"><strong>Drill down to :</strong></div>' +
					'<div style="font-size: small;">' + 
					regionDrillText +
					'</div>' +
			'</article></div>');
		}
		function  CTRY_boxDetail() {
			var urlParams  = '&amp;cn='+ctryName+'&amp;cc='+ctryCode+'&amp;pn='+parliConName+'&amp;pc='+parliConCode+'&amp;hn='+healthName+'&amp;hc='+ healthCode + '&amp;markerenvelope=' + markerEnvelope + '&amp;pcSearch=false';
			var urlParams1 = '&amp;areaname='+ctryName+'&amp;areacode='+ctryCode+'&amp;pn='+parliConName+'&amp;pc='+parliConCode+'&amp;hn='+healthName+'&amp;hc='+ healthCode + '&amp;markerenvelope=' + markerEnvelope + '&amp;pcSearch=false';
			var regionText, regionDrillText;
			
			if (ctryName === 'England') {	    		 
				regionText = '<div style="font-size: small;"> - Region (<a style="color: light blue;" href="index.html?nav-search=' + postcode + '&amp;levelname=GOR&amp;areaname=' + gorName + '&amp;areacode=' + gorCode + urlParams + '">' + gorName + '</a>)';
				regionDrillText  = '- <a style="color: light blue;" href="index.html?nav-search=' + postcode + '&amp;levelname=CTRY&amp;childname=GOR' + urlParams1 + '"> Region </a></div>';
			}
			else{
				regionText = '<span style="display:none;"></span>';
				regionDrillText = '- <a style="color: light blue;" href="index.html?nav-search=' + postcode + '&amp;levelname=CTRY&amp;childname=LAD' + urlParams1 + '"> Local Authority </a></div>';					   
			}
			// set orange info box details	
			$('#selArea1').append('<div id="innerDIV"> <article class="box box--orange box--orange--separated-left">' +
					'<div style="background-color:white" class="box__inner border box--padded has-icon">'+			                   
					'<div style="color: rgb(243,113,33); font-size:large"><strong>' +area+'</strong></div>' +
					'<div style="color: black; font-size:medium;">(Country)<br><br></strong></div>' +  
					'<div style="color: black; font-size:medium;padding-top:10px;"><strong>Drill down to :</strong></div>' +
					'<div style="font-size: small;">' + 
					regionDrillText +
					'</div>' +
			'</article></div>');	
		} 

		// check to see if postcode search
		if (typeof $.getUrlVar('pcSearch') === 'undefined' && 	/\d/.test(area)) {
			OA_postcode_boxDetail(); 
		}
		else{
			if (levelname ==="OA"){														  					   
				OA_boxDetail();
			} 	
			if (levelname ==="WD"){														  					   
				WD_boxDetail();
			} 														   
			if (levelname ==="LAD"){
				LA_boxDetail();									                	  			   
			}
			if (levelname ==="GOR"){
				GOR_boxDetail();									                	  							   
			} 														   
			if (levelname ==="CTRY"){
				CTRY_boxDetail();									                	  
			} 									
		}

		function executeQueryTask(evt){
			selected = true;
			var selectionQuery = new Query();	          
			var tol = map.extent.getWidth()/map.width * 5;
			var x = evt.mapPoint.x;	          
			var y = evt.mapPoint.y;	
			
			var queryExtent = new Extent(x-tol,y-tol,x+tol,y+tol,evt.mapPoint.spatialReference);
			selectionQuery.geometry = queryExtent;														  
			featureLayer.selectFeatures(selectionQuery, FeatureLayer.SELECTION_NEW, function(features){																  
			  var resultFeatures = features;	
			  // Cater for user clicking in Wales on GOR layer 				
	          if (resultFeatures && resultFeatures.length > 0) {	        	  
	            // extcode 
	        	
		        clearHighlightArea();  
		        
				for(var i=0, il=resultFeatures.length; i<il; i++){
					
			    	if (levelname === "OA") {     
						area = resultFeatures[i].attributes[areacode];
						extcode = resultFeatures[i].attributes[areacode];
					}
					else {
						area = resultFeatures[i].attributes[areaname];
						extcode = resultFeatures[i].attributes[areacode];
					}	 	          
				}
	
				//var parliConUrl = "https://mapping.statistics.gov.uk/arcgis/rest/services/PCON/PCON_DEC_2011_GB_BGC/FeatureServer/0/query?where=&geometry=" +
				//x + "," + y + "&geometryType=esriGeometryPoint&inSR=27700&outFields=*&returnGeometry=false&outSR=27700&f=pjson" ;
				
				//var healthUrl   = "https://mapping.statistics.gov.uk/arcgis/rest/services/CCG/CCG_JUL_2015_EN_BGC_V2/FeatureServer/0/query?where=&geometry=" +
				//x + "," + y + "&geometryType=esriGeometryPoint&inSR=27700&outFields=*&returnGeometry=false&outSR=27700&f=pjson" ; 	
										
				var parentUrl = "http://onsdatav3-glassfishtest.rhcloud.com/data-web/rs/nessdata/getparent/" + extcode;
				
		    	$(document).ready(function(){		
		    	   $.getJSON(parentUrl, function(res2){
		    	    	
		    	   	 if (res2.parent && res2.parent.length === 0) {
		    		    // do stuff when no features were found
		    			$('#redbox').toggle(); 
		    		   	$('#bluebox').toggle();
		    	  		$('#titlebox').toggle();
		    	   		$('#nav-search').attr('placeholder',"Search postcode or place name in England and Wales"); 
		    	   		$('#map').toggle();
		    	      }
		    		  else
		    		  {		    			 
		    			 if(levelname === "CTRY") 
		    			 {
		    				 ctryCode         = extcode;	    				 
							 ctryName         = area;						
		    			 } 	
		    			 else {	    				
		    				 ctryCode         = res2.parent.country.extcode;
							 ctryName         = res2.parent.country.name;
		    			 }	    			 
		    			 
						 if (ctryName === 'Wales') {
							 
							 //healthUrl   = "https://mapping.statistics.gov.uk/arcgis/rest/services/LHB/LHB_DEC_2014_WA_BGC/FeatureServer/0/query?where=&geometry=" +
						    // x + "," + y + "&geometryType=esriGeometryPoint&inSR=27700&outFields=*&returnGeometry=false&outSR=27700&f=pjson";	
													
							 if (area == null){
									area = ctryCode;
							 }  
							 
							 if(levelname === "LAD") 
			    			 {							
								 laCode           = extcode;
								 laName           = area;							 		 
			    			 } 
							 
							 if(levelname === "WD") 
			    			 {
								 gorCode          = res2.parent.region.extcode;
								 gorName          = res2.parent.region.name;
								 laCode           = res2.parent.la.extcode;
				    			 laName           = res2.parent.la.name;
				    			 laCode           = res2.parent.la.extcode;
				    			 laName           = res2.parent.la.name;
				    			 wardCode         = extcode;
				    			 wardName         = area;
				    			
			    			 } 
							 
							 if(levelname === "OA") 
			    			 {
								 gorCode          = res2.parent.region.extcode;
								 gorName          = res2.parent.region.name;
								 laCode           = res2.parent.la.extcode;
				    			 laName           = res2.parent.la.name; 
				    			 wardCode         = res2.parent.ward.extcode;
				    			 wardName         = res2.parent.ward.name;				    			
			    			 } 
							 
							 if (laCode == null){
									laCode = ctryCode;
							 } 
							 
							 if (wardCode == null){
									wardCode = ctryCode;
							 }	
							 
							 parliConCode     = res2.parent.pcon.extcode;
							 parliConName     = res2.parent.pcon.name; 
									  
						 // $(document).ready(function(){
							//$.getJSON(healthUrl, function(result) {
							//	healthName = result.features[0].attributes.LHB14NM;
							//	healthCode = result.features[0].attributes.LHB14CD;
								getTable(area);
							//});
					  	 // });
							
						 }	
						 else { //ctryname = England
							 
							 if(levelname === "GOR") 
			    			 {
								 gorCode          = extcode;
								 gorName          = area;
			    			 } 
							 
							 if(levelname === "LAD") 
			    			 {
								 gorCode          = res2.parent.region.extcode;
								 gorName          = res2.parent.region.name;
								 laCode           = extcode;
								 laName           = area;
			    			 } 
							 
							 if(levelname === "WD") 
			    			 {
								 gorCode          = res2.parent.region.extcode;
								 gorName          = res2.parent.region.name;
								 laCode           = res2.parent.la.extcode;
				    			 laName           = res2.parent.la.name;
								 wardCode         = extcode;
				    			 wardName         = area;
			    			 } 
							 
							 if(levelname === "OA") 
			    			 {
								 gorCode          = res2.parent.region.extcode;
								 gorName          = res2.parent.region.name;
								 laCode           = res2.parent.la.extcode;
				    			 laName           = res2.parent.la.name; 
				    			 wardCode         = res2.parent.ward.extcode;
				    			 wardName         = res2.parent.ward.name;							 
			    			 } 
							 
							 parliConCode         = res2.parent.pcon.extcode;
							 parliConName         = res2.parent.pcon.name; 
															  
						//  $(document).ready(function(){
						//	$.getJSON(healthUrl, function(result) {
							//	healthName = result.features[0].attributes.CCG15NM;
							//	healthCode = result.features[0].attributes.CCG15CD;									
								getTable(area);
						//	});
					  	 // });
						 }	
						 
						 
		    		  } // else empty parent info 
		    	  }); // document ready														
				}); // json parent url
			} // resultFeatures && resultFeatures.length > 0
	        else {
	        	selected = false;
	        }  
		  }); //  featureLayer.selectFeatures	      
		}  //  executeQueryTask 	
	});			
} //highlightMap(details, postcode)