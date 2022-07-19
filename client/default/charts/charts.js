// TODO: rewrite this absolutely shitty code.

var requests = []
var countPoll;

const data = {
  labels: ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", 0],
  datasets: [{
    label: 'Requests/sec',
    data: [65, 59, 80, 81, 56, 55, 40],
    fill: true,
    backgroundColor: 'rgba(56,139,253,0.2)',
    borderColor: '#1f6feb',
    tension: 0.1
  }]
};

const config = {
  type: 'line',
  data: data,
  options: {
    responsive: true,
    maintainAspectRatio: false,

    scales: {
      xAxes: {
        display: false
      }
    }
  }
};

const data2 = {
  labels: ["sample A", "sample B", "sample C", "sample D", "sample E"],
  datasets: [{
    label: 'Ads by Relevance',
    data: [10, 2, 6, 7, 4],
    borderWidth: 3,
    borderColor: '#1f6feb',
    backgroundColor: 'rgba(56,139,253,0.2)',
    tension: 0.1
  }]
};

const config2 = {
  type: 'bar',
  data: data2,
  options: {
    responsive: true,
    maintainAspectRatio: false,
  }
};

var chartLine = new Chart(
  document.getElementById("reqs"),
  config
);

var chartBar = new Chart(
  document.getElementById("relevance"),
  config2
);

function updateChart(points) {
  requests.push(points);
  if (requests.length >= 60) {
    requests = [];
  }

  chartLine.config.data = requests;
  chartLine.update();
}

function updateBarChart() {
  var titles = []
  var points = []

  document.querySelectorAll('packetTable tr, packetTable th').forEach(elem => {
    if (elem.tagName.toLowerCase() == "th") {
      titles.push(elem.innerHTML)
    } else if (elem.tagName.toLowerCase() == "td") {
      points.push(elem.innerHTML);
    }
  });

  chartBar.config.labels = titles;
  chartBar.config.data = points;
  chartBar.update();
}