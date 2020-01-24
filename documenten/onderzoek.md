# Onderzoek

## Globale architectuur
Bij het uitvoeren van het onderzoek rond de demonstrator is in de eerste plaats een denkkader gedefinieerd waarlangs de uitwerking van de demonstrator is aangepakt. 
Daarbij zijn een aantal principes benoemd:
De applicatielaag staat volledig los van de databronnen. 
-	De data wordt altijd via een API benaderd. Indien een databron niet via een API wordt ontsloten, wordt in de demo-omgeving een kopie van de databron aangemaakt die wel een API heeft. 
-	Een databron heeft idealiter een API met een semantische laag (JSON-LD). Als dat niet het geval is, wordt dat niet persé in de demo-omgeving opgelost, maar als ‘lesson learned’ genoteerd
-	Als er vragen over API’s heen worden gesteld dan wordt er waar nodig in een orchestratielaag een voorziening gerealiseerd waarmee deze vragen kunnen worden bediend.
-	Bij het beantwoorden van een user story wordt minimaal één object uit de basisregistraties gebruikt.

![demonstrator_architectuur](media/architectuur.png)

## User Stories
Er zijn een aantal userstories gedefinieerd gericht op de thema’s Gebouwen en Wegen. Deze userstories zijn in drie categorieën onderverdeeld met een toename in complexiteit:
1.	Administratieve relatie – Gegevens opvragen over een specifiek object over een aantal gegevensverzamelingen heen.
2.	Ruimtelijke relatie – Gegevens opvragen over objecten in de omgeving van een specifiek object
3.	Analyse – Gegevens opvragen op basis van meedere variabelen
In onderstaand schema zijn de userstories beschreven. In het onderzoek van de demonstrator zijn deze opgepakt en zijn de mogelijkheden van de huidige technologieën onderzocht.

![user_stories](media/userstories.png)

## Demonstrator
De demonstrator maakt gebruik van de stelselcatalogus basis registraties. Hierin staan de relaties beschreven tussen de verschillende objecten binnen de basisregistraties. De demonstrator vindt op basis van skos:related gerelateerde objecten.
Datasets die niet beschreven worden in de stelselcatalogus, worden toegevoegd aan een zogenaamde extensie. Deze extensie bevat de data die niet in de stelselcatalogus zit, maar volgt wel dezelfde structuur. 
Welke objecten uit de stelselcatalogus door welke API geleverd worden, is beschreven in een configuratie bestand. In de configuratie is daarnaast beschreven hoe dat de resultaten van een API omgezet moeten worden naar JSON-LD, dit een semantisch rijk formaat. Hiervoor wordt CARML gebruikt, ontwikkeld mede door het kadaster. 
In de demonstrator zijn webservices voor gebouwen (Verblijfsobjecten) en wegen toegevoegd. Als ingang in het proces wordt de URI voor het type meegegeven zoals deze in de stelselcatalogus staat. Hierop worden de relaties gevolgd naar andere objecten en op basis van de configuratie kan zo van API naar API gezocht worden. 
Geografisch zoeken gaat op een net iets andere maar vergelijkbare manier. Bij geografisch zoeken, wordt op de geselecteerde locatie of object een circkel gemaakt met een straal van 500 meter. Op basis van geografische relaties in de extensie op de stelselcatalogus wordt bepaald welke objecten geografisch gerelateerd mogen worden. Dit wordt op basis van geof:relate gedaan, een Geo-SPARQL property. Dit voorkomt dat alle objecten binnen deze straal gezocht worden. Uiteindelijk zou dit de demonstrator onbruikbaar maken. De gevonden objecten worden wederom omgezet naar linked data en gekoppeld aan het begin object met een geof:nearby relatie.

## Databronnen
Voor de user stories zijn een aantal databronnen gebruikt die in onderstaande plaat zijn weergegeven:

![databronnen](media/databronnen.png)

## Samenwerking Kadaster met betrekking tot Knowledge Graph
In dit kader is er ook samengewerkt met het Kadaster. Het Kadaster is innoverend bezig om nieuwe technologieën te onderzoeken om gegevens uit de gegevensverzamelingen van het Kadaster te bevragen. Een van die technologieën is het ontwikkelen van ene knowledge graph en ondermeer het bevragen van gegevens door middel van een chatbot. Het Kadaster heeft voor de user story 'energieadviseur' een knowledge graph ontwikkeld.

![samenwerking_Kadaster](media/samenwerkingkadaster.png)


