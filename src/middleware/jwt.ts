import {NextFunction, Request, Response} from 'express';
import logging from '../config/logging';
import jwt from 'jsonwebtoken';

const nameSpace = 'Auth';
const jwtSecret = '$#%^sljnfwndkmw;dmw;kmdwd&*^';

const extractJWT = (req : Request, res:Response, next:NextFunction)=>{
    logging.info(nameSpace, 'validating token');

    let token = req.headers.authorization?.split(' ')[1];

    if(token){

        jwt.verify(token, jwtSecret, (error, decoded)=>{
            if(error){
                return res.status(400).json({
                    message : error.message,
                    error : error
                });
            }
            else{
                res.locals.jwt = decoded;
                next();
            }
        });
    }
    else{
        return res.status(401).json({
            message : 'Unauthozied..'
        });
    }
}

export default extractJWT;