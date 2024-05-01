fetch('https://yydmxrbvwmihmeq44cxqh77jny0brmhe.lambda-url.us-west-2.on.aws/')
  .then(response => response.text())
  .then(data => {
    const visitorCount = parseInt(data);
    document.getElementById('visitor-counter').innerText = visitorCount;
  })