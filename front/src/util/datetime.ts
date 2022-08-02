import {
    Locale
} from 'vue-i18n/types'
import dayjs from 'dayjs';
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import LocaleData from "dayjs/plugin/localeData";
import CustomParseFormat from "dayjs/plugin/customParseFormat";
import Timezone from "dayjs/plugin/timezone";
// TODO import all supported locales
import 'dayjs/locale/fr';
import 'dayjs/locale/en-gb';
import 'dayjs/locale/en';

dayjs.extend(LocalizedFormat);
dayjs.extend(LocaleData);
dayjs.extend(CustomParseFormat);
dayjs.extend(Timezone);

export function getIsoDate(d: Date | null): string | null {
    if (!d) {
        return null;
    }
    const pad = (num: number, places: number) =>
        String(num).padStart(places, "0");
    return (
        pad(d.getFullYear(), 4) +
        "-" +
        pad(d.getMonth() + 1, 2) +
        "-" +
        pad(d.getDate(), 2)
    );
}

export function formatIsoDate(locale: Locale, d: string): string {
    // input date is in ISO8601 format (e.g. 2021-02-24)
    // result is a date formatted in the input locale
    return dayjs(d).locale(locale).format('l');
}

export function parseDateAsEpochSeconds(locale: Locale, d: string): number {
    // parse date using format for input locale (try both L and l formats)
    return dayjs(d, dayjs().locale(locale).localeData().longDateFormat("l")).unix();
}

export function formatIsoTimestamp(locale: Locale, timestamp: string): string {
    // input timestamp is in ISO8601 format (e.g. 2021-02-24T22:00:23.941353Z)
    // result is a timestamp formatted in the input locale
    return dayjs(timestamp).locale(locale).format('l LT');
}

export function parseTimestampAsEpochSeconds(locale: Locale, t: string): number {
    // parse timestamp using format for input locale
    const l = dayjs().locale(locale).localeData().longDateFormat('l');
    const LT = dayjs().locale(locale).localeData().longDateFormat('LT');
    return dayjs(t, `${l} ${LT}`, dayjs().locale(locale).locale()).unix();
}

export function formatIsoTime(locale: Locale, timestamp: string): string {
    // input timestamp is in ISO8601 format (e.g. 2021-02-24T22:00:23.941353Z)
    // result is a time formatted in the input locale
    return dayjs(timestamp).locale(locale).format('LT');
}

export function replaceTimestamp(day: Date, timestamp: Date): Date {
    const d = new Date(day);
    d.setUTCHours(timestamp.getUTCHours());
    d.setUTCMinutes(timestamp.getUTCMinutes());
    d.setUTCSeconds(timestamp.getUTCSeconds());
    d.setUTCMilliseconds(timestamp.getUTCMilliseconds());
    return d;
}