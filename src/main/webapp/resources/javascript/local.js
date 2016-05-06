// used in url param validation// valid url - continue

validateUrl();

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
    
    return vars;
}

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
	