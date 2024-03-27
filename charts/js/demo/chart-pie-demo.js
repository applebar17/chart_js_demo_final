// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

// Pie Chart Example
var ctx = document.getElementById("myPieChart");
var myPieChart = new Chart(ctx, {
  type: 'polarArea',
  data: {
    labels: ["Financing Products",
    "Branch Services",
    "Cards",
    "Savings/Investments",
    "ATM/Self service Machines",
    "Insurance",
    "Digital Banking tools"],
    datasets: [{
      data: [15, 35,22,32,37,30, 12],
      backgroundColor: [ 'rgba(255, 99, 132, 0.2)',
      'rgba(255, 159, 64, 0.2)',
      'rgba(255, 205, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(201, 203, 207, 0.2)'
      ],
      borderColor: "rgba(255, 255, 255, 2)",
      borderWidth: 2,
      startAngle: 0.5,
      hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf'],
      hoverBorderColor: "rgba(234, 236, 244, 1)",
    }],
  },
  options: {
    maintainAspectRatio: false,
    tooltips: {
      backgroundColor: '#FFFAFA',
      bodyFontColor: "#858796",
      borderColor: 'black',
      borderWidth: 1,
      hoverBackgroundColor: 'white',
      hoverBorderWidth: 2,
    },
    legend: {
      display: false
    },
    cutoutPercentage: 99,
  },
});


