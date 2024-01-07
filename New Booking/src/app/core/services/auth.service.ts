import { Injectable } from '@angular/core';
import { EncryptionService } from './encryption.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly AUTH_KEY = 'LoginToken';

  constructor(private encryptionService: EncryptionService) {}

  login(email: string): void {
    // Encrypt and store login information
    const encryptedData = this.encryptionService.encrypt(JSON.stringify({ email, isAuthenticated: true }));
    localStorage.setItem(this.AUTH_KEY, encryptedData);
  }

  logout(): void {
    // Clear login information
    localStorage.removeItem(this.AUTH_KEY);
  }

  isAuthenticated(): boolean {
    const encryptedData = localStorage.getItem(this.AUTH_KEY);
    if (encryptedData) {
      try {
        const decryptedData = this.encryptionService.decrypt(encryptedData);
        const authData = JSON.parse(decryptedData);
        return authData && authData.isAuthenticated === true;
      } catch (error) {
        console.error('Error decrypting user data:', error);
      }
    }
    return false;
  }
  

  // Function to get the decrypted user email
  getDecryptedUserEmail(): string  {
    const encryptedData = localStorage.getItem(this.AUTH_KEY);
    if (encryptedData) {
      try {
        const decryptedData = this.encryptionService.decrypt(encryptedData);
        const authData = JSON.parse(decryptedData);
        return authData.email || '';
      } catch (error) {
        console.error('Error decrypting user data:', error);
      }
    }
    return '';
  }

  // Function to get the decrypted user token
  getDecryptedUserToken(): string {
    const encryptedData = localStorage.getItem(this.AUTH_KEY);
    if (encryptedData) {
      try {
        const decryptedData = this.encryptionService.decrypt(encryptedData);
        const authData = JSON.parse(decryptedData);
        return authData.token || '';
      } catch (error) {
        console.error('Error decrypting user data:', error);
      }
    }
    return '';
  }

  getUserToken(): string | null {
    console.log(localStorage.getItem(this.AUTH_KEY))
    return localStorage.getItem(this.AUTH_KEY);
  }

  
}
