# hybr1d-ecommerce-api

  This is the task assignment for the first interview round @Hybr1d

### Procedure to setup the application at localhost: 

USE THIS AS YOUR ENV vars in .env: 

```
PORT=3000
DATABASE_URL=postgres://hybr1d:hybr1d@localhost:5431/hybr1d
SERVER_URL=http://localhost:3000
JWT_SECRET_KEY=06250810f24bc862f4b519429dcef83580eaab9af9ef36ccaf0aaa6785fd46b50cd4200db837602097c1ba6c8d591f434bd49cc7c31d0b0df69666f37f788d6b
JWT_REFRESH_SECRET_KEY=cb0e10a3a231b03759ff24f3dc72428e223a974b90ad59b6fc7e3a107800f31da91eca26c84562853c6a4929a075153bcda76302d8053a991611287d476f6084
```

> Scripts to setup development data-base using docker
- Use `npm run dev:db` to setup the development database and the server. 
- Use `npm run db-migrate` for the database migration.

> To run the application in development environment, follow the steps below:
- Create `.env` and paste the environment vars given above. 
- Use `npm run dev` to start the server.


> To run the application by building the source code, follow the steps below: 
- Use `npm run build` for compilation of ts. 
- cd into `dist/` , create `.env` and paste the environment vars given above. 
- Use `npm run start` to start the server from the  built code. 

Thanks you !! 
