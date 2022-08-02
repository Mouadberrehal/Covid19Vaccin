import Vue from 'vue';
import VueI18n from 'vue-i18n';
import { LocaleMessages } from 'vue-i18n/types';

Vue.use(VueI18n)

function loadLocaleMessages(): LocaleMessages {
    const locales = require.context("@/locales", true, /[A-Za-z0-9-_,\s]+\.json$/i);
    const messages: LocaleMessages = {};
    locales.keys().forEach(key => {
        const matched = key.match(/([A-Za-z0-9-_]+)\./i);
        if (matched && matched.length > 1) {
            const locale = matched[1];
            messages[locale] = locales(key);
        }
    })
    return messages;
}

interface LanguageSupport {
    languages: readonly string[] | undefined;
    language: string | undefined;
    browserLanguage: string | undefined;
    userLanguage: string | undefined;
}

const navigator = window.navigator as unknown as LanguageSupport;
const languages: readonly string[] = navigator.languages ? navigator.languages
    : (navigator.language ? [navigator.language]
        : (navigator.browserLanguage ? [navigator.browserLanguage]
            : (navigator.userLanguage ? [navigator.userLanguage] : ['fr'])));

// force french if not english
const language = languages[0];
const shortLanguage = language.indexOf('-') > 0 ? language.split('-')[0] : (language.indexOf('_') > 0 ? language.split('_')[0] : language);

export default new VueI18n({
    // init i18n with browser locale if not set in environment
    locale: process.env.VUE_APP_I18N_LOCALE || (shortLanguage == 'en' ? 'en' : 'fr'),
    fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'fr',
    messages: loadLocaleMessages()
});

