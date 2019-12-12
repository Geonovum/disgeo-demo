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
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.CacheControl;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;

import org.locationtech.jts.geom.Geometry;
import org.locationtech.jts.io.geojson.GeoJsonReader;

@Path("rrgs")
public class RRGS {
	
	@POST
	@Path("bedrijven")
	@Consumes(MediaType.TEXT_PLAIN)
	@Produces({ "application/json" })
	public Response findBedrijfGeo(String polygon) throws Exception{
		ResponseBuilder builder = Response.ok();
		//System.out.println("geo: "+ polygon);
		 
		if(polygon != null) {
			GeoJsonReader reader = new GeoJsonReader();
			Geometry geom = reader.read(polygon);
			
			Class.forName(Database.CLASS);

			try (Connection con = DriverManager.getConnection(Database.URL, Database.USER, Database.PASSWORD);
					Statement st = con.createStatement();
					ResultSet rs = st.executeQuery("SELECT DISTINCT bevoegd_ge, wm_vergunn, totaleopsl, date_chang, scenario, \r\n" + 
							"       peildatum, populatie, postcode, gemeente, plaats, huisnummer, \r\n" + 
							"       straat, autorisati, aobjectid, url, reden_opna, inddfe, ind_bevi_i, \r\n" + 
							"       rrgs_id, totaleop_1, naam_inric, geom FROM disgeo.disgeo_rrgs_bedrijven" + 
							" WHERE ST_Intersects(ST_Transform(geom,4326), ST_GeomFromText('"+geom.toText()+"',4326))")) {

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
	
	@POST
	@Path("kwestbaarobjecten")
	@Consumes(MediaType.TEXT_PLAIN)
	@Produces({ "application/json" })
	public Response findKwetsbaarObjectGeo(String polygon) throws Exception{
		ResponseBuilder builder = Response.ok();
		System.out.println("geo: "+ polygon);
		 
		if(polygon != null) {
			GeoJsonReader reader = new GeoJsonReader();
			Geometry geom = reader.read(polygon);
			
			Class.forName(Database.CLASS);

			try (Connection con = DriverManager.getConnection(Database.URL, Database.USER, Database.PASSWORD);
					Statement st = con.createStatement();
					ResultSet rs = st.executeQuery("SELECT DISTINCT rot_code, rot_status, date_chang, bedrijfsbr, aantal_aan, \r\n" + 
							"       prevapcode, omschrijvi, instelling, locatieoms, perceelnum, buitenland, \r\n" + 
							"       gemeente, plaats, postcode, toevoeging, huisnummer, straat, aobjectid, \r\n" + 
							"       url, pve_bevi_k, kwo_bevi_k, kwo_prevap, kwo_bruto_, ycoord, \r\n" + 
							"       xcoord, prioriteit, omschrij_1, aantal_bou, bedrijfs_1, autorisati, \r\n" + 
							"       rot_naam, type, geom\r\n" + 
							"  FROM disgeo.disgeo_risicokaart "+
							" WHERE ST_Intersects(ST_Transform(geom,4326), ST_GeomFromText('"+geom.toText()+"',4326))")) {

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
