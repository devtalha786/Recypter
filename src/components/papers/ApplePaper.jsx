
  export const openModifiedHtml = () => {
    // Create a new window
    const newWindow = window.open('ApplePaper', '_blank');
    
    // Fetch the HTML file
    fetch('/ApplePaper.html')
      .then(response => response.text())
      .then(html => {
        // You can modify the HTML content here if needed
        const modifiedHtml = html.replace(
          '{{date}}', 
          new Date().toLocaleDateString()
        );
        
        // Write the modified HTML to the new window
        newWindow.document.write(modifiedHtml);
        newWindow.document.close();
      });
  };

 