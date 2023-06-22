
const titleProjetRealiz = document.querySelector('#title-projet-realiz')
const tableTdLanguage = document.querySelector('#table-td-language')
const tableTdFramwork = document.querySelector('#table-td-framework')
const tableTdSgbd = document.querySelector('#table-td-sgbd')


const divRealizDiagrame = document.querySelector('#div-realiz-diagrame')


const listBtnShowRealiz = document.querySelectorAll('.btn-show-realiz')



function viewAchievementTableImg(folderImg, data, minefile, size) {


    return `
        <img class="m-3" src="../public/img/${folderImg}/${data}_logo.${minefile}" alt="${data}" title="${data}"
        style="width: ${size};">
    `
}

function viewAchievDiagram(data) {
    return `
    <div class="p-3 w-50 scale div-border">
        <a class="" data-fancybox="real-ssg" data-src="../public/img/realisation/suivie_seance/${data.nameFile}"
            data-caption="${data.caption}">
            <img class="w-100" src="../public/img/realisation/suivie_seance/${data.nameFile}"></a>

        <figcaption class="text-center">${data.figcaption}</figcaption>
    </div>
    `
}

function checkACookieExists() {

    let cookieValue = "";
    if (document.cookie.split(";").some((item) => item.trim().startsWith(`${KEY}=`))) {
        cookieValue = document.cookie.split(";").find((row) => row.startsWith(`${KEY}=`))?.split("=")[1];


        let dataRealisation = datas.realisation

        eachDataRender(dataRealisation, cookieValue);

    } else {
        console.log(`no found ${KEY}`);
    }


}

function eachDataRender(datas, cookieValue) {

    let chaine = "";
    let chaine2 = "";
    let chaine3 = "";

    datas.forEach(element => {

        if (element.title === cookieValue) {
            // console.log(element);

            if (null != titleProjetRealiz) {
                titleProjetRealiz.textContent = element.title;
            }

            let elementContent = element.content

            addNodeElemWithContent("#text-content-realiz", "p", "resum-projet-text", elementContent)

            element.language.forEach(el => {
                // console.log(el.name);
                chaine += viewAchievementTableImg('language', el.name, 'svg', '3rem');
                if (null != tableTdLanguage) {
                    tableTdLanguage.innerHTML = chaine
                }

            });


            element.frameWork.forEach(el => {
                // console.log(el.name);
                chaine2 += viewAchievementTableImg('framework', el.name, 'svg', '8rem');
                if (null != tableTdFramwork) {
                    tableTdFramwork.innerHTML = chaine2
                }

            });

            element.analyse.forEach(el => {
                // console.log(el.nameFile);
                chaine3 += viewAchievDiagram(el)
                if (null != divRealizDiagrame) {
                    divRealizDiagrame.innerHTML = chaine3
                }

            });

            // console.log(element.bataBase);
            if (null != tableTdSgbd)
                tableTdSgbd.innerHTML = viewAchievementTableImg('tools', element.bataBase, 'png', '5rem');


        }
    });

}


listBtnShowRealiz.forEach((elmBtn) => {
    elmBtn.addEventListener('click', (event) => {
        addCookie(event.currentTarget.textContent)
        checkACookieExists()

    })
})


function addNodeElemWithContent(elmIdParent, noeudCre, classNameParam, newContent) {

    let txt = "";

    let elmAddParent = document.querySelector(elmIdParent);

    let newNoeud = document.createElement(noeudCre.toUpperCase());
    newNoeud.setAttribute('class', classNameParam);

    let contentSplit = newContent.split('. ');

    if (contentSplit.length > 0) {

        contentSplit.forEach((elm) => {

            txt += `<p>${elm}</p>`

        })
        if (null != elmAddParent) {
            elmAddParent.innerHTML = txt
        }

    }

}


checkACookieExists()