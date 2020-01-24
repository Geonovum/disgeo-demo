var store = new InMemoryStore();

var centerCoordinate = [544298.523790, 6866954.524398];
var centerZoom = 15;
var language = 'nl';
var modus = "relation";

var wmsVboSource = new ol.source.TileWMS({
	url: 'https://geodata.nationaalgeoregister.nl/bag/wms',
	title: "Verblijfsobjecten Kaart",
	params: {'LAYERS': 'verblijfsobject', 'TILED': true, 'VERSION': '1.1.0', 
		'FORMAT': 'image/png8','CRS': 'EPSG:3857'},
		serverType: 'geoserver'
});

/**
 * Elements that make up the popup.
 */

var container = document.getElementById('popup');
var content = document.getElementById('popup-content');
var closer = document.getElementById('popup-closer');

if (typeof wmsVboSource !== 'undefined') {
	var wmsVboLayer = new ol.layer.Tile({
		type: 'base',
		title: 'Verblijfsobjecten',
		source: wmsVboSource
	});
	wmsVboLayer.setOpacity(1.0);
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

if (typeof wmsVboSource !== 'undefined') {
	map.addLayer(wmsVboLayer);
	wmsVboLayer.setVisible(true);

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
				var identificatie = feature.properties['identificatie'];
				var type = "";
				if(modus == "relation"){
					$.get("core/disgeo/verblijfsobject/"+(identificatie+'').padStart(16, "0"),{}).done(function(data) {
						loadTriplesToModal(data, type);
					});
				} else if (modus == "geometric"){
					$.get("core/disgeo/geo/verblijfsobject/"+(identificatie+'').padStart(16, "0"),{}).done(function(data) {
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
			rdf.prefixes[key] = value;
		}
	});

	JsonLdParser.parse(data,function(result,data){
		$('#report').empty();

		data.forEach(function(triple){
			if(triple.object.toString() == "http://data.stelselvanbasisregistraties.nl/bag/id/concept/Nummeraanduiding"){
				var obj =  "<h4>Adres</h4><table class=\"table table-striped kro-table\">";
				data.forEach(function(numTriple){
					if(numTriple.predicate.toString() == "http://data.stelselvanbasisregistraties.nl/bag/id/gegevenselement/Identificatiecode_Nummeraanduiding-Nummeraanduiding"
						&& numTriple.subject.toString() == triple.subject.toString()){
						obj +=  "<tr><td>Identificatiecode</td><td>"+retrieveValue(numTriple)+"</td></tr>";
					}
					if(numTriple.predicate.toString() == "http://data.stelselvanbasisregistraties.nl/bag/id/gegevenselement/Huisnummer-Nummeraanduiding"
						&& numTriple.subject.toString() == triple.subject.toString()){
						obj +=  "<tr><td>Huisnummer</td><td>"+retrieveValue(numTriple)+"</td></tr>";
					}
					if(numTriple.predicate.toString() == "http://data.stelselvanbasisregistraties.nl/bag/id/gegevenselement/Nummeraanduidingstatus-Nummeraanduiding"
						&& numTriple.subject.toString() == triple.subject.toString()){
						obj +=  "<tr><td>Status</td><td>"+retrieveValue(numTriple)+"</td></tr>";
					}
					if(numTriple.predicate.toString() == "http://data.stelselvanbasisregistraties.nl/bag/id/gegevenselement/Postcode-Nummeraanduiding"
						&& numTriple.subject.toString() == triple.subject.toString()){
						obj +=  "<tr><td>Postcode</td><td>"+retrieveValue(numTriple)+"</td></tr>";
					}
					
				});
				obj +=  "</table>";
				$("#report").append(obj);
			}
			
			if(triple.object.toString() == "http://data.stelselvanbasisregistraties.nl/bag/id/concept/Pand"){
				var obj =  "<h4>Gebouw</h4><table class=\"table table-striped kro-table\">";
				data.forEach(function(numTriple){
					if(numTriple.predicate.toString() == "http://data.stelselvanbasisregistraties.nl/bag/id/gegevenselement/Oorspronkelijke_bouwjaar_pand-Pand"
						&& numTriple.subject.toString() == triple.subject.toString()){
						obj +=  "<tr><td>Bouwjaar</td><td>"+retrieveValue(numTriple)+"</td></tr>";
					}
					if(numTriple.predicate.toString() == "http://data.stelselvanbasisregistraties.nl/bag/id/gegevenselement/Pandstatus-Pand"
						&& numTriple.subject.toString() == triple.subject.toString()){
						obj +=  "<tr><td>Status</td><td>"+retrieveValue(numTriple)+"</td></tr>";
					}
					if(numTriple.predicate.toString() == "http://purl.org/dc/elements/1.1/identifier"
						&& numTriple.subject.toString() == triple.subject.toString()){
						obj +=  "<tr><td>Identificatiecode</td><td>"+retrieveValue(numTriple)+"</td></tr>";
					}
					
				});
				obj +=  "</table>";
				$("#report").append(obj);
			}
			
			if(triple.object.toString() == "http://data.stelselvanbasisregistraties.nl/bag/id/concept/Verblijfsobject"){
				var obj =  "<h4>Verblijfsobject</h4><table class=\"table table-striped kro-table\">";
				data.forEach(function(numTriple){
					if(numTriple.predicate.toString() == "http://data.stelselvanbasisregistraties.nl/bag/id/gegevenselement/Oppervlakte_verblijfsobject-Verblijfsobject"
						&& numTriple.subject.toString() == triple.subject.toString()){
						obj +=  "<tr><td>Bouwjaar</td><td>"+retrieveValue(numTriple)+"</td></tr>";
					}
					if(numTriple.predicate.toString() == "http://data.stelselvanbasisregistraties.nl/bag/id/gegevenselement/Verblijfsobjectstatus-Verblijfsobject"
						&& numTriple.subject.toString() == triple.subject.toString()){
						obj +=  "<tr><td>Status</td><td>"+retrieveValue(numTriple)+"</td></tr>";
					}
					if(numTriple.predicate.toString() == "http://purl.org/dc/elements/1.1/identifier"
						&& numTriple.subject.toString() == triple.subject.toString()){
						obj +=  "<tr><td>Identificatiecode</td><td>"+retrieveValue(numTriple)+"</td></tr>";
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
					if(numTriple.predicate.toString() == "http://www.opengis.net/ont/geosparql#crs"
						&& numTriple.subject.toString() == triple.subject.toString()){
						obj +=  "<tr><td>CRS</td><td>"+retrieveValue(numTriple)+"</td></tr>";
					}					
				});
				obj +=  "</table>";
				$("#report").append(obj);
			}
			
			if(triple.object.toString() == "http://data.stelselvanbasisregistraties.nl/duo/id/concept/Basisschool"){
				var obj =  "<h4>Basisschool</h4><table class=\"table table-striped kro-table\">";
				data.forEach(function(numTriple){
					if(numTriple.predicate.toString() == "http://data.stelselvanbasisregistraties.nl/duo/id/gegevenselement/Basisonderwijs_brinnummer-Basisonderwijs"
						&& numTriple.subject.toString() == triple.subject.toString()){
						obj +=  "<tr><td>Brin nummer</td><td>"+retrieveValue(numTriple)+"</td></tr>";
					}
					if(numTriple.predicate.toString() == "http://data.stelselvanbasisregistraties.nl/duo/id/gegevenselement/Basisonderwijs_denominatie-Basisonderwijs"
						&& numTriple.subject.toString() == triple.subject.toString()){
						obj +=  "<tr><td>Denominatie</td><td>"+retrieveValue(numTriple)+"</td></tr>";
					}
					if(numTriple.predicate.toString() == "http://data.stelselvanbasisregistraties.nl/duo/id/gegevenselement/Basisonderwijs_huisnummer-Basisonderwijs"
						&& numTriple.subject.toString() == triple.subject.toString()){
						obj +=  "<tr><td>Huisnummer</td><td>"+retrieveValue(numTriple)+"</td></tr>";
					}
					if(numTriple.predicate.toString() == "http://data.stelselvanbasisregistraties.nl/duo/id/gegevenselement/Basisonderwijs_internetadres-Basisonderwijs"
						&& numTriple.subject.toString() == triple.subject.toString()){
						obj +=  "<tr><td>Internetadres</td><td>"+retrieveValue(numTriple)+"</td></tr>";
					}
					if(numTriple.predicate.toString() == "http://data.stelselvanbasisregistraties.nl/duo/id/gegevenselement/Basisonderwijs_plaatsnaam-Basisonderwijs"
						&& numTriple.subject.toString() == triple.subject.toString()){
						obj +=  "<tr><td>Plaatsnaam</td><td>"+retrieveValue(numTriple)+"</td></tr>";
					}
					if(numTriple.predicate.toString() == "http://data.stelselvanbasisregistraties.nl/duo/id/gegevenselement/Basisonderwijs_straatnaam-Basisonderwijs"
						&& numTriple.subject.toString() == triple.subject.toString()){
						obj +=  "<tr><td>Straatnaam</td><td>"+retrieveValue(numTriple)+"</td></tr>";
					}
					if(numTriple.predicate.toString() == "http://data.stelselvanbasisregistraties.nl/duo/id/gegevenselement/Basisonderwijs_telefoonnummer-Basisonderwijs"
						&& numTriple.subject.toString() == triple.subject.toString()){
						obj +=  "<tr><td>Telefoonnummer</td><td>"+retrieveValue(numTriple)+"</td></tr>";
					}
					if(numTriple.predicate.toString() == "http://data.stelselvanbasisregistraties.nl/duo/id/gegevenselement/Basisonderwijs_vestigingsnaam-Basisonderwijs"
						&& numTriple.subject.toString() == triple.subject.toString()){
						obj +=  "<tr><td>Vestigingsnaam</td><td>"+retrieveValue(numTriple)+"</td></tr>";
					}
					if(numTriple.predicate.toString() == "http://data.stelselvanbasisregistraties.nl/duo/id/gegevenselement/Basisonderwijs_vestigingsnummer-Basisonderwijs"
						&& numTriple.subject.toString() == triple.subject.toString()){
						obj +=  "<tr><td>Vestigingsnummer</td><td>"+retrieveValue(numTriple)+"</td></tr>";
					}
				});
				obj +=  "</table>";
				$("#report").append(obj);
			}
			
			if(triple.object.toString() == "http://data.stelselvanbasisregistraties.nl/lrkp/id/concept/Kinderopvang"){
				var obj =  "<h4>Landelijke registratie kinderopvang</h4><table class=\"table table-striped kro-table\">";
				data.forEach(function(numTriple){
					if(numTriple.predicate.toString() == "http://data.stelselvanbasisregistraties.nl/lrkp/id/gegevenselement/Kinderopvang_adres-Kinderopvang"
						&& numTriple.subject.toString() == triple.subject.toString()){
						obj +=  "<tr><td>Adres</td><td>"+retrieveValue(numTriple)+"</td></tr>";
					}
					if(numTriple.predicate.toString() == "http://data.stelselvanbasisregistraties.nl/lrkp/id/gegevenselement/Kinderopvang_emailadres-Kinderopvang"
						&& numTriple.subject.toString() == triple.subject.toString()){
						obj +=  "<tr><td>Emailadres</td><td>"+retrieveValue(numTriple)+"</td></tr>";
					}
					if(numTriple.predicate.toString() == "http://data.stelselvanbasisregistraties.nl/lrkp/id/gegevenselement/Kinderopvang_identificatie-Kinderopvang"
						&& numTriple.subject.toString() == triple.subject.toString()){
						obj +=  "<tr><td>Identificatie</td><td>"+retrieveValue(numTriple)+"</td></tr>";
					}
					if(numTriple.predicate.toString() == "http://data.stelselvanbasisregistraties.nl/lrkp/id/gegevenselement/Kinderopvang_kind_plaatsen-Kinderopvang"
						&& numTriple.subject.toString() == triple.subject.toString()){
						obj +=  "<tr><td>Aantal kind plaatsen</td><td>"+retrieveValue(numTriple)+"</td></tr>";
					}
					if(numTriple.predicate.toString() == "http://data.stelselvanbasisregistraties.nl/lrkp/id/gegevenselement/Kinderopvang_naam-Kinderopvang"
						&& numTriple.subject.toString() == triple.subject.toString()){
						obj +=  "<tr><td>Naam Kinderopvang</td><td>"+retrieveValue(numTriple)+"</td></tr>";
					}
					if(numTriple.predicate.toString() == "http://data.stelselvanbasisregistraties.nl/lrkp/id/gegevenselement/Kinderopvang_naam_houder-Kinderopvang"
						&& numTriple.subject.toString() == triple.subject.toString()){
						obj +=  "<tr><td>Houder</td><td>"+retrieveValue(numTriple)+"</td></tr>";
					}
					if(numTriple.predicate.toString() == "http://data.stelselvanbasisregistraties.nl/lrkp/id/gegevenselement/Kinderopvang_postcode-Kinderopvang"
						&& numTriple.subject.toString() == triple.subject.toString()){
						obj +=  "<tr><td>Postcode</td><td>"+retrieveValue(numTriple)+"</td></tr>";
					}
					if(numTriple.predicate.toString() == "http://data.stelselvanbasisregistraties.nl/lrkp/id/gegevenselement/Kinderopvang_telefoon-Kinderopvang"
						&& numTriple.subject.toString() == triple.subject.toString()){
						obj +=  "<tr><td>Telefoon</td><td>"+retrieveValue(numTriple)+"</td></tr>";
					}
					if(numTriple.predicate.toString() == "http://data.stelselvanbasisregistraties.nl/lrkp/id/gegevenselement/Kinderopvang_type-Kinderopvang"
						&& numTriple.subject.toString() == triple.subject.toString()){
						obj +=  "<tr><td>Type kinderopvang</td><td>"+retrieveValue(numTriple)+"</td></tr>";
					}
					if(numTriple.predicate.toString() == "http://data.stelselvanbasisregistraties.nl/lrkp/id/gegevenselement/Kinderopvang_website-Kinderopvang"
						&& numTriple.subject.toString() == triple.subject.toString()){
						obj +=  "<tr><td>Website</td><td>"+retrieveValue(numTriple)+"</td></tr>";
					}
					if(numTriple.predicate.toString() == "http://data.stelselvanbasisregistraties.nl/lrkp/id/gegevenselement/Kinderopvang_woonplaats-Kinderopvang"
						&& numTriple.subject.toString() == triple.subject.toString()){
						obj +=  "<tr><td>Woonplaats</td><td>"+retrieveValue(numTriple)+"</td></tr>";
					}
				});
				obj +=  "</table>";
				$("#report").append(obj);
			}
			
			
			if(triple.object.toString() == "http://data.stelselvanbasisregistraties.nl/bag/id/concept/Rijksmonument"){
				var obj =  "<h4>Rijksmonument</h4><table class=\"table table-striped kro-table\">";
				data.forEach(function(numTriple){
					if(numTriple.predicate.toString() == "http://data.stelselvanbasisregistraties.nl/bag/id/gegevenselement/Rijksmonument_beginbouwjaar-Rijksmonument"
							&& numTriple.subject.toString() == triple.subject.toString()){
						obj +=  "<tr><td>Beginbouwjaar</td><td>"+retrieveValue(numTriple)+"</td></tr>";
					}
					if(numTriple.predicate.toString() == "http://data.stelselvanbasisregistraties.nl/bag/id/gegevenselement/Rijksmonument_cbs-Rijksmonument"
							&& numTriple.subject.toString() == triple.subject.toString()){
						obj +=  "<tr><td>CBS categorie</td><td>"+retrieveValue(numTriple)+"</td></tr>";
					}
					if(numTriple.predicate.toString() == "http://data.stelselvanbasisregistraties.nl/bag/id/gegevenselement/Rijksmonument_cultuurhistorisch_type-Rijksmonument"
						&& numTriple.subject.toString() == triple.subject.toString()){
						obj +=  "<tr><td>Cultuurhistorisch type</td><td>"+retrieveValue(numTriple)+"</td></tr>";
					}
					if(numTriple.predicate.toString() == "http://data.stelselvanbasisregistraties.nl/bag/id/gegevenselement/Rijksmonument_eindbouwjaar-Rijksmonument"
						&& numTriple.subject.toString() == triple.subject.toString()){
						obj +=  "<tr><td>Eindbouwjaar</td><td>"+retrieveValue(numTriple)+"</td></tr>";
					}
					if(numTriple.predicate.toString() == "http://data.stelselvanbasisregistraties.nl/bag/id/gegevenselement/Rijksmonument_hoofdcategorie-Rijksmonument"
						&& numTriple.subject.toString() == triple.subject.toString()){
						obj +=  "<tr><td>Hoofdcategorie</td><td>"+retrieveValue(numTriple)+"</td></tr>";
					}
					if(numTriple.predicate.toString() == "http://data.stelselvanbasisregistraties.nl/bag/id/gegevenselement/Rijksmonument_oorspronkelijke_functie-Rijksmonument"
						&& numTriple.subject.toString() == triple.subject.toString()){
						obj +=  "<tr><td>Oorspronkelijke functie</td><td>"+retrieveValue(numTriple)+"</td></tr>";
					}
					if(numTriple.predicate.toString() == "http://data.stelselvanbasisregistraties.nl/bag/id/gegevenselement/Rijksmonument_subcategorie-Rijksmonument"
						&& numTriple.subject.toString() == triple.subject.toString()){
						obj +=  "<tr><td>Subcategorie</td><td>"+retrieveValue(numTriple)+"</td></tr>";
					}
					if(numTriple.predicate.toString() == "http://data.stelselvanbasisregistraties.nl/bag/id/gegevenselement/Rijksmonument_url-Rijksmonument"
						&& numTriple.subject.toString() == triple.subject.toString()){
						obj +=  "<tr><td>Monument document</td><td><a href=\""+retrieveValue(numTriple)+"\">"+retrieveValue(numTriple)+"</a></td></tr>";
					}
					if(numTriple.predicate.toString() == "http://data.stelselvanbasisregistraties.nl/bag/id/gegevenselement/Rijksmonumentnummer-Rijksmonument"
						&& numTriple.subject.toString() == triple.subject.toString()){
						obj +=  "<tr><td>Rijksmonumentnummer</td><td>"+retrieveValue(numTriple)+"</td></tr>";
					}
					if(numTriple.predicate.toString() == "http://data.stelselvanbasisregistraties.nl/bag/id/gegevenselement/Rijksmonumentstatus-Rijksmonument"
						&& numTriple.subject.toString() == triple.subject.toString()){
						obj +=  "<tr><td>Rijksmonument status</td><td>"+retrieveValue(numTriple)+"</td></tr>";
					}
					if(numTriple.predicate.toString() == "http://data.stelselvanbasisregistraties.nl/bag/id/gegevenselement/Rijksmonumenttype-Rijksmonument"
						&& numTriple.subject.toString() == triple.subject.toString()){
						obj +=  "<tr><td>Monument type</td><td>"+retrieveValue(numTriple)+"</td></tr>";
					}
				});
				obj +=  "</table>";
				$("#report").append(obj);
			}
			
			
			if(triple.object.toString() == "http://data.stelselvanbasisregistraties.nl/cbs/id/concept/Buurt"){
				console.log("TEST CBS");
				var obj =  "<h4>CBS Karakteristieken</h4><table class=\"table table-striped kro-table\">";
				data.forEach(function(numTriple){
					if(numTriple.predicate.toString() == "http://data.stelselvanbasisregistraties.nl/cbs/id/gegevenselement/CBS_Afstand_attractie-CBS"
							&& numTriple.subject.toString() == triple.subject.toString()){
						obj +=  "<tr><td>Afstand to attractie (in km's)</td><td>"+retrieveValue(numTriple)+"</td></tr>";
					}
					if(numTriple.predicate.toString() == "http://data.stelselvanbasisregistraties.nl/cbs/id/gegevenselement/CBS_Afstand_bioscoop-CBS"
							&& numTriple.subject.toString() == triple.subject.toString()){
						obj +=  "<tr><td>Afstand tot bioscoop (in km's)</td><td>"+retrieveValue(numTriple)+"</td></tr>";
					}
					if(numTriple.predicate.toString() == "http://data.stelselvanbasisregistraties.nl/cbs/id/gegevenselement/CBS_Afstand_brandweerkazerne-CBS"
						&& numTriple.subject.toString() == triple.subject.toString()){
						obj +=  "<tr><td>Afstand tot brandweerkazerne (in km's)</td><td>"+retrieveValue(numTriple)+"</td></tr>";
					}
					if(numTriple.predicate.toString() == "http://data.stelselvanbasisregistraties.nl/cbs/id/gegevenselement/CBS_Afstand_cafe-CBS"
						&& numTriple.subject.toString() == triple.subject.toString()){
						obj +=  "<tr><td>Afstand tot café (in km's)</td><td>"+retrieveValue(numTriple)+"</td></tr>";
					}
					if(numTriple.predicate.toString() == "http://data.stelselvanbasisregistraties.nl/cbs/id/gegevenselement/CBS_Afstand_cafetaria-CBS"
						&& numTriple.subject.toString() == triple.subject.toString()){
						obj +=  "<tr><td>Afstand tot cafetaria (in km's)</td><td>"+retrieveValue(numTriple)+"</td></tr>";
					}
					if(numTriple.predicate.toString() == "http://data.stelselvanbasisregistraties.nl/cbs/id/gegevenselement/CBS_Afstand_hotel-CBS"
						&& numTriple.subject.toString() == triple.subject.toString()){
						obj +=  "<tr><td>Aftand tot hotel (in km's)</td><td>"+retrieveValue(numTriple)+"</td></tr>";
					}
					if(numTriple.predicate.toString() == "http://data.stelselvanbasisregistraties.nl/cbs/id/gegevenselement/CBS_Afstand_kunstijsbaan-CBS"
						&& numTriple.subject.toString() == triple.subject.toString()){
						obj +=  "<tr><td>Afstand tot kunstijsbaan (in km's)</td><td>"+retrieveValue(numTriple)+"</td></tr>";
					}
					if(numTriple.predicate.toString() == "http://data.stelselvanbasisregistraties.nl/cbs/id/gegevenselement/CBS_Afstand_restaurant-CBS"
						&& numTriple.subject.toString() == triple.subject.toString()){
						obj +=  "<tr><td>Afstand tot restaurant (in km's)</td><td>"+retrieveValue(numTriple)+"</td></tr>";
					}
					if(numTriple.predicate.toString() == "http://data.stelselvanbasisregistraties.nl/cbs/id/gegevenselement/CBS_Afstand_sauna-CBS"
						&& numTriple.subject.toString() == triple.subject.toString()){
						obj +=  "<tr><td>Afstand tot sauna (in km's)</td><td>"+retrieveValue(numTriple)+"</td></tr>";
					}
					if(numTriple.predicate.toString() == "http://data.stelselvanbasisregistraties.nl/cbs/id/gegevenselement/CBS_Afstand_supermarkt-CBS"
						&& numTriple.subject.toString() == triple.subject.toString()){
						obj +=  "<tr><td>Afstand tot supermarkt (in km's)</td><td>"+retrieveValue(numTriple)+"</td></tr>";
					}
					if(numTriple.predicate.toString() == "http://data.stelselvanbasisregistraties.nl/cbs/id/gegevenselement/CBS_Afstand_treinstation-CBS"
						&& numTriple.subject.toString() == triple.subject.toString()){
						obj +=  "<tr><td>Afstand tot treinstation (in km's)</td><td>"+retrieveValue(numTriple)+"</td></tr>";
					}
					if(numTriple.predicate.toString() == "http://data.stelselvanbasisregistraties.nl/cbs/id/gegevenselement/CBS_Afstand_warenhuis-CBS"
						&& numTriple.subject.toString() == triple.subject.toString()){
						obj +=  "<tr><td>Afstand tot warenhuis (in km's)</td><td>"+retrieveValue(numTriple)+"</td></tr>";
					}
					if(numTriple.predicate.toString() == "http://data.stelselvanbasisregistraties.nl/cbs/id/gegevenselement/CBS_Afstand_ziekenhuis-CBS"
						&& numTriple.subject.toString() == triple.subject.toString()){
						obj +=  "<tr><td>Afstand tot ziekenhuis (in km's)</td><td>"+retrieveValue(numTriple)+"</td></tr>";
					}
					if(numTriple.predicate.toString() == "http://data.stelselvanbasisregistraties.nl/cbs/id/gegevenselement/CBS_Afstand_zonnebank-CBS"
						&& numTriple.subject.toString() == triple.subject.toString()){
						obj +=  "<tr><td>Afstand tot zonnebank (in km's)</td><td>"+retrieveValue(numTriple)+"</td></tr>";
					}
					if(numTriple.predicate.toString() == "http://data.stelselvanbasisregistraties.nl/cbs/id/gegevenselement/CBS_Afstand_zwembad-CBS"
						&& numTriple.subject.toString() == triple.subject.toString()){
						obj +=  "<tr><td>Afstand tot zwembad (in km's)</td><td>"+retrieveValue(numTriple)+"</td></tr>";
					}
					if(numTriple.predicate.toString() == "http://data.stelselvanbasisregistraties.nl/cbs/id/gegevenselement/CBS_Geboorte_totaal-CBS"
						&& numTriple.subject.toString() == triple.subject.toString()){
						obj +=  "<tr><td>Geboorte aantal totaal</td><td>"+retrieveValue(numTriple)+"</td></tr>";
					}
					if(numTriple.predicate.toString() == "http://data.stelselvanbasisregistraties.nl/cbs/id/gegevenselement/CBS_Gehuwd-CBS"
						&& numTriple.subject.toString() == triple.subject.toString()){
						obj +=  "<tr><td>Aantal gehuwd</td><td>"+retrieveValue(numTriple)+"</td></tr>";
					}
					if(numTriple.predicate.toString() == "http://data.stelselvanbasisregistraties.nl/cbs/id/gegevenselement/CBS_Gescheiden-CBS"
						&& numTriple.subject.toString() == triple.subject.toString()){
						obj +=  "<tr><td>Aantal gescheiden</td><td>"+retrieveValue(numTriple)+"</td></tr>";
					}
					if(numTriple.predicate.toString() == "http://data.stelselvanbasisregistraties.nl/cbs/id/gegevenselement/CBS_Ongehuwd-CBS"
						&& numTriple.subject.toString() == triple.subject.toString()){
						obj +=  "<tr><td>Aantal ongehuwd</td><td>"+retrieveValue(numTriple)+"</td></tr>";
					}
					if(numTriple.predicate.toString() == "http://data.stelselvanbasisregistraties.nl/cbs/id/gegevenselement/CBS_Geweld-CBS"
						&& numTriple.subject.toString() == triple.subject.toString()){
						obj +=  "<tr><td>Geweld incidenten</td><td>"+retrieveValue(numTriple)+"</td></tr>";
					}
					if(numTriple.predicate.toString() == "http://data.stelselvanbasisregistraties.nl/cbs/id/gegevenselement/CBS_diefstal-CBS"
						&& numTriple.subject.toString() == triple.subject.toString()){
						obj +=  "<tr><td>Aantal diefstal incidenten</td><td>"+retrieveValue(numTriple)+"</td></tr>";
					}
					if(numTriple.predicate.toString() == "http://data.stelselvanbasisregistraties.nl/cbs/id/gegevenselement/CBS_vernieling-CBS"
						&& numTriple.subject.toString() == triple.subject.toString()){
						obj +=  "<tr><td>Aantal vernielingsincidenten</td><td>"+retrieveValue(numTriple)+"</td></tr>";
					}
					if(numTriple.predicate.toString() == "http://data.stelselvanbasisregistraties.nl/cbs/id/gegevenselement/CBS_Niet_Westerse_immigrant-CBS"
						&& numTriple.subject.toString() == triple.subject.toString()){
						obj +=  "<tr><td>Niet westerse immigranten</td><td>"+retrieveValue(numTriple)+"</td></tr>";
					}
					if(numTriple.predicate.toString() == "http://data.stelselvanbasisregistraties.nl/cbs/id/gegevenselement/CBS_Westerse_immigrant-CBS"
						&& numTriple.subject.toString() == triple.subject.toString()){
						obj +=  "<tr><td>Westerse immigranten</td><td>"+retrieveValue(numTriple)+"</td></tr>";
					}
					if(numTriple.predicate.toString() == "http://data.stelselvanbasisregistraties.nl/cbs/id/gegevenselement/CBS_Sterfte_totaal-CBS"
						&& numTriple.subject.toString() == triple.subject.toString()){
						obj +=  "<tr><td>Sterfte totaal</td><td>"+retrieveValue(numTriple)+"</td></tr>";
					}
					if(numTriple.predicate.toString() == "http://data.stelselvanbasisregistraties.nl/cbs/id/gegevenselement/CBS_Woningvoorraad-CBS"
						&& numTriple.subject.toString() == triple.subject.toString()){
						obj +=  "<tr><td>Woningvoorraad</td><td>"+retrieveValue(numTriple)+"</td></tr>";
					}
					if(numTriple.predicate.toString() == "http://data.stelselvanbasisregistraties.nl/cbs/id/gegevenselement/CBS_bewoonde_woningen-CBS"
						&& numTriple.subject.toString() == triple.subject.toString()){
						obj +=  "<tr><td>Bewoonde woningen</td><td>"+retrieveValue(numTriple)+"</td></tr>";
					}
					if(numTriple.predicate.toString() == "http://data.stelselvanbasisregistraties.nl/cbs/id/gegevenselement/CBS_leegstaande_woningen-CBS"
						&& numTriple.subject.toString() == triple.subject.toString()){
						obj +=  "<tr><td>Aantal leegstaande woningen</td><td>"+retrieveValue(numTriple)+"</td></tr>";
					}
					if(numTriple.predicate.toString() == "http://data.stelselvanbasisregistraties.nl/cbs/id/gegevenselement/CBS_aantal_huishouden-CBS"
						&& numTriple.subject.toString() == triple.subject.toString()){
						obj +=  "<tr><td>Aantal huishoudens</td><td>"+retrieveValue(numTriple)+"</td></tr>";
					}
					if(numTriple.predicate.toString() == "http://data.stelselvanbasisregistraties.nl/cbs/id/gegevenselement/CBS_aantal_inwoners-CBS"
						&& numTriple.subject.toString() == triple.subject.toString()){
						obj +=  "<tr><td>Aantal inwoners</td><td>"+retrieveValue(numTriple)+"</td></tr>";
					}
					if(numTriple.predicate.toString() == "http://data.stelselvanbasisregistraties.nl/cbs/id/gegevenselement/CBS_aantal_mannen-CBS"
						&& numTriple.subject.toString() == triple.subject.toString()){
						obj +=  "<tr><td>Aantal mannen</td><td>"+retrieveValue(numTriple)+"</td></tr>";
					}
					if(numTriple.predicate.toString() == "http://data.stelselvanbasisregistraties.nl/cbs/id/gegevenselement/CBS_aantal_vrouwen-CBS"
						&& numTriple.subject.toString() == triple.subject.toString()){
						obj +=  "<tr><td>Aantal vrouwen</td><td>"+retrieveValue(numTriple)+"</td></tr>";
					}
					if(numTriple.predicate.toString() == "http://data.stelselvanbasisregistraties.nl/cbs/id/gegevenselement/CBS_adressen_dichtheid-CBS"
						&& numTriple.subject.toString() == triple.subject.toString()){
						obj +=  "<tr><td>Adressen dichtheid</td><td>"+retrieveValue(numTriple)+"</td></tr>";
					}
					if(numTriple.predicate.toString() == "http://data.stelselvanbasisregistraties.nl/cbs/id/gegevenselement/CBS_buurt_code-CBS"
						&& numTriple.subject.toString() == triple.subject.toString()){
						obj +=  "<tr><td>Buurtcode</td><td>"+retrieveValue(numTriple)+"</td></tr>";
					}
					if(numTriple.predicate.toString() == "http://data.stelselvanbasisregistraties.nl/cbs/id/gegevenselement/CBS_buurt_naam-CBS"
						&& numTriple.subject.toString() == triple.subject.toString()){
						obj +=  "<tr><td>Buurtnaam</td><td>"+retrieveValue(numTriple)+"</td></tr>";
					}
					if(numTriple.predicate.toString() == "http://data.stelselvanbasisregistraties.nl/cbs/id/gegevenselement/CBS_gemeente_naam-CBS"
						&& numTriple.subject.toString() == triple.subject.toString()){
						obj +=  "<tr><td>Gemeentenaam</td><td>"+retrieveValue(numTriple)+"</td></tr>";
					}
					if(numTriple.predicate.toString() == "http://data.stelselvanbasisregistraties.nl/cbs/id/gegevenselement/CBS_gemiddelde_woningwaarde-CBS"
						&& numTriple.subject.toString() == triple.subject.toString()){
						obj +=  "<tr><td>Gemiddelde woningwaarde</td><td>"+retrieveValue(numTriple)+"</td></tr>";
					}
					if(numTriple.predicate.toString() == "http://data.stelselvanbasisregistraties.nl/cbs/id/gegevenselement/CBS_personen_tot_15-CBS"
						&& numTriple.subject.toString() == triple.subject.toString()){
						obj +=  "<tr><td>Personen tot 15 jaar</td><td>"+retrieveValue(numTriple)+"</td></tr>";
					}
					if(numTriple.predicate.toString() == "http://data.stelselvanbasisregistraties.nl/cbs/id/gegevenselement/CBS_personen_van_15_tot_25-CBS"
						&& numTriple.subject.toString() == triple.subject.toString()){
						obj +=  "<tr><td>Personen van 15 jaar tot 25 jaar</td><td>"+retrieveValue(numTriple)+"</td></tr>";
					}
					if(numTriple.predicate.toString() == "http://data.stelselvanbasisregistraties.nl/cbs/id/gegevenselement/CBS_personen_van_25_tot_45-CBS"
						&& numTriple.subject.toString() == triple.subject.toString()){
						obj +=  "<tr><td>Personen van 25 jaar tot 45 jaar</td><td>"+retrieveValue(numTriple)+"</td></tr>";
					}
					if(numTriple.predicate.toString() == "http://data.stelselvanbasisregistraties.nl/cbs/id/gegevenselement/CBS_personen_van_45_tot_65-CBS"
						&& numTriple.subject.toString() == triple.subject.toString()){
						obj +=  "<tr><td>Personen van 45 jaar tot 65 jaar</td><td>"+retrieveValue(numTriple)+"</td></tr>";
					}
					if(numTriple.predicate.toString() == "http://data.stelselvanbasisregistraties.nl/cbs/id/gegevenselement/CBS_personen_65_ouder-CBS"
						&& numTriple.subject.toString() == triple.subject.toString()){
						obj +=  "<tr><td>Personen ouder dan 65 jaar</td><td>"+retrieveValue(numTriple)+"</td></tr>";
					}
					if(numTriple.predicate.toString() == "http://data.stelselvanbasisregistraties.nl/cbs/id/gegevenselement/CBS_stedelijkheid-CBS"
						&& numTriple.subject.toString() == triple.subject.toString()){
						obj +=  "<tr><td>Stedelijkheid</td><td>"+retrieveValue(numTriple)+"</td></tr>";
					}
				});
				obj += "</table>";
				$("#report").append(obj);
			}
		});

		
		$('#propertyObject').modal();	
	});
}

$("input[name=questionType]:radio").change(function () {
	selected_value = $("input[name='questionType']:checked").val();
	modus = selected_value;
});

function retrieveValue(triple){
	if(isFloat(parseFloat(triple.object.toString())))
		return parseFloat(triple.object.toString()).toFixed(2);
	else
	 return triple.object.toString();      
}

function isFloat(n){
	return n != "" && !isNaN(n) && Math.round(n) != n;
}

//react to size changes
$(document).ready(function () {
	$(document).on( "sizeChanged", function() {
		map.updateSize();
	});

	$(document).on( "sidebarChanged", function() {
		map.updateSize();
	});
});