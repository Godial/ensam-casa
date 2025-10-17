// Récupération des éléments HTML
const startBtn = document.getElementById('startBtn');
const startCard = document.getElementById('startCard');
const examCard = document.getElementById('examCard');
const resultCard = document.getElementById('resultCard');
const timerDisplay = document.getElementById('timerDisplay');
const questionsContainer = document.getElementById('questionsContainer');
const submitBtn = document.getElementById('submitBtn');
const downloadPdfBtn = document.getElementById('downloadPdfBtn');
const restartBtn = document.getElementById('restartBtn');

const remainingQ = document.getElementById('remainingQ');
const progressBar = document.getElementById('progressBar');

// Chronomètre
let timer;
let timeLeft = 20 * 60; // 20 minutes en secondes

// Informations étudiant
let etudiant = { filiere:'', nom:'', prenom:'' };

// Réponses
let studentAnswers = Array(20).fill(null);

// Questions
const questions = [
  {id:1, section:'HTML', type:'mcq', q:'Quel attribut HTML sert à définir une image alternative ?', choices:['src','alt','title','data-src'], points:5},
  {id:2, section:'HTML', type:'tf', q:'La balise <section> peut regrouper du contenu thématique. (Vrai/Faux)', points:5},
  {id:3, section:'HTML', type:'short', q:'Balise sémantique pour l’en-tête ?', points:5},
  {id:4, section:'HTML', type:'code', q:'Structure minimale commence par <!DOCTYPE ____> ?', points:5},
  {id:5, section:'HTML', type:'mcq', q:'Balise sémantique pour texte important ?', choices:['b','i','em','span'], points:5},
  {id:6, section:'HTML', type:'short', q:'Attribut <a> pour ouvrir lien nouvel onglet ?', points:5},
  {id:7, section:'HTML', type:'mcq', q:'Balise pour inclure script externe ?', choices:['<script src="...">','<link>','<import>','<js>'], points:5},
  {id:8, section:'CSS', type:'mcq', q:'Propriété CSS espace entre bordure et contenu ?', choices:['margin','border','padding','gap'], points:5},
  {id:9, section:'CSS', type:'tf', q:'display:grid crée une grille bidimensionnelle. (Vrai/Faux)', points:5},
  {id:10, section:'CSS', type:'short', q:'Sélecteur CSS pour id "menu"?', points:5},
  {id:11, section:'CSS', type:'code', q:'Centrer horizontalement en flexbox: justify-____', points:5},
  {id:12, section:'CSS', type:'mcq', q:'Unité relative à taille de police racine ?', choices:['em','rem','px','vh'], points:5},
  {id:13, section:'CSS', type:'short', q:'Propriété pour ombre portée ?', points:5},
  {id:14, section:'CSS', type:'mcq', q:'Propriété pour aligner le texte ?', choices:['text-align','align-content','justify-items','vertical-align'], points:5},
  {id:15, section:'JS', type:'mcq', q:'Méthode pour convertir objet en JSON ?', choices:['JSON.parse','JSON.stringify','toString','Object.toJSON'], points:5},
  {id:16, section:'JS', type:'tf', q:'=== compare type et valeur. (Vrai/Faux)', points:5},
  {id:17, section:'JS', type:'short', q:'Fonction fléchée x=>x*2 ?', points:5},
  {id:18, section:'JS', type:'code', q:'document.____("monId") ?', points:5},
  {id:19, section:'JS', type:'mcq', q:'Variable réassignable portée bloc ?', choices:['var','let','const','static'], points:5},
  {id:20, section:'JS', type:'short', q:'Méthode tableau qui renvoie un tableau filtré ?', points:5},
];

// ---------- Fonctions ----------

// Formatage du chronomètre
function formatTime(seconds){
    const m = Math.floor(seconds/60).toString().padStart(2,'0');
    const s = (seconds%60).toString().padStart(2,'0');
    return `${m}:${s}`;
}

// Démarrage du chronomètre
function startTimer(){
    timerDisplay.textContent = formatTime(timeLeft);
    timer = setInterval(()=>{
        timeLeft--;
        timerDisplay.textContent = formatTime(timeLeft);
        if(timeLeft<=0){
            clearInterval(timer);
            submitExam();
        }
    },1000);
}

// Afficher les questions
function loadQuestions(){
    questionsContainer.innerHTML='';
    questions.forEach((q,index)=>{
        const div = document.createElement('div');
        div.classList.add('question');
        div.innerHTML=`<strong>Q${index+1} [${q.section}] :</strong> ${q.q}<br/>`;
        
        if(q.type==='mcq' && q.choices){
            q.choices.forEach(choice=>{
                const id = `q${index}_choice_${choice}`;
                div.innerHTML+=`
                    <label>
                        <input type="radio" name="q${index}" value="${choice}"> ${choice}
                    </label><br/>
                `;
            });
        } else if(q.type==='tf'){
            div.innerHTML+=`
                <label><input type="radio" name="q${index}" value="true"> Vrai</label><br/>
                <label><input type="radio" name="q${index}" value="false"> Faux</label><br/>
            `;
        } else if(q.type==='short' || q.type==='code'){
            div.innerHTML+=`<input type="text" name="q${index}" style="width:100%;margin-top:5px;">`;
        }

        questionsContainer.appendChild(div);
    });
}

// Collecter les réponses
function collectAnswers(){
    questions.forEach((q,index)=>{
        const inputs = document.getElementsByName(`q${index}`);
        if(inputs.length>0){
            let val=null;
            if(q.type==='mcq' || q.type==='tf'){
                inputs.forEach(inp=>{ if(inp.checked) val = inp.value; });
            } else {
                val = inputs[0].value.trim();
            }
            studentAnswers[index]=val;
        }
    });
}

// Calculer la note (optionnel)
function calculateScore(){
    let score=0;
    questions.forEach((q,i)=>{
        // On ne montre pas les bonnes réponses mais on peut calculer si voulu
        if(studentAnswers[i]!=null){
            score+=q.points; // exemple simple : toutes réponses comptées
        }
    });
    return score;
}

// Soumettre l'examen
function submitExam(){
    clearInterval(timer);
    collectAnswers();
    examCard.style.display='none';
    resultCard.style.display='block';
    const score = calculateScore();
    document.getElementById('resultSummary').innerHTML=
        `Nom : ${etudiant.nom}<br/>
         Prénom : ${etudiant.prenom}<br/>
         Filière : ${etudiant.filiere}<br/>
         Score estimé : ${score}`;
}

// Générer PDF
downloadPdfBtn.addEventListener('click',()=>{
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.setFontSize(12);
    let y=10;
    doc.text(`Examen HTML/CSS/JS`,10,y); y+=10;
    doc.text(`Nom: ${etudiant.nom}`,10,y); y+=10;
    doc.text(`Prénom: ${etudiant.prenom}`,10,y); y+=10;
    doc.text(`Filière: ${etudiant.filiere}`,10,y); y+=10;
    doc.text(`Réponses:`,10,y); y+=10;
    studentAnswers.forEach((a,i)=>{
        doc.text(`Q${i+1}: ${a}`,10,y); y+=10;
        if(y>270){ doc.addPage(); y=10; }
    });
    doc.save(`${etudiant.nom}_${etudiant.prenom}_examen.pdf`);
});

// Recommencer l'examen
restartBtn.addEventListener('click',()=>{
    location.reload();
});

// ---------- Démarrage ----------

startBtn.addEventListener('click',()=>{
    const fil = document.getElementById('filiere').value.trim();
    const nom = document.getElementById('nom').value.trim();
    const prenom = document.getElementById('prenom').value.trim();
    if(!fil || !nom || !prenom){ alert("Veuillez remplir toutes les informations !"); return; }
    etudiant = { filiere:fil, nom:nom, prenom:prenom };
    startCard.style.display='none';
    examCard.style.display='block';
    loadQuestions();
    startTimer();
});
