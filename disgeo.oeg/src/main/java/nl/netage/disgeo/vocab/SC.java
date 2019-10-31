package nl.netage.disgeo.vocab;

import org.apache.jena.rdf.model.Property;
import org.apache.jena.rdf.model.Resource;
import org.apache.jena.rdf.model.ResourceFactory;

public class SC {

    public final static String BASE_URI = "http://data.stelselvanbasisregistraties.nl/stelselcatalogus/def#";
    
    public final static String NAME = "SC";

    public final static String NS = BASE_URI;

    public final static String PREFIX = "sc";


    public final static Resource Begrip = ResourceFactory.createResource(NS + "Begrip");
    
    public final static Resource Gegevenselement = ResourceFactory.createResource(NS + "Gegevenselement");
    
    public final static Property attribuut = ResourceFactory.createProperty(NS + "attribuut");
    
    public final static Property attribuutVan = ResourceFactory.createProperty(NS + "attribuutVan");
    
    public static String getURI() {
        return NS;
    }
}
