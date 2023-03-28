# Welcome to the Toggle Store App!

This is a NextJS application that uses a GraphQL & Postgres backend for rendering a webstore and can be connected to Stripe for an automated checkout process.

## Setup

Here are the steps for getting started with this demo. You will need a handful of secrets and other components set up for it to work properly.

### Install Dependencies

Make sure you run `npm i` to install the dependencies for both the NextJS frontend and Express backend.

### Secrets

This application uses a handful of secrets from both LaunchDarkly and [Stripe](https://www.stripe.com). The cart checkout will not work without a Stripe account. This app is only configured to work with Stripe's test mode.

#### Frontend secrets

1. `STRIPE_PUBLISHED_KEY`: Found in the stripe dashboard, required for Cart
2. `NEXT_PUBLIC_LD_CLIENT_KEY`: Client side SDK key from the LD project you are using

#### API secrets

1. `LD_SDK_KEY`: Server-side key for the LD project you are using
2. `STRIPE_SECRET_KEY`: Stripe secret key, available in your dashboard

### Postgres Database

This application uses a NextJS frontend, an Express API, and Postgres Database. You'll need to have a postgres database set up to retrieve information from. If you need one, use the following bash script to create one locally:

```
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
    CREATE DATABASE demo;
	\c demo;
		CREATE TABLE toggleTable (
  	  id SERIAL PRIMARY KEY,
	  toggle_name VARCHAR(255),
        price VARCHAR(255),
        description TEXT,
        image TEXT

);

INSERT INTO toggleTable (id, toggle_name, price, description, image) VALUES (1, 'Classic Toggle', '$2', 'A simple, wooden toggle for any coat!', '/toggle-1.jpg');
INSERT INTO toggleTable (id, toggle_name, price, description, image) VALUES (2, 'Fancy Toggle', '$5', 'Looking for some new flair? Look no further!', '/toggle-2.webp');
INSERT INTO toggleTable (id, toggle_name, price, description, image) VALUES (3, 'Plastic Toggle', '$1', 'When durability is your main concern, plastic is there.', '/toggle-3.webp');
INSERT INTO toggleTable (id, toggle_name, price, description, image) VALUES (4, 'Metal Toggle', '$10', 'For those who need a little more flash from their toggles.', '/toggle-4.webp');
INSERT INTO toggleTable (id, toggle_name, price, description, image) VALUES (5, 'Bulk Toggles', '$15','Value Pack! Perfect for when you need a lot of toggles!', '/toggle-5.jpeg');
INSERT INTO toggleTable (id, toggle_name, price, description, image) VALUES (6, 'Corded Toggle', '$5', 'Toggle and cord combo set! Cord not included.', '/toggle-6.jpeg');
INSERT INTO toggleTable (id, toggle_name, price, description, image) VALUES (7, 'Historic Toggle', '$25', 'Perfect for whaling outings, definitely not whale bone...', '/toggle-7.jpeg');
INSERT INTO toggleTable (id, toggle_name, price, description, image) VALUES (8, 'Horn Toggle', '$50', 'We are not liable for horn toggle related injuries, buyer beware.', '/toggle-8.jpeg');
EOSQL
```

A copy of this script is also available in the `/api/db` folder.

### Terraform for LD & Stripe setup

The `terraform` folder contains Terraform manifests for creating a LaunchDarkly project, required flags for this demo, and the necessary product/pricing listings Stripe. If you are using these files you need to do the following after the build is complete:

1. Get your new SDK and Client Side keys from the newly created LaunchDarkly project
2. Update the `products.ts` file in `/src/config` with the new `price_id` of each product, these will be located in your Stripe Dashboard after the apply has completed.
