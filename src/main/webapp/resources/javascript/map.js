function createMap(result, validpostCode, levelname, childname){	
		
	var paramName = $.getUrlVar('areacode');
	
	var regionText,regionDrillText, childcode, childarealist ;	
	
		
	if (typeof levelname === 'undefined') {
		if (typeof validpostCode === 'undefined') {
		  // display UK map
		 details = result.areas[0].envelope;		
	    }
		else {	 
			
			if (typeof paramName === 'undefined') {
			// display OA map			 
				details = 	result.areas[0].OA[0].envelope +":"+ 
							result.areas[0].OA[0].area+":"+ 
							result.areas[0].OA[0].areaname+":"+ 					 
							result.areas[0].OA[0].arealayername+":"+
							result.areas[0].OA[0].markerenvelope+":"+
							result.areas[0].OA[0].levelname+":"+
							result.areas[0].OA[0].areacode;
			}
			else
			{				
				details = 	$.getUrlVar('xmin') + ":" + $.getUrlVar('ymin') + ":" + $.getUrlVar('xmax') + ":" + $.getUrlVar('xmax') + ":" +
							$.getUrlVar('areaname') + ":" +
							" " + ":" +
							"OA/OA_2011_EW_BGC_V2" + ":" +
							$.getUrlVar('markerenvelope') + ":" +
							"OA" + ":" +
							"OA11CD";
			}
			
			$("#Tabs").toggle(); //display tabs for data content
			
			//Call createTable for OA
			createTable(result.areas[0].OA[0].extcode, levelname);
			createReligion(result.areas[0].OA[0].extcode, levelname);
			
			// if welsh postcode - no GOR
			 if (validpostCode === "NP18 1AF"){
			     regionText = '<span style="display:none;"></span>';			  			 
			 }
			 else{				 
			    regionText = '<br> - Region (<a style="color: light blue"; href="index.html?nav-search=' + validpostCode + '&amp;levelname=GOR">'+ result.areas[0].GOR[0].area + '</a>)' ;	
			 }		

						
			// set orange info box details	
			$('#selArea1').append('<div id="innerDIV"> <article class="box box--orange box--orange--separated-left">' +
								  '<div style="background-color:white" class="box__inner border box--padded has-icon">'+			                   
			                      '<div style="color: rgb(243,113,33); font-size: x-large"><strong>' +postcode+'</strong></div>' +
			                      '<div style="color: black; font-size:medium;">(Output area ' + result.areas[0].OA[0].area + ')<br><br><strong>Part of:</strong></div>' +
			                      '<div style="margin-top:5px;font-size: small;"> - Ward (<a style="color: light blue"; href="index.html?nav-search=' + validpostCode + '&amp;levelname=WD">'+ result.areas[0].WD[0].area + '</a>)' +
		  		             	  '<br> - Local Authority (<a style="color: light blue"; href="index.html?nav-search='+ validpostCode + '&amp;levelname=LAD">'+ result.areas[0].LAD[0].area + '</a>)' + 
			                       regionText +
			                      '<br> - Country (<a style="color: light blue"; href="index.html?nav-search='+ validpostCode + '&amp;levelname=CTRY">'+ result.areas[0].CTRY[0].area + '</a>)</div>' + 
			                      '</div>' +
			                      '</article></div>');	
		}
	}	
	else {		  
		  // display map for level name - populate grandparent, parent & child details
		  if (levelname ==="WD"){ 
				
			  
			  if (typeof paramName === 'undefined') {
				  
				  details = result.areas[0].WD[0].envelope +":"+ 
			            	result.areas[0].WD[0].area+":"+ 
						    result.areas[0].WD[0].areaname+":"+ 
							result.areas[0].WD[0].arealayername+":"+
				            result.areas[0].WD[0].markerenvelope+":"+
			                result.areas[0].WD[0].levelname +":"+
			                result.areas[0].WD[0].areacode+":"+ 
			                result.areas[0].WD[0].childarealist +":"+	
			                result.areas[0].WD[0].extcode +":"+	 
			                result.areas[0].OA[0].areacode +":"+
			                result.areas[0].OA[0].area+":"+ 
						    result.areas[0].OA[0].areaname+":"+ 
							result.areas[0].OA[0].arealayername+":"+
			                result.areas[0].OA[0].levelname;
				  
							//Call createTable for WARD
							createTable(result.areas[0].WD[0].extcode, levelname);
							createReligion(result.areas[0].WD[0].extcode, levelname);
			  }
			  else{   
				     
				      var envelope;
				      var extcode = $.getUrlVar('areacode'); 
				      var areaId;
				      var details;
					  jsonFile1 = "http://onslocalos-glassfishtest.rhcloud.com/resource-web/rs/onslocal/code/" + extcode + "/" + "leveltypeid/14/hierarchyid/30";
					  jsonFile2 = "http://onslocalos-glassfishtest.rhcloud.com/resource-web/rs/onslocal/area/";
					  
					  $(document).ready(function(){
					    $.getJSON(jsonFile1, function(res1){
						    areaId = res1['ns2:SearchAreaByCodeResponseElement'].AreaFallsWithins.AreaFallsWithin.Area.AreaId;
						    
						    $.getJSON(jsonFile2 + areaId,function(res2){
						    	envelope = res2['ns2:GetAreaDetailResponseElement'].AreaDetail.Envelope; 
					       
							  details = 	envelope + ":" +
								            $.getUrlVar('areaname') + ":" +					            
								            "WD12NM" + ":" +
								            "WD/WD_DEC_2012_GB_BGC" + ":" +					
								            $.getUrlVar('markerenvelope') + ":" +					            
				                            "WD" +":"+
				                            "WD12CD"+ ":" +
				                            $.getUrlVar('areacode');
							  
							   detailsArray = details.split(":");
				  
								//Call createTable for WARD
								 createTable(detailsArray[11], levelname);
								 createReligion(detailsArray[11], levelname);
								 
								// if welsh postcode - no GOR
								  if (validpostCode === "NP18 1AF"){
									  regionText      = '<span style="display:none;"></span>';	
									  regionDrillText = '- <a style="color: light blue"; href="index.html?nav-search=' + validpostCode + '&amp;levelname=CTRY&amp;childname=LAD"> Local Authority </a></div>';	
								  }
								  else{
									  regionText       = '<div style="font-size: small;"> - Region (<a style="color: light blue"; href="index.html?nav-search='+ validpostCode + '&amp;levelname=GOR">'+ result.areas[0].GOR[0].area + '</a>)' ;
									  regionDrillText  = '- <a style="color: light blue"; href="index.html?nav-search=' + validpostCode + '&amp;levelname=CTRY&amp;childname=GOR"> Region </a></div>';
								  }		  	  
								  
								  // set orange part of box & drill down details
								  $('#selArea1').append('<div id="innerDIV"> <article class="box box--orange box--orange--separated-left">' +
										  '<div style="background-color:white" class="box__inner border box--padded has-icon">'+			                   
					                      '<div style="color: rgb(243,113,33); font-size: x-large"><strong>' + detailsArray[4]+'</strong></div>' +
					                      '<div style="color: black; font-size:medium;">(Ward)<br><br><strong>Part of:</strong></div>' +
					                      '<div style="font-size: small;"> - Local Authority (<a style="color: light blue"; href="index.html?nav-search=' + validpostCode + '&amp;levelname=LAD">'+ result.areas[0].LAD[0].area + ' </a>)' +
							              regionText +  
					                      '<br> - Country (<a style="color: light blue"; href="index.html?nav-search='+ validpostCode + '&amp;levelname=CTRY">'+ result.areas[0].CTRY[0].area + '</a>)</div>' + 
					                      '<div style="color: black; font-size:medium;padding-top:10px;"><strong>Drill down to :</strong></div>' +
					                      '<div style="font-size: small;">' + 
					                      '- <a style="color: light blue"; href="index.html?nav-search=' + validpostCode + '&amp;levelname=WD&amp;childname=OA"> Output area </a></div>' +
					                      '</div>' +
					                      '</article></div>');	
				  
								  // call highlight map
							        if (typeof childname === 'undefined') {
								     highlightMap(details, validpostCode);
							      }
							       // call hover map
							       else {		 
								      hoverMap(details, validpostCode);
							      }
							        
	                            //result.areas[0].WD[0].childarealist +":"+	
	                            //$.getUrlVar('areacode') ; 
	                           // result.areas[0].OA[0].areacode +":"+
	                           // result.areas[0].OA[0].area+":"+ 
	                            ///result.areas[0].OA[0].areaname+":"+ 
	                            //result.areas[0].OA[0].arealayername+":"+
	                            //result.areas[0].OA[0].levelname;	
					  });	//jsonfile1	
					});//jsonFile2		    
			      });//ready
			  }	//else			  
			  
			  $("#Tabs").toggle(); //display tabs for data content 			  
			  
			  // if welsh postcode - no GOR
			  if (validpostCode === "NP18 1AF"){
				  regionText      = '<span style="display:none;"></span>';	
				  regionDrillText = '- <a style="color: light blue"; href="index.html?nav-search=' + validpostCode + '&amp;levelname=CTRY&amp;childname=LAD"> Local Authority </a></div>';	
			  }
			  else{
				  regionText       = '<div style="font-size: small;"> - Region (<a style="color: light blue"; href="index.html?nav-search='+ validpostCode + '&amp;levelname=GOR">'+ result.areas[0].GOR[0].area + '</a>)' ;
				  regionDrillText  = '- <a style="color: light blue"; href="index.html?nav-search=' + validpostCode + '&amp;levelname=CTRY&amp;childname=GOR"> Region </a></div>';
			  }		  	  
			  
			  // set orange part of box & drill down details
			  $('#selArea1').append('<div id="innerDIV"> <article class="box box--orange box--orange--separated-left">' +
					  '<div style="background-color:white" class="box__inner border box--padded has-icon">'+			                   
                      '<div style="color: rgb(243,113,33); font-size: x-large"><strong>' + result.areas[0].WD[0].area +'</strong></div>' +
                      '<div style="color: black; font-size:medium;">(Ward)<br><br><strong>Part of:</strong></div>' +
                      '<div style="font-size: small;"> - Local Authority (<a style="color: light blue"; href="index.html?nav-search=' + validpostCode + '&amp;levelname=LAD">'+ result.areas[0].LAD[0].area + ' </a>)' +
		              regionText +  
                      '<br> - Country (<a style="color: light blue"; href="index.html?nav-search='+ validpostCode + '&amp;levelname=CTRY">'+ result.areas[0].CTRY[0].area + '</a>)</div>' + 
                      '<div style="color: black; font-size:medium;padding-top:10px;"><strong>Drill down to :</strong></div>' +
                      '<div style="font-size: small;">' + 
                      '- <a style="color: light blue"; href="index.html?nav-search=' + validpostCode + '&amp;levelname=WD&amp;childname=OA"> Output area </a></div>' +
                      '</div>' +
                      '</article></div>');	
		  }
	
		  // display map for level name - populate grandparent, parent & child details
		  if (levelname ==="LAD"){			 
			  details = 	result.areas[0].LAD[0].envelope +":"+ 
			            	result.areas[0].LAD[0].area+":"+ 
						    result.areas[0].LAD[0].areaname+":"+ 
							result.areas[0].LAD[0].arealayername+":"+
				            result.areas[0].LAD[0].markerenvelope+":"+
			                result.areas[0].LAD[0].levelname+":"+
			                result.areas[0].LAD[0].areacode +":"+
			                result.areas[0].LAD[0].childarealist+":"+
			                result.areas[0].LAD[0].extcode +":"+	
						    result.areas[0].WD[0].areacode +":"+
				            result.areas[0].WD[0].area+":"+ 
						    result.areas[0].WD[0].areaname+":"+ 
							result.areas[0].WD[0].arealayername+":"+
				            result.areas[0].WD[0].levelname;
			  
			  $("#Tabs").toggle(); //display tabs for data content
			  
			  //Call createTable for Local Authority
			  createTable(result.areas[0].LAD[0].extcode, levelname); 
			  createReligion(result.areas[0].LAD[0].extcode, levelname); 
			  
		      // set orange info box details	
			  $('#selArea1').append('<div id="innerDIV"> <article class="box box--orange box--orange--separated-left">' +
					  '<div style="background-color:white" class="box__inner border box--padded has-icon">'+			                   
                      '<div style="color: rgb(243,113,33); font-size: x-large"><strong>' +result.areas[0].LAD[0].area+'</strong></div>' +
                      '<div style="color: black; font-size:medium;">(Local Authority)<br><br><strong>Part of:</strong></div>' +
                      regionText + 
                      '<br><div style="font-size: small;"> - Country (<a style="color: light blue"; href="index.html?nav-search='+ validpostCode + '&amp;levelname=CTRY">'+ result.areas[0].CTRY[0].area + ' </a>)</div>' + 
                      '<div style="color: black; font-size:medium;padding-top:10px;"><strong>Drill down to :</strong></div>' +
                      '<div style="font-size: small;">' + 
                      '- <a style="color: light blue"; href="index.html?nav-search=' + validpostCode + '&amp;levelname=LAD&amp;childname=WD"> Ward </a></div>' +
                      '</div>' +
                      '</article></div>');				
		  }
		  
		  // display map for level name - populate parent & child details
		  if (levelname ==="GOR" && (validpostCode ==="PO15 5RR" || validpostCode ==="PO11 9DF")) {			 
			  details = 	result.areas[0].GOR[0].envelope +":"+ 
			            	result.areas[0].GOR[0].area+":"+ 
						    result.areas[0].GOR[0].areaname+":"+ 
							result.areas[0].GOR[0].arealayername+":"+
				            result.areas[0].GOR[0].markerenvelope+":"+
			                result.areas[0].GOR[0].levelname+":"+
			                result.areas[0].GOR[0].areacode +":"+
			                result.areas[0].GOR[0].childarealist+":"+
			                result.areas[0].GOR[0].extcode+":"+
						    result.areas[0].LAD[0].areacode +":"+
				            result.areas[0].LAD[0].area+":"+ 
						    result.areas[0].LAD[0].areaname+":"+ 
							result.areas[0].LAD[0].arealayername+":"+
				            result.areas[0].LAD[0].levelname;
			  
			 $("#Tabs").toggle(); //display tabs for data content
			  
			 //Call createTable for GOR
			 createTable(result.areas[0].GOR[0].extcode, levelname);
			 createReligion(result.areas[0].GOR[0].extcode, levelname); 
			  
		      // set orange info box details	
			  $('#selArea1').append('<div id="innerDIV"> <article class="box box--orange box--orange--separated-left">' +
					  '<div style="background-color:white" class="box__inner border box--padded has-icon">'+			                   
                      '<div style="color: rgb(243,113,33); font-size: x-large"><strong>' +result.areas[0].GOR[0].area+'</strong></div>' +
                      '<div style="color: black; font-size:medium;">(Region)<br><br><strong>Part of:</strong></div>' +
                      '<div style="font-size: small;"> - Country (<a style="color: light blue"; href="index.html?nav-search='+ validpostCode + '&amp;levelname=CTRY">'+ result.areas[0].CTRY[0].area + ' </a>)</div>' + 
                      '<div style="color: black; font-size:medium;padding-top:10px;"><strong>Drill down to :</strong></div>' +
                      '<div style="font-size: small;">' + 
                      '- <a style="color: light blue"; href="index.html?nav-search=' + validpostCode + '&amp;levelname=GOR&amp;childname=LAD"> Local Authority </a></div>' +
                      '</div>' +
                      '</article></div>');				
		  }
		  
		  // display map for level name - populate parent & child details
		  if (levelname ==="CTRY"){	
			  if (validpostCode ==="PO15 5RR" || validpostCode ==="PO11 9DF") {				
				  details = 	result.areas[0].CTRY[0].envelope +":"+ 
				            	result.areas[0].CTRY[0].area+":"+ 
							    result.areas[0].CTRY[0].areaname+":"+ 
								result.areas[0].CTRY[0].arealayername+":"+
					            result.areas[0].CTRY[0].markerenvelope+":"+
				                result.areas[0].CTRY[0].levelname+":"+
				                result.areas[0].CTRY[0].areacode +":"+
				                result.areas[0].CTRY[0].childarealist+":"+
				                result.areas[0].CTRY[0].extcode+":"+
							    result.areas[0].GOR[0].areacode +":"+
					            result.areas[0].GOR[0].area+":"+ 
							    result.areas[0].GOR[0].areaname+":"+ 
								result.areas[0].GOR[0].arealayername+":"+
					            result.areas[0].GOR[0].levelname;
			  }
			  else {				 
				  details = 	result.areas[0].CTRY[0].envelope +":"+ 
				            	result.areas[0].CTRY[0].area+":"+ 
							    result.areas[0].CTRY[0].areaname+":"+ 
								result.areas[0].CTRY[0].arealayername+":"+
					            result.areas[0].CTRY[0].markerenvelope+":"+
				                result.areas[0].CTRY[0].levelname+":"+
				                result.areas[0].CTRY[0].areacode +":"+
				                result.areas[0].CTRY[0].childarealist+":"+
				                result.areas[0].CTRY[0].extcode+":"+
				                result.areas[0].LAD[0].areacode +":"+
					            result.areas[0].LAD[0].area+":"+ 
							    result.areas[0].LAD[0].areaname+":"+ 
								result.areas[0].LAD[0].arealayername+":"+
					            result.areas[0].LAD[0].levelname;
			  }
			  
			  $("#Tabs").toggle(); //display tabs for data content
				  
			  //Call createTable for Country
			  createTable(result.areas[0].CTRY[0].extcode, levelname);
			  createReligion(result.areas[0].CTRY[0].extcode, levelname);
			  
		      // set orange info box details	
			  $('#selArea1').append('<div id="innerDIV"> <article class="box box--orange box--orange--separated-left">' +
					  '<div style="background-color:white" class="box__inner border box--padded has-icon">'+			                   
                      '<div style="color: rgb(243,113,33); font-size: x-large"><strong>' +result.areas[0].CTRY[0].area+'</strong></div>' +
                      '<div style="color: black; font-size:medium;">(Country)<br><br></strong></div>' +  
                      '<div style="color: black; font-size:medium;padding-top:10px;"><strong>Drill down to :</strong></div>' +
                      '<div style="font-size: small;">' + 
                      regionDrillText +
                      '</div>' +
                      '</article></div>');				
		  }	  
		  
	}
	
	if (typeof levelname === 'undefined') {
		if (typeof validpostCode === 'undefined') {
		  // display UK map		 
		 ukMap(details);		
	   } 
		else{
			// call highlight map
			  if (typeof childname === 'undefined') {				 
				  highlightMap(details, validpostCode);
			  }
			  // call hover map
			  else {				 
				 hoverMap(details, validpostCode);
			  }	
		}
	}
	else {	
		if (typeof paramName === 'undefined') {
	        // call highlight map
	        if (typeof childname === 'undefined') {
		     highlightMap(details, validpostCode);
	      }
	       // call hover map
	       else {		 
		      hoverMap(details, validpostCode);
	       }
		 }   
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
