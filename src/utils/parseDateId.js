export function parseDateIdString(datestring) {

        //AAAAMMGG - formato dopo la fix apposta
        if (datestring.length === 8) {
                return {
                        year: datestring.substring(0, 4),
                        month: datestring.substring(4, 6),
                        day: datestring.substring(6, 8),
                }

        }
        //casi legacy con id sballati prendo solo anno/mese a una cifra sperando bene
        else {
                return {
                        year: datestring.substring(0, 4),
                        month: datestring.substring(4, 5),
                        day: null
                }
        }
}