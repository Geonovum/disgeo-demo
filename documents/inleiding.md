# Preface

## Purpose of the demonstrator
The Ministry of the Interior and Kingdom Relations aims to improve the coherence of the system of geo (basic) registrations, with a focus on semantic harmonization of registrations and information models, and alternative methods of data exchange and updating (more central) with the Continued development in Cohesion (DiS Geo) process. , copy less).
! [coherent object registration information science] (media / coherent object registration information science.png)

After all, users usually do not think in data sets, but in data that is related to each other in various ways and can be combined. In the NEN3610 system and the system of basic registrations, data sets have so far been considered. Information models are in a sense silos that only standardize the semantics of a particular sector, but are not modeled in conjunction with the information of other sectors. However, this connection is actually there. Linked data is an extremely suitable technique for capturing this semantic coherence so that the data itself can also be integrated.

Once semantics have been (sufficiently) correlated, the next step is to publish the data in coherence, in a manner that is suitable for wide use. Searchable via search engines, usable for data users - the intermediaries: web / app developers, data scientists, data journalists etc. For end users, the data can be published in a suitable, accessible web viewer.

Geonovum carries out various activities in the context of the further development of the geo (basic) registrations, which are mainly aimed at semantic harmonization. One of these is the development of a demonstrator in the field of mutual semantic connection of data and semantics in geo (basic) registrations using Linked Data for the themes of Buildings and Roads. Development takes place in a [github repository] (https://github.com/Geonovum/disgeo-demo).

The aim of this demonstrator is to test and show to a wide audience how geodata can be published together on the web. The demonstrator shows how additional information can be tied to general basic objects, using semantic coherence. This allows information to be linked smartly - by recording that the information is, for example, about the same building, regardless of whether the information objects have the same geometry.

## Purpose of this document
During the development of the demonstrator, a lot of experience was gained with data from basic registrations and other government registrations, with APIs and other web services, with semantics and cross-references between datasets. Before the system of government registrations can be used and questioned together, there are still many steps to be taken.

The demonstrator's development has yielded valuable insights into engineering, semantics and governance issues, which are summarized in this Lessons Learned document. Chapter 2 summarizes the most important insights. Chapter 3 describes the design of the research in which the demonstrator was developed. Finally, Chapter 4 gives the complete overview of the lessons learned.
