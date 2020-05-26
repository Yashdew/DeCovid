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
var indiaStatsTable = document.querySelector("#indiaStatsTable");
var table = document.querySelectorAll("table");
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
     

        // console.log(country);
        // console.log(country.latest_data);
        // console.log(country.today);
        const row = table[0].insertRow(index + 1);
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

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

var stateName = [];
var stateActiveList = [];
var stateConfirmedList = [];
var stateDeathsList = [];
var stateRecoveredList = [];
var stateColorList = []
var totalConfirmedTimeline = []
var totalDateTimeline = []
// var myChartTCC = document.getElementById("myChartTCC").getContext("2d");

fetch("https://api.covid19india.org/data.json").then((response) => {
  response.json().then((data) => {
    var states = data.statewise;
    var totalTimeline = data.cases_time_series

    overallStatsNumber[6].textContent = data.statewise[0].confirmed;
    overallStatsNumber[7].textContent = data.statewise[0].deaths;
    overallStatsNumber[8].textContent = data.statewise[0].recovered;
    overallStatsNumber[9].textContent = data.statewise[0].deltaconfirmed;
    overallStatsNumber[10].textContent = data.statewise[0].deltadeaths;
    overallStatsNumber[11].textContent = data.statewise[0].deltarecovered;

    totalTimeline.forEach((timeline,index)=>{
      console.log(timeline)
      totalConfirmedTimeline.push(timeline.totalconfirmed)
      totalDateTimeline.push(timeline.date)
      

    })

    states.forEach((state,index) => {
      stateName.push(state.state);
      stateActiveList.push(state.active);
      stateConfirmedList.push(state.confirmed);
      stateDeathsList.push(state.deaths);
      stateRecoveredList.push(state.recovered);
      stateColorList.push( getRandomColor())

      const row = table[1].insertRow(index + 1);
      row.innerHTML = `<th onclick="javascript:location.href='http://www.duolancers.codes'" >${state.state}</th> 
      <td>${state.confirmed}</td>
      <td>${state.deltaconfirmed}</td>
      <td>${state.deaths}</td>
      <td>${state.deltadeaths}</td>
      <td>${state.recovered}</td>
       <td>${state.deltarecovered}</td>`;
    });
    // console.log(data.cases_time_series);
    stateName.shift()
    stateConfirmedList.shift()
    stateActiveList.shift()
    stateDeathsList.shift()
    stateRecoveredList.shift()
    // chartTCC.update();
    chart.update();
    // doughnut_chart.update()
  });
});

// console.log(stateColorList)

var ctx = document.getElementById("myChart").getContext("2d");
var chart = new Chart(ctx, {
  // The type of chart we want to create
  type: "line",

  // The data for our dataset
  data: {
    labels: totalDateTimeline,
    datasets: [
     
      {
        label: "Confirmed Cases",
        backgroundColor: "hsl(48, 100%, 67%)",
        // fill: false,
        borderColor: "hsl(48, 100%, 67%)",
        data: totalConfirmedTimeline,
      },
      
     
    ],
  },

  // Configuration options go here
  options: {
    legend: {
      display: false
  },
    scales:
        {
            yAxes: [{
                gridLines : {
                    display : false,
                    drawBorder: false,
                },
                ticks: {
                  display: false //this will remove only the label
              }
            }],
            xAxes: [{
              gridLines : {
                  display : false,
                  drawBorder: false,
              },
              ticks: {
                display: false //this will remove only the label
            }
          },
        ],
            
        },
        
  },
});



// var chartTCC = new Chart(myChartTCC, {
//   // The type of chart we want to create
//   type: "bar",

//   // The data for our dataset
//   data: {
//     labels: stateName,
//     // labels: ["a","b","c"],
//     maintainAspectRatio: false,
//     responsive: true,

//     datasets: [
//       {
//         label: "Confirmed Cases",
//         backgroundColor: 'rgb(90%, 15%, 14%, 50%)',
//         borderColor: 'rgb(90%, 15%, 14%, 100%)',
//         hoverBackgroundColor: "rgb(90%, 15%, 14%, 100%)",
//         data: stateConfirmedList,
//         // data: [1,2,3],
//       },
//     ],
//   },

//   // Configuration options go here
//   options: {
   
//     responsive: true,
//     maintainAspectRatio: true, 
//     fullWidth:false,
//     scales: {
//       yAxes: [{
//         stacked: true,
//         gridLines: {
//           display: true,
          
//         },
//         ticks: {
//           beginAtZero: false
//       }
//       }],
//       xAxes: [{
//         gridLines: {
//           display: false
//         }
//       }]
//     },
//     barStrokeWidth : 100,
//   },
// });



// var data = {
//   labels: stateName,
//   datasets: [{
//     label: "Confirmed Cases",
//     backgroundColor: "rgba(255,99,132,0.2)",
//     borderColor: "rgba(255,99,132,1)",
//     borderWidth: 2,
//     hoverBackgroundColor: "rgba(255,99,132,0.4)",
//     hoverBorderColor: "rgba(255,99,132,1)",
//     data: stateConfirmedList,
//   }]
// };

// var options = {
//   maintainAspectRatio: false,
//   scales: {
//     yAxes: [{
//       stacked: true,
//       gridLines: {
//         display: true,
//         color: "rgba(255,99,132,0.2)"
//       }
//     }],
//     xAxes: [{
//       gridLines: {
//         display: false
//       }
//     }]
//   }
// };

// Chart.Bar('chart', {
//   options: options,
//   data: data
// });

// var doughnut_chart = document.getElementById("doughnut-chart").getContext("2d")
// new Chart(doughnut_chart, {
//   type: 'doughnut',
//   data: {
//     labels:stateName,
//     datasets: [
//       {
//         label: "Population (millions)",
//         // backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
//         data: stateConfirmedList
//       }
//     ]
//   },
//   options: {
//     title: {
//       display: true,
//       text: 'Predicted world population (millions) in 2050'
//     }
//   }
// });