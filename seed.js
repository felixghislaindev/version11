var mongoose =require("mongoose"), campsites =require("./models/campground"),
Comment = require("./models/comment");

var Data = [
    { name:"california", 
    image:"https://static.pexels.com/photos/572938/pexels-photo-572938.jpeg",
    description: "Lorem ipsum is a pseudo-Latin text used in web design, typography, layout, and printing in place of English to emphasise design elements over content. It's also called placeholder (or filler) text. It's a convenient tool for mock-ups. It helps to outline the visual elements of a document or presentation, eg typography, font, or layout. Lorem ipsum is mostly a part of a Latin text by the classical author and philosopher Cicero. Its words and letters have been changed by addition or removal, so to deliberately render its content nonsensical; it's not genuine, correct, or comprehensible Latin anymore. "  },

    { name:"canada", 
    image:"https://static.pexels.com/photos/105813/pexels-photo-105813.jpeg",
    description: "Lorem ipsum is a pseudo-Latin text used in web design, typography, layout, and printing in place of English to emphasise design elements over content. It's also called placeholder (or filler) text. It's a convenient tool for mock-ups. It helps to outline the visual elements of a document or presentation, eg typography, font, or layout. Lorem ipsum is mostly a part of a Latin text by the classical author and philosopher Cicero. Its words and letters have been changed by addition or removal, so to deliberately render its content nonsensical; it's not genuine, correct, or comprehensible Latin anymore. "  },

    { name:"russia", 
    image:"https://static.pexels.com/photos/16717/pexels-photo.jpg",
    description: "Lorem ipsum is a pseudo-Latin text used in web design, typography, layout, and printing in place of English to emphasise design elements over content. It's also called placeholder (or filler) text. It's a convenient tool for mock-ups. It helps to outline the visual elements of a document or presentation, eg typography, font, or layout. Lorem ipsum is mostly a part of a Latin text by the classical author and philosopher Cicero. Its words and letters have been changed by addition or removal, so to deliberately render its content nonsensical; it's not genuine, correct, or comprehensible Latin anymore. "  }
]

function seedDB(){
    // remove all camgrounds
campsites.remove({} ,function(err){
//     if(err){
//         console.log(err);
//     }
//     console.log("all data have been removed");
// });

// // add test camp
// for(var i =0; i < Data.length; i++){
//    campsites.create(Data[i], function(err,campsites){
//        if(err){
//            console.log("could not create the data");
//        } else{
//            console.log("data has been added");
//            //create comment
//            Comment.create({
//                text:"Beatiful place you need to visit",
//                author:"Felix"
//            },
//         function(err,comment){
//             if(err){
//                 console.log("no comment have been added");
//             } else{
//                 campsites.comments.push(comment);
//                 campsites.save();
//                 console.log("your comment have been added");
//             }
//         })
//        }
//    }); 
// }

})
};
module.exports = seedDB;