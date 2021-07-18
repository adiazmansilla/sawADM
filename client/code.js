async function getEntities(req) {
    let myRequest = new Request(`/api/entities/${req}`);
    const response = await fetch(myRequest);
    return await response.json();
}

function fillEntities(req) {
   
    getEntities(req).then(data => {
        const ulLabels = document.getElementById("claims");
        
        for(let attributename in data.entities[req]){
            document.getElementById('country-code').innerHTML=req;
            //document.getElementById('ca-winner').innerHTML=req;

            //Obtiene el nombre del pais
            if(attributename === 'labels'){
                const labelsArray =  data.entities[req][attributename]
                for(let label in labelsArray){
                    if(label === 'es'){
                        const countryName = labelsArray[label]['value'];
                        document.getElementById('country-name').innerHTML=countryName;
                        console.log(countryName);
                    }
                }
            }

            //Obtiene listado de anotaciones
            if (attributename === 'claims'){
                const claimsArray =  data.entities[req][attributename];
                for(let claim in claimsArray){

                    if(claim==='P1346'){
                        console.log(JSON.stringify(claim));
                       // document.getElementById('country-name').innerHTML=claim[mainsnak][datavalue][id];
                    }

                    const liLabel = document.createElement("tr");
                    const textLabel = document.createTextNode(claim);
                    liLabel.appendChild(textLabel);
                    ulLabels.appendChild(liLabel);
                }
            }
        }
    })
}

function pass(ent, country, year){
    console.log(ent, country, year);
    sessionStorage.setItem("entityCode", ent);
    sessionStorage.setItem("entityCountry", country);
    sessionStorage.setItem("entityYear", year);
}

function loadImage(){
    var cdg = sessionStorage.getItem("entityCode");
    var cdgImg = '/images/'+cdg+'.jpg';
    $("img#Myimg").attr('src',cdgImg);
}