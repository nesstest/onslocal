function hoverMap(details, postcode){
	
	$("#map").toggle();
	
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
        "esri/tasks/query",
        "esri/tasks/QueryTask",
		"dojo/domReady!"		
		  ], function( 
		    Map, HomeButton, parser, Extent, FeatureLayer, 
		    SimpleLineSymbol, SimpleFillSymbol, TextSymbol,SimpleRenderer, UniqueValueRenderer, Color, on, dom, Graphic, 
		    esriLang, number, domStyle, TooltipDialog, dijitPopup, query, QueryTask
		  ) 
		  { 
		
			parser.parse();
			var queryTask, query;
			detailsArray = details.split(":");		
			
			var xmin_env           = parseInt(detailsArray[0]);
			var ymin_env           = parseInt(detailsArray[1]);
			var xmax_env           = parseInt(detailsArray[2]);
			var ymax_env           = parseInt(detailsArray[3]);
			var area               = detailsArray[4];            // ie OA,WD,LA,GOR,CTRY
			var areaname           = detailsArray[5];
			var arealayername      = detailsArray[6];
			var xCoord             = detailsArray[7];
			var yCoord             = detailsArray[8];
			var levelname          = detailsArray[9];
			var areacode           = detailsArray[10];			
			var wardName           = detailsArray[11];	
			var laName             = detailsArray[12];
			var gorName            = detailsArray[13];
			var ctryName           = detailsArray[14];
			var wardCode           = detailsArray[15];	
			var laCode             = detailsArray[16];
			var gorCode            = detailsArray[17];
			var ctryCode           = detailsArray[18];
			var childarealist      = detailsArray[19];
			var childareaname      = detailsArray[20];
			var childcode          = detailsArray[21];
			var childlayername     = detailsArray[22];
			var childlevelname     = detailsArray[23];
			var parliConName       = detailsArray[24];		
			var healthName         = detailsArray[25];
			var parliConCode       = detailsArray[26];
			var healthCode         = detailsArray[27];	
			
			var markerEnvelope = xCoord + ":" + yCoord;//param needed for orange box links when going back to highlightMap.js
			
			loading = dojo.byId("loadingImg");  //loading image. id   
			
		    var reformList    = childarealist.replace(/,/g, "','");	
		    var childAreaDef  = childcode + " IN ('" + reformList + "')"; 
			
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
			var dynamicMSLayer2 = new esri.layers.ArcGISDynamicMapServiceLayer("http://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer");      
			currentLayer = "street"
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
	            	 currentLayer = "topo"
	            	 } 
	             else
	             {
	            	 //changeLayer(dynamicMSLayer)
	            	 map.removeLayer(dynamicMSLayer2);  
	            	 map.addLayer(dynamicMSLayer);
	            	 //document.getElementById('btnSwap').text == "Aerial"
	            	 $("#btnSwap").attr('src','resources/images/aerial.jpg');
	            	 currentLayer = "street"
	            	 } 
	         });  
			
			on(dynamicMSLayer, "load", function(){
				  showLoading();			   
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
			var featureLayer = new FeatureLayer("https://mapping.statistics.gov.uk/arcgis/rest/services/"+arealayername+"/FeatureServer/0", { 							
				mode: FeatureLayer.SNAPSHOT, 
				outFields: [labelField]
			 });			
			
			if (childlevelname === "OA") {
				// OA child details
				var featureChildLayer1 = new FeatureLayer("https://mapping.statistics.gov.uk/arcgis/rest/services/"+childlayername+"/FeatureServer/0", { 				
					mode: FeatureLayer.SNAPSHOT, 
					outFields: [childcode]					
				 });						
			}
			else {
				// al  other levels of  child details
				var featureChildLayer1 = new FeatureLayer("https://mapping.statistics.gov.uk/arcgis/rest/services/"+childlayername+"/FeatureServer/0", { 				
					mode: FeatureLayer.SNAPSHOT, 
					outFields: [childcode, childareaname]					
				 });		
			}
			
			var parentMapSymbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
                                  new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                                  new Color([229,78,22]),2),new Color([229,78,22, 0.2]));  	  		
			
			var defaultSymbol  =  new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
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
				new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,new Color([229,78,22]), 2), 
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
				new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,new Color([229,78,22]), 2), 
				new Color([229,78,22,0.5]));
		        
		    featureChildLayer1.setSelectionSymbol(selectionSymbol);
		    featureChildLayer1.on("selection-complete", clearHighlightArea);
		        
		    var myClick = map.on("click", executeQueryTask);
			var myDblclick = on(map, "dbl-click", executeQueryTask);	
	    
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
			   map.graphics.enableMouseEvents();
		       map.graphics.on("mouse-out", closeDialog);
		       map.on("mouse-drag-end", closeDialog);
		    }); 
	        
	        function showLoading() {    				
			      esri.show(loading); 
			    }
			       
			    function hideLoading() {
			      esri.hide(loading);           
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
		    else if (childlevelname === "GOR"){//put if in for welsh.?????
	          CTRY_boxDetail();									                	  
			} 
	        
	        function executeQueryTask(evt){
		    	   
			   clearHighlightArea();
			   //reset area and areaname so that only clicked areas return values and the default values are removed
			   area = "";
			   areaname = "";
			   
			   var selectionQuery = new esri.tasks.Query();	          
			   var tol = map.extent.getWidth()/map.width * 5;
			   var x = evt.mapPoint.x;	          
			   var y = evt.mapPoint.y;	        
			   var queryExtent = new esri.geometry.Extent(x-tol,y-tol,x+tol,y+tol,evt.mapPoint.spatialReference);
			   selectionQuery.geometry = queryExtent;
			  
			   featureChildLayer1.selectFeatures(selectionQuery,esri.layers.FeatureLayer.SELECTION_NEW, function(features){
				 var resultFeatures = features;
				 
				 for(var i=0, il=resultFeatures.length; i<il; i++){
				   area = resultFeatures[i].attributes[childcode];
				   areaname = resultFeatures[i].attributes[childareaname];
				 }
              });
			   
			   
			   
			   
			    if (area !== ""){
			    	if (levelname === "WD"){ 
			    		//sort this out for OA
			    		window.location.href =  'index.html?nav-search='+postcode+'&levelname=OA&areaname='+area+'&areacode='+area+'&wn='+wardName+'&wc='+wardCode+'&ln='+laName+'&lc='+laCode+'&gn='+gorName+'&gc='+gorCode+'&cn='+ctryName+'&cc='+ctryCode+'&pn=undefined&pc=undefined&hn=undefined&hc=undefined&markerenvelope='+xCoord+':'+yCoord+'&pcSearch=false';		                	  			   
					}
				    else if (levelname === "LAD"){
				    	window.location.href =  'index.html?nav-search='+postcode+'&levelname=WD&areaname='+areaname+'&areacode='+area+'&ln='+laName+'&lc='+laCode+'&gn='+gorName+'&gc='+gorCode+'&cn='+ctryName+'&cc='+ctryCode+'&pn=undefined&pc=undefined&hn=undefined&hc=undefined&markerenvelope='+xCoord+':'+yCoord+'&pcSearch=false';      									                	  							   
					} 														   
				    else if (levelname === "GOR"){
				    	window.location.href =  'index.html?nav-search='+postcode+'&levelname=LAD&areaname='+areaname+'&areacode='+area+'&gn='+gorName+'&gc='+gorCode+'&cn='+ctryName+'&cc='+ctryCode+'&hn=undefined&hc=undefined&markerenvelope='+xCoord+':'+yCoord+'&pcSearch=false'	                	  
					} 
				    else if (levelname === "CTRY"){
				    	window.location.href =  'index.html?nav-search='+postcode+'&levelname=GOR&areaname='+areaname+'&areacode='+area+'&cn='+ctryName+'&cc='+ctryCode+'&markerenvelope='+xCoord+':'+yCoord+'&pcSearch=false'
				    }		                	  
				} 
			   
		   }  //  executeQueryTask 
	        
	      // $('#selArea1').empty(); //empty any previous contents of orange box
	       
	       function  WD_boxDetail() {	    	  
	    	 if (ctryName === 'England') {
	    		 regionText = '<div style="font-size: small;"> - Region (<a style="color: light blue"; href="index.html?nav-search=' + postcode + '&amp;levelname=GOR&amp;areaname=' + gorName + '&amp;areacode=' + gorCode + '&amp;cn=' + ctryName + '&amp;cc=' + ctryCode + '&amp;markerenvelope=' + markerEnvelope + '&amp;pcSearch=false' + '">' + gorName + '</a>)';
		     }
		     else{
		        regionText = '<span style="display:none;"></span>';
		     } 	    	 
	    	 // set orange info box details    		
	    	 $('#selArea1').append('<div id="innerDIV"> <article class="box box--orange box--orange--separated-left">' +
					'<div style="background-color:white" class="box__inner border box--padded has-icon">'+			                   
				    '<div style="color: rgb(243,113,33); font-size: x-large"><strong>' +area+'</strong></div>' +
				    '<div style="color: black; font-size:medium;">(Ward)<br><br><strong>Part of:</strong></div>' +
				    '<div style="margin-top:5px;font-size: small;"> - Local Authority (<a style="color: light blue"; href="index.html?nav-search='+ postcode + '&amp;levelname=LAD&amp;areaname=' + laName + '&amp;areacode=' + laCode + '&amp;gn=' + gorName + '&amp;gc=' + gorCode + '&amp;cn=' + ctryName + '&amp;cc=' + ctryCode + '&amp;hn=' + healthName + '&amp;hc=' + healthCode + '&amp;markerenvelope=' + markerEnvelope + '&amp;pcSearch=false' + '">'+ laName + '</a>)' +  
				    regionText + 
			  	    '<br> - Country (<a style="color: light blue"; href="index.html?nav-search='+ postcode + '&amp;levelname=CTRY&amp;areaname=' + ctryName + '&amp;areacode=' + ctryCode + '&amp;markerenvelope=' + markerEnvelope + '&amp;pcSearch=false' + '">'+  ctryName + '</a>)</div>' + 
		            '<div style="color: black; font-size:medium;padding-top:10px;"><strong>Drill down to :</strong></div>' +
		            '<div style="font-size: small;">' + 
		            '- <a style="color: light blue"; href="index.html?nav-search=' + postcode + '&amp;levelname=WD&amp;childname=OA&amp;areacode=' + wardCode + '&amp;areaname=' + wardName + '&amp;ln=' + laName + '&amp;lc=' + laCode +
		            '&amp;gn=' + gorName + '&amp;gc=' + gorCode + '&amp;cn=' + ctryName + '&amp;cc=' + ctryCode + '&amp;markerenvelope=' + markerEnvelope +'&amp;pcSearch=false' + '"> Output area </a></div>' +
		            '</div>' +  '</article></div>');
		   }
	       function  LA_boxDetail() {	    	  
	    	 if (ctryName === 'England') {
	    		 regionText = '<div style="font-size: small;"> - Region (<a style="color: light blue"; href="index.html?nav-search=' + postcode + '&amp;levelname=GOR&amp;areaname=' + gorName + '&amp;areacode=' + gorCode + '&amp;cn=' + ctryName + '&amp;cc=' + ctryCode + '&amp;markerenvelope=' + markerEnvelope + '&amp;pcSearch=false' + '">' + gorName + '</a>)';
		     }
		     else{
		        regionText = '<span style="display:none;"></span>';
		     } 
	    	 // set orange info box details    		
			   $('#selArea1').append('<div id="innerDIV"> <article class="box box--orange box--orange--separated-left">' +
					  '<div style="background-color:white" class="box__inner border box--padded has-icon">'+			                   
				      '<div style="color: rgb(243,113,33); font-size: x-large"><strong>' +area+'</strong></div>' +
				      '<div style="color: black; font-size:medium;">(Local Authority)<br><br><strong>Part of:</strong></div>' +
				      regionText + 
				      '<br><div style="font-size: small;"> - Country (<a style="color: light blue"; href="index.html?nav-search='+ postcode + '&amp;levelname=CTRY&amp;areaname=' + ctryName + '&amp;areacode=' + ctryCode + '&amp;markerenvelope=' + markerEnvelope + '&amp;pcSearch=false' + '">'+  ctryName + '</a>)</div>' + 
                      '<div style="color: black; font-size:medium;padding-top:10px;"><strong>Drill down to :</strong></div>' +
                      '<div style="font-size: small;">' + 
                      '- <a style="color: light blue"; href="index.html?nav-search=' + postcode + '&amp;levelname=LAD&amp;childname=WD&amp;areacode=' + laCode + '&amp;areaname=' + laName + '&amp;gn=' + gorName + '&amp;gc=' + gorCode + '&amp;cn=' + ctryName + '&amp;cc=' + ctryCode + '&amp;markerenvelope=' + markerEnvelope +'&amp;pcSearch=false' + '"> Ward </a></div>' +
                      '</div>' + '</article></div>');	
		 }	       
	     function  GOR_boxDetail() {	    	 
	       if (ctryName === 'England') {	    	    
	    	  regionText = '<div style="font-size: small;"> - Region (<a style="color: light blue"; href="index.html?nav-search=' + postcode + '&amp;levelname=GOR&amp;areaname=' + gorName + '&amp;areacode=' + gorCode + '&amp;cn=' + ctryName + '&amp;cc=' + ctryCode + '&amp;markerenvelope=' + markerEnvelope + '&amp;pcSearch=false' + '">' + gorName + '</a>)';
	    	  regionDrillText  = '- <a style="color: light blue"; href="index.html?nav-search=' + postcode + '&amp;levelname=GOR&amp;childname=LAD&amp;areaname=' + gorName + '&amp;areacode=' + gorCode + '&amp;cn=' + ctryName + '&amp;cc=' + ctryCode + '&amp;markerenvelope=' + markerEnvelope + '&amp;pcSearch=false' + '"> Local Authority </a></div>';
		   }
		   else{
		     regionText = '<span style="display:none;"></span>';
		     regionDrillText = '- <a style="color: light blue"; href="index.html?nav-search=' + postcode + '&amp;levelname=CTRY&amp;childname=LAD&amp;areaname=' + ctryName + '&amp;areacode=' + ctryCode + '&amp;markerenvelope=' + markerEnvelope + '&amp;pcSearch=false' + '"> Local Authority </a></div>';				   
		   } 
	       // set orange info box details    		
		   $('#selArea1').append('<div id="innerDIV"> <article class="box box--orange box--orange--separated-left">' +
		          '<div style="background-color:white" class="box__inner border box--padded has-icon">'+			                   
			      '<div style="color: rgb(243,113,33); font-size: x-large"><strong>' +area+'</strong></div>' +
			      '<div style="color: black; font-size:medium;">(Region)<br><br><strong>Part of:</strong></div>' +
			      '<div style="font-size: small;"> - Country (<a style="color: light blue"; href="index.html?nav-search='+ postcode + '&amp;levelname=CTRY&amp;areaname=' + ctryName + '&amp;areacode=' + ctryCode + '&amp;markerenvelope=' + markerEnvelope + '&amp;pcSearch=false' + '">'+  ctryName + '</a>)</div>' + 
	              '<div style="color: black; font-size:medium;padding-top:10px;"><strong>Drill down to :</strong></div>' +
	              '<div style="font-size: small;">' + 
	              regionDrillText + '</div>' +  '</article></div>');
	     } 
	     function  CTRY_boxDetail() {
	       if (ctryName === 'England') {	    		 
	    	   regionText = '<div style="font-size: small;"> - Region (<a style="color: light blue"; href="index.html?nav-search=' + postcode + '&amp;levelname=GOR&amp;areaname=' + gorName + '&amp;areacode=' + gorCode + '&amp;cn=' + ctryName + '&amp;cc=' + ctryCode + '&amp;markerenvelope=' + markerEnvelope + '&amp;pcSearch=false' + '">' + gorName + '</a>)';
	    	   regionDrillText  = '- <a style="color: light blue"; href="index.html?nav-search=' + postcode + '&amp;levelname=CTRY&amp;childname=GOR&amp;areaname=' + ctryName + '&amp;areacode=' + ctryCode + '&amp;markerenvelope=' + markerEnvelope + '&amp;pcSearch=false' + '"> Region </a></div>';
		    }
		    else{
		      regionText = '<span style="display:none;"></span>';
		      regionDrillText = '- <a style="color: light blue"; href="index.html?nav-search=' + postcode + '&amp;levelname=CTRY&amp;childname=LAD&amp;areaname=' + ctryName + '&amp;areacode=' + ctryCode + '&amp;markerenvelope=' + markerEnvelope + '&amp;pcSearch=false' + '"> Local Authority </a></div>';					   
		    }
	    	// set orange info box details	
			 $('#selArea1').append('<div id="innerDIV"> <article class="box box--orange box--orange--separated-left">' +
			        '<div style="background-color:white" class="box__inner border box--padded has-icon">'+			                   
                    '<div style="color: rgb(243,113,33); font-size: x-large"><strong>' +area+'</strong></div>' +
                    '<div style="color: black; font-size:medium;">(Country)<br><br></strong></div>' +  
                    '<div style="color: black; font-size:medium;padding-top:10px;"><strong>Drill down to :</strong></div>' +
                    '<div style="font-size: small;">' + 
                    regionDrillText + '</div>' + '</article></div>');	
	     }      
	  });		
	}	