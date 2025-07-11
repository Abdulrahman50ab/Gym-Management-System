const Member = require('../Modals/member')
const Membership = require('../Modals/membership')



exports.getAllMember = async (req, res) => {
    try {
        const { skip, limit } = req.query;
        const members = await Member.find({ gym: req.gym._id });
        const totalMember = members.length;


        const limitedMembers = await Member.find({ gym: req.gym._id }).sort({ createdAt: -1 }).skip(skip).limit(limit);
        res.status(200).json({
            message: members.length ? "Fetched Members SuccessFully" : "No Any Member Registered yet",
            members: limitedMembers,
            totalMembers: totalMember
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: "Server Error"
        })

    }
}

function addMonthsToDate(months, joiningdate) {

    let today = joiningdate;
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    const currentDay = today.getDate();

    /* Calculate the new month and year */
    const futureMonth = currentMonth + months;
    const futureYear = currentYear + Math.floor(futureMonth / 12);

    /* Calculate the correct future month (modulus for month) */
    const adjustedMonth = futureMonth % 12;

    /* Set the date to the first of the future month */
    const futureDate = new Date(futureYear, adjustedMonth, 1);

    /* Get the last day of the future month */
    const lastDayOfFutureMonth = new Date(futureYear, adjustedMonth + 1, 0).getDate();


    /* Adjust the day if current day exceeds the number of days in the new month */
    const adjustedDay = Math.min(currentDay, lastDayOfFutureMonth);

    /* Set the final adjusted day */
    futureDate.setDate(adjustedDay);

    return futureDate;
}


exports.registerMember = async (req, res) => {
    try {
        const { name, mobileno, address, membership, profilepic, joiningdate } = req.body;
        const member = await Member.findOne({ gym: req.gym._id, mobileno })
        if (member) {
            return res.status(409).json({ error: 'Already registered with this Mobile no' });
        }
        const memberships = await Membership.findOne({ _id: membership, gym: req.gym._id });
        const membershipmonth = memberships.months;
        if (memberships) {
            let jngDate = new Date(joiningdate);
            const nextbilldate = addMonthsToDate(membershipmonth, jngDate);
            let newmember = new Member({ name, mobileno, address, membership, gym: req.gym._id, profilepic, nextbilldate });
            await newmember.save();
            res.status(200).json({ message: "member registered succesfully", newmember });
        } else {
            return res.status(409).json({ error: "NO such Membership are there" });
        }

    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: "Server Error"
        })

    }
}

exports.searchMember = async (req, res) => {
    try {
        const { searchTerm } = req.query;
        const member = await Member.find({
            gym: req.gym._id,
            $or: [{ name: { $regex: '^' + searchTerm, $options: 'i' } },
            { mobileno: { $regex: '^' + searchTerm, $options: 'i' } }]
        });
        res.status(200).json({
            message: member.length ? "Fetched Members Successfully" : "No Such Member Registered yet",
            members: member,
            totalMembers: member.length
        });


    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: "Server Error"
        })

    }
}


exports.monthlymember = async (req, res) => {
    try {
        const now = new Date();
        /* Get the first day of the current month (e.g., 2024-12-01 00:00:00) */
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

        /* Get the last day of the current month (e.g., 2024-09-30 23:59:59) */
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);

        const member = await Member.find({ gym: req.gym._id, createdAt: { $gte: startOfMonth, $lte: endOfMonth } }).sort({ createdAt: -1 });

        res.status(200).json({
            message: member.length ? "Fetched Members Successfully" : "No Such Member Registered yet",
            members: member,
            totalMembers: member.length
        });


    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: "Server Error"
        })

    }
}

exports.expiringWithin3Days = async (req, res) => {
    try {

        const today = new Date();
        const nextThreeDays = new Date();
        nextThreeDays.setDate(today.getDate() + 3);

        const member = await Member.find({ gym: req.gym._id, nextbilldate: { $gte: today, $lte: nextThreeDays } });

        res.status(200).json({
            message: member.length ? "Fetched Members Successfully" : "No Such Member is expiring within 3 days",
            members: member,
            totalMembers: member.length
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Server error" });
    }
};


exports.expiringWithin4to7day = async (req, res) => {
    try {

        const today = new Date();
        const next4days = new Date();
        next4days.setDate(today.getDate() + 4);

        const next7days = new Date();
        next7days.setDate(today.getDate() + 7);

        const member = await Member.find({ gym: req.gym._id, nextbilldate: { $gte: next4days, $lte: next7days } });

        res.status(200).json({
            message: member.length ? "Fetched Members Successfully" : "No Such Member is expiring within 4-7 days",
            members: member,
            totalMembers: member.length
        });


    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Server error" });
    }
}

exports.expiredMember = async (req, res) => {
    try {
        const today = new Date();

        const member = await Member.find({
            gym: req.gym._id, status: "Active",
            nextbilldate: {
                $lt: today
            }
        })
        res.status(200).json({
            message: member.length ? "Fetched Members Successfully" : "No Such Member has been Expired",
            members: member,
            totalMembers: member.length
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Server error" });
    }
}


exports.inactiveMember = async (req, res) => {
    try {
        const member = await Member.find({ gym: req.gym._id, status: "Pending" });
        res.status(200).json({
            message: member.length ? "Fetched Members Successfully" : "No Such Member is Pending",
            members: member,
            totalMembers: member.length
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Server error" });
    }
}

exports.getMemberDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const member = await Member.findOne({ _id: id, gym: req.gym._id });
        if (!member) {
            return res.status(400).json({
                error: "No Such Member"
            })
        }
        res.status(200).json({
            message: "Member Data Fetched",
            member: member
        })


    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Server error" });
    }
}


exports.changeStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const member = await Member.findOne({ _id: id, gym: req.gym._id });
        if (!member) {
            return res.status(400).json({
                error: "No Such Member"
            })
        }

        member.status = status;

        await member.save();
        res.status(200).json({
            message: "Status Changed SuccessFully"
        })


    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Server error" });
    }
}

exports.updateMemberPlan = async (req, res) => {
    try {
        const { membership } = req.body;
        const { id } = req.params;
        const memberShip = await Membership.findOne({ gym: req.gym._id, _id: membership })
        if (memberShip) {
            let getMonth = memberShip.months;
            let today = new Date();
            let nextBillDate = addMonthsToDate(getMonth, today);
            const member = await Member.findOne({ gym: req.gym._id, _id: id })
            if (!member) {
                return res.status(409).json({ error: "No Such MemberShip Are there" })
            }

            member.nextbilldate = nextBillDate;
            member.lastpayment = today;
            await member.save();
            res.status(200).json({
                message: "Member renew SuccessFully",
                member
            })
        } else {
            return res.status(409).json({ error: "No Such MemberShip Are there" })
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Server error" });
    }
}