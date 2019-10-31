package nl.netage.disgeo.models;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.apache.jena.rdf.model.Model;
import org.apache.jena.rdf.model.ModelFactory;
import org.apache.jena.rdf.model.NodeIterator;
import org.apache.jena.rdf.model.RDFNode;
import org.apache.jena.rdf.model.ResIterator;
import org.apache.jena.rdf.model.Resource;
import org.apache.jena.rdf.model.ResourceFactory;
import org.apache.jena.rdf.model.Statement;
import org.apache.jena.rdf.model.StmtIterator;
import org.apache.jena.riot.Lang;
import org.apache.jena.riot.RDFDataMgr;
import org.apache.jena.vocabulary.RDF;
import org.apache.jena.vocabulary.SKOS;

import nl.netage.disgeo.configuration.Configuration;
import nl.netage.disgeo.util.Util;
import nl.netage.disgeo.vocab.SC;

public class OrchestrationModel {

	public static Model queryRelatedConcepts(String uri, Model result, Resource previousSubject) throws Exception {
		Model m = ModelFactory.createDefaultModel();
		//Objects to which the current object refers
		NodeIterator ni = Configuration.configurationModel.listObjectsOfProperty(ResourceFactory.createResource(uri), SC.attribuut);
		while(ni.hasNext()) {
			Resource conceptAttribuut = ni.next().asResource();
			StmtIterator si = conceptAttribuut.listProperties(SKOS.related);

			while(si.hasNext()) {
				Statement s = si.next();
				//System.out.println(uri + " - " +s.getSubject().toString() + " - " + s.getObject().toString());

				DataService ds = Configuration.getDataServiceForClass(s.getObject().toString());
				if(ds != null) {
					if(ds.hasApiCallParam()) {
						if(previousSubject.hasProperty(ResourceFactory.createProperty(s.getSubject().toString()))) {
							String urlProperty = ds.returnApiCallParam();

							NodeIterator ni2 = result.listObjectsOfProperty(ResourceFactory.createProperty(urlProperty));
							while(ni2.hasNext()) {

								RDFNode valueNode = ni2.next();
								String value = null;
								if(valueNode.isLiteral()) {
									value = valueNode.asLiteral().getString();
								}else {
									value = valueNode.asNode().getURI();
								}
								if(Util.isValid(value)) {
									Model blockResult = ModelFactory.createDefaultModel();
									blockResult = (Util.replaceValuesWithIdentifiers(
											RmlMapper.convertResult(
													Util.queryRestfullService(new HashMap<String, String>(), ds.getHeaders(), value)
													, ds.getTripleMapping(false), ds.getFormat())
											, urlProperty, result, valueNode));

									//recursive finding the nested concepts
									blockResult.add(OrchestrationModel.queryRelatedConcepts(s.getObject().toString(), blockResult, blockResult.listSubjects().next()));
									m.add(blockResult);
								}
							}
						}
					}else {

						System.out.println("-------------------------------");
						System.out.println(ds.getAccessUrl());

						HashMap<String, String> pathParams = new HashMap<String, String>();
						for(int i=0;i<ds.getParams().size();i++) {
							if(ds.getParams().get(i).getType().equals("http://temp.netage.nl/PathParam")) {
								System.out.println("Property: "+ds.getParams().get(i).getProperty());
								try {
									String value = result.listObjectsOfProperty(ResourceFactory.createProperty(ds.getParams().get(i).getProperty())).next().asLiteral().getString();
									pathParams.put(ds.getParams().get(i).getLabel(), value);

								} catch (Exception e) {
									System.out.println("No value for property: "+ds.getParams().get(i).getProperty());
								}
							}
						}

						Model blockResult = ModelFactory.createDefaultModel();
						String apiResult = Util.queryRestfullService(pathParams, ds.getHeaders(), ds.getAccessUrl());
						if(apiResult != null) {
							blockResult = RmlMapper.convertResult(apiResult, ds.getTripleMapping(false), ds.getFormat());

							ResIterator ri = blockResult.listSubjects();
							while(ri.hasNext()) {
								Resource resultSubject = ri.next();
								if (!result.contains(resultSubject, null, (RDFNode) null)) {
									m.add(previousSubject, ResourceFactory.createProperty(s.getSubject().toString()), resultSubject);
									m.add(blockResult);
								}
							}
						}
						System.out.println("-------------------------------");

					}
				}else{
					//System.out.println("No dataservice found for: "+s.getObject().toString());
				}
			}
		}

		return m;
	}

	public static RDFNode getObject(String uri) {
		ResIterator it = Configuration.configurationModel.listSubjectsWithProperty(RDF.type, SC.Begrip);
		while(it.hasNext()) {
			Resource subject = it.next();
			if(subject.asNode().getURI().equals(uri)) {
				return subject;
			}
		}
		return null;
	}

	public static List<RDFNode> getObjectAttributes(String uri) {
		RDFNode subject = getObject(uri);
		NodeIterator it = subject.getModel().listObjectsOfProperty(subject.asResource(), SC.attribuut);
		List<RDFNode> list = new ArrayList<RDFNode>();
		while(it.hasNext()) {
			list.add(it.next());
		}
		return list;
	}
}
