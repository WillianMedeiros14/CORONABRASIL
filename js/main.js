const updateDate = document.getElementById("updateDate");

const totalNumberRecovered = document.getElementById("totalNumberRecovered");
const totalNumberInfected = document.getElementById("totalNumberInfected");
const totalNumberDeaths = document.getElementById("totalNumberDeaths");

const dataInfectedByState = document.getElementById("dataInfectedByState");
const dataDeathsByState = document.getElementById("dataDeathsByState");

const QTDSHIMMERBYSTATE = [1, 2, 3, 4];

const url =
  "https://api.apify.com/v2/key-value-stores/TyToNta7jGKkpszMZ/records/LATEST?disableRedirect=true";

const getDataCovid = async () => {
  const result = await fetch(url)
    .then((resp) => resp.json())
    .then(function (data) {
      return data;
    })
    .catch(function (error) {
      console.log(error);
    });

  return result;
};

const dysplayUpdateDate = (params) => {
  const date = new Date(params.lastUpdatedAtSource);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;

  const formattedDate = `${formattedDay}/${formattedMonth}/${year}`;
  const formattedHours = `${hours}:${minutes}`;

  updateDate.textContent = `${formattedDate} as ${formattedHours}`;
};

const displayGeneralData = (params) => {
  totalNumberRecovered.textContent = params.recovered.toLocaleString("pt-BR");
  totalNumberInfected.textContent = params.infected.toLocaleString("pt-BR");
  totalNumberDeaths.textContent = params.deceased.toLocaleString("pt-BR");
};

const displayByState = (params, type) => {
  const result = params[type]
    .map(
      (item) => `
        <div class="itemByState">
            <img src="./assets/image/flags/${item.state}.png" alt="${
        item.state
      }"/>
            <div>
                <span>${item.state}</span>
                <span>${item.count.toLocaleString("pt-BR")}</span>
            </div>
        </div>
    `
    )
    .join("");

  return result;
};

const dysplayShimmerItemBySate = () => {
  const result = QTDSHIMMERBYSTATE.map(
    () =>
      ` 
      <div class="shimmerItemBySate">
        <div class="lineFlag"></div>
          <div>
              <div class="line"></div>
              <div class="line"></div>
          </div>
        <div class="shimmer"></div>
      </div>
    `
  ).join("");

  return result;
};

const display = async () => {
  const addShimmerItemBySate = dysplayShimmerItemBySate();
  dataInfectedByState.innerHTML = addShimmerItemBySate;
  dataDeathsByState.innerHTML = addShimmerItemBySate;

  const result = await getDataCovid();
  const addValueUpdateDate = dysplayUpdateDate(result);
  const addValueGneral = displayGeneralData(result);

  const addValueInfectedByState = displayByState(result, "infectedByRegion");
  const addValueDeathsByState = displayByState(result, "deceasedByRegion");

  dataInfectedByState.innerHTML = addValueInfectedByState;
  dataDeathsByState.innerHTML = addValueDeathsByState;
};

display();
