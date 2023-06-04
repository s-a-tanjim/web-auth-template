## Commands
```sh
$ yarn start

# Start dev server
$ yarn run dev

# Prisma studio
$ npx prisma studio --browser none

# Swagger UI
# http://localhost:3000/api-docs/

# For testing
$ yarn test

```


### Generating Key
```js
require("crypto").randomBytes(64).toString('hex')
```

### Migrations
```sh
$ npx prisma migrate dev
$ prisma db pull
$ npx prisma generate # Update migration
$ npx prisma format
```
### Generate Seeds
```sh
$ npx prisma db seed
```

### In production
```sh
# Use cluster
$ yarn run prod

# Start Server
$ pm2 start app.js
```

## Generate google oauth2 credential

Create oauth credential from here: [Google Cloud](https://console.cloud.google.com/apis/credentials)