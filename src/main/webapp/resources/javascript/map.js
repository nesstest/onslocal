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
			alert("not a pc search");
			if($.getUrlVar('levelname') === 'WD' ) {
			  WD_areaDetails($.getUrlVar('areaname'),$.getUrlVar('areacode'),$.getUrlVar('markerEnvelope'));
			}
			
			if($.getUrlVar('levelname') === 'LAD' ) {
			  LA_areaDetails($.getUrlVar('areaname'),$.getUrlVar('areacode'),$.getUrlVar('markerEnvelope'));
			}
			
			if($.getUrlVar('levelname') === 'GOR' ) {
			  GOR_areaDetails($.getUrlVar('areaname'),$.getUrlVar('areacode'),$.getUrlVar('markerEnvelope'));
			}
			
			if($.getUrlVar('levelname') === 'CTRY' ) {
			  CTRY_areaDetails($.getUrlVar('areaname'),$.getUrlVar('areacode'),$.getUrlVar('markerEnvelope'));
			}
		}
	}	 
}

function WD_areaDetails(wardName,wardCode,markerEnvelope){
	alert("in WD_areaDetails");
	
	 alert($('input#wardName').val());
	
   jsonFile1 = "http://onslocalos-glassfishtest.rhcloud.com/resource-web/rs/onslocal/code/" + wardCode + "/" + "leveltypeid/14/hierarchyid/30";
   jsonFile2 = "http://onslocalos-glassfishtest.rhcloud.com/resource-web/rs/onslocal/area/";

   $(document).ready(function(){
      $.getJSON(jsonFile1, function(res1){
	     areaId = res1['ns2:SearchAreaByCodeResponseElement'].AreaFallsWithins.AreaFallsWithin.Area.AreaId;	    
	     $.getJSON(jsonFile2 + areaId,function(res2){
	    	envelope = res2['ns2:GetAreaDetailResponseElement'].AreaDetail.Envelope;      
		    details = 	envelope + ":" + wardName + ":" + "WD12NM" + ":" + "WD/WD_DEC_2012_GB_BGC" + ":" + markerEnvelope + ":" + "WD" +":"+ "WD12CD"+ ":" + wardCode;	
		    
		    // --------------- to do -----------------------------
			// Do we need to populate the falls within code
		    //   + LA + ":" + GOR + ":" + CTRY + ":" +  LA_extcode + ":" + GOR_extcode + ":" + CTRY_extcode
		    // and drill down
		    //   + OA + OA_extcode
			// ----------------------------------------------------
		    
		    
		    highlightMap(details,postcode);	
	    });	//jsonfile1	
	  });//jsonFile2		    
   });//ready
}

function LA_areaDetails(laName,laCode,markerEnvelope){
	alert("in LA_areaDetails");
	
   jsonFile1 = "http://onslocalos-glassfishtest.rhcloud.com/resource-web/rs/onslocal/code/" + laCode + "/" + "leveltypeid/13/hierarchyid/26";
   jsonFile2 = "http://onslocalos-glassfishtest.rhcloud.com/resource-web/rs/onslocal/area/";
   $(document).ready(function(){
      $.getJSON(jsonFile1, function(res1){
	     areaId = res1['ns2:SearchAreaByCodeResponseElement'].AreaFallsWithins.AreaFallsWithin.Area.AreaId;	    
	     $.getJSON(jsonFile2 + areaId,function(res2){
	    	envelope = res2['ns2:GetAreaDetailResponseElement'].AreaDetail.Envelope;     
	    	details = 	envelope + ":" + laName + ":" + "LAD11NM" + ":" + "LAD/LAD_DEC_2011_GB_BGC" + ":" + markerEnvelope + ":" + "LAD" +":"+ "LAD11CD"+ ":" + laCode;	
	    	  // --------------- to do -----------------------------
			// Do we need to populate the falls within code
		    //   + LA + ":" + GOR + ":" + CTRY + ":" +  LA_extcode + ":" + GOR_extcode + ":" + CTRY_extcode
		    // and drill down
		    //   + OA + OA_extcode
			// ----------------------------------------------------
	    	// highlightMap(details,postcode);	
	    });	//jsonfile1	
	  });//jsonFile2		    
   });//ready
}	

function GOR_areaDetails(gorName,gorCode,markerEnvelope){
	alert("in GOR_areaDetails");
	
   jsonFile1 = "http://onslocalos-glassfishtest.rhcloud.com/resource-web/rs/onslocal/code/" + gorCode + "/" + "leveltypeid/11/hierarchyid/26";
   jsonFile2 = "http://onslocalos-glassfishtest.rhcloud.com/resource-web/rs/onslocal/area/";
   $(document).ready(function(){
      $.getJSON(jsonFile1, function(res1){
	     areaId = res1['ns2:SearchAreaByCodeResponseElement'].AreaFallsWithins.AreaFallsWithin.Area.AreaId;	    
	     $.getJSON(jsonFile2 + areaId,function(res2){
	    	envelope = res2['ns2:GetAreaDetailResponseElement'].AreaDetail.Envelope;   
	    	details = 	envelope + ":" + gorName + ":" + "GOR10NM" + ":" + "GOR/GOR_DEC_2010_EN_BGC" + ":" + markerEnvelope + ":" + "GOR" +":"+ "GOR10CD"+ ":" + gorCode;
	    	  // --------------- to do -----------------------------
			// Do we need to populate the falls within code
		    //   + LA + ":" + GOR + ":" + CTRY + ":" +  LA_extcode + ":" + GOR_extcode + ":" + CTRY_extcode
		    // and drill down
		    //   + OA + OA_extcode
			// ----------------------------------------------------
	    	// highlightMap(details,postcode);	
	    });	//jsonfile1	
	  });//jsonFile2		    
   });//ready
}	

function CTRY_areaDetails(ctryName,ctryCode,markerEnvelope){
	alert("in CTRY_areaDetails");
	
   jsonFile1 = "http://onslocalos-glassfishtest.rhcloud.com/resource-web/rs/onslocal/code/" + ctryCode + "/" + "leveltypeid/10/hierarchyid/26";
   jsonFile2 = "http://onslocalos-glassfishtest.rhcloud.com/resource-web/rs/onslocal/area/";
   $(document).ready(function(){
      $.getJSON(jsonFile1, function(res1){
	     areaId = res1['ns2:SearchAreaByCodeResponseElement'].AreaFallsWithins.AreaFallsWithin.Area.AreaId;	    
	     $.getJSON(jsonFile2 + areaId,function(res2){
	    	envelope = res2['ns2:GetAreaDetailResponseElement'].AreaDetail.Envelope; 
	    	details = 	envelope + ":" + ctryName + ":" + "CTRY11NM" + ":" + "CTRY/CTRY_DEC_2011_GB_BGC" + ":" + markerEnvelope + ":" + "CTRY" +":"+ "CTRY11CD"+ ":" + ctryCode;
	    	  // --------------- to do -----------------------------
			// Do we need to populate the falls within code
		    //   + LA + ":" + GOR + ":" + CTRY + ":" +  LA_extcode + ":" + GOR_extcode + ":" + CTRY_extcode
		    // and drill down
		    //   + OA + OA_extcode
			// ----------------------------------------------------
	    	// highlightMap(details,postcode);	
	    });	//jsonfile1	
	  });//jsonFile2		    
   });//ready
}		  
		  


// populate area details
// OA details
function  OA_pcode_details(postcode) {
	alert("postcode search - in OA_pcode_details");
	
	jsonFile1 = "http://onslocalos-glassfishtest.rhcloud.com/resource-web/rs/onslocal/postcode/" + postcode.toLowerCase() + "/hierarchyid/26";
	jsonFile2 = "http://onslocalos-glassfishtest.rhcloud.com/resource-web/rs/onslocal/postcode/" + postcode.toLowerCase() + "/hierarchyid/30";			
	jsonFile3 = "http://onslocalos-glassfishtest.rhcloud.com/resource-web/rs/onslocal/area/";	
	jsonFile4 = "http://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/find?text=" + postcode.toLowerCase() +
	            "&outFields=geometry&sourceCountry=GBR&outSR=27700&f=json&maxLocations=1&bbox=";
	var areaId, envelope, extCode, markerEnvelope, OA, LA, GOR, CTRY, WD, OA_AreaId, LA_AreaId, GOR_AreaId,  CTRY_AreaId;
	var WD_AreaId, WD_extcode, LA_extcode, GOR_extcode, CTRY_extcode ;
	 
	$(document).ready(function(){
	  $.getJSON(jsonFile1, function(res1){
		// ----------------------------------------------------  
		// Get OA postcode details
		// ----------------------------------------------------  
		OA_AreaId    = res1['ns2:FindAreasResponseElement'].AreaFallsWithins.AreaFallsWithin[0].Area.AreaId;
	    OA           = res1['ns2:FindAreasResponseElement'].AreaFallsWithins.AreaFallsWithin[0].Area.Name;
	    LA           = res1['ns2:FindAreasResponseElement'].AreaFallsWithins.AreaFallsWithin[0].FallsWithin.Area.Name;  
	    LA_AreaId    = res1['ns2:FindAreasResponseElement'].AreaFallsWithins.AreaFallsWithin[0].FallsWithin.Area.AreaId; 
	    GOR          = res1['ns2:FindAreasResponseElement'].AreaFallsWithins.AreaFallsWithin[4].Area.Name;
	    GOR_AreaId   = res1['ns2:FindAreasResponseElement'].AreaFallsWithins.AreaFallsWithin[4].Area.AreaId;
	    CTRY         = res1['ns2:FindAreasResponseElement'].AreaFallsWithins.AreaFallsWithin[5].Area.Name;
	    CTRY_AreaId  = res1['ns2:FindAreasResponseElement'].AreaFallsWithins.AreaFallsWithin[5].Area.AreaId;
	    
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
	 	    	
	 	                    $.getJSON(jsonFile4 + envelope, function(res4){	     	    	
	 	                      markerEnvelope    = res4.locations[0].feature.geometry.x + ":" + res4.locations[0].feature.geometry.y; 
	 	                      
	 	                      details = envelope + ":" + OA + ":" + " " + ":" + "OA/OA_2011_EW_BGC_V2" + ":" + markerEnvelope + ":" + "OA" + ":" + "OA11CD" + ":" +
								        WD + ":" + LA + ":" + GOR + ":" + CTRY + ":" + WD_extcode + ":" + LA_extcode + ":" + GOR_extcode + ":" + CTRY_extcode;
			 	              highlightMap(details,postcode);				 	     
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
