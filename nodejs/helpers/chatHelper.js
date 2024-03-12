import { Message, Parent, Student, Teacher, User } from '../db/modals/index.js'
import userDataHelper from './userDataHelper.js'

const chatHelper = {}

chatHelper.handleSendMessage = async (io, socket, props) => {
    const { roomId, message, userId } = props

    const newMessage = Message({
        message,
        senderId: userId,
        roomId,
        sentAt: Date.now(),
        isRead: false,
    })
    // Save message to database
    // try {
    //     await newMessage.save()
    //     console.log('=======================')
    //     console.log('Message saved to database')
    //     console.log('=======================')
    // } catch (err) {
    //     console.log(err)
    // }
    io.emit('chatMessage', { sender: socket.id, data: newMessage })
}

chatHelper.createRoom = async (io, socket, userData) => {

}

chatHelper.generateRoomMemberData = async (userID, role, data) => {
    const { teacher, student, parent, child } = data
    let roomMemberData

    switch (role) {
        case 'teacher':
            roomMemberData = {
                teacher: await userDataHelper.fetchUserDataByIDAndRole(userID, 'teacher'),
                student: await userDataHelper.fetchUserDataByIDAndRole(student.split(',')[1], 'student'),
                parent: await userDataHelper.fetchUserDataByIDAndRole(parent.split(',')[1], 'parent')
            }
            break
        case 'parent':
            roomMemberData = {
                parent: await userDataHelper.fetchUserDataByIDAndRole(userID, 'parent'),
                teacher: await userDataHelper.fetchUserDataByIDAndRole(teacher.split(',')[1], 'teacher'),
                student: await userDataHelper.fetchUserDataByIDAndRole(child.split(',')[1], 'student')
            }
            break
        case 'student':
            roomMemberData = {
                student: await userDataHelper.fetchUserDataByIDAndRole(userID, 'student'),
                parent: await userDataHelper.fetchUserDataByIDAndRole(parent.split(',')[1], 'parent'),
                teacher: await userDataHelper.fetchUserDataByIDAndRole(teacher.split(',')[1], 'teacher')
            }
            break
        default:
            break
    }
    roomMemberData

    return roomMemberData
}

chatHelper.joinRoom = (io, socket, room) => {
    socket.join(room)
    io.to(room).emit('roomJoined', { user: socket.id, room: room })
}


export default chatHelper
