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
});
