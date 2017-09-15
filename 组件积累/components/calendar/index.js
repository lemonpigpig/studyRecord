import GzCalendar from './calendar.vue';

GzCalendar.install = (Vue) => {
    Vue.component(GzCalendar.name, GzCalendar);
};

export default GzCalendar;
