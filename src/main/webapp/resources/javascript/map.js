function homePageBoxes(postcode){
	if(postcode == null || postcode.length == 0  || typeof postcode === 'undefined')
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
   var markerEnvelope, LA, GOR, CTRY, WD, OA, levelname;
   var WD_extcode, LA_extcode, GOR_extcode, CTRY_extcode, OA_extcode, childarealist, childname;  
   var parliCon, parliCon_extcode, health, health_extcode, details;
   
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
   health 			= "";//$.getUrlVar('hn');  
   parliCon_extcode	= $.getUrlVar('pc');
   health_extcode 	= "";//$.getUrlVar('hc');  
   
   $(document).ready(function(){	   

	   details = OA + "|" + "WD11CD" + "|" + "OA/OA_2011_EW_BGC_V2" + "|" + markerEnvelope + "|" + "OA" + "|" + "OA11CD" + "|" +
	        	 WD + "|" + LA + "|" + GOR + "|" + CTRY + "|" + WD_extcode + "|" + LA_extcode + "|" + GOR_extcode + "|" + CTRY_extcode + "|" + parliCon + "|" + health + "|" + 
	   			 parliCon_extcode + "|" + health_extcode + "|"  + childarealist + "|" + "" + "|" + "OA11CD" + "|" + "OA/OA_2011_EW_BGC_V2" + "|" + childname;	    
	   
	   $("#Tabs").toggle(); 
	   
	   //display tabs for data content	   
	   if (GOR_extcode === "") {
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
	   
	   getEnvelope(OA_extcode,details,postcode,childname);	   
    }); // ready
  });
 }

function WD_areaDetails(search){
   $(window).load(function(){
	   
	   var postcode       = $.getUrlVar('nav-search');	
	
	   var OA, LA, GOR, CTRY, WD, health, parliCon;
	   var WD_extcode, LA_extcode, GOR_extcode, CTRY_extcode, health_extcode, parliCon_extcode, levelname, childarealist, childname;
	   var details, markerEnvelope;
	   
	   if(search === 'name'){
	     // name search call 	
		 WD_extcode       = $.getUrlVar('areacode');
		 WD               = decodeName($.getUrlVar('nav-search'));
		 levelname        = $.getUrlVar('levelname');
	   } 
	   else {
		   WD_extcode       = $.getUrlVar('areacode');
		   WD               = decodeName($.getUrlVar('areaname')); 
	   }
	   
	   if (WD_extcode == null || WD_extcode.length == 0 || typeof WD_extcode === 'undefined') {
	    	// load default home page
	    	$(document).ready(function(){
	    		redErrorbox(); 				
			});
	   }
	   else {
			 var childUrl = "http://onsdata-glassfishtest.rhcloud.com/data-web/rs/nessdata/getchildrenextcode/" + WD_extcode;
		    
		     $(document).ready(function(){		
	   		   $.getJSON(childUrl, function(res1){
	   			  
	   			  if (res1.children && res1.children.empty === 0) {
	   		        // do stuff when no features were found
	   				redErrorbox(); 	
	   		      }
	   			  else
	   			  {	
	   		    	  // get the children and parent details for the selected area(extcode)
	   			      childarealist = res1.children;		   			     
	   			      
	   			      if(search === 'name'){
	   			          // name search call - require parent info		   			    	
	   			    	  var parentUrl = "http://onsdata-glassfishtest.rhcloud.com/data-web/rs/nessdata/getparent/" + WD_extcode;
	
				    	  $(document).ready(function(){		
				    	    $.getJSON(parentUrl, function(res2){
				    	    	
				    	    	 if (res2.parent && res2.parent.length === 0) {
				    		         // do stuff when no features were found
				    	    		 redErrorbox(); 	
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
				    		        parliCon_extcode = res2.parent.pcon.extcode;
					    		    parliCon         = res2.parent.pcon.name;
					    		    health_extcode   = "";
					    		    health           = "";
					    		    childname        = ""; 
					    		    markerEnvelope   = "000000" + ":" + "000000";
				    		   					    		   					    		    
					    		    details = WD + "|" + "WD11NM" + "|" + "WD/WD_DEC_2011_EW_BGC" + "|" + markerEnvelope + "|" + "WD" + "|" + "WD11CD" + "|" +
						            WD + "|" + LA + "|" + GOR + "|" + CTRY + "|" + WD_extcode + "|" + LA_extcode + "|" + GOR_extcode + "|" + CTRY_extcode + "|" + parliCon + "|" + health + "|" + 
						            parliCon_extcode + "|" + health_extcode + "|"  + 
						            childarealist + "|" + "" + "|" + "OA11CD" + "|" + "OA/OA_2011_EW_BGC_V2" + "|" + childname;	
					    		    
					    		    $("#Tabs").toggle(); //display tabs for data content	    
									
								    //Call createTable for OA
									
								    if (OA === ""){
										 OA = CTRY_extcode;
								    }	  
									 
									//temp until we get the data
									if (parliCon_extcode === ""){
										 parliCon_extcode = CTRY_extcode;
									}
									 
									//temp until we get the data
									if (health_extcode === ""){
										 health_extcode = CTRY_extcode;
									}  
									 
									if (GOR_extcode === ""){
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
					    		    
					    		    getEnvelope(WD_extcode,details,postcode,childname);
					   			    
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
						   health 			= "";$.getUrlVar('hn');  
						   parliCon_extcode	= $.getUrlVar('pc');
						   health_extcode 	= "";$.getUrlVar('hc');
						   
						   details = WD + "|" + "WD11NM" + "|" + "WD/WD_DEC_2011_EW_BGC" + "|" + markerEnvelope + "|" + "WD" + "|" + "WD11CD" + "|" +
				           WD + "|" + LA + "|" + GOR + "|" + CTRY + "|" + WD_extcode + "|" + LA_extcode + "|" + GOR_extcode + "|" + CTRY_extcode + "|" + parliCon + "|" + health + "|" + 
				           parliCon_extcode + "|" + health_extcode + "|"  + 
				           childarealist + "|" + "" + "|" + "OA11CD" + "|" + "OA/OA_2011_EW_BGC_V2" + "|" + childname;	 
						   
						   $("#Tabs").toggle(); //display tabs for data content	    
							
							//Call createTable for OA
							
							 if (OA === ""){
								 OA = CTRY_extcode;
							 }  
							 
							 //temp until we get the data
							 if (parliCon_extcode === ""){
								 parliCon_extcode = CTRY_extcode;
							 }
							 
							//temp until we get the data
							 if (health_extcode === ""){
								 health_extcode = CTRY_extcode;
							 }  
							 
							 if (GOR_extcode === ""){
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
							
							getEnvelope(WD_extcode,details,postcode,childname);												
	   			    }	
   	   	   }//else
	    });//childurl
	  });//ready
    }//else (WD_extcode == null || WD_extcode.length == 0 || typeof WD_extcode === 'undefined') 
  });//$(window).load(function(){
}//end of function		  
   

function LA_areaDetails(search){	
  $(window).load(function(){
   var postcode       = $.getUrlVar('nav-search');   

   var markerEnvelope, OA, WD, LA, GOR, CTRY, parliCon, health, levelname; 
   var WD_extcode,LA_extcode, GOR_extcode, CTRY_extcode, parliCon_extcode, health_extcode;
   var childarealist, childname, details;
   
   if(search === 'name'){	   
     // name search call 	
     LA_extcode       = $.getUrlVar('areacode');
     LA               = decodeName($.getUrlVar('nav-search'));    
	 levelname        = $.getUrlVar('levelname');
   } 
   else {	  
	   LA_extcode       = $.getUrlVar('areacode');
	   LA               = decodeName($.getUrlVar('areaname'));	 
   }
   
   if (LA_extcode == null || LA_extcode.length == 0 || typeof LA_extcode === 'undefined') {
   	// load default home page
   	$(document).ready(function(){				
   		redErrorbox(); 					
	});
  }
  else {
   var childUrl = "http://onsdata-glassfishtest.rhcloud.com/data-web/rs/nessdata/getchildrenextcode/" + LA_extcode;
   $(document).ready(function(){
      $.getJSON(childUrl, function(res1){
	    if (res1.children && res1.children.empty === 0) {
           // do stuff when no features were found
	       redErrorbox(); 	
	    }  
       
	    else {
			// get the children and parent details for the selected area(extcode)  
		    childarealist = res1.children;	
		    
		    if(search === 'name'){
	          // name search call - require parent info		   			    	
	    	  var parentUrl = "http://onsdata-glassfishtest.rhcloud.com/data-web/rs/nessdata/getparent/" + LA_extcode;
	    	  
	    	  $(document).ready(function(){		
	    	    $.getJSON(parentUrl, function(res2){
	    	    	
		    	if (res2.parent && res2.parent.length === 0) {
		            // do stuff when no features were found
		    		redErrorbox(); 	
			    }
		    	else {
		    		
	    		  CTRY_extcode     = res2.parent.country.extcode;
			      CTRY             = res2.parent.country.name;
			      GOR_extcode	   = res2.parent.region.extcode;
			      GOR     	       = res2.parent.region.name;
			      WD_extcode       = "";
			      WD               = "";
	    		  OA               = "";
	    		  parliCon_extcode = res2.parent.pcon.extcode;
   		          parliCon         = res2.parent.pcon.name;
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
		    	
		    	 if (OA === ""){
				   OA = CTRY_extcode;
				 }  
		    	 
		    	 if (GOR_extcode === ""){
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
				 
				 getEnvelope(LA_extcode,details,postcode,childname);
				 
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
    	   health 			= "";//$.getUrlVar('hn');
    	   parliCon_extcode	= $.getUrlVar('pc');
    	   health_extcode 	= "";//$.getUrlVar('hc');
		   
		   details = LA + "|" + "LAD11NM" + "|" + "LAD/LAD_DEC_2011_GB_BGC" + "|" + markerEnvelope + "|" + "LAD" + "|" + "LAD11CD" + "|" +
	          "" + "|" + LA + "|" + GOR + "|" + CTRY + "|" + ""  + "|" + LA_extcode + "|" + GOR_extcode + "|" + CTRY_extcode + "|" + parliCon + "|" + 
              health + "|" + parliCon_extcode + "|" + health_extcode  + "|" +
              childarealist + "|" + "WD11NM" + "|" + "WD11CD" + "|" + "WD/WD_DEC_2011_EW_BGC" + "|" + childname;
		   
		   $("#Tabs").toggle(); //display tabs for data content	    
			
			//Call createTable for OA
			
			 if (OA === ""){
				 OA = CTRY_extcode;
			 }  
			 
			 //temp until we get the data
			 if (parliCon_extcode === ""){
				 parliCon_extcode = CTRY_extcode;
			 }
			 
			//temp until we get the data
			 if (health_extcode === ""){
				 health_extcode = CTRY_extcode;
			 }  
			 
			 if (GOR_extcode === ""){
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
			
			 getEnvelope(LA_extcode,details,postcode,childname);
			
	         }	
	   	   }//else
	    });//childurl
	  });//ready
 }//else (LAD_extcode == null || LAD_extcode.length == 0 || typeof LAD_extcode === 'undefined') 
});//$(window).load(function(){
}//end of function		  

function GOR_areaDetails(search){
	
	var postcode = $.getUrlVar('nav-search');
	
	var markerEnvelope, OA, WD, LA, GOR, health, CTRY, parliCon,levelname; 
    var WD_extcode, LA_extcode, GOR_extcode, parliCon_extcode, health_extcode, CTRY_extcode, childname, childarealist;
    var details;
  
    if(search === 'name'){
	     // name search call	  
	   GOR_extcode       = $.getUrlVar('areacode');
	   GOR               = decodeName($.getUrlVar('nav-search'));
	   levelname         = $.getUrlVar('levelname');	  
    } 
    else {		   
	  GOR_extcode       = $.getUrlVar('areacode');
	  GOR               = decodeName($.getUrlVar('areaname'));
    }
    
    if (GOR_extcode == null || GOR_extcode.length == 0 || typeof GOR_extcode === 'undefined') {
       	// load default home page
       	$(document).ready(function(){				
       		redErrorbox(); 					
    	});
    }    
    else {    	
		 var childUrl = "http://onsdata-glassfishtest.rhcloud.com/data-web/rs/nessdata/getchildrenextcode/" + GOR_extcode;
	    
	     $(document).ready(function(){		
 		   $.getJSON(childUrl, function(res1){
 			  
 			  if (res1.children && res1.children.empty === 0) {
 		         // do stuff when no features were found
 				 redErrorbox(); 	
 		   }
           else
	          {	
	    	  // get the children and parent details for the selected area(extcode)
		      childarealist = res1.children;		   			     
		      
		      if(search === 'name'){
		          // name search call - require parent info		   			    	
		    	  var parentUrl = "http://onsdata-glassfishtest.rhcloud.com/data-web/rs/nessdata/getparent/" + GOR_extcode;
	
		    	  $(document).ready(function(){		
		    	    $.getJSON(parentUrl, function(res2){
		    	    	
		    	      if (res2.parent && res2.parent.length === 0) {
	  		             // do stuff when no features were found
		    	    	 redErrorbox(); 	
		    		  }
		    		  else
		    			 {	
						    CTRY_extcode     = res2.parent.country.extcode;
		    			    CTRY             = res2.parent.country.name;		    			   	    		        
		    		        OA               = "";
		    		        WD               = "";
		    		        WD_extcode       = "";
		    		        LA               = "";
		    		        LA_extcode       = "";	    		        
		    		        parliCon_extcode = res2.parent.pcon.extcode;
			    		    parliCon         = res2.parent.pcon.name;
			    		    health_extcode   = "";
			    		    health           = "";
			    		    childname        = ""; 
			    		    markerEnvelope   = "000000" + ":" + "000000";		    		     
			    		   					    		    
			    		    details = GOR + "|" + "GOR10NM" + "|" + "GOR/GOR_DEC_2010_EN_BGC" + "|" + markerEnvelope + "|" + "GOR" + "|" + "GOR10CD" + "|" +
			                          "" + "|" + "" + "|" + GOR + "|" + CTRY + "|" + ""  + "|" + "" + "|" + GOR_extcode + "|" + CTRY_extcode + "|" + parliCon + 
			                          "|" + health + "|" + parliCon_extcode + "|" + health_extcode + "|" +
			                          childarealist + "|" + "LAD11NM" + "|" + "LAD11CD" + "|" + "LAD/LAD_DEC_2011_GB_BGC" + "|" + childname;	
			    		    
			    		    $("#Tabs").toggle(); //display tabs for data content	    
							
							//Call createTable for OA
							
							 if (OA === ""){
								 OA = CTRY_extcode;
							 }  
							 
							 //temp until we get the data
							 if (parliCon_extcode === ""){
								 parliCon_extcode = CTRY_extcode;
							 }
							 
							//temp until we get the data
							 if (health_extcode === ""){
								 health_extcode = CTRY_extcode;
							 }  
							 
							 if (GOR_extcode === ""){
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
										    		     
			    		     getEnvelope(GOR_extcode,details,postcode,childname);			    		    
			    		     
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
		    health 			 = "";//$.getUrlVar('hn');
		    parliCon_extcode = $.getUrlVar('pc');
		    health_extcode 	 = "";//$.getUrlVar('hc');
		   
		    details = GOR + "|" + "GOR10NM" + "|" + "GOR/GOR_DEC_2010_EN_BGC" + "|" + markerEnvelope + "|" + "GOR" + "|" + "GOR10CD" + "|" +
              "" + "|" + "" + "|" + GOR + "|" + CTRY + "|" + ""  + "|" + "" + "|" + GOR_extcode + "|" + CTRY_extcode + "|" + parliCon + 
              "|" + health + "|" + parliCon_extcode + "|" + health_extcode + "|" +
              childarealist + "|" + "LAD11NM" + "|" + "LAD11CD" + "|" + "LAD/LAD_DEC_2011_GB_BGC" + "|" + childname;	
		   
		    $("#Tabs").toggle(); //display tabs for data content	    
			
		    //Call createTable for OA					
		    if (OA === ""){
			  OA = CTRY_extcode;
		    } 
		 
		    if (GOR_extcode === ""){
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
			
			getEnvelope(GOR_extcode,details,postcode,childname);
         }	
       }//else
     });//childurl
   });//ready
  }//else (GOR_extcode == null || GOR_extcode.length == 0 || typeof GOR_extcode === 'undefined' 
}//end of function	

function CTRY_areaDetails(search,postcode){
  $(window).load(function(){
	  
	postcode = $.getUrlVar('nav-search');
	
	var markerEnvelope, OA, CTRY, WD, LA, GOR, parliCon, health, levelname; 
  var WD_extcode, LA_extcode, GOR_extcode, CTRY_extcode, parliCon_extcode, health_extcode, childname, childarealist;
  var details;
    
    if(search === 'name'){
	   // name search call.	 "" on variables indicates not required (no parent info) 
	   CTRY_extcode      = $.getUrlVar('areacode');
	   CTRY              = decodeName($.getUrlVar('nav-search'));	   
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
	  health 		     = "";//$.getUrlVar('hn');
	  parliCon_extcode   = $.getUrlVar('pc');
	  health_extcode     = "";//$.getUrlVar('hc');
   }
    
   if (CTRY_extcode == null || CTRY_extcode.length == 0 || typeof CTRY_extcode === 'undefined') {
	   // load default home page
	   $(document).ready(function(){				
		   redErrorbox(); 					
	   });
   }    
   else {  
	   
	   var childUrl = "http://onsdata-glassfishtest.rhcloud.com/data-web/rs/nessdata/getchildrenextcode/" + CTRY_extcode;
	    
	   $(document).ready(function(){		
	     $.getJSON(childUrl, function(res1){
			  
		 if (res1.children && res1.children.empty === 0) {
	        // do stuff when no features were found
			 redErrorbox(); 	
		 }
         else {	
	       // get the children and parent details for the selected area(extcode)
		   childarealist = res1.children;	
		   
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
		  if (OA === ""){
		    OA = CTRY_extcode;
		  }  
		 
		  if (GOR_extcode === ""){
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
		  
		  getEnvelope(CTRY_extcode,details,postcode,childname);
		 
       } // else res1['children'] && res1['children'].empty === 0)
    });//childUrl    
   });//ready
  }//else (CTRY_extcode == null || CTRY_extcode.length == 0 || typeof CTRY_extcode === 'undefined' 
 });
}

// populate area details
// OA details
function  OA_pcode_details(postcode) {	
	var levelname;
	levelname = $.getUrlVar('levelname');	
	
	var extCode, markerEnvelope, health, parliCon, OA, LA, GOR, CTRY, WD; 
	var WD_extcode, LA_extcode, GOR_extcode, CTRY_extcode, health_extcode, parliCon_extcode;
	var doterm, details;
	
	// get layer info for postcode
	var pcUrl     = "http://onsdata-glassfishtest.rhcloud.com/data-web/rs/nessdata/getpostcode/" + postcode;
	$(document).ready(function(){
	  $.getJSON(pcUrl, function(result) {
		if (result.features && result.features.length === 0) {
            // do stuff when no features were found
			redErrorbox(); 
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
	        health_extcode   = "";//result.features[0].attributes.ccgcd;
	        health           = "";//result.features[0].attributes.ccgnm;
	        markerEnvelope   = result.features[0].attributes.oaeast1m + ":" + result.features[0].attributes.oanrth1m;
	        doterm           = result.features[0].attributes.doterm; 	
	                
	        // check to see if postcode not obsolete (doterm === null valid)
	        if(doterm === "") {         	
	        	// get layer info for postcode
	        	var url     = "http://onsdata-glassfishtest.rhcloud.com/data-web/rs/nessdata/getenvelope/" + extCode;
	        	$(document).ready(function(){
	        	  $.getJSON(url, function(result) {
	        		if (result.envelope && result.envelope.length === 0) {
	                    // do stuff when no features were found
	        			redErrorbox(); 
	                }
	        		else
	        		{	
	        			
									      										
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
		              						 	    			     
				        highlightMap(details,postcode,result.envelope);
			    	      
			        } // else 
	        	  }); // json url	  
	        	}); // $(document).ready
	       }  // check to see if postcode not obsolete (doterm === null valid)
	       else {
	    	   redErrorbox(); 
	       }// postcode obsolete 
		} // if (result.features && result.features.length === 0)      
	})//pcUrl
	.error(function() {  
		redErrorbox(); 
	});

  });//ready	  
} //OA_pcode_details function


function detailsObj(name) {
	var encodetxt = encodeURIComponent(name);
	return encodetxt;
}

function redErrorbox() {
	  $('#redbox').toggle(); 
      $('#bluebox').toggle();
      $('#titlebox').toggle();
      $('#nav-search').attr('placeholder',"Search postcode or place name in England and Wales"); 
      $('#map').toggle(); 
}

//Read a user input postcode and strip of plus signs,
// convert to uppercase and reformat if necessary
function  postcode_reformat(postcode) {
   // strip + sign from postcode string & convert to uppercase
   postcode                     = postcode.replace(/\+/g, '');    	
   var regExp1                  = /^([a-zA-Z]){1}([0-9][0-9]|[0-9]|[a-zA-Z][0-9][a-zA-Z]|[a-zA-Z][0-9][0-9]|[a-zA-Z][0-9]){1}([ ])([0-9][a-zA-z][a-zA-z]){1}$/;
 
   if(regExp1.test(postcode) === false)	
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
	var regExp1              = /^[a-zA-Z\s\\&\\'\\:\\/\\(\\)\\!\\,\\-]+$/;  
	
	if(regExp1.test(placename) === false)	
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

function getEnvelope(extcode,details,searchText,childname) {
	
	// get layer info for postcode
	var url     = "http://onsdata-glassfishtest.rhcloud.com/data-web/rs/nessdata/getenvelope/" + extcode;
	$(document).ready(function(){
	  $.getJSON(url, function(result) {
		if (result.envelope && result.envelope.length === 0) {
            // do stuff when no features were found
			redErrorbox(); 
        }
		else
		{	
			
	      if (childname == null || childname.length == 0 ||typeof childname === 'undefined') {
		    highlightMap(details, searchText, result.envelope);
	      }
	      // call hover map
	      else {			   
	        hoverMap(details, searchText, result.envelope);
          }
			  
		} // else
	  }); // json url	  
	}); // $(document).ready 
}

function encodeName(name) {
	var encodetxt = encodeURIComponent(name);
	return encodetxt;
}
function decodeName(name) {
	var decodetxt = decodeURIComponent(name);
	return decodetxt;
}