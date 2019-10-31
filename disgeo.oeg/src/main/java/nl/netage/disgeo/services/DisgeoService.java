package nl.netage.disgeo.services;

import java.io.StringWriter;
import java.util.HashMap;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.CacheControl;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Request;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;

import org.apache.http.ParseException;
import org.apache.jena.rdf.model.Model;
import org.apache.jena.rdf.model.ModelFactory;
import org.apache.jena.riot.Lang;
import org.apache.jena.riot.RDFDataMgr;

import nl.netage.disgeo.configuration.Configuration;
import nl.netage.disgeo.models.DataService;
import nl.netage.disgeo.models.OrchestrationModel;
import nl.netage.disgeo.models.RmlMapper;
import nl.netage.disgeo.util.Util;

import javax.ws.rs.core.Response.ResponseBuilder;

@Path("/disgeo")
public class DisgeoService {

	@GET
	@Path("pand/{id}")
	@Produces({ "application/ld+json" })
	public Response getPand(
			@Context UriInfo uriInfo,
			@Context Request request,
			@PathParam("id") String id) throws Exception{

		ResponseBuilder builder = Response.ok();
		System.out.println("id: "+ id);
		String restConcept = "http://data.stelselvanbasisregistraties.nl/bag/id/concept/Pand";
		StringWriter out = new StringWriter();
		Model result = ModelFactory.createDefaultModel();
		Configuration.passedObjects = ModelFactory.createDefaultModel();
		
		DataService ds = Configuration.getDataServiceForClass("http://data.stelselvanbasisregistraties.nl/bag/id/concept/Pand");
		HashMap<String, String> pathParams = new HashMap<String, String>();
		pathParams.put("id", id);
		if(ds != null) {
			result = RmlMapper.convertResult(Util.queryRestfullService(pathParams, ds.getHeaders(), ds.getAccessUrl()), ds.getTripleMapping(true), ds.getFormat());
			result.add(OrchestrationModel.queryRelatedConcepts(restConcept, result, result.listSubjects().next()));
		}
				
		RDFDataMgr.write(out, result, Lang.JSONLD);
		
		System.out.print("Sending data ("+result.size()+")! \n\n");
		builder = Response.ok(out.toString());
		adjustResponse(builder);
		return builder.build();		
	}
	
	@GET
	@Path("verblijfsobject/{id}")
	@Produces({ "application/ld+json" })
	public Response getVbo(
			@Context UriInfo uriInfo,
			@Context Request request,
			@PathParam("id") String id) throws Exception{

		ResponseBuilder builder = Response.ok();
		System.out.println("id: "+ id);
		String restConcept = "http://data.stelselvanbasisregistraties.nl/bag/id/concept/Verblijfsobject";
		StringWriter out = new StringWriter();
		Model result = ModelFactory.createDefaultModel();
		
		DataService ds = Configuration.getDataServiceForClass(restConcept);
		HashMap<String, String> pathParams = new HashMap<String, String>();
		pathParams.put("id", id);
		
		if(ds != null) {
			//System.out.println(ds.getAccessUrl());
			result = RmlMapper.convertResult(Util.queryRestfullService(pathParams, ds.getHeaders(), ds.getAccessUrl()), ds.getTripleMapping(true), ds.getFormat());
			while(result.listSubjects().hasNext()) {
				result.add(OrchestrationModel.queryRelatedConcepts(restConcept, result, result.listSubjects().next()));
			}
		}
		
		RDFDataMgr.write(out, result, Lang.JSONLD);
		
		System.out.print("Sending data ("+result.size()+")! \n\n");
		builder = Response.ok(out.toString());
		adjustResponse(builder);
		return builder.build();		
	}
	
	@GET
	@Path("wegvak/{id}")
	@Produces({ "application/ld+json" })
	public Response getWegvlak(
			@Context UriInfo uriInfo,
			@Context Request request,
			@PathParam("id") String id) throws Exception{

		ResponseBuilder builder = Response.ok();
		System.out.println("id: "+ id);
		String restConcept = "http://data.stelselvanbasisregistraties.nl/bag/id/concept/Wegvak";
		StringWriter out = new StringWriter();
		Model result = ModelFactory.createDefaultModel();
		
		DataService ds = Configuration.getDataServiceForClass(restConcept);
		HashMap<String, String> pathParams = new HashMap<String, String>();
		pathParams.put("id", id);
		
		if(ds != null) {
			//System.out.println(ds.getAccessUrl());
			result = RmlMapper.convertResult(Util.queryRestfullService(pathParams, ds.getHeaders(), ds.getAccessUrl()), ds.getTripleMapping(true), ds.getFormat());
			result.add(OrchestrationModel.queryRelatedConcepts(restConcept, result, result.listSubjects().next()));
		}
		
		RDFDataMgr.write(out, result, Lang.JSONLD);
		
		System.out.print("Sending data ("+result.size()+")! \n\n");
		builder = Response.ok(out.toString());
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
