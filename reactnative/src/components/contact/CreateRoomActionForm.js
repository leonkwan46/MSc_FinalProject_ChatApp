import { Box, VStack } from '@react-native-material/core'
import { Formik } from 'formik'
import React, { useState } from 'react'
import { Button, TextInput, Typography } from '../../compLib'
import { getUserContacts, getUserToken } from '../../redux/selectors'
import { Picker } from '@react-native-picker/picker'
import { StyleSheet } from 'react-native'
import { useDispatch } from 'react-redux'
import { createChatRoom } from '../../redux/reducer/sessionSlice'
import * as Yup from 'yup'
import { useNavigation } from '@react-navigation/native'

const CreateRoomSchemaBuilder = (params) => {
    const { teachers, students, children, parents, parent } = params
    let yupObject = {}
    if (parents) yupObject.parent = Yup.string().required('Required')
    if (parent) yupObject.parent = Yup.string().required('Required')
    if (teachers) yupObject.teacher = Yup.string().required('Required')
    if (students) yupObject.student = Yup.string().required('Required')
    if (children) yupObject.child = Yup.string().required('Required')
    return Yup.object().shape(yupObject)
}

const CreateRoomActionForm = (props) => {
    const { handleClosePopover } = props
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const token = getUserToken()
    const { teachers, students, children, parents, parent } = getUserContacts()
    const CreateRoomSchema = CreateRoomSchemaBuilder({ teachers, students, children, parents, parent })
    
    const [selectedParent, setSelectedParent] = useState()
    const [showParentPicker, setShowParentPicker] = useState(false)

    const [selectedTeacher, setSelectedTeacher] = useState()
    const [showTeacherPicker, setShowTeacherPicker] = useState(false)

    const [selectedStudent, setSelectedStudent] = useState()
    const [showStudentPicker, setShowStudentPicker] = useState(false)

    const [selectedChild, setSelectedChild] = useState()
    const [showChildPicker, setShowChildPicker] = useState(false)

    const handleOnFocusParentPicker = () => setShowParentPicker(true)
    const handleOnBlurParentPicker = () => setShowParentPicker(false)

    const handleOnFocusTeacherPicker = () => setShowTeacherPicker(true)
    const handleOnBlurTeacherPicker = () => setShowTeacherPicker(false)

    const handleOnFocusStudentPicker = () => setShowStudentPicker(true)
    const handleOnBlurStudentPicker = () => setShowStudentPicker(false)

    const handleOnFocusChildPicker = () => setShowChildPicker(true)
    const handleOnBlurChildPicker = () => setShowChildPicker(false)

    const handleOnSubmit = async (values, { resetForm }) => {
        Object.keys(values).forEach(key => { !values[key] ? delete values[key] : null })
        values = {...values, token}
        await dispatch(createChatRoom(values))
        handleClosePopover()
        resetForm()
        // navigate and refresh the chat room list MessageScreen
        navigation.navigate('MessageScreen')
    }

    return (
        <Formik
            initialValues={{
                parent: '',
                teacher: '',
                student: '',
                child: '',
            }}
            validationSchema={CreateRoomSchema}
            onSubmit={handleOnSubmit}
        >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <VStack spacing={20} >
                {parents || parent && (
                    <Box>
                        <TextInput
                            onChange={handleChange('parent')}
                            value={values.parent ? values.parent.split(',')[0] : ''}
                            size='lg'
                            hasError={errors.parent && touched.parent ? true : false}
                            placeholder='Parent'
                            onFocus={handleOnFocusParentPicker}
                            onBlur={handleOnBlurParentPicker}
                        />
                        {showParentPicker && (
                            <Picker
                                style={styles.picker}
                                itemStyle={styles.pickerItem}
                                selectedValue={selectedParent}
                                onValueChange={(itemValue, itemIndex) => {
                                    setSelectedParent(itemValue)
                                    values.parent = itemValue
                                }}
                            >
                                <Picker.Item label="Select Parent" value={''} />
                                {parents ? (
                                    parents.map(parent => (
                                        <Picker.Item key={parent._id} label={parent.name} value={`${parent.name},${parent._id}`} />
                                    ))
                                ): (
                                    <Picker.Item key={parent._id} label={parent.name} value={`${parent.name},${parent._id}`} />
                                )}
                            </Picker>
                        )}  
                    </Box>
                )}
                {teachers && (
                    <Box>
                        <TextInput
                            onChange={handleChange('teacher')}
                            value={values.teacher ? values.teacher.split(',')[0] : ''}
                            size='lg'
                            hasError={errors.teacher && touched.teacher ? true : false}
                            placeholder='Teacher'
                            onFocus={handleOnFocusTeacherPicker}
                            onBlur={handleOnBlurTeacherPicker}
                        />
                        {showTeacherPicker && (
                            <Picker
                                style={styles.picker}
                                itemStyle={styles.pickerItem}
                                selectedValue={selectedTeacher}
                                onValueChange={(itemValue, itemIndex) => {
                                    setSelectedTeacher(itemValue)
                                    values.teacher = itemValue
                                } }
                            >
                                <Picker.Item label="Select Teacher" value={''} />
                                {teachers.map(teacher => (
                                        <Picker.Item key={teacher._id} label={teacher.name} value={`${teacher.name},${teacher._id}`} />
                                ))}
                            </Picker>
                        )}  
                    </Box>
                )}
                {students && (
                    <Box>
                        <TextInput
                            onChange={handleChange('student')}
                            value={values.student ? values.student.split(',')[0] : ''}
                            size='lg'
                            hasError={errors.student && touched.student ? true : false}
                            placeholder='Student'
                            onFocus={handleOnFocusStudentPicker}
                            onBlur={handleOnBlurStudentPicker}
                        />
                        {showStudentPicker && (
                            <Picker
                                style={styles.picker}
                                itemStyle={styles.pickerItem}
                                selectedValue={selectedStudent}
                                onValueChange={(itemValue, itemIndex) => {
                                    setSelectedStudent(itemValue)
                                    values.student = itemValue
                                } }
                            >
                                <Picker.Item label="Select Student" value={''} />
                                {students.map(student => (
                                    <Picker.Item key={student._id} label={student.name} value={`${student.name},${student._id}`} />
                                ))}
                            </Picker>
                        )}  
                    </Box>
                )}
                {children && (
                    <Box>
                        <TextInput
                            onChange={handleChange('child')}
                            value={values.child ? values.child.split(',')[0] : ''}
                            size='lg'
                            hasError={errors.child && touched.child ? true : false}
                            placeholder='Child'
                            onFocus={handleOnFocusChildPicker}
                            onBlur={handleOnBlurChildPicker}
                        />
                        {showChildPicker && (
                            <Picker
                                style={styles.picker}
                                itemStyle={styles.pickerItem}
                                selectedValue={selectedChild}
                                onValueChange={(itemValue, itemIndex) => {
                                    setSelectedChild(itemValue)
                                    values.child = itemValue
                                }}
                                onBlur={handleOnBlurChildPicker}
                            >
                                <Picker.Item label="Select Child" value={''} />
                                {children.map(child => (
                                    <Picker.Item key={child._id} label={child.name} value={`${child.name},${child._id}`} />
                                ))}
                            </Picker>
                        )}  
                    </Box>
                )}
                <Box style={styles.buttonContainer}>
                    <Button onPress={handleSubmit} size='lg' color='primary'>
                        <Typography style={styles.buttonText}>Create</Typography>
                    </Button>
                </Box>
            </VStack>
        )}
        </Formik>
    )
}

const styles = StyleSheet.create({
    picker: {
        marginTop: -70,
        marginBottom: -40,
    },
    pickerItem: {
        color: 'white',
    },
    buttonContainer: {
        alignItems: 'flex-end',
    },
})

export default CreateRoomActionForm