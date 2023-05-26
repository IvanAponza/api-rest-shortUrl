import "dotenv/config";
import "./database/connectdb.js";
import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";

import authRouter from "./routes/auth.route.js";
import linkRouter from "./routes/link.route.js";
import redirectRouter from "./routes/redirect.route.js";

//INITIALIZE THE SERVER
const app = express();

//SETTINGS
const PORT = 4000 || process.env.PORT;

//MIDDLEWARES

const whiteList = [process.env.ORIGIN1, process.env.ORIGIN2]; //indica todo los dominios que tendran acceso
app.use(
  cors({
    origin: function (origin, callback) {
        console.log('Pup =>', origin);
      if (!origin || whiteList.includes(origin)) {
        return callback(null, origin);
      }
      return callback("Error de Cors origin: " + origin + "No Autorizado!");
    },
  })
);
app.use(express.json());
app.use(cookieParser());

//ROUTES
app.use("/api/auth", authRouter);
app.use("/api/links", linkRouter);

//eje. backend redirect (opcional)
app.use("/", redirectRouter);

//solo para elejempo de login/token refresh y persitencia del token
//app.use(express.static("public"));

//INITIALIZATION THE SERVER
app.listen(PORT, () => {
  console.log("Server on port http://localhost:" + PORT);
});
