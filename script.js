const info1 = document.getElementById("info1")
const skillList = document.getElementById("skill-list")

// Objekt som mappar de engelska kategorinamnen till svenska
const categoryTranslation = {
    "programmingLanguages": "Programmeringsspråk",
    "frameworks": "Ramverk",
    "webDevelopment": "Webbutveckling",
    "databaseManagement": "Databashantering",
    "versionControl": "Versionshantering",
    "uiUxDesign": "UI/UX Design",
    "toolsAndLibraries": "Verktyg och bibliotek",
    "testing": "Testning",
    "projectManagement": "Projektledning",
    "communication": "Kommunikation"
};

//Fetchar info.json fil som visas i aboutMe.html sidan
fetch("info.json")
  .then(res => res.json())
  .then(data => {
    const parts = Object.keys(data);  

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      const textInnehåll = data[part][0]; 

      info1.insertAdjacentHTML(
        "beforeend",
        `<div class="home-info">
           <p>${textInnehåll}</p>
         </div>`
      );

      // Om det inte är sista elementet, bryt rad
      if (i < parts.length - 1) {
        info1.insertAdjacentHTML("beforeend", "<br>");
      }
    }
  })
  .catch(error => console.error('Det gick inte att hämta Om Mig info: ', error));

  //Fetchar experiences.json fil som visas i experiences.html sidan
  fetch("experiences.json")
    .then(res => res.json())
    .then(data => {
        const experienceList = document.getElementById("experience-list");

        data.forEach(item => {
            const experienceCard = document.createElement('div');
            experienceCard.classList.add('experience-card');

            experienceCard.innerHTML = `
            <h3>${item.title}</h3>
            <p class="company">${item.company}</p>
            <p><strong>Tid:</strong> ${item.duration}</p>
            <p>${item.description}</p>
      `;
        experienceList.appendChild(experienceCard);
        });
    })
    .catch(error => console.error('Det gick inte att hämta erfarenheter:', error));

    //Fetchar skill.json sidan som visas i skills.html sidan
    fetch("skills.json")
        .then(res => res.json())
        .then(data => {
            //Går igenom varje kategori av färdigheter i json fil
            for (const category in data) {
                const skills = data[category];

                //Skapar en sektion för varje kategori
                const categorySection = document.createElement("div");
                categorySection.classList.add("skill-category");

                //Lägger till en rubrik för varje kategorin på svenska
                const categoryTitle = document.createElement("h3");
                //Om det finns en översättning för kategorin, använder den svenska, annars visar den engelska
                categoryTitle.textContent = categoryTranslation[category] || category.replace(/([A-Z])/g, " $1").toUpperCase();
                categorySection.appendChild(categoryTitle);

                //Skapar en lista för färdigheter
                const skillListItems = document.createElement("ul");
                skills.forEach(skill => {
                    const skillItem = document.createElement("li");
                    skillItem.textContent = skill;
                    skillListItems.appendChild(skillItem);
                });

                categorySection.appendChild(skillListItems);
                skillList.appendChild(categorySection);
            }
        })
        .catch(error => console.error('Det gick inte att hämta färdigheter: ', error));

//Script för utbildning sidan
document.addEventListener("DOMContentLoaded", ()=> {
  //Läser data från json fil
  fetch('certificates.json')
    .then(response => response.json())
    .then(data => {
      const certificateList = document.getElementById('certificate-list');

      //Lägger till utbildningar
      data.education.forEach(item => {
        const certificateCard = document.createElement('div');
        certificateCard.classList.add('certificate-card');
        certificateCard.innerHTML = `
            <h3>${item.degree}</h3>
            <p><strong>Institution:</strong> ${item.institution}</p>
            <p><strong>År:</strong> ${item.year}</p>
            <p>${item.description}</p>
          `;
          certificateList.appendChild(certificateCard);

      });

      //Lägger till certifikat
      data.certificates.forEach(item => {
        const certificateCard = document.createElement('div');
        certificateCard.classList.add('certificate-card');
        certificateCard.innerHTML = `
          <h3>${item.title}</h3>
          <p><strong>Utfärdare:</strong> ${item.issuer}</p>
          <p><strong>År:</strong> ${item.year}</p>
          <p>${item.description}</p>
        `;
        certificateList.appendChild(certificateCard);
      });
    })
    .catch(error => console.error('Fel vid laddning av certifikater: ', error));
});
