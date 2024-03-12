import React, { useState } from 'react'
import { Image, Pressable, StyleSheet, View } from 'react-native'
import { Typography } from '../../compLib'
import CreateRoomPopover from './CreateRoomPopover'

const teacherPic = require('../../../assets/images/teacher.jpg')
const parentPic = require('../../../assets/images/parent.jpg')
const studentPic = require('../../../assets/images/defaultFacePic.png')

const Contact = (props) => {
  const { name, role } = props.contactData[0]
  const profilePic = role === 'teacher' ? teacherPic : role === 'parent' ? parentPic : studentPic
  const [isPopoverVisible, setIsPopoverVisible] = useState(false)

  const handleOpenPopover = () => {
    setIsPopoverVisible(true)
  }

  const handleClosePopover = () => {
    setIsPopoverVisible(false)
  }
  return (
      <Pressable
      onPress={() => handleOpenPopover()}
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? '#333' : '#000',
        },
          styles.pressableContainer,
      ]}>
          <View style={styles.contactContainer}>
            <View style={styles.profilePicContainer}>
              <Image source={profilePic} style={styles.profilePic} />
            </View>
            <View style={styles.profileInfo}>
              <Typography size='lg' color='secondary'>{name}</Typography>
            </View>
          </View>

          {isPopoverVisible && (
              <CreateRoomPopover
                isPopoverVisible={isPopoverVisible}
                handleClosePopover={handleClosePopover}
                role={role}
              />
          )}

      </Pressable>
  )
}

const styles = StyleSheet.create({
    pressableContainer: {
        borderRadius: 2,
        padding: 10,
    },
    contactContainer: {
        flexDirection: 'row',
    },
    profilePicContainer: {
        borderRadius: 50,
        overflow: 'hidden',
        width: 70,
        height: 70,
        marginRight: 10,
    },
    profilePic: {
        width: '100%',
        height: '100%',
    },
    profileInfo: {
        display: 'flex',
        flexDirection: 'column',
        padding: 5,
    },
})


export default Contact
