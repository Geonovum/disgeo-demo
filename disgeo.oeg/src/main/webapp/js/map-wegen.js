var store = new InMemoryStore();

var centerCoordinate = [544298.523790, 6866954.524398];
var centerZoom = 15;
var language = 'nl';
var modus = "relation";

var wmsNwbSource = new ol.source.TileWMS({
	url: 'https://geodata.nationaalgeoregister.nl/nwbwegen/wms',
	title: "NWB Kaart",
	params: {'LAYERS': 'wegvakken', 'TILED': true, 'VERSION': '1.3.0',
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
			source: new ol.source.XYZ({
				url: 'https://geodata.nationaalgeoregister.nl/tiles/service/wmts/brtachtergrondkaart/EPSG:3857/{z}/{x}/{y}.png',
				attributions: [
					new ol.Attribution({
						html: 'Kaartgegevens &copy; <a href="https://www.kadaster.nl">Kadaster</a>'
					})
					]
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
		$('#resultHead').empty();
		$('#resultBody').empty();

		row = $('<tr>').appendTo("#resultHead");
		$('<th>').html('Property').appendTo(row);
		$('<th>').html('Value').appendTo(row);
		var baseSubject = "";

		data.forEach(function(triple){
			if(baseSubject == ""){
				baseSubject = triple.subject.toString();
				row = $('<tr>').appendTo("#resultBody");
				var subjectCell = $('<td>').attr('colspan', 2).appendTo(row);
				$('<a>').html(triple.subject.toString())
				.attr('name',"#"+triple.subject.toString().split("#")[1])
				.css({ 'font-weight': 'bold' })
				.attr('class', 'derefUri')
				.attr('href',encodeURIComponent(triple.subject.toString()))
				.appendTo(subjectCell);					
			}
			if(baseSubject != triple.subject.toString()){
				baseSubject = triple.subject.toString();
				row = $('<tr>').appendTo("#resultBody");
				var subjectCell = $('<td>').attr('colspan', 2).appendTo(row);
				$('<a>').html(triple.subject.toString())
				.attr('name',triple.subject.toString().split("#")[1])
				.css({ 'font-weight': 'bold' })
				.attr('href',encodeURIComponent(triple.subject.toString()))
				.appendTo(subjectCell);	
			}

			row = $('<tr>').appendTo("#resultBody")
			var predQname = rdf.prefixes.shrink(triple.predicate.toString());
			var predCell = $('<td>').appendTo(row);
			$('<a>').html(predQname)
			.attr('href',triple.predicate.toString())
			.appendTo(predCell);

			var objCell = $('<td>').appendTo(row);
			switch(triple.object.interfaceName)
			{
			case "NamedNode":
				if(triple.object.toString().split("#")[1]) {
					$('<a>').html(triple.object.toString())
					.attr('target','_blank')
					.attr('href',triple.object.toString())
					.appendTo(objCell);
				} else {
					$('<a>').html(triple.object.toString())
					.attr('target','_blank')
					.attr('href',triple.object.toString())
					.appendTo(objCell);
				}
				break;
			default:
				objCell.html(triple.object.toString());                
			}
		});
		$('#propertyObject').modal();	
	});
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