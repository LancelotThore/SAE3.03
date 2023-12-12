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
  template: {
    time: function(event) {
      return `<span style="color: white;">${event.title}</span>`;
    }
  },
 
 
});

V.setColor = function() {
  V.uicalendar.setCalendarColor("mmi1", {
    backgroundColor: '#E87956',
  });
  
  V.uicalendar.setCalendarColor("mmi2", {
    backgroundColor: '#679690',
  });
  
  V.uicalendar.setCalendarColor("mmi3", {
    backgroundColor: '#585858',
  });
}

let nav = document.querySelector('.nav')
nav.addEventListener("click", handlerClick_nav)

export { V };