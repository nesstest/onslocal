function dataTable(extCode, geographicLevelType, dataResource, timePeriod, postcode, xc,yc){
 var tabledata,dataResource,extCode;
    

getTitle(dataResource);
getAvailableAreaLevelTypes(dataResource, extCode,timePeriod,geographicLevelType,postcode,xc,yc);
 
 var url = "";
 var datap  = $.getUrlVar('data');
 if (datap == "json") {
     url    = "http://ec2-52-25-128-99.us-west-2.compute.amazonaws.com/local-data-web/rs/local-data/data?dataResource=" + dataResource + "&extCode=" + extCode + "&geographicLevelType=" + geographicLevelType + "&timePeriod=" + timePeriod;
     window.location.replace(url);
 }
 else
 {
 $.ajax({
    type    : "GET",
    url     : "http://ec2-52-25-128-99.us-west-2.compute.amazonaws.com/local-data-web/rs/local-data/data?dataResource=" + dataResource + "&extCode=" + extCode + "&geographicLevelType=" + geographicLevelType + "&timePeriod=" + timePeriod,
    dataType: "JSON",
    data    : {"url" : url},
    success : function(data){ 
        if(data.error){
             //redErrorbox();
        	alert("No Data for area Level");
        }
        else{        
            var matchingCount = (data.variables.length); 
            if(matchingCount >50){
                matchingCount = 50;
            }    
            var tabledata = [];                 	
            for(var i=0;i<matchingCount;i++){     
              obj           = data.variables[i];    
              id            = obj.variable_id; 
              areaname      = obj.name;              
              value         = obj.value;
              variable_name = obj.variable_name + " " + "(" + obj.unit_type  + "," + obj.value_domain + ")"; 
              if(!value){
            	 value = ".."; 
              } 
              else{
            	  value = parseFloat(value).toLocaleString(); 
              }                           
              tabledata.push({value:value,areaname:areaname,variable_name:variable_name});  
              
            }  
            table(tabledata,postcode);
        }
      }
   });
 }
}

function table(tabledata, postcode){	
		
	//placename search
	var column;
	if(postcode == null || postcode.length == 0 || typeof postcode === 'undefined'){
		 column = ({title:areaname, field:"value", sorter:"number", align:"left", width:"auto"});
  	 $('#selectedArea').append('<p><strong>Selected area</strong><br/>' + areaname + ' [<a style="cursor:pointer;" >Remove</a>]</p>'); 		 
	}
	else{		
		 column = ({title:postcode + "  " + "(" + areaname + ")", field:"value", sorter:"number", align:"left", width:"auto"});
	  $('#selectedArea').append('<p><strong>Selected area</strong><br/>' + postcode + "  " + '<br/>' +  "(" + areaname + ")" + '<br/> [<a style="cursor:pointer;" >Remove</a>]</p>');	 
	}
	
	$(".tabulator-col[data-index='1']").text(postcode + "  " + "(" + areaname + ")");
	
  $("#datatable").tabulator({
	height:"auto",
	fitColumns:true,
	tooltips:true,
	movableCols: true,
	movableRows: true,	
    sortBy:'variable_name', 
	sortDir:'asc',	
	//groupBy:function(tabledata){
	//    return tabledata.areaname;
	//},
	columns:[		
	{title:"", field:"variable_name", width:"auto", sorter:"alphanum"}, column],		
  });  
  
  $("#datatable").tabulator("setData", tabledata);
  
  $("#clear").click(function(){
      $("#datatable").tabulator("clear");
  })
  
  $("#reset").click(function(){
    $("#datatable").tabulator("setData", tabledata);
  }); 
  
  $("#selectedArea").click(function(){	  
	  $("#datatable").tabulator("toggleCol","value") ////toggle the visibility of the "value" column	  
  });

}

function getAvailableAreaLevelTypes(dataResource, extCode,timePeriod,geographicLevelType,postcode,xc,yc){
    var url = "";   
       
    $.ajax({
       type    : "GET",
       url     : "http://ec2-52-25-128-99.us-west-2.compute.amazonaws.com/local-data-web/rs/local-data/geolevels?dataResource=" + dataResource,                 
       dataType: "JSON",
       data    : {"url" : url},
       success : function(data)
       {
         if(data != "")
         {                
        	 var matchingCount = (data.geographic_level_types.length); 
	         var areas = [];
	         var areadesc = [];	
	         var layers = [];
	         for(var i=0;i<matchingCount;i++){     
	           obj           = data.geographic_level_types[i];    
	           arealist      = obj.geographic_level_type;
	           areaDescList  = obj.metadata;
	           layersList    = obj.layers;
	           layers.push(layersList); 
	           areadesc.push(areaDescList);	           
	           areas.push(arealist);	      
             } 	
	         
            var areaCount = areadesc.length;                   
            for(var j=0;j<areaCount;j++){
              longAreas = areadesc[j];
              leveltype = areas[j];	
              layer     = layers[j];
              if(postcode == null || postcode.length == 0 || typeof postcode === 'undefined'){
            	  $('#geographies').append('<li style="font-size:13px; "class="filters__item"><a>' +  longAreas + '</a></li>');
              }
              else{
            	  $('#geographies').append('<li style="font-size:13px; "class="filters__item"><a style="cursor:pointer;" onclick="getDetails(\'' + postcode  +'\',\'' + dsId + '\',\'' + timeId + '\',\'' + xc + '\',\'' + yc + '\',\'' + leveltype + '\',\'' + layer + '\');">' + longAreas + '</a></li>');            	  
              }             
            }           
	      } 
        }  
    });
}

function getTitle(dataResource){
    var url = "";  
    
    $.ajax({
       type    : "GET",
       url     : "http://ec2-52-25-128-99.us-west-2.compute.amazonaws.com/local-data-web/rs/local-data/dataresourcetitle?dataResource=" + dataResource,                 
       dataType: "JSON",
       data    : {"url" : url},
       success : function(data)
       {
         if(data != "")
         {
        	 $('#datasetId').append(' <span class="stand-out-text"><strong>Dataset:' +  dataResource + ':' + data.title + '</strong></span> [<a href="localIndex.html?">change dataset</a>]');
         } 
       }  
   });
}

function getDetails(postcode, dsId, timeId, xc, yc, leveltype, layer){	
	var leveltype,dsId,timeId,postcode,xc,yc;
	
	var URL1 = "http://services1.arcgis.com/ESMARspQHYMw9BZ9/ArcGIS/rest/services/" + layer + "/FeatureServer/0/query?returnGeometry=false&outFields=*&geometryPrecision=0&f=json&geometry=" +
	xc + "," + yc + "&geometryType=esriGeometryPoint&inSR=27700";	 
	
    $.getJSON(URL1)
    .done(function(response) {    
   	  var codefield = response.fields[1].name;
	  var namefield = codefield.substring(0, codefield.length - 2) + "NM";
   	  var ecode = response.features[0].attributes[codefield];
   	  var ename = response.features[0].attributes[namefield];  
   	  
   	 $('#geographies').empty();
   	 $('#datasetId').empty();
     $('#selectedArea').empty(); 
       	  
   	 dataTable(ecode, leveltype, dsId , timeId, postcode, xc,yc);  	
  })  
}