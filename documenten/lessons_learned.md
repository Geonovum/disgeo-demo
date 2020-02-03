# Lessons learned uit de DisGeo linked data demonstrator

Dit hoofdstuk beschrijft de geleerde lessen uit het onderzoek. Terwijl de demonstrator werd ontwikkeld, hebben we de problemen waar we tegenaan liepen geregistreerd als [issues in github](https://github.com/Geonovum/disgeo-demo/issues). De lessen staan in dit hoofdstuk één voor één opgesomd zoals we ze zijn tegengekomen. Lees voor de samenvatting en conclusies [hoofdstuk 2](#samenvatting). 

## API beschikbaarheid, API bruikbaarheid en API compleetheid

### Beschikbaarheid

Aanvankelijk was de gedachte bij de start van het project, dat een ruime beschikbaarheid van APIs zou zorgen voor een brede beschikbaarheid van data. Het juist combineren van deze data zou een schat aan informatie opleveren.

Echter, uit de praktijk blijkt dat APIs (nog) niet ruim beschikbaar zijn. De BAG beschikt over een goed opgezette API die zowel relationele als geografische data biedt. De BAG API onderscheidt zich daar dan ook mee.

### Bruikbaarheid
Meer dan 80% van de gebruikte data wordt beschikbaar gesteld als kaartlaag (i.e. WMS(T) of WFS oude stijl, danwel een niet-gestandaardiseerde variant hiervan), die zich niet als API laat gebruiken. Daarbij is de BAG API de enige API die zich geografisch laat bevragen.

### Compleetheid
Daarnaast stelt een API niet per definitie *alle* data beschikbaar. De BAG API stelt bijvoorbeeld het gebruiksdoel van een verblijfsobject niet beschikbaar via de API.

### Maturiteit
Veel APIs scoren niet goed op (al) deze punten:

#### Checklist API Maturiteit

| # | Vraag | Verwijzing API Strategie | Verwijzing (Spatial) Data on the Web Best Practices |
| - | - | - | - |
| | **Documentatie** | | |
| 1 | Is er documentatie beschikbaar bij een API? | [7.1.14][1] | |
| 2 | Wordt er vanuit de API beschrijving en resultaten naar de documentatie gewezen? | [7.1.49][2] | [Metadata 8.2][3] |
| 3 | Verwijst de documentatie naar Stelsel Catalogus of andere datasets? | | | 
| 4 | Is er informatie over verandering en oorsprong van data? | | [Data provenance 8.4][4] |
| |
| | **API definitie** | | |
| 5 | Kan je query-parameters meegeven om te filteren? | [7.1.28][5] | |
| 6 | Bieden id's uit andere datasets een ingang in de API? | | [Data identifiers 8.7][6], [Spatial data identifiers 12.1.1][7] |
| 7 | Bevat de API alle benodige data/is de data compleet? | | |
| 8 | Kan je ruimtelijke vragen stellen? | [7.1.34][8] | |
| 9 | Communiceert de API de CRS van zijn ruimtelijke gegevens? | [7.1.37][9] | [Geometries and coordinate reference systems 12.2.2][10] |
| 10 | Wordt Geodata als GEOJSON aangeboden? | [7.1.32][11], [7.1.33][12] | |
| 11 | Worden open standaarden gebruikt voor het beschrijven van de API? | [7.1.14][1]| |
| 12 | Is er een data model beschikbaar? | | [Data Vocabularies 8.9][13] |
| |
| | **Retour formaat** | | |
| 13 | Is het retourformaat zelfbeschrijvend? | | |
| 14 | Biedt het retourformaat verwijzingen naar andere datasets? | | |
| 15 | Worden open standaarden voor het retourformaat en data gebruikt? | [7.1.26][14] | [Data Formats 8.8][15], [Spatial data encoding 12.2.1][16] |
| |
| | **API Gebruik** | | | |
| 16 | Stelt de API gebruiksvoorwaarden? | | [Data licenses 8.3][17] |
| 17 | Biedt de API caching? | [7.1.41][18] | |
| 18 | Stelt de API gebruiksbeperkende maatregelen? | [7.1.42][19], [7.1.43][20] | |

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

### _Overwegingen voor vervolg en API strategie_
* Op de huidige [pas-toe-of-leg-uit-lijst](https://www.forumstandaardisatie.nl/open-standaarden/lijst/verplicht) van Forum Standaardisatie staan nu de Nederlandse profielen van WMS 1.3 en WFS 2.0. Deze ‘verplichting’ staat een andere doorontwikkeling in de weg. De oplossing ligt in het vervangen van deze standaarden op de Lijst Open Standaarden door de nieuwe OGC API standaarden. WFS 2.0 kan al vervangen worden door OGC API - Features. Deze nieuwe OGC API standaarden zorgen voor een goede score op maturiteit.
* De checklist voor API-maturiteit zou een goede toevoeging zijn aan de Nederlandse API strategie [[NLAPIStrategie]].

## APIs en datasilo's
Op basis van een API bevraging komt bepaalde data terug. In een stelsel van data, die men in samenhang wil kunnen gebruiken, is het nodig dat de data verwijzingen naar andere objecten doet op basis van een uniek en persistent id. Op basis van dit principe kunnen we een generieke oplossing bedenken. 

Eén constatering ten aanzien van APIs lijkt te zijn dat, in ieder geval in de APIs die wij hebben onderzocht, een API gezien kan worden als data silo. De API deelt de data uit één silo en bevat veelal geen enkele relaties naar data (of een dataset) buiten de API. 

Gebruikelijk lijkt te zijn, dat als een API meerdere requests aanbiedt, het antwoord van de ene request verwijst naar een andere request binnen diezelfde API. Zo verwijst de data over een verblijfsobject naar de request binnen dezelfde API om bijbehorende pand data op te vragen. 

<aside class="example">
Voorbeeld: bevraging van een specifiek pand in de BAG API. 

Verwacht antwoord:

`"gerelateerdPand" : "1895100000022868",`

Daadwerkelijk antwoord:

`"gerelateerdPand" : "https://bag.basisregistraties.overheid.nl/api/v1/verblijfsobjecten?pandrelatering=1895100000022868&geldigOp=2019-10-22",`
</aside>

Dit is aan de ene kant handig, maar mocht je aan de hand van de verkregen BAG Pand id een *andere* registratie willen gaan bevragen, om meer informatie over dat pand op te halen, dan moet je als programmeur het id uit de API URL 'knippen', waarvoor kennis van de specifieke URL opbouw van deze API vereist is. Het is niet mogelijk om op generieke wijze een id uit een URL te knippen.

Om het stelsel, via APIs, in samenhang te kunnen bevragen, moet een API bovendien ook vragen kunnen beantwoorden op basis van identifiers uit andere, eraan gerelateerde datasets. 

<aside class="example">
Bijvoorbeeld: aan een NHR API vragen stellen op basis van een BAG Verblijfsobject identifier. 

- Vraag: Welke bedrijven zit er op dit adres? 
- Vertaald: API, geef mij alle `[NHR object]`en met dit `[BAG verblijfsobject id]` als adres.
</aside>

### Onderliggend probleem: ontbrekende verbindingen in de data

Een API kan natuurlijk niet méér aanbieden dan de databron die hij ontsluit. Als in de brondata geen verbindingen, links, zijn aangebracht tussen objecten uit deze dataset en objecten uit andere datasets, dan kan de API zulke verbindingen ook niet bieden. 

Het onderliggende probleem is dus dat de datasets deze links niet structureel vastleggen en beheren. Als datasets dit wel zouden doen, zouden de daarbovenop aanwezige APIs kunnen worden verbeterd om links tussen individuele objecten wel te gaan aanbieden en bevraagbaar te maken op een bruikbare manier. 

### _Overwegingen voor vervolg of voor opname in API-strategie_
* Om data uit de datasilo in samenhang beschikbaar te maken, zou er verwezen moeten worden naar identifiers. Hierdoor kan er generiek omgegaan worden met het ophalen van data van verschillende APIs. 
* Daarnaast zouden APIs moeten verwijzen naar identifiers van objecten uit andere APIs. Zo beschrijft de data van de Rijksdienst voor Cultureel Erfgoed (RCE) adressen op monumenten, maar deze zijn letterlijk ingevoerd in plaats van gekoppeld aan de BAG en laten zich daardoor lastig vergelijken. Dit brengt grove foutmarges met zich mee. Idealiter zou de RCE API (ook) verwijzen naar een adres identifier beschikbaar binnen de BAG.
* Om het stelsel en aanpalende gegevensverzamelingen in samenhang te kunnen bevragen moeten APIs verwijzen naar identifiers uit de samenhangende objectenregistratie als die relaties er zijn. Dit is overigens een probleem dat zijn oorsprong vindt in de onderliggende data, de API is slechts een ontsluiting hiervan.
* Het moet ook duidelijk zijn wat de betekenis is van die relatie. Soms wordt bijvoorbeeld aan een object een adres gerelateerd voor de vindbaarheid terwijl in dat object meerdere verblijfsobjecten met adressen kunnen voorkomen. Hieruit mag niet worden geconcludeerd dat alleen dat ene adres relevant is. 
* Voor het organiseren (leggen en beheren) van die relaties is governance en budget nodig!

## Eén en tweezijdige verwijzingen en afwijkingen
Datamodellen leggen beperkingen op. Zo legt bijvoorbeeld het BAG datamodel vast dat een verblijfsobject naar een pand verwijst, maar een pand niet naar een verblijfsobject. Echter de API doet dit wel en wijkt daarmee af van het datamodel. Dit maakt het gebruik van een API erg specifiek.

### _Overwegingen voor vervolg_
* Een relatie tussen twee objecten moet altijd in twee richtingen uitvraagbaar zijn. 
* Het semantisch model moet zo robuust zijn dat een eventuele orchestratielaag over APIs heen zo compact mogelijk wordt gehouden. 

## Structuur van het API resultaat
Een API kan resultaten teruggeven in een structuur die anders is als de resultaten anders zijn. Een concreet voorbeeld hiervan is, dat als het resultaat één instantie bevat deze direct wordt teruggegeven in de resultaten, terwijl een resultaat met meerdere instanties door dezelfde API wordt gebundeld in bijvoorbeeld een JSON array. Dit zorgt voor een andere structuur. 

Normaliter is dit niet persé een probleem, maar bij het bouwen van de demonstrator was dit wel problematisch. De resultaten van een API worden omgezet naar een semantisch formaat. Dit wordt gedaan door middel van een mapping. Hoe de instanties gebundeld worden, i.e. hoe het resultaat van een API gestructureerd is, moet in de mapping verwerkt worden, anders kan deze niet goed uitgevoerd worden. ALs deze structuur kan verschillen betekent dit een uitgebreidere mapping.

### _Overweging voor vervolg of voor opname in API-strategie_
* Er kan overwogen worden om in de API-strategie op te nemen dat een antwoord dat één of meer resultaten kan bevatten altijd een bundeling is, ook in het geval dat een specifieke vraag maar één resultaat oplevert. Hiermee wordt de semantische orchestratielaag klein en compact gehouden. 

## Adresgegevens onvergelijkbaar
Adresgegevens zijn in theorie een veelbelovend gegeven om objecten aan elkaar te relateren, maar dit blijkt in de praktijk vaak lastig. In de verschillende datasets die in de demonstrator zijn gebruikt worden vaak adresgegevens gebruikt, echter laten deze zich moeilijk vergelijken. Aannemende dat het Kadaster het meest complexe model op adresgegevens hanteert (de BAG) lijkt dit ook de meest nauwkeurige en daardoor meest bruikbare. Een adres bestaat uit een aantal facetten (woonplaats, straat, huisnummer, huisletter, toevoeging). Echter een groot deel van de datasets/APIs hanteren deze gegevens door elkaar. Hierdoor is het lastig om adresdata te vergelijken. 

<aside class="example">
De Rijksdienst Cultureel Erfgoed heeft geen directe koppeling met de BAG. Elk monument bevat een adres. Deze adresgegevens zijn maar voor een deel te matchen met de BAG. Een oorzaak hiervan is:

- De BAG beschrijft een huisletter en een huisnummer toevoeging.
- De RCE kent enkel een toevoeging, die vaak niet met een van de twee BAG velden overeen komt.
</aside>

### _Overweging voor vervolg
* Om het stelsel en aanpalende gegevensverzamelingen in samenhang te kunnen bevragen moeten objecten in datasets verwijzen naar identifiers uit de samenhangende objectenregistratie als die relaties er zijn. Relaties op basis van beschrijvende elementen zoals een ingetypt adres moeten worden uitgesloten. 

## Stelselcatalogus geen relatie met bron
Om de semantische relatie tussen de data van de verschillende APIs te ontdekken, moet in de semantische orchestratielaag gedefinieerd worden hoe data zich tot elkaar verhoudt. Dit wordt prima gedaan door de al bestaande stelselcatalogus. 

Een deel van de data uit basisregistraties is ook al beschikbaar als semantische data bij de bron, i.e. Linked Data, inclusief een semantisch model. Echter is er geen relatie tussen de elementen van het semantisch model bij de bron en de equivalente elementen in de stelselcatalogus. Hierdoor is het onmogelijk om de al bestaande stelselcatalogus te gebruiken als basis voor de orchestratielaag en hiermee de reeds beschikbare semantische data op te vragen en aan de demonstrator toe te voegen. Als deze semantische 'brug' tussen de stelselcatalogus en al gepubliceerde semantische data er al was geweest, had dit het bouwen van de demonstrator aanzienlijk kunnen vereenvoudigen.

### _Overweging voor vervolg_ 
* De semantische relaties van de samenhangende objectenregistratie (opvolger van de stelselcatalogus, in ieder geval voor de geo-basisregistraties) moeten altijd gerelateerd zijn aan het semantische model van de datasets. Dit is een relatief eenvoudig te zetten stap die helpt om de orchestratielaag compact en  beheersbaar te houden. 

## Wat als data van meerdere bronnen komt?
Tijdens het ontwikkelen van de DisGeo demonstrator is de aanname gedaan dat data over één object geleverd wordt door één enkele API. Data omtrent een verblijfsobject zal altijd van het kadaster komen. Op het moment data deze aanname ongeldig wordt, treedt het probleem op dat het haast onmogelijk is om te achterhalen waar een bepaald object opgevraagd moet worden.

### _Overweging voor vervolg_ 
* Basisgegevens moeten enkel en alleen bij de samenhangende objectenregistratie worden opgehaald. Dit blijft een uitgangspunt!

## Herkomst van data
Een API biedt in geen van de gevallen metadata over het object. Het is daardoor onmogelijk om de herkomst, actualiteit, nauwkeurigheid en betrouwbaarheid van data te valideren. 

### _Overwegingen voor vervolg of voor opname in API-strategie_
* Onderzocht moet worden of APIs hiervoor geschikt te maken zijn.
* Linked data biedt hiervoor goed de mogelijkheid.

## Configuratielast
Om de APIs aan elkaar te kunnen relateren, de resultaten van een API om te zetten in een semantisch formaat en om de API configuratie te beschrijven is een enorme configuratielast onontkoombaar. Voor de beperkte APIs op dit moment is er al ruim 4000 regels aan configuratie nodig. Ook het onderhoud van deze configuratie zal een redelijke last met zich mee brengen.

We kunnen verwachten dat de hoeveelheid APIs erg groot wordt. Bovendien is er sprake van toenemende complexiteit per toegevoegde API (geen twee APIs zijn hetzelfde). 

Een ander nadeel is dat een semantische laag die je op deze manier bouwt, eigen interpretatie bevat: de semantiek van de data in de API zelf is vaak immers niet bekend, want niet gepubliceerd.

De semantische laag moet het geheel aan kennis bevatten dat je wilt bevragen. Deze laag beschrijft hoe de data in het stelsel zich tot elkaar verhoudt; hieraan wordt gekoppeld welke data in welke API zit. Wie een bredere vraag wil stellen dan de semantische laag afdekt, moet eerst een stukje aan de semantische laag toevoegen. 

“het geheel aan kennis” bestaat in dit geval uit 
- Basisregistraties
- Andere overheidsdatasets
- Vrije datasets

Dus … een open wereld. Het geheel aan kennis beschrijven is niet mogelijk! De semantische orchestratielaag moet daarmee uitbreidbaar zijn.

### _Overwegingen voor vervolg_
* Dit pleit er extra voor de orchestratielaag zo compact mogelijk te houden.
* De orchestratielaag moet uitbreidbaar zijn.
* Linked data maakt het hebben van een orchestratielaag grotendeels of geheel overbodig. Op termijn hiernaartoe groeien 

## Geografische vraag kenmerkt zich door missende relatie (en waar naar te zoeken)
Bij vragen met een geografische component gaat de demonstrator op zoek naar objecten die geen administratieve relatie hebben tot elkaar: deze objecten moet binnen een bepaalde straal van elkaar liggen. Dit zou mogelijk zijn op alle objecten die gedefinieerd zijn in de Stelselcatalogus, waarvan de gedefinieerde API geografische zoekvragen ondersteunt. 

Bij een groeiend aantal APIs zou dit echter een flinke belasting op de performance betekenen. Het opvragen van bijvoorbeeld alle panden binnen een bepaalde straal levert bovendien in potentie ontzettend veel data op, die in veel gevallen waarschijnlijk niet de vraag van de gebruiker zal beantwoorden. Op dit moment is gekozen om in de configuratie vast te leggen op welke objecten geografisch gezocht moeten worden vanuit een bepaald start object. Hierdoor kan er sturing plaats vinden.

### _Overwegingen voor vervolg_
* Nader onderzoek is nodig naar wat de balans is tussen op alles te kunnen zoeken en het aantal resultaten hanteerbaar te houden. 
* Oplossingsrichtingen zijn bijvoorbeeld het inbouwen van gerichte zoekpatronen, filters of andere manieren om het aantal zoekrichtingen te kanaliseren.

## Geografische relatie obv GeoSPARQl
Geografische data laten zich makkelijk in samenhang gebruiken. Geografische data worden in het kader van deze demonstrator in alle gevallen aangeboden in een geo-standaard. Hierdoor kunnen verschillende tools en softwarebibliotheken eenvoudig omgaan met geografische data. Ook tools die semantisch werken kunnen goed met deze data omgaan doordat semantische (i.e. op Linked Data gebaseerde) geostandaarden zoals GeoSPARQL [[geosparql]] zijn toegepast. 

GeoSPARQL is een OGC standaard die een extensie beschrijft van SPARQL[[rdf-sparql-query]], de standaard querytaal voor Linked Data. GeoSPARQL definieert ook een basisvocabulaire voor geodata en kan worden gebruikt om aan te duiden dat een object een geo-object is en om topologische relaties tussen geo-objecten te leggen. 

### _Overweging voor vervolg_
* Dat geografische data worden aangeboden in een geo-standaard is waardevol, op deze weg blijven doorgaan.
* Gebruik GeoSPARQL bij het aanbieden van geografische data als linked data.
* Om de (geo)basisregistraties in samenhang te laten functioneren, is het nodig om door te groeien naar Linked Data. Het groeipad hiernaartoe moet worden uitgestippeld.