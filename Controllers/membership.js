const Membership = require('../Modals/membership');



exports.addmembership = async (req, res) => {
    try {

        const { months, price } = req.body;
        const membership = await Membership.findOne({ gym: req.gym._id, months });
        if (membership) {
            membership.price = price;
            await membership.save();
            res.status(200).json({
                message: "Update Successfully"
            })
        }else{
            const newmembership = new Membership({price,months,gym:req.gym._id});
            await newmembership.save();
            res.status(200).json({
                message: "Add Successfully"
            })
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: "Server Error"
        })
    }
}

exports.getmembership = async(req,res)=>{
    try{
        const loggedinid = req.gym._id;
        const memberShip = await Membership.find({gym:loggedinid})
         res.status(200).json({
                message: "Add Successfully",
                membership: memberShip
            })

    }catch (err) {
        console.log(err);
        res.status(500).json({
            error: "Server Error"
        })
    }
}

