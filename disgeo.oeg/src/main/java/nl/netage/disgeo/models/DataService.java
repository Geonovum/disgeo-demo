package nl.netage.disgeo.models;

import java.util.ArrayList;
import org.apache.jena.rdf.model.Model;
import org.apache.jena.rdf.model.ModelFactory;
import org.apache.jena.rdf.model.NodeIterator;
import org.apache.jena.rdf.model.RDFNode;
import org.apache.jena.rdf.model.Resource;
import org.apache.jena.rdf.model.ResourceFactory;
import org.apache.jena.rdf.model.Statement;
import org.apache.jena.rdf.model.StmtIterator;
import org.apache.jena.vocabulary.DC;
import org.apache.jena.vocabulary.DCAT;
import org.apache.jena.vocabulary.RDF;
import org.apache.jena.vocabulary.RDFS;
import org.apache.jena.vocabulary.SKOS;

import nl.netage.disgeo.vocab.RML;
import nl.netage.disgeo.vocab.RR;

public class DataService {
	public Resource dataservice, endpointDescription;
	private String format, title, accessUrl;
	private Resource rmlMapping, rmlMappingSingleInstance, rmlMappingMultipleInstance;
	private ArrayList<ApiParam> params;
	private ArrayList<String> headers;
	public int counter = 0;

	public DataService(Resource dataservice) {
		this.params = new ArrayList<ApiParam>();
		this.headers = new ArrayList<String>();
		this.dataservice = dataservice;

		this.title = this.dataservice.getModel().getProperty(dataservice, DC.title).getObject().asLiteral().getString();
		this.accessUrl = this.dataservice.getModel().getProperty(dataservice, DCAT.accessURL).getObject().asLiteral().getString();
		this.format = this.dataservice.getModel().getProperty(dataservice, DC.format).getObject().asResource().getProperty(RDFS.label).getObject().asLiteral().getString();

		this.endpointDescription = this.dataservice.getModel().getProperty(dataservice, ResourceFactory.createProperty("http://purl.org/dc/elements/1.1/endpointDescription")).getObject().asResource();
		NodeIterator nIt = this.endpointDescription.getModel().listObjectsOfProperty(endpointDescription, ResourceFactory.createProperty("http://temp.netage.nl/param"));
		while(nIt.hasNext()) {
			Resource paramResource = nIt.next().asResource();
			String property = null;
			String label = null;
			if(paramResource.hasProperty(SKOS.related)){
				property = paramResource.getProperty(SKOS.related).getObject().asNode().getURI();
			}
			if(paramResource.hasProperty(RDFS.label)){
				label = paramResource.getProperty(RDFS.label).getObject().asLiteral().getString();
			}
			params.add(new ApiParam(
					paramResource.getProperty(RDF.type).getObject().asNode().getURI(),
					label,
					property
				));
		} 

		StmtIterator si = dataservice.listProperties(ResourceFactory.createProperty("http://temp.netage.nl/rmlMapping"));
		while(si.hasNext()) {
			RDFNode mapping = si.next().getObject();
			if(mapping.asResource().hasProperty(RDF.type, ResourceFactory.createResource("http://temp.netage.nl/SingleObject"))) {
				this.rmlMappingSingleInstance = mapping.asResource();
			}else if(mapping.asResource().hasProperty(RDF.type, ResourceFactory.createResource("http://temp.netage.nl/MultipleObjects"))) {
				this.rmlMappingMultipleInstance = mapping.asResource();
			}else {
				this.rmlMapping = mapping.asResource();
			}
		}

		NodeIterator hIt = this.endpointDescription.getModel().listObjectsOfProperty(endpointDescription, ResourceFactory.createProperty("http://temp.netage.nl/header"));
		while(hIt.hasNext()) {
			this.headers.add(hIt.next().asLiteral().getString());
		} 
	}

	private Model getMapping(Resource node) {
		Model m = ModelFactory.createDefaultModel();
		StmtIterator si = node.listProperties();
		while(si.hasNext()) {
			Statement s = si.next();
			m.add(s);
			if(s.getObject().isResource()) {
				if(!s.getPredicate().toString().equals(RR.predicate.toString()) && 
						!s.getPredicate().toString().equals(RR.template.toString()) && 
						!s.getPredicate().toString().equals(RR._class.toString()) && 
						!s.getPredicate().toString().equals(RDF.type.toString()) && 
						!s.getPredicate().toString().equals(RML.reference.toString())) {

					m.add(getMapping(s.getObject().asResource()));
				}
			}
		}		
		return m;
	}

	public Model getTripleMapping(Boolean isSingleInstanceMapping) {
		if(this.rmlMappingSingleInstance != null && isSingleInstanceMapping) {
			if(isSingleInstanceMapping) {
				return this.getMapping(this.rmlMappingSingleInstance); 
			} 
		} else if (!isSingleInstanceMapping && this.rmlMappingMultipleInstance != null) {
				return this.getMapping(this.rmlMappingMultipleInstance); 
		}else {
			return this.getMapping(this.rmlMapping);
		}
		return null;
	}
	
	public boolean hasApiCallParam() {
		for(int i=0;i<this.getParams().size();i++) {
			if(this.getParams().get(i).getType().equals("http://temp.netage.nl/ApiCall")) {
				return true;
			}
		}
		return false;
	}
	
	public boolean hasGeoParam() {
		for(int i=0;i<this.getParams().size();i++) {
			if(this.getParams().get(i).getType().equals("http://temp.netage.nl/GeoParam")) {
				return true;
			}
		}
		return false;
	}
	
	public String returnApiCallParam() {
		for(int i=0;i<this.getParams().size();i++) {
			if(this.getParams().get(i).getType().equals("http://temp.netage.nl/ApiCall")) {
				return this.getParams().get(i).getProperty();
			}
		}
		return null;
	}

	public Resource getDataservice() {
		return dataservice;
	}

	public void setDataservice(Resource dataservice) {
		this.dataservice = dataservice;
	}

	public String getFormat() {
		return format;
	}

	public void setFormat(String format) {
		this.format = format;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getAccessUrl() {
		return accessUrl;
	}

	public void setAccessUrl(String accessUrl) {
		this.accessUrl = accessUrl;
	}

	public ArrayList<ApiParam> getParams() {
		return params;
	}

	public ArrayList<String> getHeaders() {
		return headers;
	}

	public void setHeaders(ArrayList<String> headers) {
		this.headers = headers;
	}

	public void setParams(ArrayList<ApiParam> params) {
		this.params = params;
	}
}
