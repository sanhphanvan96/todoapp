const index = (req, res) => {
    res.render('home', {
        title: 'Home'
    });
};

module.exports = {
    index: index
}