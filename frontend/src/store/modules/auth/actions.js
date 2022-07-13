let tokenTimer

import axios from "axios"

export default {
    async login(context, payload) {
        let userId = null
        try {
            const response = await axios.post("http://127.0.0.1:5000/auth", {
                login: payload.login,
                password: payload.password
            })

            userId = response.data.userId
        } catch(err) {
            const error = new Error(err || "Failed to login")
            throw error
        }

        const expiresIn = 60 * 60 * 24 * 1000
        const expirationDate = new Date().getTime() + expiresIn

        localStorage.setItem("userId", userId)
        localStorage.setItem("expirationDate", expirationDate)

        tokenTimer = setTimeout(function() {
            context.dispatch("logout")
        }, expiresIn)

        context.commit("setUserId", userId)
    },
    tryLogin(context) {
        const userId = localStorage.getItem("userId")
        const expirationDate = localStorage.getItem("expirationDate")

        const expiresIn = +expirationDate - new Date().getTime()

        if(expiresIn < 0) {
            return
        }

        tokenTimer = setTimeout(function() {
            context.dispatch("logout")
        }, expiresIn)

        if(userId) {
            context.commit("setUserId", userId)
        }
    },
    logout(context) {
        localStorage.removeItem("userId")
        localStorage.removeItem("expirationDate")

        clearTimeout(tokenTimer)

        context.commit("setUserId", null)
    }
}