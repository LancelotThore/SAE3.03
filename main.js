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

let all = [...M.getEvents("mmi1"), ...M.getEvents("mmi2"), ...M.getEvents("mmi3")];

for (let ev of all) {
  ev.backgroundColor = V.colorMap[ev.calendarId][ev.type];
}

let mmi1 = [];
let mmi2 = [];
let mmi3 = [];

all.forEach(Element => {
  if (Element.calendarId == "mmi1") {
    mmi1.push(Element)
  }
  if (Element.calendarId == "mmi2") {
    mmi2.push(Element)
  }
  if (Element.calendarId == "mmi3") {
    mmi3.push(Element)
  }
})

const p = ["mmi1", "mmi2", "mmi3"];

// creating events in the calendar
allCalendar();

if (localStorage.getItem("promos") !== null) {
  let filtre = localStorage.getItem("promos");
  V.settings.promos = filtre;
  filtre = filtre.split(',');
  filtre.forEach(promo => {
    let checkbox = document.querySelector("#" + promo);
    checkbox.checked = true;
  })
  visibility();
}
else {
  localStorage.setItem("promos", "mmi1,mmi2,mmi3");
  localStorage.setItem("group", "tout");
  let promos = V.settings.promos;
  promos = promos.split(",");
  promos.forEach(element => {
    V.uicalendar.createEvents(element)
  });
}

function handlerClick_nav(ev) {
  if (ev.target.id == "prev") {
    V.uicalendar.prev()
  }
  if (ev.target.id == "now") {
    V.uicalendar.today()
  }
  if (ev.target.id == "next") {
    V.uicalendar.next()
  }

  if (ev.target.id == "mmi1" || ev.target.id == "mmi2" || ev.target.id == "mmi3") {
    V.uicalendar.setCalendarVisibility(ev.target.id, ev.target.checked);
    let tab = localStorage.getItem("promos");
    tab = tab.split(",");
    if (tab.includes(ev.target.id)) {
      let index = tab.indexOf(ev.target.id);
      if (index !== -1) {
        tab.splice(index, 1);
      }
    }
    else {
      tab.push(ev.target.id);
    }
    tab = tab.join(",");
    localStorage.setItem("promos", tab);
    V.settings.promos = tab;
  }

  if (ev.target.parentNode.id == 'group') {
    V.uicalendar.clear();
    if (ev.target.value == "tout") {
      allCalendar();
    }
    else {
      p.forEach(element => {
        let result = M.filterByTag('group', ev.target.value, element);
        for (let ele of result) {
          ele.backgroundColor = V.colorMap[ele.calendarId][ele.type];
        }
        V.uicalendar.createEvents(result);
      });
    }
    visibility();
  }

  if (ev.target.id == "search") {
    let tags = ev.target.value.split(' ');
    V.uicalendar.clear();
    p.forEach(element => {
      let result = M.filterByTag('tag', tags, element);
      for (let ele of result) {
        ele.backgroundColor = V.colorMap[ele.calendarId][ele.type];
      }
      V.uicalendar.createEvents(result);
    });
    visibility();
  }

  if (ev.target.parentNode.id == "view") {
    V.uicalendar.changeView(ev.target.id);
  }
}

function allCalendar() {
  V.uicalendar.createEvents(mmi1);
  V.uicalendar.createEvents(mmi2);
  V.uicalendar.createEvents(mmi3);
}

function visibility() {
  p.forEach(element => {
    if (V.settings.promos.includes(element) == false) {
      V.uicalendar.setCalendarVisibility(element, false);
    }
  });
}

export { handlerClick_nav };