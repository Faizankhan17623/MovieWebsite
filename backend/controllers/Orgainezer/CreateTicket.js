const date = require('date-and-time')
const CreateShow = require('../../models/CreateShow')
const USER = require('../../models/user')
const ticket = require('../../models/ticket')
exports.CreateTicket = async(req,res)=>{
    try {
        const ShowId = req.query.ShowId
        const userId = req.USER.id
        const {overallTicketCreated,priceoftheticket} = req.body

        if(!ShowId || !overallTicketCreated || !priceoftheticket){
            return res.status(400).json({
                message:"The input fields are been required",
                success:false
            })
        }
        const Finding = await CreateShow.findOne({_id:ShowId})

        if(!Finding){
            return res.status(404).jspn({
                message:"The show is not been found please check the input",
                success:false
            })
        }

        const existinggTicket = await ticket.findOne({showid:ShowId})

        if(existinggTicket){
            return res.status(400).json({
                message: "A ticket for this show has already been created",
                success: false
            });
        }
            
        const now = new Date();
        const pattern = date.compile('DD/MM/YYYY HH:mm:ss');
        let ShowTime = date.format(now, pattern);

        const formatNumber =  new Intl.NumberFormat('en-IN').format(overallTicketCreated);
        const formatNumber2 =  new Intl.NumberFormat('en-IN').format(priceoftheticket);
        console.log("This is the formattd number",formatNumber)
        const creation = await ticket.create({
            showid:ShowId,
            showtype:'Theatre',
            overallTicketCreated:formatNumber,
            priceoftheticket:formatNumber2,
            typeofticket:"Movie Ticket",
            showDate:ShowTime,  
        })
        await USER.updateOne({_id:userId},{$push:{ticketCreated:creation._id}})
        await CreateShow.updateOne({_id:ShowId},{totalticketsCreated:creation._id})

        return res.status(200).json({
            message:"The ticket is been created",
            success:true,
            data:creation
        })

    } catch (error) {
        console.log(error)
        console.log(error.message)
        return res.status(500).json({
            message:"There is an error in the create Ticket code",
            success:false
        })        
    }
}


exports.AlllotTheatre = async(req,res)=>{
    try {
        
    } catch (error) {
        console.log(error)
        console.log(error.message)
        return res.status(500).json({
            message:"There is an error Allot to the theatre code ",
            success:false
        })
    }
}