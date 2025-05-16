const mongoose = require("mongoose");
const initData = require("./data");
const Listing = require("../models/listing");
const data = require("./data");
 const url = "mongodb://127.0.0.1:27017/Hotel_Booking";
main().then(() => {
    console.log("Connection Successful");
}).catch((err) =>{
    console.log(err);
})
async function main() {
    await mongoose.connect(url);
}
 const initDB = async() =>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({
        ...obj,
        owner:"681c86f1213870d46b283812",}));
    await Listing.insertMany(initData.data);
    console.log("Data was initialized");
 };
    initDB();