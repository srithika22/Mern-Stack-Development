// function name() {
//     console.log("DOM Practice");
// }
// name();

// let b = function() {
//     console.log("This is a function expression");
// }
// b();

// let c = () => {
//     console.log("This is an arrow function");
// }
// c();
// var Persons = ["John", "Jane", "Doe"];
// let v = Persons.map((element) => {
//     console.log(element);
// });


// console.log("hi");
// let a=null;
// console.log(a);
// let first_name="mahesh";

// console.log(`hi this is ${first_name}`)
// function name(abc="hi all", def){
//     // console.log("hi, everyone");
//     console.log(abc, def);
// };
// name("vignan");;

// let b = function(){
//     console.log("anonymous function")
// }

// b();

// let arrow = ()=> {
//   console.log("arrow function")  
// }

// arrow();

// var persons = ['Chandra', 'Varun', 'Nrupul', 'Prateek', 'Aman'];

// function vaccinate(person) { 
//     console.log(person + 'has been vaccinated.')
// }

// for (var i = 0; i < persons.length; i++) {  
// vaccinate(persons[i]);  
// }

// let result = persons.map((element, i)=>{
// console.log(element, i);
// // return element;
// });

// console.log(result);

//filters
// let numbers = [1,2,3,4,5,6,7,8,9,10];

// let output = numbers.filter((element)=>{

//     if(element%2 === 0) {
//         return element;
//     }
// });
// console.log(output)


//forEach

// let output = numbers.forEach((element)=>{
//     return element %2 ==0;
// });
// console.log(output)



//sort 

// let array = [898,6,-1,34,4,0, 12];

// let sortedArray = array.sort((a,b)=>{

//     return b-a;
// });
// console.log(sortedArray)



// console.log(document.title);
// console.log(document.URL);
// console.log(document.body); 
// console.log(document.head);
// console.log(document.getElementsByTagName("p"));
// console.log(document.getElementById("container"));
// let text = document.querySelector("#container").innerHTML;
// text.innerHtml = "Updated Content";
// console.log(text);
// console.log(document.querySelectorAll(".container"));



function catchValue(){
    let username = document.querySelector("input");
   console.log( username.value);
}

function getGender(){
    let genderSelect = document.getElementById("getGender");
    let selectedGender = genderSelect.value;
    console.log("Selected gender:", selectedGender);
    
}