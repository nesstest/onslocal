function dataTable(extCode, geographicLevelType, dataResource, timePeriod, postcode, Wdcode, LAcode, WPCcode, GORcode, Ctrycode){
 var tabledata,dataResource,extcode,Wdcode, LAcode, WPCcode, GORcode, Ctrycode,timePeriod; 
 
//var timePeriod= $.getUrlVar('timeId');

getTitle(dataResource);
getAvailableAreaLevelTypes(dataResource, extCode,Wdcode, LAcode, WPCcode, GORcode, Ctrycode,timePeriod,geographicLevelType);
 
 var url = "";
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
            var column = [];           	
            for(var i=0;i<matchingCount;i++){     
              obj           = data.variables[i];    
              id            = obj.variable_id; 
              areaname      = obj.name;
              value         = obj.value; 
              value_domain  = obj.value_domain; 
              unit_type     = obj.unit_type;
              variable_name = obj.variable_name; 
              value = parseFloat(value).toLocaleString();
              tabledata.push({value,areaname,variable_name});          
             // {id:1, name:"Billy Bob", age:"12", gender:"male", height:1, col:"red", dob:"", cheese:1},
              //column.push({title:variable_name, field:"value", width:"auto", sorter:"number", align:"left",  formatter:function(value, data, cell, row, options){
      		//	return parseFloat(value).toLocaleString();			
             // }});              
            }  
            table(tabledata,postcode);
        }
      }
 }); 
}

function table(tabledata, postcode){
	//placename search
	var column;
	if(postcode == null || postcode.length == 0 || typeof postcode === 'undefined'){
		 column = ({title:areaname, field:"value", sorter:"number", align:"left", width:"auto", formatter:function(value, data, cell, row, options){
			return parseFloat(value).toLocaleString();			
		}});
  	 $('#selectedArea').append('<p><strong>Selected area</strong><br/>' + areaname + ' [<a>Remove</a>]</p>'); 		 
	}
	else{
		 column = ({title:postcode + "  " + "(Output area " + areaname + ")", field:"value", sorter:"number", align:"left", width:"auto", formatter:function(value, data, cell, row, options){
			return parseFloat(value).toLocaleString();			
		}});
	  $('#selectedArea').append('<p><strong>Selected area</strong><br/>' + postcode + "  " + "(Output area " + areaname + ")" + ' [<a>Remove</a>]</p>');	 
	}
	
  $("#datatable").tabulator({
	height:"auto",
	fitColumns:true,
	tooltips:false,
	movableCols: true,
	movableRows: true,	
	//progressiveRender:true,
	//progressiveRenderSize:20, 
	//progressiveRenderMargin:50,
	//groupBy:function(tabledata){
	//    return tabledata.areaname;
	//},
	columns:[		
	{title:"Variable", field:"variable_name", width:"auto", sorter:"string"}, column],		
  });
  
  $("#filter-clear").click(function(){
	$("#filter-field").val("");
	$("#filter-type").val("=");
	$("#filter-value").val("");
	$("#datatable").tabulator("clearFilter");
  });
	
  $("#selectedArea").click(function(){	  
	  $("#datatable").tabulator("toggleCol","value") ////toggle the visibility of the "value" column	  
  });
  
  $("#datatable").tabulator("setData", tabledata);
  
  $("#clear").click(function(){
      $("#datatable").tabulator("clear");
  })
  
  $("#reset").click(function(){
    $("#datatable").tabulator("setData", tabledata);
  });
  
  $(window).resize(function(){
 	$("#datatable").tabulator("redraw");
  }); 
  
  $("#filter-field, #filter-type").change(updateFilter);
  
  $("#filter-value").keyup(updateFilter);
 
}

function updateFilter(){
	
	$("#filter-type").prop("disabled", false);
	$("#filter-value").prop("disabled", false);
	
	var filter = $("#filter-field").val();
		
	$("#datatable").tabulator("setFilter", filter, $("#filter-type").val(), $("#filter-value").val());
}

function getAvailableAreaLevelTypes(dataResource, extCode,Wdcode, LAcode, WPCcode, GORcode, Ctrycode, timePeriod, geographicLevelType){
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
	         for(var i=0;i<matchingCount;i++){     
	           obj           = data.geographic_level_types[i];    
	           arealist      = obj.geographic_level_type;
	           areaDescList  = obj.metadata;
	           areadesc.push(areaDescList);      
	           areas.push(arealist);
             }	        
	          $.each(areadesc, function(index, areadesc) {
	        	areadesc.split(",")[0];                 
	           // $('#geographies').append('<li style="font-size:13px; "class="filters__item"><a onclick="return dataTable();" href="localDatasetTable.html?area=' + areadesc + '&timeId=' + timePeriod + '">' + areadesc + '</a></li>');
	        	$('#geographies').append('<li style="font-size:13px; "class="filters__item"><a>' + areadesc + '</a></li>');        
	         });
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

//function reply_click()
//{
//    $('#datatable').tableExport({type:'excel',escape:'false'});
//}