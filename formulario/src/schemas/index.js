import * as yup from 'yup'

const nameReqs = /^[a-zA-Z\s]*$/;
const passReqs = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

export const schema = yup.object().shape({
    name: yup
        .string()
        .min(3,'Name must be larger than 3 characters')
        .max(100,  'Name must be lower than 100 characters' )
        .matches(nameReqs,  'Name must only contains letters' )
        .required( "Required" ),
    email: yup
        .string()
        .email( 'Enter a valid email' )
        .required( "Required" ),
    password: yup
        .string()
        .min(6,  'Password must be at least 6 characters long' )
        .matches(passReqs,'at least one uppercase letter, one lowercase letter, one number and one special character' )
        .required( 'Required' )
})