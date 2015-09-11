function createMap(postcode){
	
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
			
			OA_pcode_details(postcode);
		}
		else{
			if($.getUrlVar('levelname') === 'WD' ) {
			  WD_areaDetails();
			}
			
			if($.getUrlVar('levelname') === 'LAD' ) {
			  LA_areaDetails();
			}
			
			if($.getUrlVar('levelname') === 'GOR' ) {
			  GOR_areaDetails();
			}
			
			if($.getUrlVar('levelname') === 'CTRY' ) {
			  CTRY_areaDetails();
			}
		}
	}	 
}

function WD_areaDetails(){
   var areaId, envelope, markerEnvelope, LA, GOR, CTRY, WD, levelname;
   var WD_extcode, LA_extcode, GOR_extcode, CTRY_extcode ;
   
   WD              = $.getUrlVar('areaname');
   LA              = $.getUrlVar('ln');
   GOR             = $.getUrlVar('gn');
   CTRY            = $.getUrlVar('cn');
   WD_extcode      = $.getUrlVar('areacode');
   LA_extcode      = $.getUrlVar('lc');
   GOR_extcode     = $.getUrlVar('gc');
   CTRY_extcode    = $.getUrlVar('cc');
   markerEnvelope  = $.getUrlVar('markerenvelope');
   levelname       = $.getUrlVar('levelname');
   
   jsonFile1 = "http://onslocalos-glassfishtest.rhcloud.com/resource-web/rs/onslocal/code/" + WD_extcode + "/" + "leveltypeid/14/hierarchyid/30";
   jsonFile2 = "http://onslocalos-glassfishtest.rhcloud.com/resource-web/rs/onslocal/area/";

   $(document).ready(function(){
      $.getJSON(jsonFile1, function(res1){
	     areaId = res1['ns2:SearchAreaByCodeResponseElement'].AreaFallsWithins.AreaFallsWithin.Area.AreaId;	    
	     $.getJSON(jsonFile2 + areaId,function(res2){
	    	envelope = res2['ns2:GetAreaDetailResponseElement'].AreaDetail.Envelope; 	    	
	    	details = envelope + ":" + WD + ":" + "WD12NM" + ":" + "WD/WD_DEC_2012_GB_BGC" + ":" + markerEnvelope + ":" + "WD" + ":" + "WD12CD" + ":" +
		              WD + ":" + LA + ":" + GOR + ":" + CTRY + ":" + WD_extcode + ":" + LA_extcode + ":" + GOR_extcode + ":" + CTRY_extcode;		    
	    	
	    	$("#Tabs").toggle(); //display tabs for data content
				
 			//Call createTable for OA
 			createTable( WD_extcode, levelname);
 			createReligion( WD_extcode, levelname);	
 			getData( WD_extcode, levelname, WD, 'popSexGeog');
			getData( WD_extcode, levelname, WD, 'ageGeog');
			getData( WD_extcode, levelname, WD, 'popTime');
			getData( WD_extcode, levelname, WD, 'relGeog');
			getData( WD_extcode, levelname, WD, 'relAgeGeog');
			getData( WD_extcode, levelname, WD, 'relSexGeog');	
			
	    	highlightMap(details,postcode);	
	    });	//jsonfile1	
	  });//jsonFile2		    
   });//ready
}

function LA_areaDetails(){
   var areaId, envelope, markerEnvelope, LA, GOR, CTRY, levelname; 
   var LA_extcode, GOR_extcode, CTRY_extcode ;
   
   LA              = $.getUrlVar('areaname');
   GOR             = $.getUrlVar('gn');
   CTRY            = $.getUrlVar('cn');
   LA_extcode      = $.getUrlVar('areacode');
   GOR_extcode     = $.getUrlVar('gc');
   CTRY_extcode    = $.getUrlVar('cc');
   markerEnvelope  = $.getUrlVar('markerenvelope');
   levelname       = $.getUrlVar('levelname');
	
   jsonFile1 = "http://onslocalos-glassfishtest.rhcloud.com/resource-web/rs/onslocal/code/" + LA_extcode + "/" + "leveltypeid/13/hierarchyid/26";
   jsonFile2 = "http://onslocalos-glassfishtest.rhcloud.com/resource-web/rs/onslocal/area/";
   $(document).ready(function(){
      $.getJSON(jsonFile1, function(res1){
	     areaId = res1['ns2:SearchAreaByCodeResponseElement'].AreaFallsWithins.AreaFallsWithin.Area.AreaId;	    
	     $.getJSON(jsonFile2 + areaId,function(res2){
	    	envelope = res2['ns2:GetAreaDetailResponseElement'].AreaDetail.Envelope; 	    	
	    	details = envelope + ":" + LA + ":" + "LAD11NM" + ":" + "LAD/LAD_DEC_2011_GB_BGC" + ":" + markerEnvelope + ":" + "LAD" + ":" + "LAD11CD" + ":" +
	    	          " " + ":" + LA + ":" + GOR + ":" + CTRY + ":" + " "  + ":" + LA_extcode + ":" + GOR_extcode + ":" + CTRY_extcode;
	    	
	    	$("#Tabs").toggle(); //display tabs for data content
			
 			//Call createTable for OA
 			createTable(LA_extcode, levelname);
 			createReligion(LA_extcode, levelname);
 			getData(LA_extcode, levelname, LA, 'popSexGeog');
			getData(LA_extcode, levelname, LA, 'ageGeog');
			getData(LA_extcode, levelname, LA, 'popTime');
			getData(LA_extcode, levelname, LA, 'relGeog');
			getData(LA_extcode, levelname, LA, 'relAgeGeog');
			getData(LA_extcode, levelname, LA, 'relSexGeog');
	    	
	    	highlightMap(details,postcode);	
	    });	//jsonfile1	
	  });//jsonFile2		    
   });//ready
}	

function GOR_areaDetails(){
	var areaId, envelope, markerEnvelope, GOR, CTRY, levelname; 
    var GOR_extcode, CTRY_extcode ;
    
    GOR             = $.getUrlVar('areaname');
    CTRY            = $.getUrlVar('cn');
    GOR_extcode     = $.getUrlVar('areacode');
    CTRY_extcode    = $.getUrlVar('cc');
    markerEnvelope  = $.getUrlVar('markerenvelope');
    levelname       = $.getUrlVar('levelname');
	
   jsonFile1 = "http://onslocalos-glassfishtest.rhcloud.com/resource-web/rs/onslocal/code/" + GOR_extcode + "/" + "leveltypeid/11/hierarchyid/26";
   jsonFile2 = "http://onslocalos-glassfishtest.rhcloud.com/resource-web/rs/onslocal/area/";
   $(document).ready(function(){
      $.getJSON(jsonFile1, function(res1){
	     areaId = res1['ns2:SearchAreaByCodeResponseElement'].AreaFallsWithins.AreaFallsWithin.Area.AreaId;	    
	     $.getJSON(jsonFile2 + areaId,function(res2){
	    	envelope = res2['ns2:GetAreaDetailResponseElement'].AreaDetail.Envelope;	    	
	    	details = envelope + ":" + GOR + ":" + "GOR10NM" + ":" + "GOR/GOR_DEC_2010_EN_BGC" + ":" + markerEnvelope + ":" + "GOR" + ":" + "GOR10CD" + ":" +
	          " " + ":" + " " + ":" + " " + ":" + CTRY + ":" + " "  + ":" + " " + ":" + " "  + ":" + CTRY_extcode;
	    	
	    	$("#Tabs").toggle(); //display tabs for data content
			
 			//Call createTable for OA
 			createTable(GOR_extcode, levelname);
 			createReligion(GOR_extcode, levelname);
 		    getData(GOR_extcode, levelname, GOR, 'popSexGeog');
			getData(GOR_extcode, levelname, GOR, 'ageGeog');
			getData(GOR_extcode, levelname, GOR, 'popTime');
			getData(GOR_extcode, levelname, GOR, 'relGeog');
			getData(GOR_extcode, levelname, GOR, 'relAgeGeog');
			getData(GOR_extcode, levelname, GOR, 'relSexGeog');
 			
	    	highlightMap(details,postcode);	
	    });	//jsonfile1	
	  });//jsonFile2		    
   });//ready
}	

function CTRY_areaDetails(){
	var areaId, envelope, markerEnvelope, CTRY, levelname; 
    var CTRY_extcode ;
    
    CTRY            = $.getUrlVar('areaname');
    CTRY_extcode    = $.getUrlVar('areacode');
    markerEnvelope  = $.getUrlVar('markerenvelope');
    levelname       = $.getUrlVar('levelname');    
	
   jsonFile1 = "http://onslocalos-glassfishtest.rhcloud.com/resource-web/rs/onslocal/code/" + CTRY_extcode + "/" + "leveltypeid/10/hierarchyid/26";
   jsonFile2 = "http://onslocalos-glassfishtest.rhcloud.com/resource-web/rs/onslocal/area/";
   $(document).ready(function(){
      $.getJSON(jsonFile1, function(res1){
	     areaId = res1['ns2:SearchAreaByCodeResponseElement'].AreaFallsWithins.AreaFallsWithin.Area.AreaId;	    
	     $.getJSON(jsonFile2 + areaId,function(res2){
	    	envelope = res2['ns2:GetAreaDetailResponseElement'].AreaDetail.Envelope; 
	    	details = envelope + ":" + CTRY + ":" + "CTRY11NM" + ":" + "CTRY/CTRY_DEC_2011_GB_BGC" + ":" + markerEnvelope + ":" + "CTRY" + ":" + "CTRY11CD" + ":" +
	          " " + ":" + " " + ":" + " " + ":" + CTRY + ":" + " "  + ":" + " " + ":" + " "  + ":" + CTRY_extcode;
	    	
	    	$("#Tabs").toggle(); //display tabs for data content
			
 			//Call createTable for OA
 			createTable(CTRY_extcode, levelname);
 			createReligion(CTRY_extcode, levelname);
 			getData(CTRY_extcode, levelname, CTRY, 'popSexGeog');
			getData(CTRY_extcode, levelname, CTRY, 'ageGeog');
			getData(CTRY_extcode, levelname, CTRY, 'popTime');
			getData(CTRY_extcode, levelname, CTRY, 'relGeog');
			getData(CTRY_extcode, levelname, CTRY, 'relAgeGeog');
			getData(CTRY_extcode, levelname, CTRY, 'relSexGeog');
	    	
	    	highlightMap(details,postcode);	
	    });	//jsonfile1	
	  });//jsonFile2		    
   });//ready
}

// populate area details
// OA details
function  OA_pcode_details(postcode) {
	var levelname;
	levelname = $.getUrlVar('levelname');
	
	jsonFile1 = "http://onslocalos-glassfishtest.rhcloud.com/resource-web/rs/onslocal/postcode/" + postcode.toLowerCase() + "/hierarchyid/26";
	jsonFile2 = "http://onslocalos-glassfishtest.rhcloud.com/resource-web/rs/onslocal/postcode/" + postcode.toLowerCase() + "/hierarchyid/30";			
	jsonFile3 = "http://onslocalos-glassfishtest.rhcloud.com/resource-web/rs/onslocal/area/";	
	jsonFile4 = "http://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/find?text=" + postcode.toLowerCase() +
	            "&outFields=geometry&sourceCountry=GBR&outSR=27700&f=json&maxLocations=1&bbox=";
	var areaId, envelope, extCode, markerEnvelope, OA, LA, GOR, CTRY, WD, OA_AreaId, LA_AreaId, GOR_AreaId,  CTRY_AreaId;
	var WD_AreaId, WD_extcode, LA_extcode, GOR_extcode, CTRY_extcode, CTRY_Welsh, CTRY_Welsh_Areaid;
	 
	$(document).ready(function(){
	  $.getJSON(jsonFile1, function(res1){
		// ----------------------------------------------------  
		// Get OA postcode details
		// ----------------------------------------------------  
		OA_AreaId          = res1['ns2:FindAreasResponseElement'].AreaFallsWithins.AreaFallsWithin[0].Area.AreaId;
	    OA                 = res1['ns2:FindAreasResponseElement'].AreaFallsWithins.AreaFallsWithin[0].Area.Name;
	    LA                 = res1['ns2:FindAreasResponseElement'].AreaFallsWithins.AreaFallsWithin[0].FallsWithin.Area.Name;  
	    LA_AreaId          = res1['ns2:FindAreasResponseElement'].AreaFallsWithins.AreaFallsWithin[0].FallsWithin.Area.AreaId; 
	    GOR                = res1['ns2:FindAreasResponseElement'].AreaFallsWithins.AreaFallsWithin[4].Area.Name;
	    GOR_AreaId         = res1['ns2:FindAreasResponseElement'].AreaFallsWithins.AreaFallsWithin[4].Area.AreaId;
	    CTRY_Welsh         = res1['ns2:FindAreasResponseElement'].AreaFallsWithins.AreaFallsWithin[4].Area.Name;
	    CTRY_Welsh_AreaId  = res1['ns2:FindAreasResponseElement'].AreaFallsWithins.AreaFallsWithin[4].Area.AreaId;
	    CTRY               = res1['ns2:FindAreasResponseElement'].AreaFallsWithins.AreaFallsWithin[5].Area.Name;
	    CTRY_AreaId        = res1['ns2:FindAreasResponseElement'].AreaFallsWithins.AreaFallsWithin[5].Area.AreaId;
	    
	    $.getJSON(jsonFile2, function(res2){
	      WD        = res2['ns2:FindAreasResponseElement'].AreaFallsWithins.AreaFallsWithin[0].Area.Name;	
	      WD_AreaId  = res2['ns2:FindAreasResponseElement'].AreaFallsWithins.AreaFallsWithin[0].Area.AreaId;
	      
	      $.getJSON(jsonFile3 + OA_AreaId,function(res3){	        	
	 	    envelope    = res3['ns2:GetAreaDetailResponseElement'].AreaDetail.Envelope; 
	 	    //extcode     = res3['ns2:GetAreaDetailResponseElement'].AreaDetail.ExtCode; 
	 	    $.getJSON(jsonFile3 + WD_AreaId,function(res3){	
	 	    	WD_extcode     = res3['ns2:GetAreaDetailResponseElement'].AreaDetail.ExtCode; 
	 	    	$.getJSON(jsonFile3 + LA_AreaId,function(res3){	
	 	    		LA_extcode     = res3['ns2:GetAreaDetailResponseElement'].AreaDetail.ExtCode; 
	 	    		$.getJSON(jsonFile3 + GOR_AreaId,function(res3){	
	 	    			GOR_extcode     = res3['ns2:GetAreaDetailResponseElement'].AreaDetail.ExtCode; 
		 	    		$.getJSON(jsonFile3 +  CTRY_AreaId,function(res3){	
		 	    			CTRY_extcode     = res3['ns2:GetAreaDetailResponseElement'].AreaDetail.ExtCode;
		 	    			$.getJSON(jsonFile3 +  CTRY_Welsh_AreaId,function(res3){	
			 	    			CTRY_Welsh_extcode     = res3['ns2:GetAreaDetailResponseElement'].AreaDetail.ExtCode;
	 	    	
	 	                    $.getJSON(jsonFile4 + envelope, function(res4){	     	    	
	 	                      markerEnvelope    = res4.locations[0].feature.geometry.x + ":" + res4.locations[0].feature.geometry.y; 
	 	                      
	 	                      if(CTRY_Welsh === "Wales"){
	 	                    	 details = envelope + ":" + OA + ":" + " " + ":" + "OA/OA_2011_EW_BGC_V2" + ":" + markerEnvelope + ":" + "OA" + ":" + "OA11CD" + ":" +
							       WD + ":" + LA + ":" + GOR + ":" + CTRY_Welsh  + ":" + WD_extcode + ":" + LA_extcode + ":" +  " "  + ":" + CTRY_Welsh_extcode;	 	       
	 	                      }
	 	                      else{
	 	                    	details = envelope + ":" + OA + ":" + " " + ":" + "OA/OA_2011_EW_BGC_V2" + ":" + markerEnvelope + ":" + "OA" + ":" + "OA11CD" + ":" +
							       WD + ":" + LA + ":" + GOR + ":" + CTRY + ":" + WD_extcode + ":" + LA_extcode + ":" + GOR_extcode + ":" + CTRY_extcode;	 	              
	 	                     }      
			 	              
	 	                     $("#Tabs").toggle(); //display tabs for data content
	 	    				
	 	       			     //Call createTable for OA
	 	       			     createTable(OA, "OA");
	 	       			     createReligion(OA, "OA");	
		 	       			 getData(OA, levelname, OA, 'popSexGeog');
		 	    			 getData(OA, levelname, OA, 'ageGeog');
		 	    			 getData(OA, levelname, OA, 'popTime');
		 	    			 getData(OA, levelname, OA, 'relGeog');
		 	    			 getData(OA, levelname, OA, 'relAgeGeog');
		 	    			 getData(OA, levelname, OA, 'relSexGeog');
	 	                      
	 	                     highlightMap(details,postcode);				 	     
	 	                   }); 
		 	    		}); 			 	    		
			 	     }); 
		 	      });
	 	       });	
	 	    }); // jsonFile4
	      }); // jsonFile3	   
	    }); // jsonFile2	      	   
	  }); // jsonFile1		     	   
	}); // ready
}	

function  OA_details() {
	var OA_details;
	
	// = 	$.getUrlVar('xmin') + ":" + $.getUrlVar('ymin') + ":" + $.getUrlVar('xmax') + ":" + $.getUrlVar('xmax') + ":" +
	//	$.getUrlVar('areaname') + ":" +
	//	" " + ":" +
	//	"OA/OA_2011_EW_BGC_V2" + ":" +
	//	$.getUrlVar('markerenvelope') + ":" +
	//	"OA" + ":" +
	//	"OA11CD";
//} 
////	   
//	return OA_details;
}	    	
	

//Read a user input postcode and strip of plus signs,
// convert to uppercase and reformat if necessary
function  postcode_reformat(postcode) {
   // strip + sign from postcode string & convert to uppercase
   postcode                     = postcode.replace(/\+/g, '');
   
   var upperCasePostCode        = postcode.toUpperCase();    	
   var regPostcode              = /^([a-zA-Z]){1}([0-9][0-9]|[0-9]|[a-zA-Z][0-9][a-zA-Z]|[a-zA-Z][0-9][0-9]|[a-zA-Z][0-9]){1}([ ])([0-9][a-zA-z][a-zA-z]){1}$/;
 
   if(regPostcode.test(upperCasePostCode) == false)	
   {	
	   var re                   = /^([A-Z]{1,2}[\dA-Z]{1,2})[ ]?(\d[A-Z]{2})$/i; // case insensitive 	
	   var tempPostCode         = upperCasePostCode.match(re);
	   var reformatPostcode     = tempPostCode[1] + " " + tempPostCode[2];
	   return reformatPostcode;
   }
   else {
	 // postcode formatted correctly
	 return upperCasePostCode;
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
