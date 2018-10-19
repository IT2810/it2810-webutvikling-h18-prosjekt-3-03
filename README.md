# Gruppe 3 prosjekt 3

## Innhold
* 1 Kjør prosjekt
* 2 Kalender med aktiviteter
* 3 Skritteller-komponenter
  * 3.1 Struktur
  *	3.2 Virkemåte/tutorials
    * 3.2.1 StepComponent
    * 3.2.2 StepLogComponent
* 4 Todo-liste
* 5 Kilder

<br />

## 1 Kjør prosjekt 
1. __Klone eller last ned Github prosjektet og installer alle modulene__
    
    Bruk kommandolinjen, velg mappen du ønsker å legge prosjektet i og skriv inn:
    ```
    git clone https://github.com/IT2810/it2810-webutvikling-h18-prosjekt-3-03.git
    npm install
    ```
    
    <br />

2.	__Last ned og installer appen Expo__
   
    ```
    npm install -g expo-cli
    ```
    
    <br />

3.	__Start Expo__
    
    ```
    cd prosjekt3
    expo start
    ```
    Skann så QR-koden som kommer opp med Expo-appen. Expo kan lastes ned på Play store eller App store.
    
    <br />

4.	__Skritteller på mobil__
    
    For at prosjektet skal kunne ta inn data fra skrittelleren på mobilen, må man bruke Core Motion (iOS) eller Google Fit (Android).
    
<br />

## 2 Kalender med aktiviteter
Kalenderen vi har brukt i prosjektet er en tredjepartskomponent hentet herfra: https://github.com/wix/react-native-calendars

Vi ønsket å vise en oversiktlig kalender vi kunne bruke til å vise hvilke datoer det var lagt til aktiviteter på, og react native calendars fungerte fint til dette. I tillegg er modulen kompatibel med både Android og iOS, noe som passet fint for prosjektet.

### 2.1 Struktur 
CalendarComponent er todelt: den består av en kalender som viser en oversikt over hvilke datoer man har lagt inn aktiviteter på, og en liste som viser hvilke aktiviteter som ligger inne for en gitt dato. I tillegg er det mulighet for å legge til nye aktiviterer for en valgt dato.\
Dessverre fikk vi ikke implementert sletting av aktiviteter når de først er lagt til. Denne funksjonaliteten viste seg å ta mer tid enn vi hadde tilgjengelig, og ble derfor sløyfet i denne omgangen. 

<br/>
For å få kalenderen og aktivitets-listen til å oppdateres ved endring i en av dem har vi brukt ulike state-variabler for å holde dataene, og egne funksjoner for å oppdatere dem.<br/>
Bruker selected-variabelen for å lagre hvilken dato som er blitt trykket på og valgt. MarkedDates er en array hvor markeringene i kalenderen lagres, og som settes inn i MarkedDates-parameteren i CalendarList-komponenten. ActivityText brukes i forbindelse med input når man legger til en aktivitet. ListOfActivities er en liste over alle aktiviterer som er lagt til og hvilken dato de tilhører. Denne oppdateres underveis og når lagrede data lastes inn med AsyncStorage.

<br/> 

Funksjonene som brukes:
<br/>

____storeData():___

Bruker denne funksjonen til lagre data i CalendarComponent med AsyncStorage. Den lagrer listen activityList, som inneholder alle aktivitetene i appen. 

<br/>

____retrieveData():___

Henter inn datane som ligger lagret, og legger dem inn i state til listOfActivities slik at resten av komponenten kan bruke listen. 

<br/>

__addActivity():__

Henter inn verdien lagret i activityText og selected, og bruker disse til å opprette et nytt element i listOfActivities. Kjører også et kall til __storeData()__ for å lagre endringene som er gjort i listen, og et kall til updateMarkes() for å oppdatere markeringene i kalenderen. 

<br/>

__getToday(today):__

En enkel funksjon som tar inn et Date-objekt og returnerer en streng på formatet 'YYYY-MM-DD' basert på denne. Brukes blant annet i forbindelse med å sette selected til dagens dato. Strengen må være på dette formatet slik at den kan settes inn i markedDates. 

<br/>

__updateMarks():__

Brukes for å oppdataer markedDates i state slik at markeringene oppdateres i CalendarList-komponenten. Går over listOfAvtivities-listen, og legger til en markering i en array. Når den er ferdig med listen oppdateres staten til markedDates. 
<br/> 
Var litt vanskelig å finne ut hvordan man skulle oppdatere markedDates siden elementene i arrayen er objekter. Brukte derfor forslagene herfra for å finne en løsning for denne delen: https://github.com/wix/react-native-calendars/issues/160

<br/>

__componentDidMount():__

Gjør to funksjons-kall: et til retrieveData og et til updateMarks. RetrieveData henter inn de lagrede dataene når komponenten er mounted. Siden dataene hentes asynkront tar det litt tid før staten er oppdatert, og siden updateMarks er avhengig av innholdet i listOfActivities er det satt en timout på kallet til updateMarks slik at staten er blitt oppdatert når funksjonen trenger den. 

<br/>

### 2.2 Tutorial for tredjepartskomponenter og APIer
#### 2.2.1 react-native-calendars
React-native-calendars: https://github.com/wix/react-native-calendars

<br/>
For å komme i gang med kalenderen må du lagre og installere modulen i prosjektet med: 
```
npm install --save react-native-calendars
```
Deretter må du importere komponentene du ønsker å bruke inn i filen de skal brukes i. I vårt prosjekt brukte vi kun CalendarList-komponenten, men flere er tilgjengelig i modulen.
```Jacascript
import { CalendarList } from 'react-native-calendar';
```
Når du skal bruke komponenten skriver du inn navnet på komponenten der du ønsker å bruke den i render-funksjonen.
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
#### 2.2.2 react-native-elements
React-native-elements: https://react-native-training.github.io/react-native-elements/docs/0.19.1/overview.html

Vi har brukt react-native-elements for knapp, liste og listelementer i CalendarComponent. Detta ga oss ferdige komponenter med et fint utseende vi kunne bruke. 

<br/>
For å komme i gang med react-native-elements må du lagre og installere modulen i prosjektet: 
```
npm install --save react-native-elements
```
Deretter importerer du komponentene du ønsker å bruke i filen de skal brukes i. I vårt prosjekt har vi brukt komponentene Button, List og ListItem. For å bruke komponentene skriver du bare inne navnet på dem der hvor du vil ha dem i render-funksjonen. <br/>
I vårt prosjekt har vi en liste med data vi ønsker å vise, og for å gjøre det itererer vi over listen og genererer en ListItem hvor hvert element i listen. Key og title er parametere man kan legge til ListItem, hvor key må være med (og må være unik) og title er teksten for vises i listen. Det er også flere parametere som kan legges til i ListItem. 
```
imort { Button, List, ListItem } from 'react-native-elements';

...
    render() {
       return(
           <List 
             {
                list.map((item) => (
                    <ListItem
                        key={somekey}
                        title={textToShowFromItem}
                    />
                ))
             }
           />
           <Button/>
       );
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
