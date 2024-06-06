document.getElementById('copy-styles').addEventListener('click', async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: getAllStyles,
    }, (result) => {
      const styles = result[0].result;
      copyToClipboard(styles);
      alert('Styles copied to clipboard!');
    });
  });
  
  function getAllStyles() {
    function getAllElementStyles(element) {
      var styles = "";
      var elements = element.querySelectorAll("*");
      elements.forEach(function (el) {
        var computedStyle = window.getComputedStyle(el);
        var styleString = "";
        for (var i = 0; i < computedStyle.length; i++) {
          var key = computedStyle[i];
          var value = computedStyle.getPropertyValue(key);
          styleString += key + ": " + value + "; ";
        }
        styles += el.tagName.toLowerCase() + " { " + styleString + "}\n";
      });
      return styles;
    }
  
    var element = document.querySelector("body"); // Меняйте "body" на селектор вашего элемента
    return getAllElementStyles(element);
  }
  
  function copyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  }