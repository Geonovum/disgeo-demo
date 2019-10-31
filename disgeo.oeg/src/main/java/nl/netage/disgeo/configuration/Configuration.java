package nl.netage.disgeo.configuration;

import java.io.IOException;

import javax.servlet.ServletContext;

import org.apache.jena.rdf.model.Model;
import org.apache.jena.rdf.model.ModelFactory;
import org.apache.jena.rdf.model.RDFNode;
import org.apache.jena.rdf.model.ResIterator;
import org.apache.jena.rdf.model.ResourceFactory;
import org.apache.jena.vocabulary.DCAT;
import org.apache.jena.vocabulary.DCTerms;
import org.apache.jena.vocabulary.SKOS;

import nl.netage.disgeo.models.DataService;
import nl.netage.disgeo.vocab.RR;

public class Configuration {

	public static Model configurationModel;
	public static Model passedObjects;

	public static void loadConfiguration(ServletContext context) throws IOException {
		configurationModel = ModelFactory.createDefaultModel();
		passedObjects = ModelFactory.createDefaultModel();
		configurationModel.read(Configuration.class.getClassLoader().getResource("stelselcatalogus.ttl").openStream(), null, "TTL");
		configurationModel.read(Configuration.class.getClassLoader().getResource("sc_extension.ttl").openStream(), null, "TTL");
		configurationModel.read(Configuration.class.getClassLoader().getResource("api_description.ttl").openStream(), null, "TTL");
	}

	public static DataService getDataServiceForClass(String classUri){
		ResIterator ri = configurationModel.listResourcesWithProperty(DCTerms.isReferencedBy, ResourceFactory.createResource(classUri));
		if(ri.hasNext()) {
			return new DataService(ri.next().asResource());
		}
		return null;
	}

}
