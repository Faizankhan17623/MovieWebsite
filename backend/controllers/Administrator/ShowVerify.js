
const CreateShow = require('../../models/CreateShow')

exports.VerifyShow = async (req, res) => {
    try {

        const {id} = req.body

        if (!id) {
            return res.status(400).json({
                message: "The input ID is required",
                success: false,
            });
        }

        // Find the show by ID
        const Finding = await CreateShow.findById(id);
        if (!Finding) {
            return res.status(404).json({
                message: "The show was not found",
                success: false,
            });
        }

        // Update the show
        const updating = await CreateShow.findByIdAndUpdate(
            id,
            { VerifiedByTheAdmin: true }, // Use 'data' instead of undefined 'verified'
            { new: true }
        );

        console.log(updating);
        return res.status(200).json({
            message: "The show has been verified",
            success: true,
            updatedShow: updating
        });

    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            message: "There was an error verifying the show",
            success: false,
        });
    }
};
