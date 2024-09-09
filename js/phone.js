const loadPhone = async (searchText = 'iphone', isShowAll) => {                       //searchText is a parameter name,it should be any name
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);        //into dynamic string above parameter is given.
    const data = await res.json();
    const phones = data.data;
    displayPhone(phones, isShowAll)
    // console.log(phones);

}

const displayPhone = (phones, isShowAll) => {
    // console.log(phones);
    // 1. where to add the item
    const phoneContainer = document.getElementById('phone-container');

    // to clear container before a new search----------------------------
    phoneContainer.textContent = '';

    // finding show all container---------------------
    const showAllContainer = document.getElementById('show-all-button');

    // Display show all button if there are more than 12 phones 
    if(phones.length > 12 && !isShowAll){
        showAllContainer.classList.remove('hidden');
    }
    else{
        showAllContainer.classList.add('hidden');
    }

    // Show only first 12 phones if (not show all---------------)
    if(!isShowAll){
        phones = phones.slice(0,12);
    }

    phones.forEach(phone => {
        // console.log(phone)
        // create element ,what we want to create
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-slate-200`;

        // set inner HTML
        phoneCard.innerHTML = `
            <figure class = "mt-4 rounded-sm">
                    <img
                        src="${phone.image}" />
                    </figure>
                    <div class="card-body">
                      <h2 class="card-title">${phone.phone_name}</h2>
                      <p>This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                      <div class="card-actions justify-start">
                        <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary ">Show Details</button>
                      </div>
                    </div>
        `
        // append child---------------
        phoneContainer.appendChild(phoneCard);
        
    });
    toggleSpinner(false);               //Toggle spinner remove from here. where loading will be end.
}

// Handle search button

const handleSearch =(isShowAll) => {
    toggleSpinner(true);                            //Toggle is called from here with true parameter. it is inside of search button function
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // console.log(searchText)
    loadPhone(searchText, isShowAll);

}

// Loading or spinning toggle
const toggleSpinner = (isLoading) =>{
    const loadingSpinner = document.getElementById('toggle-spinner');
    if(isLoading){
        loadingSpinner.classList.remove('hidden');
    }
    else{
        loadingSpinner.classList.add('hidden');
    }
    
}
// Handle Show Details
const handleShowDetails = async (id) =>{
    // console.log('clicked', id)
    // // Load single phone data------------
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    // console.log(data);
    const phone = data.data;
    showPhoneDetails(phone);
}

// show the modal
const showPhoneDetails = (phone) => {
    console.log(phone);
    const showDetailsContainer = document.getElementById('show-details-container');
    showDetailsContainer.innerHTML = `
            <div class="bg-sky-200 flex justify-center py-4 px-10 rounded-md">
                <img  class="bg-transparent" src="${phone.image}" alt="">
            </div>
            <h3 class="text-2xl font-medium my-5">${phone.name}</h3>
            <p class="my-2 leading-tight">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
            <p><span class="font-bold">Storage:</span>${phone?.mainFeatures?.storage}</p>
            <p><span class="font-bold">Display Size:</span>${phone?.mainFeatures?.displaySize}</p>
            <p><span class="font-bold">Chipset:</span>${phone?.mainFeatures?.chipSet}</p>
            <p><span class="font-bold">Memory :</span>${phone?.mainFeatures?.memory}</p>
            <p><span class="font-bold">Slug :</span>${phone?.mainFeatures?.slug}</p>
            <p><span class="font-bold">Release data :</span>${phone?.mainFeatures?.releaseDate}</p>
            <p><span class="font-bold">Brand :</span>${phone?.brand}</p>
            <p><span class="font-bold">GPS :</span>${phone?.others?.GPS || 'No GPS Available'} </p>
            <p><span class="font-bold">GPS :</span>${phone.others?.GPS ? phone.others.GPS : 'No GPS Available'} </p>
    `

    show_details_modal.showModal();
}


// Not proper way to do this just for js learning
// handle Show All
const handleShowAll = () =>{
    handleSearch(true);
}


loadPhone();