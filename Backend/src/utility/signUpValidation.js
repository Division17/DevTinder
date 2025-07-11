const validator = require('validator')

const validateSignUp = (req) => {
    const { firstName, emailId, age, password, photoUrl } = req.body;
    if (!firstName || firstName === "") {
        throw new Error('First name is required')
    }

    else if (!validator.isEmail(emailId)) {
        throw new Error(emailId, " is not a valid email.")
    }

    else if (!validator.isStrongPassword(password)) {
        throw new Error("Use a Strong password.")
    }

    else if (age < 18 || age > 100) {
        throw new Error("Age must be between 18 and 100")
    }
    else if (!validator.isURL(photoUrl)) {
        throw new Error("Photo url is not a valid Url.")
    }


}

module.exports = {
    validateSignUp
}