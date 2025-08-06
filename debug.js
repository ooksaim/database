// Debug Utility for Authentication System
// This provides comprehensive logging and visual feedback for troubleshooting

class DebugLogger {
    constructor() {
        this.logs = [];
        this.debugMode = true; // Set to false to disable debugging
        this.createDebugPanel();
    }

    // Create visual debug panel
    createDebugPanel() {
        if (!this.debugMode) return;

        // Create debug panel container
        const debugPanel = document.createElement('div');
        debugPanel.id = 'debug-panel';
        debugPanel.innerHTML = `
            <div class="debug-header">
                <h3>🔧 Debug Console</h3>
                <button id="toggle-debug" class="debug-btn">Hide</button>
                <button id="clear-debug" class="debug-btn">Clear</button>
            </div>
            <div class="debug-content">
                <div class="debug-status">
                    <div class="status-item">
                        <span class="status-label">Subdomain:</span>
                        <span id="debug-subdomain" class="status-value">-</span>
                    </div>
                    <div class="status-item">
                        <span class="status-label">Database:</span>
                        <span id="debug-database" class="status-value">-</span>
                    </div>
                    <div class="status-item">
                        <span class="status-label">Connection:</span>
                        <span id="debug-connection" class="status-value">-</span>
                    </div>
                </div>
                <div id="debug-logs" class="debug-logs"></div>
            </div>
        `;

        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            #debug-panel {
                position: fixed;
                top: 10px;
                left: 10px;
                width: 400px;
                max-height: 500px;
                background: #1a1a1a;
                color: #00ff00;
                border: 1px solid #333;
                border-radius: 8px;
                font-family: 'Courier New', monospace;
                font-size: 12px;
                z-index: 10000;
                box-shadow: 0 4px 20px rgba(0,0,0,0.3);
            }
            
            .debug-header {
                background: #333;
                padding: 8px 12px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-bottom: 1px solid #555;
            }
            
            .debug-header h3 {
                margin: 0;
                font-size: 14px;
                color: #fff;
            }
            
            .debug-btn {
                background: #555;
                color: #fff;
                border: none;
                padding: 4px 8px;
                border-radius: 4px;
                cursor: pointer;
                font-size: 10px;
                margin-left: 5px;
            }
            
            .debug-btn:hover {
                background: #666;
            }
            
            .debug-content {
                padding: 12px;
                max-height: 400px;
                overflow-y: auto;
            }
            
            .debug-status {
                background: #262626;
                padding: 8px;
                border-radius: 4px;
                margin-bottom: 12px;
            }
            
            .status-item {
                display: flex;
                justify-content: space-between;
                margin-bottom: 4px;
            }
            
            .status-label {
                color: #888;
            }
            
            .status-value {
                color: #00ff00;
                font-weight: bold;
            }
            
            .status-value.error {
                color: #ff4444;
            }
            
            .status-value.warning {
                color: #ffaa00;
            }
            
            .debug-logs {
                background: #0a0a0a;
                padding: 8px;
                border-radius: 4px;
                max-height: 250px;
                overflow-y: auto;
            }
            
            .debug-log {
                margin-bottom: 6px;
                padding: 4px;
                border-left: 3px solid #555;
                padding-left: 8px;
            }
            
            .debug-log.success {
                border-left-color: #00ff00;
                color: #00ff00;
            }
            
            .debug-log.error {
                border-left-color: #ff4444;
                color: #ff4444;
            }
            
            .debug-log.warning {
                border-left-color: #ffaa00;
                color: #ffaa00;
            }
            
            .debug-log.info {
                border-left-color: #00aaff;
                color: #00aaff;
            }
            
            .debug-timestamp {
                color: #666;
                font-size: 10px;
            }
            
            .debug-panel-hidden {
                transform: translateX(-350px);
            }
        `;
        
        document.head.appendChild(style);
        document.body.appendChild(debugPanel);

        // Add event listeners
        document.getElementById('toggle-debug').addEventListener('click', () => {
            const panel = document.getElementById('debug-panel');
            const btn = document.getElementById('toggle-debug');
            if (panel.classList.contains('debug-panel-hidden')) {
                panel.classList.remove('debug-panel-hidden');
                btn.textContent = 'Hide';
            } else {
                panel.classList.add('debug-panel-hidden');
                btn.textContent = 'Show';
            }
        });

        document.getElementById('clear-debug').addEventListener('click', () => {
            this.clearLogs();
        });
    }

    // Update status indicators
    updateStatus(type, value, status = 'normal') {
        if (!this.debugMode) return;
        
        const element = document.getElementById(`debug-${type}`);
        if (element) {
            element.textContent = value;
            element.className = `status-value ${status}`;
        }
    }

    // Log messages with different levels
    log(message, level = 'info', data = null) {
        const timestamp = new Date().toLocaleTimeString();
        const logEntry = {
            timestamp,
            level,
            message,
            data
        };
        
        this.logs.push(logEntry);
        
        // Console log
        console.log(`[${level.toUpperCase()}] ${message}`, data || '');
        
        // Visual log
        if (this.debugMode) {
            this.addVisualLog(logEntry);
        }
    }

    // Add visual log entry
    addVisualLog(logEntry) {
        const logsContainer = document.getElementById('debug-logs');
        if (!logsContainer) return;

        const logDiv = document.createElement('div');
        logDiv.className = `debug-log ${logEntry.level}`;
        
        let dataStr = '';
        if (logEntry.data) {
            dataStr = `<br><span style="color: #666; font-size: 10px;">${JSON.stringify(logEntry.data, null, 2)}</span>`;
        }
        
        logDiv.innerHTML = `
            <span class="debug-timestamp">[${logEntry.timestamp}]</span> ${logEntry.message}${dataStr}
        `;
        
        logsContainer.appendChild(logDiv);
        logsContainer.scrollTop = logsContainer.scrollHeight;
    }

    // Clear all logs
    clearLogs() {
        this.logs = [];
        const logsContainer = document.getElementById('debug-logs');
        if (logsContainer) {
            logsContainer.innerHTML = '';
        }
    }

    // Convenience methods
    success(message, data) { this.log(message, 'success', data); }
    error(message, data) { this.log(message, 'error', data); }
    warning(message, data) { this.log(message, 'warning', data); }
    info(message, data) { this.log(message, 'info', data); }

    // Test connection to database
    async testDatabaseConnection(supabase, config) {
        this.info('🔌 Testing database connection...');
        
        try {
            // Test basic connection
            const { data, error } = await supabase
                .from('users')
                .select('count', { count: 'exact', head: true });
            
            if (error) {
                this.error('❌ Database connection failed', error);
                this.updateStatus('connection', 'Failed', 'error');
                return false;
            } else {
                this.success('✅ Database connection successful');
                this.updateStatus('connection', 'Connected', 'success');
                
                // Test table access
                this.info('📋 Testing users table access...');
                const { data: tableData, error: tableError } = await supabase
                    .from('users')
                    .select('*')
                    .limit(1);
                
                if (tableError) {
                    this.warning('⚠️ Users table access issue', tableError);
                } else {
                    this.success('✅ Users table accessible');
                }
                
                return true;
            }
        } catch (err) {
            this.error('❌ Connection test failed', err);
            this.updateStatus('connection', 'Error', 'error');
            return false;
        }
    }

    // Test authentication
    async testAuth(supabase, email, password, mode = 'login') {
        this.info(`🔐 Testing ${mode} authentication for: ${email}`);
        
        try {
            if (mode === 'login') {
                // Test Supabase Auth login
                this.info('📝 Attempting Supabase Auth login...');
                const { data, error } = await supabase.auth.signInWithPassword({
                    email: email,
                    password: password
                });
                
                if (error) {
                    this.warning('⚠️ Supabase Auth failed, trying custom table...', error.message);
                    
                    // Test custom table login
                    this.info('📋 Attempting custom users table lookup...');
                    const { data: userData, error: userError } = await supabase
                        .from('users')
                        .select('*')
                        .eq('email', email)
                        .eq('password', password)
                        .single();
                    
                    if (userError || !userData) {
                        this.error('❌ Custom table authentication failed', userError);
                        return { success: false, method: 'none', error: userError };
                    } else {
                        this.success('✅ Custom table authentication successful');
                        return { success: true, method: 'custom', data: userData };
                    }
                } else {
                    this.success('✅ Supabase Auth login successful');
                    return { success: true, method: 'supabase', data: data };
                }
            } else if (mode === 'signup') {
                // Test signup
                this.info('📝 Attempting user registration...');
                const { data, error } = await supabase.auth.signUp({
                    email: email,
                    password: password
                });
                
                if (error) {
                    this.error('❌ Supabase Auth signup failed', error.message);
                    return { success: false, method: 'none', error: error };
                } else {
                    this.success('✅ Supabase Auth signup successful');
                    
                    // Also try to insert into custom table
                    this.info('📋 Inserting into custom users table...');
                    const { data: userData, error: userError } = await supabase
                        .from('users')
                        .insert([{ email: email, password: password }]);
                    
                    if (userError) {
                        this.warning('⚠️ Custom table insert failed (but Auth signup succeeded)', userError);
                    } else {
                        this.success('✅ Custom table insert successful');
                    }
                    
                    return { success: true, method: 'supabase', data: data };
                }
            }
        } catch (err) {
            this.error(`❌ ${mode} test failed`, err);
            return { success: false, method: 'none', error: err };
        }
    }
}

// Create global debug instance
window.AuthDebugger = new DebugLogger();
