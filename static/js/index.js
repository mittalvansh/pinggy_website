// ---------- try it yourself form ------

$("#techselect").on("change", function () {
  var label = $("option:selected", this).data("label");
  var command = $("option:selected", this).data("command");
  var port = $("option:selected", this).data("port");

  if (label) {
    if (label != $("#tryityourselflabel").text()) {
      $("#tryityourselflabel").animate({ opacity: 0 }, 400, function () {
        $(this).text(label).animate({ opacity: 1 }, 400);
      });
    }
    $("#tryityourselflabel").show("slow");
  } else {
    $("#tryityourselflabel").hide("slow");
  }

  if (command) {
    $("#tryityourselfprecommand").val(command);

    $("#tryityourselfprecommand").css("visibility", "visible");
    $("#copybutton2").css("visibility", "visible");

    $("#tryityourselfprecommand").animate({ opacity: 1 }, 1200);
    $("#copybutton2").animate({ opacity: 1 }, 1200);
  } else {
    $("#tryityourselfprecommand").animate({ opacity: 0 }, 1200);
    $("#copybutton2").animate({ opacity: 0 }, 1200);
    $("#tryityourselfprecommand").css("visibility", "hidden");
    $("#copybutton2").css("visibility", "hidden");
  }

  $("#portform").val(port).trigger("input");
});

$("#webdebuggerinput").change(function () {
  if ($("#webdebuggerinput").is(":checked")) {
    $("#webdebugurl").slideDown();
  } else {
    $("#webdebugurl").slideUp();
  }
  $("#portform").trigger("input");
});

$("#qrinput").change(function () {
  $("#portform").trigger("input");
});

// ---------- ------------

$("#portform").on("input", function () {
  $("#portcommand").val(
    "ssh -p 443 -R0:localhost:" +
      ($("#portform").val() || "8000") +
      ($("#webdebuggerinput").is(":checked") ? " -L4300:localhost:4300" : "") +
      ($("#qrinput").is(":checked") ? " qr@" : " ") +
      "a.pinggy.io"
  );
});

// =======================================================
function copytoclipboard(element, inputselector, amplitudemsg) {
  var portcommand = $(inputselector)[0];
  // Get the text field
  portcommand.select();
  portcommand.setSelectionRange(0, 99999); // For mobile devices
  // Copy the text inside the text field
  navigator.clipboard.writeText(portcommand.value);
  var amplitudeEvent = "SSH url copy button clicked";
  var eventProperties = {
    url: portcommand.value,
  };
  amplitude.getInstance().logEvent(amplitudeEvent, eventProperties);
  $(element).children("i").removeClass("bi-clipboard");
  $(element).children("i").addClass("bi-check");
  setTimeout(
    function (element) {
      $(element).children("i").removeClass("bi-check");
      $(element).children("i").addClass("bi-clipboard");
    },
    1000,
    element
  );
}

function trynow() {
  var amplitudeEvent = "Try now button clicked";
  var eventProperties = {};
  amplitude.getInstance().logEvent(amplitudeEvent, eventProperties);
  $("html, body").animate(
    {
      scrollTop: $("#bigcodecolumn").offset().top - 100,
    },
    1000
  );
  $("#bigcodecolumn").addClass("shadowhighlight");
  setTimeout(function () {
    $("#bigcodecolumn").removeClass("shadowhighlight");
  }, 2000);
}
function isEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}

function starttrial() {
  $("#emailinvalidtooltip").hide();
  var amplitudeEvent = "Trial button clicked";
  var eventProperties = {};
  amplitude.getInstance().logEvent(amplitudeEvent, eventProperties);
  var emailinput = $("#trialemail").val();
  if (isEmail(emailinput)) {
    var encoded = encodeURIComponent(emailinput);
    window.location = "https://dashboard.pinggy.io/starttrial?email=" + encoded;
  } else {
    $("#emailinvalidtooltip").show();
  }
}

// ---------------- price monthly yearly toggle -------------
$("#toggleswitch").change(function () {
  if (this.checked) {
    $(".monthly").hide();
    $(".yearly").show();
  } else {
    $(".yearly").hide();
    $(".monthly").show();
  }
});

// Download button system auto detect:

os_arch_to_link = {
  windows: {
    amd64: "pinggy_windows_386.exe",
  },
  linux: {
    amd64: "pinggy_linux_amd64",
  },
};

/*** typewriter ***/

$("#textchanger").teletype({
  delay: 70,
  pause: 3000,
  text: [
    "share your web apps!",
    "access your IoT devices!",
    "share your files!",
  ],
});
