# PortFolio2023

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.1.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


Install Angular Service Worker:

Run the following command to install the Angular service worker package:
bash
Copy code
ng add @angular/pwa
This command installs the necessary dependencies and adds configuration files to your project.
Configure Angular Service Worker:

Open the angular.json file in your project.
Locate the "architect" section for the "build" configuration.
Add the "serviceWorker" configuration:
json
Copy code
"configurations": {
  "production": {
    "serviceWorker": true
  }
}
This enables the service worker for the production build.
Build Your Angular App:

Build your Angular app using the production configuration:
bash
Copy code
ng build --prod
Run the App:

Serve the production build:
bash
Copy code
npx serve -s dist/your-app-name
Replace your-app-name with the name of your Angular app.
Test Service Worker:

Open your app in a browser and check the Developer Tools > Application > Service Workers section.
Confirm that the service worker is registered and running.
Customize Caching Strategies (Optional):

The default configuration in ngsw-config.json uses a basic caching strategy.
You can customize the caching strategies by modifying the ngsw-config.json file to suit your application's needs.