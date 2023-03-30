require("dotenv").config();
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const graphql = require("graphql");
const joinMonster = require("join-monster");
const http = require("http");
const { Client } = require("pg");
const { database } = require("pg/lib/defaults");
const cors = require("cors");
const ld = require("launchdarkly-node-server-sdk");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { createClient } = require('@supabase/supabase-js')

const app = express();
app.use(express.json());
async function init() {
  // initialize LD
  const client = ld.init(process.env.LD_SDK_KEY);

  try {
    await client.waitForInitialization();
  } catch (err) {}


//  const supabase = createClient('https://uhbwlolqikhfmyqqnalp.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVoYndsb2xxaWtoZm15cXFuYWxwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODAxMjY3NjMsImV4cCI6MTk5NTcwMjc2M30.BekS_LfTnwJnWgmzrTq9g0kzq5ZGA2Q-DhX6QiVeJv8')

//const { data, error } = await supabase
//  .from('toggletable')
//  .select()

//console.log(data)


  const context = {
    kind: "user",
    key: "abc-123",
    name: "peter",
  };

  //connect to the dc postgres db
  const postgres = await new Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    port: "5432",
    password: process.env.PGPASS
  });
  postgres.connect();

  //

  //create the graphQL fields for the toggles
  const Toggles = new graphql.GraphQLObjectType({
    name: "Toggles",
    extensions: {
      joinMonster: {
        sqlTable: "toggletable",
        uniqueKey: "id",
      },
    },
    fields: () => ({
      id: { type: graphql.GraphQLInt },
      toggle_name: { type: graphql.GraphQLString },
      price: { type: graphql.GraphQLString },
      description: { type: graphql.GraphQLString },
      image: { type: graphql.GraphQLString },
    }),
  });

  //Set up the schema for databases
  const QueryRoot = new graphql.GraphQLObjectType({
    name: "Query",
    fields: () => ({
      toggles: {
        type: new graphql.GraphQLList(Toggles),
        resolve: (parent, args, context, resolveInfo) => {
          return joinMonster.default(resolveInfo, {}, (sql) => {
            return postgres.query(sql);
          });
        },
      },
    }),
  });

  // define the query fields
  const schema = new graphql.GraphQLSchema({
    query: QueryRoot,
  });

  // routes for login & logout
  app.post("/login", async (req, res) => {
    try {
      const login = req.body;
      res.json("logged in");
      user.key = login.key;
    } catch (error) {
      console.error(error.message);
    }
  });

  app.get("/logout", async (req, res) => {
    try {
      const login = {};
      res.json("logged out");
      console.log(login);
      user.key = login;
    } catch (error) {
      console.error(error.message);
    }
  });

  //route for form data
  app.post("/form", cors(), async (req, res) => {
    try {
      const { name, email } = req.body;
      const newFormFill = await postgres.query(
        "INSERT INTO formfills (name, email) VALUES($1,$2) RETURNING *",
        [name, email]
      );
      res.json(newFormFill.rows[0]);
    } catch (error) {
      console.error(error.message);
    }
  });

  app.get("/form", cors(), async (req, res) => {
    try {
      const formFills = await postgres.query("SELECT * FROM formfills");
      res.json(formFills.rows);
    } catch (error) {
      console.error(error.message);
    }
  });

  //route for stripe payments and product retrieval
  app.post("/checkout", cors(), async (req, res) => {
    const enableStripe = await client.variation("enableStripe", context, false);
    if (enableStripe) {
      try {
        const cartDetails = req.body;
        let line_items = [];
        let i = 0;
        Object.keys(cartDetails.cartDetails).forEach((key) => {
          line_items[i] = {
            price: cartDetails.cartDetails[key].price_id,
            quantity: cartDetails.cartDetails[key].quantity,
          };
          i++;
        });

        const session = await stripe.checkout.sessions.create({
          mode: "payment",
          line_items,
          success_url: "http://localhost:3000",
          cancel_url: "http://localhost:3000",
        });

        return res.json({ url: session.url });
      } catch (error) {
        console.error(error.message);
      }
    } else {
      return res.send("the API is unreachable");
    }
  });

  app.get("/checkout", cors(), async (req, res) => {
    const enableStripe = await client.variation("enableStripe", context, false);
    if (enableStripe) {
      try {
        res.send("You are good to go!");
      } catch (error) {
        console.error(error.message);
      }
    } else {
      return res.json("the API is unreachable");
    }
  });

  app.get("/inventory", cors(), async (req, res) => {
    try {
      const inventory = await postgres.query("SELECT * FROM toggletable");
      res.json(inventory.rows);
    } catch (error) {
      console.error(error.message);
    }
  });

  //graphQL route for rendering inventory
  app.use(
    "/api",
    cors(),
    graphqlHTTP({
      schema: schema, //must be provided
      graphiql: true, // Enable GraphiQL when server endpoint is accessed in browser
    })
  );

  const server = http.createServer(app);
  app.set("port", 4000);

  server.listen(app.get("port"), function() {
    console.log("Now browse to localhost:4000/api");
  });
}

init();
