//AMBA-注释

import Vue from 'vue';
import VueI18n from 'vue-i18n';
import en from '@/locales/en.js'
import zh from '@/locales/zh-CN.js'
import fr from '@/locales/fr.js'
import th from '@/locales/th.js'
import lao from '@/locales/lao.js'
Vue.use(VueI18n);
export default ({ app, store }) => {
  // Set i18n instance on app
  // This way we can use it in middleware and pages asyncData/fetch

  app.i18n = new VueI18n({
    locale: app.$cookies.get('locale') ? app.$cookies.get('locale') : 'en',
    fallbackLocale: 'en',
    messages: {
      'en': en,
      'zh-CN': zh,
      'fr': fr,
      'th': th,
      'lao': lao
    }
  });
  app.i18n.path = (link) => {
    if (app.i18n.locale === app.i18n.fallbackLocale) {
      return `/${link}`;
    }
    return `/${app.i18n.locale}/${link}`;
  }
}
