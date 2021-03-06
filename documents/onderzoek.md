# Research

## Global architecture
When conducting the research around the demonstrator, a conceptual framework has been defined in which the elaboration of the demonstrator has been tackled.
A number of principles have been identified:
- The application layer is completely separate from the data sources.
- The data is always accessed via an API. If a data source is not accessible via an API, a copy of the data source that does have an API is created in the demo environment.
- A data source ideally has a semantic layer API (JSON-LD). If not, it will not necessarily be solved in the demo environment, but noted as "lesson learned"
- If questions are asked about APIs, a provision will be created in an orchestration layer where necessary to serve these questions.
- When implementing a user story, at least one object from the base registries is used.

![demonstrator_architectuur](media/architectuur.png)

## User Stories
A number of user stories have been defined focusing on the themes of Buildings and Roads. These user stories are divided into three categories with an increase in complexity:
1. Administrative relationship - Request data about a specific object across a number of data sets.
2. Spatial relationship - Request data about objects in the vicinity of a specific object.
3. Analysis - Request data based on multiple variables.

The user stories are described in the table below. They are listed in order of increasing complexity. In the demonstrator's research, these were implemented and the possibilities of current technologies were investigated.

| | Buildings | Roads |
|-|-----------|-------|
| Category 1: administrative relationships | _As an **energy advisor** I want_ data about e.g. the surface area, age / building year, functions, monumental status, value, maintenance status of a building, _so that I_ can give good advice about making this building more sustainable.| _As a **planner of heavy transport** I want_ data about e.g. vehicle type, travel direction, clearance height and width, the maximum load, speed and laws and regulations of this part of the road, _so that I_ know whether I can plan my route with this vehicle along this part of the road.|
| Category 2: spatial relationships |_As a **potential buyer of a home**, I want_ information about noise pollution, public green spaces, parking spaces, shops, risk objects, schools, coffee shops, _so that I_ know whether the surroundings of this home suit me.|_As an **emergency service**, I want_ information about (surface) water, schools, childcare locations, vital infrastructure in the vicinity of an incident on public roads with a dangerous substance, _so that I_ know which organizations I should warn.|
| Category 3: analysis |_As an **advisor for the living environment / spatial planning**, I want_ information about the accessibility / distance of basic facilities (public transport, schools, shops, health care) in a certain area or relative to the number of households and the age structure, _so that I_ know in which places I have to make which investments.|_As a **day tourist** with an electric car, I want_ to know where I can charge my car along my route and eat outside and specify my restaurant preferences (for example eating in a monumental building, eating with children) so that I can continue my route fully charged and with new energy.|

## Demonstrator
The demonstrator uses the data definition catalog of the base registries of base registries. This describes the relationships between the various objects within the base registries. The demonstrator finds related objects based on SKOS.
Datasets that are not described in the data definition catalog of the base registries are added to a so-called extension. This extension contains the data that is not in the data definition catalog of the base registries, but follows the same structure.

Which objects from the data definition catalog of the base registries are supplied by which API is described in a configuration file. The configuration also describes how to convert the results of an API to [[JSON-LD]], a semantically rich format. CARML is used for this, developed partly by the Land Registry.

Web services for buildings (residency objects) and roads have been added to the demonstrator. As input to the process, the URI is given for the type as it is in the data definition catalog of the base registries (ie, the semantic definition). This is followed by the relationships to other objects and based on the configuration can be searched from API to API.

Geospatial searching is done in a slightly different but comparable way. Geospatial search creates a circle with a radius of 500 meters at the selected location or based on the location of an object. Geospatial relationships in the extension to the data definition catalog of the base registries determine which objects may be related geographically. This is done on the basis of geof:relate, a [[geosparql]] property. This prevents all objects within this radius from being searched. Ultimately, this would render the demonstrator unusable. The returned objects are converted into linked data and linked to the start object with a geof:nearby relationship.

## Data sources
A number of data sources have been used for the user stories, which are shown in the picture below:

![databronnen](media/databronnen.png)

## Cooperation Land Registry regarding Knowledge Graph
In the context of this investigation, there was also collaboration with Kadaster. Kadaster is innovating and is researching new technologies to query data from Kadaster's data collections. One of those technologies is the development of a knowledge graph, which can be queried by means of a chatbot. Kadaster has developed a knowledge graph for the user story 'energy advisor'.

![samenwerking_Kadaster](media/samenwerkingkadaster.png)