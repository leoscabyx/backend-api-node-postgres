import jwt from 'jsonwebtoken'

const tokenSign = async (user) => {
    return jwt.sign(
      {
        id: user.id
      },
      process.env.SECRET
    );
};
  
const verifyToken = async (token) => {
    try {
        return jwt.verify(token, process.env.SECRET);
    } catch (e) {
        return null;
    }
};

const authJWT = async (req, res, next) => {
    try {
        if(!req.headers.authorization){
            return res.json({ error: "NO posees un token"})
        }
    
        const token = req.headers.authorization.split(" ").pop()

        const dataToken = await verifyToken(token)
        
        if(!dataToken){
            res.json({ error: "Token id invalido"})
            return
        }
  
        req.user = {
          id: dataToken.id
        }
        next()
    } catch (error) {
        res.json(error)
    }
}

export { tokenSign, verifyToken, authJWT };