const loadAiHub = async () =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/ai/tools`);
    const data = await res.json();
    const ais =data.data.tools;
    console.log(ais);
    displayAiHub(ais);
    // console.log(data.data.tools[0].features);
}

const displayAiHub = (ais) =>{
    const cardContainer = document.getElementById('ai-card-container');
    ais.forEach(ai => {
        const aiCard = document.createElement('div');
        aiCard.classList = `card bg-base-100 shadow-xl`
        aiCard.innerHTML = `
             <figure>
                <img
                    src="${ais.image}" />
                </figure>
                <div class="card-body">
                    <h2 class="card-title">Shoes!</h2>
                    <p>If a dog chews shoes whose shoes does he choose?</p>
                    <div class="card-actions justify-end">
                        <button class="btn btn-primary">Buy Now</button>
                    </div>
                </div>
        
        `;
        cardContainer.appendChild(aiCard);
        
    });

}
loadAiHub();