
const titleProjetRealiz = document.querySelector('#title-projet-realiz')
const tableTdLanguage = document.querySelector('#table-td-language')
const tableTdFramwork = document.querySelector('#table-td-framework')
const tableTdSgbd = document.querySelector('#table-td-sgbd')


const divRealizDiagrame = document.querySelector('#div-realiz-diagrame')

const idBtnRealize = document.querySelector('#divBtnRealize')
const listBtnShowRealiz = document.querySelectorAll('.btn-show-realiz')


function viewAchievementTableImg(folderImg, data, minefile, dataSize) {

    return `
        <img class="m-3" src="../public/img/${folderImg}/${data}.${minefile}" alt="${data}" title="${data}"
        style="width: ${dataSize};">
    `
}

function viewAchievDiagram(data) {
    return `
    <div class="p-3 w-50 scale div-border">
        <a class="" data-fancybox="real-ssg" data-src="${data.imgUrl}"
            data-caption="${data.caption}">
            <img class="w-100" src="${data.imgMiniUrl}"></a>

        <figcaption class="text-center">${data.figcaption}</figcaption>
    </div>
    `
}

// function viewBtnRealiz(data) {
//     return `<button class="btn-show-realiz">${data.title}</button>`
// }



function eachDataRender(datas, cookieValue) {

    // let chainBtn = "";
    let chaine = "";
    let chaine2 = "";
    let chaine3 = "";

    datas.forEach(element => {
        // console.log(element);

        // chainBtn += viewBtnRealiz(element);
        // idBtnRealize.innerHTML = chainBtn;

        if (element.title === cookieValue) {


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
                chaine2 += viewAchievementTableImg('framework', el.name, 'svg', el.sizeImg);
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
                tableTdSgbd.innerHTML = viewAchievementTableImg('sgbd', element.bataBase, element.mimeFileDataBase, element.sizeFileDataBase);


        }
    });

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

listBtnShowRealiz.forEach((elmBtn) => {
    elmBtn.addEventListener('click', (event) => {

        // console.log(elmBtn);
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

            txt += `<p>${elm}.</p>`

        })
        if (null != elmAddParent) {
            elmAddParent.innerHTML = txt

        }

    }

}


checkACookieExists()
