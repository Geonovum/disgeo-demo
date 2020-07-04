# Lessons learned from the DisGeo linked data demonstrator

This chapter describes the lessons learned from the research. While the demonstrator was being developed, we registered the issues we ran into as [issues in github] (https://github.com/Geonovum/disgeo-demo/issues). The lessons are listed one by one in this chapter as we came across them. Read for the summary and conclusions [chapter 2] (# summary).

## API availability, API usability and API completeness

### Availabilty

Initially, the idea at the start of the project was that a wide availability of APIs would ensure a wide availability of data. Combining this data correctly would provide a wealth of information.

However, practice shows that APIs are not (yet) widely available. The BAG has a well-designed API that offers both relational and geographical data. The BAG API distinguishes itself with this.

### Usability
More than 80% of the data used is made available as a map layer (i.e. WMS (T) or WFS old style, or a non-standardized variant of this), which cannot be used as an API. The BAG API is the only API that can be queried geographically.

### Completeness
In addition, an API does not necessarily make * all * data available. For example, the BAG API does not make the purpose of use of a residence object available through the API.

### Maturity
Many APIs do not score well on (all) of these points:

#### Checklist API Maturity

| # | Question | Referral API Strategy | Reference (Spatial) Data on the Web Best Practices |
| - | - | - | - |
| | ** Documentation ** | | |
| 1 | Is documentation available with an API? | [7.1.14] [1] | |
| 2 | Is there reference from the API description and results to the documentation? | [7.1.49] [2] | [Metadata 8.2] [3] |
| 3 | Does the documentation refer to System Catalog or other datasets? | | |
| 4 | Is there information about the change and origin of data? | | [Data provenance 8.4] [4] |
| |
| | ** API definition ** | | |
| 5 | Can you provide query parameters to filter? | [7.1.28] [5] | |
| 6 | Do identifiers from other datasets provide an entry into the API? | | [Data identifiers 8.7] [6], [Spatial data identifiers 12.1.1] [7] |
| 7 | Does the API contain all necessary data / is the data complete? | | |
| 8 | Can you ask spatial questions? | [7.1.34] [8] | |
| 9 | Does the API communicate the CRS of its spatial data? | [7.1.37] [9] | [Geometries and coordinate reference systems 12.2.2] [10] |
| 10 | Is Geodata offered as GEOJSON? | [7.1.32] [11], [7.1.33] [12] | |
| 11 | Are open standards used to describe the API? | [7.1.14] [1] | |
| 12 | Is a data model available? | | [Data Vocabularies 8.9] [13] |
| |
| | ** Return format ** | | |
| 13 | Is the return format self-descriptive? | | |
| 14 | Does the return format provide references to other datasets? | | |
| 15 | Are open standards for the return format and data used? | [7.1.26] [14] | [Data Formats 8.8] [15], [Spatial data encoding 12.2.1] [16] |
| |
| | ** API Use ** | | | |
| 16 | Does the API set terms of use? | | [Data licenses 8.3] [17] |
| 17 | Does the API offer caching? | [7.1.41] [18] | |
| 18 | Does the API impose restrictions on use? | [7.1.42] [19], [7.1.43] [20] | |

[1]: https://docs.geostandaarden.nl/api/API-Strategie/#api-16-use-oas-3-0-for-documentation
[2]: https://docs.geostandaarden.nl/api/API-Strategie/#api-51-publish-oas-at-the-base-uri-in-json-format
[3]: https://www.w3.org/TR/dwbp/#metadata
[4]: https://www.w3.org/TR/dwbp/#provenance
[5]: https://docs.geostandaarden.nl/api/API-Strategie/#api-30-use-query-parameters-corresponding-to-the-queryable-fields
[6]: https://www.w3.org/TR/dwbp/#DataIdentifiers
[7]: https://www.w3.org/TR/sdw-bp/#bp-identifiers
[8]: https://docs.geostandaarden.nl/api/API-Strategie/#api-36-provide-a-post-endpoint-for-geo-queries
[9]: https://docs.geostandaarden.nl/api/API-Strategie/#api-39-use-etrs89-as-the-preferred-coordinate-reference-system-crs
[10]: https://www.w3.org/TR/sdw-bp/#geometry-and-crs
[11]: https://docs.geostandaarden.nl/api/API-Strategie/#api-34-support-geojson-for-geo-apis
[12]: https://docs.geostandaarden.nl/api/API-Strategie/#api-35-include-geojson-as-part-of-the-embedded-resource-in-the-json-response
[13]: https://www.w3.org/TR/dwbp/#dataVocabularies
[14]: https://docs.geostandaarden.nl/api/API-Strategie/#api-28-send-a-json-response-without-enclosing-envelope
[15]: https://www.w3.org/TR/dwbp/#dataFormats
[16]: https://www.w3.org/TR/sdw-bp/#bp-expressing-spatial
[17]: https://www.w3.org/TR/dwbp/#licenses
[18]: https://docs.geostandaarden.nl/api/API-Strategie/#api-43-apply-caching-to-improve-performance
[19]: https://docs.geostandaarden.nl/api/API-Strategie/#api-44-apply-rate-limiting
[20]: https://docs.geostandaarden.nl/api/API-Strategie/#api-45-provide-rate-limiting-information

### _Considerations for follow-up and API strategy_
* The current [apply-or-explain-list-list] (https://www.forumstandaardisatie.nl/open-standaarden/lijst/ver obligation) of Forum Standardization now contains the Dutch profiles of WMS 1.3 and WFS 2.0 . This "obligation" stands in the way of further development. The solution lies in replacing these standards on the Open Standards List with the new OGC API standards. WFS 2.0 can already be replaced by OGC API - Features. These new OGC API standards ensure a good score on maturity.
* The checklist for API maturity would be a good addition to the Dutch API strategy [[NLAPIStrategie]].

## APIs and data silos
Certain data is returned based on an API query. In a system of data that is to be used in conjunction, it is necessary that the data make references to other objects based on a unique and persistent identifier. Based on this principle, we can come up with a generic solution.

One observation with regard to APIs seems to be that, at least in the APIs we have examined, an API can be seen as a data silo. The API shares data from one silo and usually does not contain any relationships to data (or a dataset) outside the API.

It seems common, that if an API offers multiple requests, the response from one request refers to another request within the same API. For example, the data about a residence object refers to the request within the same API to request associated property data.

<aside class = "example">
Example: querying a specific property in the BAG API.

Expected answer:

`" Related Property ":" 1895100000022868 ",`

Actual answer:

`" relatedPand ":" https://bag.basicregistrations.overheid.nl/api/v1/verblijfsobjecten?pandrelatering=1895100000022868&valigOp=2019-10-22 ","
</aside>

This is useful on the one hand, but if you want to query a * different * registration on the basis of the BAG Property id obtained, in order to retrieve more information about that property, you as a programmer must obtain the id from the API URL. 'cut', which requires knowledge of the specific URL structure of this API. It is not possible to generically cut an ID from a URL.

Moreover, in order to query the system in conjunction via APIs, an API must also be able to answer questions based on identifiers from other related data sets.

<aside class = "example">
For example: asking questions to an NHR API based on a BAG Accommodation Object identifier.

- Question: Which companies are located at this address?
- Translated: API, give me all `[NHR object]` and with this `[BAG residence object id]` as address.
</aside>

### Underlying problem: missing connections in the data

Of course, an API cannot offer more than the data source it provides. If the source data contains no links, links, between objects from this dataset and objects from other datasets, then the API cannot provide such connections.

The underlying problem is therefore that the datasets do not record and manage these links structurally. If datasets did, the APIs on top of that could be improved to offer links between individual objects and make them searchable in a useful way.

### _Considerations for follow-up or inclusion in API strategy_
* In order to make data from the data silo available in conjunction, reference should be made to identifiers. This allows generic handling of data from different APIs.
* In addition, APIs should refer to identifiers of objects from other APIs. For example, the data from the National Cultural Heritage Agency (RCE) describes addresses on monuments, but these have been literally introduced instead of linked to the BAG and are therefore difficult to compare. This involves gross margins of error. Ideally, the RCE API should (also) refer to an address identifier available within the BAG.
* In order to query the system and related data collections in conjunction, APIs must refer to identifiers from the related object registry if those relationships exist. This is a problem that originates from the underlying data, the API is only an access to this.
* It must also be clear what the meaning of that relationship is. Sometimes, for example, an address is linked to an object for findability, while in that object several residential objects with addresses can occur. It cannot be concluded from this that only that one address is relevant.
* Organizing (establishing and managing) those relationships requires governance and budget!

## One and two-sided references and deviations
Data models impose limitations. For example, the BAG data model records that a residential object refers to a property, but a property does not refer to a residential object. However, the API does do this and therefore deviates from the data model. This makes the use of an API very specific.

### _Considerations for continuation_
* A relationship between two objects must always be retrievable in two directions.
* The semantic model must be so robust that any orchestration layer across APIs is kept as compact as possible.

## Structure of the API result
An API can return results in a structure that is different if the results are different. A concrete example of this is that if the result contains one instance, it is returned directly in the results, while a result with multiple instances is bundled by the same API in, for example, a JSON array. This creates a different structure.

Normally this is not necessarily a problem, but it was problematic when building the demonstrator. The results of an API are converted to a semantic format. This is done by means of a mapping. How the instances are bundled, i.e. how the result of an API is structured, must be processed in the mapping, otherwise it cannot be executed properly. If this structure can differ, this means a more extensive mapping.

### _Consideration for follow-up or inclusion in API strategy_
* It may be considered to include in the API strategy that an answer that may contain one or more results is always bundled, even if a specific question only yields one result. This keeps the semantic orchestration layer small and compact.

## Address details incomparable
Address data is in theory a promising fact to relate objects to each other, but this often proves difficult in practice. Address data is often used in the various data sets used in the demonstrator, but these are difficult to compare. Assuming that Kadaster uses the most complex model on address data (the BAG), this also seems to be the most accurate and therefore the most useful. An address consists of a number of facets (city, street, house number, house letter, addition). However, a large part of the datasets / APIs handle this data interchangeably. This makes it difficult to compare address data.

<aside class = "example">
The Cultural Heritage Agency of the Netherlands has no direct link with the BAG. Each monument contains an address. These address details can only partly be matched with the BAG. One cause of this is:

- The BAG describes a house letter and a house number addition.
- The RCE only has an addition, which often does not correspond to one of the two BAG fields.
</aside>

### _Consideration for continuation_
* In order to be able to query the system and related data collections in conjunction, objects in data sets must refer to identifiers from the related object registration if those relationships exist. Relationships based on descriptive elements such as a typed address should be excluded.

## System catalog not related to source
To discover the semantic relationship between the data of the different APIs, it is necessary to define in the semantic orchestration layer how data relates to each other. This is well done by the already existing system catalog.

Some of the data from basic registrations is also already available as semantic data at the source, i.e. Linked Data, including a semantic model. However, there is no relationship between the elements of the semantic model at the source and the equivalent elements in the system catalog. This makes it impossible to use the already existing system catalog as the basis for the orchestration layer and to request the already available semantic data and add it to the demonstrator. If there had been this semantic 'bridge' between the system catalog and already published semantic data, this could have considerably simplified the building of the demonstrator.

### _Consideration for continuation_
* The semantic relations of the coherent object registration (successor to the system catalog, at least for the geo-basic registrations) must always be related to the semantic model of the data sets. This is a relatively easy step to take to help keep the orchestration layer compact and manageable.

## What if data comes from multiple sources?
During the development of the DisGeo demonstrator, it was assumed that data about one object is provided by a single API. Data about a residence object will always come from the land registry. When this assumption becomes invalid, the problem arises that it is almost impossible to find out where a specific object has to be requested.

## What if data comes from multiple sources?
During the development of the DisGeo demonstrator, it was assumed that data about one object is provided by a single API. Data about a residence object will always come from the land registry. When this assumption becomes invalid, the problem arises that it is almost impossible to find out where a specific object has to be requested.

### _Consideration for continuation_
* Basic data should only be retrieved from the related object registration. This remains a starting point!

## Origin of data
In no case does an API provide metadata about the object. It is therefore impossible to validate the origin, timeliness, accuracy and reliability of data.

### _Considerations for follow-up or inclusion in API strategy_
* It must be investigated whether APIs can be made suitable for this.
* Linked data offers good opportunities for this.

## Configuration load
In order to be able to relate the APIs to each other, to convert the results of an API into a semantic format and to describe the API configuration, a huge configuration load is unavoidable. The limited APIs currently require more than 4000 rules of configuration. Maintenance of this configuration will also incur a reasonable burden.

We can expect the amount of APIs to become very large. In addition, there is increasing complexity per added API (no two APIs are the same).

Another drawback is that a semantic layer that you build in this way contains your own interpretation: after all, the semantics of the data in the API itself is often unknown, because it is not published.

The semantic layer must contain all the knowledge you want to question. This layer describes how the data in the system relates to each other; this is linked to which data is contained in which API. If you want to ask a broader question than the semantic layer covers, you must first add a piece to the semantic layer.

“The whole of knowledge” in this case consists of
- Basic registration h
- Other government datasets
- Free datasets

So ... an open world. Describing the whole of knowledge is not possible! The semantic orchestration layer must therefore be expandable.

### _Considerations for continuation_
* This argues extra for keeping the orchestration layer as compact as possible.
* The orchestration layer must be expandable.
* Linked data makes having an orchestration layer largely or completely unnecessary. Grow here in the long term

## Geographical question is characterized by missing relationship (and what to look for)
For questions with a geographical component, the demonstrator searches for objects that have no administrative relationship to each other: these objects must be within a certain radius of each other. This would be possible on all objects defined in the System Catalog, whose defined API supports geographic queries.

However, with a growing number of APIs, this would put a significant burden on performance. Requesting all properties within a certain radius, for example, also potentially yields a great deal of data, which in many cases is unlikely to answer the user's question. At this time, it has been decided to define in the configuration on which objects to be searched geographically from a specific starting object. This allows control to take place.

### _Considerations for continuation_
* Further research is needed into the balance between being able to search for everything and keeping the number of results manageable.
* Solution directions include building in targeted search patterns, filters or other ways to channel the number of search directions.

## Geographical relationship based on GeoSPARQl
Geographical data can easily be used in conjunction. Geographic data is in all cases offered in a geo-standard in the context of this demonstrator. This allows various tools and software libraries to easily handle geographic data. Tools that work semantically can also handle this data well because semantic (i.e. linked data-based) geostandards such as GeoSPARQL [[geosparql]] have been applied.

GeoSPARQL is an OGC standard that describes an extension of SPARQL [[rdf-sparql-query]], the default query language for Linked Data. GeoSPARQL also defines a basic vocabulary for geo data and can be used to indicate that an object is a geo object and to establish topological relationships between geo objects.

### _Consideration for continuation_
* That geographic data is provided in a geo standard is valuable, continue this way.
* Use GeoSPARQL when offering geographic data as linked data.
* In order for the (geo) basic registers to function in conjunction, it is necessary to progress to Linked Data. The growth path to this must be mapped out.