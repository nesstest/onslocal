function createTable(extcode, levelname){
	$("#wibble").toggle();
	
		
	if (levelname =="WD")
		{
			var URL = "http://data.ons.gov.uk/ons/api/data/dataset/SAPEDE.json?context=Social&apikey=l4iaoeZCum&geog=2011WARDH&dm/2011WARDH="+extcode+"&jsontype=json-stat&totals=false&diff=2013";
		}
	else{
			var URL  = "http://data.ons.gov.uk/ons/api/data/dataset/SAPEDE.json?context=Social&apikey=l4iaoeZCum&geog=2011STATH&dm/2011STATH="+extcode+"&jsontype=json-stat&totals=false&diff=2013";
		}
	var details;
	//alert("in myFunction: " + extcode);	
	
	$(document).ready(function(){
		$.getJSON(URL, function(result){
			//alert("in function");
			all = result["SAPEDE 2013"].value[0] ;
			male = result["SAPEDE 2013"].value[1] ;
			female = result["SAPEDE 2013"].value[2];
			//var HTMLTable = "Total:"+all+"<br>Male:"+male+"<br>Female:"+female
			//$('#postCodes').append(HTMLTable);
			$('#sapede-all').append(all);
			$('#sapede-males').append(male);
			$('#sapede-females').append(female);
			});	
		});
	
	$(document).ready(function(){
		$.getJSON(URL, function(result){
			//alert("in function");
			m_0_4 = result["SAPEDE 2013"].value[4] + result["SAPEDE 2013"].value[7] + result["SAPEDE 2013"].value[10] + result["SAPEDE 2013"].value[13] + result["SAPEDE 2013"].value[16];
			m_5_9 = result["SAPEDE 2013"].value[19] + result["SAPEDE 2013"].value[22] + result["SAPEDE 2013"].value[25] + result["SAPEDE 2013"].value[28] + result["SAPEDE 2013"].value[31];
			m_10_14 = result["SAPEDE 2013"].value[34]+ result["SAPEDE 2013"].value[37] + result["SAPEDE 2013"].value[40] + result["SAPEDE 2013"].value[43] + result["SAPEDE 2013"].value[46];
			m_15_19 = result["SAPEDE 2013"].value[49] + result["SAPEDE 2013"].value[52] + result["SAPEDE 2013"].value[55] + result["SAPEDE 2013"].value[58] + result["SAPEDE 2013"].value[61];
			m_20_24 = result["SAPEDE 2013"].value[64] + result["SAPEDE 2013"].value[67] + result["SAPEDE 2013"].value[70] + result["SAPEDE 2013"].value[73] + result["SAPEDE 2013"].value[76];
			m_25_29 = result["SAPEDE 2013"].value[79] + result["SAPEDE 2013"].value[82] + result["SAPEDE 2013"].value[85] + result["SAPEDE 2013"].value[88] + result["SAPEDE 2013"].value[91];
			m_30_34 = result["SAPEDE 2013"].value[94] + result["SAPEDE 2013"].value[97] + result["SAPEDE 2013"].value[100] + result["SAPEDE 2013"].value[103] + result["SAPEDE 2013"].value[106];
			m_35_39 = result["SAPEDE 2013"].value[109] + result["SAPEDE 2013"].value[112] + result["SAPEDE 2013"].value[115] + result["SAPEDE 2013"].value[118] + result["SAPEDE 2013"].value[121];
			m_40_44 = result["SAPEDE 2013"].value[124] + result["SAPEDE 2013"].value[127] + result["SAPEDE 2013"].value[130] + result["SAPEDE 2013"].value[133] + result["SAPEDE 2013"].value[136];
			m_45_49 = result["SAPEDE 2013"].value[139] + result["SAPEDE 2013"].value[142] + result["SAPEDE 2013"].value[145] + result["SAPEDE 2013"].value[148] + result["SAPEDE 2013"].value[151];
			m_50_54 = result["SAPEDE 2013"].value[154] + result["SAPEDE 2013"].value[157] + result["SAPEDE 2013"].value[160] + result["SAPEDE 2013"].value[163] + result["SAPEDE 2013"].value[166];
			m_55_59 = result["SAPEDE 2013"].value[169] + result["SAPEDE 2013"].value[172] + result["SAPEDE 2013"].value[175] + result["SAPEDE 2013"].value[178] + result["SAPEDE 2013"].value[181];
			m_60_64 = result["SAPEDE 2013"].value[184] + result["SAPEDE 2013"].value[187] + result["SAPEDE 2013"].value[190] + result["SAPEDE 2013"].value[193] + result["SAPEDE 2013"].value[196];
			m_65_69 = result["SAPEDE 2013"].value[199] + result["SAPEDE 2013"].value[202] + result["SAPEDE 2013"].value[205] + result["SAPEDE 2013"].value[208] + result["SAPEDE 2013"].value[211];
			m_70_74 = result["SAPEDE 2013"].value[214] + result["SAPEDE 2013"].value[217] + result["SAPEDE 2013"].value[220] + result["SAPEDE 2013"].value[223] + result["SAPEDE 2013"].value[226];
			m_75_79 = result["SAPEDE 2013"].value[229] + result["SAPEDE 2013"].value[232] + result["SAPEDE 2013"].value[235] + result["SAPEDE 2013"].value[238] + result["SAPEDE 2013"].value[241];
			m_80_84 = result["SAPEDE 2013"].value[244] + result["SAPEDE 2013"].value[247] + result["SAPEDE 2013"].value[250] + result["SAPEDE 2013"].value[253] + result["SAPEDE 2013"].value[256];
			m_85_89 = result["SAPEDE 2013"].value[259] + result["SAPEDE 2013"].value[262] + result["SAPEDE 2013"].value[265] + result["SAPEDE 2013"].value[268] + result["SAPEDE 2013"].value[271];
			m_90 = result["SAPEDE 2013"].value[274];

			
			f_0_4 = result["SAPEDE 2013"].value[5] + result["SAPEDE 2013"].value[8] + result["SAPEDE 2013"].value[11] + result["SAPEDE 2013"].value[14] + result["SAPEDE 2013"].value[17];
			f_5_9 = result["SAPEDE 2013"].value[20] + result["SAPEDE 2013"].value[23] + result["SAPEDE 2013"].value[26] + result["SAPEDE 2013"].value[29] + result["SAPEDE 2013"].value[32];
			f_10_14 = result["SAPEDE 2013"].value[35]+ result["SAPEDE 2013"].value[38] + result["SAPEDE 2013"].value[41] + result["SAPEDE 2013"].value[44] + result["SAPEDE 2013"].value[47];
			f_15_19 = result["SAPEDE 2013"].value[50] + result["SAPEDE 2013"].value[53] + result["SAPEDE 2013"].value[56] + result["SAPEDE 2013"].value[57] + result["SAPEDE 2013"].value[62];		
			f_20_24 = result["SAPEDE 2013"].value[65] + result["SAPEDE 2013"].value[68] + result["SAPEDE 2013"].value[71] + result["SAPEDE 2013"].value[74] + result["SAPEDE 2013"].value[77];
			f_25_29 = result["SAPEDE 2013"].value[80] + result["SAPEDE 2013"].value[83] + result["SAPEDE 2013"].value[86] + result["SAPEDE 2013"].value[89] + result["SAPEDE 2013"].value[92];
			f_30_34 = result["SAPEDE 2013"].value[95] + result["SAPEDE 2013"].value[98] + result["SAPEDE 2013"].value[101] + result["SAPEDE 2013"].value[104] + result["SAPEDE 2013"].value[106];
			f_35_39 = result["SAPEDE 2013"].value[110] + result["SAPEDE 2013"].value[113] + result["SAPEDE 2013"].value[116] + result["SAPEDE 2013"].value[119] + result["SAPEDE 2013"].value[122];
			f_40_44 = result["SAPEDE 2013"].value[125] + result["SAPEDE 2013"].value[128] + result["SAPEDE 2013"].value[131] + result["SAPEDE 2013"].value[134] + result["SAPEDE 2013"].value[137];
			f_45_49 = result["SAPEDE 2013"].value[140] + result["SAPEDE 2013"].value[143] + result["SAPEDE 2013"].value[146] + result["SAPEDE 2013"].value[149] + result["SAPEDE 2013"].value[152];
			f_50_54 = result["SAPEDE 2013"].value[155] + result["SAPEDE 2013"].value[158] + result["SAPEDE 2013"].value[161] + result["SAPEDE 2013"].value[164] + result["SAPEDE 2013"].value[167];
			f_55_59 = result["SAPEDE 2013"].value[170] + result["SAPEDE 2013"].value[173] + result["SAPEDE 2013"].value[176] + result["SAPEDE 2013"].value[179] + result["SAPEDE 2013"].value[182];
			f_60_64 = result["SAPEDE 2013"].value[185] + result["SAPEDE 2013"].value[188] + result["SAPEDE 2013"].value[191] + result["SAPEDE 2013"].value[194] + result["SAPEDE 2013"].value[197];
			f_65_69 = result["SAPEDE 2013"].value[200] + result["SAPEDE 2013"].value[203] + result["SAPEDE 2013"].value[206] + result["SAPEDE 2013"].value[209] + result["SAPEDE 2013"].value[212];
			f_70_74 = result["SAPEDE 2013"].value[215] + result["SAPEDE 2013"].value[218] + result["SAPEDE 2013"].value[221] + result["SAPEDE 2013"].value[224] + result["SAPEDE 2013"].value[227];
			f_75_79 = result["SAPEDE 2013"].value[230] + result["SAPEDE 2013"].value[233] + result["SAPEDE 2013"].value[236] + result["SAPEDE 2013"].value[239] + result["SAPEDE 2013"].value[242];
			f_80_84 = result["SAPEDE 2013"].value[245] + result["SAPEDE 2013"].value[248] + result["SAPEDE 2013"].value[251] + result["SAPEDE 2013"].value[254] + result["SAPEDE 2013"].value[257];
			f_85_89 = result["SAPEDE 2013"].value[260] + result["SAPEDE 2013"].value[263] + result["SAPEDE 2013"].value[266] + result["SAPEDE 2013"].value[269] + result["SAPEDE 2013"].value[272];
			f_90 = result["SAPEDE 2013"].value[275];
            
			
			createChart(m_0_4, m_5_9, m_10_14,m_15_19,m_20_24,m_25_29,m_30_34,m_35_39,m_40_44,m_45_49,m_50_54,m_55_59,m_60_64,m_65_69,m_70_74,m_75_79,m_80_84,m_85_89,m_90, f_0_4, f_5_9, f_10_14,f_15_19,f_20_24,f_25_29,f_30_34,f_35_39,f_40_44,f_45_49,f_50_54,f_55_59,f_60_64,f_65_69,f_70_74,f_75_79,f_80_84,f_85_89,f_90 );
			
		    });	
		});
	
	
	
	
}


function createMap(result, validpostCode, levelname){
	if (typeof levelname === 'undefined') {
		if (typeof validpostCode === 'undefined') {
		  // display UK map
		 details = result.areas[0].envelope;	
		 
		// don't display orange text box		 
		 
	    }
		else {
			
			// display OA map
			details = 	result.areas[0].OA[0].envelope +":"+ 
						result.areas[0].OA[0].area+":"+ 
					 	result.areas[0].OA[0].areacode+":"+ 
						result.areas[0].OA[0].arealayername+":"+
			            result.areas[0].OA[0].markerenvelope+":"+
			            result.areas[0].OA[0].levelname;
			
			createTable(result.areas[0].OA[0].extcode, levelname);
			
			// set orange info box details	
			$('#selArea1').append('<div id="innerDIV"> <article class="box box--orange box--orange--separated-left">' +
								  '<div style="background-color:white" class="box__inner border box--padded has-icon">'+			                   
			                      '<div style="color: rgb(243,113,33); font-size: x-large"><strong>' +postcode+'</strong></div>' +
			                      '<div style="color: black; font-size:medium;">(Output area ' + result.areas[0].OA[0].area + ')<br><br><strong>Part of:</strong></div>' +
			                      '<div style="font-size: small;"> - ward (<a style="color: light blue"; href="index.html?nav-search=PO15 5RR&amp;levelname=WD">'+ result.areas[0].WD[0].area + ' </a>)' +
		  		             	  '<br> - Local authority (<a style="color: light blue"; href="index.html?nav-search=PO15 5RR&amp;levelname=LAD">'+ result.areas[0].LAD[0].area + '</a>)' + 
			                      '<br> - Region (<a style="color: light blue"; href="index.html?nav-search=PO15 5RR&amp;levelname=GOR">'+ result.areas[0].GOR[0].area + '</a>)' +
			                      '<br> - National (<a style="color: light blue"; href="index.html?nav-search=PO15 5RR&amp;levelname=CTRY">'+ result.areas[0].CTRY[0].area + '</a>)</div>' + 
			                      '</div>' +
			                      '</article></div>');					              
		}
	}	
	else {		
		  // display map for level name
		  if (levelname ==="WD"){
			  details = 	result.areas[0].WD[0].envelope +":"+ 
			            	result.areas[0].WD[0].area+":"+ 
						    result.areas[0].WD[0].areaname+":"+ 
							result.areas[0].WD[0].arealayername+":"+
				            result.areas[0].WD[0].markerenvelope+":"+
			                result.areas[0].WD[0].levelname;
			  
			  createTable(result.areas[0].WD[0].extcode, levelname);
			  // set orange info box details	
			  $('#selArea1').append('<div id="innerDIV"> <article class="box box--orange box--orange--separated-left">' +
					  '<div style="background-color:white" class="box__inner border box--padded has-icon">'+			                   
                      '<div style="color: rgb(243,113,33); font-size: x-large"><strong>' +result.areas[0].WD[0].area+'</strong></div>' +
                      '<div style="color: black; font-size:medium;">(Ward)<br><br><strong>Part of:</strong></div>' +
                      '<div style="font-size: small;"> - Local authority (<a style="color: light blue"; href="index.html?nav-search=PO15 5RR&amp;levelname=LAD">'+ result.areas[0].LAD[0].area + ' </a>)' +
		              '<br> - Region (<a style="color: light blue"; href="index.html?nav-search=PO15 5RR&amp;levelname=GOR">'+ result.areas[0].GOR[0].area + '</a>)' + 
                      '<br> - National (<a style="color: light blue"; href="index.html?nav-search=PO15 5RR&amp;levelname=CTRY">'+ result.areas[0].CTRY[0].area + '</a>)</div>' + 
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
			  
			  createTable(result.areas[0].LAD[0].extcode, levelname);
			  
		      // set orange info box details	
			  $('#selArea1').append('<div id="innerDIV"> <article class="box box--orange box--orange--separated-left">' +
					  '<div style="background-color:white" class="box__inner border box--padded has-icon">'+			                   
                      '<div style="color: rgb(243,113,33); font-size: x-large"><strong>' +result.areas[0].LAD[0].area+'</strong></div>' +
                      '<div style="color: black; font-size:medium;">(Local authority)<br><br><strong>Part of:</strong></div>' +
                      '<div style="font-size: small;"> - Region (<a style="color: light blue"; href="index.html?nav-search=PO15 5RR&amp;levelname=GOR">'+ result.areas[0].GOR[0].area + ' </a>)' +
                      '<br> - National (<a style="color: light blue"; href="index.html?nav-search=PO15 5RR&amp;levelname=CTRY">'+ result.areas[0].CTRY[0].area + '</a>)</div>' + 
                      '</div>' +
                      '</article></div>');				
		  }
		  
		  // display map for level name
		  if (levelname ==="GOR"){			 
			  details = 	result.areas[0].GOR[0].envelope +":"+ 
			            	result.areas[0].GOR[0].area+":"+ 
						    result.areas[0].GOR[0].areaname+":"+ 
							result.areas[0].GOR[0].arealayername+":"+
				            result.areas[0].GOR[0].markerenvelope+":"+
			                result.areas[0].GOR[0].levelname;
			  
			  createTable(result.areas[0].GOR[0].extcode, levelname);
			  
		      // set orange info box details	
			  $('#selArea1').append('<div id="innerDIV"> <article class="box box--orange box--orange--separated-left">' +
					  '<div style="background-color:white" class="box__inner border box--padded has-icon">'+			                   
                      '<div style="color: rgb(243,113,33); font-size: x-large"><strong>' +result.areas[0].GOR[0].area+'</strong></div>' +
                      '<div style="color: black; font-size:medium;">(Region)<br><br><strong>Part of:</strong></div>' +
                      '<div style="font-size: small;"> - National (<a style="color: light blue"; href="index.html?nav-search=PO15 5RR&amp;levelname=CTRY">'+ result.areas[0].CTRY[0].area + ' </a>)</div>' +                      
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
			  
			  createTable(result.areas[0].CTRY[0].extcode, levelname);
			  
		      // set orange info box details	
			  $('#selArea1').append('<div id="innerDIV"> <article class="box box--orange box--orange--separated-left">' +
					  '<div style="background-color:white" class="box__inner border box--padded has-icon">'+			                   
                      '<div style="color: rgb(243,113,33); font-size: x-large"><strong>' +result.areas[0].CTRY[0].area+'</strong></div>' +
                      '<div style="color: black; font-size:medium;">(National)<br><br></strong></div>' +                   
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
			//$('#selArea').append(areacode);
			
			var postcode      = validpostCode;	
			
			var diff = xmax_env-xmin_env;				
			newxmin  = xmin_env - (2 * diff);					
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