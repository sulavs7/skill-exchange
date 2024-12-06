const authController = require('./controllers/authController');


//redirect to login.ejs
function redirectToLogin() {
    window.location.href = '/login';
}

function redirectToSignUp() {
    window.location.href = '/signup';
}
