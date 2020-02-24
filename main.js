//Pobranie wszystkich elementów
const input = document.querySelector("input");
const btn = document.querySelector("button.drawResultBtn");
const form = document.querySelector("form");
const ulNames = document.querySelector("ul.names");
const ulDraw = document.querySelector("ul.drawResult");
const h1 = document.querySelector("h1");
const reloadIcon = document.querySelector(".reload");
const soundIcon = document.querySelector(".soundIcon");
const soundPanel = document.querySelector("audio");

//Classa dodająca wpisane imiona do środka dwóch tablic
class NamesIn {
  constructor() {
    this.names = [];
    this.names2 = [];
    this.putNamesIn = event => {
      event.preventDefault();
      if (input.value == "") return alert("Nie wpisałeś imienia!");
      if (liPlace.textContent != "TEKST")
        return alert("Za późno! Losowanie już trwa!");
      this.names.push(input.value);
      this.names2.push(input.value);
      //Odwołanie do obiektu 'names' i użycie jego funkcji
      names.showN(input.value);
      input.value = "";
      return this.names;
    };
  }
}

let addName = new NamesIn();
form.addEventListener("submit", addName.putNamesIn);

//Class z funkcją wyświetlający imiona
class ShowNames {
  constructor() {
    this.showN = function (name) {
      let namesLi = document.createElement("li");
      let addToUl = ulNames.appendChild(namesLi);
      addToUl.style.opacity = "0";
      addToUl.textContent = name;
      setTimeout(() => {
        addToUl.style.opacity = "1";
      }, 200);
    };
  }
}

let names = new ShowNames();
let liPlace = document.querySelector("li.placeHolder");

let index = 0;
let newTab = [];
let clickCounter = 0;
let newIndex = 0;

//Class Losowanie
class Draw {
  constructor() {
    this.sentence = [
      " kupujesz prezent dla ",
      " prosze kupic cos dla ",
      " co najmniej prezent za stowe dla ",
      "w tym roku kupuje cos dla ",
      " dawaj prezencik dla ",
      " bulisz na prezent dla",
      " w tym roku podariujesz cos dla "
    ];
  }
  //Funkcja która losuje z dwóch tablic i dodaje 'li' z wynikiem dopasowania 3 elementów
  match = () => {
    if (index < 3) {
      for (let i = 0; i < addName.names.length; i++) {
        let index2 = Math.floor(Math.random() * addName.names2.length);
        let sentenceIndex = Math.floor(Math.random() * this.sentence.length);
        if (addName.names[index] != addName.names2[index2]) {
          console.log("Ok!");
          newTab.push(
            `${addName.names[index]} ${this.sentence[sentenceIndex]} ${addName.names2[index2]}`
          );
          index++;
          addName.names2.splice(index2, 1);
        } else {
          console.log("Powtórka");
          index = 0;
          newTab = [];
          addName.names2 = [];
          addName.names2 = addName.names.slice();
          return this.match();
        }
      }
    }
    if (newIndex >= newTab.length - 1)
      return alert("Koniec Losowania! Wesołych Świąt!");
    clickCounter++;
    liPlace.textContent = newTab[0];
    setTimeout(() => {
      liPlace.style.opacity = "1";
    }, 100);
    setTimeout(() => {
      liPlace.style.opacity = "0";
    }, 3000);

    if (clickCounter >= 2) {
      liPlace.textContent = newTab[++newIndex];
      setTimeout(() => {
        liPlace.style.opacity = "1";
      }, 100);
      setTimeout(() => {
        liPlace.style.opacity = "0";
      }, 3000);
      return;
    }
  };
}

let drawResult = new Draw();
btn.addEventListener("click", drawResult.match);

//Zmiana koloru h1 w setInterval + toggle na ikone z muzyką + oprogramowanie ikony RELOAD
setInterval(function () {
  h1.style.color = "rgb(0, 100, 0,80%)";
}, 2000);

setInterval(function () {
  h1.style.color = "rgb(197, 46, 46)";
}, 4000);

soundIcon.addEventListener("click", function () {
  soundPanel.classList.toggle("active");
});

reloadIcon.addEventListener("click", () => {
  window.location.reload();
});
