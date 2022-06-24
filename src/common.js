function handleToast(type, massage) {
    Toastify({
        text: massage,
        duration: 3000,
        style: {
            background: type === "error" ? "red" : "green",
        },
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
    }).showToast();
}