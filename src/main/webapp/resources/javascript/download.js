function download(tab, extension){
	
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
	
	
}