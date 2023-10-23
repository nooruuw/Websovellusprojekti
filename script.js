let currentIndex = 0;
const images = [
    'images/violett2i.jpg',
    'images/valkoinen2.jpg',
    'images/keltainen3.jpg',
    'images/pipo.jpg',
    'images/punainen.jpg',
    'images/lapaset.jpg',
    'images/kuva1.jpg',
    'images/kuva2.jpg',
    'images/kuva3.jpg',
    'images/kuva4.jpg',
    'images/kuva5.jpg',
    'images/kuva6.jpg',
    'images/kuva7.jpg',
    'images/kuva8.jpeg',
    'images/kuva9.jpeg',
    'images/kuva10.jpeg',
    'images/kuva11 (2).jpeg',
    'images/kuva12.jpg',
    'images/kuva13_2.jpg',
    'images/kuva14.jpg',
    'images/kuva16.jpg',
    'images/wooden coffee table1.jpg',
    'images/kuva30.jpg',
    'images/macrame bauble2.jpg'
];

// kuvien näyttäminen
function openImage(imageUrl) {
    currentIndex = images.indexOf(imageUrl);
    document.getElementById('overlay-img').src = imageUrl;
    document.getElementById('overlay').style.display = 'block';
}

function closeImage() {
    document.getElementById('overlay').style.display = 'none';
}


// kuvien navigointi
function navigateGallery(direction) {
    currentIndex += direction;
    if (currentIndex < 0) {
        currentIndex = images.length - 1;
    } else if (currentIndex >= images.length) {
        currentIndex = 0;
    }
    const imageUrl = images[currentIndex];
    document.getElementById('overlay-img').src = imageUrl;
}

// Näppäimistön kuuntelu
document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') {
        navigateGallery(-1);
    } else if (e.key === 'ArrowRight') {
        navigateGallery(1);
    } else if (e.key === 'Escape') {
        closeImage();
    }
}
);
//-----valikon liukuminen-----
document.addEventListener("DOMContentLoaded", function () {
    var menunappi = document.getElementById("menunappi");
    var sideNav = document.getElementById("sideNav");
    var menu = document.getElementById("menu");

    sideNav.style.right = "-250px";

    menunappi.onclick = function () {
        if (sideNav.style.right == "-250px") {
            sideNav.style.right = "0";
            menu.src = "images/close.png";
        } else {
            sideNav.style.right = "-250px";
            menu.src = "images/menuu.png";
        }
    };

    var navLinks = document.querySelectorAll("#sideNav a");

    for (var i = 0; i < navLinks.length; i++) {
        navLinks[i].addEventListener("click", function () {
            // Tarkistetaan, onko sideNav suljettu
            if (sideNav.style.right === "-250px") {
                sideNav.style.right = "0";
                menu.src = "images/close.png";
            } else {
                // Jos sideNav on jo auki, suljetaan se
                sideNav.style.right = "-250px";
                menu.src = "images/menuu.png";
            }
        });
    }
});

//-----kuvien lisääminen kyselyn valikkoon-----
var myArray = ["tiny dolphin", "tiny whale", "tiny horned whale", "tiny dinosaur",
    "dinosaur", "little dragon", "dolphin and horned whale", "baby turle (pink/purple)",
    "pastel cow", "baby koala", "flower bunny", "monkey", "pink bunny", "kitten",
    "polar bear", "baby turtle (pink/blue)"];

var dropdown = document.getElementById("selectCutest");
//dropdown.options.length = 0;

// Loop through the array
for (var i = 0; i < myArray.length; ++i) {
    // Lisää jokainen vaihtoehto valikkoon
    var option = new Option(myArray[i], myArray[i]);
    dropdown.options.add(option);
}

//kuvien liukuminen
const observerFromBottom = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show-from-bottom');
        } else {
            entry.target.classList.remove('show-from-bottom');
        }
    });
});

const observerFromSide = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show-from-side');
        } else {
            entry.target.classList.remove('show-from-side');
        }
    });
});

// Seuraavat elementit liukuvat ylöspäin
const hiddenElementsFromBottom = document.querySelectorAll('.hidden-from-bottom');
hiddenElementsFromBottom.forEach((el) => observerFromBottom.observe(el));

// Nämä elementit liukuvat sivulta toiselle
const hiddenElementsFromSide = document.querySelectorAll('.hidden-from-side');
hiddenElementsFromSide.forEach((el) => observerFromSide.observe(el));


//-----kyselyjen lähetys-----

//contact (esimerkki url)
const scriptURL2 = 'https://macros/s/DG29ArdQOzBNrS5iljA18X2kaXNiSgOobszk2tn8SoqqrWn8NWZjblxH7RxGsuYIrCGQavK/exec'
//survey (esimerkki url)      
const scriptURL = 'https://zU3AksUYPFNC7qxuoOeWTiVbvsR3zKMwFaqkcM7HtWeIemvsulk4_blwkSnWIGBFcgKL6/exec'



document.getElementById('survey-submit').addEventListener('click', function (e) {
    e.preventDefault();

    // Lisätään vahvistusikkuna
    var confirmation = confirm("Do you want to submit the survey?");

    // Tarkista käyttäjän vastaus vahvistusikkunaan
    if (confirmation) {
        // Jos käyttäjä painoi "OK", lähetä lomake
        const surveyForm = document.forms['survey-form'];
        const msg = document.getElementById('msg');

        fetch(scriptURL, { method: 'POST', body: new FormData(surveyForm) })
            .then(response => {
                msg.innerHTML = "Answers sent successfully! Thank you for your time!";
                setTimeout(function () {
                    msg.innerHTML = "";
                }, 5000);
                surveyForm.reset();
            })
            .catch(error => {
                console.error('Error!', error.message);
            });
    } else {
        // Jos käyttäjä painoi "Cancel", älä tee mitään
    }
});

document.getElementById('contact-submit').addEventListener('click', function (e) {
    e.preventDefault();

    const msg2 = document.getElementById('msg2');

    const name = document.forms['contact-form']['Name'].value;
    const email = document.forms['contact-form']['Email'].value;
    const message = document.forms['contact-form']['Message'].value;

    //tarkistetaan onko sähköposti kelvollinen
    if (validateEmail(email)) {
        var confirmation = confirm("Do you want to submit the message?");

        if (confirmation) {
            // Jos sähköposti on kelvollinen, voit lähettää viestin
            fetch(scriptURL2, { method: 'POST', body: new FormData(document.forms['contact-form']) })
                .then(response => {
                    msg2.innerHTML = "Message sent successfully! Thank you for contacting me!";
                    setTimeout(function () {
                        msg2.innerHTML = "";
                    }, 5000);
                    document.forms['contact-form'].reset();
                })
                .catch(error => {
                    console.error('Error!', error.message);
                    msg2.innerHTML = "Error occurred while sending the message!";
                    setTimeout(function () {
                        msg2.innerHTML = "";
                    }, 5000);
                });

        } else {
            // Jos käyttäjä painoi "Cancel", älä tee mitään
        }
    } else {
        msg2.innerHTML = "Invalid email address!";
        setTimeout(function () {
            msg2.innerHTML = "";
        }, 5000);
    }
});

function validateEmail(email) {
    // Tarkista, sisältääkö sähköpostiosoite @-merkin
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}


//-----kellonajan näyttäminen-----
setInterval(myCurrentTime, 1000);

function myCurrentTime() {
  let d = new Date();
  document.getElementById("current-time").innerHTML=
  d.getHours() + ":" +
  d.getMinutes() + ":" +
  d.getSeconds();
}







