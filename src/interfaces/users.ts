import {Document} from 'mongoose';

export default interface User {
    username : string;
    password : string;
}