// Sample Configuration File
// Copy this to config.js and update with your actual Supabase credentials
// This file is for reference only - do not commit actual credentials to git

class EnvironmentConfig {
    constructor() {
        this.config = {
            database1: {
                url: 'https://abcdef123456.supabase.co',  // Replace with your Database 1 URL
                anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...', // Replace with your Database 1 anon key
                name: 'Production Database'  // Custom name for Database 1
            },
            database2: {
                url: 'https://xyz789012345.supabase.co',  // Replace with your Database 2 URL
                anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...', // Replace with your Database 2 anon key
                name: 'Testing Database'  // Custom name for Database 2
            },
            development: {
                url: 'https://localhost12345.supabase.co',  // Replace with your Dev Database URL
                anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...', // Replace with your Dev Database anon key
                name: 'Development Database'  // Custom name for Development
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
                console.log('Using development configuration for hostname:', hostname);
                selectedConfig = this.config.development;
                break;
        }

        if (!this.validateConfig(selectedConfig)) {
            console.warn('Configuration not properly set up. Please update config.js with your Supabase credentials.');
        }

        return selectedConfig;
    }

    updateConfig(database, newConfig) {
        if (this.config[database]) {
            this.config[database] = { ...this.config[database], ...newConfig };
        }
    }

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

    getAllConfigs() {
        return this.config;
    }

    setConfigFromEnv(envVars) {
        if (envVars.DATABASE_1_URL) this.config.database1.url = envVars.DATABASE_1_URL;
        if (envVars.DATABASE_1_ANON_KEY) this.config.database1.anonKey = envVars.DATABASE_1_ANON_KEY;
        if (envVars.DATABASE_1_NAME) this.config.database1.name = envVars.DATABASE_1_NAME;
        
        if (envVars.DATABASE_2_URL) this.config.database2.url = envVars.DATABASE_2_URL;
        if (envVars.DATABASE_2_ANON_KEY) this.config.database2.anonKey = envVars.DATABASE_2_ANON_KEY;
        if (envVars.DATABASE_2_NAME) this.config.database2.name = envVars.DATABASE_2_NAME;

        if (envVars.DEV_DATABASE_URL) this.config.development.url = envVars.DEV_DATABASE_URL;
        if (envVars.DEV_DATABASE_ANON_KEY) this.config.development.anonKey = envVars.DEV_DATABASE_ANON_KEY;
        if (envVars.DEV_DATABASE_NAME) this.config.development.name = envVars.DEV_DATABASE_NAME;
    }
}

window.EnvironmentConfig = new EnvironmentConfig();
