
///////////////////////////////////////////// Built in class ///////////////////////////////////////////////
import { Product } from "./products.js";

// generate an object- To send A REQUEST to the server-----------------------------------------------------
const xhr = new XMLHttpRequest();
console.log(xhr) //show all the object methods



////////////////////////////////////////// RESPONSE ///////////////////////////////////////////////////////
// xhr.response;  => undefined
// We don't get a response immediately, usually it takes some times milisec to secs.
xhr.addEventListener('load', ()=>{             
  console.log(xhr.response);
  
});
/// why response is before sending the request? because we need to setup an event listener before trigering it
// like when we setup addevenlisteners and then click on buttons



/////////////////////////////////////////////////// Sending Request /////////////////////////////////////////
xhr.open('GET', 'https://supersimplebackend.dev/');  //accepts to 2 messages  


// if we get a wrong url we will get an error {"errorMessage":"Error: this URL path is not supported."}
// 1. Error Status Code starts with 4 (404 for example) ==> our problem.
// 2. Error Status Code starts with 5 (500 for example) ==> backend problem.
// 3. Error Status Code starts with 2  ==> SUCCESSFULL


// Can we know all the possible URL we can get? no, except if a documentation is provided by the URL
// The list of all the supported URLs is called the backend A.P.I (Application Programing Interface)
//  ---- Interface is how we interac with something


// 1--- type of http request (GET, POST, PUT, DELETE).
// 2--- Where to send the http message --- URL( uniform ressource locator (address)) https://amazon.com for example

//Now we send the request
xhr.send();  //-- RESPONSE From the server is readable on the navigator






