// Ta bort 'title' från alla sociala länkar för att hindra browserns tooltip
document.querySelectorAll('.sci a').forEach(link => {
    link.addEventListener('mouseover', function() {
        // Ta bort 'title' när man håller muspekaren över länken
        //link.removeAttribute('title');
    });
    link.addEventListener('mouseleave', function() {
        // Återställ title när muspekaren lämnar
        //lämnar denna funktion tom för att vill inte återställa title
        // link.setAttribute('title', 'GitHub'); 
    });
});
