# Resume

## APIs are the new silos…
APIs (and in this document we mean more specifically the current REST APIs, as defined in the [[NLAPIStrategie]]) are intended for asking frequently asked questions or carrying out frequently requested actions on data. They are therefore by definition limited in data model and functionality. This is useful in many cases, because the API is focused on dealing with common questions quickly and easily.

But...
- What if you don't have a frequently asked question, but a less common one?
- What if the data in the answer doesn't contain the one property you need?
- What if the data does not support geospatial questions, while you want to know which other objects are close to an object?

The data in APIs often has no links to data in other APIs. Each API is basically a silo, which is limited to answering questions about a single data set.

<aside class = "example">
The Cultural Heritage Agency of the Netherlands (RCE) has no direct link to the BAG (the buildings and addresses base registry) , but each monument contains an address. However, the address details are difficult to compare:
- The BAG describes a ``houseletter``  and a ``housenumberaddition``.
- The RCE only has an ``addition``, which often does not correspond to one of the two BAG fields.
</aside>

## Silos in conjunction?
How do you ask coherent questions across this multitude of silo APIs?

It is possible, as the developed demonstrator shows, to build a semantic layer across multiple APIs, but it requires specific code per API and maintenance for each API change.

We can expect the amount of APIs to become very large. Moreover, there is increasing complexity per added API (no 2 APIs are the same).

### Semantic layer
The semantic layer must contain all the knowledge you want to question. If you want to ask a broader question, you first have to add a bit to the semantic layer.

In this case "the whole of knowledge" consists of
- base registries
- Other government datasets
- Free datasets

So… an **open world**. Describing the whole of knowledge is not possible! The semantic orchestration layer must therefore be **expandable**.

The semantic layer describes how the data in the system relates to each other. This description contains both the meaning of the data and its coherence with other data, as well as the knowledge about which data is in which API and how you approach that API.

The data definition catalog of the base registries could theoretically be used for this, provided it is integrated with the actual definitions of semantic models such as that of the BAG, which is available as linked data.

## Consistency at data level
The data in APIs often has no links to data in other APIs. This is a problem of the underlying data: the references between individual objects, from different datasets, are still missing.

In order to query the system (via APIs) in conjunction, it is necessary that

1. References *between* datasets are created,
2. APIs can also return identifiers from associated base registries.

For example: asking questions to an NHR API based on a BAG residency object identifier.

<aside class = "example">

**Question**: Which company is located at this address?

**Translated**: API, give me the NHR (the base registry containing chamber of commerce data) object with [BAG residence object id] as address.

</aside>

Thus, references, **links**, must be made at the data instance level - from one object to another, where the objects are in different registries.

These links can best be expressed in the form of URIs, in accordance with a national agreement such as the URI strategy [[NLURIStrategie]]; based on identifiers from the base registries.

Also in APIs links should be expressed in a uniform manner. A rule for this can be included in the API strategy for the Dutch government [[NLAPIStrategie]].

## Ownership of data
How can you see from an API / the data from an API from whom the data comes?
Due to the lack of a semantic layer [[JSON-LD]] on most APIs, it is not clear after data retrieval what the data means and who owns it. For questions answered by aggregating results from different APIs, the answer does not identify who owns which part of the answer.

<aside class = "example">

**Question**: Which Monument has the largest surface

**Answer**: Monument Status comes from 1 dataset, the surface from another. This cannot be derived from the current API answers.

</aside>

## Governance at the cutting edge
Earlier we wrote that technical agreements have to be made for the creation of references or **links** at the data instance level, from one object to another, also between objects from different registries.

Apart from the technology, there is also an essential organizational question here:

"**Who is responsible for adding and managing the links between datasets**?"

These links are a basic condition for coherence. However, this responsibility for creating and managing it is not yet felt and the links have often not yet been added. This can be traced directly to the assignment that the different data owners have, even within organizations. For example, there is no formal link between parcels and buildings, as the relevant departments within Kadaster do not have the task of maintaining this link, and therefore do not have the time and budget available to realize this. The management of these links must therefore be supported with policy, and therefore budget. Although there is already a *duty* to [ensure the correctness of that data when using data from the base registries](https://www.digitaleoverheid.nl/overzicht-van-alle-onderwerpen/gegevens/naar-een-gegevenslandschap/themas/twaalf-eisen-stelsel-van-basisregistraties/) it is not monitored.

An important element of this governance is that the level at which these links are maintained warrants careful consideration. It is recommended that this be as close as possible to the data owner. For example, let municipalities ensure the correct link between new buildings and cadastral parcels. Although the final data is published by the land registry, the maintenance is then carried out close to the origin of the links.

In addition to the actual creation of the links, the semantic interpretation of this link is also an important subject that must be addressed. The current modeling of data within the *own silo* provides a certain freedom in modeling. However, when reference is made to data from other registries, governance about the meaning of this reference is also necessary.

There is currently no uniform way to have external data refer to an object in base registries. If, for example, reference is made to a BAG property when publishing a dataset, there is no indication of how this link should be labeled. As a result, it is now difficult with the external dataset to directly understand which dataset they are referring to.

A possible solution for this is a standardized name for the reference, for example, ``relatedBAGBuilding``.

## The 5-Star model for Open Data
A step-by-step plan to address some of the aforementioned issues is the **5 star Open Data** model, with each addition of attributes assigned to the published data.
1. Available on the web, with an open license
2. Data is machine readable and contains an open license
3. The dataset is available in an open file format
4. The above + use open standards of the W3C [[JSON-LD]] to identify objects in the data so that others can refer to those objects.
5. The above + link your data to data of others, this creates coherence between data sets.

Considering this, current APIs are no more than 3 star data - the data is available on the web with an open license, is machine-readable, and is available in an open format. The only Dutch open government (geo) data that has four stars is Kadaster Linked Data via PDOK. Five star geospatial data is not there yet!

## Conclusions and recommendations

The starting point of the research was to build a demonstrator on top of APIs. But it turns out there are some problems.

### API versus knowledge graph

The majority of open geospatial data is made available as a map layer, which cannot be used as an API. There was only one API that scored well enough on the [maturity checklist](# maturity) to be useful. The rest of the data used in the demonstrator was published in its own API during the project.

*Recommendation*: Replace the Dutch profiles of WMS 1.3 and WFS 2.0 on the Open Standards List with the new OGC API standards. WFS 2.0 can already be replaced by [OGC API - Features](https://www.opengeospatial.org/standards/ogcapi-features). These new OGC API standards ensure a good score on maturity.

*Recommendation*: Add a checklist API maturity to the [[NLAPIStrategie]] and make sure that APIs meet this as much as possible.

A set of standalone APIs can be made suitable for coherent querying across the APIs by implementing a semantic orchestration layer on top. This would be easier if we had a set of APIs that score well on maturity. However, this semantic orchestration layer requires a lot of extra code and maintenance. It would be better to have an infrastructure of one or more “knowledge graphs” in which the data is available and queryable in conjunction. The coherence is then regulated in the data layer. In addition, APIs can act as easy access to the data. For the more advanced applications and questions where coherence is essential, the knowledge graph can be directly accessed via SPARQL.

*Recommendation*: Make sure APIs meet the maturity check. In addition, do not bet fully on APIs alone. To achieve the goals of DisGeo, work towards an infrastructure of one or more “knowledge graphs” (linked data).

### Consistency between objects

Data sets are usually not linked in current practice. For example, many registries, instead of a BAG identifier, still contain fields where addresses are included as text. These addresses do not match 100% with the BAG.

In order to be able to query the object registries in a coherent manner, it is a *basic condition* that the data sets at the level of individual objects are linked together using identifiers. Preferably these are included in the form of URIs.

*Recommendation*: Arrange governance for the one-time creation and subsequent management of these links - this costs time and money.

*Recommendation*: Arrange governance over the semantics of the connections.

*Recommendation*: Establish agreements on the formation and management of URIs in a national URI strategy or broader linked data strategy, based on the [[NLURIStrategie]] that already provides a starting point for this.

*Recommendation*: Require APIs to refer to identifiers from the related object registry if those relationships exist. In these cases, have the URIs included in the related object registration in Linked Data.

### Best Practices for Data Publication

Internationally, mostly supported by the EU, a lot of work has already been done on drawing up and documenting Best Practices for data publication [[DWBP]] [[SDW-BP]], the maturity table in chapter 4 is based on this . The [[NLAPIStrategie]] also refers explicitly to this. The use of these Best Practices saves a lot of work in setting new standards and agreements.

*Recommendation*: Copy the available Best Practices into relevant documents.

*Recommendation*: Take as a starting point in a system of related registries **5 Star Open Data**. The absence of the 5th star automatically implies the lack of coherence.