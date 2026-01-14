// URL Shortener Script

// Storage key for localStorage
const STORAGE_KEY = 'urlShortenerData';

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    loadHistory();
    
    // Allow Enter key to submit
    document.getElementById('longUrl').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            shortenUrl();
        }
    });
});

// Generate a short code
function generateShortCode() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let shortCode = '';
    for (let i = 0; i < 6; i++) {
        shortCode += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return shortCode;
}

// Validate URL
function isValidUrl(string) {
    try {
        const url = new URL(string);
        return url.protocol === 'http:' || url.protocol === 'https:';
    } catch (_) {
        return false;
    }
}

// Shorten URL
function shortenUrl() {
    const longUrlInput = document.getElementById('longUrl');
    const longUrl = longUrlInput.value.trim();
    
    // Validate URL
    if (!longUrl) {
        showNotification('Please enter a URL', 'error');
        return;
    }
    
    if (!isValidUrl(longUrl)) {
        showNotification('Please enter a valid URL (must start with http:// or https://)', 'error');
        return;
    }
    
    // Generate short code
    const shortCode = generateShortCode();
    const shortUrl = `${window.location.origin}/s/${shortCode}`;
    
    // Save to storage
    saveUrl(shortCode, longUrl, shortUrl);
    
    // Display result
    displayResult(shortUrl, longUrl);
    
    // Clear input
    longUrlInput.value = '';
    
    // Update history
    loadHistory();
    
    showNotification('URL shortened successfully!');
}

// Display the shortened URL result
function displayResult(shortUrl, longUrl) {
    const resultDiv = document.getElementById('result');
    const shortUrlInput = document.getElementById('shortUrl');
    const originalUrlLink = document.getElementById('originalUrl');
    
    shortUrlInput.value = shortUrl;
    originalUrlLink.href = longUrl;
    originalUrlLink.textContent = longUrl.length > 50 ? longUrl.substring(0, 50) + '...' : longUrl;
    
    resultDiv.classList.remove('hidden');
}

// Copy to clipboard
function copyToClipboard() {
    const shortUrlInput = document.getElementById('shortUrl');
    shortUrlInput.select();
    shortUrlInput.setSelectionRange(0, 99999); // For mobile devices
    
    navigator.clipboard.writeText(shortUrlInput.value).then(() => {
        showNotification('Copied to clipboard!');
    }).catch(err => {
        // Fallback for older browsers
        document.execCommand('copy');
        showNotification('Copied to clipboard!');
    });
}

// Save URL to localStorage
function saveUrl(shortCode, longUrl, shortUrl) {
    const data = getStorageData();
    
    const urlData = {
        shortCode: shortCode,
        shortUrl: shortUrl,
        longUrl: longUrl,
        createdAt: new Date().toISOString()
    };
    
    data.urls.unshift(urlData); // Add to beginning
    
    // Keep only last 10 URLs
    if (data.urls.length > 10) {
        data.urls = data.urls.slice(0, 10);
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// Get data from localStorage
function getStorageData() {
    const dataStr = localStorage.getItem(STORAGE_KEY);
    if (dataStr) {
        return JSON.parse(dataStr);
    }
    return { urls: [] };
}

// Load and display history
function loadHistory() {
    const data = getStorageData();
    const historyList = document.getElementById('historyList');
    
    if (data.urls.length === 0) {
        historyList.innerHTML = '<p class="no-history">No URLs shortened yet</p>';
        return;
    }
    
    historyList.innerHTML = '';
    
    data.urls.forEach((urlData, index) => {
        const historyItem = createHistoryItem(urlData, index);
        historyList.appendChild(historyItem);
    });
}

// Create history item element
function createHistoryItem(urlData, index) {
    const item = document.createElement('div');
    item.className = 'history-item';
    
    const header = document.createElement('div');
    header.className = 'history-item-header';
    
    const shortUrlSpan = document.createElement('span');
    shortUrlSpan.className = 'history-item-short';
    shortUrlSpan.textContent = urlData.shortUrl;
    
    const actions = document.createElement('div');
    actions.className = 'history-item-actions';
    
    const copyBtn = document.createElement('button');
    copyBtn.textContent = '📋 Copy';
    copyBtn.onclick = () => copyHistoryUrl(urlData.shortUrl);
    
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = '🗑️ Delete';
    deleteBtn.onclick = () => deleteHistoryItem(index);
    
    actions.appendChild(copyBtn);
    actions.appendChild(deleteBtn);
    
    header.appendChild(shortUrlSpan);
    header.appendChild(actions);
    
    const originalUrlDiv = document.createElement('div');
    originalUrlDiv.className = 'history-item-original';
    originalUrlDiv.textContent = `➜ ${urlData.longUrl}`;
    
    item.appendChild(header);
    item.appendChild(originalUrlDiv);
    
    return item;
}

// Copy URL from history
function copyHistoryUrl(shortUrl) {
    navigator.clipboard.writeText(shortUrl).then(() => {
        showNotification('Copied to clipboard!');
    }).catch(err => {
        showNotification('Failed to copy', 'error');
    });
}

// Delete history item
function deleteHistoryItem(index) {
    const data = getStorageData();
    data.urls.splice(index, 1);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    loadHistory();
    showNotification('URL deleted');
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = 'notification';
    
    if (type === 'error') {
        notification.classList.add('error');
    }
    
    notification.classList.remove('hidden');
    
    setTimeout(() => {
        notification.classList.add('hidden');
    }, 3000);
}
