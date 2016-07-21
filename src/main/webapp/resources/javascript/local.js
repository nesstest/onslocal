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
	
	 var pcUrl = "http://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/find?text=" + postcode + "&outFields=*&bbox=%20-5.4188710000000002,49.865400000000001,%201.7641,55.813870000000001&sourceCountry=GBR&outSR=27700&f=json&maxLocations=6";
	    
     $(document).ready(function(){		
		   $.getJSON(pcUrl, function(response){    	  
	   	xc = response.locations[0].feature.geometry.x;
	    yc = response.locations[0].feature.geometry.y;	 
	    getDatasetLevelType(postcode,dsId,timeId,xc,yc);	
      });
    });
 } 

/**
 * Accept specified characters found legally in placenames ie colons, hyphens etc..
 */
function checkURL(key,value) {
	var urlregex               = /^[a-zA-Zï¿½0-9-\''\s\\&\\'\\:\\/\\(\\)\\!\\,\\+\\.\\%]+$/;
	
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
function getAreaLevelTypes(dataset, dsId, metadata, taxonomy,time, searchtext, page){
	 var url = "";	
	 var arealist;
	 
	 //var meta = getMetadata(dsId);	
	 	 	
	 $.ajax({
		type	: "GET",
		url     : "http://ec2-52-25-128-99.us-west-2.compute.amazonaws.com/local-data-web/rs/local-data/geolevels?dataResource=" + dsId,				 
		dataType: "JSON",
		data	: {"url" : url},
		success : function(data)
		{			
			 var matchingCount = (data.geographic_level_types.length); 
	         var areas = [];	        
	         for(var i=0;i<matchingCount;i++){     
	           obj           = data.geographic_level_types[i];    
	           arealist      = obj.metadata; 	              
	           areas.push(" " + arealist); 	           
	         } 
	         getMetadata(dataset, dsId, metadata, taxonomy,time, searchtext, page,areas);			
		}  
	 });	
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
           $th.val($th.val().replace(/[^.\\:\\&\\,\\(\\)\\!\\/\\''a-zA-ZÃ¢0-9\-\ ]/g,
         		  
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
        	 $('<input />').attr('type', 'hidden')
	          .attr('name', "levelname")
	          .attr('value', "OA")        	          
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
	 }); //$.ajax({
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

/**
 * Get the Download url details for
 * the specified dataset
 * @Param the dsId
 */ 
function getDownload(dsId){	
	
	 var url = "";
	 var dsId;	
	 
	 $.ajax({
		type	: "GET",
		url     : "http://ec2-52-25-128-99.us-west-2.compute.amazonaws.com/local-data-web/rs/local-data/presentation?dataResource=" + dsId,
		dataType: "JSON",
		data	: {"url" : url},
		success : function(data)
		{
		  if(data != ""){				 
			$('#downloadXLS').append('<a style="color:white;text-decoration:none;" href="' + data.presentations[0].download_url + '"> Download as XLS</a>');	
		  }				
	    }	
    }); 
	 
	 $('#viewJSON').append('<a style="color:white;text-decoration:none;" href="' + window.location.href + '&data=json">View JSON</a>');	

}

function getMetadata(dataset, dsId, metadata, taxonomy,time, searchtext, page, areas){	
	
	 var url = "";
	 var dataset, dsId, metadata, obj;
	 var matchingCount = 0;	
		    
	 $.ajax({
		type	: "GET",
		url     : "http://ec2-52-25-128-99.us-west-2.compute.amazonaws.com/local-data-web/rs/local-data/metadata?dataResource=" + dsId,
		dataType: "JSON",
		data	: {"url" : url},
		success : function(data)
		{
		  			  
	//	  var matchingCount = (data.dimensional_data_sets.length);
		 				  
	//	  for(var i=0;i<matchingCount;i++){
			  
	//		 obj = data.dimensional_data_sets[i];		    
		
	//		   source          = obj.source;
	//		   releaseDate     = obj.release_date;
	//		   nextReleaseDate = obj.next_release;
	//		   contact         = obj.contact;
			   source          = data.source;
			   releaseDate     = data.release_date;
			   nextReleaseDate = data.next_release;
			   contact         = data.contact;			   
				
	//	  } // for(var i=0;i<matchingCount;i++){			  
			
		  if(data != "")
	      {				 
			 if(page == "list"){
				 showHide();	
	    		  var results = '<ul class="list--neutral margin-top--half">';
				  results +=        '<li class="col-wrap background--mercury flush-col padding-top--2 padding-bottom--4 padding-left--1 " >';
				  results +=        '<div class="js-show-hide">';
				  results +=        '<div class="show-hide show-hide--light">';   
				  results +=        '<div class="js-show-hide__title margin-right-lg--5" style="position: relative;">';				  
				  results +=        '<button style="width: 100px; position: absolute; right: 0px; top:0px; height: auto;" class="js-show-hide__button" type="button" aria-expanded="false" aria-controls="collapsible-0">';
				  results +=        '</button>';
				  results +=        '<div class=" margin-right-lg--5"><a aria-expanded="false" aria-controls="collapsible-0" href="localDatasetDetail.html?q=' + searchtext + '&dsId=' + dsId + '&timeId=' + time + '">'  + 'Dataset: ' + dsId +': ' + dataset + '</a></div>';	
				  results +=        '<p class=" margin-right-lg--5">'+ metadata + '</p>';						 
				  results +=        '</div>';
				  results +=        '<div class="js-show-hide__content  show-hide show-hide--light margin-right-lg--5">';
				  results +=        '<div class="nav-secondary__list">';					 
				  results +=        '<p class="margin-left--half flush-bottom flush-top "><strong>Geographies covered</strong></p>'; 
				  results +=        '<ul class="nav-secondary__list margin-left--half">';
				  results +=	    '<li class="padding-left--none inline">'+ areas + '</li>';
				  results +=        '</ul>';
				  results +=        '<p class="margin-left--half flush-bottom flush-top "><strong>Dates covered</strong></p>';
				  results +=        '<p class="margin-left--half flush-bottom flush-top ">Release date: ' + releaseDate + '&nbsp;&nbsp;&nbsp; Next release date: ' + nextReleaseDate + '</p>';
				  results +=        '<p class="margin-left--half flush-bottom flush-top "><strong>Source</strong></p>';
				  results +=        '<p class="margin-left--half flush-bottom flush-top ">' + source + '</p>';
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
				 results += '<li class="padding-left--none">' + areas +'</li>';					 
				 results += '</ul>';
				 results += '<p class="flush"><strong>Dates covered</strong></p>';
				 results += '<p class="flush">Release date: ' + releaseDate + '&nbsp;&nbsp;&nbsp; Next release date: ' + nextReleaseDate + '</p>';
				 results += '<p class="flush"><strong>Source</strong></p>';
				 results += '<p class="flush">' + source + '</p>';
				 results += '<p class="flush"><strong>Themes</strong></p>';
				 results += '<p class="flush">' + taxonomy + '</p>';			         
		         $('#results').append(results);  
		         $('#datasetId').append('<span >Dataset ID: </span>' + dsId);
		         $('#title').append(dataset);
		         $('#releaseDate').append('<span>Release date: </span><br/>' + releaseDate + '<br/>');
		         $('#nextRelease').append('<span>Next release: </span><br/>' + nextReleaseDate);
		         $('#contact').append('<img class="meta__image" src="resources/img/national-statistics.png" alt="National Statistics logo"/>' + 
		           '<span>Contact: </span><br/><a href="mailto:someone@ons.gsi.gov.uk" data-ga-event data-ga-event-category="mailto" data-ga-event-label="someone@ons.gsi.gov.uk">' + contact + '</a>');		         
			 } 
		  }	// if(data != "") 
	    }	
	 }); //$.ajax({
}

var rankedareas = ["OA", "LSOA", "WARD", "MSOA", "NUTS3", "NUTS2", "NUTS1", "NUTS0", "WPC", "LA", "COUNTY", "REGION", "COUNTRY", "EW", "GB", "UK"];
var layervals    = ["oa", "lsoa", "WD_2013_GB_BGC", "msoa", "nuts3", "nuts2", "nuts1", "NUTS0_2015_GB_BSC", "pcon", "LAD_2013_GB_BSC", "LMCTYUA","Regions_December_2014_Generalised_Clipped_Boundaries_in_Great_Britain","CTRY_2015_EW_BSC","NAT","GB","UK"];

function getDatasetLevelType(postcode,dsId,timeId,xc,yc){
   var url = "";
   var arealist;
   $.support.cors = true; // this is required for IE
    $.ajax({
          type   : "GET",
          url     : "http://ec2-52-25-128-99.us-west-2.compute.amazonaws.com/local-data-web/rs/local-data/geolevels?dataResource=" + dsId,
          dataType: "JSON",
          data   : {"url" : url},
          success : function(data)
          {
           var matchingCount = (data.geographic_level_types.length);
           var areas = [];
            for(var i=0;i<matchingCount;i++){
              obj           = data.geographic_level_types[i];
              arealist      = obj.geographic_level_type;
              areas.push(arealist);
            }
           
            var leveltype = "UK";            
            var areaCount = rankedareas.length;                   
            for(var j=0;j<areaCount;j++){
              leveltype = rankedareas[j];
              layer     = layervals[j];
              if (areas.indexOf(leveltype) > -1)
              {
                     break;
               }
            }   
            
           getExtCode(postcode,dsId,timeId,xc,yc,layer, leveltype);	
          },
          fail:function(jqXHR, textStatus, errorThrown) {
                 alert("failed");
          }
    });
}


function getExtCode(postcode,dsId,timeId,xc,yc,layer,levelType){		
	
	var URL = "http://services1.arcgis.com/ESMARspQHYMw9BZ9/ArcGIS/rest/services/" + layer + "/FeatureServer/0/query?returnGeometry=false&outFields=*&geometryPrecision=0&f=json&geometry=" +
	xc + "," + yc + "&geometryType=esriGeometryPoint&inSR=27700";	
	
    $.getJSON(URL)
    .done(function(response) { 		
   	  var codefield = response.fields[1].name;
	  var namefield = codefield.substring(0, codefield.length - 2) + "NM";
   	  var ecode = response.features[0].attributes[codefield];
   	  var ename = response.features[0].attributes[namefield];   
   	 dataTable(ecode, levelType, dsId , timeId, postcode);	
  })   
}


function removeLastComma(str){        
    var n=str.lastIndexOf(",");
    var a=str.substring(0,n) 
    return a;
}