# React Compiler Demo

## Startpunkt

- Vi har en Vite React app her, veldig enkel. Color picker som setter en farge i state, og en SlowComponent som rendrer 10000 fargede bokser.
- Når vi endrer mange farger i color picker, så får vi en ganske heftig FSP drop. La oss si vi ikke skjønner hva som går galt, og vil debugge dette.

## React DevTools Profiler

- Vi åpner React DevTools Profiler, starter en recording, og ser på hva som skjer når vi endrer farge.
- Vi ser at SlowComponent rendres på nytt, og at det tar 25ms. Det er ikke så rart, for den rendrer 10000 bokser.
- Kan også sjekke i Console og se at det ble console logget så mange ganger som vi byttet farge med pickeren.
- Ganske tydelig hva som er galt, men la oss teste et nytt, annet verktøy også.

## React Scan

- [React Scan](https://react-scan.com/) er et verktøy som kan hjelpe oss å identifisere performance problemer.
- Laget av Aiden Bai, grunnlegger av Million.js hvis dere har hørt om det. Også relatert til performance.
- Sykt enkelt bruke, finnes om NPM pakke men vi kan også bare legge inn en script-tag.
- Se UI-en, prøv å bytte 1 farge og se hva som rerendres basert på dette trykket.
- Kan trykke på en komponent og se hvorfor den rerendret sist.
- Bytt farge mange ganger, og se hva React Scan viser oss: varsler og FPS drop.
- Kan trykke på denne og se kilden til FPS droppet.
- Trykker på SlowComponent "Ranked" og ser at den rendret x29 ganger på 341 ms, men at det ikke var noen endringer funnet i komponenten, og at den kunne vært memoisert.
- Se "Overview" hva som ble brukt tid på, nyttig i fremtiden.
- Gå til "prompts", les promptet. Det forklarer funnet, og kan brukes til å fikse problemet.

## (Fiks problemet manuelt (med AI))

- Åpne Copilot Edits som dere kjenner fra Devlins workshop, og lim inn promptet.
- AIen jobber og forklarer. Bruk React memo for å skippe rerenders av komponenter når props ikke endres.
- Memoisering er vanskelig, jeg har aldri lært meg det ordentlig btw, men i det minste har vi AI. Men det tar ganske lang tid da.
- AI er ferdig, og gir oss et forslag. Vi godkjenner det.
- Når vi nå prøver igjen, ser vi at FPS droppet er borte. React Scan viser ikke lenger en rerender av SlowComponent. Og vi kan se det i Profiler.
- Det tok litt tid. Debugging og løsing og kan være litt tidkrevende selv med gode verktøy.

## Fiks problemet manuelt (uten AI)

- Men vi skal bare løse det manuelt. Bruk React memo for å skippe rerenders av komponenter når props ikke endres.
- Når vi nå prøver igjen, ser vi at FPS droppet er borte. React Scan viser ikke lenger en rerender av SlowComponent. Og vi kan se det i Profiler.
- Debugging og løsing og kan være litt tidkrevende selv med gode verktøy.

## Fiks problemet automatisk med Compiler

- Fjern den manuelle løsningen. Vi er tilbake til utgangspunktet.
- Se compiler-pakken i package.json.
- Skru på Compiler i vite.config.ts. Se at det løste problemet automatisk.

## React Compiler Devtools

- Åpne React Components i Devtools.
- Se at memoiserte komponenter har en liten "memo" badge. Dette er automatisk memoiserte komponenter gjort av Compiler.
- Compiler fikset alt automatisk, uten boilerplate-code. Potensielt kan dette være ganske mye kode som unngås, eks useMemo og useCallback, samt at den utfører optimaliseringer på alt, også ting som ikke er et problem.

## React Context

- React Context er veldig vanlig å bruke, men den rerendrer alle children som subscriber til den contexten. Ofte bruker vi en global state manager som Zustand heller enn Context, men ofte trenger vi Context også.
- Bytt til branch med Context, vis endringer i koden. Parent har farge fra Context, ColorPicker bytter.
- Test FPS drop.
- Skru på compiler og se at FPS droppet er borte.

## Eslint

- Som nevnt i slides er vi nødt til å følge reglene i React for at compiler skal kunne gjøre jobben sin.
- Gå til eslint plugin og se at vi har plugin 'eslint-plugin-react-compiler', og at vi skal få errors hvis vi ikke følger reglene.
- En regel er at hook ikke kan kalles conditionally. Legg inn følgende og se at vi får en error:

```tsx
  if (logStatement) {
    useEffect(() => {
      console.log("SlowComponent mounted");
    }, []);
  }
```

- Se at memom badgen nå har forsvunnet. Compiler klarte fremdeles å optimalisere, men det er egentlig ikke noen garanti per dokumentasjonen.
- Det går fint at man har feil, og det går an å disable denne feilen per komponent og fikse dem litt etter litt, det vil bare si at det er færre memoiserte komponenter.

## Compiler i andre rammeverk

Se gjennom [dokumentasjonen](https://react.dev/learn/react-compiler) for å se at det er mulig å bruke Compiler i andre rammeverk også, som Next.js og Remix.

Test ut compiler, og allerede nå kan man installere eslint pluginen og få warnings og errors i editoren. Beta, men i bruk hos Meta, og sikkert snart ute! Viktig å vite om før man manuelt memoiserer overalt.
