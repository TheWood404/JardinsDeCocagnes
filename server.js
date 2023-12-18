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
  const sql = 'SELECT COUNT(*) AS count, id_structure FROM adherent WHERE mail = ? AND mdp_espace_client = ?';
  db.query(sql, [mail, mdp_espace_client], (err, result) => {
    if (err) {
      console.error('Erreur lors de la vérification de la connexion :', err);
      return res.status(500).json({ success: false, message: 'Erreur interne du serveur' });
    }
    const userExists = result[0].count > 0;

    if (userExists) {
      const structId = result[0].id_structure;
      return res.json({ success: true, userExists, structId });
    } else {
      return res.json({ success: false, userExists, structId: null });
    }
  });
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

    if (userExists) {
      const userId = result[0].id; // Supposons que l'ID de l'utilisateur est stocké dans une colonne "id"
      return res.json({ success: true, userExists, userId });
    } else {
      return res.json({ success: true, userExists });
    }
  });
});

app.post('/api/deconnexion', (req, res) => {
  const { mail } = req.body;
  const sql = 'SELECT COUNT(*) AS count FROM adherent WHERE mail = ?';
  db.query(sql, [mail], (err, result) => {
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

app.post('/api/registerstructure', (req, res) => {
  const { nom_commercial, ville, raison_sociale, siege_social, adresse_de_gestion, coordonnees_commerciales, num_identification } = req.body;

  // Vérification si le num_identification existe dans la table num_structure et est libre (isCreate = 0)
  const sqlCheckStructure = 'SELECT * FROM num_structure WHERE num_identification = ? AND isCreate = 0';
  db.query(sqlCheckStructure, [num_identification], (err, structureResult) => {
    if (err) {
      console.error('Erreur lors de la vérification de la structure :', err);
      return res.status(500).json({ success: false, message: 'Erreur interne du serveur' });
    }

    if (structureResult.length > 0) {
      // Le num_identification existe dans la table num_structure et est libre
      const sqlInsert = 'INSERT INTO structure (nom_commercial, ville, raison_sociale, siege_social, adresse_de_gestion, coordonnees_commerciales, num_identification) VALUES (?, ?, ?, ?, ?, ?, ?)';
      db.query(sqlInsert, [nom_commercial, ville, raison_sociale, siege_social, adresse_de_gestion, coordonnees_commerciales, num_identification], (err, insertResult) => {
        if (err) {
          console.error('Erreur lors de l\'INSERT dans la table structure :', err);
          return res.status(500).json({ success: false, message: 'Erreur interne du serveur' });
        }
        
        // Mise à jour de isCreate à 1 pour le num_identification
        const sqlUpdateIsCreate = 'UPDATE num_structure SET isCreate = 1 WHERE num_identification = ?';
        db.query(sqlUpdateIsCreate, [num_identification], (err, updateResult) => {
          if (err) {
            console.error('Erreur lors de la mise à jour de isCreate :', err);
            return res.status(500).json({ success: false, message: 'Erreur interne du serveur' });
          }
          
          return res.json({ success: true, message: 'Insertion réussie et isCreate mis à jour' });
        });
      });
    } else {
      // Le num_identification n'existe pas dans la table num_structure ou n'est pas libre
      return res.json({ success: false, message: 'Le numéro d\'identification n\'est pas valide ou est déjà inscrit' });
    }
  });
});



//pour la création des abonnements des structures

//récupère la liste des produits dans la base de données
app.get('/api/produits', (req, res) => {
  const sql = 'SELECT * FROM produit';
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Erreur lors de la récupération des produits :', err);
      return res.status(500).json({ success: false, message: 'Erreur interne du serveur' });
    }
    return res.json({ success: true, produits: result });
  }
  );
});

//enregistre un abonnement dans la base de données depuis le formulaire
// Endpoint pour ajouter un abonnement
app.post('/api/addabonnements', (req, res) => {
  const { type, montant, compositions, structureId } = req.body;

  // Vérifiez si les données requises sont présentes
  if (!type || !montant || !compositions || !structureId) {
    return res.status(400).json({ success: false, message: 'Veuillez fournir toutes les informations nécessaires.' });
  }

  // Logique pour ajouter l'abonnement à la base de données
  const sql = 'INSERT INTO abonnement (type, montant, compositions, structure) VALUES (?, ?, ?, ?)';
  db.query(sql, [type, montant, compositions, structureId], (err, result) => {
    if (err) {
      console.error('Erreur lors de l\'ajout de l\'abonnement :', err);
      return res.status(500).json({ success: false, message: 'Erreur interne du serveur' });
    }

    // Retournez une réponse réussie
    return res.json({ success: true, message: 'Abonnement ajouté avec succès' });
  });
});

// Endpoint pour récupérer les abonnements en fonction de la structure définie
app.get('/api/abonnements', (req, res) => {
  const structureId = req.query.structureId;

  if (!structureId) {
    return res.status(400).json({ success: false, message: 'ID de structure non spécifié' });
  }

  const sql = 'SELECT * FROM abonnement WHERE structure = ?';
  db.query(sql, [structureId], (err, result) => {
    if (err) {
      console.error('Erreur lors de la récupération des abonnements :', err);
      return res.status(500).json({ success: false, message: 'Erreur interne du serveur' });
    }

    return res.json({ success: true, abonnements: result });
  });
});

//endpoint pour modifier l'abonnement spécifié par l'id
app.put('/api/editabonnements/:id', (req, res) => {
  const { id } = req.params;
  const { type, montant } = req.body;

  //console log id et type pour vérifier qu'ils sont bien récupérés
  console.log(id);
  console.log(type);
  console.log(montant);

  const sql = 'UPDATE abonnement SET type=?, montant=? WHERE id=?';

  db.query(sql, [type, montant, id], (err, result) => {
    if (err) {
      console.error('Erreur lors de la mise à jour de l\'abonnement :', err);
      return res.status(500).json({ success: false, message: 'Erreur interne du serveur' });
    }

    return res.json({ success: true, message: 'Abonnement mis à jour avec succès' });
  });
});

// Endpoint pour supprimer un abonnement
app.delete('/api/abonnements/:id', (req, res) => {
  const { id } = req.params;

  const sql = 'DELETE FROM abonnement WHERE id=?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Erreur lors de la suppression de l\'abonnement :', err);
      return res.status(500).json({ success: false, message: 'Erreur interne du serveur' });
    }

    return res.json({ success: true, message: 'Abonnement supprimé avec succès' });
  });
});

// Endpoint pour récupérer les abonnements en fonction de l'ID de structure
app.get('/api/abonnements/:idStructure', (req, res) => {
  const { idStructure } = req.params;

  // Utilisez l'ID de structure dans votre requête SQL pour récupérer les abonnements
  const sql = 'SELECT * FROM abonnement WHERE structure = ?';
  db.query(sql, [idStructure], (err, result) => {
    if (err) {
      console.error('Erreur lors de la récupération des abonnements :', err);
      return res.status(500).json({ success: false, message: 'Erreur interne du serveur' });
    }

    return res.json({ success: true, abonnements: result });
  });
});


app.get('/api/abonnements-adherent/:idStructure', (req, res) => {
  const { idStructure } = req.params;
  const sql = 'SELECT * FROM abonnement WHERE structure = ?';
  db.query(sql, [idStructure], (err, result) => {
    if (err) {
      console.error('Erreur lors de la récupération des abonnements de la structure de l\'adhérent :', err);
      return res.status(500).json({ success: false, message: 'Erreur interne du serveur' });
    }
    return res.json({ success: true, abonnements: result });
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
