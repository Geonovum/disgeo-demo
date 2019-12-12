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

@Path("cbs")
public class CBS {
	
	@POST
	@Path("buurten")
	@Consumes(MediaType.TEXT_PLAIN)
	@Produces({ "application/json" })
	public Response findBuurtGeo(String point) throws Exception{
		ResponseBuilder builder = Response.ok();
		System.out.println("geo: "+ point);
		 
		if(point != null) {
			GeoJsonReader reader = new GeoJsonReader();
			Geometry geom = reader.read(point);
			
			Class.forName(Database.CLASS);

			try (Connection con = DriverManager.getConnection(Database.URL, Database.USER, Database.PASSWORD);
					Statement st = con.createStatement();
					ResultSet rs = st.executeQuery("SELECT DISTINCT * " + 
							"FROM disgeo.disgeo_buurten_2018 " + 
							" WHERE ST_Intersects(ST_Transform(geom,4326), ST_GeomFromText('"+geom.toText()+"',4326))")) {

				JsonObjectBuilder jsonBuilder = Json.createObjectBuilder();
				while (rs.next()) {
					for(int i=1;i<rs.getMetaData().getColumnCount();i++) {
						if(rs.getString(i) != null) {
							if(!rs.getString(i).equals("-99999999")){
								jsonBuilder.add(rs.getMetaData().getColumnName(i), rs.getString(i));
							}
						}
					}
				}
				builder = Response.ok(jsonBuilder.build().toString());
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
