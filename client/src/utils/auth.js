import decode from 'jwt-decode';

class AuthService {
  getProfile() {
    return decode(this.getToken());
  }
  isTokenExpired(token) {
    const decoded = decode (token);

    if (decoded.exp < Date.now() / 1000) {
      localStorage.removeItem('id_token');
      return true;
    }
    return false;
  }


  getToken() {
    return localStorage.getItem('id_token');
  }

  login(idToken) {
    localStorage.setItem('id_token', idToken);
    //should lead to landing page but not using window.relocation
  }

  loggedIn() {
    const token = this.getToken();
    return token ? true : false;
  }

  logout() {
    localStorage.removeItem('id_token');
    //should take them back to the landing page where they can sign in / create account upon login. 
  }
}

export default new AuthService();