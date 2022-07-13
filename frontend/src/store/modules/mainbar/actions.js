export default {
    toggleSidebar(context) {
        context.commit("toggleSidebar", !context.getters.getSidebarStatus)
    },
    hideSidebar(context) {
        context.commit("toggleSidebar", false)
    }
}