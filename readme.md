# Image Transformer Project

This is just a basic typescript project configuration and VS Code setup.

> I normally use Atom and with the Nuclide plugin (facebook dev environment). People keep telling me how great VS Code is and this seemed like a great opportunity to try it with the TypeScript, which appears to have an entire *alternate universe* ecosystem to the ES2015+ JavaScript one.

## Working:

* TSlint is working with AirBnB style guide, properly producing both type and formatting errors when needed.
* Webpack is bundling all TS files into a single bundle. Does not do hot reloading.
* Jest testing is working.
* Single pixel RGB to Grayscale function.
* Web page displays with CSS and JavaScript connected.

## Open Tasks:

* Decide where to do the image processing (options Node, browser, both?). Decode/Encode image? If browser only, this can be done with Canvas. For Node, I have not see a way to do this without using an external library.
* If in the browser, Production-ize Webpack config to build proper *production worthy* bundles that include split and hashed bundles, compression, etc.
* Build a function to take array of image RGB values and run transformations from the transformation lib.
* Build, document and test API for transformations lib.
* Build, document and test a user interface.

## Install and run:

```bash
# Clone the repo
git clone https://github.com/HyperSprite/img-transformer-ts.git
# Switch directories
cd img-transformer-ts
# Install packages
npm install
# Start dev server:
npm run dev
# Open a browser and go to localhost:8080
```

## Dependencies:

* @types/jest: types for jest.
* concurrently: see package.json scripts, allows for concurrently. * running webpack server and nodemon file copy.
* copyfiles: see package.json scripts, used for cross platform file copy.
* http-server: was used for a dev http server, no longer needed with webpack but left for testing final build.
* jest: Testing library.
* ts-jest: TypeScript plugin for Jest.
* ts-loader: TypeScript loader for webpack.
* tslint: TypeScript linting.
* tslint-config-airbnb: TypeScript AirBnB style guide for tslint.
* typescript: TypeScript (no global TypeScript installed).
* webpack: Installed to handle bundling of modules.
* webpack-dev-server: Installed for dev environment.
