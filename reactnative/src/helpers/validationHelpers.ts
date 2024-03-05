import * as Yup from 'yup'

const SignupSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email')
        .required('Required'),
    password: Yup.string()
        .required('Required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
})

const LoginSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email')
        .required('Required'),
    password: Yup.string()
        .required('Required')
})

const sendEmailSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email')
        .required('Required')
})

const GeneralFormSchema = Yup.object().shape({
    name: Yup.string()
        .required('Required'),
    DoB: Yup.string()
        .required('Required'),
    gender: Yup.string()
        .required('Required'),
})

export { SignupSchema, LoginSchema, sendEmailSchema, GeneralFormSchema }