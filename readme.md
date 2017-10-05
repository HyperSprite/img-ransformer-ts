# Image Transformer Project

This is create-react-app/typescript project configuration and VS Code setup.

> I normally use Atom and with the Nuclide plugin (facebook dev environment). People keep telling me how great VS Code is and this seemed like a great opportunity to try it with the TypeScript, which appears to have an entire *alternate universe* ecosystem to the ES2015+ JavaScript one.

## Working:

* TSlint is working with AirBnB style guide, properly producing both type and formatting errors when needed.
* Webpack is bundling all TS files into a single bundle. Does not do hot reloading.
* Jest testing is working.
* Single pixel RGB to Grayscale function.
* Web page displays with CSS and React connected.

## Open Tasks:

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

* @types/jest, @types/node, @types/react, @types/react-dom: typings for various modules.
* react-scripts-ts: create-react-app additions TypeScript.
* ts-loader: TypeScript loader for webpack.
* tslint: TypeScript linting.
* tslint-config-airbnb: TypeScript AirBnB style guide for tslint.
* typescript: TypeScript (no global TypeScript installed).


## Notes:

* I originally setup a more basic dev/test environment. Since the project allows for external modules to be used I decided to move this project to Create React App with TS. The original configuration is in **basic-ts-no-create-react-app** branch.
* Random Error: "Cannot find module react" after creating a new app with create-react-app, run ```npm install``` inside the just created dir and it will finish the install properly.
* Decisions Use Semantic-ui, been wanting to try this component library and since this project only has a few components (at least on my sketch), this seems like a good time. Another regarding this if to use the CDN version or import the CSS. In this case, I am going with the CDN to keep the bundle size as small as possible.
* Random Error: import fails with 'no default export' was resolved by updating tsconfig with ```"allowSyntheticDefaultImports": true,``` see [import fails with 'no default export' #8](https://github.com/Microsoft/TypeScript-React-Starter/issues/8)


