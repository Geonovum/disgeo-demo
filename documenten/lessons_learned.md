# Lessons learned uit de DisGeo linked data demonstrator
 
(Op basis van [deze github issues](https://github.com/Geonovum/disgeo-demo/issues))

## 1: API beschikbaarheid, API bruikbaarheid en API compleetheid

### Beschikbaarheid

Aanvankelijk was de gedachte bij de start van het project, dat een ruime beschikbaarheid van APIs zou zorgen voor een brede beschikbaarheid van data. Het juist combineren van deze data zou een schat aan informatie opleveren.

Echter, uit de praktijk blijkt dat APIs niet ruim beschikbaar zijn. De BAG beschikt over een goed opgezette API die zowel relationele als geografische data biedt. De BAG API onderscheidt zich daar dan ook mee.

### Bruikbaarheid
Meer dan 80% van de gebruikte data wordt beschikbaar gesteld als kaartlaag, die zich niet als API laat gebruiken. Daarbij is de BAG API ook de enige API die zich geografisch laat bevragen.

### Compleetheid
Daarnaast stelt een API niet per definitie alle data beschikbaar. De BAG API stelt bijvoorbeeld het gebruiksdoel van een verblijfsobject niet beschikbaar via de API.

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
* Op de huidige [pas-toe-of-leg-uit-lijst](https://www.forumstandaardisatie.nl/open-standaarden/lijst/verplicht) van Forum Standaardisatie staan nu de Nederlandse profielen van WMS 1.3 en WFS 2.0. Deze ‘verplichting’ staat een andere doorontwikkeling in de weg. Dit zou op een bepaald moment van de lijst af moeten.
* In plaats daarvan zou op de lijst APIs moeten staan en/of Linked Data.
* Een deel van de oplossing ligt in het zodanig vernieuwen van de versies van WMS en WFS dat deze als API functioneren. Voor WFS is met WFS 3.0 dit al mogelijk, voor WMS wordt aan een nieuwe versie gewerkt. 
* Een checklist voor API-maturiteit zou aan de API strategie kunnen worden toegevoegd.

## 2: API als datasilo
Op basis van een API bevraging komt bepaalde data terug. 
De verwachting is dat de data verwijzingen naar andere objecten doet op basis van een id. Op basis van dit principe kunnen we een generieke oplossing bedenken. 

Eén constatering ten aanzien van APIs lijkt te zijn dat een API gezien kan worden als data silo. De API deelt de data uit de silo en bevat veelal geen enkele relatie naar data (of een dataset) buiten de API. 

Gebruikelijk lijkt te zijn, dat als een API meerdere requests aanbiedt, het antwoord van de ene request verwijst naar een andere request binnen diezelfde API. Zo verwijst de data over een verblijfsobject naar de API request om pand data op te vragen. 

Voorbeeld: bevraging van een specifiek pand in de BAG API. 

Verwacht antwoord:

`"verblijfsobject" : "1895100000022868",`

Daadwerkelijk antwoord:

`"verblijfsobject" : "https://bag.basisregistraties.overheid.nl/api/v1/verblijfsobjecten?pandrelatering=1895100000022868&geldigOp=2019-10-22",`

Om het stelsel, via APIs, in samenhang te kunnen bevragen, moet een API bovendien ook vragen kunnen beantwoorden op basis van identifiers uit andere, eraan gerelateerde datasets. 

Bijvoorbeeld: aan een NHR API vragen stellen op basis van een BAG Verblijfsobject identifier. 
- Vraag: Welke bedrijven zit er op dit adres? 
- Vertaald: API, geef mij alle `[NHR object]`en met dit `[BAG verblijfsobject id]` als adres.

### _Overwegingen voor vervolg of voor opname in API-strategie_
* Om data uit de datasilo in samenhang beschikbaar te maken, zou er verwezen moeten worden naar identifiers. Hierdoor kan er generiek omgegaan worden met het ophalen van data van verschillende APIs. 
* Daarnaast zouden APIs kunnen verwijzen naar identifiers van andere APIs. Zo beschrijft de data van de Rijksdienst voor Cultureel Erfgoed (RCE) adressen op monumenten, maar deze laten zich lastig vergelijken en brengt grove foutmarges met zich mee. Idealiter zou de RCE API (ook) verwijzen naar een adres identifier beschikbaar binnen het BAG.
* Om het stelsel en aanpalende gegevensverzamelingen in samenhang te kunnen bevragen moeten APIs verwijzen naar identifiers uit de samenhangende objectenregistratie als die relaties er zijn.
* Het moet ook duidelijk zijn wat de betekenis is van die relatie. Soms wordt bijvoorbeeld aan een object een adres gerelateerd voor de vindbaarheid terwijl in dat object meerdere verblijfsobjecten met adressen kunnen voorkomen. Hieruit mag niet worden geconcludeerd dat alleen dat ene adres relevant is. 
* Voor het organiseren (leggen en beheren) van die relaties is governance en budget nodig!

## 3: Eén en tweezijdige verwijzingen en afwijkingen
Datamodellen leggen beperkingen op. Zo legt bijvoorbeeld het BAG datamodel vast dat een verblijfsobject naar een pand verwijst, maar een pand niet naar een verblijfsobject. Echter de API doet dit wel en wijkt daarmee af van het datamodel. Dit maakt het gebruik van een API erg specifiek.

### _Overwegingen voor vervolg_
* Een relatie tussen twee objecten moet altijd in twee richtingen uitvraagbaar zijn. 
* Het semantisch model moet zo robuust zijn dat een eventuele orchestratielaag over APIs heen zo compact mogelijk wordt gehouden. 

## 4: Wisselende API resultaten
Een API kan wisselende resultaten teruggeven. Een veelvoorkomende situatie is het teruggeven van één of meerdere resultaten. Dit houdt bijvoorbeeld in, dat als het resultaat één instantie bevat deze direct wordt teruggegeven in de resultaten. Echter als het resultaat meerdere instanties teruggeeft, worden deze gebundeld in bijvoorbeeld een JSON array. 

Normaliter is dit niet persé een probleem. In dit project vormt dit wel een probleem. De resultaten van een API worden omgezet naar een semantisch formaat. Dit wordt gedaan door middel van een mapping. Hoe de instanties gebundeld worden, moet in de mapping verwerkt worden, anders kan deze niet goed uitgevoerd worden. 

### _Overweging voor vervolg of voor opname in API-strategie_
* Er kan overwogen worden om in de API-strategie op te nemen dat een antwoord dat één of meer resultaten kan bevatten altijd een bundeling is, ook als het slechts één resultaat is. Hiermee wordt de orchestratielaag klein en compact gehouden. 

## 5: Adresgegevens onvergelijkbaar
Adresgegevens blijken moeilijke gegevens te zijn. In de verschillende datasets worden adresgegevens gebruikt, echter laten deze zich moeilijk vergelijken. Aannemende dat het Kadaster het meest complexe model op adresgegevens hanteert lijkt dit ook de meest nauwkeurige en daardoor meest bruikbare. Een adres bestaat uit een aantal facetten (woonplaats, straat, huisnummer, huisletter, toevoeging). Echter een groot deel van de datasets/APIs hanteren deze data door elkaar. Hierdoor is het lastig om adresdata te vergelijken. 

### VOORBEELD

De RCE heeft geen directe koppeling met de BAG, wel bevat elk monument een adres. Echter laten de adres gegevens zich moeilijk vergelijken:
- De BAG beschrijft een huisletter en een huisnummer toevoeging.
- De RCE kent enkel een toevoeging, die vaak niet met een van de twee BAG velden overeen komt.


### _Overweging voor vervolg of voor opname in API-strategie_
* Wederom: Om het stelsel en aanpalende gegevensverzamelingen in samenhang te kunnen bevragen moeten APIs verwijzen naar identifiers uit de samenhangende objectenregistratie als die relaties er zijn. Relaties op basis van beschrijvende elementen zoals adres moeten worden uitgesloten. 

## 6.: Stelselcatalogus geen relatie met bron
Om de semantische relatie tussen de data van de verschillende APIs te ontdekken, moet in de semantische orchestratielaag gedefinieerd worden hoe data zich tot elkaar verhoudt. Dit wordt prima gedaan door de al bestaande stelselcatalogus. Deze catalogus bevat enkel de basisregistraties, maar dezelfde structuur wordt in de orchestratielaag van de demonstrator ook toegepast op de registraties die hier niet in zitten.

Een deel van de data is ook al beschikbaar als semantische data bij de bron, i.e. Linked Data. Echter is er geen relatie tussen de semantische relaties bij de bron en de equivalente relaties in de stelselcatalogus. Hierdoor is het onmogelijk om de orchestratielaag te gebruiken om de  reeds semantische data op te vragen en aan de demonstrator toe te voegen.

### _Overweging voor vervolg_ 
* De semantische relaties van de samenhangende objectenregistratie (opvolger van de stelselcatalogus, in ieder geval voor de geo-basisregistraties) moeten altijd gerelateerd zijn aan het semantische model van de datasets.

## 7: Wat als data van meerdere bronnen komt?
Tijdens het ontwikkelen van de DisGeo demonstrator is de aanname gedaan dat data over één object geleverd wordt door één enkele API. Data omtrent een verblijfsobject zal altijd van het kadaster komen. Op het moment data deze aanname ongeldig wordt, treedt het probleem op dat het haast onmogelijk is om te achterhalen waar een bepaald object opgevraagd moet worden.

### _Overweging voor vervolg_ 
* Basisgegevens moeten enkel en alleen bij de samenhangende objectenregistratie worden opgehaald. Dit blijft een uitgangspunt!

## 8: Herkomst van data
Een API biedt in geen van de gevallen metadata over het object. Het is daardoor onmogelijk om de actualiteit, nauwkeurigheid en betrouwbaarheid van data te valideren. 

### _Overwegingen voor vervolg of voor opname in API-strategie_
* Onderzocht moet worden of APIs hiervoor geschikt te maken zijn.
* Linked data biedt hiervoor goed de mogelijkheid.

## 9: Configuratielast
Om de APIs aan elkaar te kunnen relateren, de resultaten van een API om te zetten in een semantisch formaat en om de API configuratie te beschrijven is een enorme configuratielast onontkoombaar. Voor de beperkte APIs op dit moment is er al ruim 4000 regels aan configuratie nodig. Ook het onderhoud van deze configuratie zal een redelijke last met zich mee brengen.

We kunnen verwachten dat de hoeveelheid APIs erg groot wordt. Bovendien is er sprake van toenemende complexiteit per toegevoegde API (geen 2 APIs zijn hetzelfde). 

Een ander nadeel is dat een semantische laag die je op deze manier bouwt, eigen interpretatie bevat: de semantiek van de data in de API zelf is vaak immers niet bekend.

De semantische laag moet het geheel aan kennis bevatten dat je wilt bevragen. Deze laag beschrijft hoe de data in het stelsel zich tot elkaar verhoudt; hieraan wordt gekoppeld welke data in welke API zit. Wie een bredere vraag wil stellen dan de semantische laag afdekt, moet eerst een stukje aan de semantische laag toevoegen. 

“het geheel aan kennis” bestaat in dit geval uit 
- Basisregistraties
- Andere overheidsdatasets
- Vrije datasets

Dus … een open wereld. Het geheel aan kennis beschrijven is niet mogelijk! De semantische orchestratielaag moet daarmee uitbreidbaar zijn.

### _Overwegingen voor vervolg_
* Dit pleit er extra voor de orchestratielaag zo compact mogelijk te houden.
* De orchestratielaag moet uitbreidbaar zijn.
* NB Linked data maakt dit helemaal overbodig !!!

## 10: Geografische vraag kenmerkt zich door missende relatie (en waar naar te zoeken)
Bij vragen met een geografische component gaat de demonstrator op zoek naar objecten die geen administratieve relatie hebben tot elkaar: deze objecten moet binnen een bepaalde straal van elkaar liggen. Echter zou dit mogelijk zijn op alle objecten die gedefinieerd zijn in de Stelselcatalogus waarvan de gedefinieerde API geografische zoekvfragen ondersteunt. 

Dit zou echter betekenen dat met een groeiend aantal APIs dit een flinke belasting op de performance wordt. Daarnaast betekent dit, dat bijvoorbeeld alle panden worden opgevraagd in een bepaalde straal. Dit levert ontzettend veel data op, die in veel gevallen waarschijnlijk niet de vraag van de gebruiker zal beantwoorden. Op dit moment is gekozen om in de configuratie vast te leggen op welke objecten geografisch gezocht moeten worden vanuit een bepaald start object. Hierdoor kan er sturing plaats vinden.

### _Overwegingen voor vervolg_
* Hier moet nog nader onderzoek naar worden gedaan naar wat de balans is tussen op alles te kunnen zoeken en het aantal resultaten behapbaar te houden. 
* Oplossingsrichtingen zijn bijvoorbeeld het inbouwen van gerichte zoekpatronen  / manieren om het aantal zoekrichtingen te kanaliseren.

## 11: Geografische relatie obv GeoSPARQl
Geografische data laten zich makkelijk in samenhang gebruiken. Geografische data worden in het kader van deze demonstrator in alle gevallen aangeboden in een geo-standaard. Hierdoor kunnen verschillende tools en libraries eenvoudig omgaan met geografische data ongeacht de standaard die toegepast is. Ook tools die semantisch werken kunnen goed met deze data omgaan om dat het eenvoudig te gebruiken is met semantische geostandaarden zoals GeoSPARQL. 

### _Overweging voor vervolg_
* Dit is waardevol, op deze weg blijven doorgaan.