<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<html lang='en'>
<head>

<c:import url="/jsp-snippets/header.jsp" />
<title>Disgeo Viewer</title>
<link rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/openlayers/4.6.5/ol.css"
	type="text/css">
<link rel="stylesheet" href='css/ol3-layerswitcher.css' type='text/css'>
<link href='css/disgeo.css' rel='stylesheet' type='text/css' />
<link href='css/ol-geocoder.min.css' rel='stylesheet' type='text/css' />

</head>
<body>
	<div class="page">
		<c:import url='/jsp-snippets/pagehead.jsp' />
		<div class="page-content d-flex align-items-stretch">
			<c:import url="/jsp-snippets/navigation.jsp" />

			<div class="content-inner">
				<header class="page-header">
					<div class="container-fluid">
						<div class='content-fs'></div>
						<h2 class="no-margin-bottom"
							style="width: 500px; margin-top: 10px;">
							Deliverables
							<!-- <a data-toggle="modal" href="#" data-target="#about"><i
								class="fa fa-exclamation-circle"></i></a>  -->
						</h2>
					</div>
				</header>

				<div id="textPage" class="card">
					<h2>Het project bevat hoofdzakelijk de deliverables:</h2>
					<ul>
						<li>Lessons learned</li>
						<li>Demonstrator</li>
					</ul>
					
					<h4>Lessons learned</h4>
					<p>Gedurende het project zijn een aantal zaken naar voren gekomen. Dit betreft zowel technische- als conceptuele complexiteiten. Deze zaken zijn vastgelegd als lessons learned. Dit document is te vinden via: <a href="https://geonovum.github.io/disgeo-demo/">Lessons learned</a></p>
				
					<h4>Demonstrator</h4>
					<p>De demonstrator maakt gebruik van de <a href="https://www.logius.nl/diensten/stelselcatalogus">stelselcatalogus</a> basis registraties. Hierin staan de relaties beschreven tussen de verschillende objecten binnen de basisregistraties. De demonstrator vindt op basis van skos:related gerelateerde objecten. Datasets die niet beschreven worden in de stelselcatalogus, worden toegevoegd aan een zogenaamde extensie. Deze extensie bevat de data die niet in de stelselcatalogus zit, maar volgt wel dezelfde structuur.</p>
					<p>Welke objecten uit de stelselcatalogus door welke API geleverd worden, is beschreven in een configuratie bestand. In de configuratie is daarnaast beschreven hoe dat de resultaten van een API omgezet moeten worden naar JSON-LD, dit een semantisch rijk formaat. Hiervoor wordt <a href="https://github.com/carml/carml">CARML</a> gebruikt, ontwikkeld mede door het kadaster.</p>
					<p>In de demonstrator zijn webservices voor gebouwen (Verblijfsobjecten) en wegen toegevoegd. Als ingang in het proces wordt de URI voor het type meegegeven zoals deze in de stelselcatalogus staat. Hierop worden de relaties gevolgd naar andere objecten en op basis van de configuratie kan zo van API naar API gezocht worden.</p>
					<p>Geografisch zoeken gaat op een net iets andere maar vergelijkbare manier. Bij geografisch zoeken, wordt op de geselecteerde locatie of object een circkel gemaakt met een straal van 500 meter. Op basis van geografische relaties in de extensie op de stelselcatalogus wordt bepaald welke objecten geografisch gerelateerd mogen worden. Dit wordt op basis van geof:relate gedaan, een Geo-SPARQL property. Dit voorkomt dat alle objecten binnen deze straal gezocht worden. Uiteindelijk zou dit de demonstrator onbruikbaar maken. De gevonden objecten worden wederom omgezet naar linked data en gekoppeld aan het begin object met een geof:nearby relatie.</p>
				</div>
				<c:import url='/jsp-snippets/pagefoot.jsp' />
			</div>
		</div>
	</div>
	<c:import url="/jsp-snippets/footer.jsp" />
</body>
</html>
