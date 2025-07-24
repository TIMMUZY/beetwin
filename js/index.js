const form = document.getElementById('contact-form');
  const resultDiv = document.getElementById('form-result');

  form.addEventListener('submit', function(event) {
    event.preventDefault(); // Остановить стандартную отправку формы

    const formData = new FormData(form);

    fetch(form.action, {
      method: form.method,
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        form.reset(); // Очистить форму
        showMessage('✅ Your message has been sent successfully!', true);
      } else {
        response.json().then(data => {
          if (Object.hasOwn(data, 'errors')) {
            showMessage(data["errors"].map(error => error.message).join(", "), false);
          } else {
            showMessage('Oops! There was a problem submitting your form', false);
          }
        })
      }
    })
    .catch(() => {
      showMessage('Oops! There was a problem submitting your form', false);
    });
  });

  function showMessage(message, success) {
    resultDiv.style.display = 'block';
    resultDiv.textContent = message;
    resultDiv.style.color = success ? 'green' : 'red';
    resultDiv.style.padding = '15px';
    resultDiv.style.border = success ? '1px solid green' : '1px solid red';
    resultDiv.style.borderRadius = '6px';
    resultDiv.style.backgroundColor = success ? '#e6ffe6' : '#ffe6e6';

    // Скрыть сообщение через 5 секунд
    setTimeout(() => {
      resultDiv.style.display = 'none';
    }, 5000);
  }