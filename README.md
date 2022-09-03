# React Image Compressor

## Overview

A simple image compressor built with [react](https://reactjs.org/) and [browser-image-compression](https://www.npmjs.com/package/browser-image-compression).
Then, integrated with Next.js (https://nextjs.org) and AWS S3 via Amplify (https://docs.amplify.aws/start/q/integration/react/?sc_icampaign=react-start&sc_ichannel=docs-home).

## Functionalities

- Compress Image By Reducing Resolution and Size
- Offline Compression
- Automatically store in AWS S3

## Built With

- ReactJS
- React Bootstrap
- Browser Image Compression
- NextJS
- Amplify AWS

## Development

1. Clone the repository and change directory.

```
git clone https://github.com/Caio-Rezende/react-image-compressor
cd react-image-compressor
```

2. Install npm dependencies

```
npm install
```

3. Configure your connection to AWS through amplify (if you don't have it yet, go to https://docs.amplify.aws/cli/start/install/)

```
amplify configure
```

4. Init the Amplify configs for the project

```
amplify init
```

5. With Amplify AWS, add storage to it

```
amplify add storage
```

6. Publish the changes to the server

```
amplify publish
```

7. Add policy to the bucket in order to allow usage by the identity pool


8. Run the app locally.

```
npm run start
```
