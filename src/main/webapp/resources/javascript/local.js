/**
 * Gets parameters off the url
 * @return name
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

/**
 * Read a user input postcode and strip of plus signs,
 * convert to uppercase and reformat if necessary
 * @param String postcode
 * @return String uppercase postcode
 */
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

/**
 * The encodeURIComponent() function encodes a URI component. 
 * This function encodes special characters
 * @param String name
 * @return encodeURIComponent(name)
 */
function encodeName(name) {
	var encodetxt = encodeURIComponent(name);
	return encodetxt;
}

/**
 * Gets the unencoded version of an encoded component of a Uniform Resource Identifier (URI). 
 * This function decodes a Uniform Resource Identifier (URI) component previously created 
 * by encodeURIComponent or by a similar routine
 * @param String name encoded 
 * @return decodeURIComponent(name)
 */
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
		    		getSearchDetails(searchtext,"postcode");
				    $(document).ready(function(){					
				 //   	homePageBoxes(searchtext);
						
					});
		    	}
		    } //if($postcode =  /\d/)
		    // name search
		    else {    		
		    	getSearchDetails(searchtext,"name")
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

//global variables for url
var timeId    = $.getUrlVar('timeId');
var dsId      = $.getUrlVar('dsId');
var areacode  = $.getUrlVar('areacode');   
var levelname = $.getUrlVar('levelname');   

/**
 * Gets area details
 * @param String postcode
 * @param String search
 */
function getSearchDetails(postcode,search){	
	
  if (postcode == null || postcode.length == 0 || typeof postcode === 'undefined') {        	
  }
  else {    	
		 if(search === 'postcode'){			
			OA_pcode_details(postcode,dsId, timeId);
		 }
		 else{					
			dataTable(areacode, levelname, dsId, timeId);
		}			
	}	
}

/**
 * Gets OA details for area
 * @param String postcode
 */
function  OA_pcode_details(postcode, dsId, timeId) {	
	var OA; 
	var doterm;	
	
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
		    OA               = result.features[0].attributes.oa11cd;			
	        doterm           = result.features[0].attributes.doterm; 	
	                
	        // check to see if postcode not obsolete (doterm === null valid)
	        if(doterm === "") {	        	 
    	        //dataTable(extCode, levelname, dataresource, timeid)
                dataTable(OA, "OA", dsId , timeId, postcode);
			    	      			       
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
 * Gets the area level types for a given dataset
 * and writes to results 
 * @Param the dataset 
 * @Param the dataset id
 * @Param the metadata 
 */ 
function getAreaLevelTypes(dataset, dsId, metadata, taxonomy,time ,searchtext,page){
	 var url = "";	
	 	 	
	 $.ajax({
		type	: "GET",
		url     : "http://ec2-52-25-128-99.us-west-2.compute.amazonaws.com/local-data-web/rs/local-data/geolevels?dataResource=" + dsId,				 
		dataType: "JSON",
		data	: {"url" : url},
		success : function(data)
		{
			  if(data != "")
		      {				 
				 if(page == "list"){
					 showHide();	
		    		  var results = '<ul class="list--neutral margin-top--half">';
					  results +=        '<li class="col-wrap background--mercury flush-col padding-top--2 padding-bottom--4 padding-left--1 " >';
					  results +=        '<div class="js-show-hide">';
					  results +=        '<div class="show-hide show-hide--light">';   
					  results +=        '<div class="js-show-hide__title margin-right-lg--5">';				  
					  results +=        '<button class="js-show-hide__button" type="button" aria-expanded="false" aria-controls="collapsible-0">';
					  results +=        '<a aria-expanded="false" aria-controls="collapsible-0" href="localDatasetDetail.html?q=' + searchtext + '&dsId=' + dsId + '&timeId=' + time + '">'  + 'Dataset: ' + dsId +': ' + dataset + '</a>';	
					  results +=        '</button>';
					  results +=        '<p class=" margin-right-lg--5">'+ metadata + '</p>';						 
					  results +=        '</div>';
					  results +=        '<div class="js-show-hide__content  show-hide show-hide--light margin-right-lg--5">';
					  results +=        '<div class="nav-secondary__list">';					 
					  results +=        '<p class="margin-left--half flush-bottom flush-top "><strong>Geographies covered</strong></p>'; 
					  results +=        '<ul class="nav-secondary__list margin-left--half">';
					  results +=	    '<li class="padding-left--none inline">'+ data.geographic_level_type +'</li>';
					  results +=        '</ul>';
					  results +=        '<p class="margin-left--half flush-bottom flush-top "><strong>Dates covered</strong></p>';
					  results +=        '<p class="margin-left--half flush-bottom flush-top ">2011, 2001</p>';
					  results +=        '<p class="margin-left--half flush-bottom flush-top "><strong>Source</strong></p>';
					  results +=        '<p class="margin-left--half flush-bottom flush-top ">2011 Census</p>';
					  results +=        '<p class="margin-left--half flush-bottom flush-top "><strong>Themes</strong></p>';
					  results +=        '<p class="margin-left--half flush-bottom flush-top ">' + taxonomy + '</p>';
					  results +=        '</div></div></div></div></li></ul>';					  
					  					 
					  $('#results').append(results);   
					  showHide();
				  }
				 else{
					 var metadataText = '<p>' + metadata + '</p>';
					 $('#results').append(metadataText);
					 getConceptSystem(dsId);				 
					 
					 var results =  '<p class="flush-bottom flush-top "><strong>Geographies covered</strong></p>';
					 results += '<ul class="list--neutral list--inline margin-top--half ">';
					 results += '<li class="padding-left--none">' + data.geographic_level_type +'</li>';					 
					 results += '</ul>';
					 results += '<p class="flush"><strong>Dates covered</strong></p>';
					 results += '<p class="flush">2011, 2001</p>';
					 results += '<p class="flush"><strong>Source</strong></p>';
					 results += '<p class="flush">2011 Census</p>';
					 results += '<p class="flush"><strong>Themes</strong></p>';
					 results += '<p class="flush">' + taxonomy + '</p>';			         
			         $('#results').append(results);  
			         $('#datasetId').append('<span >Dataset ID: </span>' + dsId);
			         $('#title').append(dataset);
				 }
		         //  **** To do require dataset details ie. variable & dates  ****	
				  
			  }	// if(data != "")
		}  
	 })	
}

/**
 * Finds the matching datasets for a given 
 * search string
 * @Param the searchtext 
 */ 
function findDatasets(searchtext){		
	
	 var url = "";
	 var dataset, dsId, metadata, obj;
	 var matchingCount = 0;	
		    
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
				 taxonomy  = obj.taxonomies;								 
				 
				 // get geographies covered for dataset							 
				 //getAreaLevelTypes(dataset,dsId,metadata,taxonomy);
				 gettimeId(dataset, dsId, metadata, taxonomy, searchtext);
					
				} // for(var i=0;i<matchingCount;i++){
			  
			 }	// if(data != "")
		  
		     $('#count').append('<h2 aria-live="polite" class="search-page__results-text">' +
	    		 '<span class="stand-out-text">' + matchingCount + '</span>' +
	    		 ' datasets found <span class="lowercase">Sorted by <strong>Relevance</strong></span>' +
		         '.</h2>');
		   }	
	 }) //$.ajax({
}

/**
 * Get the time id for the given dataset
 * @Param the dataset
 * @Param the dsId
 * @Param the metadata 
 * @Param the taxonomy
 * @Param the searchtext 
 */ 
function gettimeId(dataset, dsId, metadata, taxonomy, searchtext){		
	
	 var url = "";
	 var page = "list";
	
	 $.ajax({
		type	: "GET",
		url     : "http://ec2-52-25-128-99.us-west-2.compute.amazonaws.com/local-data-web/rs/local-data/latesttime?dataResource=" + dsId,
		dataType: "JSON",
		data	: {"url" : url},
		success : function(data)
		{
		  if(data != "")
	      {
			  time   = data.time_period_id;			  
			  getAreaLevelTypes(dataset,dsId,metadata,taxonomy,time, searchtext,page); 
		   }
		}  
	 }); //$.ajax({
}
/**
 *  select an area from a pre-populated 
 *  list of areas
 */ 
 function placenameSearch() {
	  // declare global vars	  
	   
	    // used in url param validation
	    var invalidCnt = 0;  
	    var searchtext;
	    var levelname;
	    // select an area from a pre-populated list of areas
		$(function() {
			$( "#nav-search" ).autocomplete({
		      minLength: 3,
		      source: "http://onsdatav3-glassfishtest.rhcloud.com/data-web/rs/nessdata/search",
		   
		      select: function( event, ui ) {
		    	
		    	// Set autocomplete element to display the label only when results have been found
		    	if (ui.item.label === "No results found"){ 
		    		// do nothing no result found
		    		 $('#nav-search-submit').prop('disabled', false);
		    	}
		    	else{
			        $( "#nav-search" ).val( ui.item.label );
			    	var levelname;
			    	if (ui.item.type === "Ward"){
			    		levelname = "WARD";
			    	}
			    	if (ui.item.type === "Local Authority"){
			    		levelname = "LA";
			    	}
			    	if (ui.item.type === "Region"){
			    		levelname = "REGION";
			    	}
			    	if (ui.item.type === "Country"){
			    		levelname = "COUNTRY";
			    	}
			    	
			    	timeId  = $.getUrlVar('timeId');
			    	dsId    = $.getUrlVar('dsId');
			    	
			    	window.location.href =  'localDatasetTable.html?q=' + encodeName(ui.item.label) + '&areacode=' + ui.item.extcode + '&levelname=' + levelname + '&dsId=' + dsId + '&timeId=' + timeId;
		    	
			        // Prevent default behaviour
			        return false;
		    	}     
		      },
		      close: function() {
		    	   $('.ui-menu').css('display', 'block'); 		    
		      }, 		      
		      response: function(event, ui, ul) {
		          if (!ui.content.length) {
		        	  if(!/\d/.test($("#nav-search").val())) {
		        		  var noResult = { value:"",label:"No results found",type:"",parent_name:"" };
			              ui.content.push(noResult); 
			             // return false;
		        	  }		        	
		          }
		          else{		        	  
	        		  $( "#nav-search" ).autocomplete( "instance" )._renderItem = function( ul, item ) {
	        		      return $( "<li>" )
	        		        .append( "<a>"  + item.label + " (" + item.type + "), " + item.parent_name + "</a>" )
	        		        .appendTo( ul );
	        		    };
	        	  }
		      } // response		      
		    }) //  $( "#nav-search" ).autocomplete({  
		});
		
		$(function(){		
		   $('#nav-search').keyup(function(){	
           var $th = $(this);
           $th.val($th.val().replace(/[^.\\:\\&\\,\\(\\)\\!\\/\\''a-zA-Zâ0-9\-\ ]/g,
         		  
           function (str) {
              alert('Special characters not allowed');
              return '';
           }));
           
	          if (!/\d/.test($("#nav-search").val())) { //all alpha chars - placename search		        	  
	        	  $('#nav-search-submit').prop('disabled', true);
	          } else {
	              // Contains a numeric - postcode search
	              $('#nav-search-submit').prop('disabled', false);	              
	          }
		   });		  
           
           $("#form").submit( function(eventObj) {
        	 $('<input />').attr('type', 'hidden')
        	    .attr('name', "timeId")
        	    .attr('value', timeId)        	          
        	    .appendTo('#form');
        	 $('<input />').attr('type', 'hidden')
    	          .attr('name', "dsId")
    	          .attr('value', dsId)        	          
    	          .appendTo('#form');        	     
        	      return true;
        	 });
		});	
 }
 
 /**
  * Get the dataset details 
  * @Param the searchtext
  * @Param the dsId
  */ 
 function datasetDetail(searchtext,dsId){	
	 
	 var url = "";
	 var dataset, dsId, metadata, obj;
	 var matchingCount = 0;
	 var page = "details";
	 
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
					 if(obj.data_resource == dsId){ 
				    
						 dataset   = obj.title;
						 dsId      = obj.data_resource; 
						 metadata  = obj.metadata;
						 taxonomy  = obj.taxonomies;
						
					 
						 // get geographies covered for dataset							
						 getAreaLevelTypes(dataset,dsId,metadata,taxonomy,page);						
					}
				} // for(var i=0;i<matchingCount;i++){
			 }	// if(data != "")
		   }	
	 }) //$.ajax({
 }
 
 /**
  * Get the Concept System details for
  * the specified dataset
  * @Param the dsId
  */ 
function getConceptSystem(dsId){
	 var url = "";
	 var concept_system, name, dsId, obj;
	 var matchingCount = 0;
	 
	 $.ajax({
			type	: "GET",
			url     : "http://ec2-52-25-128-99.us-west-2.compute.amazonaws.com/local-data-web/rs/local-data/getconceptsystem?dataResource=" + dsId,	
			dataType: "JSON",
			data	: {"url" : url},
			success : function(data)
			{
			  if(data != "")
		      {  				 
				  sep = ',&nbsp';
				  var matchingCount = (data.concept_systems.length);
				  var results   = '<p class="flush"><strong>Dimensions:</strong></p>';
				  results      += '<ul class="list--neutral list--inline margin-top--half">' + data.concept_systems[0].concept_system + ': ';	
				 
				  concept_system = data.concept_systems[0].concept_system;
				  
				  for(var i=0;i<matchingCount;i++){
					 obj = data.concept_systems[i];
					 
					 if (obj.concept_system == concept_system){
						 results += '<li class="padding-left--none ">' + obj.name + sep + '</li>';
					 }
					 // different concept system write new heading
					 else{	
						 results = removeLastComma(results); 
						 concept_system = obj.concept_system;
						 results += '</ul><br/>'; 
						 results += '<ul class="list--neutral list--inline margin-top--half">' + concept_system + ': ' ;						  
						 results += '<li class="padding-left--none ">' + obj.name + sep + '</li>';
					 }			
					 
				} // for(var i=0;i<matchingCount;i++){
				results = removeLastComma(results);  
				results += '</ul><br/>'; 
				$('#results').append(results); 
				//return results;
			 }	// if(data != "")
		   }	
	 }) //$.ajax({
}

function removeLastComma(str){        
    var n=str.lastIndexOf(",");
    var a=str.substring(0,n) 
    return a;
}

