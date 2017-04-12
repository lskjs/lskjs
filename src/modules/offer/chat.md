# достал из chat.server.js

// Message.getRole(userId) -> owner
// Message.is('owner')  // ?
// Message.roles = {
//  owner: {
//    read: ['title', 'createdAt'], // all
//    write: ['user, 'owner'] // info
// }
//  guest: {
//    read: ['title', 'createdAt'], // all
//    write: ['user, 'owner'] // null
// }
// validate params
// 1) OWNER
// 2) Public
//
//
// Message.isOwner = (userId) => { this.ownerId } ['content']
// Message.canWrite = ['content']
// MEssage.canWrite = ['content']
//
// schema = {
//   title: {
//     canWrite: () => {}
//   }
// }
