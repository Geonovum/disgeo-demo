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
						<h2 class="no-margin-bottom" style="width: 500px; float:left; margin-top:10px;">
							User stories: Gebouwen
							<!-- <a data-toggle="modal" href="#" data-target="#about"><i
								class="fa fa-exclamation-circle"></i></a>  -->
						</h2>
						<div id="toggleButtons" class="btn-group btn-group-toggle" data-toggle="buttons">
							<label class="btn btn-secondary active"> <input
								type="radio" name="questionType" id="relation" value="relation" checked>
								Relationeel
							</label> <label class="btn btn-secondary"> <input type="radio"
								name="questionType" id="geometric" value="geometric"> Geografisch
							</label>
						</div>
					</div>
				</header>

				<div class="card" id="map"></div>
				<c:import url='/jsp-snippets/pagefoot.jsp' />
			</div>

			<div id="popup" class="ol-popup">
				<a href="#" id="popup-closer" class="ol-popup-closer"></a>
				<div id="popup-content"></div>
			</div>

			<div id='propertyObject' class="modal" tabindex="-1" role="dialog">
				<div class="modal-dialog modal-lg" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title">Data</h5>
							<button type="button" class="close" data-dismiss="modal"
								aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div class="modal-body">
							<table id="dataTable" class="table table-striped kro-table">
								<tr>
								<thead id="resultHead">
									<!-- Generated and autofilled from resultTable.js and servlet -->
								</thead>
								</tr>
								<tbody id="resultBody">
									<!-- Generated and autofilled from resultTable.js and servlet -->
								</tbody>
							</table>
						</div>
						<div class="modal-footer">

							<button type="button" class="btn btn-secondary"
								data-dismiss="modal">Close</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Proj4 for tranforming Dutch coordinates to international coordinates -->
	<script src="js/rdf-ext.js"></script>
	<script
		src="https://cdnjs.cloudflare.com/ajax/libs/proj4js/2.3.6/proj4.js"></script>
	<!-- Openlayers and JavaScript -->
	<script
		src="https://cdnjs.cloudflare.com/ajax/libs/openlayers/4.6.5/ol.js"></script>
	<script src="js/ol-geocoder.js"></script>
	<script src="js/map-gebouwen.js"></script>
	<c:import url="/jsp-snippets/footer.jsp" />
</body>
</html>
