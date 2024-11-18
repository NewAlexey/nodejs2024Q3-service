# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker - [Download & Install Docker](https://www.docker.com/)

## Downloading

```
git clone {repository URL}
```

## Running application via Docker

```
npm run docker:up
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.

## Stopping Docker application 

```
npm run docker:down
```

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

