window.onload = function() {
  const sheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTGgo9-YNIHJ_Wf9RXMtRBMu3cvBSo4mo1kW42kh5fjDz5TsGTaMviOAh9YdSA0pMjnLyeCNav1e6yk/pub?output=csv';

  fetch(sheetUrl)
    .then(response => response.text())
    .then(data => {
      const reviews = parseCSV(data);
      displayReviews(reviews);
    })
    .catch(error => console.error('Error fetching sheet:', error));
};

function parseCSV(data) {
  const rows = data.split('\n').map(row => row.split(','));
  const headers = rows.shift();
  return rows.map(row => {
    const review = {};
    headers.forEach((header, index) => {
      review[header.trim()] = row[index]?.trim();
    });
    return review;
  });
}

function displayReviews(reviews) {
  const reviewsContainer = document.getElementById('reviews-container');
  reviews.forEach(review => {
    const reviewCard = document.createElement('div');
    reviewCard.classList.add('review-card');

    // Assuming column headers are 'Rating' and 'Review Text'
    const rating = parseInt(review['Rating'], 10);
    const reviewText = review['Review Text'];

    // Create rating stars
    const starRating = document.createElement('div');
    starRating.classList.add('star-rating');
    for (let i = 1; i <= 5; i++) {
      const star = document.createElement('div');
      star.classList.add('star');
      if (i <= rating) {
        star.classList.add('filled');
      }
      starRating.appendChild(star);
    }

    // Append content to the review card
    reviewCard.innerHTML = `
      <h3>Review for The Eagle Cafe</h3>
      <div class="star-rating">${starRating.innerHTML}</div>
      <p class="review-text">${reviewText}</p>
    `;
    reviewsContainer.appendChild(reviewCard);
  });
}
