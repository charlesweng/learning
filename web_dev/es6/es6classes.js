/**
 * Created by charlesweng on 1/8/18.
 */
class Language {
    constructor(name, founder, year) {
        this.name = name;
        this.founder = founder;
        this.year = year;
    }

    summary() {
        return this.name + " was created by " + this.founder + " in " + this.year;
    }

    history(lang = 'C', year = 1972) {
        return lang + " was created around the year " + year;
    }
}

class MetaLanguage extends Language {
    constructor(name, founder, year, version) {
        super(name, founder, year);
        this.version = version;
    }
}

var html = new MetaLanguage("HTML", "Tim Berners-Lee", "1991");
console.log(html.summary());
console.log(html.history());
