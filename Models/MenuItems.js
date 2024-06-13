     const mongoose=require('mongoose');
     const MenuItemsSchema= new mongoose.Schema({
         name:{
          type:String,
          required:true
         },
         price:{
          type:Number,
          default:0,
         },
         spicy:{
          type:String,
          required:true,
         },
         is_drink:{
          type:Boolean,
          default:false,
         },
         total_sales:{
          type:Number,
          default:0,
         },
     })

     const MenuItems= mongoose.model('MenuItems',MenuItemsSchema);
     module.exports= MenuItems;