const express = require("express")
const path = require("path");
const rootRouter = require("./Routes/RouteIndex")
const cors = require("cors")
const app = express();

app.use(cors())
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use("/uploads", express.static(path.join(__dirname, "imageUploads"))); //added
app.use("/api/v1", rootRouter);


app.listen(3000, () => {
    console.log("Server is running on port 3000");
});