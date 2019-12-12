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

@Path("/rce")
public class RCE {

	@GET
	@Path("monument/{bagnumid}")
	@Produces({ "application/json" })
	public Response getMonument(
			@Context UriInfo uriInfo,
			@Context Request request,
			@PathParam("bagnumid") String bagnumid) throws Exception{

		ResponseBuilder builder = Response.ok();
		System.out.println("bagnumid: "+ bagnumid);

		Class.forName(Database.CLASS);

		try (Connection con = DriverManager.getConnection(Database.URL, Database.USER, Database.PASSWORD);
				Statement st = con.createStatement();
				ResultSet rs = st.executeQuery("SELECT *\r\n" + 
						" FROM disgeo.disgeo_rce\r\n" + 
						"  WHERE bagnumid = '"+bagnumid+"'")) {

			JsonObjectBuilder jsonBuilder = Json.createObjectBuilder();
			if (rs.next()) {
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

	public void adjustResponse(ResponseBuilder builder) {
		CacheControl cc = new CacheControl();
		cc.setMaxAge(86400);

		builder.header("Allow", "GET,OPTIONS,HEAD");
		builder.header("Access-Control-Allow-Origin", "*");
		builder.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		builder.cacheControl(cc);

	}
}
