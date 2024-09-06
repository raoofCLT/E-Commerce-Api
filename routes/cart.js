import { Router } from "express";
import verifyToken, {verifyTokenAndAuthorization,verifyTokenAndAdmin,} from "./verifyToken.js";
import Cart from "../models/Cart.js";

const router = Router();

//CREATE

router.post("/",verifyToken, async(req,res)=>{
    const newCart = new Cart(req.body)
    try{
        const savedCart = await newCart.save()
        res.status(200).send(savedCart)
    }catch(err){
        res.status(500).send(err)
    }
})


//UPDATE

router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).send(updatedCart);
  } catch (err) {
    res.status(500).send(err);
  }
});



//DELETE

router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).send("Cart has been deleted....");
  } catch (err) {
    res.status(500).send(err);
  }
});


//GET USER CARTS

router.get("/find/:userId", verifyTokenAndAuthorization,async (req, res) => {
  try {
    const cart = await Cart.findOne({userId:req.params.userId});
    res.status(200).send({cart});
  } catch (err) {
    res.status(500).send(err);
  }
});


//GET ALL CARTS

router.get("/", verifyTokenAndAdmin,async (req, res) => {
    try{
        const carts = await Cart.find()
        res.status(200).send(carts)
    }catch(err){
        res.status(500).send(err)
    }

})


export default router;