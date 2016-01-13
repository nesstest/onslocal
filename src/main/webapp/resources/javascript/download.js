function download(tab, extension, table){
	
	if (tab == "tab1") {
		if (extension == "csv") {
			window.location='http://data.statistics.gov.uk/ons/datasets/csv/CSV_SAPEDE_2011STATH_2013_1_2013_EN.zip'
		}
		else
			{
				window.location='http://data.statistics.gov.uk/ons/datasets/xls/XLS_SAPEDE_2011STATH_2013_1_2013_EN.zip'
			}
    }
	else if (tab == "tab2") {
		if (extension == "csv") {
			window.location='http://data.statistics.gov.uk/ons/datasets/csv/CSV_LC2107EW_2011STATH_NAT_OA_REL_1.1.1_EN.zip'
		}
		else
			{
				window.location='http://data.statistics.gov.uk/ons/datasets/xls/XLS_LC2107EW_2011STATH_NAT_OA_REL_1.1.1_EN.zip'
			}
	}
	else if (tab == "tab3") {
		if (extension == "csv" && table == "table1") {
			window.location='http://data.statistics.gov.uk/ons/datasets/csv/CSV_LC6107EW_2011STATH_NAT_OA_REL_1.2.2_EN.zip'
		}
		else if (extension == "xlsx" && table == "table1"){
			window.location='http://data.statistics.gov.uk/ons/datasets/xls/XLS_LC6107EW_2011STATH_NAT_OA_REL_1.2.2_EN.zip'	
		}	
		if (extension == "csv" && table == "table2") {
			window.location='http://data.statistics.gov.uk/ons/datasets/csv/CSV_KS605EW_2011STATH_1_EN.zip'
		}
		else if (extension == "xlsx" && table == "table2"){
			window.location='http://www.ons.gov.uk/ons/datasets/xls/XLS_KS605EW_2011STATH_1_EN.zip'	
		}
		if (extension == "csv" && table == "table3") {
			window.location='http://data.statistics.gov.uk/ons/datasets/csv/CSV_LC6120EW_2011STATH_NAT_OA_REL_1.1.1_EN.zip'
		}
		else if (extension == "xlsx" && table == "table3"){
			window.location='http://data.statistics.gov.uk/ons/datasets/xls/XLS_LC6120EW_2011STATH_NAT_OA_REL_1.1.1_EN.zip'	
		}		
	}
	else if (tab == "tab4") {
        if (extension == "csv" && table == "table1") {
               window.location='http://data.statistics.gov.uk/ons/datasets/csv/CSV_QS415EW_2011STATH_NAT_OA_REL_1.A.A_EN.zip'
        }
        else if (extension == "xlsx" && table == "table1"){
               window.location='http://data.statistics.gov.uk/ons/datasets/xls/XLS_QS415EW_2011STATH_NAT_OA_REL_1.A.A_EN.zip'       
        }      
        if (extension == "csv" && table == "table2") {
               window.location='http://data.statistics.gov.uk/ons/datasets/csv/CSV_QS414EW_2011STATH_NAT_OA_REL_1.A.A_EN.zip'
        }
        else if (extension == "xlsx" && table == "table2"){
               window.location='http://data.statistics.gov.uk/ons/datasets/xls/XLS_QS414EW_2011STATH_NAT_OA_REL_1.A.A_EN.zip'  
        }
        if (extension == "csv" && table == "table3") {
               window.location='http://data.statistics.gov.uk/ons/datasets/csv/CSV_KS404EW_2011STATH_1_EN.zip'
        }
        else if (extension == "xlsx" && table == "table3"){
               window.location='http://data.statistics.gov.uk/ons/datasets/xls/XLS_KS404EW_2011STATH_1_EN.zip'       
        }             
    }  
}