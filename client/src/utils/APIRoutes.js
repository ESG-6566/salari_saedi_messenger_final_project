//this file used by axios node module to send data to server
export const host = "http://localhost:5000";
export const registerRoute = `${host}/api/auth/register`;
export const loginRoute = `${host}/api/auth/login`;
export const setAvatarRoute = `${host}/api/auth/setAvatar`;
export const allUsersRoute = `${host}/api/auth/allusers`;
export const logoutRoute = `${host}/api/auth/logoutRoute`;
export const sendMessageRoute = `${host}/api/messages/addmsg`;
export const getAllMessagesRoute = `${host}/api/messages/getmsg`