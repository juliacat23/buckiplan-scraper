import * as ical from '../utils/ical';

export default class AvailableSection {
    constructor(subject, catalogNumber, row) {
        this.subject = subject;
        this.catalogNumber = catalogNumber;
        this.sectionIdentifier = row[0];
        this.sectionInfo = row[1];
        this.sectionNumber = (function () {
            try {
                return row[1].split('-')[0]; // "01"
            } catch (err) {}
        })();
        this.instructionType = (function () {
            try {
                return row[1].split('-')[1].split('\n')[0]; // "LEC" vs "LAB"
            } catch (err) {}
        })();
        this.sectionLimitation = (function () {
            try {
                return row[1].split('-')[1].split('\n')[1]; // "Regular" vs "Honors" ???
            } catch (err) {}
        })();
        this.meetingTimeWritten = row[2];
        this.meetingStartTime = (function () {
            try {
                return row[2].split(' ')[1];
            } catch (err) {}
        })();
        this.meetingEndTime = (function () {
            try {
                return row[2].split(' ')[3];
            } catch (err) {}
        })();
        this.meetingWeekdays = (function () {
            try {
                // see: https://stackoverflow.com/a/25452019
                return row[2]
                    .split(' ')[0]
                    .replace(/([A-Z])/g, ' $1')
                    .trim()
                    .split(' ');
            } catch (err) {}
        })();
        this.location = row[3];
        this.instructor = row[4];
        this.meetingDates = row[6];
        this.semesterStartDate = (function () {
            try {
                return row[6].split('-')[0].trim(); // "01/13/2020"
            } catch (err) {}
        })();
        this.semesterEndDate = (function () {
            try {
                return row[6].split('-')[1].trim(); // "01/13/2020"
            } catch (err) {}
        })();
        this.campus = row[7];
        this.instructionMode = row[8];
        this.registrationStatus = row[10];
        // Intepretted
        // Reference: https://icalendar.org/
        //this.calendarFile = ical.generateICAL(this);
        this.calendarFile = '';
    }
}
