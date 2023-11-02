import decode from 'jwt-decode';
// import { useNavigate } from 'react-router-dom';


class AuthService {
  // constructor() {
  //   this.navigate = useNavigate;
  // }

  getProfile() {
    return decode(this.getToken());
  }
  isTokenExpired(navigate) {
    const token = this.getToken();

    if (!token) {
      return true; //Token is expired if it doesn't exist
    }
    const decoded = decode(token);
    if (decoded.exp < Date.now() / 1000) {
      this.logout(navigate);
      return true;
    }
    return false;
  }


  getToken() {
    localStorage.getItem('id_token');
  }
  
  login(idToken, navigate) {
    localStorage.setItem('id_token', idToken);
    navigate('/profile');
    
  }

  loggedIn(navigate) {
    const token = this.getToken();
    return !this.isTokenExpired(navigate) && token;
  }

  logout(navigate) {
    localStorage.removeItem('id_token');
    navigate('/')
  
  }
}

export default new AuthService();