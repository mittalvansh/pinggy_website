document.addEventListener("alpine:init", () => {
  Alpine.store("pinggyTunnelData", {
    advancedCommand(data) {
      let options = "";
      let headercommands = "";

      if (data.webDebugEnabled) {
        let webdebugoption = `-L${data.webDebugPort}:localhost:${data.webDebugPort}`;
        options += " " + webdebugoption;
      }

      if (!data.manuallyCheckKey) {
        options += " -o StrictHostKeyChecking=no";
      }

      if (data.keepAlive) {
        options += " -o ServerAliveInterval=30";
      }

      if (data.passwordCheck && data.basicusername && data.basicpass) {
        headercommands +=
          " " + `\\\"b:${data.basicusername}:${data.basicpass}\\\"`;
      }

      data.headerModifications.forEach((headerMod) => {
        const { mode, headername, headerval } = headerMod;
        const thiscommand = `\\\"${mode}:${headername}${
          headerval ? ":" + headerval : ""
        }\\\"`;
        headercommands += " " + thiscommand;
      });

      if (data.keyAuthentication) {
        const filteredAuthentications = data.keyAuthentications.filter(
          (keyauthval, i) => keyauthval !== "" || i === 0
        );
        headercommands += filteredAuthentications
          .reverse()
          .map((keyauthval, i) => ` \\\"k:${keyauthval}\\\"`)
          .join("");
      }

      if (data.ipWhitelistCheck) {
        const filteredIPs = data.ipWhitelist.filter(
          (ipval, i) => ipval !== "" || i === 0
        );
        filteredIPs.reverse();
        headercommands += ` \\\"w:${filteredIPs.join(",")}\\\"`;
      }

      if (headercommands != "") {
        options += " -t";
      }

      let command =
        `ssh -p 443${options} -R0:localhost:${data.localPort} ${
          data.mode !== "http" ? data.mode + "@" : ""
        }${data.qrCheck ? "qr@" : ""}a.pinggy.io` + headercommands;

      if (data.reconnect) {
        command =
          data.platformselect === "unix"
            ? `while true; do \n    ${command}; \nsleep 10; done`
            : `FOR /L %N IN () DO (${command}\ntimeout /t 10)`;
      }

      return command;
    },
  });
});

// Copy command button
$(".pinggytunnelshortcode").on(
  "click",
  ".pinggytunnelshortcode_copybutton",
  function () {
    navigator.clipboard.writeText(
      $(this).siblings(".pinggytunnelshortcode_advancedcommand").val()
    );
  }
);
