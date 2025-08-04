
document.addEventListener('DOMContentLoaded', function() {
    const colorBoxes = document.querySelectorAll('.color-box');
    const notification = document.getElementById('copyNotification');
    colorBoxes.forEach(colorBox => {
        colorBox.addEventListener('click', function() {
            const hexCode = this.getAttribute('data-hex');
            navigator.clipboard.writeText(hexCode).then(() => {
                showNotification(`Copied ${hexCode} to clipboard!`);
            }).catch(() => {
                const textArea = document.createElement('textarea');
                textArea.value = hexCode;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                showNotification(`Copied ${hexCode} to clipboard!`);
            });
        });
    });
    
    function showNotification(message) {
        notification.textContent = message;
        notification.classList.add('show');
        
        setTimeout(() => {
            notification.classList.remove('show');
        }, 2000);
    }

    const sidebarItems = document.querySelectorAll('.sidebar li');
    
    sidebarItems.forEach(item => {
        item.addEventListener('click', function() {
            sidebarItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            

            const category = this.textContent.trim();
            console.log(`Clicked on: ${category}`);
        });
    });
    
    const chromeBtn = document.querySelector('.chrome-btn');
    
    chromeBtn.addEventListener('click', function() {
        alert('Add to Chrome feature coming soon! 🚀');
    });
    
    console.log('Color Hunt clone is ready! 🎨');
});
