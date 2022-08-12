import jwt from 'jsonwebtoken';
import logging from '../config/logging';
import User from '../interfaces/users';


const nameSpace = 'Auth';
const jwtSecret = '$#%^sljnfwndkmw;dmw;kmdwd&*^';

const signJWT = (user : User, callback: (error: Error | null, token: string | null)=> void ): void=>{

    let times = new Date().getTime();
    let expirationTime = times + Number(3600) * 100000;
    let expirationTimeInSec = Math.floor(expirationTime / 1000);

    logging.info(nameSpace , 'Attemping to sign token for' + user.username);

    try {
        jwt.sign({
                username : user.username
            },
            jwtSecret,
            {
                issuer : 'CoolIsUser',
                algorithm: 'HS256',
                expiresIn : expirationTimeInSec
            },
            (error, token)=>{
                if(error){
                    callback(error, null);
                }
                else if(token){
                    callback(null, token);
                }
            }
        );
    } catch (error) {
        console.log(error);
    }
};

export default signJWT;