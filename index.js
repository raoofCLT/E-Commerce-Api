import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import router from "./routes/user.js"

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

dotenv.config();


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("DB Connection successful");
    } catch (err) {
        console.error("DB Connection failed:", err);
    }
};

// mongoose.connect(process.env.MONGO_URL)
// .then(()=> console.log("DB Connection successfull"))
// .catch((err) => {
//     console.log(err)
// })


app.use("/api/users",router)



app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`); 
})