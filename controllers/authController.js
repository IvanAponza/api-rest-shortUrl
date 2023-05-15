export const register = (req, res)=>{
    //console.log(req.body)
    return res.json({"ok": "register"});
}

export const login = (req, res)=>{
    return res.json({"ok": "login"});
}
