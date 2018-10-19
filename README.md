# Gruppe 3 prosjekt 3

## Innhold
* 1 Kjør prosjekt
* 2 Kalender
* 3 Skritteller-komponenter
  * 3.1 Struktur
  *	3.2 Virkemåte/tutorials
    * 3.2.1 StepComponent
    * 3.2.2 StepLogComponent
* 4 Todo-liste
* 5 Kilder

<br />

## 1 Kjør prosjekt 
1. __Klone eller last ned Github prosjektet__
    
    Bruk comand line, velg mappen du ønsker å legge prosjektet i og skriv:
    
    a) git clone https://github.com/IT2810/it2810-webutvikling-h18-prosjekt-3-03.git
    
    <br />

2.	__Last ned og installer appen Expo__
    
    Comand line:
    
    a) npm install -g expo-cli
    
    b) expo init project3
    
    <br />

3.	__Start Expo__
    
    Comand line: 
    
    a) cd project3
    
    b) expo start
    
    Man vil da få opp en QR-kode i terminalen.
    
    <br />
    
4.	__Expo på mobil__
    
    a) Last ned Expo appen fra Play store eller App store
    
    b) Bruk appens QR-skanner til å skanne QR-koden i terminalen. Man vil nå få opp prosjektet på mobilen.
    
    <br />

5.	__Skritteller på mobil__
    
    For at prosjektet skal kunne ta inn data fra skrittelleren på mobilen, må man bruke Core Motion (iOS) eller Google Fit (Android).
    
<br />

## 2 Kalender
Kalenderen vi har brukt i prosjektet er en tredjepartskomponent hentet herfra: https://github.com/wix/react-native-calendars

Vi ønsket å vise en oversiktlig kalender vi kunne bruke til å vise hvilke datoer det var lagt til aktiviteter på, og react native calendars fungerte fint til dette. I tillegg er modulen kompatibel med både Android og iOS, noe som passet fint for prosjektet. 

For å komme i gang med kalenderen må du lagre og installere modulen i prosjektet med: 
```
npm install --save react-native-calendars
```
Deretter må du importere komponentene du ønsker å bruke inn i filen de skal brukes i. I vårt prosjekt brukte vi kun CalendarList-komponenten, men flere er tilgjengelig i modulen.
```Jacascript
import { CalendarList } from 'react-native-calendar';
```
Når du skal bruke komponenten skriver du inn navnet på komponenten der du ønsker å bruke den.
```
   render() {
      return (
         <View><CalendarList/></View>
      );
   }
```
I tillegg er det ulike parametere man kan legge til på hver komponent for å endre utseende og styre oppførselen til komponenten. Et eksempel fra vårt prosjekt er:
```
...
   <CalendarList
       styles={styles.calendar}  //den vanlige styles-parameteren kan brukes sammen med kalenderen
       theme={{
           dotColor: '#ffa500'  //fargen på dot-markeringene i kalenderen
       }}
       horizontal={true}  //styrer om kalenderen kan blas i vertikalt eller horisontalt
       onPress={(day) => {
           this.setState({selected: day.dateString});  //onPress-funksjonen brukes når man trykker på en dato i kalenderen
       }}
   />
...
```

Alle event handler callbacks kalles med Calendar-objekter på formen nedenfor (hentet fra deres dokumentasjon). Er slike objekter vi bruker i onPress-funksjonen i CalendarList-komponenten for å hente ut datestringen for datoen som er blitt trykket på. 
```
{
   day: 1,     //day of month (1-31)
   month: 1,   // month of the year (1-12)
   year: 2017, // year
   timestamp,  // UTC timestamp representing 00:00 AM of this date
   datestring: '2018-10-09' // date formatted as 'YYYY-MM-DD' string
}

```


<br />

## 3 Skritteller-komponenter
Vi valgte å ta i bruk skritteller som vårt eksempel på noe som var utover basic React Native UI-problematikk. Vi valgte det fordi vi synes det passet til vår planleggingsapp, vi kunne utforske Expo APIet og det virket greit å implementere.

<br />

### 3.1 Struktur
Skritteller-komponentene består av tre komponenter; StepInfoComponent er forelder til StepComponent og StepLogComponent.

<br />

StepComponent henter inn data fra mobilens skritteller og viser dagens skrittantall, mål, og hvor mye som er igjen til mål er oppnådd. Det lager også en log for opptil de siste 30 dagene, og sender loggen til StepInfoComponent. StepInfoComponent tar imot loggen og sender den videre til StepLogComponent.

<br />

StepLogComponent tar imot loggen og viser den i form av en liste med elementene: dato, antall skritt, mål og en stjerne hvis man oppnådde målet. Man må ha vært registrert i minst én dag for at noe skal dukke opp i loggen.

<br />

Skrittmålet for en dag er et standard mål på 10 000 skritt. Vi ønsket å legge inn funksjonalitet for å kunne endre dette, men tiden strakk ikke til.

<br />

### 3.2 Virkemåte/Tutorials
NB! Hvis man endrer på koden og refresher appen vil man få en feilmelding («Already managing a GoogleApiClient with id 0»). Expo hadde ingen dokumentasjon angående dette, så løsningen er å restarte appen.

<br />

### 3.2.1 StepComponent
Vi bruker Pedometer fra Expo APIet til å hente ut data fra skritteller. For mer dokumentasjon om det, se [her](https://docs.expo.io/versions/latest/sdk/pedometer#expopedometergetstepcountasyncstart-end). 

<br />

___subscribe():__

  _subscribe() blir kalt når komponenten mounter, og brukes til å opprette kontakt med skritteller og hente ut antall skritt for i dag.
<br />

For å avgjøre om skritteller er tilgjengelig kalles Pedometer.isAvailableAsync(). Respons lagres i state.isPedometerAvailable og kan brukes til å debugge koden hvis kontakt ikke opprettes.
<br />

For å hente ut antall skritt for dagen i dag, må man først opprette to nye Date-objekter med dagens dato og tidsstempel for midnatt (00:00) og nåværende tid. Videre må man kalle Pedometer.getStepCountAsync(start, end), for å hente ut antall skritt fra skritteller, og lagre det i state.stepCountToday.
<br />

Til slutt må createLogData() kalles for å lage logg-data. (se avsnitt lenger ned)

<br />

__sendData():__

sendData() kalles for å sende logg-data til StepInfoComponent.

<br />

__createLogData():__

createLogData() kalles for å lage skritteller-loggen for de siste 30 dagene. Dette gjøres ved å kalle getStepCountForDate(date) for hver dato. Etterpå kalles sendData().

<br />

__getStepCountForDate(date):__

getStepCountForDate(date) brukes for å hente ut antall skritt for en valgt dato som skal lagres i loggen. Dette følger samme prinsipp som i  _subscribe(). Etterpå legger man inn dato, antall skritt, mål og om målet er oppnådd i state.data.

<br />

### 3.2.2 StepLogComponent
<br />

__componentDidUpdate(prevProps, prevState):__

Når StepLogComponent mottar loggen fra StepInfoComponent, vil componentDidUpdate(prevProps, prevState) sette state.isUpdated til true. Dette brukes av render() for å avgjøre om den skal vise mottatt loggdata eller en default-verdi.

<br />

## 4 Todo-liste

<br />

## 5 Kilder

* Ikonet '/assets/run_big.png' er lagd av [Nikita Golubev](https://www.flaticon.com/authors/nikita-golubev) fra www.flaticon.com.
