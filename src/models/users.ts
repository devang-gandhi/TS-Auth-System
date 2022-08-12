import mongoose, {Schema} from 'mongoose';
import User from '../interfaces/users';

const userSchema : Schema = new Schema({
    userName : {type : String, required : true},
    password : {type : String, required : true}
},{
    timestamps: true
});

export default mongoose.model<User>('User', userSchema);