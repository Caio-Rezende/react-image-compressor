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

8. Create a Dynamo DB in the AWS in order to store the list of ids of items for pagination

> It's schema can be as stated in /src/constant/item.js > ITEM_TABLE_CREATE_PARAMS

9. Don't forget to add permission in the IAM for both storage S3 and DynamoDB

10. Run the app locally.

```
npm run start
```

11. Postman commands:

GET item

```
curl --location --request GET 'http://localhost:3000/api/item?id=2022/09/05/13/47/466/20180828_123340.jpg'
```

LIST items

```
curl --location --request GET 'http://localhost:3000/api/list?page=2'
```
