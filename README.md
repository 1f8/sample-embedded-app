# Sample Embedded Shopify App with Node and React
[Build a shopify app with node and react tutorial](https://shopify.dev/tutorials/build-a-shopify-app-with-node-and-react)

Updating the code with react-hooks and using our linter as much as possible

# Setup
1. Clone the repo and `npm install`
2. I am using 1f8 linter, so if you want to lint the same way, install linter following this [1f8 eslint installation instruction](https://github.com/1f8/eslint-react-js). Following the gatsby one using yarn worked.
3. Copy and rename .env.example file to an actual .env file. .env should be gitignored already, but if it's not, please do so.
    - SHOPIFY_API_KEY & SHOPIFY_API_SECRET_KEY : You can get them from Shopify Partner Account => Apps => Sample Embedded App => API Keys
    - SHOP : `MYSHOPNAME.myshopify.com` you can get `MYSHOPNAME` from Shopify Partner Account => Stores => click on test store and you will see the domain name at the top right corner.
    - HOST : `https://DOMAINCREATEDBYNGROK.ngrok.io`
    - API_VERSION : Use [the latest version from shopify realease-schedule](https://shopify.dev/concepts/about-apis/versioning#release-schedule) 

From step 4 ~ 8, you can use either `localtunnel`, `ngrok` or any other tools to expose your localhost for development purpose.

-----

### Step 4 ~ 8 using `Localtunnel`
4. install localtunnel
```
    yarn add localtunnel
```
5. Run localtunnel with a subdomain-of-your-choice.
```
// this command will generate https://subdomain-of-your-choice.loca.lt
    lt --port 3000 --subdomain subdomain-of-your-choice
```
6. Add the url as HOST in `.env` file
7. Login to [SHopify Partner Account](https://www.shopify.com/partners)
8. Go to Apps => click on Sample Embedded App => App Setup => update App URL and Allowed redirection URL(s) fields in the URLs section
```
// App URL:
    https://subdomain-of-your-choice.loca.lt

// Allowed redirection URL(s):
    https://subdomain-of-your-choice.loca.lt/auth/callback
```

-----

### Step 4 ~ 8 using `ngrok`

4. install ngrok
```
npm install ngrok -g
```
5. Run ngrok
```
ngrok http 3000
```
will start ngrok and give you a forwarding url. You will need to copy and paste that url to the Shopify App setting. Everytime you disconnect or this url expires (about every hour), you need to restart ngrok and get a different domain. In other words, `0c9534e61dc5` will be updated to different gibberish every time.
```
ngrok by @inconshreveable                     (Ctrl+C to quit)

Session Status                online
Session Expires               1 hour, 59 minutes
Version                       2.3.35
Region                        United States (us)
Web Interface                 http://127.0.0.1:4041
Forwarding                    http://0c9534e61dc5.ngrok.io ->
Forwarding                    https://0c9534e61dc5.ngrok.io ->

Connections                   ttl     opn     rt1     rt5
                              0       0       0.00    0.00
```
6. Add the forwarding url as HOST in `.env`
7. Login to [SHopify Partner Account](https://www.shopify.com/partners)
8. Go to Apps => click on Sample Embedded App => App Setup => update App URL and Allowed redirection URL(s) fields in the URLs section
```
// App URL:
    https://0c9534e61dc5.ngrok.io/

// Allowed redirection URL(s):
    https://0c9534e61dc5.ngrok.io/auth/callback
```

----

9. `npm start` to run your server. Make sure gnrok is still running. *** If you disconnected or ngrok domain has expired, you need to redo setup 5 ~ 8 again.
10. To view the app, go to the test store `/admin` site and login => Apps => click on Sample Embedded App. It will take a while (2-3min when it's really slow) to run the app.
# Things to Note
- If it's your first time create an app and a development store, shopify app would ask you to add shopify ID so you could log in to all the stores and partner account at once using one username and password. You could separate stores which you don't want to connect as well.
- The tutorial will tell you that you can't use functional react due to polaris needing `state`, but you can use react-hooks to accomplish taht.
- make sure to update both `APP URL` and  `Allowed redirection URL` in the App setup when ngrok url expires.
- When you get an error `Error: Cannot find module 'webpack'` , delete node_modules, `npm install` again, and install (webpack v4)[https://github.com/webpack/webpack/releases/tag/v4.45.0] `npm i --save webpack@4.45.0` instead of v5
- While developing, make sure to clear the local storage data otherwise you get a warning like `Warning: Text content did not match`

- In Shopify, GDPR is applied to all user data not just EU, so there are [mandatory webhooks](https://shopify.dev/tutorials/add-gdpr-webhooks-to-your-app#mandatory-webhooks) that need to be setup when developing an app for production. Just something to remember.

Example of webhook request and response
REQUEST
```
    router.post('/webhooks/products/create', webhook, (ctx) => {
        console.log('received webhook: ', ctx.state.webhook)
    })
```

REQPONSE
```
    received webhook:  {
        topic: 'PRODUCTS_CREATE',
        domain: 'YOURSHOPNAME.myshopify.com',
        payload: {
            id: 6111111711111,
            title: 'Special color jeans',
            body_html: 'Fun color jeans',
            vendor: 'Your Shop Name',
            product_type: '',
            created_at: '2021-02-18T10:45:15+09:00',
            handle: 'special-color-jeans',
            updated_at: '2021-02-18T10:45:16+09:00',
            published_at: null,
            template_suffix: '',
            status: 'draft',
            published_scope: 'web',
            tags: '',
            admin_graphql_api_id: 'gid://shopify/Product/6111111711111',
            variants: [ [Object] ],
            options: [ [Object] ],
            images: [],
            image: null
        }
    }
```
- shopOroigin cookie is set during authentication. re-authenticate by visiting this url in your browser
```
    https://{YOUR_NGROK_ADDRESS.io OR localTunnel URL}/auth?shop=YOUR_SHOPIFY_STORE.myshopify.com
```
