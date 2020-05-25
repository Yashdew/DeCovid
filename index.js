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
// console.log(worldStatsTable);



fetch("https://api.covid19api.com/summary").then((response) => {
  response.json().then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      // console.log(data.Global.NewConfirmed);
      overallStatsNumber[0].textContent = data.Global.TotalConfirmed;
      overallStatsNumber[1].textContent = data.Global.TotalDeaths;
      overallStatsNumber[2].textContent = data.Global.TotalRecovered;
      overallStatsNumber[3].textContent = data.Global.NewConfirmed;
      overallStatsNumber[4].textContent = data.Global.NewDeaths;
      overallStatsNumber[5].textContent = data.Global.NewRecovered;
    }
  });
});

fetch("https://api.covid19api.com/summary").then((response) => {
  response.json().then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      const countries = data.Countries;
      // console.log(countries);

      countries.forEach((country, index) => {
        // console.log(country);
        // console.log(country.Country);
        const row = table.insertRow(index + 1);
    

        row.innerHTML = `<th>${country.Country}</th> 
            <td>${country.TotalConfirmed}</td>
            <td>${country.NewConfirmed}</td>
            <td>${country.TotalDeaths}</td>
            <td>${country.NewDeaths}</td>
            <td>${country.TotalRecovered}</td>
            <td>${country.NewRecovered}</td>`;
      });
    }
  });
});

// fetch("https://disease.sh/v2/continents?yesterday=false", {
//   headers: {
//     Accept: "application/json"
//   }
// }).then((response) =>{
//   response.json().then( (data) => {
//         console.log(data)
//   })

// })
