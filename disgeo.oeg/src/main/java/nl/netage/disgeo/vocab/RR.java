package nl.netage.disgeo.vocab;

import org.apache.jena.rdf.model.Property;
import org.apache.jena.rdf.model.Resource;
import org.apache.jena.rdf.model.ResourceFactory;

public class RR {
	public final static String BASE_URI = "http://www.w3.org/ns/r2rml#";
	
	public final static String NAME = "R2RML";

    public final static String NS = BASE_URI;

    public final static String PREFIX = "rr";
    
    public final static Resource IRI = ResourceFactory.createResource(NS + "IRI");
    
    public final static Resource BlankNode = ResourceFactory.createResource(NS + "BlankNode");
    
    public final static Property subjectMap = ResourceFactory.createProperty(NS + "subjectMap");
    
    public final static Property template = ResourceFactory.createProperty(NS + "template");
    
    public final static Property constant = ResourceFactory.createProperty(NS + "constant");
    
    public final static Property _class = ResourceFactory.createProperty(NS + "class");
    
    public final static Property predicateObjectMap = ResourceFactory.createProperty(NS + "predicateObjectMap");
    
    public final static Property objectMap = ResourceFactory.createProperty(NS + "objectMap");
    
    public final static Property datatype = ResourceFactory.createProperty(NS + "datatype");
    
    public final static Property language = ResourceFactory.createProperty(NS + "language");
    
    public final static Property parentTriplesMap = ResourceFactory.createProperty(NS + "parentTriplesMap");
    
    public final static Property predicate = ResourceFactory.createProperty(NS + "predicate");
    
    public final static Property termType = ResourceFactory.createProperty(NS + "termType");
}
