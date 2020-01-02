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
