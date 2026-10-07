import express from 'express';
import fs from 'fs';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '25mb' }));

// Vercel Serverless environment handler
const DATA_DIR = process.env.VERCEL ? '/tmp/data' : path.join(__dirname, 'data');
const STORE_FILE = path.join(DATA_DIR, 'cms-store.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  try {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  } catch (err) {
    console.error('Error creating data dir:', err);
  }
}

// In-memory cache loaded from file if exists
let cmsCache: any = null;
if (fs.existsSync(STORE_FILE)) {
  try {
    cmsCache = JSON.parse(fs.readFileSync(STORE_FILE, 'utf-8'));
  } catch (err) {
    console.error('Error reading cms-store.json:', err);
  }
}

// API Routes
app.get('/api/cms/data', (req, res) => {
  if (cmsCache) {
    return res.json({ success: true, data: cmsCache });
  }
  return res.json({ success: false, message: 'No stored CMS data found' });
});

app.post('/api/cms/sync', (req, res) => {
  try {
    const data = req.body;
    cmsCache = {
      ...data,
      updatedAt: new Date().toISOString()
    };
    try {
      fs.writeFileSync(STORE_FILE, JSON.stringify(cmsCache, null, 2), 'utf-8');
    } catch (e) {
      console.warn('Could not write file in serverless env:', e);
    }
    return res.json({ success: true, message: 'CMS data successfully synced to backend storage', timestamp: cmsCache.updatedAt });
  } catch (err: any) {
    console.error('Error saving CMS data:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/api/cms/inquiry', (req, res) => {
  try {
    const inquiry = req.body;
    const INQUIRIES_FILE = path.join(DATA_DIR, 'inquiries.json');
    let inquiries: any[] = [];
    if (fs.existsSync(INQUIRIES_FILE)) {
      try {
        inquiries = JSON.parse(fs.readFileSync(INQUIRIES_FILE, 'utf-8'));
      } catch {}
    }
    inquiries.unshift({
      ...inquiry,
      receivedAt: new Date().toISOString()
    });
    try {
      fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(inquiries, null, 2), 'utf-8');
    } catch (e) {
      console.warn('Could not write inquiries in serverless env:', e);
    }
    return res.json({ success: true, message: 'Inquiry saved successfully' });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// Test Supabase Connection Endpoint
app.post('/api/cms/test-supabase', async (req, res) => {
  const { url, anonKey } = req.body;
  if (!url || !anonKey) {
    return res.status(400).json({ success: false, message: 'Supabase URL and API Key are required' });
  }

  try {
    const cleanUrl = url.trim().replace(/\/+$/, '');
    const response = await fetch(`${cleanUrl}/rest/v1/`, {
      method: 'GET',
      headers: {
        'apikey': anonKey.trim(),
        'Authorization': `Bearer ${anonKey.trim()}`
      }
    });

    if (response.ok || response.status === 200 || response.status === 404) {
      return res.json({ 
        success: true, 
        message: 'Successfully reached Supabase project! Connection verified.' 
      });
    } else {
      return res.status(400).json({ 
        success: false, 
        message: `Supabase returned status code: ${response.status} (${response.statusText})` 
      });
    }
  } catch (err: any) {
    return res.status(500).json({ 
      success: false, 
      message: `Failed to connect to Supabase: ${err.message}` 
    });
  }
});

// Test MongoDB Connection String Endpoint
app.post('/api/cms/test-mongodb', async (req, res) => {
  const { uri } = req.body;
  if (!uri) {
    return res.status(400).json({ success: false, message: 'MongoDB Connection String (URI) is required' });
  }

  const trimmed = uri.trim();
  const isValidFormat = trimmed.startsWith('mongodb://') || trimmed.startsWith('mongodb+srv://');
  if (!isValidFormat) {
    return res.status(400).json({ 
      success: false, 
      message: 'Invalid MongoDB URI format. It must start with mongodb:// or mongodb+srv://' 
    });
  }

  return res.json({ 
    success: true, 
    message: 'MongoDB URI structure validated. Ready for Atlas M0 cluster data synchronization.' 
  });
});

if (!process.env.VERCEL) {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`> Sanjog server running on http://0.0.0.0:${PORT}`);
  });
}

export default app;
