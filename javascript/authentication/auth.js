export const tryLogin = async (email, password, models, SECRET, SECRET_2) => {
    const user = await models.User.findOne({ where: { email }, raw: true});
    if (!user) {
        // user with provided email not found
        throw new Error('Invalid login');
    }
    if (!user.confirmed) {
        throw new Error('Please confirm your email to login');
    }
    
    const valid = await bcrypt.compare(password, user.password);
    if(!valid) {
        // bad password
        throw new Error('Invalid login');
    }

    const [token, refreshToken] = await createTokens(user, SECRET, SECRET_2 + user.password);
}