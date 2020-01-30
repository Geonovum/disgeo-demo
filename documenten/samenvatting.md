# Samenvatting

## APIs zijn de nieuwe silo’s…
APIs (en dan bedoelen we in dit document meer specifiek REST APIs, zoals gedefinieerd in de [[NLAPIStrategie]]) zijn bedoeld voor het stellen van veelgestelde vragen of het doen van veelgevraagde acties op data. Ze zijn daarmee per definitie gelimiteerd in datamodel en functionaliteit. Dit is in veel gevallen handig, want de API is erop toegespitst om veel voorkomende vragen snel en eenvoudig af te handelen. 

Maar...
- Wat als je geen veelgestelde vraag hebt, maar een minder vaak voorkomende? 
- Wat als de data in het antwoord niet dat ene gegeven bevat dat je nodig hebt?
- Wat als de data geen geo-vragen ondersteunt, terwijl je wilt weten welke andere objecten bij een object in de buurt liggen?

De data in APIs heeft veelal geen links naar data in andere APIs. Elke API is in feite een silo, die zich beperkt tot het beantwoorden van vragen over een enkele dataset. 

<aside class="example">
De Rijksdienst Cultureel Erfgoed (RCE) heeft geen directe koppeling met de BAG, wel bevat elk monument een adres. Echter laten de adres gegevens zich moeilijk vergelijken:
- De BAG beschrijft een ``huisletter`` en een ``huisnummertoevoeging``.
- De RCE kent enkel een ``toevoeging``, die vaak niet met een van de twee BAG velden overeen komt.
</aside>

## Silo’s in samenhang?
Hoe stel je samenhangende vragen over deze veelheid aan silo-APIs heen?

Het is, zoals de ontwikkelde demonstrator laat zien, mogelijk over meerdere APIs een semantische laag te bouwen, maar deze vergt specifieke code per API en onderhoud voor elke keer dat een API wijzigt.

We kunnen verwachten dat de hoeveelheid APIs erg groot wordt. Er is bovendien sprake van toenemende complexiteit per toegevoegde API (geen 2 APIs zijn hetzelfde). 

### Semantische laag
De semantische laag moet het geheel aan kennis bevatten dat je wilt bevragen. Wie een bredere vraag wil stellen, moet eerst een stukje aan de semantische laag toevoegen. 

“Het geheel aan kennis” bestaat in dit geval uit 
- Basisregistraties
- Andere overheidsdatasets
- Vrije datasets

Dus … een **open wereld**. Het geheel aan kennis beschrijven is niet mogelijk! De semantische orchestratielaag moet daarmee **uitbreidbaar** zijn.

De semantische laag beschrijft hoe de data in het stelsel zich tot elkaar verhoudt. Deze beschrijving bevat zowel de betekenis van de data en de samenhang ervan, als de kennis over welke data in welke API zit en hoe je die API aanspreekt. 

De stelselcatalogus zou hier in theorie voor gebruikt kunnen worden, mits deze wordt geïntegreerd met de daadwerkelijke definities van semantische modellen zoals die van de BAG, die als linked data beschikbaar is.

## Samenhang op dataniveau
De data in APIs heeft veelal geen links naar data in andere APIs. Maar om het stelsel (via APIs) in samenhang te kunnen bevragen, moet een API ook identifiers kunnen teruggeven van eraan gekoppelde basisregistraties. Bijvoorbeeld: aan een NHR API vragen stellen op basis van een BAG Verblijfsobject identifier. 

<aside class="example">

**Vraag**: Welk bedrijf zit er op dit adres? 

**Vertaald**: API, geef mij het NHR object met [BAG verblijfsobject id] als adres.

</aside>

Er moeten dus verwijzingen, **links**, gelegd worden op data instantie niveau - van het ene object naar het andere, waarbij de objecten in verschillende registraties zitten.

Deze links kunnen het beste worden uitgedrukt in de vorm van URIs, conform een landelijke afspraak zoals de URI strategie [[NLURIStrategie]]; op basis van identifiers uit de basisregistraties.

Oók in APIs moeten links op een uniforme manier worden uitgedrukt. Een afspraak hiervoor kan worden opgenomen in de API strategie voor de Nederlandse Overheid [[NLAPIStrategie]]. 

## Eigenaarschap van data
Hoe kun je aan een API / de data uit een API zien van wie de data afkomstig is?
Door het ontbreken van een semantische laag [[JSON-LD]] op de meeste API's is het na het ophalen van data niet duidelijk wat de data betekent en wie er eigenaar van is. Bij vragen die beantwoord worden door het samenvoegen van resultaten van verschillende APIs, is het in het antwoord niet te herleiden wie de eigenaar is van welk deel van het antwoord.

<aside class="example">

**Vraag**: Welk Monument heeft het grootste oppervlak 

**Antwoord**: Monument Status komt uit 1 dataset, de oppervlakte uit een ander. Dit is niet ter herleiden op basis van de huidige API antwoorden.

</aside>

## Governance op het snijvlak
Eerder schreven we al dat er technische afspraken gemaakt moeten worden voor het leggen van verwijzingen oftewel **links** op data instantie niveau, van het ene object naar het andere, óók tussen objecten uit verschillende registraties. 

Los van de techniek speelt hier ook een essentiele organisatorische vraag: 

"**Wie is verantwoordelijk voor het toevoegen en beheren van de links tussen datasets**?"

Deze links zijn basisvoorwaarde voor samenhang. Maar deze verantwoordelijkheid voor het aanleggen en beheren ervan wordt nu nog niet gevoeld en de links zijn veelal nog niet aangebracht. Dit is direct te herleiden aan de opdracht die de verschillende data eigenaren hebben, zelfs binnen organisaties. Er is bijvoorbeeld geen formele link tussen percelen en panden, aangezien de betreffende afdelingen binnen het Kadaster het onderhouden van deze link niet als opdracht hebben, en derhalve geen tijd en budget beschikbaar hebben om dit te verwezenlijken. Het beheer van deze links moet dus met beleid, en derhalve budget, ondersteund worden. Hoewel er al een *plicht* is om [bij gebruik van gegevens uit de basisregistraties de juistheid van die gegevens te waarborgen](https://www.digitaleoverheid.nl/overzicht-van-alle-onderwerpen/gegevens/naar-een-gegevenslandschap/themas/twaalf-eisen-stelsel-van-basisregistraties/) wordt hier niet op toegezien.

Een belangrijk element van deze governance is dat er goed nagedacht moet worden op welk niveau het bijhouden van deze links gelegd wordt. Het verdient de aanbeveling dat dit zo dicht mogelijk bij de data eigenaar komt te liggen. Laat bijvoorbeeld gemeentes zorg dragen voor de juiste link tussen nieuwe panden en percelen. Hoewel de uiteindelijk data door het kadaster gepubliceerd wordt is het onderhoud dan dicht bij de oorsprong van de links uitgevoerd.

Naast het daadwerkelijk aanbrengen van de links is ook de semantische duiding van deze link een belangrijk onderwerp dat behandeld moet worden. De huidige modellering van gegevens binnen de *eigen silo* zorgt voor een bepaalde vrijheid bij het modelleren. Wanneer echter verwezen wordt naar gegevens uit andere registraties is ook goverance over de betekenis van deze verwijzing noodzakelijk.

Het ontbreekt op dit moment aan een uniforme wijze om externe data te laten verwijzen naar een object in basisregistraties. Als er bij het publiceren van een dataset bijvoorbeeld gerefereerd moet worden aan een BAG pand is er geen aanwijzing hoe deze link genoemd moet worden. Dit resulteert er in dat het bij de externe dataset nu moeilijk is om direct te begrijpen naar welke dataset ze verwijzen.

Mogelijke oplossing hiervoor is een gestandaardiseerde naam voor de verwijzing, bijvoorbeeld ``gerelateerdBAGPand``. 

## 5 Sterren model voor Open Data
Een stappenplan om een aantal van bovengenoemde problemen aan te pakken is het **5 sterren Open Data** model, waarbij er aan elke toevoeging van kenmerken aan de gepubliceerde data een waardering wordt toegekend.
1. Beschikbaar op het web, met een open licentie
2. Data is machine leesbaar en bevat een open licentie
3. De dataset is beschikbaar in een open bestandsformaat
4. Bovenstaande + gebruik open standaarden van het W3C [[JSON-LD]] om objecten in de data te identificeren, zodat anderen naar die objecten kunnen verwijzen.
5. Bovenstaande + link je data aan data van anderen, dit creëert samenhang tussen data sets.

Dit in beschouwing nemend zijn de huidige API's niet meer dan 3 sterren data - de data is beschikbaar op het web met een open licnetie, is machineleesbaar en is beschikbaar in een open formaat. De enige Nederlandse open overheids(geo)data die vier sterren heeft is Kadaster Linked Data via PDOK. Vijf sterren geodata is er nog niet!

## Conclusies en aanbevelingen

Het uitgangspunt van het onderzoek was om een demonstrator te bouwen bovenop APIs. Maar daar blijken wel wat haken en ogen aan te zitten. 

### API versus knowledge graph

De meerderheid van open geodata wordt beschikbaar gesteld als kaartlaag, die zich niet als API laat gebruiken. Er was maar één API die goed genoeg scoorde op de [maturiteitschecklist](#maturiteit) om bruikbaar te zijn. De rest van de data die in de demonstrator is gebruikt is tijdens het project in een eigen API gepubliceerd. 

*Aanbeveling*: Vervang op de Lijst Open Standaarden de Nederlandse profielen van WMS 1.3 en WFS 2.0 door de nieuwe OGC API standaarden. WFS 2.0 kan al vervangen worden door [OGC API - Features](https://www.opengeospatial.org/standards/ogcapi-features). Deze nieuwe OGC API standaarden zorgen voor een goede score op maturiteit.

*Aanbeveling*: Voeg een checklist API maturiteit toe aan de [[NLAPIStrategie]] en zorg dat APIs hier zoveel mogelijk aan voldoen.

Maar zelfs als we een set goed scorende APIs zouden hebben, zou dit nog geen goed uitgangspunt vormen voor een samenhangende objectenregistratie. APIs zijn daarvoor te beperkt in functionaliteit én ze bieden de data niet samenhangend aan (het zijn silo’s). Een geheel van losstaande APIs kan geschikt gemaakt worden voor samenhangende bevraging over de APIs heen door er een semantische orchestratielaag bovenop te implementeren. Dit vergt echter veel extra code en onderhoud. Beter zou het zijn om een infrastructuur te hebben van een of meerdere “knowledge graphs” waarin de data in samenhang beschikbaar en bevraagbaar is. 

*Aanbeveling*: Zet niet vol in op APIs alleen, maar werk toe naar een infrastructuur van een of meerdere “knowledge graphs” (linked data).

### Samenhang tussen objecten

Datasets zijn in de huidige praktijk meestal niet gekoppeld. Bijvoorbeeld bevatten veel registraties, in plaats van een BAG identifier, nog velden waar adressen als tekst zijn opgenomen. Deze adressen matchen niet 100% met de BAG. 

Om de objectenregistraties in samenhang te kunnen bevragen, is het een *basisvoorwaarde* dat de datasets op het niveau van individuele objecten aan elkaar gekoppeld zijn met behulp van identifiers. Bij voorkeur zijn deze opgenomen in de vorm van URIs. 

*Aanbeveling*: Laat APIs verplicht verwijzen naar identifiers uit de samenhangende objectenregistratie als die relaties er zijn. Laat in Linked Data in die gevallen de URIs uit de samenhangende objectenregistratie opnemen.

*Aanbeveling*: Regel de governance voor het eenmalig leggen en vervolgens beheren van deze links - dit kost tijd en geld. 

*Aanbeveling*: Leg afspraken over het vormen en beheren van URIs vast in een landelijke URI strategie of bredere linked data strategie, gebaseerd op de [[NLURIStrategie]] die hier al een aanzet voor biedt. 

*Aanbeveling*: Regel de governance over de semantiek van de verbindingen.

### Best Practices voor Data Publicatie

Er is internationaal verband, veelal ondersteund vanuit de EU, al een hoop werk verricht rond het opstellen en documenteren van Best Practices voor data publicatie [[DWBP]] [[SDW-BP]], de maturiteitstabel in hoofdstuk 4 is hier op gebaseerd. Ook de [[NLAPIStrategie]] refereert hier nadrukkelijk aan. Het gebruik van deze Best Practices scheelt een hoop werk bij het opstellen van nieuwe standaarden en afspraken.

*Aanbeveling*: Neem de beschikbare Best Practices over in relevante documenten.

*Aanbeveling*: Neem in een stelsel van samen hangende registraties **5 Sterren Open Data** als uitgangspunt. Het ontbreken van de 5e ster impliceert automatisch het ontbreken van samenhang.
