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
							Bronnen
							<!-- <a data-toggle="modal" href="#" data-target="#about"><i
								class="fa fa-exclamation-circle"></i></a>  -->
						</h2>
					</div>
				</header>

				<div id="textPage" class="card">
					<h2>Gebruikte bronnen:</h2>
					<img src="images/bronnen.png" alt="Bronnen" width="1340px">
				</div>
				<c:import url='/jsp-snippets/pagefoot.jsp' />
			</div>
		</div>
	</div>
	<c:import url="/jsp-snippets/footer.jsp" />
</body>
</html>
