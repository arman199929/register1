const depPath = ('../views/backend/deposit.ejs')
exports.doDeposit = (req, res) => {
    res.render(depPath,{
        title: 'Deposit'
    })
}