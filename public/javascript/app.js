$(document).ready(function() {
//--------------  index.handlebars  -----------------------------------
    //Nav Bar drop down
    $(".dropdown-button").dropdown( { hover: false } );

    //Dropdown selections for the Request New Spot
    $("select").material_select();

//--------------  For Edit Modal  -----------------------------------

    $('.modal').modal();

//--------------  Request New Spot  -----------------------------------
    var destinationName = $("#destination_name");
    var destinationAddress = $("#destination_address");
    var destinationPhoneNumber = $("#destination_phoneNumber");
    var destinationImage = $("#destination_image");
    var destinationDescription = $("#destination_description");
    var destinationWebsite = $("#destination_website");
    var destinationCategory = $(".select-dropdown");
    var LocationsId;

// ----------- Work in Progress Start! -------------------------------------
    var modalDestinationName = $("#modal_destination_name");
    var modalDestinationAddress = $("#modal_destination_address");
    var modalDestinationPhoneNumber = $("#modal_destination_phoneNumber");
    var modalDestinationImage = $("#modal_destination_image");
    var modalDestinationDescription = $("#modal_destination_description");
    var modalDestinationWebsite = $("#modal_destination_website");
    
    var modalID;
// Edits the Request in Database
function editModal() {
    event.preventDefault();
        id = $(this).data("id");
        console.log("This is the ID in the modal: " + id);
        $.ajax({
            method: "PUT",
            url: "/adminPage",
            data: { 
                id: id,
                destination: modalDestinationName.val().trim(),
                address: modalDestinationAddress.val().trim(),
                description: modalDestinationDescription.val().trim(),
                website: modalDestinationWebsite.val().trim(),
                image: modalDestinationImage.val().trim(),
                phoneNumber: modalDestinationPhoneNumber.val().trim(),
                category: modalDestinationCategory.val()
            }
        })
        .then(function() {
            window.location.href = "/adminPage";
        });
    };

    // console.log(modalID);
    
    //Pushes the new request to the database
    function upsertModal(editModal) {
        $.post("/adminPage", editModal)
        .then(getDestinations);
    };

    $(document).on("click", "#submitModalEdit", function(event) {
        event.preventDefault();
        modalID = "modal" + ($(this).data("id"));
        id = $(this).data("id");
        console.log("xxxx" + modalID);
        console.log("yyyyy" + id);
    });

    // Submit Edit Modal
    $(document).on("click", "#edit", function(event) {
        event.preventDefault();
        modalID = "modal" + ($(this).data("id"));
        id = $(this).data("id");
        console.log(modalID);
        console.log(id);
        console.log("why isn't this being logged?  this was hit");
    });

// ----------- Work in Progress End-------------------------------------


    $("#delete").on("click", handleLocationDelete);
    $("#approve").on("click", handleLocationUpdate);

    // Submit Request New Spot
    $("#submit").on("click", function(event) {
        event.preventDefault();
        // Wont submit the post if we are missing a desitnation name or address
        if (!destinationName.val().trim() || !destinationAddress.val().trim()) {
            
            // Change this to a modal
            alert("Please fill out all required areas");
            return;
        }
        // Constructing a newLocation object to hand to the database
        upsertDestination ({
            destination: destinationName.val().trim(),
            address: destinationAddress.val().trim(),
            description: destinationDescription.val().trim(),
            website: destinationWebsite.val().trim(),
            image: destinationImage.val().trim(),
            phoneNumber: destinationPhoneNumber.val().trim(),
            category: destinationCategory.val()
        });
        location.reload();
    });

    //Pushes the new request to the database
    function upsertDestination(newDestination) {
        $.post("/api/requestnewspot", newDestination)
        .then(getDestinations);
    };

    // Function for creating a new list row for new destinations
    function createDestinationRow(destinationData) {
        var newTr = $("<tr>");
        newTr.data("Destination", destinationData);
        newTr.append("<td>" + destinationData.destination + "</td>");
        newTr.append("<td> " + destinationData.address + "</td>");
        newTr.append("<td> " + destinationData.description + "</td>");
        newTr.append("<td> " + destinationData.image + "</td>");
        newTr.append("<td> " + destinationData.phoneNumber + "</td>");
        newTr.append("<td> " + destinationData.website + "</td>");
        newTr.append("<td> " + destinationData.category + "</td>");
        return newTr;
    };

    // Function for retrieving destinations and getting them ready to be rendered to the page
    function getDestinations() {
        $.get("/api/requestnewspot", function(data) {
        var rowsToAdd = [];
            for (var i = 0; i < data.length; i++) {
                rowsToAdd.push(createDestinationRow(data[i]));
            }
        });
    };

    // Removes Request from Database, Denied Request
    function handleLocationDelete(event) {
        event.preventDefault();
        var id = $(this).data("id");
        console.log("test");
        $.ajax({
            method: "DELETE",
            url: "/api/requestnewspot/" + id
        })
        .then(function() {
            window.location.href = "/adminPage";
        });
    };

    // Changes the Request to Approved in Database
    function handleLocationUpdate() {
        event.preventDefault();
        var id = $(this).data("id");
        console.log("This is the ID: " + id);
        $.ajax({
            method: "PUT",
            url: "/api/requestnewspot/",
            data: { approved: true, id: id }
        })
        .then(function() {
            window.location.href = "/adminPage";
        });
    };
});


