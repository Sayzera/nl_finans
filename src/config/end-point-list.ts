export const endPoints = {
  nil_reports: {
    get: "https://test.noca.online/service/NOCA_PROD/WS_REPORT?apikey=nil_123456",
    description: `Dashboard ekranındaki raporlar için kullanılır.`,
  },
  nil_gelir_gider: {
    get: "https://test.noca.online/service/NOCA_PROD/WS_GELIR_GIDER?apikey=nil_123456",
    description: `Gelir ve gider raporları için kullanılır.`,
  },
  nil_banka_hesabi_tanimlama: {
    post: "https://test.noca.online/service/NOCA_PROD/WS_BANKA_HESABI_TANIMLAMA?apikey=nil_123456",
    description: `Banka hesabı tanımlama için kullanılır.`,
  },
  nil_banka_hesaplari: {
    get: "https://test.noca.online/service/NOCA_PROD/WS_BANKA_HESAPLARI?apikey=nil_123456",
    description: `Banka hesaplarını listelemek için kullanılır.`,
  },
  nil_banka_gunluk_gelir: {
    post: "https://test.noca.online/service/NOCA_PROD/WS_BANKA_GUNLUK_GELIR?apikey=nil_123456",
    description: `Banka günlük gelir raporu için kullanılır.`,
  },
  nil_aylik_gelir_gider: {
    post: "https://test.noca.online/service/NOCA_PROD/WS_AYLIK_GELIR_GIDER?apikey=nil_123456",
    description: `Aylık gelir gider raporu için kullanılır.`,
  },
  nil_50bin_uzeri_gider: {
    post: "https://test.noca.online/service/NOCA_PROD/WS_EllIBIN_USTU_GELIR_GIDER?apikey=nil_123456",
    description: `50.000 TL üzeri gider girişi`,
  },
  nil_30bin_uzeri_gelir: {
    post: "https://test.noca.online/service/NOCA_PROD/WS_OTUZBIN_USTU_GELIR_GIDER?apikey=nil_123456",
    description: `-`,
  },

  // List
  nil_gelir_gider_listesi: {
    get: "https://test.noca.online/service/NOCA_PROD/WS_GELIR_GIDER_LISTESI?apikey=nil_123456",
    description: `-`,
  },

  nil_aylik_gelir_gider_listesi: {
    get: "https://test.noca.online/service/NOCA_PROD/WS_AYLIK_GELIR_GIDER_LISTESI?apikey=nil_123456",
    description: `-`,
  },

  nil_50bin_ustu_liste: {
    get: "https://test.noca.online/service/NOCA_PROD/WS_ELIBINUSTU_LISTE?apikey=nil_123456",
    description: `-`,
  },
  nil_30bin_ustu_gelirler_liste: {
    get: "https://test.noca.online/service/NOCA_PROD/WS_OTUZBINUSTUGELIRLER_LISTESI?apikey=nil_123456",
    description: `-`,
  },
  nil_banka_hesaplari_listesi: {
    get: "https://test.noca.online/service/NOCA_PROD/WS_BANKA_HESABI_LISTELEME?apikey=nil_123456",
    description: `Banka hesaplarını listelemek için kullanılır.`,
  },
  nil_banka_gunluk_gelir_listesi: {
    get: "https://test.noca.online/service/NOCA_PROD/WS_BANKA_GUNLUK_GELIR_LISTESI?apikey=nil_123456",
    description: `Banka günlük gelir raporu için kullanılır.`,
  },

  // update
  nil_gunluk_gelir_gider_update: {
    post: "https://test.noca.online/service/NOCA_PROD/WS_UPDATE_GELIR_GIDER?apikey=nil_123456",
    description: `-`,
  },

  nil_aylik_gelir_gider_update: {
    post: "https://test.noca.online/service/NOCA_PROD/WS_UPDATE_AYLIK_GELIR_GIDER?apikey=nil_123456",
    description: `-`,
  },

  nil_otuzbin_uzeri_gelirler_update: {
    post: "https://test.noca.online/service/NOCA_PROD/WS_UPDATE_OTUZBINUSTU_GELIR?apikey=nil_123456",
    description: `-`,
  },

  nil_ellibin_uzeri_giderler_update: {
    post: "https://test.noca.online/service/NOCA_PROD/WS_UPDATE_ELLIBINUSTU_GIDER?apikey=nil_123456",
    description: `-`,
  },

  nil_update_banka_hesaplari: {
    post: "https://test.noca.online/service/NOCA_PROD/WS_UPDATE_BANKA_HESAPLARI?apikey=nil_123456",
    description: `-`,
  },

  nil_banka_gunluk_gelir_gider_update: {
    post: "https://test.noca.online/service/NOCA_PROD/WS_UPDATE_BANKA_GUNLUK_GELIR_GIDER?apikey=nil_123456",
    description: `-`,
  },
};
