import "dotenv/config"
import app from "./src/app.js"
import connectToDB from "./src/config/db.js"

app.listen(3000,()=>{
    connectToDB()
    console.log("Server running on port 3000")
})