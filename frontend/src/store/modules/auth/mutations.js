export default {
    setUserId(state, payload) {
        state.userId = payload
        state.didAutoLogout = false
    }
}