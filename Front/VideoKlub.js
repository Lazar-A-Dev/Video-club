export class VideoKlub {
    constructor(id, naziv) {
        this.id = id;
        this.naziv = naziv;
        this.listaPolica = [];

        this.container = null;
    }

    dodajPolice(polica) {
        this.listaPolica.push(polica);
    }

    crtaj(host) {
        this.container = document.createElement("div");
        this.container.className = "glavni";
        host.appendChild(this.container);
        ////////////////////////////////////////////////////Glavni div

        var naslov = document.createElement("h2");
        naslov.className = "naslov";
        naslov.innerHTML = `Video klub "${this.naziv}"`;//Pikazuje naziv za video klub na stranici
        this.container.appendChild(naslov);

        var sadrzaj = document.createElement("div");//Sadrzaj obuhvata i levi i desni div
        sadrzaj.className = "sadrzaj"
        this.container.appendChild(sadrzaj);

        var leviDeo = document.createElement("div");
        leviDeo.className = "leviDeo";
        sadrzaj.appendChild(leviDeo);

        var desniDeo = document.createElement("div");//Desni deo
        leviDeo.className = "desniDeo";
        sadrzaj.appendChild(desniDeo);



        this.listaPolica.forEach((p, index) => {
            this.crtajFormu(leviDeo, p, index);
            this.crtajPolice(desniDeo, p, index);
            //console.log(p);

        })

        var labelDVD = document.createElement("label");
        labelDVD.className = "labelDVD";
        labelDVD.innerHTML = "Broj DVD-ova: ";
        leviDeo.appendChild(labelDVD);

        var unos = document.createElement("input");
        unos.className = "unos";
        unos.type = "number";
        unos.min = 0;
        leviDeo.appendChild(unos);

        var dugme = document.createElement("button");
        dugme.className = "dugme";
        dugme.innerHTML = "Dodaj na polici";
        dugme.onclick = (ev) => this.azurirajPolicu();
        leviDeo.appendChild(dugme);



    }

    crtajFormu(host, polica, index) {
        var prozor = document.createElement("div");
        prozor.className = "prozor";
        host.appendChild(prozor);

        var radioDugme = document.createElement("input");
        radioDugme.type = "radio";
        radioDugme.name = "radioInput";
        radioDugme.value = polica.id;
        if (index == 0) {
            radioDugme.checked = true;
        }
        prozor.appendChild(radioDugme);

        var labelPolica = document.createElement("label");
        labelPolica.className = "labelPolica";
        labelPolica.innerHTML = polica.oznaka;
        prozor.appendChild(labelPolica);

    }

    crtajPolice(host, polica, index) {
        var fioka = document.createElement("div");
        fioka.className = "fioka";
        host.appendChild(fioka);

        let labelaDiv = document.createElement("div");
        labelaDiv.className = "labelaDiv";
        fioka.appendChild(labelaDiv);

        var labelPolica = document.createElement("label");
        labelPolica.className = "labelPolica";
        labelPolica.innerHTML = polica.oznaka;
        labelaDiv.appendChild(labelPolica);

        let raf = document.createElement("div");
        raf.className = "raf";
        fioka.appendChild(raf);

        //Ovde ide popunjavanje diva
        let azuriraj = 0;
        for (let i = 0; i < polica.maxBroj; i++) {
            let popuna = document.createElement("div");
            popuna.className = "popuna";
            if (azuriraj < polica.trenutniBroj) {
                popuna.style.backgroundColor = "red";
                azuriraj++;
            }
            raf.appendChild(popuna);
        }



        let odnos = document.createElement("div");
        odnos.className = "odnos";
        fioka.appendChild(odnos);

        var labelOdnos = document.createElement("label");
        labelOdnos.className = "labelOdnos";
        labelOdnos.innerHTML = polica.trenutniBroj + "/" + polica.maxBroj;
        odnos.appendChild(labelOdnos);
    }

    azurirajPolicu() {
        const zanr = parseInt(document.querySelector('input[name="radioInput"]:checked').value);
        const kolicina = parseInt(document.querySelector('.unos').value);
    
        console.log(zanr);
    
        fetch(`http://localhost:5240/Polica/DodajDVD/${zanr}/${kolicina}`, {
            method: "PUT"
        }).then(response => response.json()).then(data => {
            console.log(data);
        });
    }

}