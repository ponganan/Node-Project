const crypto = require('crypto');

// Function to generate a random string secret
function generateSecretString() {
    // Generate 32 random bytes (256 bits)
    const randomBytes = crypto.randomBytes(32);
    // Convert to hexadecimal string (optional, adjust encoding if needed)
    return randomBytes.toString('hex');
}

// Generate a sample secret
const secret = generateSecretString();
console.log('Generated Secret:', secret); // Example output: 42c872f... (32 hexadecimal characters)