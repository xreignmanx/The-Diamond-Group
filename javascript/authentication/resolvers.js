register: async (parent, args, { transporter, models, EMAIL_SECRET }) => {
    const hashedPassword = await bcrypt.hash(args.password, 12);
    const user = await models.User.create({
        ...args,
        password: hashedPassword,
    });

    jwt.sign(
        { user: _.pick(user, 'id'),
        },
        EMAIL_SECRET,
        {
            expiresIn: '1d',
        },
        (err, emailToken) => {
            const url = "file:///C:/Users/SoleS/Desktop/Visual%20Studio%20Code/BootCamp/Homework%20Assignments/The-Diamond-Group/index.html/confirmation/" + emailToken;
    
            transporter.sendMail({
                to: args.email,
                subject: 'Confirm Email',
                html: 'Please click this email to confrim your email: <a href="${url}">${url}</a>'
            });
        },
    );
}

