import { Router } from "express";
import Stripe from "stripe";


const router = Router()
const stripe = Stripe(process.env.STRIPE_KEY)



router.post("/payment",(req,res)=>{
    stripe.charges.create({
        source: req.body.tokenId,
        amount: req.body.amount,
        currency: "usd"
    },
    (stripeErr,stripeRes)=>{
        if(stripeErr){
            res.status(500).send(stripeErr)
        }else{
            res.status(200).send(stripeRes)
        }
    })
})


export default router;