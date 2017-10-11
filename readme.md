# Image Transformer Project

An Image Transformation Micro Library with reference Docs that this web app uses can be found in: [/src/util](https://github.com/HyperSprite/img-transformer-ts/tree/master/src/util).

This is a create-react-app/typescript project configuration and VS Code setup.

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
Tests
```js
npm run test
```

## Dependencies:

* react-dropzone: Easy file upload with click or drop, see component DropButton.
* semantic-ui-react: Style library, alternative to Bootstrap or Material.
* @types/jest, @types/node, @types/react, @types/react-dom: typings for various modules.
* react-scripts-ts: create-react-app additions TypeScript.
* ts-loader: TypeScript loader for webpack.
* tslint: TypeScript linting.
* tslint-config-airbnb: TypeScript AirBnB style guide for tslint.
* typescript: TypeScript (no global TypeScript installed).

## Screenshot
![Img Transformer Screenshot](https://raw.githubusercontent.com/HyperSprite/img-transformer-ts/master/public/assets/img-transformer-in-action.png)

## Mock up
![Img Transformer Mock Up](https://raw.githubusercontent.com/HyperSprite/img-transformer-ts/master/public/assets/img-transformer-mockup.png)

> I normally use Atom and with the Nuclide plugin (facebook dev environment). People keep telling me how great VS Code is and this seemed like a great opportunity to try it with the TypeScript, which appears to have an entire *alternate universe* ecosystem to the ES2015+ JavaScript one.

## Working:

* TSlint is working with AirBnB style guide, properly producing both type and formatting errors when needed.
* Webpack is bundling all TS files into a single bundle. Does not do hot reloading.
* Jest testing is working.
* Single pixel RGB to Greyscale function.
* Web page displays with CSS and React connected.
* Mock up complete using Semantic-ui.
* Select using data from lib.greyFilter for values.
* Drop or click "Select File" button working using Dropzone.
* Load Original Canvas with chosen image, Load Transformed Canvas with copy for Original Canvas.
* Apply a filter to Transformed Canvas.
* Wire up "Reset Image" button to undo filters.
* Build a function to take array of image RGB values and run transformations from the transformation lib.
* Build, document and test API for transformations lib.
* Build a user interface.
* Scale Canvas to fit parent div.

## Open Tasks:

* Add tests for user interface.
* Wire up "Save" button.
* Consider adding much larger hidden canvas for actual image processing while displaying small canvas to users.  

## Notes:

* **Rotate and Flip**: I knew there was a better way to do the Rotate and Flip a rectangle than the solution I had. Kept thinking it was a matter of picking the elements and pushing them in but couldn't quite get the formula. Kept working on other things and kept coming back to it. Here is a [stack overflow post](https://stackoverflow.com/questions/34440289/how-can-i-rotate-a-4x8-grid-represented-as-a-single-array-in-javascript) that laid out what I had in mind so I went with it. It also happens to work well for flipping too. My old versions are [here](https://github.com/HyperSprite/img-transformer-ts/blob/87e5f6e66d6ebaa3f9e03edbad293d6bfc5838c7/src/util/lib-transition.ts#L11).
* I originally setup a more basic dev/test environment. Since the project allows for external modules to be used I decided to move this project to Create React App with TS. The original configuration is in [**basic-ts-no-create-react-app**](https://github.com/HyperSprite/img-transformer-ts/tree/basic-ts-no-create-react-app) branch.
* Random Error: "Cannot find module react" after creating a new app with create-react-app, run ```npm install``` inside the just created dir and it will finish the install properly.
* Decisions: Use Semantic-ui, been wanting to try this component library and since this project only has a few components (at least on my sketch), this seems like a good time. Another regarding this if to use the CDN version or import the CSS. In this case, I am going with the CDN to keep the bundle size as small as possible.
* Random Error: import fails with 'no default export' was resolved by updating tsconfig with ```"allowSyntheticDefaultImports": true,``` see [import fails with 'no default export' #8](https://github.com/Microsoft/TypeScript-React-Starter/issues/8)
* removed ```"tslint-react",``` from tslint rules as it was redundant.
* VS Code search... if there is one thing that is bugging me it's the search dialog boxes. :)
