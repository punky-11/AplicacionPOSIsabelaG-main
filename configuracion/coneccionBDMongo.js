const mongoose = require('mongoose');


const uri =`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@clusteradsi2498009.swn5znl.mongodb.net/${process.env.DB_NAMEBD}?retryWrites=true&w=majority`;
          
mongoose.connect(uri, { useNewUrlParser: true });
