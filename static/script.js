// =================== DARK MODE ===================
function toggleDark() {
  document.body.classList.toggle('dark');
  localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
}

window.onload = () => {
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
  }

  renderChart();
  saveHistory();
  renderHistory();
};

// =================== CHART ===================
let chart;
function renderChart() {
  const ctx = document.getElementById("confidenceChart");
  if (!ctx || !predictionResult || !predictionResult.class_confidences) return;

  const labels = Object.keys(predictionResult.class_confidences);
  const values = Object.values(predictionResult.class_confidences).map(x => (x * 100).toFixed(2));

  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Confidence (%)',
        data: values,
        backgroundColor: labels.map(l => l === predictionResult.label ? '#1976d2' : '#90caf9')
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false }
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 100
        }
      }
    }
  });
}

// =================== HISTORY ===================
function saveHistory() {
  let history = JSON.parse(localStorage.getItem("history")) || [];
  history.unshift({
    label: predictionResult.label,
    confidence: predictionResult.confidence,
    time: new Date().toLocaleString()
  });
  if (history.length > 20) history = history.slice(0, 20);
  localStorage.setItem("history", JSON.stringify(history));
}

function renderHistory() {
  const container = document.getElementById("historyList");
  if (!container) return;

  const history = JSON.parse(localStorage.getItem("history")) || [];
  const search = document.getElementById("searchInput")?.value.toLowerCase() || "";

  container.innerHTML = history
    .filter(h => h.label.toLowerCase().includes(search))
    .map((item, index) => `
      <div class="history-item">
        <div>
          <strong>${item.label}</strong> – ${item.confidence}%<br>
          <small>${item.time}</small>
        </div>
        <button class="delete-btn" onclick="deleteHistory(${index})">✕</button>
      </div>
    `).join('');
}

function deleteHistory(index) {
  let history = JSON.parse(localStorage.getItem("history")) || [];
  history.splice(index, 1);
  localStorage.setItem("history", JSON.stringify(history));
  renderHistory();
}

document.getElementById("searchInput")?.addEventListener("input", renderHistory);

// =================== EXPORT PDF ===================
async function exportPDF() {
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF();
  const img = document.querySelector("img").src;
  const canvas = document.querySelector("canvas");

  pdf.setFontSize(18);
  pdf.text("Pneumonia Detection Result", 20, 20);
  pdf.setFontSize(12);
  pdf.text(`Prediction: ${predictionResult.label}`, 20, 30);
  pdf.text(`Confidence: ${predictionResult.confidence}%`, 20, 38);
  pdf.text(`Date: ${new Date().toLocaleString()}`, 20, 46);

  // Add image
  if (img) {
    const image = await toDataURL(img);
    pdf.addImage(image, 'JPEG', 20, 55, 80, 80);
  }

  // Add chart
  const chartImg = canvas.toDataURL('image/png');
  pdf.addImage(chartImg, 'PNG', 110, 55, 80, 80);

  pdf.save("pneumonia_result.pdf");
}

function toDataURL(url) {
  return fetch(url)
    .then(res => res.blob())
    .then(blob => new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    }));
}
