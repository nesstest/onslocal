
      var map;

      require([ 
        "esri/map",  
        "esri/dijit/Scalebar", 
        "dojo/parser", 
        "esri/geometry/Extent", 
        "esri/layers/FeatureLayer",  
        "esri/symbols/SimpleLineSymbol", 
        "esri/symbols/SimpleFillSymbol", 
        "esri/symbols/TextSymbol", 
        "esri/renderers/SimpleRenderer", 
        "esri/renderers/UniqueValueRenderer",  
        "esri/InfoTemplate",         
        "esri/layers/LabelLayer",  
        "dojo/_base/Color",
        "dojo/domReady!",
        "dijit/layout/BorderContainer", 
        "dijit/layout/ContentPane"

      ], function( 
        Map, Scalebar, parser, Extent, FeatureLayer, 
        SimpleLineSymbol, SimpleFillSymbol, TextSymbol,SimpleRenderer, UniqueValueRenderer, InfoTemplate,   
        LabelLayer, Color 
      ) 
      { 

        parser.parse(); 

        var bbox = new esri.geometry.Extent({xmin:-72,ymin:5003,xmax:655605,ymax:1218558 ,spatialReference:{wkid:27700}});         
        map = new Map("map", { 
          extent: bbox,
          slider:false,
          showAttribution: false,
          logo:false
        });

         var dynamicMSLayer = new esri.layers.ArcGISDynamicMapServiceLayer("http://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer")      
        map.addLayer(dynamicMSLayer); 
      }); 
  