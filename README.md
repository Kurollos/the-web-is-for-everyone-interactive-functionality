# Interactive Functionality

Ontwerp en maak voor een opdrachtgever een interactieve toepassing die voor iedereen toegankelijk is

De instructie vind je in: [INSTRUCTIONS.md](https://github.com/fdnd-task/the-web-is-for-everyone-interactive-functionality/blob/main/docs/INSTRUCTIONS.md)


## Inhoudsopgave

  * [Beschrijving](#beschrijving)
  * [Gebruik](#gebruik)
  * [Kenmerken](#kenmerken)
  * [Installatie](#installatie)
  * [Bronnen](#bronnen)
  * [Licentie](#licentie)

## Beschrijving
Voor de cadeau categoriepagina van Milledoni heb ik een post-interactie ontwikkeld waarmee gebruikers cadeaus kunnen toevoegen aan hun favorietenlijst. Dit gebeurt door op een like-button te klikken bij een product.

## Gebruik
Wanneer een gebruiker zich op de cadeau categoriepagina bevindt, ziet hij een overzicht van cadeaus. Als de gebruiker een cadeau leuk vindt, kan hij op de like-button klikken.

Na het klikken wordt het product toegevoegd aan de favorietenlijst
Er verschijnt een popup met een bevestiging dat het product succesvol is opgeslagen
Wanneer de gebruiker naar de wishlist-pagina gaat, ziet hij daar het opgeslagen product terug

## Kenmerken
Voor het maken van deze functionaliteit heb ik de volgende technieken gebruikt:
In index.liquid heb ik een like/save button toegevoegd bij elk product
In server.js heb ik een POST-interactie gemaakt die het product opslaat wanneer er op de knop wordt geklikt
Na het versturen van de POST request krijgt de gebruiker feedback via een popup
In wishlist.liquid worden de opgeslagen producten weergegeven

## Installatie
Om dit project te gebruiken moet je eerst de juiste dependencies installeren.
Installeer Express.js via npm:
npm install
Dit zorgt ervoor dat alle benodigde packages (zoals Express) in package.json worden geïnstalleerd

## Bronnen

## Licentie

This project is licensed under the terms of the [MIT license](./LICENSE).
