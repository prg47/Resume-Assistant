import "dotenv/config"
import app from "./src/app.js"
import connectToDB from "./src/config/db.js"

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    connectToDB()
    console.log("Server running on port 3000")
})