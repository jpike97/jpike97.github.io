
//weird stuff
//simplemaps_usmap_mapdata.main_settings.state_description = get;
let dollarUS = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
});

function initEditData() { 
    for (var key in stateGDPJson) {
        if (stateGDPJson.hasOwnProperty(key)) {
            fillStateDesc(key, stateGDPJson[key]);
        }
    }
}

initEditData();

function fillStateDesc(stateName, stateGDP) { 

    let state = statesTitleCase.find(el => el.name === stateName);
    stateGDP = dollarUS.format(stateGDP);
    if (state != undefined) { 
        simplemaps_usmap_mapdata.state_specific[state.abbreviation]["description"] = "GDP (in millions) " + stateGDP;
    }
    
}