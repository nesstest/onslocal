function getData(extcode, levelname, areaname, tableType){


	if(levelname == null)
		{levelname = "OA"}

	var geogParam;
	var tableHead;
	var tableBody;
	var tableRow1;
	var tableRow2;
	var tableRow3;
	var tableRow4;
	var tableRow5;

	if (levelname =="WD")
	{
		geogParam = "2011WARDH&dm/2011WARDH"
		//following code to be replaced with passed WARD value
		extcode = "E05004574"
	}
	else
	{
		geogParam = "2011STATH&dm/2011STATH"
	}



	//start to create table
	tableHead = "<table><span class='tabletitle'>Population by sex and geography</span><thead><tr><th data-priority='persist'></th>";
	tableBody = "<tbody>";


	if (tableType == "popSexGeog")
	{
		// URL returns all, males and females for specified area
			/*	var parentcode
				var extCodeList = extcode;
				var leveltypeid = 15;
				while(parentcode != 'E92000001')
					{
						var returnedAreaId;
					 	getParentFromFallsWithinURL = "http://onslocalos-glassfishtest.rhcloud.com/resource-web/rs/onslocal/code/"+extcode+"/leveltypeid/"+leveltypeid+"/hierarchyid/26"
						$.getJSON(getParentFromFallsWithinURL, function(result)
						{
							returnedAreaId = result['ns2:SearchAreaByCodeResponseElement'].AreaFallsWithins.AreaFallsWithin.FallsWithin.Area.AreaId;
							alert(returnedAreaId)
							
							
							getExtcodeFromAreaDetailsURL = "http://onslocalos-glassfishtest.rhcloud.com/resource-web/rs/onslocal/area/"+returnedAreaId
							 $.getJSON(getExtcodeFromAreaDetailsURL, function(result)
							 {
							  parentcode = result['ns2:GetAreaDetailResponseElement'].AreaDetail.ExtCode;
							  alert(parentcode)
							 });	
						});
					 	
					 	if(leveltypeid == '15')
					 		{leveltypeid = }
					 	extCodeList = extcCodeList + "," +parentcode;
					 	
					 	
					}
		 		
				alert(extCodelist)*/
		
				var extCodeList;
		
				if(extcode == "E00115783")
					{
						extCodeList = "E00115783,E07000087,E12000008,E92000001"
						//OA = "E00115783"
						//LA = "E07000087"
						//parlicon = "E14000699"
						//ward = "E05004528"
						//region = "E12000008"
						//National = "E92000001"
						//county = "E10000014"
					}
			 	
				var URL  = "http://data.ons.gov.uk/ons/api/data/dataset/SAPEDE.json?context=Social&apikey=l4iaoeZCum&geog="+geogParam+"="+extCodeList+"&jsontype=json-stat&totals=false&diff=2013";
				
				$(document).ready(function(){
				$.getJSON(URL, function(result){

				tableHead = tableHead + "<th data-priority='persist'>"+levelname+"<br>("+areaname+")</th>";
				tableRow1 = "<tr><td>Total</td>"
				tableRow2 = "<tr><td>Males</td>"
				tableRow3 = "<tr><td>Females</td>"
	
				while (extcode !== "done") 
				{
					all = result["SAPEDE 2013"].value[0] ;
					male = result["SAPEDE 2013"].value[1] ;
					female = result["SAPEDE 2013"].value[2];
					tableRow1 = tableRow1 + "<td>"+all+"</td><tr>";
					tableRow2 = tableRow2 + "<td>"+male+"</td><tr>";
					tableRow3 = tableRow3 + "<td>"+female+"</td><tr>";
	
					//temporarily set extcode to UK to complete the loop statement
					extcode = "E92000001"
	
					if (extcode != "E92000001")
					{
						    extcode = "done"
							//alert("in loop")
							//find parent of area
							//extcode = findParent(extcode);
					}
					else
					{
						var tableRows = tableRow1 + tableRow2 + tableRow3;

						tableRow1 = tableRow1 + "</tr>";
						tableRow2 = tableRow2 + "</tr>";
						tableRow3 = tableRow3 + "</tr>";

						completeTable(tableHead, tableBody, tableRows, tableType); 
						extcode = "done"
					}
				}
			});	
		});
	}
	else if (tableType == "ageGeog")
	{

		//URL returns all person by age for specified area

		var URL2 = "http://data.ons.gov.uk/ons/api/data/dataset/SAPEDE.json?context=Social&apikey=l4iaoeZCum&geog="+geogParam+"="+extcode+"&dm/CL_0000670=CI_0005569&jsontype=json-stat&totals=false&diff=2013"

		$(document).ready(function(){
			$.getJSON(URL2, function(result){

				under1 = result["SAPEDE 2013"].value[1] ;
				one = result["SAPEDE 2013"].value[2] ;
				two = result["SAPEDE 2013"].value[3] ;
				three = result["SAPEDE 2013"].value[4] ;
				four = result["SAPEDE 2013"].value[5] ;



				tableHead = tableHead + "<th data-priority='persist'>Output Area<br>(E00116582)</th>";
				tableRow1 = "<tr><td>Under 1</td><td>"+under1+"</td></tr>";
				tableRow2 = "<tr><td>1</td><td>"+one+"</td></tr>";
				tableRow3 = "<tr><td>2</td><td>"+two+"</td></tr>";
				tableRow4 = "<tr><td>3</td><td>"+three+"</td></tr>";
				tableRow5 = "<tr><td>4</td><td>"+four+"</td></tr>";

				//temporarily set extcode to UK tp complete the statement

				extcode = "E92000001"

					if (extcode == "E92000001")
					{
						var tableRows = tableRow1 + tableRow2 + tableRow3 + tableRow4 + tableRow5;

						completeTable(tableHead, tableBody, tableRows, tableType);
					}


			});	
		});
	}

	else if (tableType == "popTime")
	{
		//URL returns all persons for specified are and specified year (diff=2013)
		var URL3 = "http://data.ons.gov.uk/ons/api/data/dataset/SAPEDE.json?context=Social&apikey=l4iaoeZCum&geog="+geogParam+"="+extcode+"&dm/CL_0000670=CI_0005569&dm/CL_0000671=CI_0005558&jsontype=json-stat&totals=false&diff=2013"

		$(document).ready(function(){
			$.getJSON(URL3, function(result){

				all = result["SAPEDE 2013"].value[0] ;

				tableHead = tableHead + "<th data-priority='persist'>Output Area<br>(E00116582)</th>";
				tableRow1 = "<tr><td>2013</td><td>"+all+"</td></tr>";


				//temporarily set extcode to UK tp complete the statement

				extcode = "E92000001"

					if (extcode == "E92000001")
					{
						var tableRows = tableRow1;

						completeTable(tableHead, tableBody, tableRows, tableType);
					}



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
			$('#popSexGeog').append(completeTable);
		}
		else if (tableType == "ageGeog")
		{
			$('#ageGeog').append(completeTable);
		}
		else if (tableType == "popTime")
		{
			$('#popTime').append(completeTable);
		}
	});
}


/*
function findParent(extcode){
	
	var returnedAreaId;
 	getParentFromFallsWithinURL = "http://onslocalos-glassfishtest.rhcloud.com/resource-web/rs/onslocal/code/"+extcode+"/leveltypeid/15/hierarchyid/26"
	$.getJSON(getParentFromFallsWithinURL, function(result)
	{
		returnedAreaId = result['ns2:SearchAreaByCodeResponseElement'].AreaFallsWithins.AreaFallsWithin.FallsWithin.Area.AreaId;
		return(returnedAreaId)
	});
}


function findParentExtcode(areaid){
	
	var extcode
	getExtcodeFromAreaDetailsURL = "http://onslocalos-glassfishtest.rhcloud.com/resource-web/rs/onslocal/area/"+areaid
	 $.getJSON(getExtcodeFromAreaDetailsURL, function(result)
	 {
	  extcode = result['ns2:GetAreaDetailResponseElement'].AreaDetail.ExtCode;	 
	  return(extcode)
	 });	
}*/
