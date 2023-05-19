# Welcome to Toggle Outfitters!

This is a NextJS application that uses SaaS hosted Postgres backend for rendering a webstore and can be connected to Stripe for an automated checkout process.

## Setup

Here are the steps for getting started with this demo. You will need a handful of secrets and other components set up for it to work properly.

### Install Dependencies

Make sure you run `npm i` to install the dependencies for both the NextJS frontend and Express backend.

### Secrets

This application uses a handful of secrets from both LaunchDarkly and [Stripe](https://www.stripe.com). 
The cart checkout will not work without a Stripe account. This app is only configured to work with Stripe's test mode.

To add the necessary secrets, run:
```shell
cp .env.example .env
```

This will create a copy of the `.env.example` where you can insert the necessary secrets
This file is `.gitignored` so it will be ignored from commits and pushes so we don't push secrets into the repository

#### Frontend secrets

1. `STRIPE_PUBLISHED_KEY`: Found in the stripe dashboard, required for Cart
2. `NEXT_PUBLIC_LD_CLIENT_KEY`: Client side SDK key from the LD project you are using

#### API secrets

1. `LD_SDK_KEY`: Server-side key for the LD project you are using
2. `STRIPE_SECRET_KEY`: Stripe secret key, available in your dashboard

### Postgres Database

This application uses Supabase for the postgres DB attached to the application. We typically simply refer to this as a SaaS hosted database. When not connected to this database, it uses a local datafile. 


### Experimentation Automation

In order to produce significant data for an experiment, we've automated producing that data using a browser automation tool [Playwright](https://playwright.dev/).

The code for the browser automation is in the `experimentation-automation` folder

Everything needed to run the automation should be installed by `npm install` and the `postinstall` command which runs after install

To run the automation, run: `npx playwright test` which will run any specs in the `experimentation-automation` folder.

To learn more about running Playwright and the various options, check out the docs: https://playwright.dev/docs/running-tests

Results from the automation are in `test-results` and are deliberately `.gitignore`d. Automation currently records video for every iteration, but that can be changed in `playwright.config.ts` along with a variety of other settings.
