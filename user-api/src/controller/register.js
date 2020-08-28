
const makeRegister = ({ registerService }) => async (req, res) => {
    try {
        const userInfo = req.body

        const user = await registerService(userInfo)

        res.status(201).send({ user })
    } catch (e) {
        // TODO: Error logging
        console.log(e)
        res.status(400).send({
            error: e.message
        })
    }
}

module.exports = makeRegister
