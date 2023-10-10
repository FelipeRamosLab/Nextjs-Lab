export default async function LoginActivity(req, res) {
    try {
        return res.status(200).send({ testingTitle: 'Testing' });
    } catch (err) {
        return res.status(500).send(err);
    }
}
