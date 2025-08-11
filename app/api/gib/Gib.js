import { v1 as uuidv1, validate as uuidValidate } from "uuid";
import Client from "./Client";

export default class Gib {
  static API = {
    gateways: {
      prod: "https://earsivportal.efatura.gov.tr",
      test: "https://earsivportaltest.efatura.gov.tr",
    },
    paths: {
      esign: "/earsiv-services/esign",
      login: "/earsiv-services/assos-login",
      dispatch: "/earsiv-services/dispatch",
      download: "/earsiv-services/download",
    },
  };

  constructor(
    documentType,
    testMode = false,
    username = null,
    password = null,
    token = null
  ) {
    this.documentType = documentType;
    this.testMode = testMode;
    this.username = username;
    this.password = password;
    this.token = token;
    this.uuidValue = null;
    this.filters = {};
    this.limitValue = null;
    this.sortByDescFlag = false;
    this.lastId = null;
    this.columns = [];
    this.rowCount = 0;
  }

  testModeOn() {
    this.testMode = true;
    return this;
  }

  setCredentials(username, password) {
    this.username = username;
    this.password = password;
    return this;
  }

  getCredentials() {
    return {
      username: this.username,
      password: this.password,
    };
  }

  setToken(token) {
    this.token = token;
    return this;
  }

  getToken() {
    return this.token;
  }

  setUuid(uuid) {
    const arr = Array.isArray(uuid) ? uuid : [uuid];
    arr.forEach((id) => {
      if (!uuidValidate(id)) {
        throw new Error(`Uuid doğrulanamadı: ${id}`);
      }
    });
    this.uuidValue = uuid;
    return uuid;
  }

  getUuid() {
    return this.uuidValue;
  }

  setFilters(filters = {}) {
    this.filters = filters;
    return this;
  }

  setLimit(limit = 0, offset = 0) {
    if (limit === 0) this.limitValue = null;
    else this.limitValue = { offset, limit };
    return this;
  }

  sortAsc() {
    this.sortByDescFlag = false;
    return this;
  }

  sortDesc() {
    this.sortByDescFlag = true;
    return this;
  }

  setLastId(uuid) {
    this.lastId = uuid;
    return this;
  }

  lastId() {
    return this.lastId;
  }

  selectColumn(column, key = null) {
    this.columns = [column, key];
    return this;
  }

  mapColumn(data) {
    if (this.columns.length) {
      data =
        this.columns[1] === null
          ? data.map((item) => item[this.columns[0]])
          : Object.fromEntries(
              data.map((item) => [item[this.columns[0]], item[this.columns[1]]])
            );
      this.columns = [];
    }
    return data;
  }

  async login() {
    if (!this.username || !this.password) {
      throw new Error("Kullanıcı adı ve şifre zorunludur.");
    }

    const params = {
      assoscmd: this.testMode ? "login" : "anologin",
      userid: this.username,
      sifre: this.password,
      sifre2: this.password,
      parola: this.password,
      rtype: "json",
    };

    const client = new Client(this.getGateway("login"), params, true);
    const response = await client.get();

    if (!response?.token) {
      throw new Error("Token alınamadı.");
    }
    this.setToken(response.token);
    return this;
  }

  async logout() {
    const params = {
      assoscmd: "logout",
      token: this.getToken(),
    };
    const client = new Client(this.getGateway("login"), params, true);
    this.setToken(null);
    this.setCredentials(null, null);
    const response = await client.get();

    return response;
  }

  async getUserData() {
    const params = this.setParams([
      "EARSIV_PORTAL_KULLANICI_BILGILERI_GETIR",
      "RG_KULLANICI",
    ]);
    const client = new Client(this.getGateway("dispatch"), params, true);
    const response = await client.get("data");

    return response;
  }

  async updateUserData(userData) {
    const params = this.setParams(
      ["EARSIV_PORTAL_KULLANICI_BILGILERI_KAYDET", "RG_KULLANICI"],
      userData
    );
    const client = new Client(this.getGateway("dispatch"), params, true);
    const response = await client.get("data");

    return !!response;
  }

  async getPhoneNumber() {
    const params = this.setParams([
      "EARSIV_PORTAL_TELEFONNO_SORGULA",
      "RG_BASITTASLAKLAR",
    ]);
    const client = new Client(this.getGateway("dispatch"), params, true);
    const response = await client.object("data");

    return response?.telefon ?? null;
  }

  async startSmsVerification() {
    const phone = await this.getPhoneNumber();
    if (!phone) return null;

    const params = this.setParams(
      ["EARSIV_PORTAL_SMSSIFRE_GONDER", "RG_SMSONAY"],
      {
        CEPTEL: phone,
        KCEPTEL: false,
        TIP: "",
      }
    );

    const client = new Client(this.getGateway("dispatch"), params, true);

    const response = await client.object("data");

    return response?.oid ?? null;
  }

  /**
   * getRecipientData
   */
  async getRecipientData(taxOrTrId) {
    const params = this.setParams(
      ["SICIL_VEYA_MERNISTEN_BILGILERI_GETIR", "RG_BASITFATURA"],
      {
        vknTcknn: taxOrTrId,
      }
    );

    const client = new Client(this.getGateway("dispatch"), params, true);

    const response = await client.object("data");
    return response;
  }

  async completeSmsVerification(code, oid, documents) {
    const setToSign = documents.map((uuid) => ({
      belgeTuru: this.documentType,
      ettn: uuid,
    }));
    const params = this.setParams(["0lhozfib5410mp", "RG_SMSONAY"], {
      DATA: setToSign,
      SIFRE: code,
      OID: oid,
      OPR: 1,
    });
    const client = new Client(this.getGateway("dispatch"), params, true);
    const sonuc = (await client.object("data")?.sonuc) ?? "0";

    if (sonuc === "1") {
      this.rowCount = documents.length;
      return true;
    }
    return false;
  }

  async createDraft(data) {
    if (data?.getUuid) {
      this.setLastId(data.getUuid());
      data = data.export();
    }

    const requestPath = this.getRequestPathForDocumentType("create");

    const params = this.setParams(requestPath, data);
    const client = new Client(this.getGateway("dispatch"), params, true);
    const response = await client.get("data");

    if (response.includes("başarıyla")) {
      throw new Error("Taslak oluşturma başarısız.");
    }
    return true;
  }

  async deleteDraft(documents, reason = "Hatalı İşlem") {
    const toDelete = documents.map((uuid) => ({
      belgeTuru: this.documentType,
      ettn: uuid,
    }));
    const params = this.setParams(
      ["EARSIV_PORTAL_FATURA_SIL", "RG_TASLAKLAR"],
      {
        silinecekler: toDelete,
        aciklama: reason,
      }
    );
    const client = new Client(this.getGateway("dispatch"), params, true);
    const data = await client.get("data");
    const match = data.match(/(\d+)/);
    if (match) {
      this.rowCount = parseInt(match[1], 10);
      return true;
    }
    return false;
  }

  async getDocument(uuid) {
    const requestPath = this.getRequestPathForDocumentType("get");

    const params = this.setParams(requestPath, { ettn: uuid });
    const client = new Client(this.getGateway("dispatch"), params, true);
    const response = await client.get("data");
    return response;
  }

  async getLastDocument() {
    const lastDocs = await this.onlyCurrent()
      .setLimit(1)
      .sortDesc()
      .getAll(this.getFormattedDate(-365), this.getFormattedDate(0));

    if (!lastDocs.length) return {};

    return this.getDocument(lastDocs[0].ettn);
  }

  async getHtml(uuid, signed = true) {
    const params = this.setParams(
      ["EARSIV_PORTAL_FATURA_GOSTER", "RG_TASLAKLAR"],
      {
        ettn: uuid,
        onayDurumu: signed ? "Onaylandı" : "Onaylanmadı",
      }
    );
    const client = new Client(this.getGateway("dispatch"), params, true);
    const response = await client.get("data");
    return response;
  }

  getDownloadURL(uuid, signed = true) {
    return (
      this.getGateway("download") +
      "?" +
      new URLSearchParams({
        token: this.getToken(),
        ettn: uuid,
        onayDurumu: signed ? "Onaylandı" : "Onaylanmadı",
        belgeTip: this.documentType,
        cmd: "EARSIV_PORTAL_BELGE_INDIR",
      }).toString()
    );
  }

  async saveToDisk(uuid, dir = ".", fileName = null) {
    const fs = await import("fs/promises");
    const path = await import("path");

    const baseName = fileName || uuid;
    const fullPath = path.join(dir, baseName + ".zip");

    // Dosyayı indir
    const res = await fetch(this.getDownloadURL(uuid));
    if (!res.ok) throw new Error("Dosya indirilemedi");

    const buffer = await res.arrayBuffer();
    await fs.writeFile(fullPath, Buffer.from(buffer));

    return fullPath;
  }

  async cancellationRequest(uuid, explanation) {
    const params = this.setParams(
      ["EARSIV_PORTAL_IPTAL_TALEBI_OLUSTUR", "RG_TASLAKLAR"],
      {
        ettn: uuid,
        onayDurumu: "Onaylandı",
        belgeTuru: this.documentType,
        talepAciklama: explanation,
      }
    );
    const client = new Client(this.getGateway("dispatch"), params, true);
    const response = await client.get("data");

    return response;
  }

  async objectionRequest(
    uuid,
    objectionMethod,
    documentId,
    documentDate,
    explanation
  ) {
    const params = this.setParams(
      ["EARSIV_PORTAL_ITIRAZ_TALEBI_OLUSTUR", "RG_TASLAKLAR"],
      {
        ettn: uuid,
        onayDurumu: "Onaylandı",
        belgeTuru: this.documentType,
        itirazYontemi: objectionMethod,
        referansBelgeId: documentId,
        referansBelgeTarihi: documentDate,
        talepAciklama: explanation,
      }
    );
    const client = new Client(this.getGateway("dispatch"), params, true);
    const response = await client.get("data");

    return response;
  }

  async getRequests(startDate, endDate) {
    const params = this.setParams(
      [
        "EARSIV_PORTAL_GELEN_IPTAL_ITIRAZ_TALEPLERINI_GETIR",
        "RG_IPTALITIRAZTASLAKLAR",
      ],
      {
        baslangic: startDate,
        bitis: endDate,
      }
    );
    const client = new Client(this.getGateway("dispatch"), params, true);
    const response = await client.get("data");

    return response;
  }

  async getAll(startDate, endDate) {
    const params = this.setParams(
      ["EARSIV_PORTAL_TASLAKLARI_GETIR", "RG_TASLAKLAR"],
      {
        baslangic: startDate,
        bitis: endDate,
        hangiTip: this.testMode ? "eArsivDiger" : "eArsivFatura",
      }
    );
    const client = new Client(this.getGateway("dispatch"), params, true);
    let docs = (await client.get("data")) || [];

    // Filtre, sıralama, limit işlemleri:
    docs = this.applyFilters(docs);
    this.rowCount = docs.length;
    if (this.sortByDescFlag) docs = docs.reverse();
    if (this.limitValue) {
      docs = docs.slice(
        this.limitValue.offset,
        this.limitValue.offset + this.limitValue.limit
      );
    }
    if (this.columns.length) {
      docs = this.mapColumn(docs);
    }
    return docs;
  }

  applyFilters(documents) {
    if (!documents) return [];
    if (Object.keys(this.filters).length === 0) return documents;

    return documents.filter((doc) => {
      return Object.entries(this.filters).every(([key, val]) => {
        if (!doc.hasOwnProperty(key)) return false;
        if (typeof doc[key] === "string" && typeof val === "string") {
          return doc[key].toLowerCase().includes(val.toLowerCase());
        }
        return doc[key] === val;
      });
    });
  }

  onlySigned() {
    this.filters.onayDurumu = "Onaylandı";
    return this;
  }

  onlyUnsigned() {
    this.filters.onayDurumu = "Onaylanmadı";
    return this;
  }

  onlyDeleted() {
    this.filters.onayDurumu = "Silinmiş";
    return this;
  }

  onlyCurrent() {
    this.filters.belgeTuru = this.documentType;
    return this;
  }

  onlyInvoice() {
    this.filters.belgeTuru = "FATURA";
    return this;
  }

  onlyProducerReceipt() {
    this.filters.belgeTuru = "MUSTAHSIL";
    return this;
  }

  onlySelfEmployedReceipt() {
    this.filters.belgeTuru = "SERBEST";
    return this;
  }

  findRecipientName(value) {
    this.filters.aliciUnvanAdSoyad = value;
    return this;
  }

  findRecipientId(value) {
    this.filters.aliciVknTckn = value;
    return this;
  }

  findDocumentId(value) {
    this.filters.belgeNumarasi = value;
    return this;
  }

  findEttn(value) {
    this.filters.ettn = value;
    return this;
  }

  setParams(command, payload = {}) {
    const [cmd, pageName] = command;
    return {
      callid: uuidv1(),
      token: this.getToken(),
      cmd,
      pageName,
      jp: JSON.stringify(payload || {}),
    };
  }

  getGateway(path) {
    if (!(path in Gib.API.paths)) {
      throw new Error("Geçersiz path gönderildi.");
    }
    return (
      (this.testMode ? Gib.API.gateways.test : Gib.API.gateways.prod) +
      Gib.API.paths[path]
    );
  }

  getRequestPathForDocumentType(action) {
    if (action === "create") {
      switch (this.documentType) {
        case "FATURA":
          return ["EARSIV_PORTAL_FATURA_OLUSTUR", "RG_BASITFATURA"];
        case "MUSTAHSIL":
          return ["EARSIV_PORTAL_MUSTAHSIL_OLUSTUR", "RG_MUSTAHSIL"];
        case "SERBEST":
          return ["EARSIV_PORTAL_SERBEST_MESLEK_MAKBUZU_OLUSTUR", "RG_SERBEST"];
        default:
          throw new Error("Geçersiz belge türü");
      }
    } else if (action === "get") {
      switch (this.documentType) {
        case "FATURA":
          return ["EARSIV_PORTAL_FATURA_GETIR", "RG_TASLAKLAR"];
        case "MUSTAHSIL":
          return ["EARSIV_PORTAL_MUSTAHSIL_GETIR", "RG_MUSTAHSIL"];
        case "SERBEST":
          return ["EARSIV_PORTAL_SERBEST_MESLEK_GETIR", "RG_SERBEST"];
        default:
          throw new Error("Geçersiz belge türü");
      }
    }
    throw new Error("Geçersiz işlem türü");
  }

  getFormattedDate(offsetDays = 0) {
    const dt = new Date();
    dt.setDate(dt.getDate() + offsetDays);
    const d = dt.getDate().toString().padStart(2, "0");
    const m = (dt.getMonth() + 1).toString().padStart(2, "0");
    const y = dt.getFullYear();
    return `${d}/${m}/${y}`;
  }
}
