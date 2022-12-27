import Models from "../Models.js"
import UserService from "../users/UserService.js";
import jwt from "jsonwebtoken"
import secret from "../config.js"

 const generateToken = (user) =>{
    const token_data = {_id: user._id, name: user.UserName, Email: user.Email}
    return jwt.sign(token_data, secret.secret, {expiresIn: "24h"})

}

class AuthService{
    async registration(body){
        const candidate = await Models.User.findOne({name: body.Email});
        if (candidate) {
            throw new Error("A user with this email exists");
        }

        const user = await UserService.create(body)
        return generateToken(user)
    }

    async login(body){
        const user = await this.validateUser(body)
        return {token: generateToken(user), name: body.UserName}
    }

    async validateUser(body){
        let pass = ""
        const user = await Models.User.findOne({Email: body.Email},function (err, person) {
            if (err) return Error(err)
            pass = person.Password
        })
        if (user && body.Password === pass) {
            return user;
        }
        throw new Error('Incorrect email or password')
    }
}

export default new AuthService()