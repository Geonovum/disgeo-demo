# Research

## Global architecture
When conducting the research around the demonstrator, a conceptual framework has been defined in which the elaboration of the demonstrator has been tackled.
A number of principles have been identified:
- The application layer is completely separate from the data sources.
- The data is always accessed via an API. If a data source is not accessible via an API, a copy of the data source that does have an API is created in the demo environment.
- A data source ideally has a semantic layer API (JSON-LD). If not, it will not necessarily be solved in the demo environment, but noted as "lesson learned"
- If questions are asked about APIs, a provision will be created in an orchestration layer where necessary to serve these questions.
- When answering a user story, at least one object from the basic registrations is used.

![demonstrator_architectuur](media/architectuur.png)

## User Stories
A number of user stories have been defined focusing on the themes of Buildings and Roads. These user stories are divided into three categories with an increase in complexity:
1. Administrative relationship - Request data about a specific object across a number of data sets.
2. Spatial relationship - Request data about objects in the vicinity of a specific object.
3. Analysis - Request data based on multiple variables.

The user stories are described in the diagram below. In the demonstrator's research, these were taken up and the possibilities of current technologies were investigated.

![user_stories](media/userstories.png)

## Demonstrator
The demonstrator uses the system catalog of basic registrations. This describes the relationships between the various objects within the basic registrations. The demonstrator finds related related objects based on skos.
Datasets that are not described in the system catalog are added to a so-called extension. This extension contains the data that is not in the system catalog, but follows the same structure.

Which objects from the system catalog are supplied by which API is described in a configuration file. The configuration also describes how to convert the results of an API to [[JSON-LD]], a semantically rich format. CARML is used for this, developed partly by the Land Registry.

Web services for buildings (Accommodation objects) and roads have been added to the demonstrator. As input to the process, the URI is given for the type as it is in the system catalog (ie, the semantic definition). This is followed by the relationships to other objects and based on the configuration can be searched from API to API.

Geographical searching is done in a slightly different but comparable way. Geographical search creates a circle with a radius of 500 meters at the selected location or based on the location of an object. Geographical relationships in the extension to the system catalog determine which objects may be related geographically. This is done on the basis of geof: relate, a [[geosparql]] property. This prevents all objects within this radius from being searched. Ultimately, this would render the demonstrator unusable. The found objects are converted into linked data and linked to the start object with a geof: nearby relationship.

## Data sources
A number of data sources have been used for the user stories, which are shown in the picture below:

![databronnen](media/databronnen.png)

## Cooperation Land Registry regarding Knowledge Graph
In the context of this investigation, there was also collaboration with Kadaster. Kadaster is innovating and is researching new technologies to query data from Kadaster's data collections. One of those technologies is the development of a knowledge graph, which can be queried by means of a chatbot. Kadaster has developed a knowledge graph for the user story 'energy advisor'.

![samenwerking_Kadaster](media/samenwerkingkadaster.png)