import { VideoKlub } from "./VideoKlub.js";
import { Polica } from "./Polica.js";


async function app(){
    var response = await fetch("http://localhost:5240/VideoKlub/VratiSveVideoKlubove");
    var data = await response.json();

    data.forEach(async obj => {
       var klub = new VideoKlub(obj["id"], obj["nazivKluba"], obj["police"]);
        
       var lista = obj["police"];
       lista.forEach(p => {
        const pol = new Polica(p["id"], p["nazivPolice"], p["trenutniBrojDVD"], p["maxBrojDVD"]);
        klub.dodajPolice(pol);
    })

       klub.crtaj(document.body);
    });
}

app();