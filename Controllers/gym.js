const Gym = require('../Modals/gym')

const crypto = require("crypto")
const nodemailer = require("nodemailer")
const jwt = require('jsonwebtoken');


exports.register = async (req, res) => {
    try {
        const { username, password, gymname, email } = req.body;
        const isexist = await Gym.findOne({ username });

        if (isexist) {
            res.status(400).json({
                error: "username Already Exist, Please Try With Other Username"
            })
        } else {
            const newgym = new Gym({ username, password, gymname, email });
            await newgym.save();

            res.status(201).json({ message: 'User registered Successfully', success: 'yes', data: newgym });
        }
    } catch (err) {
        res.status(500).json({
            error: "Server Error"
        })
    }
}

const cookieOptions ={
    httpOnly:true,
    secure:false,
    sameSite:'Lax'
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const gym = await Gym.findOne({ username,password});

        if(gym){
            const token = jwt.sign({gym_id:gym._id},process.env.JWT_SecretKey);

            res.cookie("cookie_token",token,cookieOptions);
            
            res.json({ message: 'Logged in Successfully', success: 'true', gym,token});
        }else{
            res.status(400).json({error:'Invalid members'})
        }

    }catch (err) {
        res.status(500).json({
            error: "Server Error"
        })
    }
}

const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.SENDER_EMAIL,
        pass:process.env.EMAIL_PASSWORD
    }
});

exports.sentotp = async (req,res)=>{
    try{
        const {email}=req.body;
        const gym = await Gym.findOne({email});
        if(gym){
            const buffer = crypto.randomBytes(4);
            const token = buffer.readUint32BE(0)% 900000 + 100000;
            gym.resetpasswordtoken = token ;
            gym.resetpasswordexpire = Date.now() + 3600000;

            await gym.save();

            const mailoption ={
                from:'abdulrahman50ab@gmail.com',
                to:email,
                subject:'Password Reset',
                text:`You requested a password reset Your OTP id : ${token}`
            }

            transporter.sendMail(mailoption,(error,info)=>{
                if(error){
                    res.status(500).json({error:'server error',errorMsg:error});
                }else{
                    res.status(200).json({message:"Otp sent to your email"})
                }
            })

        }else{
            return res.status(400).json({error:'gym is not found'});
        }
    
    }catch (err) {
        res.status(500).json({
            error: "Server Error"
        })
    }
}

exports.checkotp = async(req,res)=>{
    try{
        const {email,otp} =req.body;
        const gym = await Gym.findOne({
            email,
            resetpasswordtoken:otp,
            resetpasswordexpire:{$gt:Date.now()}
        });

        if (!gym){
            return res.status(400).json({error:'otp is invalid or has expired'});
        }
        res.status(200).json({message:"Otp is successfully verified"})

    }catch (err) {
        res.status(500).json({
            error: "Server Error"
        })
    }
}

exports.resetpassword=async(req,res)=>{
    try{
        const{email,newpassword}=req.body;
        const gym =await Gym.findOne({email});

        if(!gym){
            return res.status(400).json({error:'some technial issue  please try again '});
        }
        gym.password = newpassword;
        gym.resetpasswordexpire = undefined;
        gym.resetpasswordtoken = undefined;
        await gym.save();
        res.status(200).json({message:"password is successfully changed"})

    }catch (err) {
        res.status(500).json({
            error: "Server Error"
        })
    }
}

exports.logout =async (req,res)=>{
   res.clearCookie('cookie_token',cookieOptions).json({message:'logged out successfully'});
}

