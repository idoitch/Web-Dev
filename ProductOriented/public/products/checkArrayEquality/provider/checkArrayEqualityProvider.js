var currentScript = document.currentScript;

eval(currentScript.innerHTML);

(function () {

    var xhr = new XMLHttpRequest();

    xhr.open("get", "https://productoriented-c75a3.firebaseapp.com/products/checkArrayEquality/self/check-array-equality.html");

    xhr.send();

    xhr.onreadystatechange = function () {

        if (xhr.readyState == 4) {

            var res = xhr.responseText;
            var array = res.split("@");

            var link = array[0];
            var script = array[1].replace("<script>", "").replace("</script>", "");
            var webComponent = array[2];

            document.head.innerHTML = link;

            setTimeout(function () {

                eval(script);
                var inputFromClient = input();
                var strJson = JSON.stringify(inputFromClient);
                webComponent = webComponent.replace("INPUT", strJson);
                var div = document.createElement("div");
                div.innerHTML = webComponent;
                document.body.appendChild(div);

                var api = document.querySelector("check-array-equality").api;
                api.events.registerDoneEvent(function () {
                    output(api.data.output);
                });
            }, 500);
        }
    }
})();