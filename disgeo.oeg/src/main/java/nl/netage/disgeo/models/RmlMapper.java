package nl.netage.disgeo.models;

import java.io.ByteArrayInputStream;
import java.io.StringWriter;
import java.nio.charset.Charset;
import java.util.Set;

import org.apache.jena.rdf.model.Model;
import org.apache.jena.rdf.model.ModelFactory;
import org.apache.jena.rdf.model.ResIterator;
import org.apache.jena.rdf.model.ResourceFactory;
import org.apache.jena.riot.Lang;
import org.apache.jena.riot.RDFDataMgr;
import org.eclipse.rdf4j.rio.RDFFormat;
import org.eclipse.rdf4j.rio.Rio;

import com.taxonic.carml.logical_source_resolver.CsvResolver;
import com.taxonic.carml.logical_source_resolver.JsonPathResolver;
import com.taxonic.carml.logical_source_resolver.XPathResolver;
import com.taxonic.carml.model.TriplesMap;
import com.taxonic.carml.util.RmlMappingLoader;
import com.taxonic.carml.vocab.Rdf;

public class RmlMapper {
	final static String JSON = "json";
	final static String CSV = "csv";
	final static String XML = "xml";

	public static Model convertResult(String result, Model tripleMapping, String format) throws Exception {
		StringWriter sw = new StringWriter();
		RDFDataMgr.write(sw, tripleMapping, Lang.TTL);

		Set<TriplesMap> mapping =
				RmlMappingLoader
				.build()
				.load(RDFFormat.TURTLE, new ByteArrayInputStream(sw.toString().getBytes(Charset.forName("UTF-8"))));

		com.taxonic.carml.engine.RmlMapper mapper = null;
		
		if(format.equals(JSON)) {
			mapper = com.taxonic.carml.engine.RmlMapper.newBuilder()
					.setLogicalSourceResolver(Rdf.Ql.JsonPath, new JsonPathResolver())
					.build();
		} else if(format.equals(CSV)) {
			mapper = com.taxonic.carml.engine.RmlMapper.newBuilder()
					.setLogicalSourceResolver(Rdf.Ql.Csv, new CsvResolver())
					.build();
		}else if(format.equals(XML)) {
			mapper = com.taxonic.carml.engine.RmlMapper.newBuilder()
					.setLogicalSourceResolver(Rdf.Ql.XPath, new XPathResolver())
					.build();
		}else {
			throw new Exception("Formats not able to convert. Only JSON, CSV and XML are allowed.");
		}
		
		mapper.bindInputStream(new ByteArrayInputStream(result.getBytes(Charset.forName("UTF-8"))));
		sw = new StringWriter();
		Rio.write(mapper.map(mapping), sw, RDFFormat.TURTLE);
		
		Model resultModel = ModelFactory.createDefaultModel();
		return resultModel.read(new ByteArrayInputStream(sw.toString().getBytes(Charset.forName("UTF-8"))), null, "TTL");
	}	
}
