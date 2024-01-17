async function getButtonHavingText(driver , buttons , text){
    return new Promise(async(resolve , reject) => {
        for(let i=0 ; i<buttons.length ; ++i){
            let btntext = '';
            if(driver) btntext = await driver.executeScript('return arguments[0].textContent', buttons[i]);
            else btntext = await buttons[i].getText();
            console.log(btntext || 'no text');
            if(text === btntext) resolve(buttons[i]);
        }
        reject("No button found");
    })
}

module.exports = getButtonHavingText;