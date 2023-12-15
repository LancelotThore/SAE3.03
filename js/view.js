import Calendar from '@toast-ui/calendar';
import '@toast-ui/calendar/dist/toastui-calendar.min.css';
import { handlerClick_nav } from '../main';

let V = {};

V.uicalendar = new Calendar('#calendar', {
  defaultView: 'week',
  isReadOnly: true,
  usageStatistics: false,
  useDetailPopup: true,
  week: {
    startDayOfWeek: 1,
    dayNames: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
    workweek: true,
    hourStart: 8,
    hourEnd: 20,
    taskView: false,
    eventView: ['time'],
  },
  month: {
    startDayOfWeek: 1,
    dayNames: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
    workweek: true,
    taskView: false,
    eventView: ['time'],
  },
  template: {
    time: function(event) {
      return `<span style="color: white;">${event.title}</span>`;
    }
  },
 
 
});

V.colorMap = {
  mmi1:{CM:"#007295", TD:"#0B9FAF", TP:"#9BD1C2", Autre:"#002C40"},
  mmi2:{CM:"#D26C12", TD:"#EE9C18", TP:"#E6D7B1", Autre:"#C44212"},
  mmi3:{CM:"#2D6A4F", TD:"#52B788", TP:"#74C69D", Autre:"#1B4332"}
}

V.settings = {
  promos: "",
  groupe: ""
}

let all = document.querySelector('.all');
all.addEventListener("click", handlerClick_nav);
all.addEventListener("select", handlerClick_nav);
all.addEventListener("keyup", handlerClick_nav);

if(window.matchMedia("(max-width: 500px)").matches) {
  V.uicalendar.changeView("day");
}

export { V };