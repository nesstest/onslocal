/**
 * Gets parameters off the url
 */
function getUrlParams() {
    var vars = {};
    parts = decodeURI(window.location.href).replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
    vars[key] = value;
    });
    return vars;
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

//Read a user input postcode and strip of plus signs,
//convert to uppercase and reformat if necessary
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

function encodeName(name) {
	var encodetxt = encodeURIComponent(name);
	return encodetxt;
}
function decodeName(name) {
	var decodetxt = decodeURIComponent(name);
	return decodetxt;
}

/**
 * Validates the url parameters
 */
function validateUrl() {
    var vars = {};	 
    var invalidCnt = 0;  
    parts = decodeURI(window.location.href).replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    	if (!checkURL(key,value)){
    		invalidCnt = invalidCnt + 1;
    	}	    	
    });
   
   	// valid url - continue
	if (invalidCnt === 0){
		searchtext               = $.getUrlVar('q');
	    if (searchtext == null || searchtext.length == 0 || typeof searchtext === 'undefined') {
	    	// load default home page
	    	$(document).ready(function(){
		    	//homePageBoxes(searchtext);				
			});
	    }
	    else{
	    	searchtext =  decodeName(searchtext);
	    	
	    	// Check to see if the search string contains a number.
	        // If it does, it may be a postcode.-
	    	if(/\d/.test(searchtext)) 
			{
	    		searchtext = postcode_reformat(searchtext);
		    	if(searchtext === 'error')
		    	{
		    		// load default home page with error message
		    		$(document).ready(function(){
		    		//	redErrorbox();
		    		});  
		    	}
		    	else{		    		
				    getPostcodeDetails(searchtext,"postcode");
				    $(document).ready(function(){					
				 //   	homePageBoxes(searchtext);
						
					});
		    	}
		    } //if($postcode =  /\d/)
		    // name search
		    else {			    		
	    		
		    	getPostcodeDetails(searchtext,"name")
				  $(document).ready(function(){					
				 //    homePageBoxes(searchtext);
				});  
		    }
	    }	
	}
	else{ // invalid param on url
		  // load default home page with error message
		$(document).ready(function(){
		//	redErrorbox();	
		});  
	}
}

function getPostcodeDetails(postcode,search){	
	
    if (postcode == null || postcode.length == 0 || typeof postcode === 'undefined') {
    	
    	// --------------- to do -----------------------------
		// 
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
			if(search === 'name' && $.getUrlVar('levelname') === 'WARD'){
				WD_areaDetails(search);
			}
			if(search === 'name' && $.getUrlVar('levelname') === 'LA'){
				LA_areaDetails(search);
			} 
			if(search === 'name' && $.getUrlVar('levelname') === 'REGION'){
				GOR_areaDetails(search);
			}
			if(search === 'name' && $.getUrlVar('levelname') === 'COUNTRY'){
				CTRY_areaDetails(search);
			}
		}
		else{		    
			if($.getUrlVar('levelname') === 'OA' ) {
				  OA_areaDetails(postcode);
			}
			if($.getUrlVar('levelname') === 'WARD' ) {
			  WD_areaDetails(postcode);
			}
			
			if($.getUrlVar('levelname') === 'LA' ) {
			  LA_areaDetails(postcode);
			}
			
			if($.getUrlVar('levelname') === 'REGION' ) {
			  GOR_areaDetails(postcode);
			}
			
			if($.getUrlVar('levelname') === 'COUNTRY' ) {
			  CTRY_areaDetails(postcode);
			}
		}	
	}	 
}

//populate area details
//OA details
function  OA_pcode_details(postcode) {	
	//var levelname;
	//levelname = $.getUrlVar('levelname');	
	var OA; 
	var doterm;
	
	// get layer info for postcode
	var pcUrl     = "http://onsdatav3-glassfishtest.rhcloud.com/data-web/rs/nessdata/getpostcode/" + postcode;
	$(document).ready(function(){
	  $.getJSON(pcUrl, function(result) {
		if (result.features && result.features.length === 0) {
         // do stuff when no features were found
		//	redErrorbox(); 
        }
		else
		{	
			// set to la extcode as no data on table at oa level
		    //OA               = result.features[0].attributes.oa11cd;
			OA               = result.features[0].attributes.lauacd;
	        doterm           = result.features[0].attributes.doterm; 	
	                
	        // check to see if postcode not obsolete (doterm === null valid)
	        if(doterm === "") { 
    	        //dataTable(extCode, levelname, dataresource, timeid)
                dataTable(OA, "LA", "UKBD01", "102")
			    	      			       
	       }  // check to see if postcode not obsolete (doterm === null valid)
	       else {
	    	 //  redErrorbox(); 
	       }// postcode obsolete 
		} // if (result.features && result.features.length === 0)      
	})//pcUrl
	//.error(function() {  
	//		redErrorbox(); 
	//	});

	});//ready	  
} //OA_pcode_details function



/**
 * Accept specified characters found legally in placenames ie colons, hyphens etc..
 */
function checkURL(key,value) {
	var urlregex               = /^[a-zA-Z�0-9-\''\s\\&\\'\\:\\/\\(\\)\\!\\,\\+\\.\\%]+$/;
	
	// checking if a string is blank, null or undefined  
	if((/^\s*$/).test(key) || (/^\s*$/).test(value) ) {return (true);} 
	else{
    	if(urlregex.test(key) == false || urlregex.test(value) == false)
    	{
    		return (false);	
    	}
    	else {
    		return (true);
    	}		    	
	}	
} 

/**
 * gets the dataset details
 */ 
function getDatasetDetail(dsFamilyId, dataset,subject,startDate,endDate) {
   var url = "";
   var dsName = dataset;
   var varList;
   $.ajax({
		type	: "POST",
		url		: "http://neighbourhood.statistics.gov.uk/NDE2/Disco/GetDatasetDetail?DSFamilyId="+ dsFamilyId,
		dataType: "text",
		data	: {"url" : url},
		success : function(data)
		{
		  if(data != "")
		  {
			  x2js = new X2JS();
			  json = x2js.xml_str2json(data);			 
			  var obj = json.GetDatasetDetailResponseElement.DatasetDetail;
			  var optionalMetaData = obj.OptionalMetaData;
			  getVariables(dsFamilyId, startDate, endDate, dsName, optionalMetaData);
			  
		  }	  
	    }  
    });      
 }

/**
 * finds the matching datasets
 */ 
function findDatasets(searchtext){	
	 var url = "";
	 var dataset, dsId, metadata, obj;
	 var matchingCount  = 0;
		    
	 $.ajax({
		type	: "GET",
		url     : "http://ec2-52-25-128-99.us-west-2.compute.amazonaws.com/local-data-web/rs/local-data/keywordsearch?searchTerm=" + searchtext,
		dataType: "JSON",
		data	: {"url" : url},
		success : function(data)
		{
		  if(data != "")
	      {
			  var matchingCount = (data.data_resources.length);
				  
			  for(var i=0;i<matchingCount;i++){
				  
				 obj = data.data_resources[i];	
			    
				 dataset   = obj.title;
				 dsId      = obj.data_resource; 
				 metadata  = obj.metadata;
				 
				
				 showHide();
				 var variableItem = '<ul class="nav-secondary__list margin-left--half"><li class="padding-left--none inline">variables etc</li>';
	    		 var results = '<ul class="list--neutral margin-top--half">';
				  results +=        '<li class="col-wrap background--mercury flush-col padding-top--2 padding-bottom--4 padding-left--1 " >';
				  results +=        '<div class="js-show-hide">';
				  results +=        '<div class="show-hide show-hide--light">';
				  results +=        '<div class="js-show-hide__title margin-right-lg--5">';				  
				  results +=        '<button class="js-show-hide__button" type="button" aria-expanded="false" aria-controls="collapsible-0">';
				  results +=        '<a aria-expanded="false" aria-controls="collapsible-0" href="localDatasetDetail.html?">'  + dataset + '</a>';	
				  results +=        '</button>';
				  results +=        '<p class=" margin-right-lg--5">'+ metadata + '</p>';						 
				  results +=        '</div>';
				  results +=        '<div class="js-show-hide__content  show-hide show-hide--light margin-right-lg--5">';
				  results +=        '<div class="nav-secondary__list">';
				  results +=        '<p class="margin-left--half flush-bottom flush-top"><strong>Dimensions</strong></p>';				   									
				  results +=        '<p class="margin-left--half flush-bottom flush-top">Religion:</p>';							    
				  results +=        variableItem;
				  results +=        '</ul>';
				  results +=        '<p class="margin-left--half flush-bottom flush-top "><strong>Geographies covered</strong></p>'; 
				  results +=        '<ul class="nav-secondary__list margin-left--half">';
				  results +=	    '<li class="padding-left--none inline">Output Area,</li>';
				  results +=	    '<li class="padding-left--none inline">Lower Super Output Area,</li>';
				  results +=	    '<li class="padding-left--none inline">Electoral Ward,</li>';
				  results +=	    '<li class="padding-left--none inline">Middle Layer Super Output Area,</li>';
				  results +=	    '<li class="padding-left--none inline">Non-metropolitan District</li>';
				  results +=        '</ul>';
				  results +=        '<p class="margin-left--half flush-bottom flush-top "><strong>Dates covered</strong></p>';
				  results +=        '<p class="margin-left--half flush-bottom flush-top ">Output Area, Lower Layer etc...</p>';
				  results +=        '<p class="margin-left--half flush-bottom flush-top "><strong>Dates covered</strong></p>';
				  results +=        '<p class="margin-left--half flush-bottom flush-top ">2011, 2001</p>';
				  results +=        '<p class="margin-left--half flush-bottom flush-top "><strong>Source</strong></p>';
				  results +=        '<p class="margin-left--half flush-bottom flush-top ">2011 Census</p>';
				  results +=        '<p class="margin-left--half flush-bottom flush-top "><strong>Themes</strong></p>';
				  results +=        '<p class="margin-left--half flush-bottom flush-top ">Cultural Identity</p>';
				  results +=        '</div></div></div></div></li></ul>';
				  $('#results').append(results);   
				  showHide();
		         //  **** To do require dataset details ie. variable & dates  ****			        	
				 
					
				} // for(var i=0;i<matchingCount;i++){
			  
			 }	// if(data != "")
		 
				//  $('#searchText').append('<span style="font-size: 1.5em;" class="stand-out-text"><strong>Search results for ' +  "'" + searchtext +  "'" + '</strong></span><br>');
		   }	
	 }) //$.ajax({
}


 /**
  * Give me a list of variables for the specified dataset between the specified start and end dates.
  */ 
 function getVariables(dsFamilyId, startDate, endDate, dsName, optionalMetaData) {
	 var url = "";
     var dsFamilyId, startDate, endDate, obj;
	 $.ajax({
		type	: "POST",
		url		: "http://neighbourhood.statistics.gov.uk/NDE2/Disco/GetVariables?DateRange=" + startDate + ":" +  endDate + "&DSFamilyId=" + dsFamilyId, 
		dataType: "text",
		data	: {"url" : url},
		success : function(data)
		{
		  if(data != "")
	      {
			  x2js = new X2JS();
			  json = x2js.xml_str2json(data);
			  
			  var variableCnt = JSON.stringify(json.GetVariablesResponseElement.VarFamilies.VarFamily.length);
			  var obj = json.GetVariablesResponseElement.VarFamilies;
			 
			 var variableItem = '<ul class="nav-secondary__list margin-left--half">';
    		 for(var m=0;m<variableCnt;m++){
    			 variableItem += '<li class="padding-left--none inline">' + obj.VarFamily[m].Name + ", " + '</li>';
    			
    			// $('ul.nav-secondary__list').append('<li class="inline">' + obj.VarFamily[m].Name + '</li>');
    		 }
    		 
    		 showHide();
    		 var results = '<ul class="list--neutral margin-top--half">';
			  results +=        '<li class="col-wrap background--mercury flush-col padding-top--2 padding-bottom--4 padding-left--1 " >';
			  results +=        '<div class="js-show-hide">';
			  results +=        '<div class="show-hide show-hide--light">';
			  results +=        '<div class="js-show-hide__title margin-right-lg--5">';				  
			  results +=        '<button class="js-show-hide__button" type="button" aria-expanded="false" aria-controls="collapsible-0">';
			  results +=        '<a aria-expanded="false" aria-controls="collapsible-0" href="localDatasetDetail.html?">'  + dsName + '</a>';	
			  results +=        '</button>';
			  results +=        '<p class=" margin-right-lg--5">'+ optionalMetaData + '</p>';						 
			  results +=        '</div>';
			  results +=        '<div class="js-show-hide__content  show-hide show-hide--light margin-right-lg--5">';
			  results +=        '<div class="nav-secondary__list">';
			  results +=        '<p class="margin-left--half flush-bottom flush-top"><strong>Dimensions</strong></p>';				   									
			  results +=        '<p class="margin-left--half flush-bottom flush-top">Religion:</p>';							    
			  results +=        variableItem;
			  results +=        '</ul>';
			  results +=        '<p class="margin-left--half flush-bottom flush-top "><strong>Geographies covered</strong></p>'; 
			  results +=        '<ul class="nav-secondary__list margin-left--half">';
			  results +=	    '<li class="padding-left--none inline">Output Area,</li>';
			  results +=	    '<li class="padding-left--none inline">Lower Super Output Area,</li>';
			  results +=	    '<li class="padding-left--none inline">Electoral Ward,</li>';
			  results +=	    '<li class="padding-left--none inline">Middle Layer Super Output Area,</li>';
			  results +=	    '<li class="padding-left--none inline">Non-metropolitan District</li>';
			  results +=        '</ul>';
			  results +=        '<p class="margin-left--half flush-bottom flush-top "><strong>Dates covered</strong></p>';
			  results +=        '<p class="margin-left--half flush-bottom flush-top ">Output Area, Lower Layer etc...</p>';
			  results +=        '<p class="margin-left--half flush-bottom flush-top "><strong>Dates covered</strong></p>';
			  results +=        '<p class="margin-left--half flush-bottom flush-top ">2011, 2001</p>';
			  results +=        '<p class="margin-left--half flush-bottom flush-top "><strong>Source</strong></p>';
			  results +=        '<p class="margin-left--half flush-bottom flush-top ">2011 Census</p>';
			  results +=        '<p class="margin-left--half flush-bottom flush-top "><strong>Themes</strong></p>';
			  results +=        '<p class="margin-left--half flush-bottom flush-top ">Cultural Identity</p>';
			  results +=        '</div></div></div></div></li></ul>';
			  $('#results').append(results);   
			  showHide();
    		  
		  }	// if(data != "")
		} 
		
   }) //$.ajax({
} 
	