# Sample Embedded Shopify App with Node and React
[Build a shopify app with node and react tutorial](https://shopify.dev/tutorials/build-a-shopify-app-with-node-and-react)

Updating the code with react-hooks and using our linter as much as possible

# Things to Note
- If it's your first time create an app and a development store, shopify app would ask you to add shopify ID so you could log in to all the stores and partner account at once using one username and password. You could separate stores which you don't want to connect as well.
- the tutorial will tell you that you can't use functional style due to polaris needing `state`, but you can use react-hooks with functions instead of classes.
- make sure to update both `APP URL` and  `Allowed redirection URL` in the App setup when ngrok url expires.
- When you get an error `Error: Cannot find module 'webpack'` , delete node_modules, `npm install` again, and install (webpack v4)[https://github.com/webpack/webpack/releases/tag/v4.45.0] `npm i --save webpack@4.45.0` instead of v5
- While developing, make sure to clear the local storage data otherwise you get a warning like `Warning: Text content did not match`
