import Chart from 'chart.js/auto';
import axios from 'axios';

import toMDT from '../cleaning/toMDT';

export default async function createLiftsChart(userID) {
  const ctx = document.getElementById("liftsChart");
  var liftsArray = [];
  var selectedLift = 'Bench Press';

  await axios.get(`http://localhost:3001/user/${userID}/lifts`).then((res) => {
    liftsArray = res.data;
  });

  function getLabels() {
    const filteredLabels = liftsArray.filter((lift) => lift.lift === selectedLift).map((label) => toMDT(label.time._seconds));
    return filteredLabels;
  };

  const liftChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: getLabels(),
      datasets: [
        {
          label: selectedLift,
          data: liftsArray.filter((lift) => lift.lift === selectedLift).map((weight) => weight.weight),
        }
      ]
    },
    options: {
      datasets: {
        line: {
          pointRadius: 0
        }
      },
      plugins: {
        legend: {
          labels: {
            font: {
              family: 'Inter'
            }
          }
        }
      },
      responsive: true,
      maintainAspectRatio: true,
    }
  })

  return liftChart;
};