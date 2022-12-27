import AuthService from "./AuthService.js";

class AuthController {
    async registration(req, res) {
        try {
            const post = await AuthService.registration(req.body)
            res.json(post)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }

    async authorization(req, res) {
        try {
            const post = await AuthService.login(req.body)
            res.json(post)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }

}


export default new AuthController();
