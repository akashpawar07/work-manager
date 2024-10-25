import mongoose from "mongoose";

export async function connect() {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        const connection = mongoose.connection;

        connection.on("connected", () => {
            console.log("MongoDB connected successfully ✅")
        })

        connection.on('disconnected', (error) => {
            console.log("Ohh! Mongodb Disconnected : ", + error.message);
            process.exit(1);
        })
    } catch (error) {
        console.log("something went wrong while connecting database ❌ ");
        console.log(error.message);
    }
}