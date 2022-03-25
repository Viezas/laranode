class FormatDate {
    constructor() {
        if (this.constructor == FormatDate) {
            throw new Error("Can't instantiate abstract class!");
        }
    }

    static formatForDb() {
        const date = new Date();
        const yyyy = date.getFullYear();
        let mm = date.getMonth() + 1;
        let dd = date.getDate();
        let hh = date.getHours();
        let ii = date.getMinutes();
        let ss = date.getSeconds();
        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;

        return `${yyyy}-${mm}-${dd} ${hh}:${ii}:${ss}`;
    }
}

module.exports = {
    FormatDate
}