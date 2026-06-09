const info1 = document.getElementById("info1")
const skillList = document.getElementById("skill-list")

// Objekt som mappar de engelska kategorinamnen till svenska
const categoryTranslation = {
    "programmingLanguages": "Programmeringsspråk",
    "backendDevelopment": "Backend",
    "frontendDevelopment": "Frontend",
    "databaseManagement": "Databaser",
    "versionControl": "Versionshantering",
    "uiUxDesign": "UI/UX Design",
    "toolsAndLibraries": "Verktyg & Bibliotek",
    "testing": "Testning",
    "projectManagement": "Projektledning",
    "communication": "Kommunikation & Språk",
    "deploymentPlatforms": "Deployment"
};

// Boxicons-klass per kategori
const categoryIcons = {
    "programmingLanguages": "bx bx-code-alt",
    "backendDevelopment": "bx bx-server",
    "frontendDevelopment": "bx bx-layout",
    "databaseManagement": "bx bx-data",
    "versionControl": "bx bxl-git",
    "uiUxDesign": "bx bx-palette",
    "toolsAndLibraries": "bx bx-wrench",
    "testing": "bx bx-check-shield",
    "projectManagement": "bx bx-task",
    "communication": "bx bx-globe",
    "deploymentPlatforms": "bx bx-cloud-upload"
};

//Fetchar info.json fil som visas i aboutMe.html sidan
fetch("info.json")
  .then(res => res.json())
  .then(data => {
    const parts = Object.keys(data);  

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      const content = data[part]; 

      //om det är tech_stack, rendera som en lista
      if (part === "tech_stack") { 
        let listHtml = "<ul class='tech-stack-list'>";
        for (let item of content) {
          listHtml += `<li>${item}</li>`;
        }
        listHtml += "</ul>";
        info1.insertAdjacentHTML("beforeend", listHtml);
      } 
      // Om det är senaste_projekt, visa alla rader och länkar
      else if (part === "senaste_projekt") {
        let projectHtml = "<div class='home-info'>";
        for (let line of content) {
          // Gör om länkar i texten till klickbara <a>-taggar automatiskt
          line = line.replace(
            /(https?:\/\/[^\s,]+)/g,
            '<a href="$1" target="_blank" rel="noopener" class="link">$1</a>'
          );
          projectHtml += `<p>${line}</p>`;
        }
        projectHtml += "</div>";
        info1.insertAdjacentHTML("beforeend", projectHtml);
      }
      
      else {
        // Annars rendera som en vanlig text
        const infoContent = content[0];
        info1.insertAdjacentHTML(
          "beforeend",
          `<div class="home-info">
             <p>${infoContent}</p>
           </div>`
        );
  
        // Lägger till radbrytning mellan sektioner, förutom efter den sista
        if (i < parts.length - 1) {
          info1.insertAdjacentHTML("beforeend", "<br>");
        }
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
            const isTech = item.category === "tech";
            const dotClass = isTech ? "" : "timeline-dot--earlier";
            const icon = isTech ? "bx-code-alt" : "bx-briefcase";
            const periodClass = isTech ? "" : "timeline-period--earlier";
            const companyClass = isTech ? "" : "timeline-company--earlier";

            const entry = document.createElement("div");
            entry.classList.add("timeline-item");
            entry.innerHTML = `
                <div class="timeline-dot ${dotClass}">
                    <i class="bx ${icon}"></i>
                </div>
                <div class="timeline-content">
                    <span class="timeline-period ${periodClass}">
                        <i class="bx bx-calendar"></i> ${item.duration}
                    </span>
                    <h3>${item.title}</h3>
                    <p class="timeline-company ${companyClass}">
                        <i class="bx bx-buildings"></i> ${item.company}
                    </p>
                    <p>${item.description}</p>
                </div>
            `;
            experienceList.appendChild(entry);
        });
    })
    .catch(error => console.error('Det gick inte att hämta erfarenheter:', error));

    //Fetchar skill.json sidan som visas i skills.html sidan
    fetch("skills.json")
        .then(res => res.json())
        .then(data => {
            for (const category in data) {
                const skills = data[category];
                const title = categoryTranslation[category] || category.replace(/([A-Z])/g, " $1");
                const icon = categoryIcons[category] || "bx bx-code-alt";

                const card = document.createElement("div");
                card.classList.add("skill-card");
                card.innerHTML = `
                    <div class="skill-card-header">
                        <i class="${icon}"></i>
                        <h3>${title}</h3>
                    </div>
                    <div class="skill-card-chips">
                        ${skills.map(s => `<span class="chip">${s}</span>`).join('')}
                    </div>
                `;
                skillList.appendChild(card);
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
//Funktion för hamburger-meny
function toggleMenu(){
  const menu = document.querySelector('.navbar ul');
  menu.classList.toggle('active'); //växlar mellan visa/ dölj meny
}
