function hoverMap(details, postcode, envelope){

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
	         "esri/layers/ArcGISDynamicMapServiceLayer",
	         "esri/SpatialReference",
	         "esri/domUtils",
	         "dojo/has",
	         "dojo/domReady!"		
	         ], function( 
	        		 Map, esriConfig, HomeButton, parser, Extent, FeatureLayer, 
	        		 SimpleLineSymbol, SimpleFillSymbol, TextSymbol,SimpleRenderer, UniqueValueRenderer, Color, on, dom, Graphic, 
	        		 esriLang, number, domStyle, TooltipDialog, dijitPopup, Query, QueryTask, ArcGISDynamicMapServiceLayer,
	        		 SpatialReference, domUtils, has
	         ) 
	         { 
  		  
		parser.parse();
		var detailsArray = details.split("|");	
		
		var area               = detailsArray[0];            // ie OA,WD,LA,GOR,CTRY
		var areaname           = detailsArray[1];
		var arealayername      = detailsArray[2];
		var markerParam        = detailsArray[3].split(':');
		var xCoord             = parseInt(markerParam[0]);
		var yCoord             = parseInt(markerParam[1]);
		var levelname          = detailsArray[4];
		var areacode           = detailsArray[5];			
		var wardName           = detailsArray[6];	
		var laName             = detailsArray[7];		
		var gorName            = detailsArray[8];
		var ctryName           = detailsArray[9];
		var wardCode           = detailsArray[10];	
		var laCode             = detailsArray[11];
		var gorCode            = detailsArray[12];
		var ctryCode           = detailsArray[13];
		var parliConName       = detailsArray[14];		
		var healthName         = detailsArray[15];
		var parliConCode       = detailsArray[16];
		var healthCode         = detailsArray[17];	
		var childarealist      = detailsArray[18];
		var childareaname      = detailsArray[19];
		var childcode          = detailsArray[20];
		var childlayername     = detailsArray[21];
		var childlevelname     = detailsArray[22];
		
		var markerEnvelope     = xCoord + ":" + yCoord; //param needed for orange box links when going back to highlightMap.js		
		var loading = dom.byId("loadingImg");  //loading image. id   

		var reformList    = childarealist.replace(/,/g, "','");	
		var childAreaDef  = childcode + " IN ('" + reformList + "')"; 	
		
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
		var dynamicMSLayer = new ArcGISDynamicMapServiceLayer("http://services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer");      
		var dynamicMSLayer2 = new ArcGISDynamicMapServiceLayer("http://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer");      
		var currentLayer = "street";
		map.addLayer(dynamicMSLayer);  

		map.setExtent(bbox.expand(1.1));
		
		on(dom.byId("btnSwap"), "click", function () {  
             if (currentLayer == "street")
            	 {
            	 //changeLayer(dynamicMSLayer2)
            	 map.removeLayer(dynamicMSLayer);  
            	 map.addLayer(dynamicMSLayer2);
            	 //document.getElementById('btnSwap').text == "Street"
            	 $("#btnSwap").attr('src','resources/images/street.jpg');
            	 currentLayer = "topo";
            	 } 
             else
             {
            	 //changeLayer(dynamicMSLayer)
            	 map.removeLayer(dynamicMSLayer2);  
            	 map.addLayer(dynamicMSLayer);
            	 //document.getElementById('btnSwap').text == "Aerial"
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

		var parentAreaDef;

		if (childlevelname === "OA") {				
			parentAreaDef       = areacode  + " = '" + wardCode + "'";
		}
		else if (childlevelname === "WD"){				
			parentAreaDef       = areacode  + " = '" + laCode + "'";
		}
		else if (childlevelname === "LAD" && ctryName === "England"){				
			parentAreaDef       = areacode  + " = '" + gorCode + "'";
		}
		else if (childlevelname === "LAD" && ctryName === "Wales"){				
			parentAreaDef       = areacode  + " = '" + laCode + "'";
		}	
		else if (childlevelname === "GOR"){				
			parentAreaDef       = areacode  + " = '" + ctryCode + "'";
		}	

		var labelField = areacode; 
		
		var featureLayer = new FeatureLayer("http://services1.arcgis.com/ESMARspQHYMw9BZ9/ArcGIS/rest/services/"+arealayername+"/FeatureServer/0", { 							
			mode: FeatureLayer.SNAPSHOT, 
			outFields: [labelField]
		});
		var featureChildLayer1;

		if (childlevelname === "OA") {
			// OA child details
			featureChildLayer1 = new FeatureLayer("http://services1.arcgis.com/ESMARspQHYMw9BZ9/ArcGIS/rest/services/"+childlayername+"/FeatureServer/0", { 				
				mode: FeatureLayer.SNAPSHOT, 
				outFields: [childcode]					
			});						
		}
		else {
			// all  other levels of  child details
			featureChildLayer1 = new FeatureLayer("http://services1.arcgis.com/ESMARspQHYMw9BZ9/ArcGIS/rest/services/"+childlayername+"/FeatureServer/0", { 				
				mode: FeatureLayer.SNAPSHOT, 
				outFields: [childcode, childareaname]					
			});		
		}

		var parentMapSymbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
				new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
						new Color([0,0,0]),2),new Color([229,78,22, 0.2]));  	  		

		var defaultSymbol  =  new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
				new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
						new Color([0,0,0]),2),new Color([229,78,22, 0.2])); 		


		featureChildLayer1.setDefinitionExpression(childAreaDef);
		featureChildLayer1.setRenderer(new SimpleRenderer(defaultSymbol)); 

		featureLayer.setDefinitionExpression(parentAreaDef);		   	                    	     
		featureLayer.setRenderer(new SimpleRenderer(parentMapSymbol));	

		map.addLayers([featureLayer, featureChildLayer1]);	

		map.infoWindow.resize(245,125);

		var dialog = new TooltipDialog({
			id: "tooltipDialog",
			style: "position:  absolute; width: auto; font: normal normal normal 10pt Helvetica;z-index:100;"
		});
		dialog.startup();		 

		var highlightSymbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, 
				new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,new Color([0,0,0]), 2), 
				new Color([229,78,22,0.2]));	

		//listen for when the onMouseOver event fires on the countiesGraphicsLayer
		//when fired, create a new graphic with the geometry from the event.graphic and add it to the maps graphics layer
		var t;
		featureChildLayer1.on("mouse-over", function(evt){
			map.setMapCursor("pointer"); 
			if (childlevelname === "OA") {
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

		var selectionSymbol =  new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, 
				new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,new Color([0,0,0]), 2), 
				new Color([229,78,22,0.5]));

		featureChildLayer1.setSelectionSymbol(selectionSymbol);
		featureChildLayer1.on("selection-complete", clearHighlightArea);

		map.on("click", executeQueryTask);
		map.on("dbl-click", executeQueryTask);	

		function closeDialog() {
			map.graphics.clear();
			map.setMapCursor("default"); 
			dijitPopup.close(dialog);
		} 

		function clearHighlightArea(){	         
			var renderer = new UniqueValueRenderer(defaultSymbol, childcode);
			featureChildLayer1.setRenderer(renderer);
			map.addLayer(featureChildLayer1);
		} 

		featureChildLayer1.on("mouse-out", function(evt) {
			//close the map dialog box after 1000 ms
			setTimeout(function () {  
				dijitPopup.close(dialog);
			}, 1000);	    	   
		});

		map.on("load", function(){ 
			map.enableMapNavigation();
			map.disableKeyboardNavigation();
			map.enablePan();
			map.disableRubberBandZoom();
			map.enableScrollWheelZoom();
			map.disableDoubleClickZoom();
			map.graphics.enableMouseEvents();
			map.graphics.on("mouse-out", closeDialog);
			map.on("mouse-drag-end", closeDialog);
		}); 

		function showLoading() {    				
			domUtils.show(loading); 
		}

		function hideLoading() {
			domUtils.hide(loading);           
		}

		// go to correct orange box details
		if (childlevelname === "OA") {			    	
			WD_boxDetail();		     
		}
		else if (childlevelname === "WD"){ 
			LA_boxDetail();									                	  			   
		}
		else if (childlevelname === "LAD"){
			if(ctryName === 'England'){
				GOR_boxDetail();
			}
			else{
				CTRY_boxDetail();		
			}          									                	  							   
		} 														   
		else if (childlevelname === "GOR"){
			CTRY_boxDetail();									                	  
		} 
		
        function  WD_boxDetail() {
			
			var urlParams          = '&amp;cn='+ctryName+'&amp;cc='+ctryCode+'&amp;pn='+parliConName+'&amp;pc='+parliConCode+'&amp;hn='+healthName+'&amp;hc='+ healthCode + '&amp;markerenvelope=' + markerEnvelope + '&amp;pcSearch=false';
			var urlParams1         = '&amp;areaname='+ctryName+'&amp;areacode='+ctryCode+'&amp;pn='+parliConName+'&amp;pc='+parliConCode+'&amp;hn='+healthName+'&amp;hc='+ healthCode + '&amp;markerenvelope=' + markerEnvelope + '&amp;pcSearch=false';
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
					'<div style="min-width:211px;color: rgb(243,113,33); font-size:large"><strong>' +area+'</strong></div>' +
					'<div style="color: black; font-size:medium;">(Ward)<br><br><strong>Part of:</strong></div>' +
					'<div style="margin-top:5px;font-size: small;"> - Local Authority (<a style="color: light blue;" href="index.html?nav-search='+ postcode + '&amp;levelname=LAD&amp;areaname=' + encodeName(laName) + '&amp;areacode=' + laCode + '&amp;gn=' + gorName + '&amp;gc=' + gorCode + urlParams + '">'+ laName + '</a>)' +  
					regionText + 
					'<br> - Country (<a style="color: light blue;" href="index.html?nav-search='+ postcode + '&amp;levelname=CTRY' + urlParams1 + '">'+  ctryName + '</a>)</div>' + 
			'</article></div>');
		}
        
		function  LA_boxDetail() {
			var urlParams          = '&amp;cn='+ctryName+'&amp;cc='+ctryCode+'&amp;pn='+parliConName+'&amp;pc='+parliConCode+'&amp;hn='+healthName+'&amp;hc='+ healthCode + '&amp;markerenvelope=' + markerEnvelope + '&amp;pcSearch=false';
			var urlParams1         = '&amp;areaname='+ctryName+'&amp;areacode='+ctryCode+'&amp;pn='+parliConName+'&amp;pc='+parliConCode+'&amp;hn='+healthName+'&amp;hc='+ healthCode + '&amp;markerenvelope=' + markerEnvelope + '&amp;pcSearch=false';
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
					'<div style="min-width:211px;color: rgb(243,113,33); font-size:large"><strong>' +area+'</strong></div>' +
					'<div style="color: black; font-size:medium;">(Local Authority)<br><br><strong>Part of:</strong></div>' +
					regionText + 
					'<br><div style="font-size: small;"> - Country (<a style="color: light blue;" href="index.html?nav-search='+ postcode + '&amp;levelname=CTRY' + urlParams1 + '">'+  ctryName + '</a>)</div>' + 
			'</article></div>');	
		}	
		
		function  GOR_boxDetail() {	
			var urlParams          = '&amp;cn='+ctryName+'&amp;cc='+ctryCode+'&amp;pn='+parliConName+'&amp;pc='+parliConCode+'&amp;hn='+healthName+'&amp;hc='+ healthCode + '&amp;markerenvelope=' + markerEnvelope + '&amp;pcSearch=false';
			var urlParams1         = '&amp;areaname='+ctryName+'&amp;areacode='+ctryCode+'&amp;pn='+parliConName+'&amp;pc='+parliConCode+'&amp;hn='+healthName+'&amp;hc='+ healthCode + '&amp;markerenvelope=' + markerEnvelope + '&amp;pcSearch=false';
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
					'<div style="min-width:211px;color: rgb(243,113,33); font-size:large"><strong>' +area+'</strong></div>' +
					'<div style="color: black; font-size:medium;">(Region)<br><br><strong>Part of:</strong></div>' +
					'<div style="font-size: small;"> - Country (<a style="color: light blue;" href="index.html?nav-search='+ postcode + '&amp;levelname=CTRY' + urlParams1 + '">'+  ctryName + '</a>)</div>' + 
			'</article></div>');
		} 
		
		function  CTRY_boxDetail() {
			var urlParams          = '&amp;cn='+ctryName+'&amp;cc='+ctryCode+'&amp;pn='+parliConName+'&amp;pc='+parliConCode+'&amp;hn='+healthName+'&amp;hc='+ healthCode + '&amp;markerenvelope=' + markerEnvelope + '&amp;pcSearch=false';
			var regionText;
			
			if (ctryName === 'England') {	    		 
				regionText = '<div style="font-size: small;"> - Region (<a style="color: light blue;" href="index.html?nav-search=' + postcode + '&amp;levelname=GOR&amp;areaname=' + gorName + '&amp;areacode=' + gorCode + urlParams + '">' + gorName + '</a>)';	    	 
			}
			else{
				regionText = '<span style="display:none;"></span>';		      
			}
			// set orange info box details	
			$('#selArea1').append('<div id="innerDIV"> <article class="box box--orange box--orange--separated-left">' +
					'<div style="background-color:white" class="box__inner border box--padded has-icon">'+			                   
					'<div style="color: rgb(243,113,33); font-size:large"><strong>' +area+'</strong></div>' +
					'<div style="color: black; font-size:medium;">(Country)<br><br></strong></div>' +  
			'</article></div>');	
		}      

		function executeQueryTask(evt){

			clearHighlightArea();

			//reset area and areaname so that only clicked areas return values and the default values are removed
			area = "";
			areaname = "";

			var selectionQuery = new Query();	          
			var tol = map.extent.getWidth()/map.width * 5;
			var x = evt.mapPoint.x;	          
			var y = evt.mapPoint.y;	        
			var queryExtent = new Extent(x-tol,y-tol,x+tol,y+tol,evt.mapPoint.spatialReference);
			selectionQuery.geometry = queryExtent;

			featureChildLayer1.selectFeatures(selectionQuery,FeatureLayer.SELECTION_NEW, function(features){
				var resultFeatures = features;

				for(var i=0, il=resultFeatures.length; i<il; i++){
					area = resultFeatures[i].attributes[childcode];
					areaname = resultFeatures[i].attributes[childareaname];	  	       	  
				}
			});
			
			//var healthUrl;
			
			//if(ctryName == "Wales"){
			//   healthUrl   = "https://mapping.statistics.gov.uk/arcgis/rest/services/LHB/LHB_DEC_2014_WA_BGC/FeatureServer/0/query?where=&geometry=" +
			//   x + "," + y + "&geometryType=esriGeometryPoint&inSR=27700&outFields=*&returnGeometry=false&outSR=27700&f=pjson" ;
			   
			//   $(document).ready(function(){
			//		$.getJSON(healthUrl, function(result) {
			//			healthName = result.features[0].attributes.LHB14NM;
			//			healthCode = result.features[0].attributes.LHB14CD;
			//		});
			//	}); 
			//}
			//else{				
			 // healthUrl   = "https://mapping.statistics.gov.uk/arcgis/rest/services/CCG/CCG_JUL_2015_EN_BGC_V2/FeatureServer/0/query?where=&geometry=" +
			 // x + "," + y + "&geometryType=esriGeometryPoint&inSR=27700&outFields=*&returnGeometry=false&outSR=27700&f=pjson" ;
			  
			  //$(document).ready(function(){
				//	$.getJSON(healthUrl, function(result) {
				//		healthName = result.features[0].attributes.CCG15NM;
				//		healthCode = result.features[0].attributes.CCG15CD;
				//	}); 
				//}); 
			//}	    
			
			var parentUrl = "http://onsdatav3-glassfishtest.rhcloud.com/data-web/rs/nessdata/getparent/" + area;
			
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
	    			 parliConCode         = res2.parent.pcon.extcode;
				     parliConName         = res2.parent.pcon.name;  
	    		  }
					
					if (area !== ""){
						
						var urlParams          = '&cn='+ctryName+'&cc='+ctryCode+'&pn='+parliConName+'&pc='+parliConCode+'&hn='+healthName+'&hc='+ healthCode + '&markerenvelope=' + markerEnvelope + '&pcSearch=false';
						
						if (levelname === "WD"){ 
							//sort this out for OA
							if(ctryName == "Wales"){
							  window.location.href =  'index.html?nav-search='+encodeName(postcode)+'&levelname=OA&areaname='+area+'&areacode='+area+'&wn='+encodeName(wardName)+'&wc='+wardCode+'&ln='+encodeName(laName)+'&lc='+laCode+urlParams;		                	  			   
							}
							else{
							  window.location.href = 'index.html?nav-search='+encodeName(postcode)+'&levelname=OA&areaname='+area+'&areacode='+area+'&wn='+encodeName(wardName)+'&wc='+wardCode+'&ln='+encodeName(laName)+'&lc='+laCode+'&gn='+gorName+'&gc='+gorCode+urlParams;
							}
						}
						else if (levelname === "LAD"){
							if(ctryName == "Wales"){
							   window.location.href =  'index.html?nav-search='+postcode+'&levelname=WD&areaname='+encodeName(areaname)+'&areacode='+area+'&ln='+encodeName(laName)+'&lc='+laCode+urlParams;
							}
							else{
							  window.location.href =  'index.html?nav-search='+postcode+'&levelname=WD&areaname='+encodeName(areaname)+'&areacode='+area+'&ln='+encodeName(laName)+'&lc='+laCode+'&gn='+gorName+'&gc='+gorCode+urlParams;
							}
						} 														   
						else if (levelname === "GOR"){
							window.location.href =  'index.html?nav-search='+postcode+'&levelname=LAD&areaname='+encodeName(areaname)+'&areacode='+area+'&gn='+gorName+'&gc='+gorCode+urlParams;	                	  
						} 
						else if (levelname === "CTRY"){
							if(ctryName == "Wales"){
								window.location.href=  'index.html?nav-search='+postcode+'&levelname=LAD&areaname='+encodeName(areaname)+'&areacode='+area+urlParams;
							}
							else
							{
								window.location.href=  'index.html?nav-search='+postcode+'&levelname=GOR&areaname='+areaname+'&areacode='+area+urlParams;
							}
						}		                	  
					} 
	    	   });
	    	});
		}  //  executeQueryTask		
	});		
}	