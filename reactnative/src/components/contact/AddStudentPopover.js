import React from 'react'
import { ImageBackground, Modal, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Button, TextInput, Typography } from '../../compLib'
import { Icon } from 'react-native-elements'
import { Formik } from 'formik'
import { sendEmailSchema } from '../../helpers/validationHelpers'
import { Box, VStack } from '@react-native-material/core'
import { sendInvitationCode } from '../../redux/reducer/sessionSlice'
import { getLoggedInUser } from '../../redux/stateHelper'
import { useDispatch } from 'react-redux'

const testValues = {
    email: 'lk370.chatapp@gmail.com',
}

const AddStudentPopover = (props) => {
    const dispatch = useDispatch()
    const { userId, token } = getLoggedInUser()
    const { isPopoverVisible, handleClosePopover } = props
    const handleSendInvitationCode = (values, { resetForm }) => {
        dispatch(sendInvitationCode({ email: values.email, userId, token }))
        resetForm()
    }

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isPopoverVisible}
            onRequestClose={handleClosePopover}
        >
            <View style={styles.modalContainer}>
                <ImageBackground
                    source={require('../../../assets/images/piano-dark.jpg')}
                    style={styles.backgroundImage}
                >
                    <View style={styles.popoverContainer}>
                        <TouchableOpacity onPress={handleClosePopover} style={styles.closeButton}>
                            <Icon size={40} name="close" type="material" color={'white'} />
                        </TouchableOpacity>
                        <View style={styles.popoverContentContainer} >
                            <Typography color='primary' size='subtitle'>Send Invitation Code</Typography>
                            <View style={styles.popoverContent}>
                                <Formik
                                    initialValues={testValues}
                                    onSubmit={handleSendInvitationCode}
                                    validationSchema={sendEmailSchema}
                                >
                                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                                        <VStack spacing={50}>
                                            <Box>
                                                <TextInput
                                                    onChangeText={handleChange('email')}
                                                    onBlur={handleBlur('email')}
                                                    value={values.email}
                                                    size='lg'
                                                    hasError={errors.email && touched.email ? true : false}
                                                    placeholder='Email'
                                                />
                                            </Box>
                                            <Box>
                                                <Button onPress={handleSubmit} color='primary'>
                                                    <Typography size='md'>Send</Typography>
                                                </Button>
                                            </Box>
                                        </VStack>
                                    )}
                                </Formik>
                            </View>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        width: '70%',
        height: '60%',
        position: 'absolute',
        top: '20%',
        left: '15%',
        borderRadius: 30,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        overflow: 'hidden',
        borderRadius: 30,
    },
    popoverContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    popoverContentContainer: {
        top: '20%',
        padding: 20,
    },
    popoverContent: {
        marginTop: '20%',
    },
    closeButton: {
        position: 'absolute',
        top: 20,
        right: 20,
        width: '15%',
        height: '10%',
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default AddStudentPopover