// Simple Debug Logger for Authentication System
console.log('Debug script loading...');

window.SimpleDebugLogger = {
    logs: [],
    panel: null,
    
    init: function() {
        try {
            console.log('Initializing debug logger...');
            this.createPanel();
            this.log('Debug system initialized', 'info');
            this.updateStatus('System', 'Ready');
        } catch (error) {
            console.error('Debug init error:', error);
        }
    },
    
    createPanel: function() {
        // Remove existing panel
        const existing = document.getElementById('simple-debug-panel');
        if (existing) existing.remove();
        
        // Create panel
        this.panel = document.createElement('div');
        this.panel.id = 'simple-debug-panel';
        this.panel.innerHTML = `
            <div style="background: #000; color: #0f0; padding: 10px; position: fixed; top: 10px; left: 10px; width: 300px; border: 1px solid #333; font-family: monospace; font-size: 12px; z-index: 99999; border-radius: 5px;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 10px; border-bottom: 1px solid #333; padding-bottom: 5px;">
                    <strong>Debug Console</strong>
                    <button onclick="window.SimpleDebugLogger.toggle()" style="background: #333; color: #fff; border: none; padding: 2px 8px; cursor: pointer;">Hide</button>
                </div>
                <div id="debug-status" style="margin-bottom: 10px; background: #111; padding: 5px;">
                    <div>Status: <span id="status-text">Starting...</span></div>
                    <div>Database: <span id="db-status">Unknown</span></div>
                    <div>User: <span id="user-status">Not logged in</span></div>
                </div>
                <div id="debug-logs" style="background: #111; padding: 5px; max-height: 200px; overflow-y: auto;">
                    <div style="color: #0f0;">Debug panel created successfully!</div>
                </div>
            </div>
        `;
        
        document.body.appendChild(this.panel);
        console.log('Debug panel created and added to page');
    },
    
    log: function(message, type = 'info') {
        const timestamp = new Date().toLocaleTimeString();
        const logEntry = { message, type, timestamp };
        this.logs.push(logEntry);
        
        console.log(`[DEBUG ${type.toUpperCase()}] ${message}`);
        
        const logsContainer = document.getElementById('debug-logs');
        if (logsContainer) {
            const colors = {
                info: '#0af',
                success: '#0f0',
                error: '#f44',
                warning: '#fa0'
            };
            
            const logDiv = document.createElement('div');
            logDiv.style.color = colors[type] || '#fff';
            logDiv.style.marginBottom = '3px';
            logDiv.innerHTML = `[${timestamp}] ${message}`;
            
            logsContainer.appendChild(logDiv);
            logsContainer.scrollTop = logsContainer.scrollHeight;
        }
    },
    
    updateStatus: function(key, value) {
        console.log(`Status update: ${key} = ${value}`);
        
        if (key === 'System') {
            const statusEl = document.getElementById('status-text');
            if (statusEl) statusEl.textContent = value;
        } else if (key === 'Database') {
            const dbEl = document.getElementById('db-status');
            if (dbEl) dbEl.textContent = value;
        } else if (key === 'User') {
            const userEl = document.getElementById('user-status');
            if (userEl) userEl.textContent = value;
        }
    },
    
    toggle: function() {
        if (this.panel) {
            this.panel.style.display = this.panel.style.display === 'none' ? 'block' : 'none';
        }
    }
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        console.log('DOM loaded, initializing debug logger...');
        window.SimpleDebugLogger.init();
    });
} else {
    console.log('DOM already ready, initializing debug logger immediately...');
    window.SimpleDebugLogger.init();
}

// Also try after a short delay to ensure everything is loaded
setTimeout(function() {
    if (!document.getElementById('simple-debug-panel')) {
        console.log('Panel not found, trying to create again...');
        window.SimpleDebugLogger.init();
    }
}, 1000);

console.log('Debug script loaded completely');
