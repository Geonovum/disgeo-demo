# Preface

## Purpose of the demonstrator
The Ministry of the Interior and Kingdom Relations started the project "Doorontwikkeling in Samenhang" (Continued Development in Cohesion, DiSGeo) with the aim to improve the coherence of the system of geospatial base registries, with a focus on semantic harmonization of registries and information models, and alternative methods of data exchange and updating (more central, less copying of data).
![samenhangende objectenregistratie informatiekundig](media/samenhangendeobjectenregistratieinformatiekundig.png)

After all, users usually do not think in data sets, but in data that is related to each other in various ways. In Dutch geospatial information models (all compliant to NEN3610, the Dutch standard for geo-information) and the system of base registries, data sets have been the principal focus so far. Information models are in a sense silos that only standardize the semantics of a particular sector, but are not modeled in conjunction with the information of other sectors. However, in reality this connection is actually there. Linked data is an extremely suitable technique for capturing this semantic coherence so that the data itself can also be integrated.

Once semantics have been (sufficiently) aligned, the next step is to publish the data in coherence, in a manner that is suitable for wide use. Searchable via search engines, usable for data users - the intermediaries: web/app developers, data scientists, data journalists etc. For end users, the data can be published in a suitable, accessible web viewer.

Geonovum carries out various activities in the context of the further development of the geospatial (base) registries, which are mainly aimed at semantic harmonization. One of these is the development of a demonstrator, showing the semantic connection of data and semantics in geospatial (base) registries using Linked Data for the themes of Buildings and Roads. Development takes place in a [github repository](https://github.com/Geonovum/disgeo-demo).

The aim of this demonstrator is to test and show to a wide audience how geospatial data can be published in an integrated way on the web. The demonstrator shows how additional information can be tied to general base registry objects, using semantic coherence. This allows information to be linked smartly - by recording that the information is, for example, about the same building, regardless of whether the information objects have the same geometry.

## Purpose of this document
During the development of the demonstrator, a lot of experience was gained with data from base registries and other government registries, with APIs and other web services, with semantics and cross-references between datasets. Before the system of government registries can be used and questioned together, there are still many steps to be taken.

The demonstrator's development has yielded valuable insights into issues concerning technology, semantics and governance, which are summarized in this Lessons Learned document. Chapter 2 summarizes the most important insights. Chapter 3 describes the design of the research in which the demonstrator was developed. Finally, Chapter 4 gives the complete overview of the lessons learned.
