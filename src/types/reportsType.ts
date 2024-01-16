/**
 * Report type
 */

export interface ReportDataType {
  AYLIK_GELIR_GIDER: {
    ay: string;
    gelir: number;
    gider: number;
  }[];
  BANKA_NAKIT_DURUMLARI: {
    banka_adi: string;
    toplam_tutar: number;
  }[];
  BANKALARIN_TOPLAM_TUTARLARI: {
    toplam_tutar: number;
  };
  BIN30USTUGELIR: {
    toplam_tutar: number;
    toplam_adet: number;
  };
  BIN50USTUGIDER: {
    toplam_tutar: number;
    toplam_adet: number;
  };
  GUNLUK_GELIR_TOPLAMI: {
    toplam_tutar: number;
  };
  GUNLUK_GIDER_TOPLAMI: {
    toplam_tutar: number;
  };
}
