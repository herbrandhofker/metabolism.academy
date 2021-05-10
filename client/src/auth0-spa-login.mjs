import { LitElement, css, html } from 'lit-element';
import createAuth0Client from '@auth0/auth0-spa-js';

import { getButtonCss } from './utilCss.mjs';

class LoginParent extends LitElement {
  static get styles() {
    return [getButtonCss(), css`
    
    }   `];
  }

  constructor() {
    super();
    this.textLogin = 'Log in';
    this.textLogout = 'Log out';
    this.isAuthenticated = false;
    this.profile = undefined;
  }

  static get properties() {
    return {
      domain: { type: String },
      client_id: { type: String },
      profile: { type: String },
      isAuthenticated: { type: Boolean },
      textLogin: { type: String },
      textLogout: { type: String }
    };
  }

  async updated(changedProperties) {
    changedProperties.forEach((oldValue, propName) => {
      if (propName == 'isAuthenticated') {
        this.updateUser();
      }
    });
  }

  async updateUser() {
    if (!this.auth0) {
      this.auth0 = await createAuth0Client({
        domain: this.domain,
        client_id: this.client_id
      });
    }

    if (!await this.auth0.isAuthenticated()) {
      const query = window.location.search;
      if (query.includes('code=') && query.includes('state=')) {
        await this.auth0.handleRedirectCallback();
        window.history.replaceState({}, document.title, '/');
      }
    }
    else {
      if (this.isAuthenticated) {
        this.profile = JSON.stringify(await this.auth0.getUser());
        let myEvent = new CustomEvent('user-logged-in', {
          bubbles: true,
          detail: this.profile
        });
        this.dispatchEvent(myEvent);
      }
    }
    this.isAuthenticated = await this.auth0.isAuthenticated();
  }

  async loginOrLogout() {
    if (!this.auth0) {
      console.error("you are not connected to auth0")
    }
    else {
      if (this.isAuthenticated) {
        let myEvent = new CustomEvent('user-logged-out', {
          bubbles: true,
          detail: this.profile
        });
        this.dispatchEvent(myEvent);
        this.auth0.logout({ returnTo: window.location.origin })
      }
      else
        await this.auth0.loginWithRedirect({ redirect_uri: window.location.origin });
    }
  }
}

export class LoginButton extends LoginParent {

  render() {
    return html`
    <button class="button" @click="${(e) => this.loginOrLogout()}">
      ${(this.isAuthenticated) ? this.textLogout : this.textLogin}
    </button>
   `
  }
}

customElements.define("auth0-button", LoginButton);

export class LoginAnchor extends LoginParent {
  render() {
    return html`
    <a class="button" @click="${(e) => this.loginOrLogout()}">
      ${(this.isAuthenticated) ? this.textLogout : this.textLogin}
    </a>
   `
  }
}

customElements.define("auth0-anchor", LoginAnchor);
