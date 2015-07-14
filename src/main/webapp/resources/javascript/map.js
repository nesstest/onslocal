function createMap(result, validpostCode, levelname){
	var regionText;	
		
	if (typeof levelname === 'undefined') {
		if (typeof validpostCode === 'undefined') {
		  // display UK map
		 details = result.areas[0].envelope;		 
	    }
		else {
			 // if welsh postcode - no GOR
			 if (validpostCode === "NP18 1AF"){
			     regionText = '<span style="display:none;"></span>';			  			 
			 }
			 else{				 
			    regionText = '<br> - Region (<a style="color: light blue"; href="index.html?nav-search=' + validpostCode + '&amp;levelname=GOR">'+ result.areas[0].GOR[0].area + '</a>)' ;	
			 }
			
			// display OA map
			details = 	result.areas[0].OA[0].envelope +":"+ 
						result.areas[0].OA[0].area+":"+ 
					 	result.areas[0].OA[0].areacode+":"+ 
						result.areas[0].OA[0].arealayername+":"+
			            result.areas[0].OA[0].markerenvelope+":"+
			            result.areas[0].OA[0].levelname;
			
			// set orange info box details	
			$('#selArea1').append('<div id="innerDIV"> <article class="box box--orange box--orange--separated-left">' +
								  '<div style="background-color:white" class="box__inner border box--padded has-icon">'+			                   
			                      '<div style="color: rgb(243,113,33); font-size: x-large"><strong>' +postcode+'</strong></div>' +
			                      '<div style="color: black; font-size:medium;">(Output area ' + result.areas[0].OA[0].area + ')<br><br><strong>Part of:</strong></div>' +
			                      '<div style="font-size: small;"> - Ward (<a style="color: light blue"; href="index.html?nav-search=' + validpostCode + '&amp;levelname=WD">'+ result.areas[0].WD[0].area + ' </a>)' +
		  		             	  '<br> - Local Authority (<a style="color: light blue"; href="index.html?nav-search='+ validpostCode + '&amp;levelname=LAD">'+ result.areas[0].LAD[0].area + '</a>)' + 
			                       regionText +
			                      '<br> - Country (<a style="color: light blue"; href="index.html?nav-search='+ validpostCode + '&amp;levelname=CTRY">'+ result.areas[0].CTRY[0].area + '</a>)</div>' + 
			                      '</div>' +
			                      '</article></div>');	
		}
	}	
	else {
		  // if welsh postcode - no GOR
		  if (validpostCode === "NP18 1AF"){
			  regionText = '<span style="display:none;"></span>';			  			 
		  }
		  else{
			  regionText = '<div style="font-size: small;"> - Region (<a style="color: light blue"; href="index.html?nav-search='+ validpostCode + '&amp;levelname=GOR">'+ result.areas[0].GOR[0].area + '</a>)' ;		
		  }
		  
		  // display map for level name
		  if (levelname ==="WD"){
			  details = 	result.areas[0].WD[0].envelope +":"+ 
			            	result.areas[0].WD[0].area+":"+ 
						    result.areas[0].WD[0].areaname+":"+ 
							result.areas[0].WD[0].arealayername+":"+
				            result.areas[0].WD[0].markerenvelope+":"+
			                result.areas[0].WD[0].levelname;
			  // set orange info box details	
			  $('#selArea1').append('<div id="innerDIV"> <article class="box box--orange box--orange--separated-left">' +
					  '<div style="background-color:white" class="box__inner border box--padded has-icon">'+			                   
                      '<div style="color: rgb(243,113,33); font-size: x-large"><strong>' +result.areas[0].WD[0].area+'</strong></div>' +
                      '<div style="color: black; font-size:medium;">(Ward)<br><br><strong>Part of:</strong></div>' +
                      '<div style="font-size: small;"> - Local Authority (<a style="color: light blue"; href="index.html?nav-search=' + validpostCode + '&amp;levelname=LAD">'+ result.areas[0].LAD[0].area + ' </a>)' +
		              regionText +  
                      '<br> - Country (<a style="color: light blue"; href="index.html?nav-search='+ validpostCode + '&amp;levelname=CTRY">'+ result.areas[0].CTRY[0].area + '</a>)</div>' + 
                      '</div>' +
                      '</article></div>');	
		  }
		  
	
		  // display map for level name
		  if (levelname ==="LAD"){			 
			  details = 	result.areas[0].LAD[0].envelope +":"+ 
			            	result.areas[0].LAD[0].area+":"+ 
						    result.areas[0].LAD[0].areaname+":"+ 
							result.areas[0].LAD[0].arealayername+":"+
				            result.areas[0].LAD[0].markerenvelope+":"+
			                result.areas[0].LAD[0].levelname;
			  
		      // set orange info box details	
			  $('#selArea1').append('<div id="innerDIV"> <article class="box box--orange box--orange--separated-left">' +
					  '<div style="background-color:white" class="box__inner border box--padded has-icon">'+			                   
                      '<div style="color: rgb(243,113,33); font-size: x-large"><strong>' +result.areas[0].LAD[0].area+'</strong></div>' +
                      '<div style="color: black; font-size:medium;">(Local Authority)<br><br><strong>Part of:</strong></div>' +
                      regionText + 
                      '<br><div style="font-size: small;"> - Country (<a style="color: light blue"; href="index.html?nav-search='+ validpostCode + '&amp;levelname=CTRY">'+ result.areas[0].CTRY[0].area + ' </a>)</div>' +    
                      '</div>' +
                      '</article></div>');				
		  }
		  
		  // display map for level name
		  if (levelname ==="GOR" && (validpostCode ==="PO15 5RR" || validpostCode ==="PO11 9DF")) {			 
			  details = 	result.areas[0].GOR[0].envelope +":"+ 
			            	result.areas[0].GOR[0].area+":"+ 
						    result.areas[0].GOR[0].areaname+":"+ 
							result.areas[0].GOR[0].arealayername+":"+
				            result.areas[0].GOR[0].markerenvelope+":"+
			                result.areas[0].GOR[0].levelname;
			  
		      // set orange info box details	
			  $('#selArea1').append('<div id="innerDIV"> <article class="box box--orange box--orange--separated-left">' +
					  '<div style="background-color:white" class="box__inner border box--padded has-icon">'+			                   
                      '<div style="color: rgb(243,113,33); font-size: x-large"><strong>' +result.areas[0].GOR[0].area+'</strong></div>' +
                      '<div style="color: black; font-size:medium;">(Region)<br><br><strong>Part of:</strong></div>' +
                      '<div style="font-size: small;"> - Country (<a style="color: light blue"; href="index.html?nav-search='+ validpostCode + '&amp;levelname=CTRY">'+ result.areas[0].CTRY[0].area + ' </a>)</div>' +                      
                      '</div>' +
                      '</article></div>');				
		  }
		  
		  // display map for level name
		  if (levelname ==="CTRY"){			 
			  details = 	result.areas[0].CTRY[0].envelope +":"+ 
			            	result.areas[0].CTRY[0].area+":"+ 
						    result.areas[0].CTRY[0].areaname+":"+ 
							result.areas[0].CTRY[0].arealayername+":"+
				            result.areas[0].CTRY[0].markerenvelope+":"+
			                result.areas[0].CTRY[0].levelname;
			  
		      // set orange info box details	
			  $('#selArea1').append('<div id="innerDIV"> <article class="box box--orange box--orange--separated-left">' +
					  '<div style="background-color:white" class="box__inner border box--padded has-icon">'+			                   
                      '<div style="color: rgb(243,113,33); font-size: x-large"><strong>' +result.areas[0].CTRY[0].area+'</strong></div>' +
                      '<div style="color: black; font-size:medium;">(Country)<br><br></strong></div>' +                   
                      '</div>' +
                      '</article></div>');				
		  }	  
		  
	}
	
	
    dojoConfig = {
       locale: "en",
       parseOnLoad: true	    	     
     };		
	
        var map;

		require([    
		"esri/map", 
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
		"dojo/domReady!",
		"dijit/layout/BorderContainer", 
		"dijit/layout/ContentPane"
		
		  ], function( 
		    Map, InfoTemplate, Scalebar, parser, Extent, FeatureLayer, 
		    SimpleLineSymbol, SimpleFillSymbol, TextSymbol,SimpleRenderer, UniqueValueRenderer, InfoTemplate,   
		    LabelLayer, Color, on, dom, Graphic
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
			}
			
			esriConfig.defaults.io.corsEnabledServers.push("http://services.arcgisonline.com");
			esriConfig.defaults.io.corsEnabledServers.push("https://mapping.statistics.gov.uk");
			
			var dynamicMSLayer = new esri.layers.ArcGISDynamicMapServiceLayer("http://services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer")      
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