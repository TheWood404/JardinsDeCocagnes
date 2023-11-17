const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const child_process = require('child_process');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};

app.use(cors(corsOptions));

const port = 3001;

const db = mysql.createConnection({
  host: '163.5.142.26',
  user: 'sae5JUV',
  password: 'JulesUgoVictor*',
  database: 'sae5juv'
});

db.connect(err => {
  if (err) {
    console.error('Erreur de connexion à la base de données :', err);
  } else {
    console.log('Connecté à la base de données');
  }
});

app.post('/api/connexion', (req, res) => {
  const { mail, mdp_espace_client } = req.body;
  const sql = 'SELECT COUNT(*) AS count FROM adherent WHERE mail = ? AND mdp_espace_client = ?';
  db.query(sql, [mail, mdp_espace_client], (err, result) => {
    if (err) {
      console.error('Erreur lors de la vérification de la connexion :', err);
      return res.status(500).json({ success: false, message: 'Erreur interne du serveur' });
    }
    const userExists = result[0].count > 0;
    return res.json({ success: true, userExists });
  });
});

app.get('/api/coordonneespointdedepot', (req, res) => {
  const sql = 'SELECT ST_X(coordonnees) AS longitude, ST_Y(coordonnees) AS latitude FROM point_de_depot';
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Erreur lors de la récupération des coordonnées des points de dépôt :', err);
      return res.status(500).json({ success: false, message: 'Erreur interne du serveur' });
    }
    return res.json({ success: true, coordonnees: result });
  }
  );
});

app.post('/api/connexionstructure', (req, res) => {
  const { id, num_identification } = req.body;
  const sql = 'SELECT * FROM structure WHERE id = ? AND num_identification = ?';
  db.query(sql, [id, num_identification], (err, result) => {
    if (err) {
      console.error('Erreur lors de la vérification de la connexion :', err);
      return res.status(500).json({ success: false, message: 'Erreur interne du serveur' });
    }
    
    const userExists = result.length > 0; // Vérifiez si des résultats ont été renvoyés

    return res.json({ success: true, userExists });
  });
});



app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);

  // Exécute npm start de App.js dans un processus enfant
  const child = child_process.spawn('npm', ['start'], {
    cwd: __dirname, // Assurez-vous que le répertoire de travail est correct
    shell: true // Utilisez un shell pour exécuter la commande
  });

  child.stdout.on('data', (data) => {
    console.log(`Sortie de npm start : ${data}`);
  });

  child.stderr.on('data', (data) => {
    console.error(`Erreur de npm start : ${data}`);
  });

  child.on('close', (code) => {
    console.log(`npm start a été fermé avec le code ${code}`);
  });
});
