const express = require('express');
const fetch = require('node-fetch'); // Now this will work with node-fetch v2
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = 3000;

const API_KEY = process.env.API_KEY;
const SPREADSHEET_ID = process.env.SPREADSHEET_ID;

app.get('/api/sheet-data', async (req, res) => {
    const range = 'Sheet1!A1:C10';  // Adjust range as necessary
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${range}?key=${API_KEY}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (!data.values) {
            return res.status(404).json({ error: 'No data found' });
        }
        res.json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
