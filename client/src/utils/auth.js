import decode from 'jwt-decode';
// import { useNavigate } from 'react-router-dom';

class AuthService {
  // constructor() {
  //   this.navigate = useNavigate;
  // }

  getProfile() {
    try {
      return decode(this.getToken());
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }
  
  isTokenExpired(navigate) {
    const token = this.getToken();

    if (!token) {
      this.logout(navigate)
      return true; //Token is expired if it doesn't exist
    }

    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        this.logout(navigate);
        // localStorage.removeItem('id_token');
        return true;
      } 
    } catch (error) {
      console.error('Error decoding token:', error);
      this.logout(navigate);
      return true;
    }

    return false;
  }

  getToken() {
    return localStorage.getItem('id_token');
  }
  
  login(idToken, navigate) {
    localStorage.setItem('id_token', idToken);
    navigate('/home');
    location.reload(); 
    // Refresh browser to bring in new userData on all components
    // Not the cleanest method but we can look into centralized state management in the future
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