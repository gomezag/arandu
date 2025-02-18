import { makeAutoObservable, reaction } from 'mobx';

class SiteStore {
  token: string | null = null;

  constructor() {
    makeAutoObservable(this);
    this.loadFromSessionStorage();

    reaction(
        () => this.token,
        token => {
          if (token) {
            sessionStorage.setItem('token', token);
          } else {
            sessionStorage.removeItem('token');
          }
        }
    );
  }

  loadFromSessionStorage() {
    this.token = sessionStorage.getItem('token');
  }

  setToken(token: string) {
    sessionStorage.setItem('token', token);
  }

  clearToken() {
    sessionStorage.removeItem('token');
  }
}

const siteStore = new SiteStore();
export default siteStore;
