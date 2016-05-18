function dataTable(extCode, geographicLevelType, dataResource, timePeriod){
	
  var name,value,tabledata;
  var url = "";
  
  $.ajax({
	type	: "GET",
	url     : "http://ec2-52-25-128-99.us-west-2.compute.amazonaws.com/local-data-web/rs/local-data/data?dataResource=" + dataResource + "&extCode=" + extCode + "&geographicLevelType=" + geographicLevelType + "&timePeriod=" + timePeriod,
	dataType: "JSON",
	data	: {"url" : url},
	success : function(data){  
    var matchingCount = (data.variables.length); 
    if(matchingCount > 10){
    	matchingCount = 10;
    }	
    var tabledata = [];
    for(var i=0;i<matchingCount;i++){     
      obj           = data.variables[i];    
      id            = obj.variable_id; 
      areaname      = obj.name;
      value         = obj.value; 
      value_domain  = obj.value_domain; 
      unit_type     = obj.unit_type;
      variable_name = obj.variable_name;
      tabledata.push({id,variable_name,value,value_domain,areaname});
    }            
      table(tabledata);
   }
  }); 
}	     
	  
function table(tabledata){		  
  $("#datatable").tabulator({
	height:"auto",
	fitColumns:true,
	tooltips:false,
	movableCols: true,
	movableRows: true, 
	columns:[		
	{title:"", field:"variable_name", width:"auto", sorter:"string"},
	{title:areaname, field:"value", sorter:"number", align:"left", width:"auto", formatter:function(value, data, cell, row, options){
		return parseFloat(value).toLocaleString();			
	}},
	{title:"Measurement unit", field:"value_domain", sorter:"number", align:"left", width:"auto" },	
	],		
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
}
