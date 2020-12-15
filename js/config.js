/**********************************************************************************
 * This config.js file contains the feature service URL for each data layer that  *
 * is used on the map as well as the URL for print configuration                  *    
 **********************************************************************************/

/* feature service url */ 
const kelpProductivityLayerUrl =
  "https://services2.arcgis.com/zzN1kKcv4jyJtkCg/ArcGIS/rest/services/l2scb_maxcanopy_1km/FeatureServer/0";
const bathymetryLayerUrl =
  "https://services2.arcgis.com/zzN1kKcv4jyJtkCg/ArcGIS/rest/services/cowbat_shp/FeatureServer/0";
const shippingLanesLayerUrl =
  "https://services2.arcgis.com/zzN1kKcv4jyJtkCg/arcgis/rest/services/shippinglanes/FeatureServer/0";
const dangerZonesAndRestrictedAreasLayerUrl =
  "https://services2.arcgis.com/zzN1kKcv4jyJtkCg/arcgis/rest/services/DangerZonesAndRestrictedAreas/FeatureServer/0";
const mpaInventoryLayerUrl =
  "https://services2.arcgis.com/zzN1kKcv4jyJtkCg/arcgis/rest/services/ProtectedAreas/FeatureServer/0";
const principalPortsLayerUrl =
  "https://services2.arcgis.com/zzN1kKcv4jyJtkCg/arcgis/rest/services/List_of_Ports/FeatureServer/0";
const federalAndStateWatersLayerUrl =
  "https://services2.arcgis.com/zzN1kKcv4jyJtkCg/arcgis/rest/services/FederalAndStateWaters/FeatureServer/0";

  /* print service url */ 
const printServiceUrl =
  "https://utility.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task";

export {
  kelpProductivityLayerUrl,
  bathymetryLayerUrl,
  shippingLanesLayerUrl,
  dangerZonesAndRestrictedAreasLayerUrl,
  mpaInventoryLayerUrl,
  principalPortsLayerUrl,
  federalAndStateWatersLayerUrl,
  printServiceUrl,
};
