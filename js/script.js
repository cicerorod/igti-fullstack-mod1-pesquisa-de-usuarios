let tabNomes = null;
let allNomes = [];
let nomesList = [];
let textPesquisa = null;
let buttonBuscar = null;
let estatisticatotalSexoMasculino = 0;
let estatisticatotalSexoFeminino = 0;
let estatisticaSomaIdade = 0;
let estatisticamediaIdade = 0;
let numberFormat = null;

window.addEventListener("load", () => {
  tabNomes = document.querySelector("#tabNomes");
  countNames = document.querySelector("#countNames");

  textPesquisa = document.querySelector("#textPesquisa");
  textPesquisa.addEventListener("keyup", () => pesquisar());
  textPesquisa.addEventListener("keypress", () => pesquisar());

  buttonBuscar = document.querySelector("#buttonBuscar");
  buttonBuscar.addEventListener("click", () => pesquisarNomes());

  //prettier-ignore
  estatisticatotalSexoMasculino = document.querySelector('#estatisticatotalSexoMasculino');
  //prettier-ignore
  estatisticatotalSexoFeminino = document.querySelector('#estatisticatotalSexoFeminino');
  estatisticaSomaIdade = document.querySelector("#estatisticaSomaIdade");
  estatisticamediaIdade = document.querySelector("#estatisticamediaIdade");
  numberFormat = Intl.NumberFormat("pt-br");
  fetchNomesAsyncAwait();
});

function pesquisar() {
  let str = textPesquisa.value;
  let filteredArray = [];

  //if (str !== '') {
  allNomes.forEach((val) => {
    if (val && val.name.toLowerCase().includes(str.toLowerCase())) {
      filteredArray.push(val);
    }
  });
  //}

  console.log("total atual" + filteredArray.length);

  if (filteredArray.length > 0) {
    pesquisarNomes();
  } else {
    nomesList = [];
    render();
  }
}

function pesquisarNomes() {
  let str = textPesquisa.value;
  let filteredArray = [];

  if (str !== "") {
    allNomes.forEach((val) => {
      if (val && val.name.toLowerCase().includes(str.toLowerCase())) {
        filteredArray.push(val);
      }
    });

    nomesList = filteredArray;
    render();
  } else {
    nomesList = allNomes;
    render();
  }
}

async function fetchNomesAsyncAwait() {
  const response = await fetch(
    "https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo"
  );
  const json = await response.json();

  nomesList = json.results.map((nome) => {
    return {
      name: nome.name.first + " " + nome.name.last,
      picture: nome.picture.thumbnail,
      age: nome.dob.age,
      gender: nome.gender,
    };
  });

  allNomes = nomesList;
  console.log(allNomes);
  render();
}

function render() {
  let str = textPesquisa.value;

  renderNomeList();
  renderTotalNomes();
  renderEstatisticatotalSexoFeminino();
  renderEstatisticaSomaIdade();
  renderEstatisticatotalSexoMasculino();
  renderEstatisticamediaIdade();
  renderEstatisticaSomaIdade();

  if (str.length > 0) {
    buttonBuscar.disabled = false;
  } else {
    buttonBuscar.disabled = true;
  }
}

function renderNomeList() {
  let namesHTML = "<div>";

  nomesList.forEach((nome) => {
    const { name, picture, age, gender } = nome;
    // imagem -> nome -> ,idade
    const nameHTML = `
      <div class ='nome'>        
        <div> 
          <img src="${picture}" alt ="name"> 
        </div>
        <div>
          <ul>
            <li>${name}, ${age} anos </li>           
          </ul> 
        </div>
      </div>        
    `;
    namesHTML += nameHTML;
  });

  tabNomes.innerHTML = namesHTML;
}

function renderTotalNomes() {
  countNames.textContent = nomesList.length;
}

function renderEstatisticatotalSexoMasculino() {
  const some = nomesList.filter((nome) => {
    return nome.gender === "male";
  });
  estatisticatotalSexoMasculino.textContent = some.length;
}

function renderEstatisticatotalSexoFeminino() {
  const some = nomesList.filter((nome) => {
    return nome.gender === "female";
  });

  estatisticatotalSexoFeminino.textContent = some.length;
}
function renderEstatisticaSomaIdade() {
  estatisticaSomaIdade.textContent = FormatNumber(estatisticaIdade());
}

function renderEstatisticamediaIdade() {
  let quantidade = nomesList.length;
  if (quantidade !== 0) {
    estatisticamediaIdade.textContent = estatisticaIdade() / quantidade;
  } else {
    estatisticamediaIdade.textContent = 0;
  }
}

function estatisticaIdade() {
  let somaEstatisticaSomaIdade = 0;
  somaEstatisticaSomaIdade = nomesList.reduce((accumulator, current) => {
    return accumulator + current.age;
  }, 0);
  return somaEstatisticaSomaIdade;
}

function FormatNumber(number) {
  return numberFormat.format(number);
}
