$(function () {
    loadRecipies();
    $("#recipePlace").on("click", ".btn-danger", handleDelete);
    $("#recipePlace").on("click", ".btn-warning", function () {
        // var btn = $(this);
        // var parenetDiv = btn.closest(".recipe");
        // let id = parenetDiv.attr("data-id");
        $.get(
            "https://usman-recipes.herokuapp.com/api/recipes/" + getId($(this)),
            function (response) {
                $("#updateRecipeId").val(response._id);
                $("#updateRecipeTitle").val(response.title);
                $("#updateRecipeBody").val(response.body);
                $("#updateModal").modal("show");
            }
        );
    });

    $("#addBtn").click(function () {
        addRecipe();
    });

    $("#updateBtn").click(function () {
        handleUpdate();
    });
});

function handleDelete() {
    $.ajax({
        type: "DELETE",
        url:
            "https://usman-recipes.herokuapp.com/api/recipes/" + getId($(this)),
        success: function (responce) {
            loadRecipies();
        },
    });
}

function handleUpdate() {
    var id = $("#updateRecipeId").val();
    var title = $("#updateRecipeTitle").val();
    var body = $("#updateRecipeBody").val();

    if (title == "") {
        $("#updateHelp").html(
            "Recipe Must Have a Titl with minimum 5 characters"
        );
    } else {
        $.ajax({
            type: "PUT",
            url: "https://usman-recipes.herokuapp.com/api/recipes/" + id,
            data: { title, body },
            error: function (err) {
                $("#updateHelp").html("There is something wrong, Try again!");
            },
            success: function (response) {
                $("#updateRecipeTitle").val("");
                $("#updateRecipeBody").val("");
                $("#updateHelp").html("");
                loadRecipies();
                $("#updateModal").modal("hide");
            },
        });
    }
}

function addRecipe() {
    var title = $("#addRecipeTitle").val();
    var body = $("#addRecipeBody").val();

    if (title.length < 5) {
        $("#Help").html(
            "New Recipe Must Have a Title with minimum 5 characters"
        );
    } else {
        $.ajax({
            type: "POST",
            url: "https://usman-recipes.herokuapp.com/api/recipes",
            data: { title, body },
            error: function (err) {
                $("#Help").html("There is something wrong, Try again!");
            },
            success: function (response) {
                $("#addRecipeTitle").val("");
                $("#addRecipeBody").val("");
                $("#Help").html("");
                loadRecipies();
                $("#addModal").modal("hide");
            },
        });
    }
}

function loadRecipies() {
    $.ajax({
        type: "GET",
        url: "https://usman-recipes.herokuapp.com/api/recipes",
        error: function (err) {
            $("#recipePlace").html("An Error Occured");
        },
        success: function (response) {
            $("#recipePlace").empty();
            for (let i = 0; i < response.length; i++) {
                $("#recipePlace")
                    .append(`<div class="recipe mb-3" data-id="${response[i]._id}">
                <h3>${response[i].title}</h3>
                <p>
                    <button class="btn btn-danger mb-3 float-end">
                        Delete
                    </button>
                    <button class="btn btn-warning mb-3 me-1 ms-2 float-end"  data-bs-toggle="modal" data-bs-target="#updateModal">
                        Edit
                    </button>
                    ${response[i].body} 
                </p>
                
            </div>`);
            }
            console.log(response);
        },
    });
}

function getId(btn) {
    var parenetDiv = btn.closest(".recipe");
    let id = parenetDiv.attr("data-id");
    return id;
}
