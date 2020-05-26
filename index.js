document.addEventListener("DOMContentLoaded", () => {
  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(
    document.querySelectorAll(".navbar-burger"),
    0
  );

  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {
    // Add a click event on each of them
    $navbarBurgers.forEach((el) => {
      el.addEventListener("click", () => {
        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const $target = document.getElementById(target);

        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle("is-active");
        $target.classList.toggle("is-active");
      });
    });
  }
});

var overallStatsNumber = document.querySelectorAll("p.subtitle");
var worldStatsTable = document.querySelector("#worldStatsTable");
var table = document.querySelector("table");
// console.log(overallStatsNumber);

fetch("https://corona-api.com/timeline").then((response) => {
  response.json().then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      // console.log(data.data[0]);
      overallStatsNumber[0].textContent = data.data[0].confirmed;
      overallStatsNumber[1].textContent = data.data[0].deaths;
      overallStatsNumber[2].textContent = data.data[0].recovered;
      overallStatsNumber[3].textContent = data.data[0].new_confirmed;
      overallStatsNumber[4].textContent = data.data[0].new_deaths;
      overallStatsNumber[5].textContent = data.data[0].new_recovered;
    }
  });
});

fetch("https://corona-api.com/countries").then((response) => {
  response.json().then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      const countries = data.data;
      // console.log(countries);

      countries.forEach((country, index) => {
        //  if(country.name == 'India')
        //  {
        //   overallStatsNumber[6].textContent = country.TotalConfirmed;
        //   overallStatsNumber[7].textContent = country.TotalDeaths;
        //   overallStatsNumber[8].textContent = country.TotalRecovered;
        //   overallStatsNumber[9].textContent = country.NewConfirmed;
        //   overallStatsNumber[10].textContent =  country.NewDeaths;
        //   overallStatsNumber[11].textContent = country.NewRecovered;
        //  }

        // console.log(country);
        // console.log(country.latest_data);
        // console.log(country.today);
        const row = table.insertRow(index + 1);
        row.innerHTML = `<th>${country.name}</th> 
        <td>${country.latest_data.confirmed}</td>
        <td>${country.today.confirmed}</td>
        <td>${country.latest_data.deaths}</td>
        <td>${country.today.deaths}</td>
        <td>${country.latest_data.recovered}</td>
         <td>${country.latest_data.critical}</td>`;
      });
    }
  });
});

var stateName = [];
var stateActiveList = [];
var stateConfirmedList = [];
var stateDeathsList = [];
var stateRecoveredList = [];

fetch("https://api.covid19india.org/data.json").then((response) => {
  response.json().then((data) => {
    var states = data.statewise;

    overallStatsNumber[6].textContent = data.statewise[0].confirmed;
    overallStatsNumber[7].textContent = data.statewise[0].deaths;
    overallStatsNumber[8].textContent = data.statewise[0].recovered;
    overallStatsNumber[9].textContent = data.statewise[0].deltaconfirmed;
    overallStatsNumber[10].textContent = data.statewise[0].deltadeaths;
    overallStatsNumber[11].textContent = data.statewise[0].deltarecovered;

    states.forEach((state) => {
      stateName.push(state.state);
      stateActiveList.push(state.active);
      stateConfirmedList.push(state.confirmed);
      stateDeathsList.push(state.deaths);
      stateRecoveredList.push(state.recovered);
    });
    // console.log(data.statewise);
  });
});

var ctx = document.getElementById("myChart").getContext("2d");
var chart = new Chart(ctx, {
  // The type of chart we want to create
  type: "line",

  // The data for our dataset
  data: {
    labels: stateName,
    datasets: [
      {
        label: "Active Cases",
        backgroundColor: "hsl(48, 100%, 67%)",
        borderColor: "hsl(48, 100%, 67%)",
        data: stateActiveList,
      },
      {
        label: "Confirmed Cases",
        backgroundColor: "hsl(217, 71%, 53%)",
        borderColor: "hsl(217, 71%, 53%)",
        data: stateConfirmedList,
      },
      {
        label: "Death Cases",
        backgroundColor: "hsl(348, 100%, 61%)",
        borderColor: "hsl(348, 100%, 61%)",
        data: stateDeathsList,
      },
      {
        label: "Recovered Cases",
        backgroundColor: "hsl(141, 71%, 48%)",
        borderColor: "hsl(141, 71%, 48%)",
        data: stateRecoveredList,
      },
    ],
  },

  // Configuration options go here
  options: {},
});

var myChartTCC = document.getElementById("myChartTCC").getContext("2d");

var chartTCC = new Chart(myChartTCC, {
  // The type of chart we want to create
  type: "line",

  // The data for our dataset
  data: {
    labels: stateName,
    maintainAspectRatio: false,
    responsive: true,

    datasets: [
      {
        label: "Confirmed Cases",
        backgroundColor: "hsl(217, 71%, 53%)",
        borderColor: "hsl(217, 71%, 53%)",
        data: stateConfirmedList,
      },
    ],
  },

  // Configuration options go here
  options: {},
});
