const tls = require('tls');

// Domain name of the server
const domain = 'portfolio-4911e.web.app';

// Connect to the server
const socket = tls.connect(443, domain, () => {
    // Retrieve the SSL certificate
    const certificate = socket.getPeerCertificate();
    
    // Log SSL information
    console.log('Subject:', certificate.subject);
    console.log('Issuer:', certificate.issuer);
    console.log('Valid From:', certificate.valid_from);
    console.log('Valid To:', certificate.valid_to);
    
    // Close the connection
    socket.end();
});

// Handle errors
socket.on('error', (error) => {
    console.error('Error:', error);
});
