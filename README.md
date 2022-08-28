# hybr1d-ecommerce-api

  This is the task assignment for the first interview round @Hybr1d

### Procedure to setup the application at localhost: 

USE THIS AS YOUR ENV file in .env: 

```
PORT=3000
DATABASE_URL=postgres://hybr1d:hybr1d@localhost:5431/hybr1d
SERVER_URL=http://localhost:3000
JWT_SECRET_KEY=06250810f24bc862f4b519429dcef83580eaab9af9ef36ccaf0aaa6785fd46b50cd4200db837602097c1ba6c8d591f434bd49cc7c31d0b0df69666f37f788d6b
JWT_REFRESH_SECRET_KEY=cb0e10a3a231b03759ff24f3dc72428e223a974b90ad59b6fc7e3a107800f31da91eca26c84562853c6a4929a075153bcda76302d8053a991611287d476f6084
```

Scripts: 

- Use `npm run dev:db-server` to setup the development database and the server. 
- Use `npm run db-migrate` for the database migration.
- Use `npm run dev` to start the server.
- Use `npm run build` for compilation of ts. 
- Use `npm run start` to start the server from the  built code. 

NOTE: Add the .env file in /dist after building the code, for successfull running of server suing the build code. 
