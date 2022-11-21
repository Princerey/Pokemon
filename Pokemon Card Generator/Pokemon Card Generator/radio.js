const st = {};

st.flap = document.querySelector('#flap');
st.toggle = document.querySelector('.toggle');

st.yesCheck = document.querySelector('#yesCheck');
st.noCheck = document.querySelector('#noCheck');

st.flap.addEventListener('transitionend', () => {

    if (st.yesCheck.checked) {
        st.toggle.style.transform = 'rotateY(-15deg)';
        setTimeout(() => st.toggle.style.transform = '', 400);
    } else {
        st.toggle.style.transform = 'rotateY(15deg)';
        setTimeout(() => st.toggle.style.transform = '', 400);
    }

})

st.clickHandler = (e) => {

    if (e.target.tagName === 'LABEL') {
        setTimeout(() => {
            st.flap.children[0].textContent = e.target.textContent;
        }, 250);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    st.flap.children[0].textContent = st.noCheck.nextElementSibling.textContent;
});

document.addEventListener('click', (e) => st.clickHandler(e));