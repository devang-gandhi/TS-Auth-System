import {NextFunction, Request, Response} from 'express';
import logging from '../config/logging';
import bcryptjs from 'bcryptjs';
import mongoose from 'mongoose';
import User from '../models/users';
import signJWT from '../functions/signJWT';

const nameSpace = 'User';

const validateToken = (req: Request, res:Response, next:NextFunction)=>{
    logging.info(nameSpace, 'Token validated, user Authorized..' );

    return res.status(200).json({
        message : 'Authorized!'
    });
};

const register = (req: Request, res:Response, next:NextFunction)=>{

    let {userName, password} = req.body;

    bcryptjs.hash(password, 10, (error, hash)=>{

        if(error){
            return res.status(500).json({
                message : error.message,
                error:error
            });
        }

        const user = new User({
            _id : new mongoose.Types.ObjectId(),
            userName,
            password: hash
        })

        return user.save()
        .then(user=>{
            return res.status(201).json({
                user
            });
        })
        .catch(error=>{
            return res.status(500).json({
                message : error.message,
                error
            })
        })
    })
};

const login = (req: Request, res:Response, next:NextFunction)=>{
    let {userName, password} = req.body;

    User.find({ userName})
    .exec()
    .then(users=>{
        if(users.length != 1){
            return res.status(401).json({
                message : 'Unauthorized'
            });
        }

        bcryptjs.compare(password, users[0].password, (error, result)=>{
            if(error){
                logging.error(nameSpace, error.message, error);

                return res.status(401).json({
                    message : 'Unauthorized'
                });
            }
            else if(result) {
                signJWT(users[0], (error, token)=>{
                    if(error){

                        logging.error(nameSpace, 'Unable to sign in', error);

                        return res.status(401).json({
                            message: 'Unauthorized',
                            error: error
                        });
                    }
                    else if(token){

                        return res.status(200).json({
                            message : 'Auth successful..',
                            token,
                            user : users[0]
                        });
                    }
                })
            }
        });
    })
    .catch(error=>{
        return res.status(500).json({
            message : error.message,
            error
        })
    })
};

const getAllUsers = (req: Request, res:Response, next:NextFunction)=>{
    User.find()
    .select('password')
    .exec()
    .then(users=>{
        return res.status(200).json({
            users,
            count : users.length
        })
    })
    .catch(error=>{
        return res.status(500).json({
            message : error.message,
            error
        })
    })
};

export default {validateToken, register, login, getAllUsers}
