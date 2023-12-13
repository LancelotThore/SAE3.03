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

for(let ev of all) {
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

// creating events in the calendar
V.uicalendar.createEvents( mmi1 );
V.uicalendar.createEvents( mmi2 );
V.uicalendar.createEvents( mmi3 );

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
    if(ev.target.checked == false) {
      let tab = localStorage.getItem("promos");
      tab = tab.split(",");
      console.log(tab)
      tab.forEach(element => {
        if(element !== ev.target.id) {
          tab = tab.push(ev.target.id)
          console.log(tab)
        }
        else {
          tab = tab.filter(element => element !== ev.target.id);
        }
        localStorage.setItem("promos", tab.join(","))
      });
    }
  }

  if(ev.target.parentNode.id == 'group') {
    V.uicalendar.clear();
    let grp = M.filterAllByGroup(ev.target.value);
    for(let el of grp) {
      el.backgroundColor = V.colorMap[el.calendarId][el.type];
    }
    V.uicalendar.createEvents(grp);
  }

  if(ev.target.id == "search") {
    let tags = ev.target.value.split(' ');
    V.uicalendar.clear();
    let result = M.filterByTag(tags);
    for(let ele of result) {
      ele.backgroundColor = V.colorMap[ele.calendarId][ele.type];
    }
    V.uicalendar.createEvents(result);
  }

  if(ev.target.parentNode.id == "view") {
    V.uicalendar.changeView(ev.target.id);
  }
}

// itération 10

let cookie = function(tab) {
  tab.forEach(element => {
    element = document.querySelector("#"+element);
    element.checked = false;
  });
}

if(localStorage.getItem("promos") != null) {
  let filtre  = localStorage.getItem("promos");
  filtre = filtre.split(",");
  console.log(filtre);
  cookie(filtre)
}
else {
  let filtre = localStorage.setItem("promos", "mmi1");
  console.log(filtre);
}

export { handlerClick_nav };