document.addEventListener('DOMContentLoaded', function() {
    // Initialize debugging
    window.AuthDebugger.info('🚀 Signup page loaded');
    window.AuthDebugger.updateStatus('subdomain', window.location.hostname);
    
    const signupForm = document.getElementById('signupForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const termsCheckbox = document.getElementById('terms');
    const signupBtn = document.querySelector('.login-btn');
    const socialButtons = document.querySelectorAll('.social-btn');

    // Get Supabase configuration from environment config
    window.AuthDebugger.info('🔧 Loading Supabase configuration...');
    const supabaseConfig = window.EnvironmentConfig.getSupabaseConfig();
    
    // Update debug status
    window.AuthDebugger.updateStatus('database', supabaseConfig.name);
    window.AuthDebugger.info('📋 Configuration loaded', {
        database: supabaseConfig.name,
        url: supabaseConfig.url.substring(0, 30) + '...',
        hostname: window.location.hostname
    });
    
    // Validate configuration
    if (!window.EnvironmentConfig.validateConfig(supabaseConfig)) {
        window.AuthDebugger.error('❌ Supabase configuration validation failed');
        window.AuthDebugger.updateStatus('connection', 'Config Error', 'error');
        console.error('Supabase configuration is not properly set up. Please update config.js');
        showErrorMessage('Configuration error. Please check the setup.');
    } else {
        window.AuthDebugger.success('✅ Configuration validation passed');
    }
    
    // Initialize Supabase client
    window.AuthDebugger.info('🔌 Initializing Supabase client...');
    const supabase = window.supabase.createClient(supabaseConfig.url, supabaseConfig.anonKey);
    
    // Test database connection
    window.AuthDebugger.testDatabaseConnection(supabase, supabaseConfig);
    
    // Update page title to show which database
    document.getElementById('signupTitle').textContent = `Create Account for ${supabaseConfig.name}`;
    document.getElementById('signupSubtitle').textContent = `Join ${supabaseConfig.name} today`;
    
    // Add debug info to console
    console.log('Signup for:', supabaseConfig.name);
    console.log('Hostname:', window.location.hostname);

    // Form validation functions
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function validatePassword(password) {
        return password.length >= 6;
    }

    function validatePasswordMatch(password, confirmPassword) {
        return password === confirmPassword;
    }

    function showError(input, message) {
        input.classList.add('error');
        
        // Remove existing error message
        const existingError = input.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Add new error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.color = '#ef4444';
        errorDiv.style.fontSize = '12px';
        errorDiv.style.marginTop = '4px';
        errorDiv.textContent = message;
        input.parentNode.appendChild(errorDiv);
    }

    function clearError(input) {
        input.classList.remove('error');
        const errorMessage = input.parentNode.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    }

    // Real-time validation
    emailInput.addEventListener('input', function() {
        if (this.value) {
            if (validateEmail(this.value)) {
                clearError(this);
            }
        } else {
            clearError(this);
        }
    });

    passwordInput.addEventListener('input', function() {
        if (this.value) {
            if (validatePassword(this.value)) {
                clearError(this);
            }
            // Also validate confirm password if it has a value
            if (confirmPasswordInput.value) {
                if (validatePasswordMatch(this.value, confirmPasswordInput.value)) {
                    clearError(confirmPasswordInput);
                } else {
                    showError(confirmPasswordInput, 'Passwords do not match');
                }
            }
        } else {
            clearError(this);
        }
    });

    confirmPasswordInput.addEventListener('input', function() {
        if (this.value) {
            if (validatePasswordMatch(passwordInput.value, this.value)) {
                clearError(this);
            } else {
                showError(this, 'Passwords do not match');
            }
        } else {
            clearError(this);
        }
    });

    // Form submission
    signupForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        const termsAccepted = termsCheckbox.checked;
        let isValid = true;

        // Clear previous errors
        clearError(emailInput);
        clearError(passwordInput);
        clearError(confirmPasswordInput);

        // Validate email
        if (!email) {
            showError(emailInput, 'Email is required');
            isValid = false;
        } else if (!validateEmail(email)) {
            showError(emailInput, 'Please enter a valid email address');
            isValid = false;
        }

        // Validate password
        if (!password) {
            showError(passwordInput, 'Password is required');
            isValid = false;
        } else if (!validatePassword(password)) {
            showError(passwordInput, 'Password must be at least 6 characters');
            isValid = false;
        }

        // Validate confirm password
        if (!confirmPassword) {
            showError(confirmPasswordInput, 'Please confirm your password');
            isValid = false;
        } else if (!validatePasswordMatch(password, confirmPassword)) {
            showError(confirmPasswordInput, 'Passwords do not match');
            isValid = false;
        }

        // Validate terms
        if (!termsAccepted) {
            showErrorMessage('Please accept the Terms & Conditions');
            isValid = false;
        }

        if (isValid) {
            // Show loading state
            signupBtn.classList.add('loading');
            signupBtn.textContent = 'Creating Account...';
            
            window.AuthDebugger.info('📝 Starting signup process...', {
                email: email,
                database: supabaseConfig.name,
                hostname: window.location.hostname
            });
            
            try {
                // Use the debug test method for comprehensive logging
                const authResult = await window.AuthDebugger.testAuth(supabase, email, password, 'signup');
                
                if (authResult.success) {
                    // Successful signup
                    window.AuthDebugger.success(`✅ Signup successful via ${authResult.method} method`);
                    showSuccessMessage(`Account created successfully for ${supabaseConfig.name}!`);
                    
                    window.AuthDebugger.info('User data from signup', authResult.data);
                    
                    // Reset button state
                    signupBtn.classList.remove('loading');
                    signupBtn.textContent = 'Create Account';
                    
                    // Redirect to login page after 2 seconds
                    setTimeout(() => {
                        window.AuthDebugger.info('🔄 Redirecting to login page...');
                        window.location.href = '/index.html';
                    }, 2000);
                } else {
                    // Signup failed
                    window.AuthDebugger.error('❌ Signup failed', authResult.error);
                    
                    // Reset button state
                    signupBtn.classList.remove('loading');
                    signupBtn.textContent = 'Create Account';
                    
                    showErrorMessage(`Signup failed: ${authResult.error?.message || 'Unknown error'}`);
                }
            } catch (err) {
                // Reset button state
                signupBtn.classList.remove('loading');
                signupBtn.textContent = 'Create Account';
                
                showErrorMessage('Network error. Please try again.');
                console.error('Network error:', err);
            }
        }
    });

    // Social signup handlers
    socialButtons.forEach(button => {
        button.addEventListener('click', function() {
            const provider = this.classList.contains('google-btn') ? 'Google' : 'GitHub';
            showInfoMessage(`${provider} signup clicked - integrate with OAuth provider`);
            
            console.log(`${provider} signup initiated`);
        });
    });

    // Utility functions for showing messages
    function showSuccessMessage(message) {
        showMessage(message, 'success');
    }

    function showInfoMessage(message) {
        showMessage(message, 'info');
    }

    function showErrorMessage(message) {
        showMessage(message, 'error');
    }

    function showMessage(message, type) {
        // Remove existing messages
        const existingMessage = document.querySelector('.message');
        if (existingMessage) {
            existingMessage.remove();
        }

        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        messageDiv.textContent = message;
        
        // Style the message
        messageDiv.style.position = 'fixed';
        messageDiv.style.top = '20px';
        messageDiv.style.right = '20px';
        messageDiv.style.padding = '12px 20px';
        messageDiv.style.borderRadius = '8px';
        messageDiv.style.fontSize = '14px';
        messageDiv.style.fontWeight = '500';
        messageDiv.style.zIndex = '1000';
        messageDiv.style.maxWidth = '300px';
        messageDiv.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
        
        if (type === 'success') {
            messageDiv.style.backgroundColor = '#10b981';
            messageDiv.style.color = 'white';
        } else if (type === 'info') {
            messageDiv.style.backgroundColor = '#3b82f6';
            messageDiv.style.color = 'white';
        } else if (type === 'error') {
            messageDiv.style.backgroundColor = '#ef4444';
            messageDiv.style.color = 'white';
        }

        document.body.appendChild(messageDiv);

        // Auto remove after 4 seconds for errors, 3 seconds for others
        const timeout = type === 'error' ? 4000 : 3000;
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, timeout);
    }

    // Add smooth animations
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentNode.style.transform = 'translateY(-2px)';
        });
        
        input.addEventListener('blur', function() {
            this.parentNode.style.transform = 'translateY(0)';
        });
    });
});
