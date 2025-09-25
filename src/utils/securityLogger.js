const fs = require('fs');
const path = require('path');

const logDir = path.join(__dirname, '../../logs');
const securityLogFile = path.join(logDir, 'security.log');

// Asegurar que el directorio de logs existe
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
}

const logSecurityEvent = (event, details = {}) => {
    const timestamp = new Date().toISOString();
    const logEntry = {
        timestamp,
        event,
        details: {
            ...details,
            // Remover datos sensibles de los logs
            password: details.password ? '[REDACTED]' : undefined,
            token: details.token ? '[REDACTED]' : undefined,
            email: details.email ? details.email.replace(/(.{2}).*(@.*)/, '$1***$2') : undefined,
        }
    };

    const logLine = JSON.stringify(logEntry) + '\n';
    
    try {
        fs.appendFileSync(securityLogFile, logLine);
    } catch (error) {
        console.error('Error writing to security log:', error.message);
    }
};

const logFailedLogin = (email, ip, userAgent) => {
    logSecurityEvent('FAILED_LOGIN_ATTEMPT', {
        email,
        ip,
        userAgent,
        severity: 'HIGH'
    });
};

const logSuccessfulLogin = (userId, email, ip) => {
    logSecurityEvent('SUCCESSFUL_LOGIN', {
        userId,
        email,
        ip,
        severity: 'INFO'
    });
};

const logRegistration = (userId, email, ip) => {
    logSecurityEvent('USER_REGISTRATION', {
        userId,
        email,
        ip,
        severity: 'INFO'
    });
};

const logSecurityError = (error, context = {}) => {
    logSecurityEvent('SECURITY_ERROR', {
        error: error.message,
        stack: error.stack,
        context,
        severity: 'HIGH'
    });
};

const logRateLimitExceeded = (ip, endpoint) => {
    logSecurityEvent('RATE_LIMIT_EXCEEDED', {
        ip,
        endpoint,
        severity: 'MEDIUM'
    });
};

module.exports = {
    logSecurityEvent,
    logFailedLogin,
    logSuccessfulLogin,
    logRegistration,
    logSecurityError,
    logRateLimitExceeded
};
