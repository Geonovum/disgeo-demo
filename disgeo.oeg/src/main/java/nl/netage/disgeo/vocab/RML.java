package nl.netage.disgeo.vocab;

import org.apache.jena.rdf.model.Property;
import org.apache.jena.rdf.model.Resource;
import org.apache.jena.rdf.model.ResourceFactory;

public class RML {
	public final static String BASE_URI = "http://semweb.mmlab.be/ns/rml#";
	
	public final static String NAME = "RML";

    public final static String NS = BASE_URI;

    public final static String PREFIX = "rml";    
    
    public final static Property reference = ResourceFactory.createProperty(NS + "reference");
    
    public final static Property logicalSource = ResourceFactory.createProperty(NS + "logicalSource");
    
    public final static Property source = ResourceFactory.createProperty(NS + "source");
    
    public final static Property iterator = ResourceFactory.createProperty(NS + "iterator");
    
    public final static Property referenceFormulation = ResourceFactory.createProperty(NS + "referenceFormulation");

	public final static Property declaresNamespace = ResourceFactory.createProperty(NS + "declaresNamespace");

	public static final Property namespacePrefix = ResourceFactory.createProperty(NS + "namespacePrefix");

	public static final Property namespaceName = ResourceFactory.createProperty(NS + "namespaceName");
}
