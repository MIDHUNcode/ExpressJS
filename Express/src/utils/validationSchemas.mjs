export const createUserValidationSchema={
    user_name: {
        notEmpty: {
            errorMessage: "user_name Must not be empty",
        },
        isLength: {
            options: { min: 3, max: 20},
            errorMessage: "user_name Must be between 3 and 20 characters",
        },
        isString: {
            errorMessage: "user_name Must be a string",
        }
    },
    password: {
        notEmpty: {
            errorMessage: "password Must not be empty",
        },
        isLength: {
            options: { min: 6, max: 100},
            errorMessage: "password Must be between 6 and 100 characters",
        },
        isString: {
            errorMessage: "password Must be a string",
        }
    }
} 