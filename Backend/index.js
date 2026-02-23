import express from "express"
import dotenv from "dotenv"
import cors from "cors"


import connectDb from "./src/utils/db.js";


// import all routes
import dashboardRoutes from "./src/routes/dashboard.routes.js"
import villageRoutes from "./src/routes/village.routes.js"
import tankerRoutes from "./src/routes/tanker.routes.js"    

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cors())

connectDb();
app.get("/health",(req,res) => {
    res.status(200).json({message: "HealthCheck Route ...."})
})

app.use("/api/v1/dashboard",dashboardRoutes)
app.use("/api/v1/village",villageRoutes)
app.use("/api/v1/tanker",tankerRoutes)

app.listen(process.env.PORT|| 8080 ,() => {
    console.log(`Server is listening at port ${process.env.PORT || 8080}`)
})