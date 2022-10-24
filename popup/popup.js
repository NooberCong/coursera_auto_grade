document.getElementById("txt-val").addEventListener("change", (e) => {
  chrome.storage.sync.set({ txtVal: e.target.value });
});

document.getElementById("submit-btn").addEventListener("click", function () {
  chrome.tabs.query(
    { active: true, windowType: "normal", currentWindow: true },
    function (tabs) {
      let txtValue = document.getElementById("txt-val").value;
      if (!txtValue || txtValue.trim().length === 0) {
        txtValue = "By Coursera Auto Grade";
      }
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: function () {
          chrome.storage.sync.get(["txtVal"], (res) => {
            let { txtVal } = res;
            if (!txtVal || txtVal.trim().length === 0) {
              txtVal = "By Coursera Auto Grade";
            }
            const formParts = document.getElementsByClassName("rc-FormPart");
            for (const form of formParts) {
              let e = form.getElementsByClassName("option-input");
              e.length > 0 &&
                (console.log(e[e.length - 1]), e[e.length - 1].click());
              const t = form.getElementsByClassName(
                "c-peer-review-submit-textarea-field"
              );
              for (let l of t) {
                l.click();
                l.focus();
                document.execCommand("insertText", false, txtVal);
              }
            }

            setTimeout(() => {
              const submitBtn = document
                .getElementsByClassName("rc-FormSubmit")[0]
                .querySelector("button");
              submitBtn.click();
            }, 1000);
          });
        },
      });
    }
  );
});
