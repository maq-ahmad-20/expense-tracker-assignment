const form = document.getElementById('form');
const userdetails = document.getElementById("user-details");

function inputDetails(arr){
    return {
    "userExp" : arr[0],
    "userDesc" : arr[1],
    "userItem" : arr[2],

 
 }
}

// adding Form details to lical storage and creating user entered details on screen
form.addEventListener('submit' ,(e)=>{

    e.preventDefault();
    console.log(e);
    let inputArr =[];
    let inputs = form.getElementsByTagName('input');
    let options = document.getElementById('items');
    let text = "Your Expense Details : ";
    for(let i=0;i<inputs.length;i++){
        inputArr[i] = inputs[i].value;
          text = text +  inputs[i].value + " - ";
     }
     inputArr.push(options.value);
     text = text +  options.value + " ==> ";
     
     let inputObj = JSON.stringify(inputDetails(inputArr));
     localStorage.setItem(inputArr[0] , inputObj);

     // console.log(inputObj)
     // console.log(text);

      // To add details 
      let div = document.createElement('div');
      div.className = 'entered-details';
     
     
     let delButton = document.createElement('button');
     delButton.id = inputArr[0];
     delButton.appendChild(document.createTextNode("Delete Expense"));
     let editButton = document.createElement('button');
     editButton.setAttribute("editButtonId" , inputArr[0]);
     editButton.appendChild(document.createTextNode("Edit Expense"));


     div.appendChild(document.createElement('p').appendChild(document.createTextNode(text)));
     div.appendChild(delButton);
     div.appendChild(editButton);
     userdetails.appendChild(div);

     
     document.getElementById('number').setAttribute("value" ,"");
     document.getElementById('desc').setAttribute("value","");
     document.getElementById('items').setAttribute("value" , "");
     form.reset();
});


// Delete and Edit Functionality
userdetails.addEventListener('click' , (e)=>{
     e.preventDefault();
     //  console.log(e.target);
     if(e.target.textContent === 'Delete Expense'){
        let buttonId = e.target.id;
        let delButtonId = document.getElementById(buttonId);
        localStorage.removeItem(buttonId);
        delButtonId.parentElement.remove();

        
     }else if(e.target.textContent === 'Edit Expense'){
          let editButton = e.target.getAttribute("editButtonId");
          
          let storedObject = JSON.parse(localStorage.getItem(editButton));
          // console.log(storedObject);
          localStorage.removeItem(editButton);
          document.getElementById(editButton).parentElement.remove();

          
       document.getElementById('number').setAttribute("value" ,storedObject.userExp);
       document.getElementById('desc').setAttribute("value",storedObject.userDesc);
       document.getElementById('items').setAttribute("value",storedObject.userItem);
         
     }


});
