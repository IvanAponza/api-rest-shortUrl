import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
    index: { unique: true },
  },
  password: {
    type: String,
    required: true,
  },
});

//hash the password after the save en the database
userSchema.pre("save", async function (next) {
  const user = this;

  //si la password es modificada no entra acá
  if (!user.isModified("password")) return next();

  try {
    const salt = await bcryptjs.genSalt(10);
    user.password = await bcryptjs.hash(user.password, salt);
    next();
  } catch (error) {
    console.log(error);
    throw new Error("Falló el hash de password");
  }
});

//Compara la password con la almacenada en la DB
userSchema.methods.comparePassword = async function (candidatePassword){
    return bcryptjs.compare(candidatePassword, this.password);
}

export const User = mongoose.model("User", userSchema);
