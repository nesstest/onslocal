function createTable(extcode, levelname){
       
       //alert(document.getElementById("tableChart").getAttribute("style"))
       
       //check to see if the tables are visible, if they are do not hide them
       if(document.getElementById("tableChart").getAttribute("style") == "display: none;")
       {
              $("#tableChart").toggle();
              $("#additional-data").toggle();
       }
       
       var inputAreas, input, url, udUrl, udInput ;    
       inputAreas   = '\"'+extcode+'\"';
      
       url     = 'http://onsdatarp-glassfishtest.rhcloud.com/datarp-web/rs/nessdatarp/getdatatable';
       input   = '{ "table":"population", "areas":['+ inputAreas+'] }';
       udUrl   = 'http://onsdatarp-glassfishtest.rhcloud.com/datarp-web/rs/nessdatarp/getuserdefinedtable';
       udInput = '{ "table":"population", "areaCode":'+ inputAreas+', ' +
                    '"dataItems": [ { "userDefinedCol":"males0_4",     "columns":["0_Male","1_Male","2_Male","3_Male","4_Male"] },' +
                                  ' { "userDefinedCol":"males5_9",     "columns":["5_Male","6_Male","7_Male","8_Male","9_Male"] },' +
                                  ' { "userDefinedCol":"males10_14",   "columns":["10_Male","11_Male","12_Male","13_Male","14_Male"] },' +
                                  ' { "userDefinedCol":"males15_19",   "columns":["15_Male","16_Male","17_Male","18_Male","19_Male"] }, '+
                                  ' { "userDefinedCol":"males20_24",   "columns":["20_Male","21_Male","22_Male","23_Male","24_Male"] }, '+
                                  ' { "userDefinedCol":"males25_29",   "columns":["25_Male","26_Male","27_Male","28_Male","29_Male"] }, '+
                                  ' { "userDefinedCol":"males30_34",   "columns":["30_Male","31_Male","32_Male","33_Male","34_Male"] }, '+
                                  ' { "userDefinedCol":"males35_39",   "columns":["35_Male","36_Male","37_Male","38_Male","39_Male"] }, '+
                                  ' { "userDefinedCol":"males40_44",   "columns":["40_Male","41_Male","42_Male","43_Male","44_Male"] }, '+
                                  ' { "userDefinedCol":"males45_49",   "columns":["45_Male","46_Male","47_Male","48_Male","49_Male"] }, '+
                                  ' { "userDefinedCol":"males50_54",   "columns":["50_Male","51_Male","52_Male","53_Male","54_Male"] }, '+
                                  ' { "userDefinedCol":"males55_59",   "columns":["55_Male","56_Male","57_Male","58_Male","59_Male"] }, '+
                                  ' { "userDefinedCol":"males60_64",   "columns":["60_Male","61_Male","62_Male","63_Male","64_Male"] }, '+
                                  ' { "userDefinedCol":"males65_69",   "columns":["65_Male","66_Male","67_Male","68_Male","69_Male"] }, '+
                                  ' { "userDefinedCol":"males70_74",   "columns":["70_Male","71_Male","72_Male","73_Male","74_Male"] }, '+
                                  ' { "userDefinedCol":"males75_79",   "columns":["75_Male","76_Male","77_Male","78_Male","79_Male"] }, '+
                                  ' { "userDefinedCol":"males80_84",   "columns":["80_Male","81_Male","82_Male","83_Male","84_Male"] }, '+
                                  ' { "userDefinedCol":"males85_89",   "columns":["85_Male","86_Male","87_Male","88_Male","89_Male"] }, '+
                                  ' { "userDefinedCol":"males90",      "columns":["90_and_over_Male"] }, '+
                                  ' { "userDefinedCol":"females0_4",   "columns":["0_Female","1_Female","2_Female","3_Female","4_Female"] }, '+
                                  ' { "userDefinedCol":"females5_9",   "columns":["5_Female","6_Female","7_Female","8_Female","9_Female"] }, '+
                                  ' { "userDefinedCol":"females10_14", "columns":["10_Female","11_Female","12_Female","13_Female","14_Female"] }, '+
                                  ' { "userDefinedCol":"females15_19", "columns":["15_Female","16_Female","17_Female","18_Female","19_Female"] }, '+
                                  ' { "userDefinedCol":"females20_24", "columns":["20_Female","21_Female","22_Female","23_Female","24_Female"] }, '+
                                  ' { "userDefinedCol":"females25_29", "columns":["25_Female","26_Female","27_Female","28_Female","29_Female"] }, '+
                                  ' { "userDefinedCol":"females30_34", "columns":["30_Female","31_Female","32_Female","33_Female","34_Female"] }, '+
                                  ' { "userDefinedCol":"females35_39", "columns":["35_Female","36_Female","37_Female","38_Female","39_Female"] }, '+
                                  ' { "userDefinedCol":"females40_44", "columns":["40_Female","41_Female","42_Female","43_Female","44_Female"] }, '+
                                  ' { "userDefinedCol":"females45_49", "columns":["45_Female","46_Female","47_Female","48_Female","49_Female"] }, '+
                                  ' { "userDefinedCol":"females50_54", "columns":["50_Female","51_Female","52_Female","53_Female","54_Female"] }, '+
                                  ' { "userDefinedCol":"females55_59", "columns":["55_Female","56_Female","57_Female","58_Female","59_Female"] }, '+
                                  ' { "userDefinedCol":"females60_64", "columns":["60_Female","61_Female","62_Female","63_Female","64_Female"] }, '+
                                  ' { "userDefinedCol":"females65_69", "columns":["65_Female","66_Female","67_Female","68_Female","69_Female"] }, '+
                                  ' { "userDefinedCol":"females70_74", "columns":["70_Female","71_Female","72_Female","73_Female","74_Female"] }, '+
                                  ' { "userDefinedCol":"females75_79", "columns":["75_Female","76_Female","77_Female","78_Female","79_Female"] }, '+
                                  ' { "userDefinedCol":"females80_84", "columns":["80_Female","81_Female","82_Female","83_Female","84_Female"] }, '+
                                  ' { "userDefinedCol":"females85_89", "columns":["85_Female","86_Female","87_Female","88_Female","89_Female"] }, ' + 
                                  ' { "userDefinedCol":"females90",    "columns":["90_and_over_Female"] } ] }'; 
                  
       $(document).ready(function(){
              $.ajax({url:url, type:'post', data :  input, contentType: 'application/json',  success: function(result) {
                     all    = result[0].total_All_Ages_Total_All_Persons;
                     male   = result[0].total_All_Ages_Male;
                     female  = result[0].total_All_Ages_Female;
                     
                     //clear contents of elements
                     $('#sapede-all').empty();
                     $('#sapede-males').empty();
                     $('#sapede-females').empty();                     
                     
                     $('#sapede-all').append(commaSeparateNumber(all));
                     $('#sapede-males').append(commaSeparateNumber(male));
                     $('#sapede-females').append(commaSeparateNumber(female));
              }});   
       });
       
       $(document).ready(function(){
              $.ajax({url:udUrl, type:'post', data :  udInput, contentType: 'application/json',  success: function(result) {       
                     //create variable for each age range grouping MALES            	             	  
                     m_0_4   = result.results.males0_4;                      
                     m_5_9   = result.results.males5_9;
                     m_10_14 = result.results.males10_14;                     
                     m_15_19 = result.results.males15_19;
                     m_20_24 = result.results.males20_24;
                     m_25_29 = result.results.males25_29;
                     m_30_34 = result.results.males30_34;
                     m_35_39 = result.results.males35_39;
                     m_40_44 = result.results.males40_44;
                     m_45_49 = result.results.males45_49;
                     m_50_54 = result.results.males50_54;
                     m_55_59 = result.results.males55_59;
                     m_60_64 = result.results.males60_64;
                     m_65_69 = result.results.males65_69;                     
                     m_70_74 = result.results.males70_74;
                     m_75_79 = result.results.males75_79;
                     m_80_84 = result.results.males80_84;
                     m_85_89 = result.results.males85_89; 
                     m_90    = result.results.males90;                     
                     
                     //create variable for each age range grouping FEMALES
                     f_0_4   = result.results.females0_4;
                     f_5_9   = result.results.females5_9;
                     f_10_14 = result.results.females10_14;
                     f_15_19 = result.results.females15_19;
                     f_20_24 = result.results.females20_24;
                     f_25_29 = result.results.females25_29;
                     f_30_34 = result.results.females30_34;
                     f_35_39 = result.results.females35_39;
                     f_40_44 = result.results.females40_44;
                     f_45_49 = result.results.females45_49;
                     f_50_54 = result.results.females50_54;
                     f_55_59 = result.results.females55_59;
                     f_60_64 = result.results.females60_64;
                     f_65_69 = result.results.females65_69;
                     f_70_74 = result.results.females70_74;
                     f_75_79 = result.results.females75_79;
                     f_80_84 = result.results.females80_84;
                     f_85_89 = result.results.females85_89;
                     f_90    = result.results.females90;  
                     
                     createChart(m_0_4, m_5_9, m_10_14,m_15_19,m_20_24,m_25_29,m_30_34,m_35_39,m_40_44,m_45_49,m_50_54,m_55_59,m_60_64,m_65_69,m_70_74,m_75_79,m_80_84,m_85_89,m_90, f_0_4, f_5_9, f_10_14,f_15_19,f_20_24,f_25_29,f_30_34,f_35_39,f_40_44,f_45_49,f_50_54,f_55_59,f_60_64,f_65_69,f_70_74,f_75_79,f_80_84,f_85_89,f_90);
                }});  
       }); 
}

function createReligion(extcode, levelname){
	if(document.getElementById("religionChart").getAttribute("style") == "display: none;")
	{
		$("#religionChart").toggle();
		$("#additional-religion-data").toggle();
	}	
			
	var inputAreas, input, url;
	inputAreas   = '\"'+extcode+'\"';	
			
	url   = 'http://onsdatarp-glassfishtest.rhcloud.com/datarp-web/rs/nessdatarp/getdatatable';
	input = '{ "table":"religion", "areas":['+ inputAreas+ '] }';	
	
	$(document).ready(function(){
		$.ajax({url:url, type:'post', data :  input, contentType: 'application/json', success: function(result) { 
			
			all 	    = result[0].t_All_cat_Sex_T_All_cat_Age_T_All_cat_rel;
        	christian 	= result[0].t_All_cat_Sex_T_All_cat_Age_Christian;
        	muslim      = result[0].t_All_cat_Sex_T_All_cat_Age_Muslim;
        	buddhist    = result[0].t_All_cat_Sex_T_All_cat_Age_Buddhist;
        	sikh        = result[0].t_All_cat_Sex_T_All_cat_Age_Sikh;
        	other       = result[0].t_All_cat_Sex_T_All_cat_Age_Other_rel;         
			
			$('#lc2107ew-all').empty();
			$('#lc2107ew-christian').empty();
			$('#lc2107ew-muslim').empty();
			$('#lc2107ew-buddhist').empty();
			$('#lc2107ew-sikh').empty();
			$('#lc2107ew-other').empty();
			
			$('#lc2107ew-all').append(commaSeparateNumber(all));
			$('#lc2107ew-christian').append(commaSeparateNumber(christian));
			$('#lc2107ew-muslim').append(commaSeparateNumber(muslim));
			$('#lc2107ew-buddhist').append(commaSeparateNumber(buddhist));
			$('#lc2107ew-sikh').append(commaSeparateNumber(sikh));
			$('#lc2107ew-other').append(commaSeparateNumber(other));
			
			createBarChart(christian, muslim, buddhist, sikh, other);
		}});	  	
	});		
}

function createEconomy(extcode, levelname){
	if(document.getElementById("economyChart").getAttribute("style") == "display: none;")
	{
		$("#economyChart").toggle();
		$("#additional-economy-data").toggle();
	}
		
	if (levelname =="WD")
		{
		//call WDA API 	for administrative level Data
		var URL1 = "http://data.ons.gov.uk/ons/api/data/dataset/KS601EW.json?context=Census&apikey=l4iaoeZCum&geog=2011WARDH&dm/2011WARDH="+extcode+
		"&jsontype=json-stat&totals=false";
		
		var URL2 = "http://data.ons.gov.uk/ons/api/data/dataset/KS602EW.json?context=Census&apikey=l4iaoeZCum&geog=2011WARDH&dm/2011WARDH="+extcode+
		"&jsontype=json-stat&totals=false";
		
		var URL3 = "http://data.ons.gov.uk/ons/api/data/dataset/KS603EW.json?context=Census&apikey=l4iaoeZCum&geog=2011WARDH&dm/2011WARDH="+extcode+
		"&jsontype=json-stat&totals=false";
		
		}
	else{
		//call WDA API for Statistical level Data
		var URL1  = "http://data.ons.gov.uk/ons/api/data/dataset/KS601EW.json?context=Census&apikey=l4iaoeZCum&geog=2011STATH&dm/2011STATH="+extcode+
		"&jsontype=json-stat&totals=false";	
		
		var URL2  = "http://data.ons.gov.uk/ons/api/data/dataset/KS602EW.json?context=Census&apikey=l4iaoeZCum&geog=2011STATH&dm/2011STATH="+extcode+
		"&jsontype=json-stat&totals=false";	
		
		var URL3  = "http://data.ons.gov.uk/ons/api/data/dataset/KS603EW.json?context=Census&apikey=l4iaoeZCum&geog=2011STATH&dm/2011STATH="+extcode+
		"&jsontype=json-stat&totals=false";	
	}	
	
	$(document).ready(function(){
		$.getJSON(URL1, function(result){
			
			activity       = result["KS601EW Segment_1"].value[0];			
			parttime       = result["KS601EW Segment_1"].value[1];
			fulltime       = result["KS601EW Segment_1"].value[2];
			selfemployed   = result["KS601EW Segment_1"].value[3];
			unemployed     = result["KS601EW Segment_1"].value[4];
			student        = result["KS601EW Segment_1"].value[5];
			
			$('#ks601ew-activity').empty();
			$('#ks601ew-parttime').empty();
			$('#ks601ew-fulltime').empty();
			$('#ks601ew-selfemployed').empty();
			$('#ks601ew-unemployed').empty();
			$('#ks601ew-student').empty();
			
			$('#ks601ew-activity').append(commaSeparateNumber(activity));
			$('#ks601ew-parttime').append(commaSeparateNumber(parttime));
			$('#ks601ew-fulltime').append(commaSeparateNumber(fulltime));
			$('#ks601ew-selfemployed').append(commaSeparateNumber(selfemployed));
			$('#ks601ew-unemployed').append(commaSeparateNumber(unemployed));
			$('#ks601ew-student').append(commaSeparateNumber(student));
			
			
			//all persons
			age16_24_unemployed    = result["KS601EW Segment_4"].value[0];
			age50_75_unemployed    = result["KS601EW Segment_4"].value[1];
			neverworked_unemployed = result["KS601EW Segment_4"].value[2];
			longterm_unemployed    = result["KS601EW Segment_4"].value[3];				
			
			$(document).ready(function(){
				$.getJSON(URL2, function(result){	
				    
					//males
					age16_24_unemployed_m    = result["KS602EW Segment_4"].value[0];
					age50_75_unemployed_m    = result["KS602EW Segment_4"].value[1];
					neverworked_unemployed_m = result["KS602EW Segment_4"].value[2];
					longterm_unemployed_m    = result["KS602EW Segment_4"].value[3];
					
					$(document).ready(function(){
						$.getJSON(URL3, function(result){	
							
							//females
							age16_24_unemployed_f   = result["KS603EW Segment_4"].value[0];
							age50_75_unemployed_f    = result["KS603EW Segment_4"].value[1];
							neverworked_unemployed_f = result["KS603EW Segment_4"].value[2];
							longterm_unemployed_f    = result["KS603EW Segment_4"].value[3];							
			
			                createEconomicBarChart(age16_24_unemployed,	age50_75_unemployed, neverworked_unemployed, longterm_unemployed, age16_24_unemployed_m, age50_75_unemployed_m, neverworked_unemployed_m, longterm_unemployed_m, age16_24_unemployed_f, age50_75_unemployed_f, neverworked_unemployed_f, longterm_unemployed_f);							
						});	
					});		
				});	
			});					
		});	
	});		
}

function createHousing(extcode, levelname){
	
    if(document.getElementById("housingChart").getAttribute("style") == "display: none;")
    {
           $("#housingChart").toggle();
           $("#additional-housing-data").toggle();
    }  
           
    if (levelname =="WD")
           {
           //call WDA API       for administrative level Data
           var URL1 = "http://data.ons.gov.uk/ons/api/data/dataset/QS401EW.json?context=Census&apikey=l4iaoeZCum&geog=2011WARDH&dm/2011WARDH="+extcode+
           "&jsontype=json-stat&totals=false";      
           var URL2  = "http://data.ons.gov.uk/ons/api/data/dataset/LC4101EW.json?context=Census&apikey=l4iaoeZCum&geog=2011WARDH&dm/2011WARDH="+extcode+
           "&jsontype=json-stat&totals=true&dm/CL_0000491=CI_0003188,CI_0003189,CI_0000117,CI_0003193,CI_0003192,CI_0003191,CI_0003190";      
           }
    else{
           //call WDA API for Statistical level Data
           var URL1  = "http://data.ons.gov.uk/ons/api/data/dataset/QS401EW.json?context=Census&apikey=l4iaoeZCum&geog=2011STATH&dm/2011STATH="+extcode+
           "&jsontype=json-stat&totals=false";      
           var URL2  = "http://data.ons.gov.uk/ons/api/data/dataset/LC4101EW.json?context=Census&apikey=l4iaoeZCum&geog=2011STATH&dm/2011STATH="+extcode+
           "&jsontype=json-stat&totals=true&dm/CL_0000491=CI_0003188,CI_0003189,CI_0000117,CI_0003193,CI_0003192,CI_0003191,CI_0003190";     
    }      
    
    $(document).ready(function(){ 
           $.getJSON(URL1, function(result){
                  //Accommodation type – People   			      
   			      all               = result["QS401EW"].value[0]; 
                  unshared_house    = result["QS401EW"].value[2];
                  unshared_flat     = result["QS401EW"].value[6];
                  unshared_caravan  = result["QS401EW"].value[10];
                  shared            = result["QS401EW"].value[11];
   			                        
                  $('#qs401ew-all').empty();
                  $('#qs401ew-unshared_house').empty();
                  $('#qs401ew-unshared_flat').empty();
                  $('#qs401ew-unshared_caravan').empty();
                  $('#qs401ew-shared').empty();
                  
                  $('#qs401ew-all').append(commaSeparateNumber(all));
                  $('#qs401ew-unshared_house').append(commaSeparateNumber(unshared_house));
                  $('#qs401ew-unshared_flat').append(commaSeparateNumber(unshared_flat));
                  $('#qs401ew-unshared_caravan').append(commaSeparateNumber(unshared_caravan));
                  $('#qs401ew-shared').append(commaSeparateNumber(shared));
                  
                  $(document).ready(function(){
                        $.getJSON(URL2, function(result){
                               //Tenure by household composition
                               tenure_total         = result["LC4101EW"].value[0];
                               ownedShared_total    = result["LC4101EW"].value[1];
                               owned_outright       = result["LC4101EW"].value[2];
                               owned_other          = result["LC4101EW"].value[3];
                               rented_total         = result["LC4101EW"].value[4];
                               social_rented        = result["LC4101EW"].value[5];
                               private_rented       = result["LC4101EW"].value[6];    
                  
                          createHousingBarChart(tenure_total, ownedShared_total, owned_outright, owned_other, rented_total, social_rented, private_rented);           
                        });    
                  });                               
           });    
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