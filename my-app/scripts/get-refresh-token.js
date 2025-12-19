const querystring = require('querystring');
const https = require('https');
const readline = require('readline');

// CONFIGURATION
const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = 'http://127.0.0.1:3000';
const SCOPES = 'user-read-currently-playing user-read-recently-played user-top-read';

if (!CLIENT_ID || !CLIENT_SECRET) {
    console.error('Error: Please set SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET environment variables before running this script.');
    console.error('Example (Windows Powershell):');
    console.error('$env:SPOTIFY_CLIENT_ID="your_id"; $env:SPOTIFY_CLIENT_SECRET="your_secret"; node scripts/get-refresh-token.js');
    process.exit(1);
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const authUrl = 'https://accounts.spotify.com/authorize?' + querystring.stringify({
    response_type: 'code',
    client_id: CLIENT_ID,
    scope: SCOPES,
    redirect_uri: REDIRECT_URI,
});

console.log('----------------------------------------------------------');
console.log('1. Visit this URL to authorize the app:');
console.log(authUrl);
console.log('----------------------------------------------------------');
console.log('2. After authorizing, you will be redirected to localhost (page might fail to load, that is OK).');
console.log('3. Copy the "code" parameter from the URL in your browser address bar.');
console.log('   (e.g., http://localhost:3000/?code=NApCCg..&state=...)');
console.log('----------------------------------------------------------');

rl.question('Enter the code from the URL (or paste the full URL): ', (input) => {
    let code = input.trim();
    // If user pastes full URL, extract the code
    try {
        if (code.includes('http') || code.includes('?')) {
            const urlObj = new URL(code);
            const extracted = urlObj.searchParams.get('code');
            if (extracted) {
                code = extracted;
                console.log('Extracted code from URL...');
            }
        }
    } catch (e) {
        // ignore
    }

    const postData = querystring.stringify({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: REDIRECT_URI,
    });

    const authHeader = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');

    const options = {
        hostname: 'accounts.spotify.com',
        path: '/api/token',
        method: 'POST',
        headers: {
            'Authorization': `Basic ${authHeader}`,
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': postData.length
        }
    };

    const req = https.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => { data += chunk; });
        res.on('end', () => {
            try {
                const response = JSON.parse(data);
                if (response.refresh_token) {
                    console.log('\nSUCCESS! Here is your Refresh Token:');
                    console.log('----------------------------------------------------------');
                    console.log(response.refresh_token);
                    console.log('----------------------------------------------------------');
                    console.log('Add this to your .env.local file as SPOTIFY_REFRESH_TOKEN');
                    console.log('Note: This token is valid for deployment. You do not need to change the redirect URI for production.');
                } else {
                    console.error('\nERROR: Failed to get token.');
                    console.error('Status:', res.statusCode);
                    console.error('Response:', JSON.stringify(response, null, 2));
                    console.error('----------------------------------------------------------');
                    console.error('Common causes:');
                    console.error('1. "invalid_grant": The code expired or was already used. Generate a NEW code.');
                    console.error('2. "redirect_uri_mismatch": Your dashboard URI does not match exactly: ' + REDIRECT_URI);
                }
            } catch (e) {
                console.error('Error parsing response:', e);
                console.error('Raw Data:', data);
            }
            rl.close();
        });
    });

    req.on('error', (e) => {
        console.error('Request error:', e);
        rl.close();
    });

    req.write(postData);
    req.end();
});
