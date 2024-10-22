window.addEventListener('load', function() {
  const newsletterAddButton = document.querySelector('.newsletter-form button');
  const newsletterEmailInput = document.querySelector('#newsletter-email');
  const formRef = document.querySelector('.newsletter-form');
  if (newsletterAddButton && newsletterEmailInput) {
    formRef.addEventListener('submit', function(e) {
      e.preventDefault();

      newsletterAddButton.setAttribute('disabled', 'disabled');
      newsletterEmailInput.setAttribute('disabled', 'disabled');

      const value = newsletterEmailInput.value;
      const xhr = new XMLHttpRequest();
      const url =
        'https://nbdggbnqnrevwg6xlex3st3vpe0nyhiq.lambda-url.us-east-2.on.aws/?token=db1f899025b5a59a76b6b34b2a013893';
      xhr.open('POST', url, true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onreadystatechange = function() {
        newsletterAddButton.classList.add('btn-success');
        newsletterAddButton.innerHTML = 'Subscribed';
      };
      
      const data = JSON.stringify({ email: value });
      xhr.send(data);
    });
  }

  // If the "unsubscribe" query string is present, call API to unsubscribe and show message
  const urlParams = new URLSearchParams(window.location.search);
  const unsubscribe = urlParams.get('unsubscribe');
  const unsubscribeDialog = document.querySelector('#unsubscribe-dialog');

  if (unsubscribe) {
    const xhr = new XMLHttpRequest();
    const url =
      'https://nbdggbnqnrevwg6xlex3st3vpe0nyhiq.lambda-url.us-east-2.on.aws/newsletter/unsubscribe'
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function(event) {
      if (event.target.status === 204) {
        unsubscribeDialog.classList.remove('invisible');
      } else if (event.target.status === 404) {
        // Ignore not found errors
        return;
      } else {
        const dialogHeader = unsubscribeDialog.querySelector('.dialog-header h2');
        const dialogContent = unsubscribeDialog.querySelector('.dialog-content p');

        dialogHeader.innerHTML = 'Something went wrong';
        dialogContent.innerHTML = "We couldn't unsubscribe your email. You may already be unsubscribed, or the unsubscribe link might be invalid. Please try again later, and if the issue persists, contact us.";
        unsubscribeDialog.classList.remove('invisible');
      }
    };
    const data = JSON.stringify({ token: unsubscribe });
    xhr.send(data);
  }

  const unsubscribeDialogClose = document.querySelector('#close-dialog');
  if (unsubscribeDialogClose) {
    unsubscribeDialogClose.addEventListener('click', function() {
      unsubscribeDialog.classList.add('invisible');
    });
  }
});
