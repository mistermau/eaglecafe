window.onload = function() {
  Tabletop.init({
    key: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTGgo9-YNIHJ_Wf9RXMtRBMu3cvBSo4mo1kW42kh5fjDz5TsGTaMviOAh9YdSA0pMjnLyeCNav1e6yk/pub?output=csv',  // Replace with your CSV URL
    callback: function(data) {
      const reviewsContainer = document.getElementById('reviews-container');
      data.forEach(function(review) {
        const reviewCard = document.createElement('div');
        reviewCard.classList.add('review-card');

        const rating = review.Rating; // Rating column
        const reviewText = review['Review Text']; // Review Text column
        const name = review.Name; // Name column (added)

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

        // Generate the review card HTML with the Name appended below the review text
        reviewCard.innerHTML = `
          <h3>Review for The Eagle Cafe</h3>
          <div class="star-rating">${starRating.innerHTML}</div>
          <p class="review-text">${reviewText}</p>
          <p class="review-author">- ${name}</p> <!-- Display Name after the review -->
        `;
        
        // Append the review card to the reviews container
        reviewsContainer.appendChild(reviewCard);
      });
    },
    simpleSheet: true
  });
};
