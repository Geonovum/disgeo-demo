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
							Disgeo Project
							<!-- <a data-toggle="modal" href="#" data-target="#about"><i
								class="fa fa-exclamation-circle"></i></a>  -->
						</h2>
					</div>
				</header>

				<div id="textPage" class="card">
					<h2>Doel Disgeo:</h2>
					<p>Gebruikers denken meestal niet in datasets, maar in data die
						op allerlei manieren verbanden met elkaar heeft en te combineren
						is. In het NEN3610 stelsel en het stelsel van basisregistraties is
						tot nu toe wél gedacht in datasets. Informatiemodellen zijn in
						zekere zin silo’s die alleen de semantiek van een bepaalde sector
						standaardiseren, maar niet in samenhang met de informatie van
						andere sectoren zijn gemodelleerd. Deze samenhang is er in
						werkelijkheid echter wel. Linked data is een uitermate geschikte
						techniek om deze semantische samenhang vast te leggen zodat de
						data zelf ook geïntegreerd kan worden.</p>
						
					<br />
					<h3>Demonstrator</h3>
					<p>In deze demonstrator zijn de onderstaande 4 user stories uitgewerkt. De user stories zijn onderverdeeld onder de categorieën: administratieve relaties en geografsche relaties.
					 Administratieve relaties zijn directe relaties tussen objecten. Geografische relaties worden gevormd tussen objecten die binnen een straal van 500 meter bij elkaar in de buurt liggen.</p>
					Tijdens de demonstrator is getracht zoveel mogelijk data te gebruiken aansluitend op de user stories. Echter is niet alle data als open data beschikbaar en is dit niet altijd mogelijk geweest. 
					Door middel van de knop <img src="images/relaties.png" style="width:250px;height:50px;"/> kan tussen de relaties gewisseld worden. Hierdoor zullen de resultaten veranderen die de demonstrator terug geeft.
					
					<br />
					<h3>User Stories</h3>
					<table>
						<tr>
							<td><a href="gebouwen.jsp">Categorie 1: administratieve relatie</a></td>
							<td>Als energieadviseur Wil ik gegevens over o.m. de
								oppervlakte, leeftijd/bouwjaar, gebruiksfuncties,
								monumentstatus, waarde/staat van onderhoud van een gebouw, Zodat
								ik een goed advies kan gegeven over de verduurzaming van dit
								gebouw.</td>
							<td>Als planner van zwaar transport Wil ik gegevens over
								o.m. de voertuigtype, rijrichting, doorrijhoogte, breedte,
								maximale belasting, snelheid en wet- en regelgeving van dit
								stukje weg weten, Zodat ik weet of ik met dit voertuig langs dit
								stukje weg mijn route kan plannen.</td>
						</tr>
						<tr>
							<td><a href="wegen.jsp">Categorie 2: ruimtelijke relatie</a></td>
							<td>Als potentiele koper van een woning wil ik gegevens over
								o.m. geluidsbelasting, openbaar groen, parkeerplekken, winkels,
								risico-objecten, scholen, coffeeshops, zodat ik weet of de
								omgeving van deze woning bij mij past.</td>
							<td>Als hulpdienst wil ik gegevens over o.m.
								(oppervlakte)water, scholen/kinderopvanglocaties, vitale
								infrastructuur in de omgeving van een incident op de openbare
								weg met een gevaarlijke stof, zodat ik weet welke organisaties
								ik moet waarschuwen.</td>
						</tr>
					</table>
					
					<br />
					<h3>Feedback</h3>
					<p>Feedback op de demonstrator is welkom en kan achtergelaten worden op het <a href="https://geoforum.nl/">GeoForum</a>. 
					De documentatie en sourcecode van de demonstrator zijn te vinden op de <a href="https://github.com/Geonovum/disgeo-demo">Github</a>.</p> 
				</div>
				<c:import url='/jsp-snippets/pagefoot.jsp' />
			</div>
		</div>
	</div>
	<c:import url="/jsp-snippets/footer.jsp" />
</body>
</html>
