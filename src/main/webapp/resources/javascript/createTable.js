function createTable(extcode, levelname){
	$("#tableChart").toggle();
	$("#additional-data").toggle();
		
		
	if (levelname =="WD")
		{
		//call WDA API 	for administrative level Data
		var URL = "http://data.ons.gov.uk/ons/api/data/dataset/SAPEDE.json?context=Social&apikey=l4iaoeZCum&geog=2011WARDH&dm/2011WARDH="+extcode+"&jsontype=json-stat&totals=false&diff=2013";
		}
	else{
		//call WDA API for Statistical level Data
		var URL  = "http://data.ons.gov.uk/ons/api/data/dataset/SAPEDE.json?context=Social&apikey=l4iaoeZCum&geog=2011STATH&dm/2011STATH="+extcode+"&jsontype=json-stat&totals=false&diff=2013";
		}
	var details;
	
	
	$(document).ready(function(){
		$.getJSON(URL, function(result){
			
			all = result["SAPEDE 2013"].value[0] ;
			male = result["SAPEDE 2013"].value[1] ;
			female = result["SAPEDE 2013"].value[2];
			
			$('#sapede-all').append(commaSeparateNumber(all));
			$('#sapede-males').append(commaSeparateNumber(male));
			$('#sapede-females').append(commaSeparateNumber(female));
			});	
		});
	
	$(document).ready(function(){
		$.getJSON(URL, function(result){
			//create variable for each age range grouping MALES
			m_0_4 = result["SAPEDE 2013"].value[4] + result["SAPEDE 2013"].value[7] + result["SAPEDE 2013"].value[10] + result["SAPEDE 2013"].value[13] + result["SAPEDE 2013"].value[16];
			m_5_9 = result["SAPEDE 2013"].value[19] + result["SAPEDE 2013"].value[22] + result["SAPEDE 2013"].value[25] + result["SAPEDE 2013"].value[28] + result["SAPEDE 2013"].value[31];
			m_10_14 = result["SAPEDE 2013"].value[34]+ result["SAPEDE 2013"].value[37] + result["SAPEDE 2013"].value[40] + result["SAPEDE 2013"].value[43] + result["SAPEDE 2013"].value[46];
			m_15_19 = result["SAPEDE 2013"].value[49] + result["SAPEDE 2013"].value[52] + result["SAPEDE 2013"].value[55] + result["SAPEDE 2013"].value[58] + result["SAPEDE 2013"].value[61];
			m_20_24 = result["SAPEDE 2013"].value[64] + result["SAPEDE 2013"].value[67] + result["SAPEDE 2013"].value[70] + result["SAPEDE 2013"].value[73] + result["SAPEDE 2013"].value[76];
			m_25_29 = result["SAPEDE 2013"].value[79] + result["SAPEDE 2013"].value[82] + result["SAPEDE 2013"].value[85] + result["SAPEDE 2013"].value[88] + result["SAPEDE 2013"].value[91];
			m_30_34 = result["SAPEDE 2013"].value[94] + result["SAPEDE 2013"].value[97] + result["SAPEDE 2013"].value[100] + result["SAPEDE 2013"].value[103] + result["SAPEDE 2013"].value[106];
			m_35_39 = result["SAPEDE 2013"].value[109] + result["SAPEDE 2013"].value[112] + result["SAPEDE 2013"].value[115] + result["SAPEDE 2013"].value[118] + result["SAPEDE 2013"].value[121];
			m_40_44 = result["SAPEDE 2013"].value[124] + result["SAPEDE 2013"].value[127] + result["SAPEDE 2013"].value[130] + result["SAPEDE 2013"].value[133] + result["SAPEDE 2013"].value[136];
			m_45_49 = result["SAPEDE 2013"].value[139] + result["SAPEDE 2013"].value[142] + result["SAPEDE 2013"].value[145] + result["SAPEDE 2013"].value[148] + result["SAPEDE 2013"].value[151];
			m_50_54 = result["SAPEDE 2013"].value[154] + result["SAPEDE 2013"].value[157] + result["SAPEDE 2013"].value[160] + result["SAPEDE 2013"].value[163] + result["SAPEDE 2013"].value[166];
			m_55_59 = result["SAPEDE 2013"].value[169] + result["SAPEDE 2013"].value[172] + result["SAPEDE 2013"].value[175] + result["SAPEDE 2013"].value[178] + result["SAPEDE 2013"].value[181];
			m_60_64 = result["SAPEDE 2013"].value[184] + result["SAPEDE 2013"].value[187] + result["SAPEDE 2013"].value[190] + result["SAPEDE 2013"].value[193] + result["SAPEDE 2013"].value[196];
			m_65_69 = result["SAPEDE 2013"].value[199] + result["SAPEDE 2013"].value[202] + result["SAPEDE 2013"].value[205] + result["SAPEDE 2013"].value[208] + result["SAPEDE 2013"].value[211];
			m_70_74 = result["SAPEDE 2013"].value[214] + result["SAPEDE 2013"].value[217] + result["SAPEDE 2013"].value[220] + result["SAPEDE 2013"].value[223] + result["SAPEDE 2013"].value[226];
			m_75_79 = result["SAPEDE 2013"].value[229] + result["SAPEDE 2013"].value[232] + result["SAPEDE 2013"].value[235] + result["SAPEDE 2013"].value[238] + result["SAPEDE 2013"].value[241];
			m_80_84 = result["SAPEDE 2013"].value[244] + result["SAPEDE 2013"].value[247] + result["SAPEDE 2013"].value[250] + result["SAPEDE 2013"].value[253] + result["SAPEDE 2013"].value[256];
			m_85_89 = result["SAPEDE 2013"].value[259] + result["SAPEDE 2013"].value[262] + result["SAPEDE 2013"].value[265] + result["SAPEDE 2013"].value[268] + result["SAPEDE 2013"].value[271];
			m_90 = result["SAPEDE 2013"].value[274];

			//create variable for each age range grouping FEMALES
			f_0_4 = result["SAPEDE 2013"].value[5] + result["SAPEDE 2013"].value[8] + result["SAPEDE 2013"].value[11] + result["SAPEDE 2013"].value[14] + result["SAPEDE 2013"].value[17];
			f_5_9 = result["SAPEDE 2013"].value[20] + result["SAPEDE 2013"].value[23] + result["SAPEDE 2013"].value[26] + result["SAPEDE 2013"].value[29] + result["SAPEDE 2013"].value[32];
			f_10_14 = result["SAPEDE 2013"].value[35]+ result["SAPEDE 2013"].value[38] + result["SAPEDE 2013"].value[41] + result["SAPEDE 2013"].value[44] + result["SAPEDE 2013"].value[47];
			f_15_19 = result["SAPEDE 2013"].value[50] + result["SAPEDE 2013"].value[53] + result["SAPEDE 2013"].value[56] + result["SAPEDE 2013"].value[57] + result["SAPEDE 2013"].value[62];		
			f_20_24 = result["SAPEDE 2013"].value[65] + result["SAPEDE 2013"].value[68] + result["SAPEDE 2013"].value[71] + result["SAPEDE 2013"].value[74] + result["SAPEDE 2013"].value[77];
			f_25_29 = result["SAPEDE 2013"].value[80] + result["SAPEDE 2013"].value[83] + result["SAPEDE 2013"].value[86] + result["SAPEDE 2013"].value[89] + result["SAPEDE 2013"].value[92];
			f_30_34 = result["SAPEDE 2013"].value[95] + result["SAPEDE 2013"].value[98] + result["SAPEDE 2013"].value[101] + result["SAPEDE 2013"].value[104] + result["SAPEDE 2013"].value[106];
			f_35_39 = result["SAPEDE 2013"].value[110] + result["SAPEDE 2013"].value[113] + result["SAPEDE 2013"].value[116] + result["SAPEDE 2013"].value[119] + result["SAPEDE 2013"].value[122];
			f_40_44 = result["SAPEDE 2013"].value[125] + result["SAPEDE 2013"].value[128] + result["SAPEDE 2013"].value[131] + result["SAPEDE 2013"].value[134] + result["SAPEDE 2013"].value[137];
			f_45_49 = result["SAPEDE 2013"].value[140] + result["SAPEDE 2013"].value[143] + result["SAPEDE 2013"].value[146] + result["SAPEDE 2013"].value[149] + result["SAPEDE 2013"].value[152];
			f_50_54 = result["SAPEDE 2013"].value[155] + result["SAPEDE 2013"].value[158] + result["SAPEDE 2013"].value[161] + result["SAPEDE 2013"].value[164] + result["SAPEDE 2013"].value[167];
			f_55_59 = result["SAPEDE 2013"].value[170] + result["SAPEDE 2013"].value[173] + result["SAPEDE 2013"].value[176] + result["SAPEDE 2013"].value[179] + result["SAPEDE 2013"].value[182];
			f_60_64 = result["SAPEDE 2013"].value[185] + result["SAPEDE 2013"].value[188] + result["SAPEDE 2013"].value[191] + result["SAPEDE 2013"].value[194] + result["SAPEDE 2013"].value[197];
			f_65_69 = result["SAPEDE 2013"].value[200] + result["SAPEDE 2013"].value[203] + result["SAPEDE 2013"].value[206] + result["SAPEDE 2013"].value[209] + result["SAPEDE 2013"].value[212];
			f_70_74 = result["SAPEDE 2013"].value[215] + result["SAPEDE 2013"].value[218] + result["SAPEDE 2013"].value[221] + result["SAPEDE 2013"].value[224] + result["SAPEDE 2013"].value[227];
			f_75_79 = result["SAPEDE 2013"].value[230] + result["SAPEDE 2013"].value[233] + result["SAPEDE 2013"].value[236] + result["SAPEDE 2013"].value[239] + result["SAPEDE 2013"].value[242];
			f_80_84 = result["SAPEDE 2013"].value[245] + result["SAPEDE 2013"].value[248] + result["SAPEDE 2013"].value[251] + result["SAPEDE 2013"].value[254] + result["SAPEDE 2013"].value[257];
			f_85_89 = result["SAPEDE 2013"].value[260] + result["SAPEDE 2013"].value[263] + result["SAPEDE 2013"].value[266] + result["SAPEDE 2013"].value[269] + result["SAPEDE 2013"].value[272];
			f_90 = result["SAPEDE 2013"].value[275];
            
			
			createChart(m_0_4, m_5_9, m_10_14,m_15_19,m_20_24,m_25_29,m_30_34,m_35_39,m_40_44,m_45_49,m_50_54,m_55_59,m_60_64,m_65_69,m_70_74,m_75_79,m_80_84,m_85_89,m_90, f_0_4, f_5_9, f_10_14,f_15_19,f_20_24,f_25_29,f_30_34,f_35_39,f_40_44,f_45_49,f_50_54,f_55_59,f_60_64,f_65_69,f_70_74,f_75_79,f_80_84,f_85_89,f_90 );
			
		    });	
		});
}

function createReligion(extcode, levelname){
	$("#religionChart").toggle();
	
		
	if (levelname =="WD")
		{
		//call WDA API 	for administrative level Data
		var URL = "http://data.ons.gov.uk/ons/api/data/dataset/LC2107EW.json?context=Census&apikey=l4iaoeZCum&geog=2011WARDH&dm/2011WARDH="+extcode+
		"&jsontype=json-stat&totals=false&dm/CL_0000035=CI_0000121&dm/CL_0000163=CI_0001887";
		}
	else{
		//call WDA API for Statistical level Data
		var URL  = "http://data.ons.gov.uk/ons/api/data/dataset/LC2107EW.json?context=Census&apikey=l4iaoeZCum&geog=2011STATH&dm/2011STATH="+extcode+
		"&jsontype=json-stat&totals=false&dm/CL_0000035=CI_0000121&dm/CL_0000163=CI_0001887";
	}
	
	
	$(document).ready(function(){
		$.getJSON(URL, function(result){
			
			all        = result["LC2107EW"].value[0] ;
			christian  = result["LC2107EW"].value[1] ;
			muslim     = result["LC2107EW"].value[5];
			buddhist   = result["LC2107EW"].value[2];
			sikh       = result["LC2107EW"].value[6];
			other      = result["LC2107EW"].value[7];
			
			$('#lc2107ew-all').append(commaSeparateNumber(all));
			$('#lc2107ew-christian').append(commaSeparateNumber(christian));
			$('#lc2107ew-muslim').append(commaSeparateNumber(muslim));
			$('#lc2107ew-buddhist').append(commaSeparateNumber(buddhist));
			$('#lc2107ew-sikh').append(commaSeparateNumber(sikh));
			$('#lc2107ew-other').append(commaSeparateNumber(other));
			
			createBarChart(christian, muslim, buddhist, sikh, other);
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