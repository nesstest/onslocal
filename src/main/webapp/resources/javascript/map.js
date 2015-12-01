function homePageBoxes(postcode){
	if(postcode == null || postcode.length == 0 || typeof postcode === 'undefined')
	{
		if(document.getElementById("redbox").getAttribute("style") == "display: none;")
		{		
		  $("#redbox").toggle();
		}
		$('#bluebox').toggle();
		$('#titlebox').toggle();
	}
	else
	{
		$("#map").toggle();
	}
}

function homePageBoxes1(){
	    $('#nav-search').attr('placeholder',"Search postcode or place name in England and Wales"); 	   
		$("#redbox").toggle();
		$('#bluebox').toggle();
		$('#titlebox').toggle();
	
}

function createMap(postcode,search){	
	
    if (postcode == null || postcode.length == 0 || typeof postcode === 'undefined') {
    	
    	// --------------- to do -----------------------------
		// need to remove if statement on removal of uk map
		// ----------------------------------------------------
    }
	else {	
		// ----------------------------------------------------
		// check to see if postcode details are required
		// ----------------------------------------------------
		 
		
		if (typeof $.getUrlVar('pcSearch') === 'undefined' ) {
			if(search === 'postcode'){
				OA_pcode_details(postcode);
			}
			if(search === 'name' && $.getUrlVar('levelname') === 'WD'){
				WD_areaDetails(search);
			}
			if(search === 'name' && $.getUrlVar('levelname') === 'LAD'){
				LA_areaDetails(search);
			} 
			if(search === 'name' && $.getUrlVar('levelname') === 'GOR'){
				GOR_areaDetails(search);
			}
			if(search === 'name' && $.getUrlVar('levelname') === 'CTRY'){
				CTRY_areaDetails(search);
			}
		}
		else{		    
			if($.getUrlVar('levelname') === 'OA' ) {
				  OA_areaDetails(postcode);
			}
			if($.getUrlVar('levelname') === 'WD' ) {
			  WD_areaDetails(postcode);
			}
			
			if($.getUrlVar('levelname') === 'LAD' ) {
			  LA_areaDetails(postcode);
			}
			
			if($.getUrlVar('levelname') === 'GOR' ) {
			  GOR_areaDetails(postcode);
			}
			
			if($.getUrlVar('levelname') === 'CTRY' ) {
			  CTRY_areaDetails(postcode);
			}
		}	
	}	 
}

function OA_areaDetails(postcode){
  $(window).load(function(){	
   var areaId, envelope, markerEnvelope, LA, GOR, CTRY, WD, OA, levelname;
   var WD_extcode, LA_extcode, GOR_extcode, CTRY_extcode, OA_extcode, childarealist, childname;  
  
   OA               = $.getUrlVar('areaname');
   OA_extcode       = $.getUrlVar('areacode');
   WD               = decodeName($.getUrlVar('wn'));   
   LA               = decodeName($.getUrlVar('ln'));
   GOR              = $.getUrlVar('gn');
   CTRY             = $.getUrlVar('cn');
   WD_extcode       = $.getUrlVar('wc');
   LA_extcode       = $.getUrlVar('lc');
   GOR_extcode      = $.getUrlVar('gc');
   CTRY_extcode     = $.getUrlVar('cc');
   markerEnvelope   = $.getUrlVar('markerenvelope');
   levelname        = $.getUrlVar('levelname');
   childname        = $.getUrlVar('childname');
   parliCon 		= $.getUrlVar('pn');
   health 			= $.getUrlVar('hn');  
   parliCon_extcode	= $.getUrlVar('pc');
   health_extcode 	= $.getUrlVar('hc');  
   
   $(document).ready(function(){	   

	   details = OA + "|" + "WD11CD" + "|" + "OA/OA_2011_EW_BGC_V2" + "|" + markerEnvelope + "|" + "OA" + "|" + "OA11CD" + "|" +
	        	 WD + "|" + LA + "|" + GOR + "|" + CTRY + "|" + WD_extcode + "|" + LA_extcode + "|" + GOR_extcode + "|" + CTRY_extcode + "|" + parliCon + "|" + health + "|" + 
	   			 parliCon_extcode + "|" + health_extcode + "|"  + childarealist + "|" + "" + "|" + "OA11CD" + "|" + "OA/OA_2011_EW_BGC_V2" + "|" + childname;	    
	   
	   $("#Tabs").toggle(); 
	   
	   //display tabs for data content	   
	   if (GOR_extcode == "") {
			 GOR_extcode = CTRY_extcode;
	   }  
	   
 	   createTable( OA, levelname);
 	   createReligion( OA, levelname);	
 	   getData( OA,LA_extcode,LA,parliCon_extcode,parliCon,WD_extcode,WD,GOR_extcode,GOR,CTRY_extcode,CTRY,health,  levelname, OA, 'popSexGeog');
	   getData( OA,LA_extcode,LA,parliCon_extcode,parliCon,WD_extcode,WD,GOR_extcode,GOR,CTRY_extcode,CTRY,health,  levelname, OA, 'ageGeog');
	   getData( OA,LA_extcode,LA,parliCon_extcode,parliCon,WD_extcode,WD,GOR_extcode,GOR,CTRY_extcode,CTRY,health,  levelname, OA, 'popTime');
	   getData( OA,LA_extcode,LA,parliCon_extcode,parliCon,WD_extcode,WD,GOR_extcode,GOR,CTRY_extcode,CTRY,health,  levelname, OA, 'relGeog');
	   getData( OA,LA_extcode,LA,parliCon_extcode,parliCon,WD_extcode,WD,GOR_extcode,GOR,CTRY_extcode,CTRY,health,  levelname, OA, 'relAgeGeog');
	   getData( OA,LA_extcode,LA,parliCon_extcode,parliCon,WD_extcode,WD,GOR_extcode,GOR,CTRY_extcode,CTRY,health,  levelname, OA, 'relSexGeog');
	   
	   // Open Geography URL to search for a ward and return its boundaries.
	   // Here it is only searching for Ward Boundaries using service: 'OA/OA_2011_EW_BGC_V2' and layer: 'OA_2011_EW_BGC_V2'
	   var url = "https://mapping.statistics.gov.uk/arcgis/rest/services/OA/OA_2011_EW_BGC_V2/MapServer/0/query?where=OA11CD" + "='" + OA_extcode + "'" + "&text=&objectIds=&time=&geometry=&geometryType=esriGeometryPolygon&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=&returnGeometry=true&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&f=pjson";
	   var queryParams = "OA11CD" + "='" + OA_extcode + "'";
		    
	   // start process with call to Open Geography to get envelope 
	   getEnvelope(url,queryParams,details,postcode,childname);	   
    }); // ready
  });
 }

function WD_areaDetails(search){
   $(window).load(function(){
	   
	   postcode       = $.getUrlVar('nav-search');	
	
	   var OA, LA, GOR, CTRY, WD, health, parliCon;
	   var WD_extcode, LA_extcode, GOR_extcode, CTRY_extcode, health_extcode, parliCon_extcode, levelname, childarealist, childname;
	   var details;
	   
	   if(search === 'name'){
	     // name search call 	
		 WD_extcode       = $.getUrlVar('areacode');
		 WD               = $.getUrlVar('nav-search');
		 levelname        = $.getUrlVar('levelname');
	   } 
	   else {
		   WD_extcode       = $.getUrlVar('areacode');
		   WD               = decodeName($.getUrlVar('areaname')); 
	   }
		 
	   if (WD_extcode == null || WD_extcode.length == 0 || typeof WD_extcode === 'undefined') {
	    	// load default home page
	    	$(document).ready(function(){				
		    	homePageBoxes(searchtext);				
			});
	   }
	   else {
			 var childUrl = "http://onsdata-glassfishtest.rhcloud.com/data-web/rs/nessdata/getchildrenextcode/" + WD_extcode;
		    
		     $(document).ready(function(){		
	   		   $.getJSON(childUrl, function(res1){
	   			  
	   			  if (res1['children'] && res1['children'].empty === 0) {
	   		            // do stuff when no features were found
	   					$('#redbox').toggle(); 
	   			    	$('#bluebox').toggle();
	   			   		$('#titlebox').toggle();
	   			   		$('#nav-search').attr('placeholder',"Search postcode or place name in England and Wales"); 
	   			   		$('#map').toggle();
	   		      }
	   			  else
	   			  {	
	   		    	  // get the children and parent details for the selected area(extcode)
	   			      childarealist = res1['children'];		   			     
	   			      
	   			      if(search === 'name'){
	   			          // name search call - require parent info		   			    	
	   			    	  var parentUrl = "http://onsdata-glassfishtest.rhcloud.com/data-web/rs/nessdata/getparent/" + WD_extcode;
	
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
		    					    CTRY_extcode     = res2.parent.country.extcode;
				    			    CTRY             = res2.parent.country.name;
				    			    GOR_extcode	     = res2.parent.region.extcode;
				    			    GOR     	     = res2.parent.region.name;
				    			    LA_extcode       = res2.parent.la.extcode;
				    		        LA               = res2.parent.la.name;  
				    		        OA               = "";
				    		        parliCon_extcode = "";
					    		    parliCon         = "";
					    		    health_extcode   = "";
					    		    health           = "";
					    		    childname        = ""; 
					    		    markerEnvelope   = "000000" + ":" + "000000";
				    		       // extCode          = res2.parent.
				    		       // OA               = res2.parent.
				    		       // parliCon_extcode = res2.parent.pcon.extcode;
				    		       // parliCon         = res2.parent.pcon.name;
				    		       // health_extcode   = res2.parent.ccg.extcode;
				    		       // health           = res2.parent.ccg.name;
					    		   					    		    
					    		    details = WD + "|" + "WD11NM" + "|" + "WD/WD_DEC_2011_EW_BGC" + "|" + markerEnvelope + "|" + "WD" + "|" + "WD11CD" + "|" +
						            WD + "|" + LA + "|" + GOR + "|" + CTRY + "|" + WD_extcode + "|" + LA_extcode + "|" + GOR_extcode + "|" + CTRY_extcode + "|" + parliCon + "|" + health + "|" + 
						            parliCon_extcode + "|" + health_extcode + "|"  + 
						            childarealist + "|" + "" + "|" + "OA11CD" + "|" + "OA/OA_2011_EW_BGC_V2" + "|" + childname;	
					    		    
					    		    $("#Tabs").toggle(); //display tabs for data content	    
									
								    //Call createTable for OA
									
								    if (OA == ""){
										 OA = CTRY_extcode;
								    }	  
									 
									//temp until we get the data
									if (parliCon_extcode == ""){
										 parliCon_extcode = CTRY_extcode;
									}
									 
									//temp until we get the data
									if (health_extcode == ""){
										 health_extcode = CTRY_extcode;
									}  
									 
									if (GOR_extcode == ""){
										 GOR_extcode = CTRY_extcode;
									}   
									
									createTable( WD_extcode, levelname);
									createReligion( WD_extcode, levelname);	
									getData( OA,LA_extcode,LA,parliCon_extcode,parliCon,WD_extcode,WD,GOR_extcode,GOR,CTRY_extcode,CTRY,health,  levelname, WD, 'popSexGeog');
									getData( OA,LA_extcode,LA,parliCon_extcode,parliCon,WD_extcode,WD,GOR_extcode,GOR,CTRY_extcode,CTRY,health,  levelname, WD, 'ageGeog');
									getData( OA,LA_extcode,LA,parliCon_extcode,parliCon,WD_extcode,WD,GOR_extcode,GOR,CTRY_extcode,CTRY,health,  levelname, WD, 'popTime');
									getData( OA,LA_extcode,LA,parliCon_extcode,parliCon,WD_extcode,WD,GOR_extcode,GOR,CTRY_extcode,CTRY,health,  levelname, WD, 'relGeog');
									getData( OA,LA_extcode,LA,parliCon_extcode,parliCon,WD_extcode,WD,GOR_extcode,GOR,CTRY_extcode,CTRY,health,  levelname, WD, 'relAgeGeog');
									getData( OA,LA_extcode,LA,parliCon_extcode,parliCon,WD_extcode,WD,GOR_extcode,GOR,CTRY_extcode,CTRY,health,  levelname, WD, 'relSexGeog');
					    		    var nameSearch = WD;
					    		    
					    		    // Open Geography URL to search for a ward and return its boundaries.
					    		    // Here it is only searching for Ward Boundaries using service: 'WD/WD_DEC_2011_EW_BGC' and layer: 'WD_DEC_2011_EW_BGC'
					    		    var url         = "https://mapping.statistics.gov.uk/arcgis/rest/services/WD/WD_DEC_2011_EW_BGC/MapServer/0/query?where=WD11CD" + "='" + WD_extcode + "'" + "&text=&objectIds=&time=&geometry=&geometryType=esriGeometryPolygon&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=&returnGeometry=true&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&f=pjson";
					   			    var queryParams = "WD11CD" + "='" + WD_extcode + "'";
					   			    
					   			    // start process with call to Open Geography to get envelope 
					   			    getEnvelope(url,queryParams,details,nameSearch,childname);
					   			    
				    			 }  //else
					    	   }); // parentUrl
					    	}); // ready
	   			      } //	if(search === 'name
	   			  
	   			      else{
					       OA               = "";
						   LA               = decodeName($.getUrlVar('ln'));
						   GOR              = $.getUrlVar('gn');
						   CTRY             = $.getUrlVar('cn');
						   LA_extcode       = $.getUrlVar('lc');
						   GOR_extcode      = $.getUrlVar('gc');
						   CTRY_extcode     = $.getUrlVar('cc');
						   markerEnvelope   = $.getUrlVar('markerenvelope');
						   levelname        = $.getUrlVar('levelname');
						   childname        = $.getUrlVar('childname');
						   parliCon 		= $.getUrlVar('pn');
						   health 			= $.getUrlVar('hn');  
						   parliCon_extcode	= $.getUrlVar('pc');
						   health_extcode 	= $.getUrlVar('hc');
						   
						   details = WD + "|" + "WD11NM" + "|" + "WD/WD_DEC_2011_EW_BGC" + "|" + markerEnvelope + "|" + "WD" + "|" + "WD11CD" + "|" +
				           WD + "|" + LA + "|" + GOR + "|" + CTRY + "|" + WD_extcode + "|" + LA_extcode + "|" + GOR_extcode + "|" + CTRY_extcode + "|" + parliCon + "|" + health + "|" + 
				           parliCon_extcode + "|" + health_extcode + "|"  + 
				           childarealist + "|" + "" + "|" + "OA11CD" + "|" + "OA/OA_2011_EW_BGC_V2" + "|" + childname;	 
						   
						   $("#Tabs").toggle(); //display tabs for data content	    
							
							//Call createTable for OA
							
							 if (OA == ""){
								 OA = CTRY_extcode;
							 }  
							 
							 //temp until we get the data
							 if (parliCon_extcode == ""){
								 parliCon_extcode = CTRY_extcode;
							 }
							 
							//temp until we get the data
							 if (health_extcode == ""){
								 health_extcode = CTRY_extcode;
							 }  
							 
							 if (GOR_extcode == ""){
								 GOR_extcode = CTRY_extcode;
							 }   
							
							createTable( WD_extcode, levelname);
							createReligion( WD_extcode, levelname);	
							getData( OA,LA_extcode,LA,parliCon_extcode,parliCon,WD_extcode,WD,GOR_extcode,GOR,CTRY_extcode,CTRY,health,  levelname, WD, 'popSexGeog');
							getData( OA,LA_extcode,LA,parliCon_extcode,parliCon,WD_extcode,WD,GOR_extcode,GOR,CTRY_extcode,CTRY,health,  levelname, WD, 'ageGeog');
							getData( OA,LA_extcode,LA,parliCon_extcode,parliCon,WD_extcode,WD,GOR_extcode,GOR,CTRY_extcode,CTRY,health,  levelname, WD, 'popTime');
							getData( OA,LA_extcode,LA,parliCon_extcode,parliCon,WD_extcode,WD,GOR_extcode,GOR,CTRY_extcode,CTRY,health,  levelname, WD, 'relGeog');
							getData( OA,LA_extcode,LA,parliCon_extcode,parliCon,WD_extcode,WD,GOR_extcode,GOR,CTRY_extcode,CTRY,health,  levelname, WD, 'relAgeGeog');
							getData( OA,LA_extcode,LA,parliCon_extcode,parliCon,WD_extcode,WD,GOR_extcode,GOR,CTRY_extcode,CTRY,health,  levelname, WD, 'relSexGeog');
							
							// Open Geography URL to search for a ward and return its boundaries.
			    		    // Here it is only searching for Ward Boundaries using service: 'WD/WD_DEC_2011_EW_BGC' and layer: 'WD_DEC_2011_EW_BGC'
							var url         = "https://mapping.statistics.gov.uk/arcgis/rest/services/WD/WD_DEC_2011_EW_BGC/MapServer/0/query?where=WD11CD" + "='" + WD_extcode + "'" + "&text=&objectIds=&time=&geometry=&geometryType=esriGeometryPolygon&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=&returnGeometry=true&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&f=pjson";
			   			    var queryParams = "WD11CD" + "='" + WD_extcode + "'";
			   			    
			   			    // start process with call to Open Geography to get envelope 
			   			    getEnvelope(url,queryParams,details,postcode,childname);						
	   			    }	
   	   	   }//else
	    });//childurl
	  });//ready
    }//else (WD_extcode == null || WD_extcode.length == 0 || typeof WD_extcode === 'undefined') 
  });//$(window).load(function(){
}//end of function		  
   

function LA_areaDetails(search){	
  $(window).load(function(){
   postcode       = $.getUrlVar('nav-search');	

   var areaId, envelope, markerEnvelope, LA, GOR, CTRY, levelname; 
   var LA_extcode, GOR_extcode, CTRY_extcode, childarealist, childname;
   
   if(search === 'name'){
     // name search call 	
     LA_extcode       = $.getUrlVar('areacode');
     LA               = $.getUrlVar('nav-search');
	 levelname        = $.getUrlVar('levelname');
   } 
   else {
	   LA_extcode       = $.getUrlVar('areacode');
	   LA               = decodeName($.getUrlVar('areaname')); 
   }
   
   if (LA_extcode == null || LA_extcode.length == 0 || typeof LA_extcode === 'undefined') {
   	// load default home page
   	$(document).ready(function(){				
	    	homePageBoxes(searchtext);				
		});
  }
  else {
   var childUrl = "http://onsdata-glassfishtest.rhcloud.com/data-web/rs/nessdata/getchildrenextcode/" + LA_extcode;
   $(document).ready(function(){
      $.getJSON(childUrl, function(res1){
	    if (res1['children'] && res1['children'].empty === 0) {
           // do stuff when no features were found
		   $('#redbox').toggle(); 
	       $('#bluebox').toggle();
	   	   $('#titlebox').toggle();
	   	   $('#nav-search').attr('placeholder',"Search postcode or place name in England and Wales"); 
	   	   $('#map').toggle();
	    }  
       
	    else {
			// get the children and parent details for the selected area(extcode)  
		    childarealist = res1['children'];	
		    
		    if(search === 'name'){
	          // name search call - require parent info		   			    	
	    	  var parentUrl = "http://onsdata-glassfishtest.rhcloud.com/data-web/rs/nessdata/getparent/" + LA_extcode;
	    	  
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
		    	else {
		    		
	    		  CTRY_extcode     = res2.parent.country.extcode;
			      CTRY             = res2.parent.country.name;
			      GOR_extcode	   = res2.parent.region.extcode;
			      GOR     	       = res2.parent.region.name;
			      WD_extcode       = "";
			      WD               = "";
	    		  OA               = "";
	    		  parliCon_extcode = "";
	  		      parliCon         = "";
	  		      health_extcode   = "";
	  		      health           = "";
	  		      childname        = ""; 
	  		      markerEnvelope   = "000000" + ":" + "000000";
		    
	              details = LA + "|" + "LAD11NM" + "|" + "LAD/LAD_DEC_2011_GB_BGC" + "|" + markerEnvelope + "|" + "LAD" + "|" + "LAD11CD" + "|" +
	    	          "" + "|" + LA + "|" + GOR + "|" + CTRY + "|" + ""  + "|" + LA_extcode + "|" + GOR_extcode + "|" + CTRY_extcode + "|" + parliCon + "|" + 
		              health + "|" + parliCon_extcode + "|" + health_extcode  + "|" +
		              childarealist + "|" + "WD11NM" + "|" + "WD11CD" + "|" + "WD/WD_DEC_2011_EW_BGC" + "|" + childname;
	    	
	    	     $("#Tabs").toggle(); //display tabs for data content    	
			
				 //Call createTable for OA
		    	
		    	 if (OA == ""){
				   OA = CTRY_extcode;
				 }  
		    	 
		    	 if (GOR_extcode == ""){
				   GOR_extcode = CTRY_extcode;
				 } 
		    	
				 createTable(LA_extcode, levelname);
				 createReligion(LA_extcode, levelname);
				 getData(OA,LA_extcode,LA,parliCon_extcode,parliCon,WD_extcode,WD,GOR_extcode,GOR,CTRY_extcode,CTRY,health,  levelname, LA, 'popSexGeog');
				 getData(OA,LA_extcode,LA,parliCon_extcode,parliCon,WD_extcode,WD,GOR_extcode,GOR,CTRY_extcode,CTRY,health,  levelname, LA, 'ageGeog');
				 getData(OA,LA_extcode,LA,parliCon_extcode,parliCon,WD_extcode,WD,GOR_extcode,GOR,CTRY_extcode,CTRY,health,  levelname, LA, 'popTime');
				 getData(OA,LA_extcode,LA,parliCon_extcode,parliCon,WD_extcode,WD,GOR_extcode,GOR,CTRY_extcode,CTRY,health,  levelname, LA, 'relGeog');
				 getData(OA,LA_extcode,LA,parliCon_extcode,parliCon,WD_extcode,WD,GOR_extcode,GOR,CTRY_extcode,CTRY,health,  levelname, LA, 'relAgeGeog');
				 getData(OA,LA_extcode,LA,parliCon_extcode,parliCon,WD_extcode,WD,GOR_extcode,GOR,CTRY_extcode,CTRY,health,  levelname, LA, 'relSexGeog');
				 
				 var nameSearch = LA;
				 
			     // Open Geography URL to search for a ward and return its boundaries.
		         // Here it is only searching for Ward Boundaries using service: 'LAD/LAD_DEC_2011_GB_BGC' and layer: 'LAD_DEC_2011_GB_BGC'
			     var url = "https://mapping.statistics.gov.uk/arcgis/rest/services/LAD/LAD_DEC_2011_GB_BGC/MapServer/0/query?where=LAD11CD" + "='" + LA_extcode + "'" + "&text=&objectIds=&time=&geometry=&geometryType=esriGeometryPolygon&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=&returnGeometry=true&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&f=pjson";
			     var queryParams = "LAD11CD" + "='" + LA_extcode + "'";
			    
		         // start process with call to Open Geography to get envelope 
		         getEnvelope(url,queryParams,details,postcode,childname);
		    }  //else    
	      }); // parentUrl
	  });//ready
     } // if(search === 'name	
     else{
    	   OA               = "";
    	   WD               = "";
    	   WD_extcode       = "";
    	   GOR              = $.getUrlVar('gn');
    	   CTRY             = $.getUrlVar('cn');
    	   GOR_extcode      = $.getUrlVar('gc');
    	   CTRY_extcode     = $.getUrlVar('cc');
    	   markerEnvelope   = $.getUrlVar('markerenvelope');
    	   levelname        = $.getUrlVar('levelname');
    	   childname        = $.getUrlVar('childname');
    	   parliCon 		= $.getUrlVar('pn');
    	   health 			= $.getUrlVar('hn');
    	   parliCon_extcode	= $.getUrlVar('pc');
    	   health_extcode 	= $.getUrlVar('hc');
		   
		   details = LA + "|" + "LAD11NM" + "|" + "LAD/LAD_DEC_2011_GB_BGC" + "|" + markerEnvelope + "|" + "LAD" + "|" + "LAD11CD" + "|" +
	          "" + "|" + LA + "|" + GOR + "|" + CTRY + "|" + ""  + "|" + LA_extcode + "|" + GOR_extcode + "|" + CTRY_extcode + "|" + parliCon + "|" + 
              health + "|" + parliCon_extcode + "|" + health_extcode  + "|" +
              childarealist + "|" + "WD11NM" + "|" + "WD11CD" + "|" + "WD/WD_DEC_2011_EW_BGC" + "|" + childname;
		   
		   $("#Tabs").toggle(); //display tabs for data content	    
			
			//Call createTable for OA
			
			 if (OA == ""){
				 OA = CTRY_extcode;
			 }  
			 
			 //temp until we get the data
			 if (parliCon_extcode == ""){
				 parliCon_extcode = CTRY_extcode;
			 }
			 
			//temp until we get the data
			 if (health_extcode == ""){
				 health_extcode = CTRY_extcode;
			 }  
			 
			 if (GOR_extcode == ""){
				 GOR_extcode = CTRY_extcode;
			 }   
			
			 createTable(LA_extcode, levelname);
			 createReligion(LA_extcode, levelname);
			 getData(OA,LA_extcode,LA,parliCon_extcode,parliCon,WD_extcode,WD,GOR_extcode,GOR,CTRY_extcode,CTRY,health,  levelname, LA, 'popSexGeog');
			 getData(OA,LA_extcode,LA,parliCon_extcode,parliCon,WD_extcode,WD,GOR_extcode,GOR,CTRY_extcode,CTRY,health,  levelname, LA, 'ageGeog');
			 getData(OA,LA_extcode,LA,parliCon_extcode,parliCon,WD_extcode,WD,GOR_extcode,GOR,CTRY_extcode,CTRY,health,  levelname, LA, 'popTime');
			 getData(OA,LA_extcode,LA,parliCon_extcode,parliCon,WD_extcode,WD,GOR_extcode,GOR,CTRY_extcode,CTRY,health,  levelname, LA, 'relGeog');
			 getData(OA,LA_extcode,LA,parliCon_extcode,parliCon,WD_extcode,WD,GOR_extcode,GOR,CTRY_extcode,CTRY,health,  levelname, LA, 'relAgeGeog');
			 getData(OA,LA_extcode,LA,parliCon_extcode,parliCon,WD_extcode,WD,GOR_extcode,GOR,CTRY_extcode,CTRY,health,  levelname, LA, 'relSexGeog');
			
			// Open Geography URL to search for a ward and return its boundaries.
	        // Here it is only searching for Ward Boundaries using service: 'LAD/LAD_DEC_2011_GB_BGC' and layer: 'LAD_DEC_2011_GB_BGC'
		    var url = "https://mapping.statistics.gov.uk/arcgis/rest/services/LAD/LAD_DEC_2011_GB_BGC/MapServer/0/query?where=LAD11CD" + "='" + LA_extcode + "'" + "&text=&objectIds=&time=&geometry=&geometryType=esriGeometryPolygon&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=&returnGeometry=true&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&f=pjson";
		    var queryParams = "LAD11CD" + "='" + LA_extcode + "'";
		    
	        // start process with call to Open Geography to get envelope 
	        getEnvelope(url,queryParams,details,postcode,childname);
	         }	
	   	   }//else
	    });//childurl
	  });//ready
 }//else (LAD_extcode == null || LAD_extcode.length == 0 || typeof LAD_extcode === 'undefined') 
});//$(window).load(function(){
}//end of function		  

function GOR_areaDetails(search){
	
	postcode = $.getUrlVar('nav-search');
	
	var areaId, envelope, markerEnvelope, GOR, CTRY, levelname; 
    var GOR_extcode, CTRY_extcode, childname, childarealist;
    
    if(search === 'name'){
	     // name search call	  
	   GOR_extcode       = $.getUrlVar('areacode');
	   GOR               = $.getUrlVar('nav-search');
	   levelname         = $.getUrlVar('levelname');	  
    } 
    else {		   
	  GOR_extcode       = $.getUrlVar('areacode');
	  GOR               = decodeName($.getUrlVar('areaname'));
    }
    
    if (GOR_extcode == null || GOR_extcode.length == 0 || typeof GOR_extcode === 'undefined') {
       	// load default home page
       	$(document).ready(function(){				
    	   homePageBoxes(searchtext);				
    	});
    }    
    else {    	
		 var childUrl = "http://onsdata-glassfishtest.rhcloud.com/data-web/rs/nessdata/getchildrenextcode/" + GOR_extcode;
	    
	     $(document).ready(function(){		
 		   $.getJSON(childUrl, function(res1){
 			  
 			  if (res1['children'] && res1['children'].empty === 0) {
 		          // do stuff when no features were found
 				  $('#redbox').toggle(); 
 			      $('#bluebox').toggle();
 			   	  $('#titlebox').toggle();
 			   	  $('#nav-search').attr('placeholder',"Search postcode or place name in England and Wales"); 
 			   	  $('#map').toggle();
 		   }
           else
	          {	
	    	  // get the children and parent details for the selected area(extcode)
		      childarealist = res1['children'];		   			     
		      
		      if(search === 'name'){
		          // name search call - require parent info		   			    	
		    	  var parentUrl = "http://onsdata-glassfishtest.rhcloud.com/data-web/rs/nessdata/getparent/" + GOR_extcode;
	
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
						    CTRY_extcode     = res2.parent.country.extcode;
		    			    CTRY             = res2.parent.country.name;
		    			   // GOR_extcode	     = res2.parent.region.extcode;
		    			   // GOR     	     = res2.parent.region.name;		    		        
		    		        OA               = "";
		    		        WD               = "";
		    		        WD_extcode       = "";
		    		        LA               = "";
		    		        LA_extcode       = "";	    		        
		    		        parliCon_extcode = "";
			    		    parliCon         = "";
			    		    health_extcode   = "";
			    		    health           = "";
			    		    childname        = ""; 
			    		    markerEnvelope   = "000000" + ":" + "000000";
		    		       // extCode          = res2.parent.
		    		       // OA               = res2.parent.
		    		       // parliCon_extcode = res2.parent.pcon.extcode;
		    		       // parliCon         = res2.parent.pcon.name;
		    		       // health_extcode   = res2.parent.ccg.extcode;
		    		       // health           = res2.parent.ccg.name;
			    		   					    		    
			    		    details = GOR + "|" + "GOR10NM" + "|" + "GOR/GOR_DEC_2010_EN_BGC" + "|" + markerEnvelope + "|" + "GOR" + "|" + "GOR10CD" + "|" +
			                          "" + "|" + "" + "|" + GOR + "|" + CTRY + "|" + ""  + "|" + "" + "|" + GOR_extcode + "|" + CTRY_extcode + "|" + parliCon + 
			                          "|" + health + "|" + parliCon_extcode + "|" + health_extcode + "|" +
			                          childarealist + "|" + "LAD11NM" + "|" + "LAD11CD" + "|" + "LAD/LAD_DEC_2011_GB_BGC" + "|" + childname;	
			    		    
			    		    $("#Tabs").toggle(); //display tabs for data content	    
							
							//Call createTable for OA
							
							 if (OA == ""){
								 OA = CTRY_extcode;
							 }  
							 
							 //temp until we get the data
							 if (parliCon_extcode == ""){
								 parliCon_extcode = CTRY_extcode;
							 }
							 
							//temp until we get the data
							 if (health_extcode == ""){
								 health_extcode = CTRY_extcode;
							 }  
							 
							 if (GOR_extcode == ""){
								 GOR_extcode = CTRY_extcode;
							 }	
							 
							 createTable(GOR_extcode, levelname);
							 createReligion(GOR_extcode, levelname);
							 getData(OA,LA_extcode,LA,parliCon_extcode,parliCon,WD_extcode,WD,GOR_extcode,GOR,CTRY_extcode,CTRY,health,levelname,LA,'popSexGeog');
							 getData(OA,LA_extcode,LA,parliCon_extcode,parliCon,WD_extcode,WD,GOR_extcode,GOR,CTRY_extcode,CTRY,health,levelname,LA,'ageGeog');
							 getData(OA,LA_extcode,LA,parliCon_extcode,parliCon,WD_extcode,WD,GOR_extcode,GOR,CTRY_extcode,CTRY,health,levelname,LA,'popTime');
							 getData(OA,LA_extcode,LA,parliCon_extcode,parliCon,WD_extcode,WD,GOR_extcode,GOR,CTRY_extcode,CTRY,health,levelname,LA,'relGeog');
							 getData(OA,LA_extcode,LA,parliCon_extcode,parliCon,WD_extcode,WD,GOR_extcode,GOR,CTRY_extcode,CTRY,health,levelname,LA,'relAgeGeog');
							 getData(OA,LA_extcode,LA,parliCon_extcode,parliCon,WD_extcode,WD,GOR_extcode,GOR,CTRY_extcode,CTRY,health,levelname,LA,'relSexGeog');
							
			    		     var nameSearch = GOR;
			    		    
			    		     // Open Geography URL to search for a region and return its boundaries.
			    		     // Here it is only searching for region Boundaries using service: 'GOR/GOR_DEC_2010_EN_BGC' and layer: 'GOR_DEC_2010_EN_BGC'
			    		     var url         = "https://mapping.statistics.gov.uk/arcgis/rest/services/GOR/GOR_DEC_2010_EN_BGC/MapServer/0/query?where=GOR10CD" + "='" + GOR_extcode + "'" + "&text=&objectIds=&time=&geometry=&geometryType=esriGeometryPolygon&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=&returnGeometry=true&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&f=pjson";
			   			     var queryParams = "GOR10CD" + "='" + GOR_extcode + "'";
			   			     
			   			     // start process with call to Open Geography to get envelope				   			  
			   			     getEnvelope(url,queryParams,details,nameSearch,childname);
		    			}  //else
		    	   }); // parentUrl
		       }); // ready
	      } //	if(search === 'name
	  else {
		    OA               = "";
		    WD               = "";
		    WD_extcode       = "";
		    LA               = "";
		    LA_extcode       = "";
		    GOR              = $.getUrlVar('areaname');
		    CTRY             = $.getUrlVar('cn');
		    GOR_extcode      = $.getUrlVar('areacode');
		    CTRY_extcode     = $.getUrlVar('cc');
		    markerEnvelope   = $.getUrlVar('markerenvelope');
		    levelname        = $.getUrlVar('levelname');
		    childname        = $.getUrlVar('childname');
		    parliCon 		 = $.getUrlVar('pn');
		    health 			 = $.getUrlVar('hn');
		    parliCon_extcode = $.getUrlVar('pc');
		    health_extcode 	 = $.getUrlVar('hc');
		   
		    details = GOR + "|" + "GOR10NM" + "|" + "GOR/GOR_DEC_2010_EN_BGC" + "|" + markerEnvelope + "|" + "GOR" + "|" + "GOR10CD" + "|" +
              "" + "|" + "" + "|" + GOR + "|" + CTRY + "|" + ""  + "|" + "" + "|" + GOR_extcode + "|" + CTRY_extcode + "|" + parliCon + 
              "|" + health + "|" + parliCon_extcode + "|" + health_extcode + "|" +
              childarealist + "|" + "LAD11NM" + "|" + "LAD11CD" + "|" + "LAD/LAD_DEC_2011_GB_BGC" + "|" + childname;	
		   
		    $("#Tabs").toggle(); //display tabs for data content	    
			
		    //Call createTable for OA					
		    if (OA == ""){
			  OA = CTRY_extcode;
		    } 
		 
		    if (GOR_extcode == ""){
			  GOR_extcode = CTRY_extcode;
		    }   
		
			createTable(GOR_extcode, levelname);
			createReligion(GOR_extcode, levelname);	
			getData(OA,LA_extcode,LA,parliCon_extcode,parliCon,WD_extcode,WD,GOR_extcode,GOR,CTRY_extcode,CTRY,health,levelname,WD,'popSexGeog');
			getData(OA,LA_extcode,LA,parliCon_extcode,parliCon,WD_extcode,WD,GOR_extcode,GOR,CTRY_extcode,CTRY,health,levelname,WD,'ageGeog');
			getData(OA,LA_extcode,LA,parliCon_extcode,parliCon,WD_extcode,WD,GOR_extcode,GOR,CTRY_extcode,CTRY,health,levelname,WD,'popTime');
			getData(OA,LA_extcode,LA,parliCon_extcode,parliCon,WD_extcode,WD,GOR_extcode,GOR,CTRY_extcode,CTRY,health,levelname,WD,'relGeog');
			getData(OA,LA_extcode,LA,parliCon_extcode,parliCon,WD_extcode,WD,GOR_extcode,GOR,CTRY_extcode,CTRY,health,levelname,WD,'relAgeGeog');
			getData(OA,LA_extcode,LA,parliCon_extcode,parliCon,WD_extcode,WD,GOR_extcode,GOR,CTRY_extcode,CTRY,health,levelname,WD,'relSexGeog');
			
			var url         = "https://mapping.statistics.gov.uk/arcgis/rest/services/GOR/GOR_DEC_2010_EN_BGC/MapServer/0/query?where=GOR10CD" + "='" + GOR_extcode + "'" + "&text=&objectIds=&time=&geometry=&geometryType=esriGeometryPolygon&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=&returnGeometry=true&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&f=pjson";
			var queryParams = "GOR10CD" + "='" + GOR_extcode + "'";
		    getEnvelope(url,queryParams,details,postcode,childname);
         }	
       }//else
     });//childurl
   });//ready
  }//else (GOR_extcode == null || GOR_extcode.length == 0 || typeof GOR_extcode === 'undefined' 
}//end of function	

function CTRY_areaDetails(search,postcode){
  $(window).load(function(){
	  
	postcode = $.getUrlVar('nav-search');
	
	var areaId, envelope, markerEnvelope, CTRY, levelname; 
    var CTRY_extcode, childname, childarealist;
    
    if(search === 'name'){
	   // name search call	  
	   CTRY_extcode      = $.getUrlVar('areacode');
	   CTRY              = $.getUrlVar('nav-search');	   
	   OA                = "";
	   WD                = "";
	   WD_extcode        = "";
	   LA                = "";
       LA_extcode        = "";
       GOR               = "";
	   GOR_extcode       = "";
	   markerEnvelope    = "000000" + ":" + "000000";
	   levelname         = $.getUrlVar('levelname');
	   childname         = "";
	   parliCon 		 = "";
	   health 		     = "";
	   parliCon_extcode  = "";
	   health_extcode    = "";
   } 
   else {
	  // postcode search call	 
	  CTRY_extcode       = $.getUrlVar('areacode');
	  CTRY               = decodeName($.getUrlVar('areaname'));
	  OA                 = "";
	  WD                 = "";
	  WD_extcode         = "";
	  LA                 = "";
      LA_extcode         = "";
      GOR                = "";
	  GOR_extcode        = "";
	  markerEnvelope     = $.getUrlVar('markerenvelope');
	  levelname          = $.getUrlVar('levelname');
	  childname          = $.getUrlVar('childname');
	  parliCon 		     = $.getUrlVar('pn');
	  health 		     = $.getUrlVar('hn');
	  parliCon_extcode   = $.getUrlVar('pc');
	  health_extcode     = $.getUrlVar('hc');
   }
    
   if (CTRY_extcode == null || CTRY_extcode.length == 0 || typeof CTRY_extcode === 'undefined') {
	   // load default home page
	   $(document).ready(function(){				
	     homePageBoxes(searchtext);				
	   });
   }    
   else {  
	   
	   var childUrl = "http://onsdata-glassfishtest.rhcloud.com/data-web/rs/nessdata/getchildrenextcode/" + CTRY_extcode;
	    
	   $(document).ready(function(){		
	     $.getJSON(childUrl, function(res1){
			  
		 if (res1['children'] && res1['children'].empty === 0) {
	        // do stuff when no features were found
		    $('#redbox').toggle(); 
		    $('#bluebox').toggle();
		    $('#titlebox').toggle();
		   	$('#nav-search').attr('placeholder',"Search postcode or place name in England and Wales"); 
		    $('#map').toggle();
		 }
         else {	
	       // get the children and parent details for the selected area(extcode)
		   childarealist = res1['children'];	
		   
		   details = CTRY + "|" + "CTRY11NM" + "|" + "CTRY/CTRY_DEC_2011_GB_BGC" + "|" + markerEnvelope + "|" + "CTRY" + "|" + "CTRY11CD" + "|" +
                     "" + "|" + "" + "|" + "" + "|" + CTRY + "|" + ""  + "|" + "" + "|" + ""  + "|" + CTRY_extcode + "|" +
                     parliCon + "|" + health + "|"  + parliCon_extcode + "|" + health_extcode + "|" +
                     childarealist;
				
		   if(CTRY === "Wales"){			   
			 details = details +  "|" + "LAD11NM" + "|" + "LAD11CD" + "|" + "LAD/LAD_DEC_2011_GB_BGC" + "|" + childname; 
		  }
		  else{
			 details = details +  "|" + "GOR10NM" + "|" + "GOR10CD" + "|" + "GOR/GOR_DEC_2010_EN_BGC" + "|" + childname;
		  }	    	
		
		  $("#Tabs").toggle(); //display tabs for data content
		
		  //Call createTable for OA
		  if (OA == ""){
		    OA = CTRY_extcode;
		  }  
		 
		  if (GOR_extcode == ""){
		    GOR_extcode = CTRY_extcode;
		  } 
		
		  createTable(CTRY_extcode, levelname);
		  createReligion(CTRY_extcode, levelname);
		  getData(OA,LA_extcode,LA,parliCon_extcode,parliCon,WD_extcode,WD,GOR_extcode,GOR,CTRY_extcode,CTRY,health,  levelname, CTRY, 'popSexGeog');
		  getData(OA,LA_extcode,LA,parliCon_extcode,parliCon,WD_extcode,WD,GOR_extcode,GOR,CTRY_extcode,CTRY,health,  levelname, CTRY, 'ageGeog');
		  getData(OA,LA_extcode,LA,parliCon_extcode,parliCon,WD_extcode,WD,GOR_extcode,GOR,CTRY_extcode,CTRY,health,  levelname, CTRY, 'popTime');
		  getData(OA,LA_extcode,LA,parliCon_extcode,parliCon,WD_extcode,WD,GOR_extcode,GOR,CTRY_extcode,CTRY,health,  levelname, CTRY, 'relGeog');
		  getData(OA,LA_extcode,LA,parliCon_extcode,parliCon,WD_extcode,WD,GOR_extcode,GOR,CTRY_extcode,CTRY,health,  levelname, CTRY, 'relAgeGeog');
		  getData(OA,LA_extcode,LA,parliCon_extcode,parliCon,WD_extcode,WD,GOR_extcode,GOR,CTRY_extcode,CTRY,health,  levelname, CTRY, 'relSexGeog');
		 
		  // Open Geography URL to search for a ward and return its boundaries.
		  // Here it is only searching for Ward Boundaries using service: 'CTRY/CTRY_DEC_2011_GB_BGC' and layer: 'CTRY_DEC_2011_GB_BGC'
		  var url = "https://mapping.statistics.gov.uk/arcgis/rest/services/CTRY/CTRY_DEC_2011_GB_BGC/MapServer/0/query?where=CTRY11CD" + "='" + CTRY_extcode + "'" + "&text=&objectIds=&time=&geometry=&geometryType=esriGeometryPolygon&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=&returnGeometry=true&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&f=pjson";
		  var queryParams = "CTRY11CD" + "='" + CTRY_extcode + "'";
		  
		  // start process with call to Open Geography to get envelope 
		  getEnvelope(url,queryParams,details,postcode,childname);
       } // else res1['children'] && res1['children'].empty === 0)
    });//childUrl    
   });//ready
  }//else (CTRY_extcode == null || CTRY_extcode.length == 0 || typeof CTRY_extcode === 'undefined' 
 });
}

// populate area details
// OA details
function  OA_pcode_details(postcode,queryExtent) {	
	var levelname;
	levelname = $.getUrlVar('levelname');	
	
	var areaId, envelope, extCode, markerEnvelope, health, parliCon, OA, LA, GOR, CTRY, WD, OA_AreaId, LA_AreaId, GOR_AreaId,  CTRY_AreaId, health_AreaId, parliCon_AreaId;
	var WD_AreaId, WD_extcode, LA_extcode, GOR_extcode, CTRY_extcode, health_extcode, parliCon_extcode;
	var doterm;
	
	// get layer info for postcode
	var pcUrl     = "http://onsdata-glassfishtest.rhcloud.com/data-web/rs/nessdata/getpostcode/" + postcode;
	$(document).ready(function(){		
	  $.getJSON(pcUrl, function(result) {		  
		  
		if (result.features && result.features.length === 0) {
            // do stuff when no features were found
			$('#redbox').toggle(); 
	    	$('#bluebox').toggle();
	   		$('#titlebox').toggle();
	   		$('#nav-search').attr('placeholder',"Search postcode or place name in England and Wales"); 
	   		$('#map').toggle(); 
        }
		else
		{	
		    CTRY_extcode     = result.features[0].attributes.ctrycd;
		    CTRY             = result.features[0].attributes.ctrynm;
		    GOR_extcode	     = result.features[0].attributes.gorcd;
		    GOR     	     = result.features[0].attributes.gornm;
	        LA_extcode       = result.features[0].attributes.lauacd;
	        LA               = result.features[0].attributes.lauanm;
	        WD_extcode       = result.features[0].attributes.wardcd;
	        WD               = result.features[0].attributes.wardnm;
	        extCode          = result.features[0].attributes.oa11cd;
	        OA               = result.features[0].attributes.oa11cd;
	        parliCon_extcode = result.features[0].attributes.pconcd;
	        parliCon         = result.features[0].attributes.pconnm;
	        health_extcode   = result.features[0].attributes.ccgcd;
	        health           = result.features[0].attributes.ccgnm;
	        markerEnvelope   = result.features[0].attributes.oaeast1m + ":" + result.features[0].attributes.oanrth1m;
	        doterm           = result.features[0].attributes.doterm; 	
	                
	        // check to see if postcode not obsolete (doterm === null valid)
	        if(doterm == "") {         	
		        var queryExtent;       
		    	
		    	require([ 
		    	         "esri/geometry/Extent",    	         
		    	         "esri/graphic",	        
		    	         "esri/tasks/query",
		    	         "esri/tasks/QueryTask",
		    	         "dojo/domReady!"		
		
		    	         ], function( 
		    	        	   Extent, Graphic, Query, QueryTask
		    	         ) 
		    	        {    		
		    	   
				    	    var query,QueryTask;    	     
				    	    var oAUrl = "https://mapping.statistics.gov.uk/arcgis/rest/services/OA/OA_2011_EW_BGC_V2/MapServer/0/query?where=where=OA11CD" + "='" + extCode + "'" + "&text=&objectIds=&time=&geometry=&geometryType=esriGeometryPoint&inSR=27700&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&maxAllowableOffset=&geometryPrecision=&outSR=27700&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&f=pjson";	       
				    	    var queryTask = new esri.tasks.QueryTask(oAUrl);
				    	    var query = new Query();	    
				    	    query.where = "OA11CD" + "='" + extCode + "'";
				    	    query.outSpatialReference = new esri.SpatialReference({ wkid: 27700 });
				    	    query.returnGeometry = true;
				    	    
				    	    queryTask.execute(query, function (featureSet) {
					            //get the feature and it's extent then set the map to that extent
					            var feature = featureSet.features[0];
					            var extentPoly = new esri.geometry.Polygon(new esri.SpatialReference({ wkid: 27700 }));
					
					            for (var i = 0; i < feature.geometry.rings.length; i++) {
					              extentPoly.addRing(feature.geometry.rings[i]);
					            }
					            
					            var xmin_env      = extentPoly.getExtent().xmin;
					    		var ymin_env      = extentPoly.getExtent().ymin;
					    		var xmax_env      = extentPoly.getExtent().xmax;
					    		var ymax_env      = extentPoly.getExtent().ymax;
					    		
					    		var diff = xmax_env-xmin_env;
					    		newxmin  = xmin_env - diff;    		
					            queryExtent = new esri.geometry.Extent({xmin:newxmin,ymin:ymin_env,xmax:xmax_env,ymax:ymax_env,spatialReference:{wkid:27700}});			      		    
									      										
							    if(CTRY === "Wales"){
								   details = OA + "|" + "" + "|" + "OA/OA_2011_EW_BGC_V2" + "|" + markerEnvelope + "|" + "OA" + "|" + "OA11CD" + "|" +
								 		     WD + "|" + LA + "|" + GOR + "|" + CTRY  + "|" + WD_extcode + "|" + LA_extcode + "|" +  ""  + "|" + CTRY_extcode + "|" +
								 		     parliCon + "|" + health + "|" + parliCon_extcode + "|" + health_extcode;	
							    }
							    else{
								  details = OA + "|" + "" + "|" + "OA/OA_2011_EW_BGC_V2" + "|" + markerEnvelope + "|" + "OA" + "|" + "OA11CD" + "|" +
										    WD + "|" + LA + "|" + GOR + "|" + CTRY + "|" + WD_extcode + "|" + LA_extcode + "|" + GOR_extcode + "|" + CTRY_extcode + "|" +
										    parliCon + "|" + health + "|" + parliCon_extcode + "|" + health_extcode;	 	              
							    }
				  
							    $("#Tabs").toggle(); //display tabs for data content
				
							    //Call createTable for OA
							    createTable(OA, levelname);
							    createReligion(OA, levelname);	
						        getData(OA,LA_extcode,LA,parliCon_extcode,parliCon,WD_extcode,WD,GOR_extcode,GOR,CTRY_extcode,CTRY,health, levelname, OA, 'popSexGeog');
						        getData(OA,LA_extcode,LA,parliCon_extcode,parliCon,WD_extcode,WD,GOR_extcode,GOR,CTRY_extcode,CTRY,health, levelname, OA, 'ageGeog');
						        getData(OA,LA_extcode,LA,parliCon_extcode,parliCon,WD_extcode,WD,GOR_extcode,GOR,CTRY_extcode,CTRY,health, levelname, OA, 'popTime');
						        getData(OA,LA_extcode,LA,parliCon_extcode,parliCon,WD_extcode,WD,GOR_extcode,GOR,CTRY_extcode,CTRY,health, levelname, OA, 'relGeog');
						        getData(OA,LA_extcode,LA,parliCon_extcode,parliCon,WD_extcode,WD,GOR_extcode,GOR,CTRY_extcode,CTRY,health, levelname, OA, 'relAgeGeog');
						        getData(OA,LA_extcode,LA,parliCon_extcode,parliCon,WD_extcode,WD,GOR_extcode,GOR,CTRY_extcode,CTRY,health, levelname, OA, 'relSexGeog');
				              						 	    			     
						        highlightMap(details,postcode,queryExtent);
			    	       })//queryTask.execute   
			           }// ready  
	       )}  // check to see if postcode not obsolete (doterm === null valid)
	       else {
	    	   $('#redbox').toggle(); 
	    	   $('#bluebox').toggle();
	   		   $('#titlebox').toggle();
	   		   $('#nav-search').attr('placeholder',"Search postcode or place name in England and Wales"); 
	   		   $('#map').toggle();
	       }// postcode obsolete 
		} // if (result.features && result.features.length === 0)      
	})//pcUrl
  })//ready	  
} //OA_pcode_details function


function detailsObj(name) {
	var encodetxt = encodeURIComponent(name);
	return encodetxt;
}

//Read a user input postcode and strip of plus signs,
// convert to uppercase and reformat if necessary
function  postcode_reformat(postcode) {
   // strip + sign from postcode string & convert to uppercase
   postcode                     = postcode.replace(/\+/g, '');    	
   var regExp1                  = /^([a-zA-Z]){1}([0-9][0-9]|[0-9]|[a-zA-Z][0-9][a-zA-Z]|[a-zA-Z][0-9][0-9]|[a-zA-Z][0-9]){1}([ ])([0-9][a-zA-z][a-zA-z]){1}$/;
 
   if(regExp1.test(postcode) == false)	
   {	 
	   var regExp2              = /^([A-Z]{1,2}[\dA-Z]{1,2})[ ]?(\d[A-Z]{2})$/i; // case insensitive 

	   var tempPostCode         = postcode.match(regExp2);
	   try {
		   var reformatPostcode     = tempPostCode[1] + " " + tempPostCode[2];
		   return reformatPostcode.toUpperCase();
        } 
        
	    catch ( e ) {
			postcode = "error";
			return postcode;
	    }
	  
   }
   else {
	 // postcode formatted correctly
	 return postcode.toUpperCase();
   }	    	
}

//Read a user input postcode and strip of plus signs,
//convert to uppercase and reformat if necessary
function  name_reformat(placename) {
	// strip + sign from postcode string & convert to uppercase
	placename                = placename.replace(/\+/g, ' ');  
	var regExp1              = /^[a-zA-Z\s]+$/;
	
	if(regExp1.test(placename) == false)	
	{	 
		  
		// to do	  
		placename = "error";
		return placename;
	}
	else {
		 // postcode formatted correctly
		 return placename;
	}	    	
}

$.extend({
	  getUrlVars: function(){
	    var vars = [], hash;
	    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
	    hashes = decodeURI(window.location.href).replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
	        vars[key] = value;
	    });
	    
	    for(var i = 0; i < hashes.length; i++)
	    {
	      hash = hashes[i].split('=');
	      vars.push(hash[0]);
	      vars[hash[0]] = hash[1];
	    }
	    return vars; 
	  },
	  getUrlVar: function(name){		  
	    return $.getUrlVars()[name];
	  }	  
  });

function getEnvelope(url,queryParams,details,searchText,childname) {
	
	require([  
	     "esri/geometry/Extent",			       
	     "esri/graphic",	        
	     "esri/tasks/query",
	     "esri/tasks/QueryTask",
	     "dojo/domReady!"
	    ], function( 
	         Extent, Graphic, Query, QueryTask
	        ) 
	    {
		
		   var query,QueryTask;
		   var queryTask = new esri.tasks.QueryTask(url);
		   var query = new Query();	    
		   query.where = queryParams;
		   query.outSpatialReference = new esri.SpatialReference({ wkid: 27700 });
		   query.returnGeometry = true;
		    			   			    	    
		   queryTask.execute(query, function (featureSet) {
		   //get the feature and it's extent then set the map to that extent
			   var feature = featureSet.features[0];
			   var extentPoly = new esri.geometry.Polygon(new esri.SpatialReference({ wkid: 27700 }));
		
			   for (var i = 0; i < feature.geometry.rings.length; i++) {
			      extentPoly.addRing(feature.geometry.rings[i]);
			   }
			            
			   var xmin_env      = extentPoly.getExtent().xmin;
			   var ymin_env      = extentPoly.getExtent().ymin;
			   var xmax_env      = extentPoly.getExtent().xmax;
			   var ymax_env      = extentPoly.getExtent().ymax;
			    		
			   var diff = xmax_env-xmin_env;
			   newxmin  = xmin_env - diff;    		
			   var queryExtent = new esri.geometry.Extent({xmin:newxmin,ymin:ymin_env,xmax:xmax_env,ymax:ymax_env,spatialReference:{wkid:27700}});
			   
			   if (childname == null || childname.length == 0 ||typeof childname === 'undefined') {
				    highlightMap(details, searchText, queryExtent);
			   }
			   // call hover map
			   else {			   
			      hoverMap(details, searchText, queryExtent);
		       }
	      });
		  
	  });  
}

function encodeName(name) {
	var encodetxt = encodeURIComponent(name);
	return encodetxt;
}
function decodeName(name) {
	var decodetxt = decodeURIComponent(name);
	return decodetxt;
}