document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const loginBtn = document.querySelector('.login-btn');
    const socialButtons = document.querySelectorAll('.social-btn');

    // Form validation
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function validatePassword(password) {
        return password.length >= 6;
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
        } else {
            clearError(this);
        }
    });

    // Form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        let isValid = true;

        // Clear previous errors
        clearError(emailInput);
        clearError(passwordInput);

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

        if (isValid) {
            // Show loading state
            loginBtn.classList.add('loading');
            loginBtn.textContent = 'Signing In...';
            
            // Simulate API call
            setTimeout(() => {
                // Reset button state
                loginBtn.classList.remove('loading');
                loginBtn.textContent = 'Sign In';
                
                // For demo purposes, show success message
                showSuccessMessage('Login successful! Redirecting...');
                
                // In a real application, you would:
                // 1. Send data to your authentication API
                // 2. Handle the response
                // 3. Redirect to dashboard or show error
                
                console.log('Login attempt:', { email, password: '***' });
            }, 2000);
        }
    });

    // Social login handlers
    socialButtons.forEach(button => {
        button.addEventListener('click', function() {
            const provider = this.classList.contains('google-btn') ? 'Google' : 'GitHub';
            showInfoMessage(`${provider} login clicked - integrate with OAuth provider`);
            
            // In a real application, you would:
            // 1. Redirect to OAuth provider
            // 2. Handle the callback
            // 3. Process the authentication result
            
            console.log(`${provider} login initiated`);
        });
    });

    // Forgot password handler
    document.querySelector('.forgot-password').addEventListener('click', function(e) {
        e.preventDefault();
        showInfoMessage('Forgot password clicked - implement password reset flow');
        
        // In a real application, you would:
        // 1. Show a modal or redirect to password reset page
        // 2. Send reset email
        // 3. Handle reset process
    });

    // Sign up link handler
    document.querySelector('.signup-link a').addEventListener('click', function(e) {
        e.preventDefault();
        showInfoMessage('Sign up clicked - redirect to registration page');
        
        // In a real application, you would:
        // 1. Redirect to registration page
        // 2. Or show registration modal
    });

    // Utility functions for showing messages
    function showSuccessMessage(message) {
        showMessage(message, 'success');
    }

    function showInfoMessage(message) {
        showMessage(message, 'info');
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
        }

        document.body.appendChild(messageDiv);

        // Auto remove after 3 seconds
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 3000);
    }

    // Remember me functionality
    const rememberCheckbox = document.getElementById('remember');
    
    // Load saved email if "remember me" was checked
    const savedEmail = localStorage.getItem('rememberedEmail');
    if (savedEmail) {
        emailInput.value = savedEmail;
        rememberCheckbox.checked = true;
    }

    // Save/clear email based on remember me checkbox
    rememberCheckbox.addEventListener('change', function() {
        if (!this.checked) {
            localStorage.removeItem('rememberedEmail');
        }
    });

    // Save email when form is submitted if remember me is checked
    loginForm.addEventListener('submit', function() {
        if (rememberCheckbox.checked) {
            localStorage.setItem('rememberedEmail', emailInput.value);
        }
    });

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
