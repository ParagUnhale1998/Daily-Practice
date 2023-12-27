import { Injectable } from '@angular/core';
import { HotelService } from 'src/app/modules/hotel-owner/services/hotel.service';
import { OwnerDataService } from 'src/app/modules/hotel-owner/services/owner-data.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class FakeJwtService {
  private readonly AUTH_KEY = 'authToken';
  private readonly API_URL = 'http://localhost:3000'; // Replace with your server API URL

  constructor(
    private ownerDataService: OwnerDataService,
    private hotelService: HotelService,
    private jwtHelper: JwtHelperService
  ) {}

  login(email: string, password: string) {
    // Simulate login and get a JWT token
    const fakeToken = this.simulateLogin(email, password);

    return new Promise<void>((resolve, reject) => {
      if (fakeToken) {
        // Set owner's ID in OwnerDataService
        this.hotelService.getOwner(email).subscribe(
          (response) => {
            const userData = response; // Assuming the response contains user data
            this.ownerDataService.setOwnerId(userData.id);
            resolve();
          },
          (error) => {
            reject('An error occurred while getting owner data');
          }
        );

        // Set JWT token
        this.setToken(fakeToken);
      } else {
        reject('Invalid credentials');
      }
    });
  }

  logout(): void {
    this.removeToken();
    this.ownerDataService.logout();
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token && !this.jwtHelper.isTokenExpired(token);
  }

  private setToken(token: string): void {
    localStorage.setItem(this.AUTH_KEY, token);
  }

  private getToken(): string | null {
    return localStorage.getItem(this.AUTH_KEY);
  }

  private removeToken(): void {
    localStorage.removeItem(this.AUTH_KEY);
  }

  // Simulate login and generate a fake JWT token with owner's ID
  private simulateLogin(email: string, password: string): string | null {
    // Simulate authentication logic (replace with a real authentication mechanism)
    var ownerData: any;
    this.hotelService.getOwner(email).subscribe((response) => {
      ownerData = response;
    });
    if (email === ownerData.email && password === ownerData.password) {
      // Simulated user data with owner's ID
      const ownerId = ownerData.id; // Replace with the actual owner's ID

      // Generate a token with owner's ID
      const fakeToken = this.generateFakeToken(ownerId);
      return fakeToken;
    }
    return null;
  }

  // Generate a fake token with owner's ID
  private generateFakeToken(ownerId: string): string {
    const tokenPayload = {
      id: ownerId,
      // Add more claims as needed
    };

    // Use a real token generation library or service in a production scenario
    const fakeToken = btoa(JSON.stringify(tokenPayload)); // Simple base64 encoding for demo purposes

    return fakeToken;
  }
}
