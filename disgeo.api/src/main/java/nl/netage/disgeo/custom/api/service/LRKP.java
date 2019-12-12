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

@Path("/lrkp")
public class LRKP {

	@GET
	@Path("kdv/{lrkp_id}")
	@Produces({ "application/json" })
	public Response getHmpaal(
			@Context UriInfo uriInfo,
			@Context Request request,
			@PathParam("lrkp_id") String lrkp_id) throws Exception{

		ResponseBuilder builder = Response.ok();
		System.out.println("lrkp id: "+ lrkp_id);

		Class.forName(Database.CLASS);

		try (Connection con = DriverManager.getConnection(Database.URL, Database.USER, Database.PASSWORD);
				Statement st = con.createStatement();
				ResultSet rs = st.executeQuery("SELECT lrk_id, type_oko, actuele_naam_oko, aantal_kindplaatsen, vve, \r\n" + 
						"       status, inschrijfdatum, opvanglocatie_adres, opvanglocatie_postcode, \r\n" + 
						"       opvanglocatie_woonplaats, bag_id\r\n" + 
						"  FROM disgeo.disgeo_lrkp\r\n" + 
						"  WHERE lrk_id = '"+lrkp_id+"'")) {

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
	@Path("kdv")
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
					ResultSet rs = st.executeQuery("SELECT DISTINCT lrk_id, type_oko, actuele_naam_oko, aantal_kindplaatsen, \r\n" + 
							"       opvanglocatie_adres, opvanglocatie_postcode, \r\n" + 
							"       opvanglocatie_woonplaats, bag_id, naam_houder, contact_telefoon, contact_emailadres, contact_website,\r\n" + 
							"      ST_AsText(geom)\r\n" + 
							"  FROM disgeo.disgeo_lrkp\r\n" + 
							"  WHERE ST_Intersects(ST_Transform(geom,4326), ST_GeomFromText('"+geom.toText()+"',4326))\r\n" + 
							"")) {

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
