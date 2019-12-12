package nl.netage.disgeo.custom.api.service;

import java.io.StringWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.HashMap;
import java.util.logging.Logger;

import javax.json.Json;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.CacheControl;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Request;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.core.Response.ResponseBuilder;

@Path("/nwb")
public class NWB {

	@GET
	@Path("wegvak/{wegvakid}")
	@Produces({ "application/json" })
	public Response getWegvak(
			@Context UriInfo uriInfo,
			@Context Request request,
			@PathParam("wegvakid") String wegvakid) throws Exception{

		ResponseBuilder builder = Response.ok();
		System.out.println("wegvakid: "+ wegvakid);

		Class.forName(Database.CLASS);

		try (Connection con = DriverManager.getConnection(Database.URL, Database.USER, Database.PASSWORD);
				Statement st = con.createStatement();
				ResultSet rs = st.executeQuery("SELECT wvk.*, ST_AsText(wvk.geom) as wkt, maxs.omschr as max_snelheid, maxs.begintijd, maxs.eindtijd, ihv.omschr as inhaalverbod, ihv.kantcode as kantcode " + 
						" FROM disgeo.disgeo_wegvakken wvk " + 
						" LEFT JOIN disgeo.disgeo_max_snelheden maxs ON maxs.wvk_id = wvk.wvk_id " + 
						" LEFT JOIN disgeo.disgeo_inhaalverboden ihv ON ihv.wvk_id = wvk.wvk_id " + 
						" WHERE wvk.wvk_id = '"+wegvakid+"'")) {

			JsonObjectBuilder jsonBuilder = Json.createObjectBuilder();
			while (rs.next()) {
				for(int i=1;i<rs.getMetaData().getColumnCount();i++) {
					if(rs.getString(i) != null) {
						jsonBuilder.add(rs.getMetaData().getColumnName(i), rs.getString(i));
					}
				}
			}
			builder = Response.ok(jsonBuilder.build().toString());
		} catch (SQLException ex) {
			ex.printStackTrace();
		}

		adjustResponse(builder);
		return builder.build();		
	}
	
	@GET
	@Path("hmpalen/{wegvakid}")
	@Produces({ "application/json" })
	public Response getHmpaal(
			@Context UriInfo uriInfo,
			@Context Request request,
			@PathParam("wegvakid") String wegvakid) throws Exception{

		ResponseBuilder builder = Response.ok();
		System.out.println("wegvakid: "+ wegvakid);

		Class.forName(Database.CLASS);

		try (Connection con = DriverManager.getConnection(Database.URL, Database.USER, Database.PASSWORD);
				Statement st = con.createStatement();
				ResultSet rs = st.executeQuery("SELECT gid, hectomtrng, afstand, wvk_id, wvk_begdat, zijde, hecto_lttr, geom " + 
						"  FROM disgeo.disgeo_hectopunten " + 
						"  WHERE wvk_id = '"+wegvakid+"'")) {

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
	
	@GET
	@Path("kunstwerken/{wegvakid}")
	@Produces({ "application/json" })
	public Response getKunstwerken(
			@Context UriInfo uriInfo,
			@Context Request request,
			@PathParam("wegvakid") String wegvakid) throws Exception{

		ResponseBuilder builder = Response.ok();
		System.out.println("wegvakid: "+ wegvakid);

		JsonArrayBuilder jsonArrayBuilder = Json.createArrayBuilder();
		Class.forName(Database.CLASS);

		try (Connection con = DriverManager.getConnection(Database.URL, Database.USER, Database.PASSWORD);
				Statement st = con.createStatement();
				ResultSet rs = st.executeQuery("SELECT * " + 
						"FROM disgeo.disgeo_kunstoverweg " + 
						"WHERE wvk_id = '"+wegvakid+"'")) {

			
			while (rs.next()) {
				JsonObjectBuilder jsonBuilder = Json.createObjectBuilder();
				jsonBuilder.add("kunstType", "Kunst over weg");
				for(int i=1;i<rs.getMetaData().getColumnCount();i++) {
					if(rs.getString(i) != null) {
						jsonBuilder.add(rs.getMetaData().getColumnName(i), rs.getString(i));
					}
				}
				jsonArrayBuilder.add(jsonBuilder.build());
			}
		} catch (SQLException ex) {
			ex.printStackTrace();
		}
		
		try (Connection con = DriverManager.getConnection(Database.URL, Database.USER, Database.PASSWORD);
				Statement st = con.createStatement();
				ResultSet rs = st.executeQuery("SELECT * " + 
						"FROM disgeo.disgeo_kunstinweg " + 
						"  WHERE wvk_id = '"+wegvakid+"'")) {

			while (rs.next()) {
				JsonObjectBuilder jsonBuilder = Json.createObjectBuilder();
				jsonBuilder.add("kunstType", "Kunst in weg");
				for(int i=1;i<rs.getMetaData().getColumnCount();i++) {
					if(rs.getString(i) != null) {
						jsonBuilder.add(rs.getMetaData().getColumnName(i), rs.getString(i));
					}
				}
				jsonArrayBuilder.add(jsonBuilder.build());
			}
		} catch (SQLException ex) {
			ex.printStackTrace();
		}

		builder = Response.ok(jsonArrayBuilder.build().toString());
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
