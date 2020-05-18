var helpers = {}

helpers.ifCond = (v1, operator, v2, options) => {
    switch (operator) {
        case '==':
            return (v1 == v2) ? options.fn(this) : options.inverse(this);
        case '===':
            return (v1 === v2) ? options.fn(this) : options.inverse(this);
        case '!=':
            return (v1 != v2) ? options.fn(this) : options.inverse(this);
        case '!==':
            return (v1 !== v2) ? options.fn(this) : options.inverse(this);
        case '<':
            return (v1 < v2) ? options.fn(this) : options.inverse(this);
        case '<=':
            return (v1 <= v2) ? options.fn(this) : options.inverse(this);
        case '>':
            return (v1 > v2) ? options.fn(this) : options.inverse(this);
        case '>=':
            return (v1 >= v2) ? options.fn(this) : options.inverse(this);
        case '&&':
            return (v1 && v2) ? options.fn(this) : options.inverse(this);
        case '||':
            return (v1 || v2) ? options.fn(this) : options.inverse(this);
        default:
            return options.inverse(this);
    }
}

helpers.increment = (value) => {
    return parseInt(value) + 1;
}

helpers.HTMLinputDate = (mongoDate) => {
    return new Date(mongoDate).toISOString().slice(0, 10)
}

helpers.friendlyDate = (yyyy_mm_dd) => {
    return new Date(yyyy_mm_dd).toDateString().slice(4)
}

helpers.friendlyNumber = (number) => {
    return parseFloat(number).toLocaleString('en')
}

helpers.friendlyCategory = (category) => {
    var lookup = {
        action_figures: "Action figures",
        animals: "Animals",
        construction_creative: "Construction and Creative toys",
        dolls: "Dolls",
        educational: "Educational toys",
        electronic: "Electronic toys",
        model_building: "Model building",
        spinning: "Spinning toys"
    }
    return lookup[category]
}

helpers.shortenName = (name) => {
    return name.length > 54 ? name.slice(0, 53) + " ..." : name
}

helpers.json = (object) => {
    return JSON.stringify(object)
}

module.exports = helpers
