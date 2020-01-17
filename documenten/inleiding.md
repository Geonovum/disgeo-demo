# Inleiding

## Doel van de demonstrator
Het ministerie van BZK beoogt met het traject Doorontwikkeling in Samenhang (DiS Geo) meer samenhang te krijgen in het stelsel van geo(basis)registraties waarbij de focus ligt op semantische harmonisatie van registraties en informatiemodellen, en alternatieve methoden van gegevensuitwisseling en bijhouding (meer centraal, minder kopiëren).
![samenhangende objectenregistratie informatiekundig](C:\Users\dkrijtenburg\Documents\GitHub\disgeo-demo\documenten)

Gebruikers denken immers meestal niet in datasets, maar in data die op allerlei manieren verbanden met elkaar heeft en te combineren is. In het NEN3610 stelsel en het stelsel van basisregistraties is tot nu toe wél gedacht in datasets. Informatiemodellen zijn in zekere zin silo’s die alleen de semantiek van een bepaalde sector standaardiseren, maar niet in samenhang met de informatie van andere sectoren zijn gemodelleerd. Deze samenhang is er in werkelijkheid echter wel. Linked data is een uitermate geschikte techniek om deze semantische samenhang vast te leggen zodat de data zelf ook geïntegreerd kan worden.

Als de semantiek (voldoende) in samenhang is gebracht, is de volgende stap om de data in samenhang te publiceren, op een manier die voor breed gebruik geschikt is. Vindbaar via zoekmachines, bruikbaar voor data gebruikers – de intermediairs: web/app developers, data scientists, data journalisten etc. Voor eindgebruikers kan de data in een geschikte, toegankelijke web viewer worden gepubliceerd.

Geonovum voert verschillende activiteiten uit in het kader van de doorontwikkeling van de geo(basis)registraties die vooral gericht zijn op de semantische harmonisatie. Een daarvan is het ontwikkelen van een demonstrator op het gebied van onderlinge semantische verbinding van gegevens en semantiek in geo(basis)registraties middels Linked Data voor de thema’s Gebouwen en Wegen. De ontwikkeling vindt plaats in een [github repository](https://github.com/Geonovum/disgeo-demo).

Het doel van deze demonstrator is om te beproeven en aan een breed publiek te laten zien hoe geodata in samenhang kan worden gepubliceerd op het web. De demonstrator laat zien hoe extra informatie kan worden geknoopt aan algemene basisobjecten, door gebruik te maken van semantische samenhang. Hierdoor kan informatie slim gekoppeld worden – door vast te leggen dat de informatie bijvoorbeeld over hetzelfde gebouw gaat, ongeacht of de informatieobjecten dezelfde geometrie hebben.

## Doel van dit document
Tijdens het ontwikkelen van de demonstrator is er veel ervaring opgedaan met data uit basisregistraties en andere overheidsregistraties, met APIs en andere web services, met semantiek en onderlinge verwijzingen tussen datasets. Voordat het stelsel van overheidsregistraties in samenhang kan worden gebruikt en bevraagd, moeten er nog heel wat stappen gezet worden. 

De ontwikkeling van de demonstrator heeft waardevolle inzichten opgeleverd over vraagstukken rondom techniek, semantiek en governance, die zijn samengevat in dit Lessons Learned document. 