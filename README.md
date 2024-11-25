# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker - [Download & Install Docker](https://www.docker.com/)

## Downloading

```
git clone https://github.com/NewAlexey/nodejs2024Q3-service.git
```

## Preparations

Change git branch to `develop_task-3`

```
git checkout develop_task-3
```

Create `.env` file in app root folder. Just copy `.env.example` file and rename it into `.env`.

## Steps to run project

### 1) Run `db` via Docker

```
npm run docker:up:db
```
Wait for db are running.

### 2) Run `app` locally:

#### 1) Run migrations and wait for end

```
npm run rd
```

#### 2) Run application 

```
npm run start
```

## Stop Docker application 

```
npm run docker:down
```

## Testing

After application running open new terminal and enter:

To run all tests with authorization

```
npm run test:auth
```

### Information about `env` variables

`PORT` - application port;

`CRYPT_SALT` - count of crypt salt for hash user's password.

`JWT_SECRET_KEY` - secret key for `access` token.

`JWT_SECRET_REFRESH_KEY` - secret key for `refresh` token.

`TOKEN_EXPIRE_TIME` - expire time for `access` token.

`TOKEN_REFRESH_EXPIRE_TIME` - expire time for `refresh` token.

`DB_HOST` - database host.

`DB_PORT` - database port.

`DB_EXPOSE_PORT` - expose database port. Using for escape port conflicts if user has locally installed `postgresql` database.

`DB_USER_NAME` - database username.

`DB_PASSWORD`- database username password.

`DB_NAME` - database name.

`LOG_FOLDER` - log folder name.

`LOG_FILE_SIZE_KB` - max. file size with logs data.

`ERROR_LOG_FILE_SIZE_KB` - max. file size with error logs data.

