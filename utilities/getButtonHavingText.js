async function getButtonHavingText(buttons , text){
    return new Promise(async(resolve , reject) => {
        for(let i=0 ; i<buttons.length ; ++i){
            const btntext = await buttons[i].getText();
            console.log(btntext)
            if(text === btntext) resolve(buttons[i]);
        }
        reject("No button found");
    })
}

module.exports = getButtonHavingText;