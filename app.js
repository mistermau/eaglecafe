window.onload = function() {
  Tabletop.init({
    key: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTGgo9-YNIHJ_Wf9RXMtRBMu3cvBSo4mo1kW42kh5fjDz5TsGTaMviOAh9YdSA0pMjnLyeCNav1e6yk/pubhtml',  // Replace with your Google Sheets URL
    callback: function(data) {
      const reviewsContainer = document.getElementById('reviews-container');
      data.forEach(function(review) {
        const reviewCard = document.createElement('div');
        reviewCard.classList.add('review-card');

        // Assuming 'Rating' and 'Review Text' are the column names in the sheet
        const rating = review.Rating;  // Rating column
        const reviewText = review['Review Text'];  // Review Text column
        // You can still access the email if needed for any backend processes (but we don't display it)
        const email = review['Email Address']; // Email column (hidden in display)

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

        // Generate the review card HTML
        reviewCard.innerHTML = `
          <h3>Review for The Eagle Cafe</h3>
          <div class="star-rating">${starRating.innerHTML}</div>
          <p class="review-text">${reviewText}</p>
        `;
        
        // Append the review card to the reviews container
        reviewsContainer.appendChild(reviewCard);
      });
    },
    simpleSheet: true
  });
};
