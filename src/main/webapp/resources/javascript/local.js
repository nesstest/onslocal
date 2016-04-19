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
	var urlregex               = /^[a-zA-Zâ0-9-\''\s\\&\\'\\:\\/\\(\\)\\!\\,\\+\\.\\%]+$/;
	
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
			  getVariables(dsFamilyId, startDate, endDate);
			  //$('ul.nav-secondary__list').empty();
			  
			  showHide();			
			  $('#results').append('<ul class="list--neutral margin-top--half">' +
				 	'<li class="col-wrap background--mercury flush-col padding-top--2 padding-bottom--4 padding-left--1 " >' +							
					   '<div class="js-show-hide">' +
						   '<div class="show-hide show-hide--light">' +	
							   '<div class="js-show-hide__title margin-right-lg--5">' + 									
							        '<button class="js-show-hide__button" type="button" aria-expanded="false" aria-controls="collapsible-0">' +
								        '<a aria-expanded="false" aria-controls="collapsible-0" href="localDatasetDetail.html?">'  + dsName + 											  
										'</a>' +
							        '</button>' +
							        '<p class=" margin-right-lg--5">'+ optionalMetaData + '</p>' +
							   '</div>' +  
						       '<div class="js-show-hide__content  show-hide show-hide--light margin-right-lg--5">' +
						       '<div class="nav-secondary__list">' +
							      '<p class="margin-left--half flush-bottom flush-top"><strong>Dimensions:-</strong></p>' +
							      '<p class="margin-left--half flush-bottom flush-top ">Religion:</p>' +
					              '<ul class="nav-secondary__list margin-left--half">'); 	
			              			
					             
			showHide();
		  }	  
	    }  
    });      
 }

/**
 * finds the matching datasets
 */ 
function findDatasets(searchtext){	
	 var url = "";
	 var dataset, dsFamilyId, metadataText, obj, subject;
	 var matchingCount  = 0;
	 var dsRelFamcnt    = 0;
	 var dsMatFamcnt    = 0;
		    
	 $.ajax({
		type	: "POST",
		url		: "http://neighbourhood.statistics.gov.uk/NDE2/Disco/FindDatasets?Metadata=" + searchtext,
		dataType: "text",
		data	: {"url" : url},
		success : function(data)
		{
		  if(data != "")
	      {
			  x2js = new X2JS();
			  json = x2js.xml_str2json(data);
				  
			  var SubjectMatchingDSFcnt = JSON.stringify(json.FindDatasetsResponseElement.SubjectsWithMatchingDSFamilies.SubjectWithMatchingDSFamilies.length);	      
				  
			  for(var i=0;i<SubjectMatchingDSFcnt;i++){
						    
			    obj = json.FindDatasetsResponseElement.SubjectsWithMatchingDSFamilies.SubjectWithMatchingDSFamilies[i];
			    subject = obj.Subject.Name; 		   		    
						    
			    if(obj.RelatedDSFamilies != "")
			    {			    	
			    	if (obj.RelatedDSFamilies.DSFamily instanceof Array) {
		    	    // data is an array
					    	     
	        		  dsRelFamcnt   = JSON.stringify(obj.RelatedDSFamilies.DSFamily.length) ;
		    		  for(var j=0;j<dsRelFamcnt;j++){
		   			     matchingCount = parseInt( matchingCount) + 1;
			        	 dataset       = obj.RelatedDSFamilies.DSFamily[j].Name;
			        	 dsFamilyId    = obj.RelatedDSFamilies.DSFamily[j].DSFamilyId; 
			        	 startDate     = obj.RelatedDSFamilies.DSFamily[j].DateRange.StartDate.slice(0,10);
			        	 endDate       = obj.RelatedDSFamilies.DSFamily[j].DateRange.EndDate.slice(0,10);
				         // get dataset details 
			        	 getDatasetDetail(dsFamilyId, dataset,subject,startDate,endDate); 			        	
				       }
					} else {
						  // it is not an array
						  matchingCount = parseInt(matchingCount) + 1;
						  dataset       = obj.RelatedDSFamilies.DSFamily.Name;
						  dsFamilyId    = obj.RelatedDSFamilies.DSFamily.DSFamilyId;
				          startDate     = obj.RelatedDSFamilies.DSFamily.DateRange.StartDate.slice(0,10);
				          endDate       = obj.RelatedDSFamilies.DSFamily.DateRange.EndDate.slice(0,10);
						  // get dataset details
				          getDatasetDetail(dsFamilyId, dataset,subject,startDate,endDate);				        
						}
				 }
				 if(obj.MatchingDSFamilies != "")
				 {
				   	if (obj.MatchingDSFamilies.DSFamily instanceof Array) {
				  	 // data is an array
				     dsMatFamcnt = JSON.stringify(obj.MatchingDSFamilies.DSFamily.length);
					 for(var k=0;k<dsMatFamcnt;k++){
					   	 matchingCount = parseInt(matchingCount) + 1;
					   	 dataset       = obj.MatchingDSFamilies.DSFamily[k].Name;					     
					   	 dsFamilyId    = obj.MatchingDSFamilies.DSFamily[k].DSFamilyId;
					   	 startDate     = obj.MatchingDSFamilies.DSFamily[k].DateRange.StartDate.slice(0,10);
			        	 endDate       = obj.MatchingDSFamilies.DSFamily[k].DateRange.EndDate.slice(0,10);
			        	 getDatasetDetail(dsFamilyId, dataset,subject,startDate,endDate);			        	
					  }	
				   	} else{
					   	 // it is not an array
					   	 matchingCount = parseInt(matchingCount) + 1;
					   	 dsMatFamcnt   = JSON.stringify(obj.MatchingDSFamilies.DSFamily.length);
					     dataset       = obj.MatchingDSFamilies.DSFamily;	
					     dsFamilyId    = obj.MatchingDSFamilies.DSFamily.DSFamilyId;
					     startDate     = obj.MatchingDSFamilies.DSFamily.DateRange.StartDate.slice(0,10);
				         endDate       = obj.MatchingDSFamilies.DSFamily.DateRange.EndDate.slice(0,10);
					     // get dataset details
				         getDatasetDetail(dsFamilyId, dataset,subject,startDate,endDate);				        
				    }     
				 }
					
				} // for(var i=0;i<SubjectMatchingDSFcnt;i++){
			  
			 }	// if(data != "")
		 
				//  $('#searchText').append('<span style="font-size: 1.5em;" class="stand-out-text"><strong>Search results for ' +  "'" + searchtext +  "'" + '</strong></span><br>');
		   }	
	 }) //$.ajax({
}


 /**
  * Give me a list of variables for the specified dataset between the specified start and end dates.
  */ 
 function getVariables(dsFamilyId, startDate, endDate) {
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
			
			 // $('#varList').append('<p class="margin-left--half flush-bottom flush-top"><strong>Dimensions:-</strong></p>' +
		    //  '<p class="margin-left--half flush-bottom flush-top ">Religion:</p>' +
            //  '<ul class="nav-secondary__list margin-left--half">');
			  
			 
			   
    		 for(var m=0;m<variableCnt;m++){
    			// $( "li " ).appendTo( "#results" );
    			  $('ul.nav-secondary__list').append('<li>' + obj.VarFamily[m].Name + '</li>');
    			  
    			  
    		 }
    		 
    		 
    		  
		  }	// if(data != "")
		} 
		
   }) //$.ajax({
} 
	