const body = document.querySelector('body').style,
    sign_in_btn = document.forms["form-1"]["reg-btn"],
    section = document.querySelector('section').style,
    header = document.querySelector('header').style,
    main = document.querySelector('main').style,
    sec_page_btn = document.querySelector('.sec-page-btn'),
    third_page_btn = document.querySelector('.third-page-btn'),
    fourth_page_btn = document.querySelector('.fourth-page-btn'),
    fifth_page_btn = document.querySelector('.fifth-page-btn'),
    cont_1 = document.querySelector('.cont-1').style,
    cont_2 = document.querySelector('.cont-2').style,
    cont_3 = document.querySelector('.cont-3').style,
    cont_4 = document.querySelector('.cont-4').style,
    result_page = document.querySelector('.result-page').style,
    page = document.querySelector('.page'),
    correct_que = document.querySelector('.correct_que'),
    wrong_que = document.querySelector('.wrong_que'),
    att_que = document.querySelector('.att_que'),
    status = document.querySelector('.status');

sign_in_btn.onclick = () => {
    section.height = "200vh";
    section.overflow = "hidden";
    header.opacity = "0";
    header.visibility = "hidden";
    main.opacity = "1";
    main.visibility = "visible";
    body.transition = "all 0.5s";
    body.overflow = "scroll";
    const username = document.forms["form-1"]["username"].value,
        userid = document.forms["form-1"]["userid"].value,
        _username = document.querySelectorAll('.username'),
        _userid = document.querySelectorAll('.userid');
    _username.forEach(name => name.innerHTML = username);
    _userid.forEach(id => id.innerHTML = userid);
    page.innerHTML = "1/4";
    alert("يُرجى الإجابة على جميع الأسئلة، وإذا لم تفعل، فسيتم احتساب العلامة صفرًا لهذا السؤال.");
}

[sec_page_btn, third_page_btn, fourth_page_btn, fifth_page_btn].forEach((btn, index) => {
    btn.onclick = () => {
        document.querySelector(`.cont-${index + 1}`).style.opacity = "0";
        document.querySelector(`.cont-${index + 1}`).style.visibility = "hidden";
        document.querySelector(`.cont-${index + 1}`).style.zIndex = "-1";
        document.querySelector(`.cont-${index + 2}`).style.opacity = "1";
        document.querySelector(`.cont-${index + 2}`).style.visibility = "visible";
        document.querySelector(`.cont-${index + 2}`).style.zIndex = "1";
        body.transition = "all 0.5s";
        page.innerHTML = `${index + 2}/4`;
    };
});

fifth_page_btn.onclick = () => {
    cont_4.opacity = "0";
    cont_4.visibility = "hidden";
    cont_4.zIndex = "-4";
    result_page.opacity = "1";
    result_page.visibility = "visible";
    result_page.zIndex = "3";
    section.height = "100vh";
    section.backgroundColor = "#1AA15F";
    section.overflow = "hidden";
    main.opacity = "0";
    main.visibility = "hidden";
    main.zIndex = "-5";
    body.transition = "all 0.5s";
    body.overflow = "hidden";
    status.innerHTML = correct_point >= 7 ? "ناجح" : "راسب";
    alert(correct_point >= 7 ? "لقد اجتزت الاختبار، انقر على الزر التالي لعرض نتيجتك" : "لقد فشلت في الاختبار، انقر على الزر التالي لعرض نتيجتك");
}

const correct_ans_arr = ["5", "4", "2", "7", "12", "50", "60", "24", "20", "10", "360", "110", "195", "0"];

function wrong_selection() {
    section.backgroundColor = "red";
    alert('إجابتك خاطئة! حاول مرة أخرى.');
}

let correct_point = 0;

function right_selection(value) {
    if (correct_ans_arr.includes(value.toString())) {
        correct_point++;
        section.backgroundColor = "#1AA15F";
        correct_que.innerHTML = correct_point;
        wrong_que.innerHTML = 20 - correct_point;
        att_que.innerHTML = "20";
    }
}
