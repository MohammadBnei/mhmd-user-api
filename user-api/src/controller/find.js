
const makeFind = ({ findService }) => ({
    findAll: async (req, res) => {
        try {
            const users = await findService.findAllUser()
            res.status(201).send({ users })

        } catch (e) {
            // TODO: Error logging
            console.log(e)
            res.status(400).send({
                error: e.message
            })
        }
    },
    findById: async (req, res) => {
        try {
            const id = req.param.id
            const user = await findService.findById(id)
            res.status(201).send({ user })

        } catch (e) {
            // TODO: Error logging
            console.log(e)
            res.status(400).send({
                error: e.message
            })
        }
    }
})

module.exports = makeFind
