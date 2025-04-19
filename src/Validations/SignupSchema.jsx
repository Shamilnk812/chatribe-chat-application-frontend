import * as Yup from 'yup';


const registrationSchema = Yup.object({
    username: Yup.string()
        .transform((value) => value.trim())
        .required('Username is required')
        .min(3, 'Username must be at least 3 characters long')
        .max(20, 'Username must not exceed 20 characters')
        .matches(
            /^[a-zA-Z0-9_]+$/,
            'Username can only contain letters, numbers, and underscores'
        )
        .test(
            'no-spaces',
            'Username cannot contain spaces',
            (value) => !/\s/.test(value)
        )
        .test(
            'not-only-numbers',
            'Username cannot be only numbers',
            (value) => !/^\d+$/.test(value)
        )
        .test(
            'not-only-underscores',
            'Username cannot be only underscores',
            (value) => !/^_+$/.test(value)
        )
        .test(
            'has-letters',
            'Username must contain at least one letter (a-z, A-Z)',
            (value) => /[a-zA-Z]/.test(value)
        ),
    email: Yup.string()
        .transform((value) => value.trim())
        .email("Invalid email address")
        .required("The Email field is required"),
    password: Yup.string()
        .transform((value) => value.trim())
        .required("The Password field is required")
        .min(8, "Password must be 8 characters long")
        .matches(/[0-9]/, "Password requires a number")
        .matches(/[a-z]/, "Password requires a lowercase letter")
        .matches(/[A-Z]/, "Password requires an uppercase letter")
        .matches(/[^\w]/, "Password requires a symbol"),
    confirm_password: Yup.string()
        .transform((value) => value.trim())
        .oneOf([Yup.ref("password")], "The Password confirmation doesn't match.")
        .required("Confirm password is required"),

})


export default registrationSchema