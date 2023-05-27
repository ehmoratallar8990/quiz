/* eslint-disable camelcase */
/* eslint-disable import/no-import-module-exports */
/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';
import getBrowserFingerprint from 'get-browser-fingerprint';
import { v4 as uuidv4 } from 'uuid';

export default {
  fingerprint: null,
  session_id: null,
  initSession() {
    const { fingerprint, session_id } = this;
    if (fingerprint == null) {
      this.fingerprint = getBrowserFingerprint();
    }
    if (session_id == null) {
      this.session_id = sessionStorage.getItem('session_id');
      if (this.session_id == null) {
        this.session_id = uuidv4();
        sessionStorage.setItem('session_id', this.session_id);
      }
    }
  },
  async get(url, config = {}) {
    this.initSession();
    const { fingerprint, session_id } = this;
    const { VUE_APP_API_BASE } = process.env;
    const fullurl = `${VUE_APP_API_BASE}${url}`;

    const requestconfig = { ...config };

    if (requestconfig?.headers == null) {
      requestconfig.headers = {};
    }

    requestconfig.headers.fingerprint = (requestconfig?.headers?.fingerprint != null)
      ? requestconfig.headers.fingerprint : fingerprint;
    requestconfig.headers.session_id = (requestconfig?.headers?.session_id != null)
      ? requestconfig.headers.session_id : session_id;

    const data = await axios.get(fullurl, requestconfig);
    return data;
  },
  async post(url, payload, config = {}) {
    this.initSession();
    const { fingerprint, session_id } = this;
    const { VUE_APP_API_BASE } = process.env;
    const fullurl = `${VUE_APP_API_BASE}${url}`;

    const requestconfig = { ...config };

    if (requestconfig?.headers == null) {
      requestconfig.headers = {};
    }

    requestconfig.headers.fingerprint = (requestconfig?.headers?.fingerprint != null)
      ? requestconfig.headers.fingerprint : fingerprint;
    requestconfig.headers.session_id = (requestconfig?.headers?.session_id != null)
      ? requestconfig.headers.session_id : session_id;

    const data = await axios.post(fullurl, payload, requestconfig);
    return data;
  },
  async put(url, payload, config = {}) {
    this.initSession();
    const { fingerprint, session_id } = this;
    const { VUE_APP_API_BASE } = process.env;
    const fullurl = `${VUE_APP_API_BASE}${url}`;

    const requestconfig = { ...config };

    if (requestconfig?.headers == null) {
      requestconfig.headers = {};
    }

    requestconfig.headers.fingerprint = (requestconfig?.headers?.fingerprint != null)
      ? requestconfig.headers.fingerprint : fingerprint;
    requestconfig.headers.session_id = (requestconfig?.headers?.session_id != null)
      ? requestconfig.headers.session_id : session_id;

    const data = await axios.put(fullurl, payload, requestconfig);
    return data;
  },
  async patch(url, payload, config = {}) {
    this.initSession();
    const { fingerprint, session_id } = this;
    const { VUE_APP_API_BASE } = process.env;
    const fullurl = `${VUE_APP_API_BASE}${url}`;

    const requestconfig = { ...config };

    if (requestconfig?.headers == null) {
      requestconfig.headers = {};
    }

    requestconfig.headers.fingerprint = (requestconfig?.headers?.fingerprint != null)
      ? requestconfig.headers.fingerprint : fingerprint;
    requestconfig.headers.session_id = (requestconfig?.headers?.session_id != null)
      ? requestconfig.headers.session_id : session_id;

    const data = await axios.patch(fullurl, payload, requestconfig);
    return data;
  },
  async delete(url, payload, config = {}) {
    this.initSession();
    const { fingerprint, session_id } = this;
    const { VUE_APP_API_BASE } = process.env;
    const fullurl = `${VUE_APP_API_BASE}${url}`;

    const requestconfig = { ...config };

    if (requestconfig?.headers == null) {
      requestconfig.headers = {};
    }

    requestconfig.headers.fingerprint = (requestconfig?.headers?.fingerprint != null)
      ? requestconfig.headers.fingerprint : fingerprint;
    requestconfig.headers.session_id = (requestconfig?.headers?.session_id != null)
      ? requestconfig.headers.session_id : session_id;

    const data = await axios.delete(fullurl, payload, requestconfig);
    return data;
  },
};
