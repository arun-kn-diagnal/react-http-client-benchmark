# Basic Overview

This project captures the benchmark results of using HTTP library like axios , redaxios , ky and wretch ,and also native browser APIs for HTTP requests fetch and XMLHttpRequest. It compares the performance based on metrics like memory usage, latency, concurrent request handling, JSON parsing speed, throughput and error
rate.

## Libraries & Native browser APIs for HTTP requests

| Library                     | Version | License    | npm Link                                       |
| --------------------------- | ------- | ---------- | ---------------------------------------------- |
| axios                       | 1.13.2  | MIT        | https://www.npmjs.com/package/axios            |
| ky                          | 1.14.3  | MIT        | https://www.npmjs.com/package/ky               |
| redaxios                    | 1.13.2  | Apache-2.0 | https://www.npmjs.com/package/redaxios         |
| RTKQuery (@reduxjs/toolkit) | 2.11.2  | MIT        | https://www.npmjs.com/package/@reduxjs/toolkit |
| wretch                      | 3.0.7   | MIT        | https://www.npmjs.com/package/wretch           |

| API            | Reference                                                           |
| -------------- | ------------------------------------------------------------------- |
| fetch          | https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API          |
| XMLHttpRequest | https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest_API |

# Command

### run vite project

```bash
npm run dev
```

### build React project

```bash
npm run build
```

### run tizen project

- make sure you vite build and also tizen build before runing this command .

```bash
npm run tizen-run
```

### build tizen

- before use edit the path in package.json in the tizen-build command

```bash
npm run tizen-build
```

### run LG project

```bash
npm run LG-run
```

### build LG project

- before this pls download any LG image and save it as Image.appimage in LG-emulator or replace the path reference in the package.json with the one you are using

```bash
npm run LG-build
```
