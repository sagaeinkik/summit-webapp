# Summit Klient-applikation / Webbapplikation

av Saga Einarsdotter Kikajon

## Bakgrund

Detta är ett UI framtaget för ett fiktivt företag som säljer vintersportprylar (Nordic Peak). Summit är namnet på själva applikationen som Nordic Peak använder sig av.

## Info

Applikationen är skapad med vue. Den använder sig av ett API jag har byggt i Fastify för ändamålet, vars repo finns att hitta här: https://github.com/sagaeinkik/summitAPI

Jag har stylat med Tailwind CSS och kompletterat med egen Scss.

Utöver det har jag inte använt några andra dependencies förutom de som installeras automatiskt av Vite i Vue-projekt.

### Bra att veta

-   Det finns sortering i samtliga tabeller enligt fält i både stigande och fallande ordning.
-   För att slippa scrolla hela vägen åt sidan på mindre skärmar kan man dubbelklicka på tabellraderna för att redigera ett objekt.
-   Om man hovrar över tabelldata som har klippts av med punkter (...) ser man en tooltip med innehållet.
-   Det saknas stöd för att bredda/minska tabellens fält.
-   För produkter anger man även ProduktID, som ska motsvara streckkoder.
-   Användarnamn och lösenord är skiftlägeskänsliga.

Underliga problem jag inte ännu har kommit på hur man löser:

-   På android-telefoner är pluset för att lägga till rader i tabellen inte centrerat. Det är det i alla webbläsare jag testat på dator och iPhone.

## Användning

Installera

```
npm run install
```

Starta applikation

```
npm run dev
```

Kompilera

```
npm run build
```
