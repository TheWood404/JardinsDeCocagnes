const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const child_process = require('child_process');

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerConfig = require('./swaggerConfig'); // Mettez à jour le chemin selon votre structure


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

/**
 * @swagger
 * /api/connexion:
 *   post:
 *     summary: Connexion à l'API
 *     description: Vérifie les informations de connexion et renvoie le résultat.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mail:
 *                 type: string
 *               mdp_espace_client:
 *                 type: string
 *     responses:
 *       200:
 *         description: Succès de la connexion
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 userExists:
 *                   type: boolean
 *                 structId:
 *                   type: number
 *       500:
 *         description: Erreur interne du serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 */
app.post('/api/connexion', (req, res) => {
  const { mail, mdp_espace_client } = req.body;
  const sql = 'SELECT COUNT(*) AS count, id_structure, id FROM adherent WHERE mail = ? AND mdp_espace_client = ?';
  db.query(sql, [mail, mdp_espace_client], (err, result) => {
    if (err) {
      console.error('Erreur lors de la vérification de la connexion :', err);
      return res.status(500).json({ success: false, message: 'Erreur interne du serveur' });
    }
    const userExists = result[0].count > 0;

    if (userExists) {
      const structId = result[0].id_structure;
      const userId = result[0].id;
      return res.json({ success: true, userExists, structId, userId });
    } else {
      return res.json({ success: false, userExists, structId: null });
    }
  });
});

/**
 * @swagger
 * /api/connexionstructure:
 *   post:
 *     summary: Connexion à la structure
 *     description: Vérifie les informations de connexion de la structure et renvoie le résultat.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: number
 *               num_identification:
 *                 type: string
 *     responses:
 *       200:
 *         description: Succès de la connexion
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 userExists:
 *                   type: boolean
 *                 userId:
 *                   type: number
 *       500:
 *         description: Erreur interne du serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 */
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

/**
 * @swagger
 * /api/deconnexion:
 *   post:
 *     summary: Déconnexion de l'adhérent
 *     description: Vérifie les informations de déconnexion de l'adhérent et renvoie le résultat.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mail:
 *                 type: string
 *     responses:
 *       200:
 *         description: Succès de la déconnexion
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 userExists:
 *                   type: boolean
 *       500:
 *         description: Erreur interne du serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 */
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

/**
 * @swagger
 * /api/coordonneespointdedepot:
 *   get:
 *     summary: Récupération des coordonnées des points de dépôt
 *     description: Récupère les coordonnées (longitude et latitude) des points de dépôt.
 *     responses:
 *       200:
 *         description: Succès de la récupération des coordonnées
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 coordonnees:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       longitude:
 *                         type: number
 *                       latitude:
 *                         type: number
 *       500:
 *         description: Erreur interne du serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 */
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

/**
 * @swagger
 * /api/registerstructure:
 *   post:
 *     summary: Enregistrement d'une nouvelle structure
 *     description: Enregistre une nouvelle structure dans la base de données.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom_commercial:
 *                 type: string
 *               ville:
 *                 type: string
 *               raison_sociale:
 *                 type: string
 *               siege_social:
 *                 type: string
 *               adresse_de_gestion:
 *                 type: string
 *               coordonnees_commerciales:
 *                 type: string
 *               num_identification:
 *                 type: string
 *     responses:
 *       200:
 *         description: Succès de l'enregistrement
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       500:
 *         description: Erreur interne du serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 */
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
/**
 * @swagger
 * /api/produits:
 *   get:
 *     summary: Récupération de la liste des produits
 *     description: Récupère la liste complète des produits depuis la base de données.
 *     responses:
 *       200:
 *         description: Succès de la récupération des produits
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 produits:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       // Propriétés spécifiques à chaque produit
 *       500:
 *         description: Erreur interne du serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 */
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
/**
 * @swagger
 * /api/addabonnements:
 *   post:
 *     summary: Ajout d'un nouvel abonnement
 *     description: Ajoute un nouvel abonnement à la base de données.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *               montant:
 *                 type: number
 *               compositions:
 *                 type: string
 *               structureId:
 *                 type: number
 *     responses:
 *       200:
 *         description: Succès de l'ajout de l'abonnement
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       400:
 *         description: Requête incorrecte
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       500:
 *         description: Erreur interne du serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 */
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
/**
 * @swagger
 * /api/abonnements:
 *   get:
 *     summary: Récupération des abonnements en fonction de la structure
 *     description: Récupère les abonnements associés à une structure spécifiée.
 *     parameters:
 *       - in: query
 *         name: structureId
 *         schema:
 *           type: number
 *         required: true
 *         description: ID de la structure pour laquelle récupérer les abonnements.
 *     responses:
 *       200:
 *         description: Succès de la récupération des abonnements
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 abonnements:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       // Propriétés spécifiques à chaque abonnement
 *       400:
 *         description: Requête incorrecte
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       500:
 *         description: Erreur interne du serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 */
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
/**
 * @swagger
 * /api/editabonnements/{id}:
 *   put:
 *     summary: Modification d'un abonnement
 *     description: Modifie les détails d'un abonnement spécifié par son ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: ID de l'abonnement à modifier.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *               montant:
 *                 type: number
 *     responses:
 *       200:
 *         description: Succès de la mise à jour de l'abonnement
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       500:
 *         description: Erreur interne du serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 */
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
/**
 * @swagger
 * /api/abonnements/{id}:
 *   delete:
 *     summary: Suppression d'un abonnement
 *     description: Supprime un abonnement spécifié par son ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: ID de l'abonnement à supprimer.
 *     responses:
 *       200:
 *         description: Succès de la suppression de l'abonnement
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       500:
 *         description: Erreur interne du serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 */
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
/**
 * @swagger
 * /api/abonnements/{idStructure}:
 *   get:
 *     summary: Récupération des abonnements en fonction de l'ID de structure
 *     description: Récupère les abonnements associés à une structure spécifiée par son ID.
 *     parameters:
 *       - in: path
 *         name: idStructure
 *         schema:
 *           type: number
 *         required: true
 *         description: ID de la structure pour laquelle récupérer les abonnements.
 *     responses:
 *       200:
 *         description: Succès de la récupération des abonnements
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 abonnements:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       // Propriétés spécifiques à chaque abonnement
 *       500:
 *         description: Erreur interne du serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 */
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

app.post('/api/souscrire-abonnement', (req, res) => {
  const { idAdherent, idAbonnement } = req.body;

  // Vérifier si l'adhérent et l'abonnement existent
  // (ajouter les vérifications nécessaires ici)

  const dateDebut = new Date(); // La date de début est la date actuelle
  //la date de fin est la date de début + 1 mois
  const dateFin = new Date(dateDebut.getFullYear(), dateDebut.getMonth() + 1, dateDebut.getDate());

  const sql = 'INSERT INTO abonnements_en_cours (id_adherent, id_abonnement, date_debut, date_fin) VALUES (?, ?, ?, ?)';
  db.query(sql, [idAdherent, idAbonnement, dateDebut, dateFin], (err, result) => {
    if (err) {
      console.error('Erreur lors de la souscription à l\'abonnement :', err);
      return res.status(500).json({ success: false, message: 'Erreur interne du serveur' });
    }

    return res.json({ success: true, message: 'Souscription réussie' });
  });
});

app.get('/api/abonnements-en-cours', (req, res) => {
  const idAdherent = req.query.idAdherent;

  if (!idAdherent) {
    return res.status(400).json({ success: false, message: 'ID de l\'adhérent non spécifié' });
  }

  const sql = 'SELECT * FROM abonnements_en_cours WHERE id_adherent = ?';
  db.query(sql, [idAdherent], (err, result) => {
    if (err) {
      console.error('Erreur lors de la récupération des abonnements en cours :', err);
      return res.status(500).json({ success: false, message: 'Erreur interne du serveur' });
    }

    return res.json({ success: true, abonnementsEnCours: result });
  });
});

app.post('/api/desabonner', (req, res) => {
  const idAdherent = req.body.idAdherent;
  const idAbonnement = req.body.idAbonnement;

  if (!idAdherent || !idAbonnement) {
    return res.status(400).json({ success: false, message: 'ID d\'adhérent ou ID d\'abonnement non spécifié' });
  }

  const sql = 'DELETE FROM abonnements_en_cours WHERE id_adherent = ? AND id_abonnement = ?';
  db.query(sql, [idAdherent, idAbonnement], (err, result) => {

    if (err) {
      console.error('Erreur lors du désabonnement :', err);
      return res.status(500).json({ success: false, message: 'Erreur interne du serveur' });
    }

    return res.json({ success: true, message: 'Désabonnement réussi' });
  });
});

// Fonction pour formater les résultats de la requête SQL
function formatAdherentsWithAbonnements(rawData) {
  const formattedAdherents = [];

  rawData.forEach(row => {
    const existingAdherent = formattedAdherents.find(adherent => adherent.id === row.id);

    if (existingAdherent) {
      // Si l'adhérent existe déjà, ajouter l'abonnement en cours
      existingAdherent.abonnementsEnCours.push({
        id: row.id_abonnement,
        date_debut: row.date_debut,
        date_fin: row.date_fin
      });
    } else {
      // Si l'adhérent n'existe pas, le créer avec son premier abonnement en cours
      const newAdherent = {
        id: row.id,
        nom: row.nom,
        prenom: row.prenom,
        adresse: row.adresse,
        code_postal: row.code_postal,
        mail: row.mail,
        num_identification: row.num_identification,
        num_telephone: row.num_telephone,
        ville: row.ville,
        abonnementsEnCours: row.id_abonnement
          ? [{
              id: row.id_abonnement,
              date_debut: row.date_debut,
              date_fin: row.date_fin
            }]
          : []
      };

      formattedAdherents.push(newAdherent);
    }
  });

  return formattedAdherents;
}

app.get('/api/adherents-de-structure', (req, res) => {
  const idStructure = req.query.idStructure;

  if (!idStructure) {
    return res.status(400).json({ success: false, message: 'ID de structure non spécifié' });
  }

  const sql = `
    SELECT adherent.*, abonnements_en_cours.*
    FROM adherent
    LEFT JOIN abonnements_en_cours ON adherent.id = abonnements_en_cours.id_adherent
    WHERE adherent.id_structure = ?
  `;

  db.query(sql, [idStructure], (err, result) => {
    if (err) {
      console.error('Erreur lors de la récupération des adhérents de la structure :', err);
      return res.status(500).json({ success: false, message: 'Erreur interne du serveur' });
    }

    const formattedResult = formatAdherentsWithAbonnements(result);
    return res.json({ success: true, adherents: formattedResult });
  });
});

//endpoints qui récupère les informations de l'abonnements en fonction de sont id
// Exemple avec Express.js
app.get('/api/abonnement/:idAbonnement', (req, res) => {
  const idAbonnementEnCours = req.params.idAbonnement;

  if (!idAbonnementEnCours) {
    return res.status(400).json({ success: false, message: 'ID de l\'abonnement en cours non spécifié' });
  }

  const sql = `
    SELECT abonnements_en_cours.id_abonnement, abonnement.*
    FROM abonnements_en_cours
    LEFT JOIN abonnement ON abonnements_en_cours.id_abonnement = abonnement.id
    WHERE abonnements_en_cours.id = ?;
  `;

  db.query(sql, [idAbonnementEnCours], (err, result) => {
    if (err) {
      console.error('Erreur lors de la récupération des informations de l\'abonnement en cours :', err);
      return res.status(500).json({ success: false, message: 'Erreur interne du serveur' });
    }

    if (result.length === 0) {
      return res.status(404).json({ success: false, message: 'Abonnement en cours non trouvé' });
    }

    return res.json({ success: true, abonnement: result[0] });
  });
});

/**
 * @swagger
 * /api/abonnements-adherent/{idStructure}:
 *   get:
 *     summary: Récupération des abonnements de la structure de l'adhérent
 *     description: Récupère les abonnements associés à la structure d'un adhérent spécifié par son ID.
 *     parameters:
 *       - in: path
 *         name: idStructure
 *         schema:
 *           type: number
 *         required: true
 *         description: ID de la structure de l'adhérent pour laquelle récupérer les abonnements.
 *     responses:
 *       200:
 *         description: Succès de la récupération des abonnements
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 abonnements:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       // Propriétés spécifiques à chaque abonnement
 *       500:
 *         description: Erreur interne du serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 */
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

app.get('/api/calendrier-adherent', (req, res) => {
  const { idAdherent } = req.query;

  if (!idAdherent) {
    return res.status(400).json({ success: false, message: 'ID de la structure de l\'adhérent non spécifié' });
  }

  const sql = `
    SELECT jours_livrables.jour_semaine
    FROM jours_livrables
    JOIN adherent ON jours_livrables.id_structure = adherent.id_structure
    WHERE adherent.id = ?
  `;

  db.query(sql, [idAdherent], (err, result) => {
    if (err) {
      console.error('Erreur lors de la récupération du calendrier de l\'adhérent :', err);
      return res.status(500).json({ success: false, message: 'Erreur interne du serveur' });
    }

    const joursLivrables = result.map((row) => row.jour_semaine);

    return res.json({ success: true, joursLivrables });
  });
});

// À ajouter côté serveur, dans votre fichier où vous définissez les routes (ex: server.js ou routes.js)
app.post('/api/valider-jour', (req, res) => {
  const { idAdherent, selectedDay, idStructureAdherent } = req.body;
  console.log('info', selectedDay)
  if (!idAdherent || !selectedDay || !idStructureAdherent) {
    return res.status(400).json({ success: false, message: 'Paramètres manquants.' });
  }

  // Assurez-vous d'ajuster cela en fonction de votre structure de base de données réelle.
  const sql = `
    INSERT INTO tournee_de_livraison (id_adherent, id_jours_livrables, id_point_de_depot, id_adh_structure)
    VALUES (?, ?, (SELECT point_depot_favori_id FROM adherent WHERE id = ?), ?)
  `;

  db.query(sql, [idAdherent, selectedDay, idAdherent, idStructureAdherent], (err, result) => {
    if (err) {
      console.error('Erreur lors de la validation du jour :', err);
      return res.status(500).json({ success: false, message: 'Erreur interne du serveur.' });
    }

    return res.json({ success: true, message: 'Validation du jour réussie.' });
  });
});

// À ajouter côté serveur, dans votre fichier où vous définissez les routes (ex: server.js ou routes.js)
app.get('/api/get-id-for-day', (req, res) => {
  const { day } = req.query;

  if (!day) {
    return res.status(400).json({ success: false, message: 'Date non spécifiée' });
  }

  const sql = `
    SELECT id
    FROM jours_livrables
    WHERE jour_semaine = ?
  `;

  db.query(sql, [day], (err, result) => {
    if (err) {
      console.error('Erreur lors de la récupération de l\'id du jour livrable :', err);
      return res.status(500).json({ success: false, message: 'Erreur interne du serveur' });
    }

    if (result.length === 0) {
      return res.status(404).json({ success: false, message: 'Aucun jour livrable trouvé pour la date spécifiée' });
    }

    // Assurez-vous que l'ID récupéré est une valeur numérique non nulle
    const idSelectedDay = result[0].id || null;

    return res.json({ success: true, id: idSelectedDay });
  });
});

app.get('/api/depots-a-livrer/:idAdhStructure', (req, res) => {
  const { idAdhStructure } = req.params;

  const sql = `
    SELECT DISTINCT td.id_jours_livrables, GROUP_CONCAT(td.id_point_de_depot) as depots_a_livrer
    FROM tournee_de_livraison td
    WHERE td.id_adh_structure = ?
    GROUP BY td.id_jours_livrables
  `;

  db.query(sql, [idAdhStructure], (err, result) => {
    if (err) {
      console.error('Erreur lors de la récupération des dépôts à livrer :', err);
      return res.status(500).json({ success: false, message: 'Erreur interne du serveur' });
    }

    // Organiser les résultats par id_jours_livrables
    const depotsALivrer = result.reduce((acc, entry) => {
      const idJoursLivrables = entry.id_jours_livrables;
      const depots = entry.depots_a_livrer.split(',').map(Number);

      acc[idJoursLivrables] = depots;

      return acc;
    }, {});

    return res.json({ success: true, depotsALivrer });
  });
});



app.get('/api/jours-livrables/:jourId', (req, res) => {
  const { jourId } = req.params;

  const sql = `
    SELECT id, jour_semaine
    FROM jours_livrables
    WHERE id = ?
  `;

  db.query(sql, [jourId], (err, result) => {
    if (err) {
      console.error('Erreur lors de la récupération des jours livrables :', err);
      return res.status(500).json({ success: false, message: 'Erreur interne du serveur' });
    }

    if (result.length === 0) {
      return res.status(404).json({ success: false, message: 'Jour livrable non trouvé' });
    }

    const jourLivrable = result[0];
    return res.json({ success: true, jourLivrable });
  });
});

// GET - Récupérer les informations de l'adhérent
app.get('/api/adherent/info/:id', (req, res) => {
  const idAdherent = req.params.id;
  const query = 'SELECT * FROM adherent WHERE id = ?';

  db.query(query, [idAdherent], (err, result) => {
    if (err) {
      console.error('Erreur lors de la récupération des informations de l\'adhérent:', err);
      res.status(500).json({ error: 'Erreur lors de la récupération des informations de l\'adhérent' });
    } else {
      res.json(result[0]);
    }
  });
});

// PUT - Mettre à jour les informations de l'adhérent
app.put('/api/adherent/info/:id', (req, res) => {
  const idAdherent = req.params.id;
  const updatedAdherent = req.body;

  const query = 'UPDATE adherent SET ? WHERE id = ?';

  db.query(query, [updatedAdherent, idAdherent], (err, result) => {
    if (err) {
      console.error('Erreur lors de la mise à jour des informations de l\'adhérent:', err);
      res.status(500).json({ error: 'Erreur lors de la mise à jour des informations de l\'adhérent' });
    } else {
      res.json(updatedAdherent);
    }
  });
});

// Route pour récupérer la liste des points de dépôt
app.get('/api/points-depot', (req, res) => {
  const query = 'SELECT id, nom, adresse, ville FROM point_de_depot'; // Adapté selon votre structure

  db.query(query, (err, pointsDeDepot) => {
    if (err) {
      console.error('Erreur lors de la récupération des points de dépôt', err);
      res.status(500).json({ error: 'Erreur lors de la récupération des points de dépôt' });
    } else {
      res.json(pointsDeDepot);
    }
  });
});

//prend l'id d'un point de dépôt et renvoie les informations de ce point de dépôt
app.get('/api/point-de-depot/:id', (req, res) => {
  const idPointDeDepot = req.params.id;
  const query = 'SELECT * FROM point_de_depot WHERE id = ?';

  db.query(query, [idPointDeDepot], (err, result) => {
    if (err) {
      console.error('Erreur lors de la récupération des informations du point de dépôt:', err);
      res.status(500).json({ error: 'Erreur lors de la récupération des informations du point de dépôt' });
    } else {
      res.json(result[0]);
    }
  });
});

// Endpoint pour récupérer tous les points de dépôt
app.get('/api/get-points-depot', (req, res) => {
  db.query('SELECT * FROM point_de_depot', (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des points de dépôt depuis la base de données :', err);
      res.status(500).json({ error: 'Erreur serveur' });
      return;
    }
    res.json(results);
  });
});

// Endpoint pour créer un nouveau point de dépôt
app.post('/api/create-point-depot', (req, res) => {
  const nouveauPointDepot = req.body;
  db.query('INSERT INTO point_de_depot SET ?', nouveauPointDepot, (err, result) => {
    if (err) {
      console.error('Erreur lors de la création du point de dépôt dans la base de données :', err);
      res.status(500).json({ error: 'Erreur serveur' });
      return;
    }
    nouveauPointDepot.id = result.insertId;
    res.json(nouveauPointDepot);
  });
});

// Endpoint pour mettre à jour un point de dépôt
app.put('/api/update-point-depot/:id', (req, res) => {
  const pointDepotId = req.params.id;
  const updatedPointDepot = req.body;

  db.query(
    'UPDATE point_de_depot SET ? WHERE id = ?',
    [updatedPointDepot, pointDepotId],
    (err, result) => {
      if (err) {
        console.error('Erreur lors de la mise à jour du point de dépôt dans la base de données :', err);
        res.status(500).json({ error: 'Erreur serveur' });
        return;
      }

      if (result.affectedRows === 0) {
        res.status(404).json({ error: 'Point de dépôt non trouvé' });
        return;
      }

      res.json({ message: 'Point de dépôt mis à jour avec succès' });
    }
  );
});

// Endpoint pour supprimer un point de dépôt
app.delete('/api/delete-point-depot/:id', (req, res) => {
  const pointDepotId = req.params.id;

  db.query('DELETE FROM point_de_depot WHERE id = ?', pointDepotId, (err, result) => {
    if (err) {
      console.error('Erreur lors de la suppression du point de dépôt dans la base de données :', err);
      res.status(500).json({ error: 'Erreur serveur' });
      return;
    }

    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Point de dépôt non trouvé' });
      return;
    }

    res.json({ message: 'Point de dépôt supprimé avec succès' });
  });
});

// Endpoint pour mettre a jour un point de dépôt
app.put('/api/update-point-depot-modif/:id', async (req, res) => {
  const { id } = req.params;
  const updatedPointDepot = req.body;

  try {
    console.log('Updating PointDepot. ID:', id, 'Updated Data:', updatedPointDepot);

    const { nom, adresse, code_postal, ville, numero_de_telephone, mail, site_web, coordonnees } = updatedPointDepot;

    const result = await db.query(
      'UPDATE point_de_depot SET nom=?, adresse=?, code_postal=?, ville=?, numero_de_telephone=?, mail=?, site_web=?, coordonnees=POINT(?, ?) WHERE id=?',
      [
        nom,
        adresse,
        code_postal,
        ville,
        numero_de_telephone,
        mail,
        site_web,
        coordonnees.x, 
        coordonnees.y,
        id
      ]
    );

    if (result.affectedRows > 0) {
      // Fetch the updated record after the update
      const updatedResult = await db.query('SELECT * FROM point_de_depot WHERE id=?', [id]);
      console.log('PointDepot updated successfully:', updatedResult[0]);
      res.json(updatedResult[0]);
    } else {
      console.log('PointDepot not found for ID:', id);
      res.status(404).json({ error: 'PointDepot not found' });
    }
  } catch (error) {
    console.error('Error while updating PointDepot:', error);
    res.status(500).json({ error: 'Error while updating PointDepot' });
  }
});


    


const swaggerSpec = swaggerJSDoc(swaggerConfig);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


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
