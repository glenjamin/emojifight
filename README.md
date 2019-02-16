# emojifight

```sh
npm install
npm start
```

Visit the local server with `?hot` on the end of the URL to enable the hot code reloading

## Dockering

Build

```
docker build -t emojifight:latest .
```

Run

```
docker run --rm -p 3000:3000 --name emojifight emojifight:latest
```
