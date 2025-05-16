const Listing = require("../models/listing");



module.exports.index = async (req, res) => {
    const alllistings = await Listing.find({});
    res.render("listings/index.ejs", { alllistings });
};

module.exports.renderNewForm = (req, res) => {

    res.render("listings/new.ejs");
}

module.exports.createListing = async (req, res) => {
     console.log("Inside createListing");
  console.log("req.file:", req.file);
  console.log("req.body:", req.body);
    try {
        // Extract image info from the uploaded file
        let url = req.file.path;
        let filename = req.file.filename;
        console.log("Uploaded file:", url, filename);

        // Create a new listing with form data
        const newListing = new Listing(req.body.listing);

        // Set the owner to the logged-in user's ID
        newListing.owner = req.user._id;

        // Attach the image info to the listing
        newListing.image = { url, filename };

        // Save the listing to the database
        await newListing.save();

        req.flash("success", "New listing created successfully!");
        res.redirect("/listings");
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/listings/new");
    }
};


module.exports.showListing= async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id)
    .populate({
        path:"reviews",
        populate:{
        path:"author"
        },
    })
    .populate("owner");
    if(!listing) {
        req.flash("error", "Listing not found!"); 
        res.redirect("/listings");
        return;  
    }
    res.render("listings/show.ejs", { listing });
};


module.exports.updateListings = async (req, res) => {
    let { id } = req.params;

    let listing = await Listing.findByIdAndUpdate(id,{...req.body.listing});

    if(typeof req.file != "undefined"){
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = {url, filename};
        await listing.save();
    }

    req.flash("success", "Listing updated!");
    res.redirect(`/listings/${id}`);
};
             

module.exports.deleteListings =async (req, res) => {
    const { id } = req.params;
    const deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success", "Listing deleted successfully!");
    res.redirect("/listings");
};

module.exports.renderEditForm = async(req,res) =>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing) {
        req.flash("error","Listing you requested for does not exist");
      return  res.redirect("/listings");
    }

    let originalImageUrl = listing.image.url.replace("/upload", "/upload/w_250");

    res.render("listings/edit.ejs", { listing, originalImageUrl });
}