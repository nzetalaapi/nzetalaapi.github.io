const descriptionEl = document.getElementById('description_imput');
const authorEl = document.getElementById('author_imput');
const priceEl = document.getElementById('price_imput');
const limitEl = document.getElementById('limit_imput');
const specificationEl = document.getElementById('specification_imput');
const formularEl = document.getElementById('formularinput');

var selectedColor = "red";
var lines = [];

var config = {
    apiKey: "AIzaSyAEggUlj0fM3mVpGgUiiATkAbwrKRgiIzo",
    authDomain: "miroydb.firebaseapp.com",
    databaseURL: "https://miroydb.firebaseio.com",
    projectId: "miroydb",
    storageBucket: "miroydb.appspot.com",
    messagingSenderId: "841981342302",
    appId: "1:841981342302:web:4b2c1f0cc59c345f3e7acf",
    measurementId: "G-S5NVZZL7GT"
};

firebase.initializeApp(config);

var database = firebase.database();

database.ref('/offers/').once('value', function(snapshot) {
    console.log(snapshot.val());
});

var rootRef = database.ref('/');

rootRef.once('value', function(snapshot) {
    console.log(snapshot.val());
});

function pushData() {

    var dataRef = database.ref('/offers').push();
    generateQuetionsLines();

    dataRef.set({
        author: authorEl.value,
        description: descriptionEl.value,
        color: selectedColor,
        participantSpecification: specificationEl.value,
        participantsLimit: limitEl.value,
        pricePerParticipant: priceEl.value,
        questionList: lines,
    });
}

pushDataRef = database.ref("/offers");
pushDataRef.on("child_added", function(snapshot) {
    console.log("Below is the data from child_added");
    console.log(snapshot.val());
});

database.ref('/offers').once('value', function(snapshot) {
    snapshot.forEach(function(data) {
        console.log("Below are all the offers'")
        console.log(data.key);
    });
    console.log(Object.keys(snapshot.val()));
});




function generateQuetionsLines() {

    $.each($('#formularinput').val().split(/\n/), function(i, line) {
        if (line) {
            lines.push(line);
        } else {
            lines.push("");
        }
    });

    lines.remove("");

};

Array.prototype.remove = function() {
    var what, a = arguments,
        L = a.length,
        ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

function create() {
    if (descriptionEl.value == "") {
        window.alert("The description can't be empty!\nFor Debug you can click on the red button to fill empty area with test data");
    } else if (authorEl.value == "") {
        window.alert("The Author name can't be empty!\nFor Debug you can click on the red button to fill empty area with test data");
    } else if (formularEl.value == "") {
        window.alert("The formular must have at least one quetion!\nFor Debug you can click on the red button to fill empty area with test data");
    } else {
        pushData();
        localStorage.setItem("descriptionValue", descriptionEl.value);
        localStorage.setItem("authorValue", authorEl.value);

        window.location.href = 'review.html';
    }

};




function initializeFieldWithTestData() {
    if (descriptionEl.value == '')
        descriptionEl.value = "Test form for customer evaluation of a new store in worms.";
    if (authorEl.value == '')
        authorEl.value = "Automaticlly generate";
    if (priceEl.value == '')
        priceEl.value = "0.99";
    if (limitEl.value == '')
        limitEl.value = "50";
    if (specificationEl.value == '')
        specificationEl.value = "student/worms/mannheim";
    formularEl.value = "Comfortable in-store temperature?\nStrict control of freshness of products?\nProducts of excellent quality?\nShort queues at the cashiers/ minimum waiting time?\nAesthetically appealing in-store environment?\nRegular promotions/demonstrations?\nFriendly, enthusiastic staff assistance?\nClear/visible signage to indicate product location?\nSecurity in the store?\nAvailability of credit/debit card facilities/in-store ATM?\nWell trained / knowledgeable staff?\nEfficient staff assistance?\nEasy access to parking area from road?\nWell located parking bays?\nPractical, logical shelf layout?\nStore located in a safe place?\nLarge product variety?\nManagers that are approachable?\nStore conveniently located?\nAvailability of new products?";
}

$("input:checkbox").on('click', function() {
    // in the handler, 'this' refers to the box clicked on
    var $box = $(this);
    if ($box.is(":checked")) {
        // the name of the box is retrieved using the .attr() method
        // as it is assumed and expected to be immutable
        var group = "input:checkbox[name='" + $box.attr("name") + "']";
        // the checked state of the group/box on the other hand will change
        // and the current value is retrieved using .prop() method
        $(group).prop("checked", false);
        $box.prop("checked", true);
    } else {
        $box.prop("checked", false);
    }
    selectedColor = $box.attr("id");
});