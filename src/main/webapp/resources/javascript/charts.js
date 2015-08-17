/**
 * File to invoke pattern library JS demos
 */

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

function createChart(m_0_4,m_5_9,m_10_14,m_15_19,m_20_24,m_25_29,m_30_34,m_35_39,m_40_44,m_45_49,m_50_54,m_55_59,m_60_64,m_65_69,m_70_74,m_75_79,m_80_84,m_85_89,m_90,f_0_4,f_5_9,f_10_14,f_15_19,f_20_24,f_25_29,f_30_34,f_35_39,f_40_44,f_45_49,f_50_54,f_55_59,f_60_64,f_65_69,f_70_74,f_75_79,f_80_84,f_85_89,f_90 ) {

  var options;
  var data;
 
  /*
   * Create an example chart for the time-series page
   */
  $('#population-pyramid').each(function() {

    var chart = $(this);
    
    var maxValue = Math.max(m_0_4,m_5_9,m_10_14,m_15_19,
    		m_20_24,m_25_29,m_30_34,m_35_39,m_40_44,
    		m_45_49,m_50_54,m_55_59,m_60_64,m_65_69,
    		m_70_74,m_75_79,m_80_84,m_85_89,m_90,
    		f_0_4,f_5_9,f_10_14,f_15_19,
    		f_20_24,f_25_29,f_30_34,f_35_39,f_40_44,
    		f_45_49,f_50_54,f_55_59,f_60_64,f_65_69,
    		f_70_74,f_75_79,f_80_84,f_85_89,f_90);
   
    
    
    switch ( chart.data("chart") ) {
     case 'pyramid':
        data = {
    		 

    		 series: [
    		            {
    		              name: 'Male',
    		             data: [-parseInt(m_0_4),-parseInt(m_5_9),-parseInt(m_10_14),-parseInt(m_15_19),
    		                    -parseInt(m_20_24),-parseInt(m_25_29),-parseInt(m_30_34),-parseInt(m_35_39),-parseInt(m_40_44),
    		                    -parseInt(m_45_49),-parseInt(m_50_54),-parseInt(m_55_59),-parseInt(m_60_64),-parseInt(m_65_69),
    		                    -parseInt(m_70_74),-parseInt(m_75_79),-parseInt(m_80_84),-parseInt(m_85_89),-parseInt(m_90)]
    		            },{
    		              name: 'Female',
    		              data: [parseInt(f_0_4),parseInt(f_5_9),parseInt(f_10_14),parseInt(f_15_19),
    		                     parseInt(f_20_24),parseInt(f_25_29),parseInt(f_30_34),parseInt(f_35_39),parseInt(f_40_44),
    		                     parseInt(f_45_49),parseInt(f_50_54),parseInt(f_55_59),parseInt(f_60_64),parseInt(f_65_69),
    		                     parseInt(f_70_74),parseInt(f_75_79),parseInt(f_80_84),parseInt(f_85_89),parseInt(f_90) ]
    		            }
    		            

          ],
          xAxis: {
        	  categories: ['0-4', '5-9', '10-14', '15-19',
        	               '20-24', '25-29', '30-34', '35-39', '40-44',
        	               '45-49', '50-54', '55-59', '60-64', '65-69',
        	               '70-74', '75-79', '80-84', '85-89', '90 +']
          }
        };

        options = {

          chart: {
            type: 'bar'
          },
          title: {
            text: 'Population pyramid'
          },
          xAxis: {
            alternateGridColor: '#f1f1f1',
            reversed: false,
            labels: {
              step: 1
            },
            tickmarkPlacement: 'between'
          },
          yAxis: {
            title: {
              text: null
            },
            labels: {
              formatter: function () {
                return (Math.abs(this.value));
              }
            },
            
            
            min: -parseInt(maxValue),
            max: parseInt(maxValue),
            gridZIndex: 4,
            gridLineColor: '#F9F9F9'
          },
          tooltip: {
            shared: false,
            formatter: function () {
              return ('<b>' + this.series.name + ':</b> age ' + this.point.category + '<br><b>Population:</b> ' + commaSeparateNumber(Math.abs(this.point.y), 0));
            }
          },
          plotOptions: {
            series: {
              stacking: 'normal'
            }
          }
        };

        $.extend(true, options, data);

        chart.highcharts(options);

        break;
    }

  });
}

function createBarChart(var1, var2, var3, var4, var5) { 
	
	
	 var options;
	 var data;
	 
	  /*
	   * Create an example chart for the time-series page
	   */
	  $('#religion-bar').each(function() {

	    var chart = $(this);
	    
	    switch ( chart.data("chart") ) {
	      case 'stacked-bar':	    		
	
          data = {
			  xAxis: {
			    categories: ["Christian", "Muslim", "Buddhist", "Sikh", "Other"]
			  },
			  series: [
				           {
				               name: 'Religion',
				               data: [christian, muslim, buddhist, sikh, other]
				           },
			          ] // series
		  }; // data
			
			
			
		 options = {
		   chart: {
		     type: 'column'
		   },
		   title: {
		     text: 'Religion in England and Wales 2011'
		   },
		   yAxis: {
		     min: 0,
		     title: {
		       text: null
		     },
		     stackLabels: {
		       enabled: true,
		       formatter: function () {
		         if (this.total === null || this.total === undefined) {
		             return '<i>N/A</i>';
		         } else {
		             return '';
		         }
		       }
		     }
		   },
		   legend: {
		     backgroundColor: '#666666',
		     shadow: false
		   },
		   tooltip: {
		     shared: false,
		     formatter: function () {
		     return (this.x, 'Count: ' + commaSeparateNumber(this.y) + '<br/>');
		     }
		   },
		   plotOptions: {
		     column: {
		       stacking: 'normal',
		       dataLabels: {}
		     },
		     bar: {}
		   }
		 };
		
		 $.extend(true, options, data);
		
		 chart.highcharts(options);
		
		 /*
		  * Ensure that on page resize the chart is changed from vertical
		  * to horizontal.
		  */
		 window.onresize = function(event) {
		   ONS.charts.stackedResize($('[data-chart]'), options);
		 };
		
		 /*
		  * Trigger resize
		  */
		 ONS.charts.stackedResize($('[data-chart]'), options);
		
		 break;
	     }			
	 })				
}