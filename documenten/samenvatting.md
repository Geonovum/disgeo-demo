# Samenvatting

## APIs zijn de nieuwe silo’s…
Ze zijn bedoeld voor het stellen van veelgestelde vragen of het doen van veelgevraagde acties op data. 

Per definitie gelimiteerd in datamodel en functionaliteit: 
- Wat als je geen veelgestelde vraag hebt, maar een minder vaak voorkomende? 
- Wat als de data in het antwoord niet dat ene gegeven bevat dat je nodig hebt?
- Wat als de data geen geo-vragen ondersteunt, terwijl je wilt weten welke andere objecten bij een object in de buurt liggen?

De data in APIs heeft veelal geen links naar data in andere APIs.

<aside class="example">
De RCE heeft geen directe koppeling met de BAG, wel bevat elk monument een adres. Echter laten de adres gegevens zich moeilijk vergelijken:
- De BAG beschrijft een huisletter en een huisnummer toevoeging.
- De RCE kent enkel een toevoeging, die vaak niet met een van de twee BAG velden overeen komt.
</aside>

## Silo’s in samenhang?
Hoe stel je samenhangende vragen over deze veelheid aan silo-APIs heen?

Het is mogelijk over meerdere APIs een semantische laag te bouwen, maar deze vergt specifieke code per API en onderhoud voor elke keer dat een API wijzigt.

We kunnen verwachten dat de hoeveelheid APIs erg groot wordt…

Toenemende complexiteit per toegevoegde API (geen 2 APIs zijn hetzelfde) 

### Semantische laag
De semantische laag moet het geheel aan kennis bevatten dat je wilt bevragen. Wie een bredere vraag wil stellen, moet eerst een stukje aan de semantische laag toevoegen. 

“Het geheel aan kennis” bestaat in dit geval uit 
- Basisregistraties
- Andere overheidsdatasets
- Vrije datasets

Dus … een **open wereld**. Het geheel aan kennis beschrijven is niet mogelijk! De semantische orchestratielaag moet daarmee **uitbreidbaar** zijn.

De semantische laag beschrijft hoe de data in het stelsel zich tot elkaar verhoudt. 
(hieraan wordt gekoppeld welke data in welke API zit)

De stelselcatalogus zou hier in theorie voor gebruikt kunnen worden, maar is nog niet geïntegreerd met de daadwerkelijke definities van data modellen zoals de BAG (die als linked data beschikbaar is).

## Samenhang op dataniveau
De data in APIs heeft veelal geen links naar data in andere APIs.

Maar om het stelsel (via APIs) in samenhang te kunnen bevragen, moet een API ook identifiers kunnen teruggeven van eraan gekoppelde basisregistraties. Bijvoorbeeld: aan een NHR API vragen stellen op basis van een BAG Verblijfsobject identifier. 

<aside class="example">

**Vraag**: Welk bedrijf zit er op dit adres? 

**Vertaald**: API, geef mij het NHR object met [BAG verblijfsobject id] als adres.

</aside>

Er moeten dus verwijzingen, **links**, gelegd worden op data instantie niveau - van het ene object naar het andere, waarbij de objecten in verschillende registraties zitten.

Deze links kunnen het beste worden uitgedrukt in de vorm van URIs, conform een landelijke afspraak zoals de URI strategie [[NLURIStrategie]]; op basis van identifiers uit de basisregistraties.

Oók in APIs moeten links op een uniforme manier worden uitgedrukt. Een afspraak hiervoor kan worden opgenomen in de API strategie voor de Nederlandse Overheid [[NLAPIStrategie]]. 

## Eigenaarschap van data
Hoe kun je aan een API / de data uit een API zien van wie de data afkomstig is?

### Governance op het snijvlak
Wie is verantwoordelijk voor het toevoegen en beheren van de **links tussen datasets**? 

Deze zijn basisvoorwaarde voor samenhang.

Deze verantwoordelijkheid wordt nu nog niet gevoeld en de links zijn veelal nog niet aangebracht…

## Conclusies en aanbevelingen

Het uitgangspunt was om een demonstrator te bouwen bovenop APIs. Maar daar blijken wel wat haken en ogen aan te zitten. 

### API versus knowledge graph

De meerderheid van open geodata wordt beschikbaar gesteld als kaartlaag, die zich niet als API laat gebruiken. Er was maar 1 API die goed genoeg scoorde op de maturiteitschecklist om bruikbaar te zijn. De rest van de data die in de demonstrator is gebruikt is tijdens het project in een eigen API gepubliceerd. 

*Aanbeveling*: Vervang op de Lijst Open Standaarden de Nederlandse profielen van WMS 1.3 en WFS 2.0 door de nieuwe OGC API standaarden. WFS 2.0 kan al vervangen worden door [OGC API - Features](https://www.opengeospatial.org/standards/ogcapi-features). 

*Aanbeveling*: Voeg een checklist API maturiteit toe aan de [[NLAPIStrategie]] en zorg dat APIs hier zoveel mogelijk aan voldoen.

Maar zelfs als we een set goed scorende APIs zouden hebben, zou dit geen goed uitgangspunt vormen voor een samenhangende objectenregistratie. APIs zijn daarvoor te beperkt in functionaliteit én ze bieden de data niet samenhangend aan (het zijn silo’s). Een geheel van losstaande APIs kan geschikt gemaakt worden voor samenhangende bevraging over de APIs heen door er een semantische orchestratielaag bovenop te implementeren. Dit vergt echter veel extra code en onderhoud. Beter zou het zijn om een infrastructuur te hebben van een of meerdere “knowledge graphs” waarin de data in samenhang beschikbaar en bevraagbaar is. 

*Aanbeveling*: Zet niet vol in op APIs alleen, maar werk toe naar een infrastructuur van een of meerdere “knowledge graphs” (linked data).

### Samenhang tussen objecten

Datasets zijn in de huidige praktijk meestal niet gekoppeld. In plaats van een BAG identifier, bevatten veel registraties bijvoorbeeld nog velden waar adressen als tekst zijn opgenomen. Deze adressen matchen niet 100% met de BAG. 

Om de objectenregistraties in samenhang te kunnen bevragen, is het een basisvoorwaarde dat de datasets op het niveau van individuele objecten aan elkaar gekoppeld zijn met behulp van identifiers. Bij voorkeur zijn deze opgenomen in de vorm van URIs. 

*Aanbeveling*: Laat APIs verplicht verwijzen naar identifiers uit de samenhangende objectenregistratie als die relaties er zijn. Laat in Linked Data in die gevallen de URIs uit de samenhangende objectenregistratie opnemen.

*Aanbeveling*: Regel de governance voor het eenmalig leggen en vervolgens beheren van deze links - dit kost tijd en geld. 
