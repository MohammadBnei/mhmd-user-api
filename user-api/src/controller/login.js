
const makeLogin = ({ loginService }) => async (req, res) => {
    try {
        const userInfo = req.body

        const user = await loginService(userInfo)

        res.status(200).send({ user })
    } catch (e) {
        // TODO: Error logging
        console.log(e)
        res.status(400).send({
            error: e.message
        })
    }
}

module.exports = makeLogin
