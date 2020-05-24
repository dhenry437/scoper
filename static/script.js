// Rating Initialization
$(document).ready(function() {
    $('#rating').mdbRate();
});

// +=============================================================+
// |                                                             |
// |                        Form Handling                        |
// |                                                             |
// +=============================================================+

// Login
$("#loginSubmit").click(function() {
    // Validate
    var form = $(this.form)[0]
    if (form.checkValidity() === false) {
        form.classList.add('was-validated');
        return;
    }

    $.ajax({
        url: "login",
        method: "POST",
        data: {
            email: $("#loginModalEmail").val(),
            password: $("#loginModalPassword").val()
        },
        beforeSend: function() {
            $("#loginStatus").html('<div class="alert alert-secondary"><div class="d-flex justify-content-center"><div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div></div></div>')
        },
        error: function(data) {
            if (data.responseText.startsWith("Too")) {
                $("#loginStatus").html("<div class=\"alert alert-warning\">" + data.responseText + "</div>")
            } else {
                $("#loginStatus").html("<div class=\"alert alert-danger\">" + data.responseText + "</div>")
            }
        },
        success: function(data) {
            $("#loginStatus").html("<div class=\"alert alert-success\">" + data + "</div>")
            location.reload()
        }
    })
});

// Signup
$("#signupSubmit").click(function() {
    // Validate
    var form = $(this.form)[0]
    if (form.checkValidity() === false) {
        form.classList.add('was-validated');
        if (!validateConfirmPassword()) {
            return;
        }
        return;
    }

    $.ajax({
        url: "signup",
        method: "POST",
        data: {
            email: $("#signupEmail").val(),
            password: $("#signupPassword").val(),
            firstName: $("#signupFirstName").val(),
            lastName: $("#signupLastName").val(),
            username: $("#signupUsername").val(),
        },
        beforeSend: function() {
            $("#signupStatus").html('<div class="alert alert-secondary"><div class="d-flex justify-content-center"><div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div></div></div>')
        },
        error: function(data) {
            if (data.responseText.startsWith("Email") || data.responseText == "Username already in use") {
                $("#signupStatus").html("<div class=\"alert alert-warning\">" + data.responseText + "</div>")
            } else {
                $("#signupStatus").html("<div class=\"alert alert-danger\">" + data.responseText + "</div>")
            }
        },
        success: function(data) {
            $("#signupStatus").html('<div class=\"alert alert-success\">' + data + ', continue to <a href= "#" data-toggle="modal" data-target="#loginModal" onclick=hideModal("signupModal")>Login</a></div>')
        }
    })
});

// Forgot password
$("#forgotPasswordSubmit").click(function() {
    // Validate
    var form = $(this.form)[0]
    if (form.checkValidity() === false) {
        form.classList.add('was-validated');
        return;
    }

    $.ajax({
        url: "forgotpassword",
        method: "POST",
        data: {
            email: $("#forgotPasswordEmail").val(),
        },
        beforeSend: function() {
            $("#forgotPasswordStatus").html('<div class="alert alert-secondary"><div class="d-flex justify-content-center"><div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div></div></div>')
        },
        error: function(data) {
            if (data.responseText.startsWith("Email")) {
                $("#forgotPasswordStatus").html("<div class=\"alert alert-warning\">" + data.responseText + "</div>")
            } else {
                $("#forgotPasswordStatus").html("<div class=\"alert alert-danger\">" + data.responseText + "</div>")
            }
        },
        success: function(data) {
            $("#forgotPasswordStatus").html("<div class=\"alert alert-success\">" + data + ", Please check your email for a password reset link</div>")
        }
    })
});

// Change acount details open
$("#changeDetailsButton").click(function() {
    $.ajax({
        url: "changedetails",
        dataType: "json",
        method: "GET",
        beforeSend: function() {
            $("#changeDetailsStatus").html('<div class="alert alert-secondary"><div class="d-flex justify-content-center"><div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div></div></div>')

            $("form#changeDetailsForm input[type=text]").each(function() {
                var input = $(this);
                input.prop("disabled", true)
            });
        },
        success: function(data) {
            // var json = $.parseJSON(data);

            $("#changeDetailsUsername").attr('placeholder', data.username)
            $("#changeDetailsFirstName").attr('placeholder', data.firstName)
            $("#changeDetailsLastName").attr('placeholder', data.lastName)

            $("form#changeDetailsForm input[type=text]").each(function() {
                var input = $(this);
                input.prop("disabled", false)
            });

            $("#changeDetailsStatus").html('')
        }
    })
});

// Change acount details submit
$("#changeDetailsSubmit").click(function() {
    // Validate
    var form = $(this.form)[0]
    if (form.checkValidity() === false) {
        form.classList.add('was-validated');
        return;
    }

    $.ajax({
        url: "changedetails",
        method: "POST",
        data: {
            firstName: $("#changeDetailsFirstName").val(),
            lastName: $("#changeDetailsLastName").val(),
            username: $("#changeDetailsUsername").val(),
        },
        beforeSend: function() {
            $("#changeDetailsStatus").html('<div class="alert alert-secondary"><div class="d-flex justify-content-center"><div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div></div></div>')
        },
        error: function(data) {
            if (data.responseText.startsWith("Email") || data.responseText == "Username already in use") {
                $("#changeDetailsStatus").html("<div class=\"alert alert-warning\">" + data.responseText + "</div>")
            } else {
                $("#changeDetailsStatus").html("<div class=\"alert alert-danger\">" + data.responseText + "</div>")
            }
        },
        success: function(data) {
            $("#changeDetailsStatus").html('<div class=\"alert alert-success\">' + data + '</div>')
        }
    })
});

// Change password
$("#changePasswordButton").click(function() {
    $.ajax({
        url: "changepassword",
        method: "GET",
        success: function(data) {
            $("#changePasswordStatus").html('<div class=\"alert alert-success\">' + data + ', please check your emails</div>')
        }
    })
});

// Change password resend
$("#changePasswordResend").click(function() {
    $.ajax({
        url: "changepassword",
        method: "GET",
        beforeSend: function() {
            $("#changePasswordStatus").html('<div class="alert alert-secondary"><div class="d-flex justify-content-center"><div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div></div></div>')
        },
        success: function(data) {
            $("#changePasswordStatus").html('<div class=\"alert alert-success\">' + data + ', please check your emails</div>')
        }
    })
});

// Delete Account
$("#deleteAccountSubmit").click(function() {
    $.ajax({
        url: "deleteaccount",
        method: "GET",
        beforeSend: function() {
            $("#changePasswordStatus").html('<div class="alert alert-secondary"><div class="d-flex justify-content-center"><div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div></div></div>');
        },
        success: function(data) {
            $("#deleteAccountStatus").html('<div class=\"alert alert-success\">' + data + '</div>');

            location.reload();
        },
        error: function(data) {
            if (data.responseText.startsWith("Credentials")) {
                $("#deleteAccountStatus").html("<div class=\"alert alert-warning\">" + data.responseText + ", please relogin and try again</div>");
            } else {
                $("#deleteAccountStatus").html("<div class=\"alert alert-danger\">" + data.responseText + "</div>");
            }
        },
    })
});

// Validate confirm password
function validateConfirmPassword() {
    if ($("#signupConfirmPassword").val() == "" || $("#signupPassword").val() == "") {
        $("#signupConfirmPassword")[0].classList.remove('is-valid');
        $("#signupConfirmPassword")[0].classList.remove('is-invalid');
    } else if ($("#signupPassword").val() != $("#signupConfirmPassword").val()) {
        $("#signupConfirmPassword")[0].classList.remove('is-valid');
        $("#signupConfirmPassword")[0].classList.add('is-invalid');
        $("#signupConfirmPassword")[0].setCustomValidity("Passwords must match");
        return true;
    } else {
        $("#signupConfirmPassword")[0].classList.remove('is-invalid');
        $("#signupConfirmPassword")[0].classList.add('is-valid');
        $("#signupConfirmPassword")[0].setCustomValidity("");

        return false;
    }
}

function validatePassword() {
    var passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");

    if (passwordRegex.test($("#signupPassword").val())) {
        $("#signupPassword")[0].classList.remove('is-invalid');
        $("#signupPassword")[0].classList.add('is-valid');
    } else {
        $("#signupPassword")[0].classList.remove('is-valid');
        $("#signupPassword")[0].classList.add('is-invalid');
    }
}

$("#addReviewSubmit").click(function() {
    if (!validateAddReview()) {
        return
    }

    var form = $(this.form)[0]
    if (form.checkValidity() === false) {
        form.classList.add('was-validated');
        return;
    }

    console.log(placeResult);
    $.ajax({
        url: "reviews",
        method: "POST",
        data: {
            id: placeResult.result.id,
            streetAddress: placeResult.result.properties.address,
            suburb: placeResult.result.context[0].text,
            state: placeResult.result.context[3].text,
            postCode: placeResult.result.context[1].text,
            country: placeResult.result.context[4].text,
            lat: placeResult.result.geometry.coordinates[0],
            lon: placeResult.result.geometry.coordinates[1],
            name: placeResult.result.text,
            category: placeResult.result.properties.category,
            text: $("#addReviewText").val()
        },
        beforeSend: function() {
            $("#addReviewStatus").html('<div class="alert alert-secondary"><div class="d-flex justify-content-center"><div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div></div></div>')
        },
        success: function(data) {
            $("#addReviewStatus").html('<div class=\"alert alert-success\">' + data + '</div>')
        }
    })
});

function validateAddReview() {
    if (placeResult == undefined) {
        $("#addReviewStatus").html("<div class=\"alert alert-danger\">Select a place</div>");
        return false
    } else {
        $("#addReviewStatus").html("");
        return true
    }
}

// +=============================================================+
// |                                                             |
// |                       Modal Handling                        |
// |                                                             |
// +=============================================================+

function hideModal(modalID) {
    $("#" + modalID).modal('hide');
}

function showModal(modalID) {
    $("#" + modalID).modal('show');
}

// Clear modal forms on close
$('.modal').on('hidden.bs.modal', function() {
    // Reset form
    $(this).find('form')[0].reset();
    $(this).find('form')[0].classList.remove('was-validated');

    // Remove ajax status message
    $(this).find(".ajaxStatus").html("");

    // Need to remove validation that we added for password and confirm password
    $("#signupConfirmPassword")[0].classList.remove('is-valid');
    $("#signupConfirmPassword")[0].classList.remove('is-invalid');
    $("#signupPassword")[0].classList.remove('is-valid');
    $("#signupPassword")[0].classList.remove('is-invalid');
});