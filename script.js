var courseName = document.getElementById("courseName");
var courseCategory = document.getElementById("courseCategory");
var coursePrice = document.getElementById("coursePrice");
var courseDescription = document.getElementById("courseDescription");
var courseCapacity = document.getElementById("courseCapacity");
var addBtn = document.getElementById("click");
var data = document.getElementById("data");
var search = document.getElementById("search");
var  currentIndex='';
var courses;

if(JSON.parse(localStorage.getItem("courses"))==null){
  courses=[];
} 
else{
  courses=JSON.parse(localStorage.getItem("courses"));
}
displayData();
addBtn.onclick = function(e){
    e.preventDefault();
    if(addBtn.value =='Add Course'){
            addCourse();}
   else if(addBtn.value =='Update Course'){
      updateCourse();

    }
    clearInputs();
    displayData();  

  
    
}


function  addCourse(){
    var course = {
        courseName: courseName.value,
        courseCategory: courseCategory.value,
        coursePrice: coursePrice.value,
        courseDescription: courseDescription.value,
        courseCapacity: courseCapacity.value,
    }

    courses.push(course);
    localStorage.setItem("courses",JSON.stringify(courses));
 
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'course added successfully',
        showConfirmButton: false,
        timer: 1500
  })



}
function clearInputs(){
    courseName.value = ''; 
    courseCategory.value = '';
    coursePrice.value = '';
    courseDescription.value = '';
    courseCapacity.value = '';
}

function displayData(){
    var result='';
    for( var i=0;i<courses.length;i++){
        result+=`
         <tr>
            <td>${i+1}</td>
            <td>${courses[i].courseName}</td>
            <td>${courses[i].courseCategory}</td>
            <td>${courses[i].coursePrice}</td>
            <td>${courses[i].courseDescription}</td>
            <td>${courses[i].courseCapacity}</td>
            <td><button class="btn btn-danger" onclick="deleteCourse(${i})">delete</button></td>
            <td><button class="btn btn-info " onclick="editCourse(${i})">update</button></td>
        </tr>`
    }
     data.innerHTML=result;
 

}
function deleteCourse(index){
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
            courses.splice(index,1);
            localStorage.setItem("courses",JSON.stringify(courses));
            displayData();
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })
   
}

deleteBtn.onclick=function(){
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
            courses=[];
            localStorage.setItem("courses",JSON.stringify(courses));
            data.innerHTML='';
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })
    
}
search.onkeyup=function(){
    var result='';
   
    for( var i=0;i<courses.length;i++){
        if(courses[i].courseName.toLowerCase().includes(search.value.toLowerCase())){
        result+=`
         <tr>
            <td>${i+1}</td>
            <td>${courses[i].courseName}</td>
            <td>${courses[i].courseCategory}</td>
            <td>${courses[i].coursePrice}</td>
            <td>${courses[i].courseDescription}</td>
            <td>${courses[i].courseCapacity}</td>
            <td><button class="btn btn-danger" onclick="deleteCourse(${i})">delete</button></td>
            <td> <button class="btn btn-info "  onclick="editCourse(${i})>update</button></td>
        </tr>`
        }
    }
     data.innerHTML=result;
 

}

function editCourse(index){

  courseName.value =courses[index].courseName; 
  courseCategory.value = courses[index].courseCategory;
  coursePrice.value = courses[index].coursePrice;
  courseDescription.value = courses[index].courseDescription;
  courseCapacity.value = courses[index].courseCapacity;
  addBtn.value='Update Course';
  currentIndex=index;



 }

 function  updateCourse(){
  var course = {
      courseName: courseName.value,
      courseCategory: courseCategory.value,
      coursePrice: coursePrice.value,
      courseDescription: courseDescription.value,
      courseCapacity: courseCapacity.value,
  }

  var oldName = courses[currentIndex].courseName;
  courses[currentIndex] = course;
  localStorage.setItem("courses",JSON.stringify(courses));
  addBtn.value='Add Course';
  Swal.fire({
      position: 'center',
      icon: 'success',
      title: `${oldName} updated successfully`,
      showConfirmButton: false,
      timer: 1500
})



}
//validation
/*
Course Name
first letter capital
name 3-10
no number
*/
courseName.onkeyup=function(){
 var pattern= /^[A-Z][a-z]{2,10}$/;
 if(pattern.test(courseName.value)){
  courseName.classList.add("is-valid");
  courseName.classList.remove("is-invalid");
  addBtn.removeAttribute("disabled");
 }else{
  courseName.classList.add("is-invalid");
  courseName.classList.remove("is-valid");
  addBtn.setAttribute("disabled","disabled");
 }

}

/*
Course Category
first letter capital
name 3-20
no number
accept spaces
*/
courseCategory.onkeyup=function(){
  var pattern= /^[A-Z][a-z\s]{2,20}$/;
  if(pattern.test(courseCategory.value)){
    courseCategory.classList.add("is-valid");
    courseCategory.classList.remove("is-invalid");
   addBtn.removeAttribute("disabled");
  }else{
    courseCategory.classList.add("is-invalid");
    courseCategory.classList.remove("is-valid");
   addBtn.setAttribute("disabled","disabled");
  }
 
 }
 /*
Course Price
numeric 
4digit

*/
coursePrice.onkeyup=function(){
  var pattern= /^[0-9]{1,4}$/;
  if(pattern.test(coursePrice.value)){
    coursePrice.classList.add("is-valid");
    coursePrice.classList.remove("is-invalid");
   addBtn.removeAttribute("disabled");
  }else{
    coursePrice.classList.add("is-invalid");
    coursePrice.classList.remove("is-valid");
   addBtn.setAttribute("disabled","disabled");
  }
 
 }
 /*
courseDescription

1-60 letter
accept spaces
*/
courseDescription.onkeyup=function(){
  var pattern= /^[A-Za-z0-9\s]{1,60}$/;
  if(pattern.test(courseDescription.value)){
    courseDescription.classList.add("is-valid");
    courseDescription.classList.remove("is-invalid");
   addBtn.removeAttribute("disabled");
  }else{
    courseDescription.classList.add("is-invalid");
    courseDescription.classList.remove("is-valid");
   addBtn.setAttribute("disabled","disabled");
  }
 
 }
 /*
course Capacity
numeric 
3digit

*/
courseCapacity.onkeyup=function(){
  var pattern= /^[0-9]{1,3}$/;
  if(pattern.test(courseCapacity.value)){
    courseCapacity.classList.add("is-valid");
    courseCapacity.classList.remove("is-invalid");
   addBtn.removeAttribute("disabled");
  }else{
    courseCapacity.classList.add("is-invalid");
    courseCapacity.classList.remove("is-valid");
    addBtn.setAttribute("disabled","disabled");
  }
 
 }