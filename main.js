import { M } from "./js/model.js";
import { V } from "./js/view.js";

window.V = V;

/*
   Ce fichier correspond au contrôleur de l'application. Il est chargé de faire le lien entre le modèle et la vue.
   Le modèle et la vue sont définis dans les fichiers js/model.js et js/view.js et importés (M et V, parties "publiques") dans ce fichier.
   Le modèle contient les données (les événements des 3 années de MMI).
   La vue contient tout ce qui est propre à l'interface et en particulier le composant Toast UI Calendar.
   Le principe sera toujours le même : le contrôleur va récupérer les données du modèle et les passer à la vue.
   Toute opération de filtrage des données devra être définie dans le modèle.
   Et en fonction des actions de l'utilisateur, le contrôleur pourra demander au modèle de lui retourner des données filtrées
   pour ensuite les passer à la vue pour affichage.

   Exception : Afficher 1, 2 ou les 3 années de formation sans autre filtrage peut être géré uniquement au niveau de la vue.
*/

// loadind data (and wait for it !)
await M.init();

let events1 = M.getEvents("mmi1");
let events2 = M.getEvents("mmi2");
let events3 = M.getEvents("mmi3");

// creating events in the calendar
V.uicalendar.createEvents( events1 );
V.uicalendar.createEvents( events2 );
V.uicalendar.createEvents( events3 );

V.setColor();

let changes = {};

events1.forEach(event => {
  if(event.title.includes("CM")) {
    changes.backgroundColor = "#7B1F30";
  }
  else if(event.title.includes("TD")) {
    changes.backgroundColor = "#954B59";
  }
  else if(event.title.includes("TP")) {
    changes.backgroundColor = "#AA6F7A";
  }
  else {
    changes.backgroundColor = "#6D071A";
  }
  V.uicalendar.updateEvent(event.id, event.calendarId, changes);
});

events2.forEach(event => {
  if(event.title.includes("CM")) {
    changes.backgroundColor = "#1919FF";
  }
  else if(event.title.includes("TD")) {
    changes.backgroundColor = "#4747FF";
  }
  else if(event.title.includes("TP")) {
    changes.backgroundColor = "#6B6BFF";
  }
  else {
    changes.backgroundColor = "#35357F";
  }
  V.uicalendar.updateEvent(event.id, event.calendarId, changes);
});

events3.forEach(event => {
  if(event.title.includes("CM")) {
    changes.backgroundColor = "#196631";
  }
  else if(event.title.includes("TD")) {
    changes.backgroundColor = "#47845A";
  }
  else if(event.title.includes("TP")) {
    changes.backgroundColor = "#6B9C7B";
  }
  else {
    changes.backgroundColor = "#00561B";
  }
  V.uicalendar.updateEvent(event.id, event.calendarId, changes);
});

function handlerClick_nav(ev) {
  if(ev.target.id == "prev") {
    V.uicalendar.prev()
  }
  if(ev.target.id == "now") {
    V.uicalendar.today()
  }
  if(ev.target.id == "next") {
    V.uicalendar.next()
  }

  if(ev.target.id == "mmi1" || ev.target.id == "mmi2" || ev.target.id == "mmi3") {
    V.uicalendar.setCalendarVisibility(ev.target.id, ev.target.checked);
  }

  if(ev.target.parentNode.id == 'group') {
    V.uicalendar.clear();
    V.uicalendar.createEvents(M.filterAllByGroup(ev.target.value));
  }

  if(ev.target.id == "search") {
    V.uicalendar.clear();
    console.log(ev.target.value)
    console.log(M.filterByTag(ev.target.value))
  }
}

export { handlerClick_nav };