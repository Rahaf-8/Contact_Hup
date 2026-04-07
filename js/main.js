var contactNameInput = document.getElementById("fullName");
var contactNumberInput = document.getElementById("phoneNumber");
var contactEmailInput = document.getElementById("emailAddress");
var contactAddressInput = document.getElementById("Address");
var contactGroupInput = document.getElementById("Group");
var contactNotesInput = document.getElementById("Notes");
var contactImageInput = document.getElementById("change-photo");
var contactFavInput = document.getElementById("fav");
var contactEmargInput = document.getElementById("emarg");
var nameRegex = /^[A-Za-z\s]{3,20}$/;
var phoneRegex = /^01[0125][0-9]{8}$/;
var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
var conactList = [];
var favList = [];
var emarList = [];

if (localStorage.getItem("contactList")) {
  conactList = JSON.parse(localStorage.getItem("contactList"));
  addFav();
  addEmar();
  displayContact();
  displayEmarg();
  displayFavourite();
  checkItems();
  //   console.log(conactList);
  //   console.log(favList);
  //   console.log(emarList);
}

function checkItems() {
  if (conactList.length == 0) {
    document.getElementById("contacts").innerHTML = `
      <div class="d-flex justify-content-center align-items-center mt-5">
  <div class="text-center">
    <i class="fa-regular fa-address-book fs-1"></i>
    <span class="d-block mt-2">No contacts found</span>
    <p>Click "Add Contact" to get started</p>
  </div>
</div> 
    `;
  }
  if (favList.length == 0) {
    document.getElementById("favorite").innerHTML =
      ` <div class="d-flex justify-content-center align-items-center">
  <div class="text-center">
   
    <span class="d-block mt-2">No favourite contacts yet</span>
  
  </div>
</div> `;
  }
  if (emarList.length == 0) {
    document.getElementById("emarj").innerHTML =
      ` <div class="d-flex justify-content-center align-items-center">
  <div class="text-center">
   
    <span class="d-block mt-2">No Emargency contacts yet</span>
  
  </div>
</div> `;
  }
}
function addContact() {

  let user = {
    userName: contactNameInput.value,
    userNumber: contactNumberInput.value,
    userEmail: contactEmailInput.value,
    userAdress: contactAddressInput.value,
    userGroup: contactGroupInput.value,
    userNotes: contactNotesInput.value,
    userImage: contactImageInput.value,
    userFav: contactFavInput.checked,
    userEmar: contactEmargInput.checked,
  };

  conactList.push(user);
  favList = [];
  emarList = [];

  addFav();
  addEmar();

  localStorage.setItem("contactList", JSON.stringify(conactList));
  displayContact();
  displayFavourite();
  displayEmarg();
  checkItems();
  Swal.fire({
  icon: "success",
  title: "Added Successfully",
  text:"contact have been added successfully",
  showConfirmButton: false,
  timer: 1500
});
}

function displayContact() {
  let cartona = ``;
  for (let i = 0; i < conactList.length; i++) {
    cartona += `
     <div class="contact-card col-12 col-sm-6 p-2">
                            <div class="inner p-3 shadow rounded-4">
                                <div>
                                    <div class="  d-flex gap-2 align-items-start  ">
                                        <img src="../images/Profile_avatar_placeholder_large.png" alt="contact image"
                                            class="rounded-4 col-12 " style="width:12%">
                                        <div>
                                            <h3 class="fs-5">${conactList[i].userName}</h3>
                                            <div class="d-flex align-items-center gap-2">
                                                <div class="bg-primary bg-opacity-10 py-1 px-2 fit-content rounded-3">
                                                    <i class="fa-solid fa-phone text-primary small"></i>
                                                </div>
                                                <span class="text-secondary fw-medium">${conactList[i].userNumber}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="pt-2 d-flex align-items-center gap-2">
                                        <div class="bg-main p-1 px-2 rounded-2 fit-content">
                                            <i class="fa-solid fa-envelope text-purple small"></i>
                                        </div>
                                        <span class="text-secondary">${conactList[i].userEmail}</span>
                                    </div>
                                    <div class="pt-2 d-flex align-items-center gap-2">
                                        <div class="bg-success bg-opacity-10 p-1 px-2 rounded-2 fit-content">
                                            <i class="fa-solid fa-location-dot text-success small"></i>
                                        </div>
                                        <span class="text-secondary">${conactList[i].userAdress}</span>
                                    </div>
                                    <div class="py-3">
                                        <div class="bg-main p-1 px-2 rounded-2 fit-content">
                                            <span class="small text-purple">${conactList[i].userGroup}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="border-top border-1 border-secondary border-opacity-10 pt-3">
                                    <div class="d-flex align-items-center justify-content-between">
                                        <div class="d-flex gap-3">
                                            <div class="bg-success bg-opacity-10 py-1 px-2 rounded-2 fit-content">
                                                <i class="fa-solid fa-phone text-success small"></i>
                                            </div>
                                            <div class="bg-main bg-opacity-10 py-1 px-2 rounded-2 fit-content">
                                                <i class="fa-solid fa-envelope text-purple small"></i>
                                            </div>
                                        </div>
                                        <div class="d-flex gap-3 align-items-center">
                                        ${
                                          conactList[i].userFav
                                            ? ` <button onclick="toggleFavourite(${i})" class="border-0 bg-transparent"><i
                                            style="color:#FFC107"    class="fa-solid fa-star "></i></button>`
                                            : `<button onclick="toggleFavourite(${i})" class="border-0 bg-transparent"><i
                                              class="fa-regular fa-star "></i></button>`
                                        }
                                           
                                            ${
                                              conactList[i].userEmar
                                                ? `<button onclick="toggleEmargancy(${i})" class="border-0 bg-transparent"><i
                                                   style="color:#DC3545" class="fa-solid  fa-heart-pulse"></i></button>`
                                                : ` <button onclick="toggleEmargancy(${i})" class="border-0 bg-transparent"><i
                                                    class="fa-regular fa-heart"></i></button>`
                                            }
                                            <button onclick="updateValues(${i})" data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop" class="border-0 bg-transparent"><i
                                                    class="fa-solid fa-pen text-secondary"></i></button>
                                            <button onclick="deleteContact(${i})" class="border-0 bg-transparent"><i
                                                    class="fa-solid fa-trash text-secondary"></i></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
    `;
  }

  document.getElementById("contacts").innerHTML = cartona;
  document.getElementById("total").innerHTML = conactList.length;
}

function addFav() {
  favList = [];
  for (let i = 0; i < conactList.length; i++) {
    if (conactList[i].userFav) {
      favList.push(conactList[i]);
    }
  }
}
function displayFavourite() {
  let cartona = ``;
  for (let i = 0; i < favList.length; i++) {
    cartona += `
      <div
                                        class="contact p-2 d-flex align-items-center justify-content-between gap-2 rounded-3">
                                        <img src="../images/11539820.png" alt="favorite image" class="rounded-2">
                                        <div class="contact-info me-auto">
                                            <h6 class="small fw-medium m-0">${favList[i].userName}</h6>
                                            <p class="text-secondary m-0">${favList[i].userNumber}</p>
                                        </div>
                                        <div
                                            class="call-bg bg-success bg-opacity-25 rounded-2 d-flex align-items-center justify-content-center">
                                            <i class="fa-solid fa-phone text-success"></i>
                                        </div>
                                    </div>`;
  }
  document.getElementById("favorite").innerHTML = cartona;
  document.getElementById("favorite-count").innerHTML = favList.length;
}
function addEmar() {
  emarList = [];
  for (let i = 0; i < conactList.length; i++) {
    if (conactList[i].userEmar) {
      emarList.push(conactList[i]);
    }
  }
}
function displayEmarg() {
  let cartona = ``;
  for (let i = 0; i < emarList.length; i++) {
    cartona += `
      <div
                                        class="contact p-2 d-flex align-items-center justify-content-between gap-2 rounded-3">
                                        <img src="../images/11539820.png" alt="favorite image" class="rounded-2">
                                        <div class="contact-info me-auto">
                                            <h6 class="small fw-medium m-0">${emarList[i].userName}</h6>
                                            <p class="text-secondary m-0">${emarList[i].userNumber}</p>
                                        </div>
                                        <div
                                            class="call-bg bg-success bg-opacity-25 rounded-2 d-flex align-items-center justify-content-center">
                                            <i class="fa-solid fa-phone text-success"></i>
                                        </div>
                                    </div>`;
  }
  document.getElementById("emarj").innerHTML = cartona;
  document.getElementById("Emar-count").innerHTML = emarList.length;
}
function toggleFavourite(index) {
  conactList[index].userFav = !conactList[index].userFav;
  localStorage.setItem("contactList", JSON.stringify(conactList));
  displayContact();
  addFav();
  displayFavourite();
  checkItems();
}

function toggleEmargancy(index) {
  conactList[index].userEmar = !conactList[index].userEmar;
  localStorage.setItem("contactList", JSON.stringify(conactList));
  displayContact();
  addEmar();
  displayEmarg();
  checkItems();
}

function deleteContact(index) {
  Swal.fire({
    title: "Delete Contact?",
    text: "Are you sure you want to delete Hiroko Fisher? This action cannot be undone.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "Cancel",
  }).then((result) => {
    if (result.isConfirmed) {
      conactList.splice(index, 1);
      localStorage.setItem("contactList", JSON.stringify(conactList));
      displayContact();
      addFav();
      displayFavourite();
      addEmar();
      displayEmarg();
      checkItems();
      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Your contact has been deleted.",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  });
}
let currentIndex;
function updateValues(index) {
  currentIndex = index;
  document.getElementById("addBtn").classList.replace("d-block", "d-none");
  document.getElementById("UpdateBtn").classList.replace("d-none", "d-block");

  contactNameInput.value = conactList[index].userName;
  contactNumberInput.value = conactList[index].userNumber;
  contactEmailInput.value = conactList[index].userEmail;
  contactAddressInput.value = conactList[index].userAdress;
  contactGroupInput.value = conactList[index].userGroup;
  contactNotesInput.value = conactList[index].userNotes;
  contactFavInput.checked = conactList[index].userFav;
  contactEmargInput.checked = conactList[index].userEmar;
}

function updateContact() {
  let user = {
    userName: contactNameInput.value,
    userNumber: contactNumberInput.value,
    userEmail: contactEmailInput.value,
    userAdress: contactAddressInput.value,
    userGroup: contactGroupInput.value,
    userNotes: contactNotesInput.value,
    userImage: contactImageInput.value,
    userFav: contactFavInput.checked,
    userEmar: contactEmargInput.checked,
  };
  conactList.splice(currentIndex, 1, user);
  localStorage.setItem("contactList", JSON.stringify(conactList));
  displayContact();
  addFav();
  displayFavourite();
  addEmar();
  displayEmarg();
  checkItems();
  Swal.fire({
  icon: "success",
  title: "Updated Successfully",
   text:"contact have been updated successfully",
  showConfirmButton: false,
  timer: 1500
});
}

document
  .getElementById("staticBackdrop")
  .addEventListener("hidden.bs.modal", function () {
    document.getElementById("addBtn").classList.replace("d-none", "d-block");
    document.getElementById("UpdateBtn").classList.replace("d-block", "d-none");

    clear();
  });
function clear() {
  contactNameInput.value = null;
  contactNumberInput.value = null;
  contactEmailInput.value = null;
  contactAddressInput.value = null;
  contactGroupInput.value = null;
  contactNotesInput.value = null;
  contactFavInput.checked = null;
  contactEmargInput.checked = null;
}
function searchContact(searchInputValue){
  var searchInput = searchInputValue.value;
var cartona=''
  for (let i = 0; i < conactList.length; i++) {
  if(conactList[i].userName.toLowerCase().includes(searchInput.toLowerCase()) || conactList[i].userEmail.toLowerCase().includes(searchInput.toLowerCase()) || conactList[i].userNumber.toLowerCase().includes(searchInput.toLowerCase()) )
      cartona += `
     <div class="contact-card col-12 col-sm-6 p-2">
                            <div class="inner p-3 shadow rounded-4">
                                <div>
                                    <div class="  d-flex gap-2 align-items-start  ">
                                        <img src="../images/Profile_avatar_placeholder_large.png" alt="contact image"
                                            class="rounded-4 col-12 " style="width:12%">
                                        <div>
                                            <h3 class="fs-5">${conactList[i].userName}</h3>
                                            <div class="d-flex align-items-center gap-2">
                                                <div class="bg-primary bg-opacity-10 py-1 px-2 fit-content rounded-3">
                                                    <i class="fa-solid fa-phone text-primary small"></i>
                                                </div>
                                                <span class="text-secondary fw-medium">${conactList[i].userNumber}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="pt-2 d-flex align-items-center gap-2">
                                        <div class="bg-main p-1 px-2 rounded-2 fit-content">
                                            <i class="fa-solid fa-envelope text-purple small"></i>
                                        </div>
                                        <span class="text-secondary">${conactList[i].userEmail}</span>
                                    </div>
                                    <div class="pt-2 d-flex align-items-center gap-2">
                                        <div class="bg-success bg-opacity-10 p-1 px-2 rounded-2 fit-content">
                                            <i class="fa-solid fa-location-dot text-success small"></i>
                                        </div>
                                        <span class="text-secondary">${conactList[i].userNotes}</span>
                                    </div>
                                    <div class="py-3">
                                        <div class="bg-main p-1 px-2 rounded-2 fit-content">
                                            <span class="small text-purple">${conactList[i].userGroup}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="border-top border-1 border-secondary border-opacity-10 pt-3">
                                    <div class="d-flex align-items-center justify-content-between">
                                        <div class="d-flex gap-3">
                                            <div class="bg-success bg-opacity-10 py-1 px-2 rounded-2 fit-content">
                                                <i class="fa-solid fa-phone text-success small"></i>
                                            </div>
                                            <div class="bg-main bg-opacity-10 py-1 px-2 rounded-2 fit-content">
                                                <i class="fa-solid fa-envelope text-purple small"></i>
                                            </div>
                                        </div>
                                        <div class="d-flex gap-3 align-items-center">
                                        ${
                                          conactList[i].userFav
                                            ? ` <button onclick="toggleFavourite(${i})" class="border-0 bg-transparent"><i
                                            style="color:#FFC107"    class="fa-solid fa-star "></i></button>`
                                            : `<button onclick="toggleFavourite(${i})" class="border-0 bg-transparent"><i
                                              class="fa-regular fa-star "></i></button>`
                                        }
                                           
                                            ${
                                              conactList[i].userEmar
                                                ? `<button onclick="toggleEmargancy(${i})" class="border-0 bg-transparent"><i
                                                   style="color:#DC3545" class="fa-solid  fa-heart-pulse"></i></button>`
                                                : ` <button onclick="toggleEmargancy(${i})" class="border-0 bg-transparent"><i
                                                    class="fa-regular fa-heart"></i></button>`
                                            }
                                            <button onclick="updateValues(${i})" data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop" class="border-0 bg-transparent"><i
                                                    class="fa-solid fa-pen text-secondary"></i></button>
                                            <button onclick="deleteContact(${i})" class="border-0 bg-transparent"><i
                                                    class="fa-solid fa-trash text-secondary"></i></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
    `;
  }

  document.getElementById("contacts").innerHTML = cartona;
  }


function validateInput(element, regex) {

  let validIcon = element.parentElement.querySelector(".valid-icon");
  let invalidIcon = element.parentElement.querySelector(".invalid-icon");
if (element.value == "") {
  element.classList.remove("is-valid", "is-invalid");
  validIcon.classList.add("d-none");
  invalidIcon.classList.add("d-none");
  return true;
}

  if (regex.test(element.value)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");

    validIcon.classList.remove("d-none");
    invalidIcon.classList.add("d-none");

    return true;
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");

    validIcon.classList.add("d-none");
    invalidIcon.classList.remove("d-none");

    return false;
  }
}