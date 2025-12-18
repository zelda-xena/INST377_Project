const express = require('express');
const bodyParser = require('body-parser');
const supabaseClient = require('@supabase/supabase-js');
const dotenv = require('dotenv');

const app = express();
const port = 5500;
dotenv.config();

app.use(bodyParser.json());
app.use(express.static(__dirname));

// Initialize Supabase Client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = supabaseClient.createClient(supabaseUrl, supabaseKey);

// root page
app.get('/', (req, res) => {
  res.sendFile('welcome.html', { root: __dirname + '/project'});
});

// ingredient page
app.get('/ingredient', (req, res) => {
  res.sendFile('ingredient.html', { root: __dirname + '/project'});
});

// result + ingredient page
app.get('/result', (req, res) => {
  res.sendFile('result.html', { root: __dirname + '/project'});
});

// result + surprise page
app.get('/result-surprise', (req, res) => {
  res.sendFile('result_surprise.html', { root: __dirname + '/project'});
});

// GET drinks
app.get('/drinks', async (req, res) => {
  console.log('Attempting to GET all drinks');

  const { data, error } = await supabase.from('drinks').select();
  
  if (error) {
    console.log(`Error: ${error}`);
    res.statusCode = 500;
    res.send(error);
    return;
  } else {
    res.send(data);
  }
});

// POST drinks
app.post('/drinks', async (req, res) => {
  console.log('Adding drink');
  console.log('Request:', req.body);

  const {drink_name, drink_img, drink_instructions, drink_ingredients} = req.body;

  const { data, error } = await supabase
    .from('drinks')
    .insert([{
      drink_name,
      drink_img,
      drink_instructions,
      drink_ingredients
    }])
    .select();

    if (error) {
      console.error(`Error: `, error.message);
      return res.status(500).json({error : error.message});
    }

    res.json(data);
  });

app.listen(port, () => {
  console.log('App is available on port:', port);
});