let paragraphs = ['home', 'p1', 'p2', 'p3']; 
var translation = {
    "en" : {
        "home" : "<a href='#''>Home</a>",
        "p1" : "Hi there, I'm glad you found me! My name's Christian. I hold a Bsc in Geography from Münster University, am a Msc student in Geographical Information Management & Applications (<a href='https://www.uu.nl/masters/en/geographical-information-management-and-applications-gima'><span class='textlink'>GIMA</span></a>), and I'm passionate about everything around GIS. I have experience in ArcGIS and QGIS desktop environments, the Python geospatial stack (Geopandas, libpysal, shapely, folium, pyproj, as well as the usual data science libraries), spatial databases (specifically PostGIS), as well as R and web mapping. If you want to know more, check out my CV.",
        "p2" : "Next to my studies, I am functioning as the external committee chair of <a href='http://www.gima-node.nl'><span class='textlink'>NODE</span></a>, the Msc GIMA student association, and I am currently also working as the GIMA secretary at Utrecht University, so if you're curious about my Master's programme, contact me <a class='textlink' href='mailto:gima.geo@uu.nl'><span class='textlink'>here</span></a>.",
        "p3" : "My personal interests include environmentalism (I'm a geographer by training, after all), science & technology, European and US politics, as well as Spanish & South American culture and US popular culture. I also occasionally make music with my band, <a class='textlink' href='https://www.instagram.com/wearemanjaro/'><span class='textlink'>Manjaro</span></a>."
    },
    "es" : {
            "home" : "<a href='#''>Inicio</a>",
            "p1" : "Hola, soy Christian! Tengo un Bsc en Geografía de la Universidad de Münster, soy estudiante del programa Msc Geographical Information Management & Applications (<a href='https://www.uu.nl/masters/en/geographical-information-management-and-applications-gima'><span class='textlink'>GIMA</span></a>), and I'm passionate about everything around GIS. I have experience in ArcGIS and QGIS desktop environments, the Python geospatial stack (Geopandas, libpysal, shapely, folium, pyproj, as well as the usual data science libraries), spatial databases (specifically PostGIS), as well as R and web mapping. If you want to know more, check out my CV.",
            "p2" : "Aparte de mis estudios, hago estas cosas",
            "p3" : "Y me interesan estas cosas"
        },
    "de" : {
            "home" : "<a href='#''>Start</a>",
            "p1" : "Halllo",
            "p2" : "Guten",
            "p3" : "Tag"
    }
};
    function getLanguage() {
        if (localStorage.getItem('language')==null) {
            setLanguage('en')
        } else {
            for (let i = 0; i < paragraphs.length; i++) {
            document.getElementById(paragraphs[i]).innerHTML = translation[localStorage.getItem('language')][paragraphs[i]]
            }
        }
    }

    function setLanguage(lang) {
        localStorage.setItem('language', lang)
        for (let i = 0; i < paragraphs.length; i++) {
            document.getElementById(paragraphs[i]).innerHTML = translation[localStorage.getItem('language')][paragraphs[i]]
        }
    }
    document.addEventListener('DOMContentLoaded', function() {
            getLanguage();
        }, false);