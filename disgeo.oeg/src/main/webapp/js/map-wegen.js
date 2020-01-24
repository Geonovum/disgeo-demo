var store = new InMemoryStore();

var centerCoordinate = [544298.523790, 6866954.524398];
var centerZoom = 15;
var language = 'nl';
var modus = "relation";

var wmsNwbSource = new ol.source.TileWMS({
	url: 'https://geodata.nationaalgeoregister.nl/nwbwegen/wms',
	title: "NWB Kaart",
	params: {'LAYERS': 'wegvakken', 'STYLE':'wegvakken', 'TILED': true, 'VERSION': '1.3.0',
		'FORMAT': 'image/png','CRS': 'EPSG:3857'},
		serverType: 'geoserver'
});

/**
 * Elements that make up the popup.
 */

var container = document.getElementById('popup');
var content = document.getElementById('popup-content');
var closer = document.getElementById('popup-closer');

if (typeof wmsNwbSource !== 'undefined') {
	var wmsNwbLayer = new ol.layer.Tile({
		title: "Wegvakken",
		type: 'base',
		source: wmsNwbSource
	});
	wmsNwbLayer.setOpacity(1.0)
}

var view = new ol.View({
	center: centerCoordinate,
	zoom: centerZoom
});

//Initialize highlight layer

var vectorSource = new ol.source.Vector({});

var highlightStyle = new ol.style.Style({
	stroke: new ol.style.Stroke({
		color: [255,0,0,0.6],
		width: 2
	}),
	fill: new ol.style.Fill({
		color: [255,0,0,0.2]
	}),
	zIndex: 1
});

var highlightLayer = new ol.layer.Vector({
	source: vectorSource,
	style: highlightStyle
});
highlightLayer.setOpacity(0.8);

/**
 * Add a click handler to hide the popup.
 * @return {boolean} Don't follow the href.
 */

closer.onclick = function() {
	vectorSource.clear();
	closer.blur();
	return false;
};

var map = new ol.Map({
	target : 'map',
	layers : [
		new ol.layer.Tile({
		    title: 'OSM',
		    type: 'base',
		    visible: true,
		    source: new ol.source.XYZ({
		    	url: 'https://{a-c}.tile.opentopomap.org/{z}/{x}/{y}.png'
		    })
		})
		,highlightLayer],
		view : view
});

if (typeof wmsNwbSource !== 'undefined') {
	map.addLayer(wmsNwbLayer);
	wmsNwbLayer.setVisible(true);
}

//Address searchbox
//Instantiate with some options and add the Control
var geocoder = new Geocoder('nominatim', {
	provider: 'osm',
	lang: language,
	placeholder: 'Search for ...',
	limit: 5,
	debug: false,
	autoComplete: true,
	keepOpen: true
});
map.addControl(geocoder);

map.on('singleclick', function(evt) {
	// @TODO : deselect all features, and select current feature
	var coordinate = evt.coordinate;;
	var pixel = map.getEventPixel(evt.originalEvent);
	var layers = map.getLayers();
	var layer = null;
	layers.forEach(function (l,i) {
		if(l.get('type')=='base' && l.getVisible())			
			layer = l;		
	});	 

	var viewResolution = (view.getResolution());
	var url = layer.getSource().getGetFeatureInfoUrl(
			evt.coordinate, viewResolution, 'EPSG:3857',
			{'INFO_FORMAT': 'application/json',});
	if (url) {

		$.getJSON(url, function(data) {
			data.features.forEach(function (feature) {
				var featureModel = new ol.format.GeoJSON().readFeature(feature);
				vectorSource.clear();
				vectorSource.addFeature(featureModel);
				var identificatie = feature.properties['wvk_id'];
				var type = "http://data.stelselvanbasisregistraties.nl/bag/id/concept/Wegvak";
				if(modus == "relation"){
					$.get("core/disgeo/wegvak/"+identificatie,{}).done(function(data) {
						loadTriplesToModal(data, type);
					});
				} else if (modus == "geometric"){
					$.get("core/disgeo/geo/wegvak/"+identificatie,{}).done(function(data) {
						loadTriplesToModal(data, type);
					});
				}
			})
		});
	};
});

function loadTriplesToModal(data, type){	
	var context = data['@context'];
	$.each(context, function(key, value) {
		if (typeof value == "string" ) {
			if(value.slice(-1)=='#' || value.slice(-1) == '/')
				console.log(value);
			rdf.prefixes[key] = value;
		}
	});

	JsonLdParser.parse(data,function(result,data){
		$('#report').empty();

		data.forEach(function(triple){
			if(triple.object.toString() == "http://data.stelselvanbasisregistraties.nl/bag/id/concept/Wegvak"){
				var obj =  "<h4>Wegvak</h4><table class=\"table table-striped kro-table\">";
				data.forEach(function(numTriple){
					if(numTriple.predicate.toString() == "http://data.stelselvanbasisregistraties.nl/bag/id/gegevenselement/Wegvak_begindatum-Wegvak"
						&& numTriple.subject.toString() == triple.subject.toString()){
						obj +=  "<tr><td>Begindatum wegvak</td><td>"+retrieveValue(numTriple)+"</td></tr>";
					}
					if(numTriple.predicate.toString() == "http://data.stelselvanbasisregistraties.nl/bag/id/gegevenselement/Wegvak_dienstnaam-Wegvak"
						&& numTriple.subject.toString() == triple.subject.toString()){
						obj +=  "<tr><td>Dienstnaam</td><td>"+retrieveValue(numTriple)+"</td></tr>";
					}
					if(numTriple.predicate.toString() == "http://data.stelselvanbasisregistraties.nl/bag/id/gegevenselement/Wegvak_maximumSnelheid-Wegvak"
						&& numTriple.subject.toString() == triple.subject.toString()){
						obj +=  "<tr><td>Maximum snelheid</td><td>"+retrieveValue(numTriple)+"</td></tr>";
					}
					if(numTriple.predicate.toString() == "http://data.stelselvanbasisregistraties.nl/bag/id/gegevenselement/Wegvak_rijrichting-Wegvak"
						&& numTriple.subject.toString() == triple.subject.toString()){
						obj +=  "<tr><td>Rijrichting</td><td>"+retrieveValue(numTriple)+"</td></tr>";
					}
					if(numTriple.predicate.toString() == "http://data.stelselvanbasisregistraties.nl/bag/id/gegevenselement/Wegvak_straatnaam-Wegvak"
						&& numTriple.subject.toString() == triple.subject.toString()){
						obj +=  "<tr><td>Straatnaam</td><td>"+retrieveValue(numTriple)+"</td></tr>";
					}
					if(numTriple.predicate.toString() == "http://data.stelselvanbasisregistraties.nl/bag/id/gegevenselement/Wegvak_wegbeheerder-Wegvak"
						&& numTriple.subject.toString() == triple.subject.toString()){
						obj +=  "<tr><td>Wegbeheerder</td><td>"+retrieveValue(numTriple)+"</td></tr>";
					}
					if(numTriple.predicate.toString() == "http://data.stelselvanbasisregistraties.nl/bag/id/gegevenselement/Wegvak_wegnr_wegenlijst-Wegvak"
						&& numTriple.subject.toString() == triple.subject.toString()){
						obj +=  "<tr><td>Wegnummer wegenlijst</td><td>"+retrieveValue(numTriple)+"</td></tr>";
					}
					if(numTriple.predicate.toString() == "http://data.stelselvanbasisregistraties.nl/bag/id/gegevenselement/Wegvak_wegnummer-Wegvak"
						&& numTriple.subject.toString() == triple.subject.toString()){
						obj +=  "<tr><td>Wegnummer</td><td>"+retrieveValue(numTriple)+"</td></tr>";
					}
					if(numTriple.predicate.toString() == "http://data.stelselvanbasisregistraties.nl/bag/id/gegevenselement/Wegvak_wegnummer_hectometerpaal-Wegvak"
						&& numTriple.subject.toString() == triple.subject.toString()){
						obj +=  "<tr><td>Wegnummer hectometerpaal</td><td>"+retrieveValue(numTriple)+"</td></tr>";
					}
					if(numTriple.predicate.toString() == "http://data.stelselvanbasisregistraties.nl/bag/id/gegevenselement/Wegvak_wegtypering-Wegvak"
						&& numTriple.subject.toString() == triple.subject.toString()){
						obj +=  "<tr><td>Wegtypering</td><td>"+retrieveValue(numTriple)+"</td></tr>";
					}
					if(numTriple.predicate.toString() == "http://data.stelselvanbasisregistraties.nl/bag/id/gegevenselement/Wegvak_woonplaatsnaam-Wegvak"
						&& numTriple.subject.toString() == triple.subject.toString()){
						obj +=  "<tr><td>Woonplaatsnaam</td><td>"+retrieveValue(numTriple)+"</td></tr>";
					}
					if(numTriple.predicate.toString() == "http://data.stelselvanbasisregistraties.nl/bag/id/gegevenselement/Wegvakid-Wegvak"
						&& numTriple.subject.toString() == triple.subject.toString()){
						obj +=  "<tr><td>Wegvak identificatienummer</td><td>"+retrieveValue(numTriple)+"</td></tr>";
					}					
				});
				obj +=  "</table>";
				$("#report").append(obj);
			}
			

			if(triple.object.toString() == "http://data.stelselvanbasisregistraties.nl/bag/id/concept/Kunstwerk"){
				var obj =  "<h4>Kunstwerk</h4><table class=\"table table-striped kro-table\">";
				data.forEach(function(numTriple){
					if(numTriple.predicate.toString() == "http://data.stelselvanbasisregistraties.nl/bag/id/gegevenselement/Kunstwerk_hoofdrijbaan-Kunstwerk"
						&& numTriple.subject.toString() == triple.subject.toString()){
						obj +=  "<tr><td>Hoofdrijbaan</td><td>"+retrieveValue(numTriple)+"</td></tr>";
					}	
					if(numTriple.predicate.toString() == "http://data.stelselvanbasisregistraties.nl/bag/id/gegevenselement/Kunstwerk_omschrijving-Kunstwerk"
						&& numTriple.subject.toString() == triple.subject.toString()){
						obj +=  "<tr><td>Omschrijving kunstwerk</td><td>"+retrieveValue(numTriple)+"</td></tr>";
					}
					if(numTriple.predicate.toString() == "http://data.stelselvanbasisregistraties.nl/bag/id/gegevenselement/Kunstwerk_type-Kunstwerk"
						&& numTriple.subject.toString() == triple.subject.toString()){
						obj +=  "<tr><td>Kunstwerk type</td><td>"+retrieveValue(numTriple)+"</td></tr>";
					}
					if(numTriple.predicate.toString() == "http://data.stelselvanbasisregistraties.nl/bag/id/gegevenselement/Kunstwerk_doorrijhoogte-Kunstwerk"
						&& numTriple.subject.toString() == triple.subject.toString()){
						obj +=  "<tr><td>Doorrijhoogte</td><td>"+retrieveValue(numTriple)+"</td></tr>";
					}
					if(numTriple.predicate.toString() == "http://purl.org/dc/elements/1.1/identifier"
						&& numTriple.subject.toString() == triple.subject.toString()){
						obj +=  "<tr><td>Kunstwerk identificatie</td><td>"+retrieveValue(numTriple)+"</td></tr>";
					}
				});
				obj +=  "</table>";
				$("#report").append(obj);
			}
			
			if(triple.object.toString() == "http://data.stelselvanbasisregistraties.nl/bag/id/concept/Hectometerpaal"){
				var obj =  "<h4>Hectometerpaal</h4><table class=\"table table-striped kro-table\">";
				data.forEach(function(numTriple){
					if(numTriple.predicate.toString() == "http://data.stelselvanbasisregistraties.nl/bag/id/gegevenselement/Afstand-Hectometerpaal"
						&& numTriple.subject.toString() == triple.subject.toString()){
						obj +=  "<tr><td>Afstand hectometerpaal</td><td>"+retrieveValue(numTriple)+"</td></tr>";
					}	
					if(numTriple.predicate.toString() == "http://data.stelselvanbasisregistraties.nl/bag/id/gegevenselement/Hectometrering-Hectometerpaal"
						&& numTriple.subject.toString() == triple.subject.toString()){
						obj +=  "<tr><td>Hectometrering</td><td>"+retrieveValue(numTriple)+"</td></tr>";
					}
					if(numTriple.predicate.toString() == "http://data.stelselvanbasisregistraties.nl/bag/id/gegevenselement/Wegvakid-Hectometerpaal"
						&& numTriple.subject.toString() == triple.subject.toString()){
						obj +=  "<tr><td>Hectometerpaal wegvak identificatie</td><td>"+retrieveValue(numTriple)+"</td></tr>";
					}
					if(numTriple.predicate.toString() == "http://data.stelselvanbasisregistraties.nl/bag/id/gegevenselement/Zijde-Hectometerpaal"
						&& numTriple.subject.toString() == triple.subject.toString()){
						obj +=  "<tr><td>Zijde</td><td>"+retrieveValue(numTriple)+"</td></tr>";
					}
				});
				obj +=  "</table>";
				$("#report").append(obj);
			}
			
			if(triple.object.toString() == "http://data.stelselvanbasisregistraties.nl/rrgs/id/concept/KwetsbaarObject"){
				var obj =  "<h4>Kwetsbaarobject</h4><table class=\"table table-striped kro-table\">";
				data.forEach(function(numTriple){
					if(numTriple.predicate.toString() == "http://data.stelselvanbasisregistraties.nl/rrgs/id/gegevenselement/KO_bagid-RRGS"
						&& numTriple.subject.toString() == triple.subject.toString()){
						obj +=  "<tr><td>Bag identificatienummer</td><td>"+retrieveValue(numTriple)+"</td></tr>";
					}	
					if(numTriple.predicate.toString() == "http://data.stelselvanbasisregistraties.nl/rrgs/id/gegevenselement/KO_huisnummer-RRGS"
						&& numTriple.subject.toString() == triple.subject.toString()){
						obj +=  "<tr><td>Huisnummer</td><td>"+retrieveValue(numTriple)+"</td></tr>";
					}
					if(numTriple.predicate.toString() == "http://data.stelselvanbasisregistraties.nl/rrgs/id/gegevenselement/KO_kwetsbaarobject_code-RRGS"
						&& numTriple.subject.toString() == triple.subject.toString()){
						obj +=  "<tr><td>Kwetsbaarobject identifcatie nummer</td><td>"+retrieveValue(numTriple)+"</td></tr>";
					}
					if(numTriple.predicate.toString() == "http://data.stelselvanbasisregistraties.nl/rrgs/id/gegevenselement/KO_locatie_omschrijving-RRGS"
						&& numTriple.subject.toString() == triple.subject.toString()){
						obj +=  "<tr><td>Risico Omschrijving</td><td>"+retrieveValue(numTriple)+"</td></tr>";
					}
					if(numTriple.predicate.toString() == "http://data.stelselvanbasisregistraties.nl/rrgs/id/gegevenselement/KO_naam-RRGS"
						&& numTriple.subject.toString() == triple.subject.toString()){
						obj +=  "<tr><td>Naam</td><td>"+retrieveValue(numTriple)+"</td></tr>";
					}
					if(numTriple.predicate.toString() == "http://data.stelselvanbasisregistraties.nl/rrgs/id/gegevenselement/KO_omschrijving-RRGS"
						&& numTriple.subject.toString() == triple.subject.toString()){
						obj +=  "<tr><td>Omschrijving</td><td>"+retrieveValue(numTriple)+"</td></tr>";
					}
					if(numTriple.predicate.toString() == "http://data.stelselvanbasisregistraties.nl/rrgs/id/gegevenselement/KO_plaatsnaam-RRGS"
						&& numTriple.subject.toString() == triple.subject.toString()){
						obj +=  "<tr><td>Plaatsnaam</td><td>"+retrieveValue(numTriple)+"</td></tr>";
					}
					if(numTriple.predicate.toString() == "http://data.stelselvanbasisregistraties.nl/rrgs/id/gegevenselement/KO_postcode-RRGS"
						&& numTriple.subject.toString() == triple.subject.toString()){
						obj +=  "<tr><td>Postcode</td><td>"+retrieveValue(numTriple)+"</td></tr>";
					}
					if(numTriple.predicate.toString() == "http://data.stelselvanbasisregistraties.nl/rrgs/id/gegevenselement/KO_straatnaam-RRGS"
						&& numTriple.subject.toString() == triple.subject.toString()){
						obj +=  "<tr><td>Straatnaam</td><td>"+retrieveValue(numTriple)+"</td></tr>";
					}
					if(numTriple.predicate.toString() == "http://data.stelselvanbasisregistraties.nl/rrgs/id/gegevenselement/KO_type-RRGS"
						&& numTriple.subject.toString() == triple.subject.toString()){
						obj +=  "<tr><td>Type</td><td>"+retrieveValue(numTriple)+"</td></tr>";
					}
					if(numTriple.predicate.toString() == "http://data.stelselvanbasisregistraties.nl/rrgs/id/gegevenselement/KO_url-RRGS"
						&& numTriple.subject.toString() == triple.subject.toString()){
						obj +=  "<tr><td>Risico rapport</td><td><a href=\""+retrieveValue(numTriple)+"\">"+retrieveValue(numTriple)+"</a></td></tr>";
					}
					
				});
				obj +=  "</table>";
				$("#report").append(obj);
			}
			
			if(triple.object.toString() == "http://www.opengis.net/ont/geosparql#Geometry"){
				var obj =  "<h4>Geometrie</h4><table class=\"table table-striped kro-table\">";
				data.forEach(function(numTriple){
					if(numTriple.predicate.toString() == "http://www.opengis.net/ont/geosparql#asWKT"
						&& numTriple.subject.toString() == triple.subject.toString()){
						obj +=  "<tr><td>WKT</td><td>"+retrieveValue(numTriple)+"</td></tr>";
					}				
				});
				obj +=  "</table>";
				$("#report").append(obj);
			}
		});

		
		$('#propertyObject').modal();	
	});
}

function retrieveValue(triple){
	if(isFloat(parseFloat(triple.object.toString())))
		return parseFloat(triple.object.toString()).toFixed(2);
	else
	 return triple.object.toString();      
}

function isFloat(n){
	return n != "" && !isNaN(n) && Math.round(n) != n;
}


$("input[name=questionType]:radio").change(function () {
	selected_value = $("input[name='questionType']:checked").val();
	console.log(selected_value);
	modus = selected_value;
});

//react to size changes
$(document).ready(function () {
	$(document).on( "sizeChanged", function() {
		map.updateSize();
	});

	$(document).on( "sidebarChanged", function() {
		map.updateSize();
	});
});