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
  mmi1:{CM:"#7B1F30", TD:"#954B59", TP:"#AA6F7A", Autre:"#6D071A"},
  mmi2:{CM:"#1919FF", TD:"#4747FF", TP:"#6B6BFF", Autre:"#35357F"},
  mmi3:{CM:"#196631", TD:"#47845A", TP:"#6B9C7B", Autre:"#00561B"}
}

let nav = document.querySelector('.nav')
nav.addEventListener("click", handlerClick_nav)
let search = document.querySelector('#search');
search.addEventListener("keyup", handlerClick_nav);

if(window.matchMedia("(max-width: 500px)").matches) {
  V.uicalendar.changeView("day");
}

export { V };