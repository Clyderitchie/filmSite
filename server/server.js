// import express from "express";
// import { ApolloServer } from "@apollo/server";
// import { expressMiddleware } from "@apollo/server/express4";
// import bodyParser from "body-parser";
// import { typeDefs, resolvers } from "./schemas/index.js";
// import path from "path";

// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
// });
// console.log("SERVER FILE LOADED");

// const app = express();

// const PORT = process.env.PORT || 3003;

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// import db from "./config/connection.js";
// db.on("error", (err) => {
//   console.error("MongoDB connection error:", err);
// });

// db.once("open", () => {
//   console.log("MongoDB connected");
//    app.listen(PORT, () => {
//       console.log(`Server running at http://localhost:${PORT}/`);
//       console.log(`GraphQL API running at http://localhost:${PORT}/graphql`);
//     });
// });

// const startApolloServer = async () => {
//   await server.start();
  
// app.use(
//   "/graphql",
//   expressMiddleware(server)
// );

//   //   app.listen(PORT, () => {
//   //   console.log(`Server running at http://localhost:${PORT}/`);
//   //   console.log(`GraphQL API running at http://localhost:${PORT}/graphql`);
//   // });
//   if (process.env.NODE_ENV === "production") {
//     app.use(express.static(path.join(__dirname, "../client/dist")));

//     app.get("*", (req, res) => {
//       res.sendFile(path.join(__dirname, "../client/dist/index.html"));
//     });
//   }

//   // db.once("open", () => {
//   //   app.listen(PORT, () => {
//   //     console.log(`Server running at http://localhost:${PORT}/`);
//   //     console.log(`GraphQL API running at http://localhost:${PORT}/graphql`);
//   //   });
//   // });
// };

// startApolloServer();

const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');
const path = require('path');

const server = new ApolloServer({
	typeDefs, resolvers
});

const app = express();

const PORT = process.env.PORT || 3003;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require('./config/connection');

const startApolloServer = async () => {
	await server.start();

	app.use('/graphql', expressMiddleware(server, {
		context: authMiddleware
	}));
	if (process.env.NODE_ENV === 'production') {
		app.use(express.static(path.join(__dirname, '../client/dist')));
	
		app.get('*', (req, res) => {
		  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
		});
	  }

	db.once('open', () => {
		app.listen(PORT, () => {
			console.log(`Server running at http://localhost:${PORT}/`);
			console.log(`GraphQL API running at http://localhost:${PORT}/graphql`);
		});
	});
}

startApolloServer();