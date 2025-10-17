// script.js
const questions = [
  {id:1, section:'HTML', type:'mcq', q:'Quel attribut HTML sert à définir une image alternative ?', choices:['src','alt','title','data-src'], correct:'alt', points:5},
  {id:2, section:'HTML', type:'tf', q:'La balise <section> peut regrouper du contenu thématique. (Vrai/Faux)', correct:true, points:5},
  {id:3, section:'HTML', type:'short', q:'Balise sémantique pour l’en-tête ?', keywords:['header'], points:5},
  {id:4, section:'HTML', type:'code', q:'Structure minimale commence par <!DOCTYPE ____> ?', keywords:['html'], points:5},
  {id:5, section:'HTML', type:'mcq', q:'Balise sémantique pour texte important ?', choices:['b','i','em','span'], correct:'em', points:5},
  {id:6, section:'HTML', type:'short', q:'Attribut <a> pour ouvrir lien nouvel onglet ?', keywords:['target','_blank'], points:5},
  {id:7, section:'HTML', type:'mcq', q:'Balise pour inclure script externe ?', choices:['<script src="...">','<link>','<import>','<js>'], correct:'<script src="...">', points:5},
  {id:8, section:'CSS', type:'mcq', q:'Propriété CSS espace entre bordure et contenu ?', choices:['margin','border','padding','gap'], correct:'padding', points:5},
  {id:9, section:'CSS', type:'tf', q:'display:grid crée une grille bidimensionnelle. (Vrai/Faux)', correct:true, points:5},
  {id:10, section:'CSS', type:'short', q:'Sélecteur CSS pour id "menu"?', keywords:['#menu'], points:5},
  {id:11, section:'CSS', type:'code', q:'Centrer horizontalement en flexbox: justify-____', keywords:['content'], points:5},
  {id:12, section:'CSS', type:'mcq', q:'Unité relative à taille de police racine ?', choices:['em','rem','px','vh'], correct:'rem', points:5},
  {id:13, section:'CSS', type:'short', q:'Propriété pour ombre portée ?', keywords:['box-shadow'], points:5},
  {id:14, section:'CSS', type:'mcq', q:'Propriété pour aligner le texte ?', choices:['text-align','align-content','justify-items','vertical-align'], correct:'text-align', points:5},
  {id:15, section:'JS', type:'mcq', q:'Méthode pour convertir objet en JSON ?', choices:['JSON.parse','JSON.stringify','toString','Object.toJSON'], correct:'JSON.stringify', points:5},
  {id:16, section:'JS', type:'tf', q:'=== compare type et valeur. (Vrai/Faux)', correct:true, points:5},
  {id:17, section:'JS', type:'short', q:'Fonction fléchée x=>x*2 ?', keywords:['x=>x*2','(x)=>x*2'], points:5},
  {id:18, section:'JS', type:'code', q:'document.____("monId") ?', keywords:['getElementById'], points:5},
  {id:19, section:'JS', type:'mcq', q:'Variable réassignable portée bloc ?', choices:['var','let','const','static'], correct:'let', points:5},
  {id:20, section:'JS', type:'short', q:'Méthode tableau qui renvoie un tableau filtré ?', keywords:['filter'], points:5},
];

// Code complet du JS pour affichage, chronomètre, correction et PDF
// ... à compléter avec le code complet fourni précédemment ...
