function getData(OA,laCode,laName,parliconCode,parliconName,wardCode,wardName,regionCode,regionName,nationalCode,nationalName,healthName, levelname, areaname, tableType){

	if(regionCode === 'undefined' || regionCode === 'W99999999' || typeof regionCode === 'undefined' || typeof regionCode === null)
	{
		regionCode = nationalCode; 
    }
	
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

	

	//start to create table
	
	if (tableType == "popSexGeog")
	{
		
		tableHead = "<table><span class='tabletitle'>Population by sex and geography (2013)</span><thead><tr><th data-priority='persist'></th>";
		tableBody = "<tbody>";

						
				tableRow1 = "<tr><td>Total</td>"
				tableRow2 = "<tr><td>Males</td>"
				tableRow3 = "<tr><td>Females</td>"
					
					
				
				var URL  = "http://data.ons.gov.uk/ons/api/data/dataset/SAPEDE.json?context=Social&apikey=l4iaoeZCum&geog=2011STATH&dm/2011STATH="+OA+"&dm/CL_0000671=CI_0005558&jsontype=json-stat&totals=false&diff=2013";
			
				$.getJSON(URL, function(result)
					{
					
					    if(levelname =="OA")
					    	{
					    tableHead = tableHead + "<th data-priority='persist'>Output Area<br>("+OA+")</th>";
					    all = commaSeparateNumber(result["SAPEDE 2013"].value[0]) ;
						male = commaSeparateNumber(result["SAPEDE 2013"].value[1]) ;
						female = commaSeparateNumber(result["SAPEDE 2013"].value[2]);
						tableRow1 = tableRow1 + "<td>"+all+"</td>";
						tableRow2 = tableRow2 + "<td>"+male+"</td>";
						tableRow3 = tableRow3 + "<td>"+female+"</td>";
					    	}
						
						var URL  = "http://data.ons.gov.uk/ons/api/data/dataset/SAPEDE.json?context=Social&apikey=l4iaoeZCum&geog=2011WARDH&dm/2011WARDH="+wardCode+"&dm/CL_0000671=CI_0005558&jsontype=json-stat&totals=false&diff=2013";
						
						$.getJSON(URL, function(result)
								{
								
								if(levelname == "WD" || levelname =="OA")
						    	{
									tableHead = tableHead + "<th data-priority='persist'>Ward<br>("+wardName+")</th><th data-priority='persist'>Westminster<br>parliamentary<br>constituency<br>("+parliconName+")</th>";
									all = commaSeparateNumber(result["SAPEDE 2013"].value[0]) ;
									male = commaSeparateNumber(result["SAPEDE 2013"].value[1]) ;
									female = commaSeparateNumber(result["SAPEDE 2013"].value[2]);
									tableRow1 = tableRow1 + "<td>"+all+"</td><td>Not Available</td>";
									tableRow2 = tableRow2 + "<td>"+male+"</td><td>Not Available</td>";
									tableRow3 = tableRow3 + "<td>"+female+"</td><td>Not Available</td>";
						    	}
								
								var URL  = "http://data.ons.gov.uk/ons/api/data/dataset/SAPEDE.json?context=Social&apikey=l4iaoeZCum&geog=2011STATH&dm/2011STATH="+laCode+"&dm/CL_0000671=CI_0005558&jsontype=json-stat&totals=false&diff=2013";
								
								$.getJSON(URL, function(result)
										{
										
									if(levelname == "LAD" || levelname == "WD" || levelname =="OA")
							    	{
										tableHead = tableHead + "<th data-priority='persist'>Local<br>authority<br>("+laName+")</th><th data-priority='persist'>Clinical<br>commissioning<br>group<br>("+healthName+")</th>";
										all = commaSeparateNumber(result["SAPEDE 2013"].value[0]) ;
										male = commaSeparateNumber(result["SAPEDE 2013"].value[1]) ;
										female = commaSeparateNumber(result["SAPEDE 2013"].value[2]);
										tableRow1 = tableRow1 + "<td>"+all+"</td><td>Not Available</td>";
										tableRow2 = tableRow2 + "<td>"+male+"</td><td>Not Available</td>";
										tableRow3 = tableRow3 + "<td>"+female+"</td><td>Not Available</td>";
							    	}
									
									var URL  = "http://data.ons.gov.uk/ons/api/data/dataset/SAPEDE.json?context=Social&apikey=l4iaoeZCum&geog=2011STATH&dm/2011STATH="+regionCode+"&dm/CL_0000671=CI_0005558&jsontype=json-stat&totals=false&diff=2013";
									
									$.getJSON(URL, function(result)
											{
											
										if((levelname == "GOR" || levelname == "LAD" || levelname == "WD" || levelname =="OA") && nationalName == "England")
								    	{
											tableHead = tableHead + "<th data-priority='persist'>Region<br>("+regionName+")</th>";
											all = commaSeparateNumber(result["SAPEDE 2013"].value[0]) ;
											male = commaSeparateNumber(result["SAPEDE 2013"].value[1]) ;
											female = commaSeparateNumber(result["SAPEDE 2013"].value[2]);
											tableRow1 = tableRow1 + "<td>"+all+"</td>";
											tableRow2 = tableRow2 + "<td>"+male+"</td>";
											tableRow3 = tableRow3 + "<td>"+female+"</td>";
								    	}
												
										var URL  = "http://data.ons.gov.uk/ons/api/data/dataset/SAPEDE.json?context=Social&apikey=l4iaoeZCum&geog=2011STATH&dm/2011STATH="+nationalCode+"&dm/CL_0000671=CI_0005558&jsontype=json-stat&totals=false&diff=2013";
										
										$.getJSON(URL, function(result)
												{
												
											if(levelname == "CTRY" || levelname == "GOR" || levelname == "LAD" || levelname == "WD" || levelname =="OA")
									    	{
												tableHead = tableHead + "<th data-priority='persist'>National<br>("+nationalName+")</th>";
												all = commaSeparateNumber(result["SAPEDE 2013"].value[0]) ;
												male = commaSeparateNumber(result["SAPEDE 2013"].value[1]) ;
												female = commaSeparateNumber(result["SAPEDE 2013"].value[2]);
												tableRow1 = tableRow1 + "<td>"+all+"</td>";
												tableRow2 = tableRow2 + "<td>"+male+"</td>";
												tableRow3 = tableRow3 + "<td>"+female+"</td>";
									    	}
													
													
													tableRow1 = tableRow1 + "</tr>";
													tableRow2 = tableRow2 + "</tr>";
													tableRow3 = tableRow3 + "</tr>";
													var tableRows = tableRow1 + tableRow2 + tableRow3;

													completeTable(tableHead, tableBody, tableRows, tableType); 				
												});				
											});	 				
										});			
								});	
	
					});	
				
				
				

	}
	
	if (tableType == "ageGeog")
	{
				
				tableHead = "<table><span class='tabletitle'>Age by geography (2013)</span><thead><tr><th data-priority='persist'></th>";
				tableBody = "<tbody>";

				
				tableRow1 = "<tr><td>Under 1</td>";
				tableRow2 = "<tr><td>1</td>";
				tableRow3 = "<tr><td>2</td>";
				tableRow4 = "<tr><td>3</td>";
				tableRow5 = "<tr><td>4</td>";
				
				var URL  = "http://data.ons.gov.uk/ons/api/data/dataset/SAPEDE.json?context=Social&apikey=l4iaoeZCum&geog=2011STATH&dm/2011STATH="+OA+"&dm/CL_0000670=CI_0005569&jsontype=json-stat&totals=false&diff=2013"
			
				$.getJSON(URL, function(result)
					{
					
					    if(levelname =="OA")
					    	{
					    tableHead = tableHead + "<th data-priority='persist'>Output Area<br>("+OA+")</th>";
					    under1 = commaSeparateNumber(result["SAPEDE 2013"].value[1]) ;
						one = commaSeparateNumber(result["SAPEDE 2013"].value[2]) ;
						two = commaSeparateNumber(result["SAPEDE 2013"].value[3]) ;
						three = commaSeparateNumber(result["SAPEDE 2013"].value[4]) ;
						four = commaSeparateNumber(result["SAPEDE 2013"].value[5]) ;
						tableRow1 = tableRow1 + "<td>"+under1+"</td>";
						tableRow2 = tableRow2 + "<td>"+one+"</td>";
						tableRow3 = tableRow3 + "<td>"+two+"</td>";
						tableRow4 = tableRow4 + "<td>"+three+"</td>";
						tableRow5 = tableRow5 + "<td>"+four+"</td>";
					    	}
						
						var URL  = "http://data.ons.gov.uk/ons/api/data/dataset/SAPEDE.json?context=Social&apikey=l4iaoeZCum&geog=2011WARDH&dm/2011WARDH="+wardCode+"&dm/CL_0000670=CI_0005569&jsontype=json-stat&totals=false&diff=2013"
				
						$.getJSON(URL, function(result)
								{
								
								if(levelname == "WD" || levelname =="OA")
						    	{
									tableHead = tableHead + "<th data-priority='persist'>Ward<br>("+wardName+")</th><th data-priority='persist'>Westminster<br>parliamentary<br>constituency<br>("+parliconName+")</th>";
									under1 = commaSeparateNumber(result["SAPEDE 2013"].value[1]) ;
									one = commaSeparateNumber(result["SAPEDE 2013"].value[2]) ;
									two = commaSeparateNumber(result["SAPEDE 2013"].value[3]) ;
									three = commaSeparateNumber(result["SAPEDE 2013"].value[4]) ;
									four = commaSeparateNumber(result["SAPEDE 2013"].value[5]) ;
									tableRow1 = tableRow1 + "<td>"+under1+"</td><td>Not Available</td>";
									tableRow2 = tableRow2 + "<td>"+one+"</td><td>Not Available</td>";
									tableRow3 = tableRow3 + "<td>"+two+"</td><td>Not Available</td>";
									tableRow4 = tableRow4 + "<td>"+three+"</td><td>Not Available</td>";
									tableRow5 = tableRow5 + "<td>"+four+"</td><td>Not Available</td>";
						    	}
								
								var URL  = "http://data.ons.gov.uk/ons/api/data/dataset/SAPEDE.json?context=Social&apikey=l4iaoeZCum&geog=2011STATH&dm/2011STATH="+laCode+"&dm/CL_0000670=CI_0005569&jsontype=json-stat&totals=false&diff=2013"
						
								$.getJSON(URL, function(result)
										{
										
									if(levelname == "LAD" || levelname == "WD" || levelname =="OA")
							    	{
										tableHead = tableHead + "<th data-priority='persist'>Local<br>authority<br>("+laName+")</th><th data-priority='persist'>Clinical<br>commissioning<br>group<br>("+healthName+")</th>";
										under1 = commaSeparateNumber(result["SAPEDE 2013"].value[1]) ;
										one = commaSeparateNumber(result["SAPEDE 2013"].value[2]) ;
										two = commaSeparateNumber(result["SAPEDE 2013"].value[3]) ;
										three = commaSeparateNumber(result["SAPEDE 2013"].value[4]) ;
										four = commaSeparateNumber(result["SAPEDE 2013"].value[5]) ;
										tableRow1 = tableRow1 + "<td>"+under1+"</td><td>Not Available</td>";
									tableRow2 = tableRow2 + "<td>"+one+"</td><td>Not Available</td>";
									tableRow3 = tableRow3 + "<td>"+two+"</td><td>Not Available</td>";
									tableRow4 = tableRow4 + "<td>"+three+"</td><td>Not Available</td>";
									tableRow5 = tableRow5 + "<td>"+four+"</td><td>Not Available</td>";
							    	}
											
									var URL  = "http://data.ons.gov.uk/ons/api/data/dataset/SAPEDE.json?context=Social&apikey=l4iaoeZCum&geog=2011STATH&dm/2011STATH="+regionCode+"&dm/CL_0000670=CI_0005569&jsontype=json-stat&totals=false&diff=2013"
									
									$.getJSON(URL, function(result)
											{
											
										if((levelname == "GOR" || levelname == "LAD" || levelname == "WD" || levelname =="OA") && nationalName == "England")
								    	{
											tableHead = tableHead + "<th data-priority='persist'>Region<br>("+regionName+")</th>";
											under1 = commaSeparateNumber(result["SAPEDE 2013"].value[1]) ;
											one = commaSeparateNumber(result["SAPEDE 2013"].value[2]) ;
											two = commaSeparateNumber(result["SAPEDE 2013"].value[3]) ;
											three = commaSeparateNumber(result["SAPEDE 2013"].value[4]) ;
											four = commaSeparateNumber(result["SAPEDE 2013"].value[5]) ;
											tableRow1 = tableRow1 + "<td>"+under1+"</td>";
											tableRow2 = tableRow2 + "<td>"+one+"</td>";
											tableRow3 = tableRow3 + "<td>"+two+"</td>";
											tableRow4 = tableRow4 + "<td>"+three+"</td>";
											tableRow5 = tableRow5 + "<td>"+four+"</td>";
								    	}
												
										var URL  = "http://data.ons.gov.uk/ons/api/data/dataset/SAPEDE.json?context=Social&apikey=l4iaoeZCum&geog=2011STATH&dm/2011STATH="+nationalCode+"&dm/CL_0000670=CI_0005569&jsontype=json-stat&totals=false&diff=2013"
										
										$.getJSON(URL, function(result)
												{
												
											if(levelname == "CTRY" || levelname == "GOR" || levelname == "LAD" || levelname == "WD" || levelname =="OA")
									    	{
												tableHead = tableHead + "<th data-priority='persist'>National<br>("+nationalName+")</th>";
												under1 = commaSeparateNumber(result["SAPEDE 2013"].value[1]) ;
												one = commaSeparateNumber(result["SAPEDE 2013"].value[2]) ;
												two = commaSeparateNumber(result["SAPEDE 2013"].value[3]) ;
												three = commaSeparateNumber(result["SAPEDE 2013"].value[4]) ;
												four = commaSeparateNumber(result["SAPEDE 2013"].value[5]) ;
												tableRow1 = tableRow1 + "<td>"+under1+"</td>";
												tableRow2 = tableRow2 + "<td>"+one+"</td>";
												tableRow3 = tableRow3 + "<td>"+two+"</td>";
												tableRow4 = tableRow4 + "<td>"+three+"</td>";
												tableRow5 = tableRow5 + "<td>"+four+"</td>";
									    	}
													
													
													tableRow1 = tableRow1 + "</tr>";
													tableRow2 = tableRow2 + "</tr>";
													tableRow3 = tableRow3 + "</tr>";
													tableRow4 = tableRow4 + "</tr>";
													tableRow5 = tableRow5 + "</tr>";
													var tableRows = tableRow1 + tableRow2 + tableRow3 + tableRow4 + tableRow5;

													completeTable(tableHead, tableBody, tableRows, tableType); 				
												});				
											});	 				
										});			
								});	
	
					});	
				
				
				

	}

	if (tableType == "popTime")
	{
		
		tableHead = "<table><span class='tabletitle'>Population over time (time series, 2013)</span><thead><tr><th data-priority='persist'></th>";
		tableBody = "<tbody>";
				
				tableRow1 = "<tr><td>2013</td>";

				
				var URL  = "http://data.ons.gov.uk/ons/api/data/dataset/SAPEDE.json?context=Social&apikey=l4iaoeZCum&geog=2011STATH&dm/2011STATH="+OA+"&dm/CL_0000670=CI_0005569&dm/CL_0000671=CI_0005558&jsontype=json-stat&totals=false&diff=2013"
			
				$.getJSON(URL, function(result)
					{
					
					    if(levelname =="OA")
					    	{
					    tableHead = tableHead + "<th data-priority='persist'>Output Area<br>("+OA+")</th>";
					    under1 = commaSeparateNumber(result["SAPEDE 2013"].value[0]) ;
	
						tableRow1 = tableRow1 + "<td>"+under1+"</td>";
					
					    	}
						
						var URL  = "http://data.ons.gov.uk/ons/api/data/dataset/SAPEDE.json?context=Social&apikey=l4iaoeZCum&geog=2011WARDH&dm/2011WARDH="+wardCode+"&dm/CL_0000670=CI_0005569&dm/CL_0000671=CI_0005558&jsontype=json-stat&totals=false&diff=2013"
				
						$.getJSON(URL, function(result)
								{
								
								if(levelname == "WD" || levelname =="OA")
						    	{
									tableHead = tableHead + "<th data-priority='persist'>Ward<br>("+wardName+")</th><th data-priority='persist'>Westminster<br>parliamentary<br>constituency<br>("+parliconName+")</th>";
									under1 = commaSeparateNumber(result["SAPEDE 2013"].value[0]) ;
									
									tableRow1 = tableRow1 + "<td>"+under1+"</td><td>Not Available</td>";
								
						    	}
								
								var URL  = "http://data.ons.gov.uk/ons/api/data/dataset/SAPEDE.json?context=Social&apikey=l4iaoeZCum&geog=2011STATH&dm/2011STATH="+laCode+"&dm/CL_0000670=CI_0005569&dm/CL_0000671=CI_0005558&jsontype=json-stat&totals=false&diff=2013"
						
								$.getJSON(URL, function(result)
										{
										
									if(levelname == "LAD" || levelname == "WD" || levelname =="OA")
							    	{
										tableHead = tableHead + "<th data-priority='persist'>Local<br>authority<br>("+laName+")</th><th data-priority='persist'>Clinical<br>commissioning<br>group<br>("+healthName+")</th>";
										under1 = commaSeparateNumber(result["SAPEDE 2013"].value[0]) ;
										
										tableRow1 = tableRow1 + "<td>"+under1+"</td><td>Not Available</td>";
									
							    	}
											
									var URL  = "http://data.ons.gov.uk/ons/api/data/dataset/SAPEDE.json?context=Social&apikey=l4iaoeZCum&geog=2011STATH&dm/2011STATH="+regionCode+"&dm/CL_0000670=CI_0005569&dm/CL_0000671=CI_0005558&jsontype=json-stat&totals=false&diff=2013"
									
									$.getJSON(URL, function(result)
											{
											
										if((levelname == "GOR" || levelname == "LAD" || levelname == "WD" || levelname =="OA") && nationalName == "England")
								    	{
											tableHead = tableHead + "<th data-priority='persist'>Region<br>("+regionName+")</th>";
											under1 = commaSeparateNumber(result["SAPEDE 2013"].value[0]) ;
											
											tableRow1 = tableRow1 + "<td>"+under1+"</td>";
											
								    	}
												
										var URL  = "http://data.ons.gov.uk/ons/api/data/dataset/SAPEDE.json?context=Social&apikey=l4iaoeZCum&geog=2011STATH&dm/2011STATH="+nationalCode+"&dm/CL_0000670=CI_0005569&dm/CL_0000671=CI_0005558&jsontype=json-stat&totals=false&diff=2013"
										
										$.getJSON(URL, function(result)
												{
												
											if(levelname == "CTRY" || levelname == "GOR" || levelname == "LAD" || levelname == "WD" || levelname =="OA")
									    	{
												tableHead = tableHead + "<th data-priority='persist'>National<br>("+nationalName+")</th>";
												under1 = commaSeparateNumber(result["SAPEDE 2013"].value[0]) ;
										
												tableRow1 = tableRow1 + "<td>"+under1+"</td>";
												
									    	}
													
													
													
													tableRow1 = tableRow1 + "</tr>";
													var tableRows = tableRow1;
								
													completeTable(tableHead, tableBody, tableRows, tableType); 				
												});				
											});	 				
										});			
								});	
	
					});	
				
				
				

	}
	
	if (tableType == "relGeog")
	{
		tableHead = "<table><span class='tabletitle'>Religion by geography (2011)</span><thead><tr><th data-priority='persist'></th>";
		tableBody = "<tbody>";

				//tableHead = tableHead + "<th data-priority='persist'>"+levelname+"<br>("+areaname+")</th>";
				
				tableRow1 = "<tr><td>Total</td>"
				tableRow2 = "<tr><td>Christian</td>"
				tableRow3 = "<tr><td>Muslim</td>"
				
				var URL  = "http://data.ons.gov.uk/ons/api/data/dataset/LC2107EW.json?context=Census&apikey=l4iaoeZCum&geog=2011STATH&dm/2011STATH="+OA+"&jsontype=json-stat&totals=false&dm/CL_0000035=CI_0000121&dm/CL_0000163=CI_0001887";
			
				$.getJSON(URL, function(result)
					{
					
					    if(levelname =="OA")
					    	{
					    tableHead = tableHead + "<th data-priority='persist'>Output Area<br>("+OA+")</th>";
					    all = commaSeparateNumber(result["LC2107EW"].value[0]) ;
						christian = commaSeparateNumber(result["LC2107EW"].value[1]) ;
						muslim = commaSeparateNumber(result["LC2107EW"].value[5]);
						tableRow1 = tableRow1 + "<td>"+all+"</td>";
						tableRow2 = tableRow2 + "<td>"+christian+"</td>";
						tableRow3 = tableRow3 + "<td>"+muslim+"</td>";
					    	}
						
						var URL  = "http://data.ons.gov.uk/ons/api/data/dataset/LC2107EW.json?context=Census&apikey=l4iaoeZCum&geog=2011WARDH&dm/2011WARDH="+wardCode+"&jsontype=json-stat&totals=false&dm/CL_0000035=CI_0000121&dm/CL_0000163=CI_0001887";
				
						$.getJSON(URL, function(result)
								{
								
								if(levelname == "WD" || levelname =="OA")
						    	{
									tableHead = tableHead + "<th data-priority='persist'>Ward<br>("+wardName+")</th><th data-priority='persist'>Westminster<br>parliamentary<br>constituency<br>("+parliconName+")</th>";
									all = commaSeparateNumber(result["LC2107EW"].value[0]) ;
									christian = commaSeparateNumber(result["LC2107EW"].value[1]) ;
									muslim = commaSeparateNumber(result["LC2107EW"].value[5]);
									tableRow1 = tableRow1 + "<td>"+all+"</td><td>Not Available</td>";
									tableRow2 = tableRow2 + "<td>"+christian+"</td><td>Not Available</td>";
									tableRow3 = tableRow3 + "<td>"+muslim+"</td><td>Not Available</td>";
						    	}
								
								var URL  = "http://data.ons.gov.uk/ons/api/data/dataset/LC2107EW.json?context=Census&apikey=l4iaoeZCum&geog=2011STATH&dm/2011STATH="+laCode+"&jsontype=json-stat&totals=false&dm/CL_0000035=CI_0000121&dm/CL_0000163=CI_0001887";
						
					
								$.getJSON(URL, function(result)
										{
										
									if(levelname == "LAD" || levelname == "WD" || levelname =="OA")
							    	{
										tableHead = tableHead + "<th data-priority='persist'>Local<br>authority<br>("+laName+")</th><th data-priority='persist'>Clinical<br>commissioning<br>group<br>("+healthName+")</th>";
										all = commaSeparateNumber(result["LC2107EW"].value[0]) ;
										christian = commaSeparateNumber(result["LC2107EW"].value[1]) ;
										muslim = commaSeparateNumber(result["LC2107EW"].value[5]);
										tableRow1 = tableRow1 + "<td>"+all+"</td><td>Not Available</td>";
										tableRow2 = tableRow2 + "<td>"+christian+"</td><td>Not Available</td>";
										tableRow3 = tableRow3 + "<td>"+muslim+"</td><td>Not Available</td>";
							    	}
											
									var URL  = "http://data.ons.gov.uk/ons/api/data/dataset/LC2107EW.json?context=Census&apikey=l4iaoeZCum&geog=2011STATH&dm/2011STATH="+regionCode+"&jsontype=json-stat&totals=false&dm/CL_0000035=CI_0000121&dm/CL_0000163=CI_0001887";
									
									$.getJSON(URL, function(result)
											{
											
										if((levelname == "GOR" || levelname == "LAD" || levelname == "WD" || levelname =="OA") && nationalName == "England")
								    	{
											tableHead = tableHead + "<th data-priority='persist'>Region<br>("+regionName+")</th>";
											all = commaSeparateNumber(result["LC2107EW"].value[0]) ;
											christian = commaSeparateNumber(result["LC2107EW"].value[1]) ;
											muslim = commaSeparateNumber(result["LC2107EW"].value[5]);
											tableRow1 = tableRow1 + "<td>"+all+"</td>";
											tableRow2 = tableRow2 + "<td>"+christian+"</td>";
											tableRow3 = tableRow3 + "<td>"+muslim+"</td>";
								    	}
												
										var URL  = "http://data.ons.gov.uk/ons/api/data/dataset/LC2107EW.json?context=Census&apikey=l4iaoeZCum&geog=2011STATH&dm/2011STATH="+nationalCode+"&jsontype=json-stat&totals=false&dm/CL_0000035=CI_0000121&dm/CL_0000163=CI_0001887";
										
										$.getJSON(URL, function(result)
												{
												
											if(levelname == "CTRY" || levelname == "GOR" || levelname == "LAD" || levelname == "WD" || levelname =="OA")
									    	{
												tableHead = tableHead + "<th data-priority='persist'>National<br>("+nationalName+")</th>";
												all = commaSeparateNumber(result["LC2107EW"].value[0]) ;
												christian = commaSeparateNumber(result["LC2107EW"].value[1]) ;
												muslim = commaSeparateNumber(result["LC2107EW"].value[5]);
												tableRow1 = tableRow1 + "<td>"+all+"</td>";
												tableRow2 = tableRow2 + "<td>"+christian+"</td>";
												tableRow3 = tableRow3 + "<td>"+muslim+"</td>";
									    	}
													
													
													
													tableRow1 = tableRow1 + "</tr>";
													tableRow2 = tableRow2 + "</tr>";
													tableRow3 = tableRow3 + "</tr>";
													var tableRows = tableRow1 + tableRow2 + tableRow3;
													completeTable(tableHead, tableBody, tableRows, tableType); 				
												});				
											});	 				
										});			
								});	
	
					});	
				
				
				

	}
	
	
	
	if (tableType == "relAgeGeog")
	{
		tableHead = "<table><span class='tabletitle'>Religion by age and geography (2011)</span><thead><tr><th data-priority='persist'></th><th data-priority='persist'></th>";
		tableBody = "<tbody>";

				//tableHead = tableHead + "<th data-priority='persist'>"+levelname+"<br>("+areaname+")</th>";
				
				tableRow1 = "<tr><th style='border-top:1px solid black;' rowspan='3'><font size='2'>Christian</font></th><td>0-15</td>"
				tableRow2 = "<tr><td>16-24</td>"
				tableRow3 = "<tr><td>25-34</td>"
				
				var URL  = "http://data.ons.gov.uk/ons/api/data/dataset/LC2107EW.json?context=Census&apikey=l4iaoeZCum&geog=2011STATH&dm/2011STATH="+OA+"&jsontype=json-stat&totals=false&dm/CL_0000006=CI_0000070&dm/CL_0000035=CI_0000121";
						
				$.getJSON(URL, function(result)
					{
					
						
					    if(levelname =="OA")
					    	{
					    tableHead = tableHead + "<th data-priority='persist'>Output Area<br>("+OA+")</th>";
					    groupOne = commaSeparateNumber(result["LC2107EW"].value[1]) ;
						groupTwo = commaSeparateNumber(result["LC2107EW"].value[2]);
						groupThree = commaSeparateNumber(result["LC2107EW"].value[3]);
						tableRow1 = tableRow1 + "<td>"+groupOne+"</td>";
						tableRow2 = tableRow2 + "<td>"+groupTwo+"</td>";
						tableRow3 = tableRow3 + "<td>"+groupThree+"</td>";
					    	}
						
						var URL  = "http://data.ons.gov.uk/ons/api/data/dataset/LC2107EW.json?context=Census&apikey=l4iaoeZCum&geog=2011WARDH&dm/2011WARDH="+wardCode+"&jsontype=json-stat&totals=false&dm/CL_0000006=CI_0000070&dm/CL_0000035=CI_0000121";
				
						$.getJSON(URL, function(result)
								{
								
								if(levelname == "WD" || levelname =="OA")
						    	{
									tableHead = tableHead + "<th data-priority='persist'>Ward<br>("+wardName+")</th><th data-priority='persist'>Westminster<br>parliamentary<br>constituency<br>("+parliconName+")</th>";
									groupOne = commaSeparateNumber(result["LC2107EW"].value[1]) ;
									groupTwo = commaSeparateNumber(result["LC2107EW"].value[2]) ;
									groupThree = commaSeparateNumber(result["LC2107EW"].value[3]);
									tableRow1 = tableRow1 + "<td>"+groupOne+"</td><td>Not Available</td>";
									tableRow2 = tableRow2 + "<td>"+groupTwo+"</td><td>Not Available</td>";
									tableRow3 = tableRow3 + "<td>"+groupThree+"</td><td>Not Available</td>";
						    	}
								
								var URL  = "http://data.ons.gov.uk/ons/api/data/dataset/LC2107EW.json?context=Census&apikey=l4iaoeZCum&geog=2011STATH&dm/2011STATH="+laCode+"&jsontype=json-stat&totals=false&dm/CL_0000006=CI_0000070&dm/CL_0000035=CI_0000121";
						
								$.getJSON(URL, function(result)
										{
										
									if(levelname == "LAD" || levelname == "WD" || levelname =="OA")
							    	{
										tableHead = tableHead + "<th data-priority='persist'>Local<br>authority<br>("+laName+")</th><th data-priority='persist'>Clinical<br>commissioning<br>group<br>("+healthName+")</th>";
										groupOne = commaSeparateNumber(result["LC2107EW"].value[1]);
										groupTwo = commaSeparateNumber(result["LC2107EW"].value[2]);
										groupThree = commaSeparateNumber(result["LC2107EW"].value[3]);
										tableRow1 = tableRow1 + "<td>"+groupOne+"</td><td>Not Available</td>";
										tableRow2 = tableRow2 + "<td>"+groupTwo+"</td><td>Not Available</td>";
										tableRow3 = tableRow3 + "<td>"+groupThree+"</td><td>Not Available</td>";
							    	}
											
									var URL  = "http://data.ons.gov.uk/ons/api/data/dataset/LC2107EW.json?context=Census&apikey=l4iaoeZCum&geog=2011STATH&dm/2011STATH="+regionCode+"&jsontype=json-stat&totals=false&dm/CL_0000006=CI_0000070&dm/CL_0000035=CI_0000121";
									
									$.getJSON(URL, function(result)
											{
											
										if((levelname == "GOR" || levelname == "LAD" || levelname == "WD" || levelname =="OA") && nationalName == "England")
								    	{
											tableHead = tableHead + "<th data-priority='persist'>Region<br>("+regionName+")</th>";
											groupOne = commaSeparateNumber(result["LC2107EW"].value[1]) ;
											groupTwo = commaSeparateNumber(result["LC2107EW"].value[2]) ;
											groupThree = commaSeparateNumber(result["LC2107EW"].value[3]);
											tableRow1 = tableRow1 + "<td>"+groupOne+"</td>";
											tableRow2 = tableRow2 + "<td>"+groupTwo+"</td>";
											tableRow3 = tableRow3 + "<td>"+groupThree+"</td>";
								    	}
												
										var URL  = "http://data.ons.gov.uk/ons/api/data/dataset/LC2107EW.json?context=Census&apikey=l4iaoeZCum&geog=2011STATH&dm/2011STATH="+nationalCode+"&jsontype=json-stat&totals=false&dm/CL_0000006=CI_0000070&dm/CL_0000035=CI_0000121";
										
										$.getJSON(URL, function(result)
												{
												
											if(levelname == "CTRY" || levelname == "GOR" || levelname == "LAD" || levelname == "WD" || levelname =="OA")
									    	{
												tableHead = tableHead + "<th data-priority='persist'>National<br>("+nationalName+")</th>";
												groupOne = commaSeparateNumber(result["LC2107EW"].value[1]) ;
												groupTwo = commaSeparateNumber(result["LC2107EW"].value[2]) ;
												groupThree = commaSeparateNumber(result["LC2107EW"].value[3]);
												tableRow1 = tableRow1 + "<td>"+groupOne+"</td>";
												tableRow2 = tableRow2 + "<td>"+groupTwo+"</td>";
												tableRow3 = tableRow3 + "<td>"+groupThree+"</td>";
									    	}
													
													
													
													tableRow1 = tableRow1 + "</tr>";
													tableRow2 = tableRow2 + "</tr>";
													tableRow3 = tableRow3 + "</tr>";
													
													var tableRows = tableRow1 + tableRow2 + tableRow3;								
													completeTable(tableHead, tableBody, tableRows, tableType); 				
												});				
											});	 				
										});			
								});	
	
					});	
				
				
				

	}
	
	if (tableType == "relSexGeog")
	{
		tableHead = "<table><span class='tabletitle'>Religion by sex and geography (2011)</span><thead><tr><th data-priority='persist'></th><th data-priority='persist'></th>";
		tableBody = "<tbody>";

				//tableHead = tableHead + "<th data-priority='persist'>"+levelname+"<br>("+areaname+")</th>";
				
				tableRow1 = "<tr><th style='border-top:1px solid black;' rowspan='2'><font size='2'>Christian</font></th><td>Male</td>"
				tableRow2 = "<tr><td>Female</td>"
				tableRow3 = "<tr><th style='border-top:1px solid black;' rowspan='2'><font size='2'>Muslim</font></th><td>Male</td>"
				tableRow4 = "<tr><td>Female</td>"

				
				var URL  = "http://data.ons.gov.uk/ons/api/data/dataset/LC2107EW.json?context=Census&apikey=l4iaoeZCum&geog=2011STATH&dm/2011STATH="+OA+"&jsontype=json-stat&totals=false&dm/CL_0000006=CI_0000070,CI_0000074&dm/CL_0000035=CI_0000071,CI_0000070&dm/CL_0000163=CI_0001887";
						
				$.getJSON(URL, function(result)
					{
					
						
					    if(levelname =="OA")
					    	{
					    tableHead = tableHead + "<th data-priority='persist'>Output Area<br>("+OA+")</th>";
					    groupOne = commaSeparateNumber(result["LC2107EW"].value[0]) ;
						groupTwo = commaSeparateNumber(result["LC2107EW"].value[2]) ;
						groupThree = commaSeparateNumber(result["LC2107EW"].value[1]);
						groupFour = commaSeparateNumber(result["LC2107EW"].value[3]);
						tableRow1 = tableRow1 + "<td>"+groupOne+"</td>";
						tableRow2 = tableRow2 + "<td>"+groupTwo+"</td>";
						tableRow3 = tableRow3 + "<td>"+groupThree+"</td>";
						tableRow4 = tableRow4 + "<td>"+groupFour+"</td>";
					    	}
						
						var URL  = "http://data.ons.gov.uk/ons/api/data/dataset/LC2107EW.json?context=Census&apikey=l4iaoeZCum&geog=2011WARDH&dm/2011WARDH="+wardCode+"&jsontype=json-stat&totals=false&dm/CL_0000006=CI_0000070,CI_0000074&dm/CL_0000035=CI_0000071,CI_0000070&dm/CL_0000163=CI_0001887";
				
						$.getJSON(URL, function(result)
								{
								
								if(levelname == "WD" || levelname =="OA")
						    	{
									tableHead = tableHead + "<th data-priority='persist'>Ward<br>("+wardName+")</th><th data-priority='persist'>Westminster<br>parliamentary<br>constituency<br>("+parliconName+")</th>";
									 groupOne = commaSeparateNumber(result["LC2107EW"].value[0]) ;
										groupTwo = commaSeparateNumber(result["LC2107EW"].value[2]) ;
										groupThree = commaSeparateNumber(result["LC2107EW"].value[1]);
										groupFour = commaSeparateNumber(result["LC2107EW"].value[3]);
									tableRow1 = tableRow1 + "<td>"+groupOne+"</td><td>Not Available</td>";
									tableRow2 = tableRow2 + "<td>"+groupTwo+"</td><td>Not Available</td>";
									tableRow3 = tableRow3 + "<td>"+groupThree+"</td><td>Not Available</td>";
									tableRow4 = tableRow4 + "<td>"+groupFour+"</td><td>Not Available</td>";

						    	}
								
								var URL  = "http://data.ons.gov.uk/ons/api/data/dataset/LC2107EW.json?context=Census&apikey=l4iaoeZCum&geog=2011STATH&dm/2011STATH="+laCode+"&jsontype=json-stat&totals=false&dm/CL_0000006=CI_0000070,CI_0000074&dm/CL_0000035=CI_0000071,CI_0000070&dm/CL_0000163=CI_0001887";
						
								$.getJSON(URL, function(result)
										{
										
									if(levelname == "LAD" || levelname == "WD" || levelname =="OA")
							    	{
										tableHead = tableHead + "<th data-priority='persist'>Local<br>authority<br>("+laName+")</th><th data-priority='persist'>Clinical<br>commissioning<br>group<br>("+healthName+")</th>";
										 groupOne = commaSeparateNumber(result["LC2107EW"].value[0]) ;
											groupTwo = commaSeparateNumber(result["LC2107EW"].value[2]) ;
											groupThree = commaSeparateNumber(result["LC2107EW"].value[1]);
											groupFour = commaSeparateNumber(result["LC2107EW"].value[3]);
										tableRow1 = tableRow1 + "<td>"+groupOne+"</td><td>Not Available</td>";
										tableRow2 = tableRow2 + "<td>"+groupTwo+"</td><td>Not Available</td>";
										tableRow3 = tableRow3 + "<td>"+groupThree+"</td><td>Not Available</td>";
										tableRow4 = tableRow4 + "<td>"+groupFour+"</td><td>Not Available</td>";
							    	}
											
									var URL  = "http://data.ons.gov.uk/ons/api/data/dataset/LC2107EW.json?context=Census&apikey=l4iaoeZCum&geog=2011STATH&dm/2011STATH="+regionCode+"&jsontype=json-stat&totals=false&dm/CL_0000006=CI_0000070,CI_0000074&dm/CL_0000035=CI_0000071,CI_0000070&dm/CL_0000163=CI_0001887";
									
									$.getJSON(URL, function(result)
											{
											
										if((levelname == "GOR" || levelname == "LAD" || levelname == "WD" || levelname =="OA") && nationalName == "England")
								    	{
											tableHead = tableHead + "<th data-priority='persist'>Region<br>("+regionName+")</th>";
											 groupOne = commaSeparateNumber(result["LC2107EW"].value[0]) ;
												groupTwo = commaSeparateNumber(result["LC2107EW"].value[2]);
												groupThree = commaSeparateNumber(result["LC2107EW"].value[1]);
												groupFour = commaSeparateNumber(result["LC2107EW"].value[3]);
											tableRow1 = tableRow1 + "<td>"+groupOne+"</td>";
											tableRow2 = tableRow2 + "<td>"+groupTwo+"</td>";
											tableRow3 = tableRow3 + "<td>"+groupThree+"</td>";
											tableRow4 = tableRow4 + "<td>"+groupFour+"</td>";
								    	}
												
										var URL  = "http://data.ons.gov.uk/ons/api/data/dataset/LC2107EW.json?context=Census&apikey=l4iaoeZCum&geog=2011STATH&dm/2011STATH="+nationalCode+"&jsontype=json-stat&totals=false&dm/CL_0000006=CI_0000070,CI_0000074&dm/CL_0000035=CI_0000071,CI_0000070&dm/CL_0000163=CI_0001887";
										
										$.getJSON(URL, function(result)
												{
												
											if(levelname == "CTRY" || levelname == "GOR" || levelname == "LAD" || levelname == "WD" || levelname =="OA")
									    	{
												tableHead = tableHead + "<th data-priority='persist'>National<br>("+nationalName+")</th>";
												 groupOne = commaSeparateNumber(result["LC2107EW"].value[0]) ;
													groupTwo = commaSeparateNumber(result["LC2107EW"].value[2]) ;
													groupThree = commaSeparateNumber(result["LC2107EW"].value[1]);
													groupFour = commaSeparateNumber(result["LC2107EW"].value[3]);
												tableRow1 = tableRow1 + "<td>"+groupOne+"</td>";
												tableRow2 = tableRow2 + "<td>"+groupTwo+"</td>";
												tableRow3 = tableRow3 + "<td>"+groupThree+"</td>";
												tableRow4 = tableRow4 + "<td>"+groupFour+"</td>";
									    	}
													
													
													
													tableRow1 = tableRow1 + "</tr>";
													tableRow2 = tableRow2 + "</tr>";
													tableRow3 = tableRow3 + "</tr>";
													tableRow4 = tableRow4 + "</tr>";
													
													var tableRows = tableRow1 + tableRow2 + tableRow3 + tableRow4;								
													completeTable(tableHead, tableBody, tableRows, tableType); 				
												});				
											});	 				
										});			
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

