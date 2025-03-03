const $summaryList = document.querySelector(".summary-list")
const $resultSummaryScoreValue = document.querySelector(".result-summary__score-value")

async function fetchData(url) {
  try {
    const res = await fetch(url)
    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`)
    return await res.json()
  } catch (err) {
    console.error("Error fetching data: ", err)
  }
}

function createSummaryItem({ category, score, icon }) {
  return `<li class="summary-list__item summary-list__item--${category.toLowerCase()}">
            <img src="${icon}" alt="" aria-hidden="true" class="summary-list__icon">
            <span class="summary-list__label summary-list__label--${category.toLowerCase()}">${category}</span>
            <p class="summary-list__score">${score} <span class="summary-list__score--opacity"> / 100</span></p>
          </li>`
}

function calculateAverageScore(data) {
  const totalAverage = data.reduce((acc, curr) => acc + curr.score, 0)
  return Math.round(totalAverage / data.length)
}


async function renderSummaryList() {
  const data = await fetchData("./js/data.json")
  if (data) {
    $summaryList.innerHTML = data.map(createSummaryItem).join("")
    $resultSummaryScoreValue.textContent = calculateAverageScore(data)
  }
}

renderSummaryList()

