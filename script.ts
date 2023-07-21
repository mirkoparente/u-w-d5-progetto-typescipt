import { strict } from "assert";

interface Smartphone {
  carica: number; //euro disponibile per le chiamate
  numeroChiamate: number; //numero chiamate effettuate con il cellulare
  costoMinuto: number;
  ricarica(euro: number): void;
  numero404(): string;
  getNumeroChiamate(): number;
  chiamata(min: number): void;
  azzeraChiamate(): void;
}

class Smartphoneuser implements Smartphone {
  name!: string;
  carica!: number;
  numeroChiamate!: number;
  costoMinuto!: number;
  ora!: Date;
  constructor(name: string, carica: number, numerochiamate: number) {
    this.name = name;
    this.carica = carica;
    this.numeroChiamate = numerochiamate;
    this.costoMinuto = 0.2;
    this.ora = new Date();
  }

  ricarica(euro: number): void {
    this.carica += euro;
  }
  numero404(): string {
    return "il credito residuo è: " + this.carica + "€";
  }
  getNumeroChiamate(): number {
    return this.numeroChiamate;
  }
  chiamata(min: number): void {
    if (this.costoMinuto * min < this.carica) {
      (this.carica -= this.costoMinuto * min), this.numeroChiamate++;
    } else {
      alert("Credito terminato devi ricaricare");
    }
  }

  azzeraChiamate(): void {
    "registro chiamate azzerato" + (this.numeroChiamate = 0);
  }
}

let u: Smartphoneuser[] = [];
let user = new Smartphoneuser("Telefono di Mario", 100000000, 0);
console.log(user,user.numero404());

let user2 = new Smartphoneuser("Telefono di Lucia", 0, 0);
console.log(user2,user2.numero404());

let user3 = new Smartphoneuser("Telefono di Mandrake", 10000, 0);
console.log(user3,user3.numero404());

u.push(user, user2, user3);
let row = document.getElementById("row") as HTMLDivElement;
u.forEach((user) => {
  let newDiv = document.createElement("div") as HTMLDivElement;
  newDiv.classList.add("col-12", "my-5");
  newDiv.innerHTML = `<div class="card border-1 border-warning">
<div class="card-body">
  <h5 class="card-title">${user.name}</h5>
  <h6 class="card-subtitle mb-2 text-body-secondary">${user.numero404()}</h6>

  <button class="btn btn-primary">Ricarica</button>
  <button class="btn btn-primary btn2">Chiama</button>
  <button class="btn btn-primary btn3">Elimina registro chiamate</button>
</div>
<ul class=list></ul>
</div>`;
  row.appendChild(newDiv);

  let btnRicarica = newDiv.querySelector(".btn") as HTMLButtonElement;
  btnRicarica.addEventListener("click", function (e) {
    user.ricarica(20);
    alert("hai appena ricaricato");
    let h6 = newDiv.querySelector("h6") as HTMLElement;
    h6.innerHTML = `${user.numero404()}`;
    console.log(user.numero404());
  });
  let btnChiama = newDiv.querySelector(".btn2") as HTMLButtonElement;
  btnChiama.addEventListener("click", function () {
    if (user.carica !== 0) {
      user.chiamata(10);
      user.getNumeroChiamate();
      let h6 = newDiv.querySelector("h6") as HTMLElement;
      h6.innerHTML = `${user.numero404()}`;
      let ul = newDiv.querySelector("ul") as HTMLUListElement;
      let li = document.createElement("li") as HTMLLIElement;
      let testo: string = "";
      if (user.getNumeroChiamate() == 1) {
        testo = "chiamata";
      } else {
        testo = "chiamate";
      }
      li.innerHTML = `  <p class="card-text">hai effettuato, ${user.getNumeroChiamate()} ${testo} il: ${user.ora.toLocaleDateString()} alle: ${user.ora.toLocaleTimeString()}</p>
    `;
      ul.appendChild(li);

      console.log(user.numero404());
    } else {
      alert("Credito terminato devi ricaricare");
    }
  });

  let btnElimina = newDiv.querySelector(".btn3") as HTMLButtonElement;
  btnElimina.addEventListener("click", function () {
    let ul = newDiv.querySelector("ul") as HTMLUListElement;
    if (ul.textContent !== "") {
      user.azzeraChiamate();
      ul.innerHTML = "";
      ul.innerHTML = "Registro chiamate Eliminato";
    }
  });
});
