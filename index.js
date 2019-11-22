const request = require('request-promise');
const cheerio = require('cheerio');

const pricePattern = /[. €]/ig;
const spacePattern = /\s+/ig;

const getGehalt = function (bJahr) {
    return request.post(
        'https://www.brutto-netto-rechner.info/',
        {
            form: {
                "f_bruttolohn": bJahr,
                "f_abrechnungszeitraum": "jahr",
                "f_geld_werter_vorteil": 0,
                "f_abrechnungsjahr": 2019,
                "f_steuerfreibetrag": 0,
                "f_steuerklasse": 4,
                "f_kirche": "nein",
                "f_bundesland": "hessen",
                "f_alter": 39,
                "f_kinder": "ja",
                "f_kinderfreibetrag": 2,
                "f_krankenversicherung": "freiwillig_versichert",
                "f_private_kv": "",
                "f_arbeitgeberzuschuss_pkv": "ja",
                "f_KVZ": 0.8,
                "f_rentenversicherung": "pflichtversichert",
                "f_arbeitslosenversicherung": "pflichtversichert",
                "ok": 1
            }
        }).then(body => {
            const $ = cheerio.load(body);
            var nettoWerte = $('.right_column.orange.big b').text().replace(pricePattern, '').replace(spacePattern, ' ').replace(',', '.').trim().split(' ');
            console.log({ bMonat: bJahr / 12, bJahr, nMonat: parseFloat(nettoWerte[0]), nJahr: parseFloat(nettoWerte[1]) });
        });
}

return getGehalt(process.argv[2]);