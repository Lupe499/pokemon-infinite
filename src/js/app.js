var offset = 0;
var count = 0;

function getNames(offset) {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offset}`)
        .then(res => res.json())
        .then(function(data){
            addNames(data)
        });
}


    function addNames(data){
        let templateCard = document.querySelector("#template");
        data.results.forEach(function(result){
            let array = result.url.split("/");
            //console.log(array);
            let id = array[array.length - 2];

            let clone = templateCard.content.cloneNode(true);
            let pokeName = clone.querySelector(".pokeName");
            count = data.count;

            pokeName.innerText = result.name;
            pokeName.setAttribute("data-name", result.name);
            clone.querySelector(".pokeName").href = `/character-sheet.html?id=${id}`;
            document.querySelector(".pokeList").appendChild(clone);
        });
        var lastChild = document.querySelector(".pokeList li:last-child");

        observer.observe(lastChild);
    }


var observer = new IntersectionObserver(function(entries) {
    if (entries[0].intersectionRatio <= 0) return;

        observer.unobserve(entries[0].target);
        
        offset = offset + 10;
        if (offset > count) return;
        getNames(offset);
}, {
    threshold: 1
});


getNames(offset);