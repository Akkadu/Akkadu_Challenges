export const state = () => ({
    drawer: true,
    receivers: ["John", "Michael"],
    senderName: "",
    room: "Chat Room 1",
    rooms: ["Chat Room 1", "Chat Room 2", "Chat Room 3"]
})
export const mutations = {
    openDrawer: (state) => state.drawer = !state.drawer,
    setReceivers: (state, payload) => state.receivers = payload,
    setSender: (state, payload) => state.senderName = payload,
    setRoom: (state, payload) => state.room = payload
}
