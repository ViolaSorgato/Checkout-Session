# Checkout-Session

# Beskrivning

Jag har skapat en webbshop där det går att lägga en order och genomföra en betalning med integration med Stripe.

Servern är byggd med NodeJS / Express.

För client är projektet byggt med React och TypeScript. När det gäller design valde jag att avända mig av antDesign i kombination med egen CSS. Applikationen är byggd för att passa desktop.

Alla produkter i webbshoppen hanteras genom Stripe Dashboard. De listas på hemsidan och kan läggas till i en kundvagn. Ordern som läggs genom Stripe är baserad på produkterna i kundvagnen.
Det går att registrera sig, att logga in och ut. När man registrerar sig så skapas även en customer i Stripe. Stripe customers sparas i en JSON fil. Samtliga lösenord sparas krypterade.
Man får inte lägga en order om man inte är inloggad. När man är inloggad och går till checkout, är mejlet redan ifyllt. När man loggar in så skapas även en cookie session. Denna session försvinner när man loggar ut.

# Installation

För att få igång detta projekt gör du följande:

- Börja med att se till att ha NodeJS installerat. Börja annars med att installera det enligt NodeJS dokumentation https://nodejs.org/en

- Kopiera sedan repot från GitHub https://github.com/ViolaSorgato/Checkout-Session.git

- Klona ner repot på din dator med följande kommando i Terminalen. Navigera först till den mapp där du vill spara projektet:

        git clone https://github.com/ViolaSorgato/Checkout-Session.git


- Öppna upp projektet i editor Visual Studio Code för att direkt härifrån nå Terminalen.

**Server**

- Öppna en Terminal

- Navigera till server-mappen genom kommandot:

        cd server

- Kör kommandot:

          npm install

- Starta sedan servern genom något av följande kommandon:

        npm start för att dra igång servern mot node server.js

                eller:

        npm run dev för att köra med nodemon server.js

- Servern är nu igång

**Client**

- Öppna en till Terminal

- Navigera till client-mappen genom kommandot:

        cd client

- Kör kommandot:

          npm install

- När installationen är klar, kör kommandot:

        npm run dev

Projektet är nu uppe och snurrar på localhost och du kan se applikationen i din webbläsare.
