document.getElementById("dataForm").addEventListener("submit", function(e){
    e.preventDefault();

    const data = {
        tarih: document.getElementById("tarih").value,
        durdurulan: document.getElementById("durdurulan").value,
        satin: document.getElementById("satin").value,
        yeni: document.getElementById("yeni").value,
        not: document.getElementById("not").value
    };

    let existing = JSON.parse(localStorage.getItem("el_data")) || [];
    existing.push(data);
    localStorage.setItem("el_data", JSON.stringify(existing));

    document.getElementById("success").style.display = "block";
    setTimeout(() => {
        document.getElementById("success").style.display = "none";
    }, 2000);

    document.getElementById("dataForm").reset();
});
