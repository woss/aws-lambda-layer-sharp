# AWS Layer for [Sharp](https://sharp.pixelplumbing.com/en/stable/) 🚀🚀🚀

This is a [AWS Lambda Layers](https://docs.aws.amazon.com/en_pv/lambda/latest/dg/configuration-layers.html) custom routine that gives you access to [Sharp image library](https://sharp.pixelplumbing.com/en/stable/) in your lambda functions for NodeJs env without you installing and building the module yourself.

This layer gives you:

- 🚀 fast iteration when dealing with images
- 📦 ~>30MB smaller functions, jsut because you don't ship them with sharp

## How to Use this layer

Either check the `example` folder and follow the instruction on [how to run the example](#how-to-run-example), or in your AWS console add following ARN
`arn:aws:lambda:eu-west-1:502686283826:layer:sharp:7` when you are adding the layer.

This is last stable version.

## Deploy and build the layer yourself

### Building the layer

Docker must be installed.

Run `docker-compose up --build` in the root of the project. After that you will get the zip file under `layers/sharp/out`. I'm not sure why would you do it, since last version is already provided and sharp hasn't seen any major changes in a while. But i guess everyone loves BUILDING 😍.

### Deploying

Again, from root of the project run `yarn deploy`

## How to run example

```bash
cd example
yarn
yarn start
```

Then visit the following link

[http://localhost:4000/sharp?width=800&metadata=true&convolve=true](http://0.0.0.0:4000/sharp?width=800&metadata=true&convolve=true)

to deploy run `yarn deploy` from the `example` folder

## Image copyright

`lucky.jpg` is owned by me
