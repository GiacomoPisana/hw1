let premiumLeave = false;
let dynamicPremiumLeave = false;

function functionPremiumMouseEnter(event) {
    element = document.querySelector('.dynamicPremium');
    element.classList.add('dynamicPremiumYes');
}

function nascondiDynamicPremium(){
    if (premiumLeave && dynamicPremiumLeave){
        element = document.querySelector('.dynamicPremium');
        element.classList.remove('dynamicPremiumYes');
        premiumLeave = false;
        dynamicPremiumLeave = false;
    }
}

function functionPremiumMouseLeave(event) {
    premiumLeave = true;
    nascondiDynamicPremium();
}

function functionDynamicPremiumMouseLeave(event){
    dynamicPremiumLeave = true;
    nascondiDynamicPremium();
}

const premium = document.querySelector('#header-items-navbar-flex-Premium');
premium.addEventListener('mouseenter', functionPremiumMouseEnter);
premium.addEventListener('mouseleave', functionPremiumMouseLeave);
const dynamicPremium = document.querySelector('.dynamicPremium');
dynamicPremium.addEventListener('mouseleave', functionDynamicPremiumMouseLeave);