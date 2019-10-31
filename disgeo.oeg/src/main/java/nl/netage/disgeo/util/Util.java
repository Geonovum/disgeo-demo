package nl.netage.disgeo.util;

import java.io.IOException;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;

import org.apache.http.Header;
import org.apache.http.HttpEntity;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.apache.jena.rdf.model.Model;
import org.apache.jena.rdf.model.RDFNode;
import org.apache.jena.rdf.model.Resource;
import org.apache.jena.rdf.model.ResourceFactory;

public class Util {
	
	public static boolean isValid(String url) { 
		/* Try creating a valid URL */
		try { 
			new URL(url).toURI(); 
			return true; 
		} 

		// If there was an Exception 
		// while creating URL object 
		catch (Exception e) { 
			return false; 
		} 
	} 

	public static String queryRestfullService(HashMap<String, String> pathParams, ArrayList<String> headers, String accessUrl) throws ClientProtocolException, IOException {
		String endpoint = Util.fillParamsToAccessUrl(pathParams, accessUrl);
		System.out.println(endpoint);
		try {
			HttpGet getRequest = new HttpGet(endpoint);

			// add request headers
			for(int i=0;i<headers.size();i++) {
				String[] headerElem = headers.get(i).split(":");
				getRequest.addHeader(headerElem[0], headerElem[1]);
			}

			CloseableHttpClient httpClient = HttpClients.createDefault();
			try (CloseableHttpResponse response = httpClient.execute(getRequest)) {

				// Get HttpResponse Status
				System.out.println(response.getStatusLine().toString());

				HttpEntity entity = response.getEntity();
				Header contentType = entity.getContentType();
				System.out.println(contentType);

				if (entity != null) {
					// return it as a String
					String result = EntityUtils.toString(entity);
					//System.out.println(result);
					return result;
				}

			}catch(Exception e) {
				e.printStackTrace();
			}
		}catch(Exception e) {
			System.out.println("Unable to run: "+endpoint);
		}
		return null;
	}

	public static String fillParamsToAccessUrl(HashMap<String, String> pathParams, String accessUrl) {
		String tempAccessUrl = accessUrl;

		for (String i : pathParams.keySet()) {
			tempAccessUrl = tempAccessUrl.replace("{"+i+"}", pathParams.get(i));
		}

		//tempAccessUrl = tempAccessUrl.replaceAll("/\\{(.*?)\\}", "");
		return tempAccessUrl;
	}

	public static Model replaceValuesWithIdentifiers(Model convertResult, String relatedProperty, Model completeModel, RDFNode value) {	
		completeModel.add(convertResult);

		Resource subject = completeModel.listSubjectsWithProperty(ResourceFactory.createProperty(relatedProperty), value).next();

		if(convertResult.listSubjects().hasNext()) {
			Resource newObject = convertResult.listSubjects().next();
	
			completeModel.remove(subject, ResourceFactory.createProperty(relatedProperty), value);
			completeModel.add(subject, ResourceFactory.createProperty(relatedProperty), newObject);
		}
		return convertResult;
	}
}
