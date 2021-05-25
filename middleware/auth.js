const users = (req , res, next) => {
    const user =  req.session.user
    if(user != undefined){
        next()
    }else{
        res.redirect('/login')
    }
}

const admin = (req , res, next) => {
    const user =  req.session.user
    if(user != undefined){
        if(user.level === 2){
            next()
        }else{
            res.redirect('/login')
        }
    }else{
        res.redirect('/login')
    }
}

module.exports = {users, admin}