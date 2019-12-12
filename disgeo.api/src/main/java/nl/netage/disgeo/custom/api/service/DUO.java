package nl.netage.disgeo.custom.api.service;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import javax.json.Json;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObjectBuilder;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.CacheControl;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Request;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;

import org.locationtech.jts.geom.Geometry;
import org.locationtech.jts.io.geojson.GeoJsonReader;

import javax.ws.rs.core.Response.ResponseBuilder;

@Path("/duo")
public class DUO {

	@GET
	@Path("bo/{brin}/{vestigingnummer}")
	@Produces({ "application/json" })
	public Response getHmpaal(
			@Context UriInfo uriInfo,
			@Context Request request,
			@PathParam("brin") String brinNummer,
			@PathParam("vestigingnummer") String vestigingsnummer) throws Exception{

		ResponseBuilder builder = Response.ok();
		System.out.println("bo id: "+ brinNummer + " vestigingsnummer: "+vestigingsnummer);

		Class.forName(Database.CLASS);

		try (Connection con = DriverManager.getConnection(Database.URL, Database.USER, Database.PASSWORD);
				Statement st = con.createStatement();
				ResultSet rs = st.executeQuery("SELECT provincie, bevoegd_gezag_nummer, brin_nummer, vestigingsnummer, \r\n" + 
						"       vestigingsnaam, straatnaam, huisnummer_toevoeging, postcode, \r\n" + 
						"       plaatsnaam, gemeentenummer, gemeentenaam, denominatie, telefoonnummer, \r\n" + 
						"       internetadres, straatnaam_correspondentieadres, huisnummer_toevoeging_correspondentieadres, \r\n" + 
						"       postcode_correspondentieadres, plaatsnaam_correspondentieadres, \r\n" + 
						"       nodaal_gebied_code, nodaal_gebied_naam, rpa_gebied_code, rpa_gebied_naam, \r\n" + 
						"       wgr_gebied_code, wgr_gebied_naam, coropgebied_code, coropgebied_naam, \r\n" + 
						"       onderwijsgebied_code, onderwijsgebied_naam, rmc_regio_code, rmc_regio_naam, \r\n" + 
						"       adr_id, geom\r\n" + 
						"  FROM disgeo.disgeo_vestigingenbo\r\n" + 
						"  WHERE brin_nummer = '"+brinNummer+"' AND vestigingsnummer = '"+vestigingsnummer+"'")) {

			JsonArrayBuilder jsonArrayBuilder = Json.createArrayBuilder();
			while (rs.next()) {
				JsonObjectBuilder jsonBuilder = Json.createObjectBuilder();
				for(int i=1;i<rs.getMetaData().getColumnCount();i++) {
					if(rs.getString(i) != null) {
						jsonBuilder.add(rs.getMetaData().getColumnName(i), rs.getString(i));
					}
				}
				jsonArrayBuilder.add(jsonBuilder.build());
			}
			builder = Response.ok(jsonArrayBuilder.build().toString());
		} catch (SQLException ex) {
			ex.printStackTrace();
		}

		adjustResponse(builder);
		return builder.build();		
	}

	@POST
	@Path("bo")
	@Consumes(MediaType.TEXT_PLAIN)
	@Produces({ "application/json" })
	public Response findLrkpGeo(String polygon) throws Exception{
		ResponseBuilder builder = Response.ok();
		//System.out.println("geo: "+ polygon);
		 
		if(polygon != null) {
			GeoJsonReader reader = new GeoJsonReader();
			Geometry geom = reader.read(polygon);
			
			Class.forName(Database.CLASS);

			try (Connection con = DriverManager.getConnection(Database.URL, Database.USER, Database.PASSWORD);
					Statement st = con.createStatement();
					ResultSet rs = st.executeQuery("SELECT DISTINCT brin_nummer, vestigingsnummer, \r\n" + 
							"       vestigingsnaam, straatnaam, huisnummer_toevoeging, postcode, \r\n" + 
							"       plaatsnaam, denominatie, telefoonnummer, \r\n" + 
							"       internetadres, wgr_gebied_naam, coropgebied_code, coropgebied_naam, \r\n" + 
							"       onderwijsgebied_code, onderwijsgebied_naam, rmc_regio_code, rmc_regio_naam\r\n" + 
							"  FROM disgeo.disgeo_vestigingenbo\r\n" + 
							"  WHERE ST_Intersects(ST_Transform(geom,4326), ST_GeomFromText('"+geom.toText()+"',4326))")) {

				JsonArrayBuilder jsonArrayBuilder = Json.createArrayBuilder();
				while (rs.next()) {
					JsonObjectBuilder jsonBuilder = Json.createObjectBuilder();
					for(int i=1;i<rs.getMetaData().getColumnCount();i++) {
						if(rs.getString(i) != null) {
							jsonBuilder.add(rs.getMetaData().getColumnName(i), rs.getString(i));
						}
					}
					jsonArrayBuilder.add(jsonBuilder.build());
				}
				builder = Response.ok(jsonArrayBuilder.build().toString());
			} catch (SQLException ex) {
				ex.printStackTrace();
			}
		}
		adjustResponse(builder);
		return builder.build();		
	}

	public void adjustResponse(ResponseBuilder builder) {
		CacheControl cc = new CacheControl();
		cc.setMaxAge(86400);

		builder.header("Allow", "GET,OPTIONS,HEAD");
		builder.header("Access-Control-Allow-Origin", "*");
		builder.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		builder.cacheControl(cc);

	}
}
