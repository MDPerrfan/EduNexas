import { clerkClient } from "@clerk/express";

export const protectEducator = async(req, res, next) => {

    try {
        const { userId } = req.auth()
        console.log(userId)
        const response = await clerkClient.users.getUser(userId)
        console.log(response.publicMetadata.role)
        if (response.publicMetadata.role !== 'educator') {
            return res.json({ success: false, message: "Unauthorized access!" })
        }
        next()
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}