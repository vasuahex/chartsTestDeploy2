import mongoose from "mongoose";
const forgotSchema  = new mongoose.Schema({
    email: { type: String, required: true },
    token: { type: String, required: true },
    code: { type: Number, required: true},
    expirationTime: { type: Date, required: true },
});
const ForgotPassword =  mongoose.models.forgotpasswords || mongoose.model('forgotpasswords',forgotSchema);
export default ForgotPassword;
