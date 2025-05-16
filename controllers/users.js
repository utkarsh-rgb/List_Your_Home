const User = require("../models/user");

// Render the signup form
module.exports.renderSignupForm = (req, res) => {
    res.render("users/signup.ejs");
};

// Handle user signup
module.exports.signup = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const newUser = new User({ email, username });

        // Register the user using passport-local-mongoose
        const registeredUser = await User.register(newUser, password);

        // Log in the user automatically after registration
        req.login(registeredUser, (err) => {
            if (err) return next(err);
            req.flash("success", "Welcome to Hotel Booking");
            res.redirect("/listings");
        });
    } catch (err) {
        req.flash("error", err.message);
        res.redirect("/signup");
    }
};

// Render the login form
module.exports.renderLoginForm = (req, res) => {
    res.render("users/login.ejs");
};

// Handle user login
module.exports.login = (req, res) => {
    req.flash("success", "Welcome! You Logged In");
    const redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

// Handle logout
module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        req.flash("success", "You are logged out");
        res.redirect("/listings");
    });
};
