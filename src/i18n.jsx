import { createContext, useContext, useState, useEffect, useCallback } from 'react';

export const LANGUAGES = [
  { code: 'en', label: 'ENG' },
  { code: 'bm', label: 'BM' },
  { code: 'zh', label: '中文' },
];

// BM + Simplified Chinese are AI drafts — review before launch.
const translations = {
  en: {
    'common.continue': 'Continue',
    'common.back': 'Back',
    'common.startOver': 'Start over',
    'common.checkMazda': 'Check my Mazda',
    'common.whatsapp': 'Chat on WhatsApp',
    'common.comingSoon': 'Coming Soon',
    'common.optional': '(optional)',
    'contact.title': 'Where should we send your {quote}?',
    'contact.sub': "We'll check availability for your area and follow up on WhatsApp.",
    'contact.name': 'Name',
    'contact.whatsapp': 'WhatsApp number',
    'contact.email': 'Email',
    'contact.area': 'State',
    'contact.selectArea': 'Select your state',
    'contact.err.name': 'Please enter your name.',
    'contact.err.whatsapp': 'Enter a valid Malaysian number.',
    'contact.err.email': 'Enter a valid email.',
    'contact.err.area': 'Please select your state.',
    'contact.consent':
      "By submitting, you agree to be contacted about your enquiry and consent to your details being processed under Malaysia's PDPA 2010.",
    'entry.title': 'Turn your Mazda into a {CarPlay} car.',
    'entry.sub': 'We come to you. Starting from as low as RM399.',  // ponytail: update price here
    'services.title': 'What are you {interested} in?',
    'services.sub': "Pick everything you'd like — you can choose more than one.",
    'model.title': 'Which {Mazda} do you drive?',
    'model.sub': 'Tap your model.',
    'generation.title': 'Which {generation}?',
    'generation.sub': 'Pick the version that matches your car — the years help.',
    'package.title': 'Pick your {upgrade}',
    'package.sub': 'Starting at RM899 — a fraction of what Mazda dealerships charge for a factory retrofit.',
    'package.popular': 'Most popular',
    'package.wired': 'Wired',
    'package.wired.feat': 'Plug in with a cable',
    'package.wireless': 'Wireless',
    'package.wireless.feat': 'Connects automatically, no cable',
    'usb.title': 'Choose your {USB ports}',
    'usb.sub': 'For charging and connecting your phone.',
    'summary.title': 'Your {quote}',
    'summary.usbAddon': 'USB-C upgrade',
    'summary.total': 'Total',
    'summary.future': "We'll also follow up on:",
    'appointment.title': 'When works {best}?',
    'appointment.sub': 'Optional — helps us plan your install.',
    'appointment.time': 'Preferred time',
    'appointment.place': 'Where?',
    'appointment.skip': 'Skip for now',
    'time.weekday': 'Weekday',
    'time.evening': 'Evening',
    'time.weekend': 'Weekend',
    'time.flexible': 'Flexible',
    'place.home': 'Home',
    'place.office': 'Office',
    'place.condo': 'Condo',
    'place.other': 'Other',
    'success.qualified.title': 'Your quote is ready',
    'success.qualified.body': "Your slot isn't confirmed yet — tap below to lock it in on WhatsApp. We reply within the hour.",
    'success.expansion.title': 'Not in your area — yet',
    'success.expansion.body': "We've saved your interest and will reach out the moment we cover your area.",
    'success.incompatible.title': "We'll be in touch",
    'success.incompatible.body': "We've noted your car and will follow up if options open up.",
    'success.future.title': 'Thanks — interest noted',
    'success.future.body': "We'll message you the moment these launch.",
    'service.carplay.label': 'CarPlay / Android Auto',
    'service.carplay.desc': 'Wireless or wired smartphone mirroring on your Mazda Connect screen.',
    'service.ambient_lighting.label': 'Ambient Lighting',
    'service.ambient_lighting.desc': 'Customisable interior accent lighting.',
    'service.starlight_roof.label': 'Starlight Roof',
    'service.starlight_roof.desc': 'Fibre-optic starlit headliner.',
  },
  bm: {
    'common.continue': 'Teruskan',
    'common.back': 'Kembali',
    'common.startOver': 'Mula semula',
    'common.checkMazda': 'Semak Mazda saya',
    'common.whatsapp': 'Sembang di WhatsApp',
    'common.comingSoon': 'Akan Datang',
    'common.optional': '(pilihan)',
    'contact.title': 'Ke mana kami patut hantar {sebut harga} anda?',
    'contact.sub': 'Kami akan semak ketersediaan untuk kawasan anda dan hubungi anda di WhatsApp.',
    'contact.name': 'Nama',
    'contact.whatsapp': 'Nombor WhatsApp',
    'contact.email': 'E-mel',
    'contact.area': 'Negeri',
    'contact.selectArea': 'Pilih negeri anda',
    'contact.err.name': 'Sila masukkan nama anda.',
    'contact.err.whatsapp': 'Masukkan nombor Malaysia yang sah.',
    'contact.err.email': 'Masukkan e-mel yang sah.',
    'contact.err.area': 'Sila pilih negeri anda.',
    'contact.consent':
      'Dengan menghantar, anda bersetuju untuk dihubungi mengenai pertanyaan anda dan membenarkan maklumat anda diproses di bawah PDPA 2010 Malaysia.',
    'entry.title': 'Naik taraf Mazda anda',
    'entry.sub': 'CarPlay, Android Auto dan banyak lagi — disemak untuk kereta dan kawasan anda dalam masa seminit.',
    'services.title': 'Apa yang anda {minati}?',
    'services.sub': 'Pilih semua yang anda mahu — anda boleh pilih lebih daripada satu.',
    'model.title': 'Mazda {mana} yang anda pandu?',
    'model.sub': 'Ketik model anda.',
    'generation.title': 'Generasi {mana}?',
    'generation.sub': 'Pilih versi yang sepadan dengan kereta anda — tahun membantu.',
    'package.title': 'Pilih {naik taraf} anda',
    'package.sub': 'Pilih cara telefon anda bersambung.',
    'package.wired': 'Berwayar',
    'package.wired.feat': 'Sambung dengan kabel',
    'package.wireless': 'Tanpa Wayar',
    'package.wireless.feat': 'Bersambung automatik, tanpa kabel',
    'usb.title': 'Pilih {port USB} anda',
    'usb.sub': 'Untuk mengecas dan menyambung telefon anda.',
    'summary.title': '{Sebut harga} anda',
    'summary.usbAddon': 'Naik taraf USB-C',
    'summary.total': 'Jumlah',
    'summary.future': 'Kami juga akan hubungi anda tentang:',
    'appointment.title': 'Bila yang {sesuai}?',
    'appointment.sub': 'Pilihan — membantu kami merancang pemasangan anda.',
    'appointment.time': 'Masa pilihan',
    'appointment.place': 'Di mana?',
    'appointment.skip': 'Langkau buat masa ini',
    'time.weekday': 'Hari bekerja',
    'time.evening': 'Petang/Malam',
    'time.weekend': 'Hujung minggu',
    'time.flexible': 'Fleksibel',
    'place.home': 'Rumah',
    'place.office': 'Pejabat',
    'place.condo': 'Kondo',
    'place.other': 'Lain-lain',
    'success.qualified.title': 'Anda sudah sedia',
    'success.qualified.body': 'Kami terima maklumat anda. Tekan di bawah untuk sahkan di WhatsApp dan kami akan tetapkan pemasangan anda.',
    'success.expansion.title': 'Belum di kawasan anda',
    'success.expansion.body': 'Kami simpan minat anda dan akan hubungi sebaik sahaja kami meliputi kawasan anda.',
    'success.incompatible.title': 'Kami akan hubungi anda',
    'success.incompatible.body': 'Kami catat kereta anda dan akan susuli jika ada pilihan.',
    'success.future.title': 'Terima kasih — minat dicatat',
    'success.future.body': 'Kami akan maklumkan sebaik sahaja ini dilancarkan.',
    'service.carplay.label': 'CarPlay / Android Auto',
    'service.carplay.desc': 'Cerminan telefon pintar tanpa wayar atau berwayar pada skrin Mazda Connect anda.',
    'service.ambient_lighting.label': 'Pencahayaan Ambien',
    'service.ambient_lighting.desc': 'Pencahayaan aksen dalaman yang boleh disesuaikan.',
    'service.starlight_roof.label': 'Bumbung Starlight',
    'service.starlight_roof.desc': 'Siling berbintang gentian optik.',
  },
  zh: {
    'common.continue': '继续',
    'common.back': '返回',
    'common.startOver': '重新开始',
    'common.checkMazda': '检查我的马自达',
    'common.whatsapp': '通过 WhatsApp 联系',
    'common.comingSoon': '即将推出',
    'common.optional': '（选填）',
    'contact.title': '我们将{报价}发送到哪里？',
    'contact.sub': '我们将核对您所在地区的服务情况，并通过 WhatsApp 与您联系。',
    'contact.name': '姓名',
    'contact.whatsapp': 'WhatsApp 号码',
    'contact.email': '电子邮件',
    'contact.area': '州属',
    'contact.selectArea': '选择您的州属',
    'contact.err.name': '请输入您的姓名。',
    'contact.err.whatsapp': '请输入有效的马来西亚号码。',
    'contact.err.email': '请输入有效的电子邮件。',
    'contact.err.area': '请选择您的州属。',
    'contact.consent': '提交即表示您同意就您的咨询接受联系，并同意根据马来西亚《2010年个人资料保护法》(PDPA) 处理您的资料。',
    'entry.title': '升级您的马自达',
    'entry.sub': 'CarPlay、Android Auto 等——一分钟内为您的车型和地区完成核对。',
    'services.title': '您对什么{感兴趣}？',
    'services.sub': '选择您想要的所有项目——可多选。',
    'model.title': '您驾驶哪款{马自达}？',
    'model.sub': '点击您的车型。',
    'generation.title': '哪一{代}？',
    'generation.sub': '选择与您车辆匹配的版本——年份可作参考。',
    'package.title': '选择您的{升级}',
    'package.sub': '选择手机的连接方式。',
    'package.wired': '有线',
    'package.wired.feat': '使用数据线连接',
    'package.wireless': '无线',
    'package.wireless.feat': '自动连接，无需数据线',
    'usb.title': '选择您的{USB 接口}',
    'usb.sub': '用于充电和连接手机。',
    'summary.title': '您的{报价}',
    'summary.usbAddon': 'USB-C 升级',
    'summary.total': '总计',
    'summary.future': '我们还会跟进：',
    'appointment.title': '什么时间{最方便}？',
    'appointment.sub': '选填——帮助我们安排安装。',
    'appointment.time': '首选时间',
    'appointment.place': '地点？',
    'appointment.skip': '暂时跳过',
    'time.weekday': '工作日',
    'time.evening': '傍晚',
    'time.weekend': '周末',
    'time.flexible': '灵活',
    'place.home': '住家',
    'place.office': '办公室',
    'place.condo': '公寓',
    'place.other': '其他',
    'success.qualified.title': '一切就绪',
    'success.qualified.body': '我们已收到您的资料。点击下方在 WhatsApp 上确认，我们将为您安排安装。',
    'success.expansion.title': '暂未覆盖您的地区',
    'success.expansion.body': '我们已记录您的需求，覆盖您所在地区后会立即联系您。',
    'success.incompatible.title': '我们会与您联系',
    'success.incompatible.body': '我们已记录您的车型，若有方案会跟进。',
    'success.future.title': '感谢——已记录您的兴趣',
    'success.future.body': '相关功能推出后我们会通知您。',
    'service.carplay.label': 'CarPlay / Android Auto',
    'service.carplay.desc': '在马自达 Mazda Connect 屏幕上进行无线或有线手机互联。',
    'service.ambient_lighting.label': '氛围灯',
    'service.ambient_lighting.desc': '可自定义的车内氛围照明。',
    'service.starlight_roof.label': '星空顶',
    'service.starlight_roof.desc': '光纤星空车顶内衬。',
  },
};

const HTML_LANG = { en: 'en', bm: 'ms', zh: 'zh-Hans' };

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'en');

  useEffect(() => {
    localStorage.setItem('lang', lang);
    document.documentElement.lang = HTML_LANG[lang] || 'en';
  }, [lang]);

  // Falls back to English, then to the raw key, so missing translations never break the UI.
  const t = useCallback((key) => translations[lang]?.[key] ?? translations.en[key] ?? key, [lang]);

  return <LanguageContext.Provider value={{ lang, setLang, t }}>{children}</LanguageContext.Provider>;
}

export function useLang() {
  return useContext(LanguageContext);
}

export function useT() {
  return useContext(LanguageContext).t;
}

// Renders a string, turning {keyword} segments into lime keyword chips.
export function withChips(str) {
  return str.split(/(\{[^}]+\})/g).map((part, i) =>
    part.startsWith('{') && part.endsWith('}') ? (
      <span key={i} className="chip-lime">
        {part.slice(1, -1)}
      </span>
    ) : (
      part
    ),
  );
}
