const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const shortid = require("shortid");

const app = express();
app.use(bodyParser.json());
//mongoose.connect("mongodb://localhost:27017/mongodb2020"
mongoose.connect(
  "mongodb+srv://myexpress:expresswebapp@cluster0.ux48h.mongodb.net/myexpress?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  }
);

//Product Modal or table
const Product = mongoose.model(
  "products",
  new mongoose.Schema({
    id: {
      type: String,
      default: shortid.generate,
    },
    title: String,
    description: String,
    image: String,
    price: Number,
    availableSizes: [String],
  })
);

//Products End point api
app.get("/api/products", async (req, res) => {
  const products = await Product.find({});
  res.send(products);
});

//Create a new product
app.post("/api/products", async (req, res) => {
  const newProduct = new Product(req.body);
  const savedProduct = await newProduct.save();
  res.send(savedProduct);
});

//Delete product
app.delete("/api/products/:id", async (req, res) => {
  const deletedProduct = await Product.findByIdAndDelete(req.params.id);
  res.send(deletedProduct);
});

//Order  Modal or table
const Order = mongoose.model(
  "order",
  new mongoose.Schema(
    {
      id: {
        type: String,
        default: shortid.generate,
      },
      name: String,
      email: String,
      address: String,
      total: Number,
      cartItems: [
        {
          id: String,
          title: String,
          price: Number,
          count: Number,
        },
      ],
    },
    {
      timestamps: true,
    }
  )
);

//Order POST API
app.post("/api/orders", async (req, res) => {
  if (
    !req.body.name ||
    !req.body.email ||
    !req.body.address ||
    !req.body.total ||
    !req.body.cartItems
  ) {
    return res.send({ message: "All fields are required!!" });
  }

  //Save the order into the database
  const order = await Order(req.body).save();
  res.send(order); //Now, send the order
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("Serve started at http://localhost:5000"));
