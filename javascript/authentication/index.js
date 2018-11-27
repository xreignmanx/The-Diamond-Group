const transporter = nodemailer.createTranspot({
    service: 'Gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
    },
});

app.use(cors("*"));
app.user(addUser);

app.get('/confirmation/:token', async (req, res) => {
    try {
        const {user: { id } } = jwt.verify(req.params.token, EMAIL_SECRET);
        await MSFIDOCredentialAssertion.User.update({ confirmed: true }, { where: { id } });
    } catch (e) {
        res.send('error');
    }

    return res.redirect('http://localhost:3001/login')
})

app.use(
    '/graphiql',
    graphiqlExpress({
        endpointURL: '/graphql',
    }),
);