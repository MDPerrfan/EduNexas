import { clerkClient } from '@clerk/express'
export const updateRoleEducator = async(req, res) => {
    try {
        const { userId } = req.auth();
        await clerkClient.users.updateUserMetadata(userId, {
            publicMetadata: {
                role: 'educator',
            }
        })
        res.json({ success: true, message: 'You can now publish courses now.' })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}