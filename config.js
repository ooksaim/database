// Environment Configuration Loader
// This file provides configuration for different subdomains
// Update the values below with your actual Supabase credentials

class EnvironmentConfig {
    constructor() {
        this.config = {
            database1: {
                url: 'https://rbyvbltiagujmekpsmqt.supabase.co',
                anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJieXZibHRpYWd1am1la3BzbXF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ1MDEwMjcsImV4cCI6MjA3MDA3NzAyN30.Pn9hBeCaKPdHAKrxtWi2yKP_TQ5bRADnLDl_1BPp_n8',
                name: 'database-1'
            },
            database2: {
                url: 'https://wgavcupcnbpsgngtxyfc.supabase.co',
                anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndnYXZjdXBjbmJwc2duZ3R4eWZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ1MDEwNjIsImV4cCI6MjA3MDA3NzA2Mn0.C7zbzDZIU0IvR1qwse2Z4gwzdYvRPsfpdywfTKcM-TQ',
                name: 'database-2'
            },
            development: {
                url: 'https://rbyvbltiagujmekpsmqt.supabase.co',
                anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJieXZibHRpYWd1am1la3BzbXF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ1MDEwMjcsImV4cCI6MjA3MDA3NzAyN30.Pn9hBeCaKPdHAKrxtWi2yKP_TQ5bRADnLDl_1BPp_n8',
                name: 'database-1 (Development)'
            }
        };
    }

    getSupabaseConfig(hostname = window.location.hostname) {
        let selectedConfig;
        
        switch (hostname) {
            case '1.upscalingmedia.live':
                selectedConfig = this.config.database1;
                break;
            
            case '2.upscalingmedia.live':
                selectedConfig = this.config.database2;
                break;
            
            default:
                // Fallback for localhost, development, or other domains
                console.log('Using development configuration for hostname:', hostname);
                selectedConfig = this.config.development;
                break;
        }

        // Validate configuration
        if (!this.validateConfig(selectedConfig)) {
            console.warn('Configuration not properly set up. Please update config.js with your Supabase credentials.');
        }

        return selectedConfig;
    }

    // Method to update configuration at runtime (useful for testing)
    updateConfig(database, newConfig) {
        if (this.config[database]) {
            this.config[database] = { ...this.config[database], ...newConfig };
        }
    }

    // Method to validate configuration
    validateConfig(config) {
        const required = ['url', 'anonKey', 'name'];
        const hasValidValues = required.every(key => {
            const value = config[key];
            return value && 
                   value !== `your-${key.replace('Key', '-key')}` && 
                   value !== `your-project-1-id.supabase.co` &&
                   value !== `your-project-2-id.supabase.co`;
        });
        return hasValidValues;
    }

    // Get all configurations (useful for debugging)
    getAllConfigs() {
        return this.config;
    }

    // Method to set configuration from external source (like environment variables)
    setConfigFromEnv(envVars) {
        if (envVars.DATABASE_1_URL) {
            this.config.database1.url = envVars.DATABASE_1_URL;
        }
        if (envVars.DATABASE_1_ANON_KEY) {
            this.config.database1.anonKey = envVars.DATABASE_1_ANON_KEY;
        }
        if (envVars.DATABASE_1_NAME) {
            this.config.database1.name = envVars.DATABASE_1_NAME;
        }
        
        if (envVars.DATABASE_2_URL) {
            this.config.database2.url = envVars.DATABASE_2_URL;
        }
        if (envVars.DATABASE_2_ANON_KEY) {
            this.config.database2.anonKey = envVars.DATABASE_2_ANON_KEY;
        }
        if (envVars.DATABASE_2_NAME) {
            this.config.database2.name = envVars.DATABASE_2_NAME;
        }

        if (envVars.DEV_DATABASE_URL) {
            this.config.development.url = envVars.DEV_DATABASE_URL;
        }
        if (envVars.DEV_DATABASE_ANON_KEY) {
            this.config.development.anonKey = envVars.DEV_DATABASE_ANON_KEY;
        }
        if (envVars.DEV_DATABASE_NAME) {
            this.config.development.name = envVars.DEV_DATABASE_NAME;
        }
    }
}

// Create global instance
window.EnvironmentConfig = new EnvironmentConfig();
