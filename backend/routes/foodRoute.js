import express from "express"
import { addFood ,listFood ,removeFood } from "../controllers/foodController.js"
import multer from "multer"

const foodRouter = express.Router();

// Image storage engine

const storage = multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()} ${file.originalname}`)
    }
})

const upload = multer({storage:storage})

// food routes and functions to call 
// add a new food item
foodRouter.post("/add",upload.single("image") ,addFood)

// display list of all food items
foodRouter.get("/list",listFood)

// remove a food item
foodRouter.post("/remove",removeFood)



export default foodRouter;

