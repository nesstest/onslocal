function getData(OA,laCode,laName,parliconCode,parliconName,wardCode,wardName,regionCode,regionName,nationalCode,nationalName,healthName, levelname, areaname, tableType){

	if(regionCode === 'undefined' || regionCode === '' || regionCode === 'W92000004' || regionCode === 'W99999999' || typeof regionCode === 'undefined' || typeof regionCode === null)
	{
		//set region code to a valid region (NORTH EAST in this case) to stop WDA call failing - data will not be used in table! 
		regionCode = "E12000001"; 
    }


	if(levelname == null)
	{levelname = "OA";}

	var geogParam;
	var tableHead;
	var tableBody;
	var tableRow1;
	var tableRow2;
	var tableRow3;
	var tableRow4;
	var tableRow5;
	var tableRow6;
    var start;
    var inputAreas, input, url;
    var URL;
    
    
	//start to create table
	if (tableType == "popSexGeog")
	{
		start = new Date().getTime();
		tableHead = "<table><span class='tabletitle'>Population by sex and geography (2013)</span><thead><tr><th data-priority='persist'></th>";
		tableBody = "<tbody>";
		tableRow1 = "<tr><td>Total</td>";
		tableRow2 = "<tr><td>Males</td>";
		tableRow3 = "<tr><td>Females</td>";			
		
		// need to reset regionCode to national welsh code this is to prevent data being returned unnecessary
		// as region code is being set to a valid region (NORTH EAST in this case) to stop WDA call failing - data will not be used in table! 
		if (nationalName == "Wales"){
			regionCode = "W92000004";
		}
		
		inputAreas   = '\"'+ OA + '\", \"' + wardCode + '\", \"' + laCode + '\",  \"' + regionCode + '\",  \"' + nationalCode + '\"';
						
		url   = 'http://onsdatarp-glassfishtest.rhcloud.com/datarp-web/rs/nessdatarp/getdatatable';
		input = '{ "table":"population", "areas":['+ inputAreas+ '] }';			

		$(document).ready(function(){
		  $.ajax({url:url, type:'post', data :  input, contentType: 'application/json', success: function(result) { 
				
			if(OA === 'E92000001' || OA === 'W92000004')
			{
				// placename search - no OA 
				val = 0;
			}
			else {
				if(levelname == "LAD" || levelname == "WD" || levelname == "GOR" || levelname == "CTRY") {
					val = 0;
				}
				else{
					tableHead = tableHead + "<th data-priority='persist'>Output Area<br>("+OA+")</th>";
					popSexGeogTable(0, result);
					popSexGeogRow(all, male, female);
				    val = 1;
				} 					
				
			}
			if (wardCode !== "") {
				tableHead = tableHead + "<th data-priority='persist'>Ward<br>("+wardName+")</th><th data-priority='persist'>Westminster<br>parliamentary<br>constituency<br>("+parliconName+")</th>";
				popSexGeogTable(val, result);
				tableRow1 = tableRow1 + "<td>"+all+"</td><td>Not Available</td>";
				tableRow2 = tableRow2 + "<td>"+male+"</td><td>Not Available</td>";
				tableRow3 = tableRow3 + "<td>"+female+"</td><td>Not Available</td>";
			}
			if (laCode !== "") {
			    tableHead = tableHead + "<th data-priority='persist'>Local<br>authority<br>("+laName+")</th>";//<th data-priority='persist'>Clinical<br>commissioning<br>group<br>("+healthName+")</th>";
			    if (wardCode !== "") {
			      val = val + 1;
			    }  
				popSexGeogTable(val, result);	
				popSexGeogRow(all, male, female);
			}			
			if (nationalName == "England"){
				if (regionCode !== 'E92000001') {
					tableHead = tableHead + "<th data-priority='persist'>Region<br>("+regionName+")</th>";
					if (wardCode !== "" || laCode !== "" ) {
					  val = val + 1;
					}  
					popSexGeogTable(val, result);
					popSexGeogRow(all, male, female);
				
					tableHead = tableHead + "<th data-priority='persist'>National<br>("+nationalName+")</th>";
					val = val + 1;
					popSexGeogTable(val, result);
					popSexGeogRow(all, male, female);
				}
				else{
					tableHead = tableHead + "<th data-priority='persist'>National<br>("+nationalName+")</th>";
					if (wardCode !== "" || laCode !== "" ) {
						  val = val + 1;
					}  
					popSexGeogTable(val, result);
					popSexGeogRow(all, male, female);
				}
			}
			else{					
				tableHead = tableHead + "<th data-priority='persist'>National<br>("+nationalName+")</th>";
				if (wardCode !== "" || laCode !== "" ) {
					  val = val + 1;
				}  
				popSexGeogTable(val, result);
				popSexGeogRow(all, male, female);
			}

			tableRow1 = tableRow1 + "</tr>";
			tableRow2 = tableRow2 + "</tr>";
			tableRow3 = tableRow3 + "</tr>";
			var tableRows = tableRow1 + tableRow2 + tableRow3;

			completeTable(tableHead, tableBody, tableRows, tableType); 	

			var end = new Date().getTime();
			var time = end - start;
			console.log('Execution time: ' + time/1000);
		  }}); //  $.ajax	
		  
		  function popSexGeogTable(val, result) {
		 	 all         = commaSeparateNumber(result[val].total_All_Ages_Total_All_Persons) ;
		     male        = commaSeparateNumber(result[val].total_All_Ages_Male) ;
			 female      = commaSeparateNumber(result[val].total_All_Ages_Female);
			 return all, male, female;	
		  }	
		  
		  function popSexGeogRow(all, male, female) {
			tableRow1 = tableRow1 + "<td>"+all+"</td>";
			tableRow2 = tableRow2 + "<td>"+male+"</td>";
			tableRow3 = tableRow3 + "<td>"+female+"</td>";
		  }	
		}); // function	  
	} // if (tableType == "popSexGeog")

	if (tableType == "ageGeog")
	{	
		
		start = new Date().getTime();
		tableHead = "<table><span class='tabletitle'>Age by geography (2013)</span><thead><tr><th data-priority='persist'></th>";
		tableBody = "<tbody>";
		tableRow1 = "<tr><td>Under 1</td>";
		tableRow2 = "<tr><td>1</td>";
		tableRow3 = "<tr><td>2</td>";
		tableRow4 = "<tr><td>3</td>";
		tableRow5 = "<tr><td>4</td>";
		
		// need to reset regionCode to national welsh code this is to prevent data being returned unnecessary
		// as region code is being set to a valid region (NORTH EAST in this case) to stop WDA call failing - data will not be used in table! 
		if (nationalName == "Wales"){
			regionCode = "W92000004";
		}
		inputAreas   = '\"'+ OA + '\", \"' + wardCode + '\", \"' + laCode + '\",  \"' + regionCode + '\",  \"' + nationalCode + '\"';
						
		url   = 'http://onsdatarp-glassfishtest.rhcloud.com/datarp-web/rs/nessdatarp/getdatatable';
		input = '{ "table":"population", "areas":['+ inputAreas+ '] }';		
		
		$(document).ready(function(){
			  $.ajax({url:url, type:'post', data :  input, contentType: 'application/json', success: function(result) { 
					
				if(OA === 'E92000001' || OA === 'W92000004')
				{
					// placename search - no OA 
					val = 0;
				}
				else {
					if(levelname == "LAD" || levelname == "WD" || levelname == "GOR" || levelname == "CTRY") {
						val = 0;
					}
					else{
						tableHead = tableHead + "<th data-priority='persist'>Output Area<br>("+OA+")</th>";
						ageGeogTable(0, result);
						ageGeogRow(under1, one, two, three, four);
					    val = 1;
					} 
				}
				if (wardCode !== "") {
					tableHead = tableHead + "<th data-priority='persist'>Ward<br>("+wardName+")</th><th data-priority='persist'>Westminster<br>parliamentary<br>constituency<br>("+parliconName+")</th>";
					ageGeogTable(val, result);
					tableRow1 = tableRow1 + "<td>"+under1+"</td><td>Not Available</td>";
					tableRow2 = tableRow2 + "<td>"+one+"</td><td>Not Available</td>";
					tableRow3 = tableRow3 + "<td>"+two+"</td><td>Not Available</td>";
					tableRow4 = tableRow4 + "<td>"+three+"</td><td>Not Available</td>";
					tableRow5 = tableRow5 + "<td>"+four+"</td><td>Not Available</td>";
				}
				if (laCode !== "") {
				    tableHead = tableHead + "<th data-priority='persist'>Local<br>authority<br>("+laName+")</th>";//<th data-priority='persist'>Clinical<br>commissioning<br>group<br>("+healthName+")</th>";
				    if (wardCode !== "") {
				      val = val + 1;
				    }  
				    ageGeogTable(val, result);	
				    ageGeogRow(under1, one, two, three, four);
				}	
				
				if (nationalName == "England"){
					if (regionCode !== 'E92000001') {
						tableHead = tableHead + "<th data-priority='persist'>Region<br>("+regionName+")</th>";
						if (wardCode !== "" || laCode !== "" ) {
						  val = val + 1;
						}  
						ageGeogTable(val, result);
						ageGeogRow(under1, one, two, three, four);					
						tableHead = tableHead + "<th data-priority='persist'>National<br>("+nationalName+")</th>";
						val = val + 1;
						ageGeogTable(val, result);
						ageGeogRow(under1, one, two, three, four);
					}
					else{
						tableHead = tableHead + "<th data-priority='persist'>National<br>("+nationalName+")</th>";
						if (wardCode !== "" || laCode !== "" ) {
							  val = val + 1;
						}  
						ageGeogTable(val, result);
						ageGeogRow(under1, one, two, three, four);
					}
				}
				else{					
					tableHead = tableHead + "<th data-priority='persist'>National<br>("+nationalName+")</th>";
					if (wardCode !== "" || laCode !== "" ) {
						  val = val + 1;
					}  
					ageGeogTable(val, result);
					ageGeogRow(under1, one, two, three, four);
				}
				
				tableRow1 = tableRow1 + "</tr>";
				tableRow2 = tableRow2 + "</tr>";
				tableRow3 = tableRow3 + "</tr>";
				tableRow4 = tableRow4 + "</tr>";
				tableRow5 = tableRow5 + "</tr>";
				var tableRows = tableRow1 + tableRow2 + tableRow3 + tableRow4 + tableRow5;
	
				completeTable(tableHead, tableBody, tableRows, tableType); 	
				var end = new Date().getTime();
				var time = end - start;
				console.log('Execution time: ' + time/1000);
			  }}); //  $.ajax	
		  
			  function ageGeogTable(val, result) {
		    	 under1      = commaSeparateNumber(result[val].v_0_Total_All_Persons);
				 one         = commaSeparateNumber(result[val].v_1_Total_All_Persons);
				 two         = commaSeparateNumber(result[val].v_2_Total_All_Persons);
				 three       = commaSeparateNumber(result[val].v_3_Total_All_Persons);
				 four        = commaSeparateNumber(result[val].v_4_Total_All_Persons);	
			     return under1, one, two, three, four;	
			  }	
			  
			  function ageGeogRow(under1, one, two, three, four) {
				 tableRow1 = tableRow1 + "<td>"+under1+"</td>";
				 tableRow2 = tableRow2 + "<td>"+one+"</td>";
				 tableRow3 = tableRow3 + "<td>"+two+"</td>";
				 tableRow4 = tableRow4 + "<td>"+three+"</td>";
				 tableRow5 = tableRow5 + "<td>"+four+"</td>";	
			  }	
		  
		}); // function	 
		
	} // if (tableType == "ageGeog")

	if (tableType == "popTime")
	{
		start = new Date().getTime();

		tableHead = "<table><span class='tabletitle'>Population over time (time series, 2013)</span><thead><tr><th data-priority='persist'></th>";
		tableBody = "<tbody>";

		tableRow1 = "<tr><td>2013</td>";
		
		// need to reset regionCode to national welsh code this is to prevent data being returned unnecessary
		// as region code is being set to a valid region (NORTH EAST in this case) to stop WDA call failing - data will not be used in table! 
		if (nationalName == "Wales"){
			regionCode = "W92000004";
		}
		
		inputAreas   = '\"'+ OA + '\", \"' + wardCode + '\", \"' + laCode + '\",  \"' + regionCode + '\",  \"' + nationalCode + '\"';
						
		url   = 'http://onsdatarp-glassfishtest.rhcloud.com/datarp-web/rs/nessdatarp/getdatatable';
		input = '{ "table":"population", "areas":['+ inputAreas+ '] }';	
		
		$(document).ready(function(){
			  $.ajax({url:url, type:'post', data :  input, contentType: 'application/json', success: function(result) { 
					
				if(OA === 'E92000001' || OA === 'W92000004')
				{
					// placename search - no OA 
					val = 0;
				}
				else {
					
					if(levelname == "LAD" || levelname == "WD" || levelname == "GOR" || levelname == "CTRY") {
						val = 0;
					}
					else{
						tableHead = tableHead + "<th data-priority='persist'>Output Area<br>("+OA+")</th>";
						popTimeTable(0, result);
						popTimeRow(all);
					    val = 1;
					} 
				}
				if (wardCode !== "") {
					tableHead = tableHead + "<th data-priority='persist'>Ward<br>("+wardName+")</th><th data-priority='persist'>Westminster<br>parliamentary<br>constituency<br>("+parliconName+")</th>";
					popTimeTable(val, result);
					tableRow1 = tableRow1 + "<td>"+all+"</td><td>Not Available</td>";
				}
				if (laCode !== "") {
				    tableHead = tableHead + "<th data-priority='persist'>Local<br>authority<br>("+laName+")</th>";//<th data-priority='persist'>Clinical<br>commissioning<br>group<br>("+healthName+")</th>";
				    if (wardCode !== "") {
				      val = val + 1;
				    }  
				    popTimeTable(val, result);	
				    popTimeRow(all);
				}
				
				if (nationalName == "England"){
					if (regionCode !== 'E92000001') {
						tableHead = tableHead + "<th data-priority='persist'>Region<br>("+regionName+")</th>";
						if (wardCode !== "" || laCode !== "" ) {
						  val = val + 1;
						}  
						popTimeTable(val, result);
						popTimeRow(all);
					
						tableHead = tableHead + "<th data-priority='persist'>National<br>("+nationalName+")</th>";
						val = val + 1;
						popTimeTable(val, result);
						popTimeRow(all);
					}
					else{
						tableHead = tableHead + "<th data-priority='persist'>National<br>("+nationalName+")</th>";
						if (wardCode !== "" || laCode !== "" ) {
							  val = val + 1;
						}  
						popTimeTable(val, result);
						popTimeRow(all);
					}
				}
				else{					
					tableHead = tableHead + "<th data-priority='persist'>National<br>("+nationalName+")</th>";
					if (wardCode !== "" || laCode !== "" ) {
						  val = val + 1;
					}  
					popTimeTable(val, result);
					popTimeRow(all);
				}
				
				tableRow1 = tableRow1 + "</tr>";
				var tableRows = tableRow1;
	
				completeTable(tableHead, tableBody, tableRows, tableType); 		
				var end = new Date().getTime();
				var time = end - start;
				console.log('Execution time: ' + time/1000);
			  }}); //  $.ajax	
			  
			  function popTimeTable(val, result) {
				 all    = commaSeparateNumber(result[val].total_All_Ages_Total_All_Persons);
				 return all;	
			  }	
			  
			  function popTimeRow(all) {
				 tableRow1 = tableRow1 + "<td>"+all+"</td>";
			  }	
		  
		}); // function	 	  
	} // if (tableType == "popTime")

	if (tableType == "relGeog")
	{
		start = new Date().getTime();

		tableHead = "<table><span class='tabletitle'>Religion by geography (2011)</span><thead><tr><th data-priority='persist'></th>";
		tableBody = "<tbody>";
		tableRow1 = "<tr><td>Total</td>";
		tableRow2 = "<tr><td>Christian</td>";
		tableRow3 = "<tr><td>Muslim</td>";
		
		// need to reset regionCode to national welsh code this is to prevent data being returned unnecessary
		// as region code is being set to a valid region (NORTH EAST in this case) to stop WDA call failing - data will not be used in table! 
		if (nationalName == "Wales"){
			regionCode = "W92000004";
		}
		
		inputAreas   = '\"'+ OA + '\", \"' + wardCode + '\", \"' + laCode + '\",  \"' + regionCode + '\",  \"' + nationalCode + '\"';
						
		url   = 'http://onsdatarp-glassfishtest.rhcloud.com/datarp-web/rs/nessdatarp/getdatatable';
		input = '{ "table":"religion", "areas":['+ inputAreas+ '] }';	
		
		
		$(document).ready(function(){
			  $.ajax({url:url, type:'post', data :  input, contentType: 'application/json', success: function(result) { 
					
				if(OA === 'E92000001' || OA === 'W92000004')
				{
					// placename search - no OA 
					val = 0;
				}
				else {
					
					if(levelname == "LAD" || levelname == "WD" || levelname == "GOR" || levelname == "CTRY") {
						val = 0;
					}
					else{
						tableHead = tableHead + "<th data-priority='persist'>Output Area<br>("+OA+")</th>";
						relGeogTable(0, result);
						relGeogRow(all, christian, muslim);
					    val = 1;
					} 
				}
				if (wardCode !== "") {
					tableHead = tableHead + "<th data-priority='persist'>Ward<br>("+wardName+")</th><th data-priority='persist'>Westminster<br>parliamentary<br>constituency<br>("+parliconName+")</th>";
					relGeogTable(val, result);
					tableRow1   = tableRow1 + "<td>"+all+"</td><td>Not Available</td>";
					tableRow2   = tableRow2 + "<td>"+christian+"</td><td>Not Available</td>";
					tableRow3   = tableRow3 + "<td>"+muslim+"</td><td>Not Available</td>";
				}
				if (laCode !== "") {
				    tableHead = tableHead + "<th data-priority='persist'>Local<br>authority<br>("+laName+")</th>";//<th data-priority='persist'>Clinical<br>commissioning<br>group<br>("+healthName+")</th>";
				    if (wardCode !== "") {
				      val = val + 1;
				    }  
				    relGeogTable(val, result);	
				    relGeogRow(all, christian, muslim);
				}	
				
				if (nationalName == "England"){
					if (regionCode !== 'E92000001') {
						tableHead = tableHead + "<th data-priority='persist'>Region<br>("+regionName+")</th>";
						if (wardCode !== "" || laCode !== "" ) {
						  val = val + 1;
						}  
						relGeogTable(val, result);
						relGeogRow(all, christian, muslim);
					
						tableHead = tableHead + "<th data-priority='persist'>National<br>("+nationalName+")</th>";
						val = val + 1;
						relGeogTable(val, result);
						relGeogRow(all, christian, muslim);
					}
					else{
						tableHead = tableHead + "<th data-priority='persist'>National<br>("+nationalName+")</th>";
						if (wardCode !== "" || laCode !== "" ) {
							  val = val + 1;
						}  
						relGeogTable(val, result);
						relGeogRow(all, christian, muslim);
					}
				}
				else{					
					tableHead = tableHead + "<th data-priority='persist'>National<br>("+nationalName+")</th>";
					if (wardCode !== "" || laCode !== "" ) {
						  val = val + 1;
					}  
					relGeogTable(val, result);
					relGeogRow(all, christian, muslim);
				}

				tableRow1 = tableRow1 + "</tr>";
				tableRow2 = tableRow2 + "</tr>";
				tableRow3 = tableRow3 + "</tr>";
				var tableRows = tableRow1 + tableRow2 + tableRow3;
				completeTable(tableHead, tableBody, tableRows, tableType); 		
				var end = new Date().getTime();
				var time = end - start;
				console.log('Execution time: ' + time/1000);
			 }});
			  		  
			 function relGeogTable(val, result) {
			    all 	    = commaSeparateNumber(result[val].t_All_cat_Sex_T_All_cat_Age_T_All_cat_rel);
				christian   = commaSeparateNumber(result[val].t_All_cat_Sex_T_All_cat_Age_Christian);
				muslim      = commaSeparateNumber(result[val].t_All_cat_Sex_T_All_cat_Age_Muslim);
				return all, christian, muslim;	
		     }
			 
			 function relGeogRow(all, christian, muslim) {
				tableRow1   = tableRow1 + "<td>"+all+"</td>";
				tableRow2   = tableRow2 + "<td>"+christian+"</td>";
				tableRow3   = tableRow3 + "<td>"+muslim+"</td>";	
			 }	
			 
	  }); // function		
    } // if (tableType == "relGeog")

	if (tableType == "relAgeGeog")
	{
		start = new Date().getTime();

		tableHead = "<table><span class='tabletitle'>Religion by age and geography (2011)</span><thead><tr><th data-priority='persist'></th><th data-priority='persist'></th>";
		tableBody = "<tbody>";	

		tableRow1 = "<tr><th style='border-top:1px solid black;' rowspan='3'><font size='2'>Christian</font></th><td>0-15</td>";
		tableRow2 = "<tr><td>16-24</td>";
		tableRow3 = "<tr><td>25-34</td>";
		
		// need to reset regionCode to national welsh code this is to prevent data being returned unnecessary
		// as region code is being set to a valid region (NORTH EAST in this case) to stop WDA call failing - data will not be used in table! 
		if (nationalName == "Wales"){
			regionCode = "W92000004";
		}
		
		inputAreas   = '\"'+ OA + '\", \"' + wardCode + '\", \"' + laCode + '\",  \"' + regionCode + '\",  \"' + nationalCode + '\"';
				
		url   = 'http://onsdatarp-glassfishtest.rhcloud.com/datarp-web/rs/nessdatarp/getdatatable';
		input = '{ "table":"religion", "areas":['+ inputAreas+ '] }';			
		
		$(document).ready(function(){
			  $.ajax({url:url, type:'post', data :  input, contentType: 'application/json', success: function(result) { 
					
				if(OA === 'E92000001' || OA === 'W92000004')
				{
					// placename search - no OA 
					val = 0;
				}
				else {
					
					if(levelname == "LAD" || levelname == "WD" || levelname == "GOR" || levelname == "CTRY") {
						val = 0;
					}
					else{
						tableHead = tableHead + "<th data-priority='persist'>Output Area<br>("+OA+")</th>";
						relAgeGeogTable(0, result);	
						relAgeGeogRow(groupOne, groupTwo, groupThree);
					    val = 1;
					} 
				}
				if (wardCode !== "") {
					tableHead = tableHead + "<th data-priority='persist'>Ward<br>("+wardName+")</th><th data-priority='persist'>Westminster<br>parliamentary<br>constituency<br>("+parliconName+")</th>";
					relAgeGeogTable(val, result);
					tableRow1 = tableRow1 + "<td>"+groupOne+"</td><td>Not Available</td>";
					tableRow2 = tableRow2 + "<td>"+groupTwo+"</td><td>Not Available</td>";
					tableRow3 = tableRow3 + "<td>"+groupThree+"</td><td>Not Available</td>";
				}
				if (laCode !== "") {
				    tableHead = tableHead + "<th data-priority='persist'>Local<br>authority<br>("+laName+")</th>";//<th data-priority='persist'>Clinical<br>commissioning<br>group<br>("+healthName+")</th>";
				    if (wardCode !== "") {
				      val = val + 1;
				    }  
				    relAgeGeogTable(val, result);	
				    relAgeGeogRow(groupOne, groupTwo, groupThree);
				}	
				
				if (nationalName == "England"){
					if (regionCode !== 'E92000001') {
						tableHead = tableHead + "<th data-priority='persist'>Region<br>("+regionName+")</th>";
						if (wardCode !== "" || laCode !== "" ) {
						  val = val + 1;
						}  
						relAgeGeogTable(val, result);
						relAgeGeogRow(groupOne, groupTwo, groupThree);
					
						tableHead = tableHead + "<th data-priority='persist'>National<br>("+nationalName+")</th>";
						val = val + 1;
						relAgeGeogTable(val, result);
						relAgeGeogRow(groupOne, groupTwo, groupThree);
					}
					else{
						tableHead = tableHead + "<th data-priority='persist'>National<br>("+nationalName+")</th>";
						if (wardCode !== "" || laCode !== "" ) {
							  val = val + 1;
						}  
						relAgeGeogTable(val, result);
						relAgeGeogRow(groupOne, groupTwo, groupThree);
					}
				}
				else{					
					tableHead = tableHead + "<th data-priority='persist'>National<br>("+nationalName+")</th>";
					if (wardCode !== "" || laCode !== "" ) {
						  val = val + 1;
					}  
					relAgeGeogTable(val, result);
					relAgeGeogRow(groupOne, groupTwo, groupThree);
				}				

				tableRow1 = tableRow1 + "</tr>";
				tableRow2 = tableRow2 + "</tr>";
				tableRow3 = tableRow3 + "</tr>";
		
				var tableRows = tableRow1 + tableRow2 + tableRow3;								
				completeTable(tableHead, tableBody, tableRows, tableType); 		
				var end = new Date().getTime();
				var time = end - start;
				console.log('Execution time: ' + time/1000);
			  }});
			  
			  function relAgeGeogTable(val, result) {
			     groupOne = commaSeparateNumber(result[val].t_All_cat_Sex_Age_0_to_15_Christian);
			  	 groupTwo = commaSeparateNumber(result[val].t_All_cat_Sex_Age_16_to_24_Christian);
				 groupThree = commaSeparateNumber(result[val].t_All_cat_Sex_Age_25_to_34_Christian);
				 return groupOne, groupTwo, groupThree;	
			  }	
			  
			  function relAgeGeogRow(groupOne, groupTwo, groupThree) {
				tableRow1 = tableRow1 + "<td>"+groupOne+"</td>";
				tableRow2 = tableRow2 + "<td>"+groupTwo+"</td>";
				tableRow3 = tableRow3 + "<td>"+groupThree+"</td>";
			  }	
			  
		  });	// function
	} // if (tableType == "relAgeGeog")

	if (tableType == "relSexGeog")
	{
		start = new Date().getTime();
		tableHead = "<table><span class='tabletitle'>Religion by sex and geography (2011)</span><thead><tr><th data-priority='persist'></th><th data-priority='persist'></th>";
		tableBody = "<tbody>";		

		tableRow1 = "<tr><th style='border-top:1px solid black;' rowspan='2'><font size='2'>Christian</font></th><td>Male</td>";
		tableRow2 = "<tr><td>Female</td>";
		tableRow3 = "<tr><th style='border-top:1px solid black;' rowspan='2'><font size='2'>Muslim</font></th><td>Male</td>";
		tableRow4 = "<tr><td>Female</td>";
		
		// need to reset regionCode to national welsh code this is to prevent data being returned unnecessary
		// as region code is being set to a valid region (NORTH EAST in this case) to stop WDA call failing - data will not be used in table! 
		if (nationalName == "Wales"){
			regionCode = "W92000004";
		}
		
		inputAreas   = '\"'+ OA + '\", \"' + wardCode + '\", \"' + laCode + '\",  \"' + regionCode + '\",  \"' + nationalCode + '\"';
				
		url   = 'http://onsdatarp-glassfishtest.rhcloud.com/datarp-web/rs/nessdatarp/getdatatable';
		input = '{ "table":"religion", "areas":['+ inputAreas+ '] }';	
		
		$(document).ready(function(){
			  $.ajax({url:url, type:'post', data :  input, contentType: 'application/json', success: function(result) { 
					
				if(OA === 'E92000001' || OA === 'W92000004')
				{
					// placename search - no OA 
					val = 0;
				}
				else {
					if(levelname == "LAD" || levelname == "WD" || levelname == "GOR" || levelname == "CTRY") {
						val = 0;
					}
					else{
						tableHead = tableHead + "<th data-priority='persist'>Output Area<br>("+OA+")</th>";
						relSexGeogTable(0, result);
						relSexGeogRow(groupOne, groupTwo, groupThree, groupFour);
					    val = 1;
					} 					
					
				}
				if (wardCode !== "") {
					tableHead = tableHead + "<th data-priority='persist'>Ward<br>("+wardName+")</th><th data-priority='persist'>Westminster<br>parliamentary<br>constituency<br>("+parliconName+")</th>";
					relSexGeogTable(val, result);
					tableRow1 = tableRow1 + "<td>"+groupOne+"</td><td>Not Available</td>";
					tableRow2 = tableRow2 + "<td>"+groupTwo+"</td><td>Not Available</td>";
					tableRow3 = tableRow3 + "<td>"+groupThree+"</td><td>Not Available</td>";
					tableRow4 = tableRow4 + "<td>"+groupFour+"</td><td>Not Available</td>";
				}
				if (laCode !== "") {
				    tableHead = tableHead + "<th data-priority='persist'>Local<br>authority<br>("+laName+")</th>";//<th data-priority='persist'>Clinical<br>commissioning<br>group<br>("+healthName+")</th>";
				    if (wardCode !== "") {
				      val = val + 1;
				    }  
				    relSexGeogTable(val, result);	
				    relSexGeogRow(groupOne, groupTwo, groupThree, groupFour);
				}			
				
				if (nationalName == "England"){
					if (regionCode !== 'E92000001') {
						tableHead = tableHead + "<th data-priority='persist'>Region<br>("+regionName+")</th>";
						if (wardCode !== "" || laCode !== "" ) {
						  val = val + 1;
						}  
						relSexGeogTable(val, result);
						relSexGeogRow(groupOne, groupTwo, groupThree, groupFour);
					
						tableHead = tableHead + "<th data-priority='persist'>National<br>("+nationalName+")</th>";
						val = val + 1;
						relSexGeogTable(val, result);
						relSexGeogRow(groupOne, groupTwo, groupThree, groupFour);
					}
					else{
						tableHead = tableHead + "<th data-priority='persist'>National<br>("+nationalName+")</th>";
						if (wardCode !== "" || laCode !== "" ) {
							  val = val + 1;
						}  
						relSexGeogTable(val, result);
						relSexGeogRow(groupOne, groupTwo, groupThree, groupFour);
					}
				}
				else{					
					tableHead = tableHead + "<th data-priority='persist'>National<br>("+nationalName+")</th>";
					if (wardCode !== "" || laCode !== "" ) {
						  val = val + 1;
					}  
					relSexGeogTable(val, result);
					relSexGeogRow(groupOne, groupTwo, groupThree, groupFour);
				}
			
				tableRow1 = tableRow1 + "</tr>";
				tableRow2 = tableRow2 + "</tr>";
				tableRow3 = tableRow3 + "</tr>";
				tableRow4 = tableRow4 + "</tr>";
		
				var tableRows = tableRow1 + tableRow2 + tableRow3 + tableRow4;								
				completeTable(tableHead, tableBody, tableRows, tableType); 			
				var end = new Date().getTime();
				var time = end - start;
				console.log('Execution time: ' + time/1000);
		   }});	
			  
		   function relSexGeogTable(val, result) {
		      groupOne = commaSeparateNumber(result[val].males_T_All_cat_Age_Christian);
			  groupTwo = commaSeparateNumber(result[val].females_T_All_cat_Age_Christian);
			  groupThree = commaSeparateNumber(result[val].males_T_All_cat_Age_Muslim);
			  groupFour = commaSeparateNumber(result[val].females_T_All_cat_Age_Muslim);
			  return groupOne, groupTwo, groupThree, groupFour;	
		   }
		   
		   function relSexGeogRow(groupOne, groupTwo, groupThree, groupFour) {
			  tableRow1 = tableRow1 + "<td>"+groupOne+"</td>";
			  tableRow2 = tableRow2 + "<td>"+groupTwo+"</td>";
		      tableRow3 = tableRow3 + "<td>"+groupThree+"</td>";
			  tableRow4 = tableRow4 + "<td>"+groupFour+"</td>";
		   }
		   
		});	// function
   } // if (tableType == "relSexGeog")	
	
	if (tableType == "ecoActiv")
	{
		start = new Date().getTime();		
		var groupOne, groupTwo, groupThree, groupFour, groupFive, groupSix;
		
		tableHead = "<table><span class='tabletitle'>Economic activity by sex by age (2011)</span><thead><tr><th data-priority='persist'></th><th data-priority='persist'></th>";
		tableBody = "<tbody>";
		
		tableRow1 = "<tr><th style='border-top:1px solid black;' rowspan='6'><font size='2'>Age 16 and over</font></th><td>Economic activity</td>";
			tableRow2 = "<tr><td>Total</td>";
				tableRow3 = "<tr><td>Employment Total</td>";
					tableRow4 = "<tr><td>Employee Total</td>";
						tableRow5 = "<tr><td>Employee Full-time</td>";
							tableRow6 = "<tr><td>Employee Part-time</td>";

						URL  = "http://data.ons.gov.uk/ons/api/data/dataset/LC6107EW.json?context=Census&apikey=l4iaoeZCum&geog=2011STATH&dm/2011STATH="+OA+","+laCode+","+regionCode+","+nationalCode+"&jsontype=json-stat&totals=false&dm/CL_0000035=CI_0000121,&dm/CL_0000160=CI_0001945&dm/CL_0000407=CI_0002882,CI_0002896,CI_0002897,CI_0002898,CI_0002899,CI_0002900";
				
		  $.getJSON(URL, function(result){

			if(levelname =="OA")
			{
				tableHead  = tableHead + "<th data-priority='persist'>Output Area<br>("+OA+")</th>";
				groupOne   = commaSeparateNumber(result["LC6107EW"].value[18]);
				groupTwo   = commaSeparateNumber(result["LC6107EW"].value[19]);
				groupThree = commaSeparateNumber(result["LC6107EW"].value[20]);
				groupFour  = commaSeparateNumber(result["LC6107EW"].value[21]);
				groupFive  = commaSeparateNumber(result["LC6107EW"].value[22]);
				groupSix   = commaSeparateNumber(result["LC6107EW"].value[23]);
				tableRow1  = tableRow1 + "<td>"+groupOne+"</td>";
				tableRow2  = tableRow2 + "<td>"+groupTwo+"</td>";
				tableRow3  = tableRow3 + "<td>"+groupThree+"</td>";
				tableRow4  = tableRow4 + "<td>"+groupFour+"</td>";
				tableRow5  = tableRow5 + "<td>"+groupFive+"</td>";
				tableRow6  = tableRow6 + "<td>"+groupSix+"</td>";
			}

			URL  = "http://data.ons.gov.uk/ons/api/data/dataset/LC6107EW.json?context=Census&apikey=l4iaoeZCum&geog=2011WARDH&dm/2011WARDH="+wardCode+"&jsontype=json-stat&totals=false&dm/CL_0000035=CI_0000121,&dm/CL_0000160=CI_0001945&dm/CL_0000407=CI_0002882,CI_0002896,CI_0002897,CI_0002898,CI_0002899,CI_0002900";
           			
			$.getJSON(URL, function(resultWard){

				if(levelname == "WD" || levelname =="OA")
				{
					tableHead = tableHead + "<th data-priority='persist'>Ward<br>("+wardName+")</th><th data-priority='persist'>Westminster<br>parliamentary<br>constituency<br>("+parliconName+")</th>";
					groupOne = commaSeparateNumber(resultWard["LC6107EW"].value[0]);
					groupTwo = commaSeparateNumber(resultWard["LC6107EW"].value[1]);
					groupThree = commaSeparateNumber(resultWard["LC6107EW"].value[2]);
					groupFour = commaSeparateNumber(resultWard["LC6107EW"].value[3]);
					groupFive  = commaSeparateNumber(resultWard["LC6107EW"].value[4]);
					groupSix   = commaSeparateNumber(resultWard["LC6107EW"].value[5]);
					tableRow1 = tableRow1 + "<td>"+groupOne+"</td><td>Not Available</td>";
					tableRow2 = tableRow2 + "<td>"+groupTwo+"</td><td>Not Available</td>";
					tableRow3 = tableRow3 + "<td>"+groupThree+"</td><td>Not Available</td>";
					tableRow4 = tableRow4 + "<td>"+groupFour+"</td><td>Not Available</td>";
					tableRow5  = tableRow5 + "<td>"+groupFive+"</td><td>Not Available</td>";
					tableRow6  = tableRow6 + "<td>"+groupSix+"</td><td>Not Available</td>";

				}

				if(levelname == "LAD" || levelname == "WD" || levelname =="OA")
				{
					if (nationalName == "England"){
						tableHead = tableHead + "<th data-priority='persist'>Local<br>authority<br>("+laName+")</th>";
					}
					else{
						tableHead = tableHead + "<th data-priority='persist'>Local<br>authority<br>("+laName+")</th>";
					}
					groupOne   = commaSeparateNumber(result["LC6107EW"].value[12]);
					groupTwo   = commaSeparateNumber(result["LC6107EW"].value[13]);
					groupThree = commaSeparateNumber(result["LC6107EW"].value[14]);
					groupFour  = commaSeparateNumber(result["LC6107EW"].value[15]);
					groupFive  = commaSeparateNumber(result["LC6107EW"].value[16]);
					groupSix   = commaSeparateNumber(result["LC6107EW"].value[17]);
					tableRow1  = tableRow1 + "<td>"+groupOne+"</td>";
					tableRow2  = tableRow2 + "<td>"+groupTwo+"</td>";
					tableRow3  = tableRow3 + "<td>"+groupThree+"</td>";
					tableRow4  = tableRow4 + "<td>"+groupFour+"</td>";
					tableRow5  = tableRow5 + "<td>"+groupFive+"</td>";
					tableRow6  = tableRow6 + "<td>"+groupSix+"</td>";
				}

				if((levelname == "GOR" || levelname == "LAD" || levelname == "WD" || levelname =="OA") && nationalName == "England")
				{
					tableHead = tableHead + "<th data-priority='persist'>Region<br>("+regionName+")</th>";
					groupOne   = commaSeparateNumber(result["LC6107EW"].value[6]);
					groupTwo   = commaSeparateNumber(result["LC6107EW"].value[7]);
					groupThree = commaSeparateNumber(result["LC6107EW"].value[8]);
					groupFour  = commaSeparateNumber(result["LC6107EW"].value[9]);
					groupFive  = commaSeparateNumber(result["LC6107EW"].value[10]);
					groupSix   = commaSeparateNumber(result["LC6107EW"].value[11]);
					tableRow1  = tableRow1 + "<td>"+groupOne+"</td>";
					tableRow2  = tableRow2 + "<td>"+groupTwo+"</td>";
					tableRow3  = tableRow3 + "<td>"+groupThree+"</td>";
					tableRow4  = tableRow4 + "<td>"+groupFour+"</td>";
					tableRow5  = tableRow5 + "<td>"+groupFive+"</td>";
					tableRow6  = tableRow6 + "<td>"+groupSix+"</td>";
				}

				if(levelname == "CTRY" || levelname == "GOR" || levelname == "LAD" || levelname == "WD" || levelname =="OA")
				{
					tableHead = tableHead + "<th data-priority='persist'>National<br>("+nationalName+")</th>";
					groupOne   = commaSeparateNumber(result["LC6107EW"].value[0]);
					groupTwo   = commaSeparateNumber(result["LC6107EW"].value[1]);
					groupThree = commaSeparateNumber(result["LC6107EW"].value[2]);
					groupFour  = commaSeparateNumber(result["LC6107EW"].value[3]);
					groupFive  = commaSeparateNumber(result["LC6107EW"].value[4]);
					groupSix   = commaSeparateNumber(result["LC6107EW"].value[5]);
					tableRow1  = tableRow1 + "<td>"+groupOne+"</td>";
					tableRow2  = tableRow2 + "<td>"+groupTwo+"</td>";
					tableRow3  = tableRow3 + "<td>"+groupThree+"</td>";
					tableRow4  = tableRow4 + "<td>"+groupFour+"</td>";
					tableRow5  = tableRow5 + "<td>"+groupFive+"</td>";
					tableRow6  = tableRow6 + "<td>"+groupSix+"</td>";
				}				
				
				tableRow1 = tableRow1 + "</tr>";
				tableRow2 = tableRow2 + "</tr>";
				tableRow3 = tableRow3 + "</tr>";
				tableRow4 = tableRow4 + "</tr>";
				tableRow5 = tableRow5 + "</tr>";
				tableRow6 = tableRow6 + "</tr>";

				var tableRows = tableRow1 + tableRow2 + tableRow3 + tableRow4 + tableRow5 + tableRow6;								
				completeTable(tableHead, tableBody, tableRows, tableType); 			
				var end = new Date().getTime();
				var time = end - start;
				console.log('Execution time: ' + time/1000);
		   });
		});
	}
	
	if (tableType == "ecoIndustry")
	{
		start = new Date().getTime();		
		var all, agriculture, mining, manufacturing, electricty, water;

		tableHead = "<table><span class='tabletitle'>Industry (2011)</span><thead><tr><th data-priority='persist'></th>";		
		
		tableBody = "<tbody>";
		tableRow1 = "<tr><td>Industry</td>";
		tableRow2 = "<tr><td>Agriculture forestry and fishing</td>";
		tableRow3 = "<tr><td>Mining and quarrying</td>";
		tableRow4 = "<tr><td>Manufacturing</td>";
		tableRow5 = "<tr><td>Electricity gas steam and air conditioning supply</td>";
		tableRow6 = "<tr><td>Water supply; sewerage waste management and remediation activities</td>";	
 
		URL  = "http://data.ons.gov.uk/ons/api/data/dataset/KS605EW.json?context=Census&apikey=l4iaoeZCum&geog=2011STATH&dm/2011STATH="+OA+","+laCode+","+regionCode+","+nationalCode+"&jsontype=json-stat&totals=false&dm/CL_0000897=CI_0015330,CI_0015331,CI_0015332,CI_0015333,CI_0015334,CI_0015335";
		
		$.getJSON(URL, function(result){

			if(levelname =="OA")
			{
				tableHead = tableHead + "<th data-priority='persist'>Output Area<br>("+OA+")</th>";
				all = commaSeparateNumber(result["KS605EW Segment_1"].value[18]);
				agriculture = commaSeparateNumber(result["KS605EW Segment_1"].value[19]);
				mining = commaSeparateNumber(result["KS605EW Segment_1"].value[20]);
				manufacturing = commaSeparateNumber(result["KS605EW Segment_1"].value[21]);
				electricty = commaSeparateNumber(result["KS605EW Segment_1"].value[22]);
				water = commaSeparateNumber(result["KS605EW Segment_1"].value[23]);
				tableRow1 = tableRow1 + "<td>"+all+"</td>";
				tableRow2 = tableRow2 + "<td>"+agriculture+"</td>";
				tableRow3 = tableRow3 + "<td>"+mining+"</td>";
				tableRow4 = tableRow4 + "<td>"+manufacturing+"</td>";
				tableRow5 = tableRow5 + "<td>"+electricty+"</td>";
				tableRow6 = tableRow6 + "<td>"+water+"</td>";
			}

			URL  = "http://data.ons.gov.uk/ons/api/data/dataset/KS605EW.json?context=Census&apikey=l4iaoeZCum&geog=2011WARDH&dm/2011WARDH="+wardCode+"&jsontype=json-stat&totals=false&dm/CL_0000897=CI_0015330,CI_0015331,CI_0015332,CI_0015333,CI_0015334,CI_0015335";

			$.getJSON(URL, function(resultWard){

				if(levelname == "WD" || levelname =="OA")
				{
					tableHead = tableHead + "<th data-priority='persist'>Ward<br>("+wardName+")</th><th data-priority='persist'>Westminster<br>parliamentary<br>constituency<br>("+parliconName+")</th>";
					all = commaSeparateNumber(resultWard["KS605EW Segment_1"].value[0]) ;
					agriculture = commaSeparateNumber(resultWard["KS605EW Segment_1"].value[1]) ;
					mining = commaSeparateNumber(resultWard["KS605EW Segment_1"].value[2]);
					manufacturing = commaSeparateNumber(resultWard["KS605EW Segment_1"].value[3]) ;
					electricty = commaSeparateNumber(resultWard["KS605EW Segment_1"].value[4]) ;
					water = commaSeparateNumber(resultWard["KS605EW Segment_1"].value[5]);
					tableRow1 = tableRow1 + "<td>"+all+"</td><td>Not Available</td>";
					tableRow2 = tableRow2 + "<td>"+agriculture+"</td><td>Not Available</td>";
					tableRow3 = tableRow3 + "<td>"+mining+"</td><td>Not Available</td>";
					tableRow4 = tableRow4 + "<td>"+manufacturing+"</td><td>Not Available</td>";
					tableRow5 = tableRow5 + "<td>"+electricty+"</td><td>Not Available</td>";
					tableRow6 = tableRow6 + "<td>"+water+"</td><td>Not Available</td>";
				}

				if(levelname == "LAD" || levelname == "WD" || levelname =="OA")
				{
					if (nationalName == "England"){
						tableHead = tableHead + "<th data-priority='persist'>Local<br>authority<br>("+laName+")</th>";
					}
					else{
						tableHead = tableHead + "<th data-priority='persist'>Local<br>authority<br>("+laName+")</th>";
					}
					all = commaSeparateNumber(result["KS605EW Segment_1"].value[12]);
					agriculture = commaSeparateNumber(result["KS605EW Segment_1"].value[13]);
					mining = commaSeparateNumber(result["KS605EW Segment_1"].value[14]);
					manufacturing = commaSeparateNumber(result["KS605EW Segment_1"].value[15]);
					electricty = commaSeparateNumber(result["KS605EW Segment_1"].value[16]);
					water = commaSeparateNumber(result["KS605EW Segment_1"].value[17]);
					tableRow1 = tableRow1 + "<td>"+all+"</td>";
					tableRow2 = tableRow2 + "<td>"+agriculture+"</td>";
					tableRow3 = tableRow3 + "<td>"+mining+"</td>";
					tableRow4 = tableRow4 + "<td>"+manufacturing+"</td>";
					tableRow5 = tableRow5 + "<td>"+electricty+"</td>";
					tableRow6 = tableRow6 + "<td>"+water+"</td>";
				}

				if((levelname == "GOR" || levelname == "LAD" || levelname == "WD" || levelname =="OA") && nationalName == "England")
				{
					tableHead = tableHead + "<th data-priority='persist'>Region<br>("+regionName+")</th>";
					all = commaSeparateNumber(result["KS605EW Segment_1"].value[6]);
					agriculture = commaSeparateNumber(result["KS605EW Segment_1"].value[7]);
					mining = commaSeparateNumber(result["KS605EW Segment_1"].value[8]);
					manufacturing = commaSeparateNumber(result["KS605EW Segment_1"].value[9]);
					electricty = commaSeparateNumber(result["KS605EW Segment_1"].value[10]);
					water = commaSeparateNumber(result["KS605EW Segment_1"].value[11]);
					tableRow1 = tableRow1 + "<td>"+all+"</td>";
					tableRow2 = tableRow2 + "<td>"+agriculture+"</td>";
					tableRow3 = tableRow3 + "<td>"+mining+"</td>";
					tableRow4 = tableRow4 + "<td>"+manufacturing+"</td>";
					tableRow5 = tableRow5 + "<td>"+electricty+"</td>";
					tableRow6 = tableRow6 + "<td>"+water+"</td>";
				}

				if(levelname == "CTRY" || levelname == "GOR" || levelname == "LAD" || levelname == "WD" || levelname =="OA")
				{
					tableHead = tableHead + "<th data-priority='persist'>National<br>("+nationalName+")</th>";
					all = commaSeparateNumber(result["KS605EW Segment_1"].value[0]);
					agriculture = commaSeparateNumber(result["KS605EW Segment_1"].value[1]);
					mining = commaSeparateNumber(result["KS605EW Segment_1"].value[2]);
					manufacturing = commaSeparateNumber(result["KS605EW Segment_1"].value[3]);
					electricty = commaSeparateNumber(result["KS605EW Segment_1"].value[4]);
					water = commaSeparateNumber(result["KS605EW Segment_1"].value[5]);
					tableRow1 = tableRow1 + "<td>"+all+"</td>";
					tableRow2 = tableRow2 + "<td>"+agriculture+"</td>";
					tableRow3 = tableRow3 + "<td>"+mining+"</td>";
					tableRow4 = tableRow4 + "<td>"+manufacturing+"</td>";
					tableRow5 = tableRow5 + "<td>"+electricty+"</td>";
					tableRow6 = tableRow6 + "<td>"+water+"</td>";
				}

				tableRow1 = tableRow1 + "</tr>";
				tableRow2 = tableRow2 + "</tr>";
				tableRow3 = tableRow3 + "</tr>";
				tableRow4 = tableRow4 + "</tr>";
				tableRow5 = tableRow5 + "</tr>";
				tableRow6 = tableRow6 + "</tr>";

				var tableRows = tableRow1 + tableRow2 + tableRow3 + tableRow4 + tableRow5 + tableRow6;		
				completeTable(tableHead, tableBody, tableRows, tableType); 		
				var end = new Date().getTime();
				var time = end - start;
				console.log('Execution time: ' + time/1000);
			});	
		});	
	}
	
	if (tableType == "ecoOccupation")
	{
		start = new Date().getTime();		
		
		tableHead = "<table><span class='tabletitle'>Occupation by sex (2011)</span><thead><tr><th data-priority='persist'></th><th data-priority='persist'></th>";
		tableBody = "<tbody>";		

		tableRow1 = "<tr><th style='border-top:1px solid black;' rowspan='3'><font size='2'>Occupation</font></th><td>Total</td>";
			tableRow2 = "<tr><td>Males</td>";
				tableRow3 = "<tr><td>Females</td>";
				  tableRow4 = "<tr><th style='border-top:1px solid black;' rowspan='3'><font size='2'>Managers, directors and senior officials</font></th><td>Total</td>";
					tableRow5 = "<tr><td>Males</td>";
						tableRow6 = "<tr><td>Females</td>";

			URL  = "http://data.ons.gov.uk/ons/api/data/dataset/LC6120EW.json?context=Census&apikey=l4iaoeZCum&geog=2011STATH&dm/2011STATH="+OA+","+laCode+","+regionCode+","+nationalCode+"&jsontype=json-stat&totals=false&dm/CL_0000190=CI_0001980,CI_0000071";
		
		    $.getJSON(URL, function(result){

			if(levelname =="OA")
			{
				tableHead = tableHead + "<th data-priority='persist'>Output Area<br>("+OA+")</th>";
				groupOne = commaSeparateNumber(result["LC6120EW"].value[18]);
				groupTwo = commaSeparateNumber(result["LC6120EW"].value[19]);
				groupThree = commaSeparateNumber(result["LC6120EW"].value[20]);
				groupFour = commaSeparateNumber(result["LC6120EW"].value[21]);
				groupFive = commaSeparateNumber(result["LC6120EW"].value[22]);				
				groupSix = commaSeparateNumber(result["LC6120EW"].value[23]);
				tableRow1 = tableRow1 + "<td>"+groupOne+"</td>";
				tableRow2 = tableRow2 + "<td>"+groupTwo+"</td>";
				tableRow3 = tableRow3 + "<td>"+groupThree+"</td>";
				tableRow4 = tableRow4 + "<td>"+groupFour+"</td>";
				tableRow5 = tableRow5 + "<td>"+groupFive+"</td>";				
				tableRow6 = tableRow6 + "<td>"+groupSix+"</td>";
			}

			URL  = "http://data.ons.gov.uk/ons/api/data/dataset/LC6120EW.json?context=Census&apikey=l4iaoeZCum&geog=2011WARDH&dm/2011WARDH="+wardCode+"&jsontype=json-stat&totals=false&dm/CL_0000190=CI_0001980,CI_0000071";

			$.getJSON(URL, function(resultWard){

				if(levelname == "WD" || levelname =="OA")
				{
					tableHead = tableHead + "<th data-priority='persist'>Ward<br>("+wardName+")</th><th data-priority='persist'>Westminster<br>parliamentary<br>constituency<br>("+parliconName+")</th>";
					groupOne = commaSeparateNumber(resultWard["LC6120EW"].value[0]);
					groupTwo = commaSeparateNumber(resultWard["LC6120EW"].value[1]);
					groupThree = commaSeparateNumber(resultWard["LC6120EW"].value[2]);
					groupFour = commaSeparateNumber(resultWard["LC6120EW"].value[3]);
					groupFive = commaSeparateNumber(resultWard["LC6120EW"].value[4]);
					groupSix = commaSeparateNumber(resultWard["LC6120EW"].value[5]);
					tableRow1 = tableRow1 + "<td>"+groupOne+"</td><td>Not Available</td>";
					tableRow2 = tableRow2 + "<td>"+groupTwo+"</td><td>Not Available</td>";
					tableRow3 = tableRow3 + "<td>"+groupThree+"</td><td>Not Available</td>";
					tableRow4 = tableRow4 + "<td>"+groupFour+"</td><td>Not Available</td>";
					tableRow5 = tableRow5 + "<td>"+groupFive+"</td><td>Not Available</td>";
					tableRow6 = tableRow6 + "<td>"+groupSix+"</td><td>Not Available</td>";
				}

				if(levelname == "LAD" || levelname == "WD" || levelname =="OA")
				{
					if (nationalName == "England"){
						tableHead = tableHead + "<th data-priority='persist'>Local<br>authority<br>("+laName+")</th>";
					}
					else{
						tableHead = tableHead + "<th data-priority='persist'>Local<br>authority<br>("+laName+")</th>";
					}
					groupOne = commaSeparateNumber(result["LC6120EW"].value[12]);
					groupTwo = commaSeparateNumber(result["LC6120EW"].value[13]);
					groupThree = commaSeparateNumber(result["LC6120EW"].value[14]);
					groupFour = commaSeparateNumber(result["LC6120EW"].value[15]);
					groupFive = commaSeparateNumber(result["LC6120EW"].value[16]);
					groupSix = commaSeparateNumber(result["LC6120EW"].value[17]);
					tableRow1 = tableRow1 + "<td>"+groupOne+"</td>";
					tableRow2 = tableRow2 + "<td>"+groupTwo+"</td>";
					tableRow3 = tableRow3 + "<td>"+groupThree+"</td>";
					tableRow4 = tableRow4 + "<td>"+groupFour+"</td>";
					tableRow5 = tableRow5 + "<td>"+groupFive+"</td>";
					tableRow6 = tableRow6 + "<td>"+groupSix+"</td>";
				}

				if((levelname == "GOR" || levelname == "LAD" || levelname == "WD" || levelname =="OA") && nationalName == "England")
				{
					tableHead = tableHead + "<th data-priority='persist'>Region<br>("+regionName+")</th>";
					groupOne = commaSeparateNumber(result["LC6120EW"].value[6]);
					groupTwo = commaSeparateNumber(result["LC6120EW"].value[7]);
					groupThree = commaSeparateNumber(result["LC6120EW"].value[8]);
					groupFour = commaSeparateNumber(result["LC6120EW"].value[9]);
					groupFive = commaSeparateNumber(result["LC6120EW"].value[10]);
					groupSix = commaSeparateNumber(result["LC6120EW"].value[11]);
					tableRow1 = tableRow1 + "<td>"+groupOne+"</td>";
					tableRow2 = tableRow2 + "<td>"+groupTwo+"</td>";
					tableRow3 = tableRow3 + "<td>"+groupThree+"</td>";
					tableRow4 = tableRow4 + "<td>"+groupFour+"</td>";
					tableRow5 = tableRow5 + "<td>"+groupFive+"</td>";
					tableRow6 = tableRow6 + "<td>"+groupSix+"</td>";
				}

				if(levelname == "CTRY" || levelname == "GOR" || levelname == "LAD" || levelname == "WD" || levelname =="OA")
				{
					tableHead = tableHead + "<th data-priority='persist'>National<br>("+nationalName+")</th>";
					groupOne = commaSeparateNumber(result["LC6120EW"].value[0]);
					groupTwo = commaSeparateNumber(result["LC6120EW"].value[1]);
					groupThree = commaSeparateNumber(result["LC6120EW"].value[2]);
					groupFour = commaSeparateNumber(result["LC6120EW"].value[3]);
					groupFive = commaSeparateNumber(result["LC6120EW"].value[4]);
					groupSix = commaSeparateNumber(result["LC6120EW"].value[5]);
					tableRow1 = tableRow1 + "<td>"+groupOne+"</td>";
					tableRow2 = tableRow2 + "<td>"+groupTwo+"</td>";
					tableRow3 = tableRow3 + "<td>"+groupThree+"</td>";
					tableRow4 = tableRow4 + "<td>"+groupFour+"</td>";
					tableRow5 = tableRow5 + "<td>"+groupFive+"</td>";
					tableRow6 = tableRow6 + "<td>"+groupSix+"</td>";
				}			
				
				tableRow1 = tableRow1 + "</tr>";
				tableRow2 = tableRow2 + "</tr>";
				tableRow3 = tableRow3 + "</tr>";
				tableRow4 = tableRow4 + "</tr>";
				tableRow5 = tableRow5 + "</tr>";
				tableRow6 = tableRow6 + "</tr>";

				var tableRows = tableRow1 + tableRow2 + tableRow3 + tableRow4 + tableRow5 + tableRow6;								
				completeTable(tableHead, tableBody, tableRows, tableType); 			
				var end = new Date().getTime();
				var time = end - start;
				console.log('Execution time: ' + time/1000);
			});	
		});	
	}
	
    if (tableType == "housingHeating")
    {
           start = new Date().getTime();          
           var all, no_ch, gas_ch, gas_ch, electric_ch, oil_ch, solid_ch;
           
           tableHead = "<table><span class='tabletitle'>Central Heating by geography (2011)</span><thead><tr><th data-priority='persist'></th>";
           tableBody = "<tbody>";
           tableRow1 = "<tr><td>Total</td>"
           tableRow2 = "<tr><td>No central heating</td>"
           tableRow3 = "<tr><td>Gas central heating</td>"
           tableRow4 = "<tr><td>Electric (including storage heaters) central heating</td>"
           tableRow5 = "<tr><td>Oil central heating</td>"
           tableRow6 = "<tr><td>Solid fuel (for example wood, coal) central heating</td>"
    
           URL  = "http://data.ons.gov.uk/ons/api/data/dataset/QS415EW.json?context=Census&apikey=l4iaoeZCum&geog=2011STATH&dm/2011STATH="+OA+","+laCode+","+regionCode+","+nationalCode+"&jsontype=json-stat&totals=false";
    
           $.getJSON(URL, function(result)
           {
                  if(levelname =="OA")
                  {
                        tableHead   = tableHead + "<th data-priority='persist'>Output Area<br>("+OA+")</th>";
                        all         = commaSeparateNumber(result["QS415EW"].value[24]);
                        no_ch       = commaSeparateNumber(result["QS415EW"].value[25]);
                        gas_ch      = commaSeparateNumber(result["QS415EW"].value[26]);
                        electric_ch = commaSeparateNumber(result["QS415EW"].value[27]);
                        oil_ch      = commaSeparateNumber(result["QS415EW"].value[28]);
                        solid_ch    = commaSeparateNumber(result["QS415EW"].value[29]);
                        tableRow1   = tableRow1 + "<td>"+all+"</td>";
                        tableRow2   = tableRow2 + "<td>"+no_ch+"</td>";
                        tableRow3   = tableRow3 + "<td>"+gas_ch+"</td>";
                        tableRow4   = tableRow4 + "<td>"+electric_ch+"</td>";
                        tableRow5   = tableRow5 + "<td>"+oil_ch+"</td>";
                        tableRow6   = tableRow6 + "<td>"+solid_ch+"</td>";
                  }
                  
               URL  = "http://data.ons.gov.uk/ons/api/data/dataset/QS415EW.json?context=Census&apikey=l4iaoeZCum&geog=2011WARDH&dm/2011WARDH="+wardCode+"&jsontype=json-stat&totals=false";
    
                  $.getJSON(URL, function(resultWard)
                  {
                    if(levelname == "WD" || levelname =="OA")
                    {
                        tableHead = tableHead + "<th data-priority='persist'>Ward<br>("+wardName+")</th><th data-priority='persist'>Westminster<br>parliamentary<br>constituency<br>("+parliconName+")</th>";
                        all         = commaSeparateNumber(resultWard["QS415EW"].value[0]);
                        no_ch       = commaSeparateNumber(resultWard["QS415EW"].value[1]);
                        gas_ch      = commaSeparateNumber(resultWard["QS415EW"].value[2]);
                        electric_ch = commaSeparateNumber(resultWard["QS415EW"].value[3]);
                        oil_ch      = commaSeparateNumber(resultWard["QS415EW"].value[4]);
                        solid_ch    = commaSeparateNumber(resultWard["QS415EW"].value[5]);
                        tableRow1 = tableRow1 + "<td>"+all+"</td><td>Not Available</td>";
                        tableRow2 = tableRow2 + "<td>"+no_ch+"</td><td>Not Available</td>";
                        tableRow3 = tableRow3 + "<td>"+gas_ch+"</td><td>Not Available</td>";
                        tableRow4 = tableRow4 + "<td>"+electric_ch+"</td><td>Not Available</td>";
                        tableRow5 = tableRow5 + "<td>"+oil_ch+"</td><td>Not Available</td>";
                        tableRow6 = tableRow6 + "<td>"+solid_ch+"</td><td>Not Available</td>";
                    }
    
    
                    if(levelname == "LAD" || levelname == "WD" || levelname =="OA")
                    {
                        if (nationalName == "England"){
                              tableHead = tableHead + "<th data-priority='persist'>Local<br>authority<br>("+laName+")</th>";//<th data-priority='persist'>Clinical<br>commissioning<br>group<br>("+healthName+")</th>";
                        }
                        else{
                              tableHead = tableHead + "<th data-priority='persist'>Local<br>authority<br>("+laName+")</th>";//<th data-priority='persist'>Local<br>health<br>board<br>("+healthName+")</th>";
                        }
                        all         = commaSeparateNumber(result["QS415EW"].value[16]);
                        no_ch       = commaSeparateNumber(result["QS415EW"].value[17]);
                        gas_ch      = commaSeparateNumber(result["QS415EW"].value[18]);
                        electric_ch = commaSeparateNumber(result["QS415EW"].value[19]);
                        oil_ch      = commaSeparateNumber(result["QS415EW"].value[20]);
                        solid_ch    = commaSeparateNumber(result["QS415EW"].value[21]);
                        tableRow1   = tableRow1 + "<td>"+all+"</td>";
                        tableRow2   = tableRow2 + "<td>"+no_ch+"</td>";
                        tableRow3   = tableRow3 + "<td>"+gas_ch+"</td>";
                        tableRow4   = tableRow4 + "<td>"+electric_ch+"</td>";
                        tableRow5   = tableRow5 + "<td>"+oil_ch+"</td>";
                        tableRow6   = tableRow6 + "<td>"+solid_ch+"</td>";
                  }
    
                  if((levelname == "GOR" || levelname == "LAD" || levelname == "WD" || levelname =="OA") && nationalName == "England")
                  {
                        tableHead = tableHead + "<th data-priority='persist'>Region<br>("+regionName+")</th>";
                        all         = commaSeparateNumber(result["QS415EW"].value[8]);
                        no_ch       = commaSeparateNumber(result["QS415EW"].value[9]);
                        gas_ch      = commaSeparateNumber(result["QS415EW"].value[10]);
                        electric_ch = commaSeparateNumber(result["QS415EW"].value[11]);
                        oil_ch      = commaSeparateNumber(result["QS415EW"].value[12]);
                        solid_ch    = commaSeparateNumber(result["QS415EW"].value[13]);
                        tableRow1   = tableRow1 + "<td>"+all+"</td>";
                        tableRow2   = tableRow2 + "<td>"+no_ch+"</td>";
                        tableRow3   = tableRow3 + "<td>"+gas_ch+"</td>";
                        tableRow4   = tableRow4 + "<td>"+electric_ch+"</td>";
                        tableRow5   = tableRow5 + "<td>"+oil_ch+"</td>";
                        tableRow6   = tableRow6 + "<td>"+solid_ch+"</td>";
                  }
           
                  if(levelname == "CTRY" || levelname == "GOR" || levelname == "LAD" || levelname == "WD" || levelname =="OA")
                  {
                        tableHead = tableHead + "<th data-priority='persist'>National<br>("+nationalName+")</th>";
                        all         = commaSeparateNumber(result["QS415EW"].value[0]);
                        no_ch       = commaSeparateNumber(result["QS415EW"].value[1]);
                        gas_ch      = commaSeparateNumber(result["QS415EW"].value[2]);
                        electric_ch = commaSeparateNumber(result["QS415EW"].value[3]);
                        oil_ch      = commaSeparateNumber(result["QS415EW"].value[4]);
                        solid_ch    = commaSeparateNumber(result["QS415EW"].value[5]);
                        tableRow1   = tableRow1 + "<td>"+all+"</td>";
                        tableRow2   = tableRow2 + "<td>"+no_ch+"</td>";
                        tableRow3   = tableRow3 + "<td>"+gas_ch+"</td>";
                        tableRow4   = tableRow4 + "<td>"+electric_ch+"</td>";
                        tableRow5   = tableRow5 + "<td>"+oil_ch+"</td>";
                        tableRow6   = tableRow6 + "<td>"+solid_ch+"</td>";
                  }                  
    
                  tableRow1 = tableRow1 + "</tr>";
                  tableRow2 = tableRow2 + "</tr>";
                  tableRow3 = tableRow3 + "</tr>";
                  tableRow4 = tableRow4 + "</tr>";
                  tableRow5 = tableRow5 + "</tr>";
                  tableRow6 = tableRow6 + "</tr>";
                  var tableRows = tableRow1 + tableRow2 + tableRow3 + tableRow4 + tableRow5 + tableRow6;
                  completeTable(tableHead, tableBody, tableRows, tableType);           
                  var end = new Date().getTime();
                  var time = end - start;
                  console.log('Execution time: ' + time/1000);
                  });    
      });
    }      
    
   
    if (tableType == "housingBedroom")
    {
           start = new Date().getTime();          
           var all, up_to_pt5, over_pt5_to_1, over_1_to_1pt5, over_1pt5;   
                  
           tableHead = "<table><span class='tabletitle'>Persons per bedroom</span><thead><tr><th data-priority='persist'></th>";
           tableBody = "<tbody>";
           tableRow1 = "<tr><td>Total</td>"
           tableRow2 = "<tr><td>Up to 0.5 persons per bedroom</td>"
           tableRow3 = "<tr><td>Over 0.5 and up to 1.0 persons per bedroom</td>"
           tableRow4 = "<tr><td>Over 1.0 and up to 1.5 persons per bedroom</td>"
           tableRow5 = "<tr><td>Over 1.5 persons per bedroom</td>"   
           URL  = "http://data.ons.gov.uk/ons/api/data/dataset/QS414EW.json?context=Census&apikey=l4iaoeZCum&geog=2011STATH&dm/2011STATH="+OA+","+laCode+","+regionCode+","+nationalCode+"&jsontype=json-stat&totals=false";
    
           $.getJSON(URL, function(result)
           {
                  if(levelname =="OA")
                  {
                        tableHead           = tableHead + "<th data-priority='persist'>Output Area<br>("+OA+")</th>";
                        all                 = commaSeparateNumber(result["QS414EW"].value[15]);
                        up_to_pt5           = commaSeparateNumber(result["QS414EW"].value[16]);
                        over_pt5_to_1       = commaSeparateNumber(result["QS414EW"].value[17]);
                        over_1_to_1pt5      = commaSeparateNumber(result["QS414EW"].value[18]);
                        over_1pt5           = commaSeparateNumber(result["QS414EW"].value[19]);
                        tableRow1           = tableRow1 + "<td>"+all+"</td>";
                        tableRow2           = tableRow2 + "<td>"+up_to_pt5+"</td>";
                        tableRow3           = tableRow3 + "<td>"+over_pt5_to_1+"</td>";
                        tableRow4           = tableRow4 + "<td>"+over_1_to_1pt5+"</td>";
                        tableRow5           = tableRow5 + "<td>"+over_1pt5+"</td>";
                  }
                  
               URL  = "http://data.ons.gov.uk/ons/api/data/dataset/QS414EW.json?context=Census&apikey=l4iaoeZCum&geog=2011WARDH&dm/2011WARDH="+wardCode+"&jsontype=json-stat&totals=false";
    
                  $.getJSON(URL, function(resultWard)
                  {
                    if(levelname == "WD" || levelname =="OA")
                    {
                        tableHead = tableHead + "<th data-priority='persist'>Ward<br>("+wardName+")</th><th data-priority='persist'>Westminster<br>parliamentary<br>constituency<br>("+parliconName+")</th>";
                        all                 = commaSeparateNumber(resultWard["QS414EW"].value[0]);
                        up_to_pt5           = commaSeparateNumber(resultWard["QS414EW"].value[1]);
                        over_pt5_to_1       = commaSeparateNumber(resultWard["QS414EW"].value[2]);
                        over_1_to_1pt5      = commaSeparateNumber(resultWard["QS414EW"].value[3]);
                        over_1pt5           = commaSeparateNumber(resultWard["QS414EW"].value[4]);
                        tableRow1           = tableRow1 + "<td>"+all+"</td><td>Not Available</td>";
                        tableRow2           = tableRow2 + "<td>"+up_to_pt5+"</td><td>Not Available</td>";
                        tableRow3           = tableRow3 + "<td>"+over_pt5_to_1+"</td><td>Not Available</td>";
                        tableRow4           = tableRow4 + "<td>"+over_1_to_1pt5+"</td><td>Not Available</td>";
                        tableRow5           = tableRow5 + "<td>"+over_1pt5+"</td><td>Not Available</td>";                         
                    }    
    
                    if(levelname == "LAD" || levelname == "WD" || levelname =="OA")
                    {
                        if (nationalName == "England"){
                              tableHead = tableHead + "<th data-priority='persist'>Local<br>authority<br>("+laName+")</th>";//<th data-priority='persist'>Clinical<br>commissioning<br>group<br>("+healthName+")</th>";
                        }
                        else{
                              tableHead = tableHead + "<th data-priority='persist'>Local<br>authority<br>("+laName+")</th>";//<th data-priority='persist'>Local<br>health<br>board<br>("+healthName+")</th>";
                        }
                        all                 = commaSeparateNumber(result["QS414EW"].value[10]);
                        up_to_pt5           = commaSeparateNumber(result["QS414EW"].value[11]);
                        over_pt5_to_1       = commaSeparateNumber(result["QS414EW"].value[12]);
                        over_1_to_1pt5      = commaSeparateNumber(result["QS414EW"].value[13]);
                        over_1pt5           = commaSeparateNumber(result["QS414EW"].value[14]);
                        tableRow1           = tableRow1 + "<td>"+all+"</td>";
                        tableRow2           = tableRow2 + "<td>"+up_to_pt5+"</td>";
                        tableRow3           = tableRow3 + "<td>"+over_pt5_to_1+"</td>";
                        tableRow4           = tableRow4 + "<td>"+over_1_to_1pt5+"</td>";
                        tableRow5           = tableRow5 + "<td>"+over_1pt5+"</td>";                       
                  }
    
                  if((levelname == "GOR" || levelname == "LAD" || levelname == "WD" || levelname =="OA") && nationalName == "England")
                  {
                        tableHead = tableHead + "<th data-priority='persist'>Region<br>("+regionName+")</th>";
                        all                 = commaSeparateNumber(result["QS414EW"].value[5]);
                        up_to_pt5           = commaSeparateNumber(result["QS414EW"].value[6]);
                        over_pt5_to_1       = commaSeparateNumber(result["QS414EW"].value[7]);
                        over_1_to_1pt5      = commaSeparateNumber(result["QS414EW"].value[8]);
                        over_1pt5           = commaSeparateNumber(result["QS414EW"].value[9]);
                        tableRow1           = tableRow1 + "<td>"+all+"</td>";
                        tableRow2           = tableRow2 + "<td>"+up_to_pt5+"</td>";
                        tableRow3           = tableRow3 + "<td>"+over_pt5_to_1+"</td>";
                        tableRow4           = tableRow4 + "<td>"+over_1_to_1pt5+"</td>";
                        tableRow5           = tableRow5 + "<td>"+over_1pt5+"</td>";
                  }
           
                  if(levelname == "CTRY" || levelname == "GOR" || levelname == "LAD" || levelname == "WD" || levelname =="OA")
                  {
                        tableHead = tableHead + "<th data-priority='persist'>National<br>("+nationalName+")</th>";
                        all                 = commaSeparateNumber(result["QS414EW"].value[0]);
                        up_to_pt5           = commaSeparateNumber(result["QS414EW"].value[1]);
                        over_pt5_to_1       = commaSeparateNumber(result["QS414EW"].value[2]);
                        over_1_to_1pt5      = commaSeparateNumber(result["QS414EW"].value[3]);
                        over_1pt5           = commaSeparateNumber(result["QS414EW"].value[4]);
                        tableRow1           = tableRow1 + "<td>"+all+"</td>";
                        tableRow2           = tableRow2 + "<td>"+up_to_pt5+"</td>";
                        tableRow3           = tableRow3 + "<td>"+over_pt5_to_1+"</td>";
                        tableRow4           = tableRow4 + "<td>"+over_1_to_1pt5+"</td>";
                        tableRow5           = tableRow5 + "<td>"+over_1pt5+"</td>";
                  }
    
                  tableRow1 = tableRow1 + "</tr>";
                  tableRow2 = tableRow2 + "</tr>";
                  tableRow3 = tableRow3 + "</tr>";
                  tableRow4 = tableRow4 + "</tr>";
                  tableRow5 = tableRow5 + "</tr>";
                  var tableRows = tableRow1 + tableRow2 + tableRow3 + tableRow4 + tableRow5;
                  completeTable(tableHead, tableBody, tableRows, tableType);           
                  var end = new Date().getTime();
                  var time = end - start;
                  console.log('Execution time: ' + time/1000);
                  });    
      });
    }     
   

    if (tableType == "housingCar")
    {
           start = new Date().getTime();          
           var all, No_cars, car_1, car_2, car_3, car_4;  
           
           tableHead = "<table><span class='tabletitle'>Car or van availability</span><thead><tr><th data-priority='persist'></th>";
           tableBody = "<tbody>";
           tableRow1 = "<tr><td>Total</td>";
           tableRow2 = "<tr><td>No cars or vans in household</td>";
           tableRow3 = "<tr><td>1 car or van in household</td>";
           tableRow4 = "<tr><td>2 cars or vans in household</td>";
           tableRow5 = "<tr><td>3 cars or vans in household</td>";    
           tableRow6 = "<tr><td>4 or more cars or vans in household</td>";       
           URL  = "http://data.ons.gov.uk/ons/api/data/dataset/KS404EW.json?context=Census&apikey=l4iaoeZCum&geog=2011STATH&dm/2011STATH="+OA+","+laCode+","+regionCode+","+nationalCode+"&jsontype=json-stat&totals=false";
    
           $.getJSON(URL, function(result)
           {
                  if(levelname =="OA")
                  {
                        tableHead           = tableHead + "<th data-priority='persist'>Output Area<br>("+OA+")</th>";
                        all                 = commaSeparateNumber(result["KS404EW Segment_1"].value[18]);
                        No_cars             = commaSeparateNumber(result["KS404EW Segment_1"].value[19]);
                        car_1               = commaSeparateNumber(result["KS404EW Segment_1"].value[20]);
                        car_2               = commaSeparateNumber(result["KS404EW Segment_1"].value[21]);
                        car_3               = commaSeparateNumber(result["KS404EW Segment_1"].value[22]);
                        car_4               = commaSeparateNumber(result["KS404EW Segment_1"].value[23]);
                        tableRow1           = tableRow1 + "<td>"+all+"</td>";
                        tableRow2           = tableRow2 + "<td>"+No_cars+"</td>";
                        tableRow3           = tableRow3 + "<td>"+car_1+"</td>";
                        tableRow4           = tableRow4 + "<td>"+car_2+"</td>";
                        tableRow5           = tableRow5 + "<td>"+car_3+"</td>";
                        tableRow6           = tableRow6 + "<td>"+car_4+"</td>";
                  }
                  
               URL  = "http://data.ons.gov.uk/ons/api/data/dataset/KS404EW.json?context=Census&apikey=l4iaoeZCum&geog=2011WARDH&dm/2011WARDH="+wardCode+"&jsontype=json-stat&totals=false";
    
                  $.getJSON(URL, function(resultWard)
                  {
                    if(levelname == "WD" || levelname =="OA")
                    {
                        tableHead = tableHead + "<th data-priority='persist'>Ward<br>("+wardName+")</th><th data-priority='persist'>Westminster<br>parliamentary<br>constituency<br>("+parliconName+")</th>";
                        all                 = commaSeparateNumber(resultWard["KS404EW Segment_1"].value[0]);
                        No_cars             = commaSeparateNumber(resultWard["KS404EW Segment_1"].value[1]);
                        car_1               = commaSeparateNumber(resultWard["KS404EW Segment_1"].value[2]);
                        car_2               = commaSeparateNumber(resultWard["KS404EW Segment_1"].value[3]);
                        car_3               = commaSeparateNumber(resultWard["KS404EW Segment_1"].value[4]);
                        car_4               = commaSeparateNumber(resultWard["KS404EW Segment_1"].value[5]);
                        tableRow1           = tableRow1 + "<td>"+all+"</td><td>Not Available</td>";
                        tableRow2           = tableRow2 + "<td>"+No_cars+"</td><td>Not Available</td>";
                        tableRow3           = tableRow3 + "<td>"+car_1+"</td><td>Not Available</td>";
                        tableRow4           = tableRow4 + "<td>"+car_2+"</td><td>Not Available</td>";
                        tableRow5           = tableRow5 + "<td>"+car_3+"</td><td>Not Available</td>";
                        tableRow6           = tableRow6 + "<td>"+car_4+"</td><td>Not Available</td>";     
                    }    
    
                    if(levelname == "LAD" || levelname == "WD" || levelname =="OA")
                    {
                        if (nationalName == "England"){
                              tableHead = tableHead + "<th data-priority='persist'>Local<br>authority<br>("+laName+")</th>";//<th data-priority='persist'>Clinical<br>commissioning<br>group<br>("+healthName+")</th>";
                        }
                        else{
                              tableHead = tableHead + "<th data-priority='persist'>Local<br>authority<br>("+laName+")</th>";//<th data-priority='persist'>Local<br>health<br>board<br>("+healthName+")</th>";
                        }
                        all                 = commaSeparateNumber(result["KS404EW Segment_1"].value[12]);
                        No_cars             = commaSeparateNumber(result["KS404EW Segment_1"].value[13]);
                        car_1               = commaSeparateNumber(result["KS404EW Segment_1"].value[14]);
                        car_2               = commaSeparateNumber(result["KS404EW Segment_1"].value[15]);
                        car_3               = commaSeparateNumber(result["KS404EW Segment_1"].value[16]);
                        car_4               = commaSeparateNumber(result["KS404EW Segment_1"].value[17]);
                        tableRow1           = tableRow1 + "<td>"+all+"</td>";
                        tableRow2           = tableRow2 + "<td>"+No_cars+"</td>";
                        tableRow3           = tableRow3 + "<td>"+car_1+"</td>";
                        tableRow4           = tableRow4 + "<td>"+car_2+"</td>";
                        tableRow5           = tableRow5 + "<td>"+car_3+"</td>";
                        tableRow6           = tableRow6 + "<td>"+car_4+"</td>";             
                  }
    
                  if((levelname == "GOR" || levelname == "LAD" || levelname == "WD" || levelname =="OA") && nationalName == "England")
                  {
                        tableHead = tableHead + "<th data-priority='persist'>Region<br>("+regionName+")</th>";
                        all                 = commaSeparateNumber(result["KS404EW Segment_1"].value[6]);
                        No_cars             = commaSeparateNumber(result["KS404EW Segment_1"].value[7]);
                        car_1               = commaSeparateNumber(result["KS404EW Segment_1"].value[8]);
                        car_2               = commaSeparateNumber(result["KS404EW Segment_1"].value[9]);
                        car_3               = commaSeparateNumber(result["KS404EW Segment_1"].value[10]);
                        car_4               = commaSeparateNumber(result["KS404EW Segment_1"].value[11]);
                        tableRow1           = tableRow1 + "<td>"+all+"</td>";
                        tableRow2           = tableRow2 + "<td>"+No_cars+"</td>";
                        tableRow3           = tableRow3 + "<td>"+car_1+"</td>";
                        tableRow4           = tableRow4 + "<td>"+car_2+"</td>";
                        tableRow5           = tableRow5 + "<td>"+car_3+"</td>";
                        tableRow6           = tableRow6 + "<td>"+car_4+"</td>";                            
                  }
           
                  if(levelname == "CTRY" || levelname == "GOR" || levelname == "LAD" || levelname == "WD" || levelname =="OA")
                  {
                        tableHead = tableHead + "<th data-priority='persist'>National<br>("+nationalName+")</th>";
                        all                 = commaSeparateNumber(result["KS404EW Segment_1"].value[0]);
                        No_cars             = commaSeparateNumber(result["KS404EW Segment_1"].value[1]);
                        car_1               = commaSeparateNumber(result["KS404EW Segment_1"].value[2]);
                        car_2               = commaSeparateNumber(result["KS404EW Segment_1"].value[3]);
                        car_3               = commaSeparateNumber(result["KS404EW Segment_1"].value[4]);
                        car_4               = commaSeparateNumber(result["KS404EW Segment_1"].value[5]);
                        tableRow1           = tableRow1 + "<td>"+all+"</td>";
                        tableRow2           = tableRow2 + "<td>"+No_cars+"</td>";
                        tableRow3           = tableRow3 + "<td>"+car_1+"</td>";
                        tableRow4           = tableRow4 + "<td>"+car_2+"</td>";
                        tableRow5           = tableRow5 + "<td>"+car_3+"</td>";
                        tableRow6           = tableRow6 + "<td>"+car_4+"</td>";                            
                  }
    
                  tableRow1 = tableRow1 + "</tr>";
                  tableRow2 = tableRow2 + "</tr>";
                  tableRow3 = tableRow3 + "</tr>";
                  tableRow4 = tableRow4 + "</tr>";
                  tableRow5 = tableRow5 + "</tr>";
                  tableRow6 = tableRow6 + "</tr>";
                  var tableRows = tableRow1 + tableRow2 + tableRow3 + tableRow4 + tableRow5 + tableRow6;
                  completeTable(tableHead, tableBody, tableRows, tableType);           
                  var end = new Date().getTime();
                  var time = end - start;
                  console.log('Execution time: ' + time/1000);
             });    
      });
    }  
}

function completeTable(tableHead, tableBody, tableRows, tableType){
	$(document).ready(function(){
		//add data array to correct table
		//complete the HTML
		tableHead = tableHead + "</tr></thead>";
		tableBody = tableBody + tableRows + "</tbody></table>"

		var completeTable = tableHead + tableBody
		//send contents to "popSexGeog" table area
		if (tableType == "popSexGeog")
		{
			$('#popSexGeog').empty();
			$('#popSexGeog').append(completeTable);
		}
		else if (tableType == "ageGeog")
		{
			$('#ageGeog').empty();
			$('#ageGeog').append(completeTable);
		}
		else if (tableType == "popTime")
		{
			$('#popTime').empty();
			$('#popTime').append(completeTable);
		}
		else if (tableType == "relGeog")
		{
			$('#relGeog').empty();
			$('#relGeog').append(completeTable);
		}
		else if (tableType == "relAgeGeog")
		{
			$('#relAgeGeog').empty();
			$('#relAgeGeog').append(completeTable);
		}
		else if (tableType == "relSexGeog")
		{
			$('#relSexGeog').empty();
			$('#relSexGeog').append(completeTable);
		}
		else if (tableType == "ecoActiv")
		{
			$('#ecoActiv').empty();
			$('#ecoActiv').append(completeTable);
		}
		else if (tableType == "ecoIndustry")
		{
			$('#ecoIndustry').empty();
			$('#ecoIndustry').append(completeTable);
		}
		else if (tableType == "ecoOccupation")
		{
			$('#ecoOccupation').empty();
			$('#ecoOccupation').append(completeTable);
		}
		else if (tableType == "housingHeating")
		{
		    $('#housingHeating').empty();
		    $('#housingHeating').append(completeTable);
		}
		else if (tableType == "housingBedroom")
		{
		    $('#housingBedroom').empty();
		    $('#housingBedroom').append(completeTable);
		}
		else if (tableType == "housingCar")
		{
		    $('#housingCar').empty();
		    $('#housingCar').append(completeTable);
		}
	});
}

function commaSeparateNumber(val){
	
	 if (val >= 1000000) {
       val =  (val / 1000000).toFixed(1).replace(/\.0$/, '') + 'm';
    }
	 else
	 {
		 while (/(\d+)(\d{3})/.test(val.toString())){
			 val = val.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
		 }
	 }
  return val;
}