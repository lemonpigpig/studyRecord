<template>
    <div class="gz-calendar">
        <div class="week-name-row">
            <div class="week-name">日</div>
            <div class="week-name">一</div>
            <div class="week-name">二</div>
            <div class="week-name">三</div>
            <div class="week-name">四</div>
            <div class="week-name">五</div>
            <div class="week-name">六</div>
        </div>
        <div class="month-area"
             v-for="monthPlusNumber in monthsCount">
            <div class="month-name"> {{getMonthName(monthPlusNumber-1)}} </div>
            <div class="month-data">
                <div class="month-week-row"
                     v-for="weekNumber in getMonthWeeks(monthPlusNumber-1)">
                    <div class="day-cell"
                         :class="{'active':isDayCellActive(monthPlusNumber-1,weekNumber-1,dayNumber-1),'disabled-active':isDayCellDisabledActive(monthPlusNumber-1,weekNumber-1,dayNumber-1),'disabled':!isDayCellAvailable(monthPlusNumber-1,weekNumber-1,dayNumber-1)}"
                         v-for="dayNumber in 7"
                         @click="clickDate(monthPlusNumber-1,weekNumber-1,dayNumber-1)">
                        <div class="day-number"
                             :class="{'is-weekend':isWeekend(monthPlusNumber-1,weekNumber-1,dayNumber-1)}"> {{getDayNumberForShow(monthPlusNumber-1,weekNumber-1,dayNumber-1)}} </div>
                        <div v-if="isStartDate(monthPlusNumber-1,weekNumber-1,dayNumber-1)"
                             class="label-bottom"> {{startDateLabel}} </div>
                        <div v-if="isEndDate(monthPlusNumber-1,weekNumber-1,dayNumber-1)"
                             class="label-bottom"> {{endDateLabel}} </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import moment from '../../utilities/moment.min';

export default {
    name: 'gz-calendar',
    author: '邓斌-Bean',
    title: '日历组件',
    props: {
        singleChoose: {
            type: Boolean,
            default: false
        },
        chooseDateType: {
            type: Number,
            default: 0
        },
        startDateLabel: {
            type: String,
            default: '开始日期'
        },
        endDateLabel: {
            type: String,
            default: '结束日期'
        },
        unavailableDays: {
            type: Array,
            default() {
                return [];
            }
        },
        availableStartDate: {
            type: String,
            default() {
                return moment().format('YYYY-MM-DD');
            }
        },
        availableEndDate: {
            type: String,
            default: null
        },
        availableDaysCount: {
            type: Number,
            default: -1
        },
        initStartDate: {
            type: String,
            default: null
        },
        initEndDate: {
            type: String,
            default: null
        }
    },
    data() {
        return {
            startDate: '',
            endDate: '',
            selectedMonthPlus: -1,
            selectedWeekIndex: -1,
            selectedDayIndex: -1,
            ignoreInitDate: false
        };
    },
    computed: {
        currentMonthIndex() {
            return moment().month();
        },
        currentMonthNumber() {
            return moment().month() + 1;
        },
        currentYearNumber() {
            return moment().year();
        },
        monthsCount() {
            const availableEndMoment = this.getAvailableEndMoment();
            if (!availableEndMoment) {
                return 1;
            }

            const endYear = availableEndMoment.year();
            const endMonth = availableEndMoment.month();
            return ((((endYear - this.currentYearNumber) * 12) + endMonth)
                - this.currentMonthIndex) + 1;
        }
    },
    methods: {
        clickDate(monthPlus, weekIndex, dayIndex) {
            if (this.isDayCellAvailable(monthPlus, weekIndex, dayIndex)) {
                const year = this.getYearNumber(monthPlus);
                const monthIndex = this.getMonthIndex(monthPlus);
                const dayNumber = this.getDayNumber(monthPlus, weekIndex, dayIndex);
                const date = moment([year, monthIndex, dayNumber]);
                this.$set(this, 'selectedMonthPlus', monthPlus);
                this.$set(this, 'selectedWeekIndex', weekIndex);
                this.$set(this, 'selectedDayIndex', dayIndex);
                this.$set(this, 'ignoreInitDate', true);
                this.$emit('selectDate', date.format('YYYY-MM-DD'));
            }
        },
        getMonthName(monthPlus) {
            return `${this.getMonthNumber(monthPlus)}月`;
        },
        getMonthIndex(monthPlus) {
            return (this.currentMonthIndex + monthPlus) % 12;
        },
        getMonthNumber(monthPlus) {
            return this.getMonthIndex(monthPlus) + 1;
        },
        getYearNumber(index) {
            return this.currentYearNumber + parseInt((this.currentMonthIndex + index) / 12, 10);
        },
        getMonth(monthPlus) {
            const year = this.getYearNumber(monthPlus);
            const monthIndex = this.getMonthIndex(monthPlus);
            return moment([year, monthIndex]);
        },
        getMonthDays(monthPlus) {
            const month = this.getMonth(monthPlus);
            return month.daysInMonth();
        },
        getMonthWeeks(monthPlus) {
            const month = this.getMonth(monthPlus);
            const monthDays = this.getMonthDays(monthPlus);
            if (month.day() === 0 && monthDays === 28) {
                return 4;
            }
            if (monthDays - 28 - (7 - month.day()) > 0) {
                return 6;
            }
            return 5;
        },
        getDayNumberForShow(monthPlus, weekIndex, dayIndex) {
            if (this.isToday(monthPlus, weekIndex, dayIndex)) {
                return '今天';
            }
            return this.getDayNumber(monthPlus, weekIndex, dayIndex);
        },
        getDayNumber(monthPlus, weekIndex, dayIndex) {
            const month = this.getMonth(monthPlus);
            const dayOfFirstDay = month.day();
            const monthDays = this.getMonthDays(monthPlus);
            const dayNumber = (((weekIndex * 7) + dayIndex) - dayOfFirstDay) + 1;

            if (dayNumber > 0 && dayNumber <= monthDays) {
                return dayNumber;
            }
            return '';
        },
        getDate(monthPlus, weekIndex, dayIndex) {
            const monthIndex = this.getMonthIndex(monthPlus);
            const year = this.getYearNumber(monthPlus);
            const month = this.getMonth(monthPlus);
            const dayOfFirstDay = month.day();
            const dayNumber = (((weekIndex * 7) + dayIndex) - dayOfFirstDay) + 1;
            return moment([year, monthIndex, dayNumber]);
        },
        getAvailableStartMoment() {
            return moment(this.availableStartDate);
        },
        getAvailableEndMoment() {
            const availableStartMoment = this.getAvailableStartMoment();
            let availableEndMonent;

            if (this.availableEndDate) {
                availableEndMonent = moment(this.availableEndDate);
            } else if (this.availableDaysCount >= 0) {
                availableEndMonent = availableStartMoment.clone().add(this.availableDaysCount - 1, 'day');
            }
            return availableEndMonent;
        },
        isDayCellActive(monthPlus, weekIndex, dayIndex) {
            if (monthPlus === this.selectedMonthPlus &&
                weekIndex === this.selectedWeekIndex && dayIndex === this.selectedDayIndex) {
                return true;
            }
            if (!this.ignoreInitDate && this.chooseDateType === 0 && this.initStartDate) {
                const date = this.getDate(monthPlus, weekIndex, dayIndex);
                const initSelected = moment(this.initStartDate);
                if (date.isSame(initSelected, 'day')) {
                    return true;
                }
            }
            if (!this.ignoreInitDate && this.chooseDateType === 1 && this.initEndDate) {
                const date = this.getDate(monthPlus, weekIndex, dayIndex);
                const initSelected = moment(this.initEndDate);
                if (date.isSame(initSelected, 'day')) {
                    return true;
                }
            }
            return false;
        },
        isDayCellDisabledActive(monthPlus, weekIndex, dayIndex) {
            if (this.chooseDateType === 1 && this.initStartDate) {
                const date = this.getDate(monthPlus, weekIndex, dayIndex);
                const initSelected = moment(this.initStartDate);
                if (date.isSame(initSelected, 'day')) {
                    return true;
                }
            }
            return false;
        },
        isStartDate(monthPlus, weekIndex, dayIndex) {
            const date = this.getDate(monthPlus, weekIndex, dayIndex);
            if (this.chooseDateType === 0 && this.isDayCellActive(monthPlus, weekIndex, dayIndex)) {
                return true;
            }
            if (this.chooseDateType === 1 && date.isSame(this.initStartDate, 'day')) {
                return true;
            }
            return false;
        },
        isEndDate(monthPlus, weekIndex, dayIndex) {
            if (this.isDayCellActive(monthPlus, weekIndex, dayIndex) && this.chooseDateType === 1) {
                return true;
            }
            return false;
        },
        isDayCellAvailable(monthPlus, weekIndex, dayIndex) {
            const date = this.getDate(monthPlus, weekIndex, dayIndex);
            const availableStartMoment = this.getAvailableStartMoment();
            const availableEndMonent = this.getAvailableEndMoment();
            if (availableEndMonent && date.isSameOrAfter(availableStartMoment, 'day') && date.isSameOrBefore(availableEndMonent)) {
                return true;
            }
            if (!availableEndMonent && date.isSameOrAfter(availableStartMoment, 'day')) {
                return true;
            }
            return false;
        },
        isToday(monthPlus, weekIndex, dayIndex) {
            const date = this.getDate(monthPlus, weekIndex, dayIndex);
            if (date.isSame(moment(), 'day')) {
                return true;
            }
            return false;
        },
        isWeekend(monthPlus, weekIndex, dayIndex) {
            const date = this.getDate(monthPlus, weekIndex, dayIndex);
            if (date.isoWeekday() > 5) {
                return true;
            }
            return false;
        }
    }
};
</script>
