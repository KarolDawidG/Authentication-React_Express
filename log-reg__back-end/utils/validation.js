const queryParameterize = /^[A-Za-z0-9]+$/;

const validateEmail = (e) => {
    const email = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
    return email.test(e);
};

const validatePassword = (e) => {
    return e.length >= 8 && e.length <= 16 && /[A-Z]/.test(e) && /[0-9]/.test(e);
};

// module.exports = {           todo
//     queryParameterize,
//     validateEmail,
//     validatePassword,
// };
