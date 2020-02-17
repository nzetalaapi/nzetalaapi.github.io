const descriptionEl = document.getElementById('description_imput');
const authorEl = document.getElementById('author_imput');
const priceEl = document.getElementById('price_imput');
const limitEl = document.getElementById('limit_imput');
const specificationEl = document.getElementById('specification_imput');
const formularEl = document.getElementById('formularinput');

var selectedColor = "red";
var lines = [];

function cancelButtonClick() {

    $.each($('#formularinput').val().split(/\n/), function(i, line) {
        if (line) {
            lines.push(line);
        } else {
            lines.push("");
        }
    });
    console.log(lines);

    console.log("cancelButtonClick: descriptionEl: " + descriptionEl.value + "; author: " + authorEl.value + " color: " + selectedColor + "formular input: " + formularEl.value);
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