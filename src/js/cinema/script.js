$(document).ready(function()
{
    printFilms( films, '#elements' );
    printFilters( films, properties, '#filters' );
    $('#filters input').change(function() {
        let curFilter = readCurFilters('#filters input', properties);
        let filteredFilms = applyFilters( films, curFilter, properties);
        printFilms( filteredFilms, '#elements' );

        let nameType = $(this).attr('name'),
            value = $(this).attr('value');
            // console.log(value)
        if (nameType == 'genre') {
            films.forEach(function(index) {
                if ((index.genre) == value) {
                    console.log(value);
                }
            })
        }
        // console.log(nameType);
        // printFilters( films, properties, '#filters' );
    });
});


function printFilms( arFilms, selector ) {

    const startTemplate = '<table style="width:80%;"><tr style="background-color:#EFEFEF;"><td>Название</td><td>Жанр</td><td>Год выпуска</td><td>Рейтинг Кинопоиск</td></tr>';
    const lileTemplate = '<tr><td>{{name}}</td><td>{{genre}}</td><td>{{year}}</td><td>{{rating}}</td></tr>';
    const endTemplate = '</table>';

    let output = startTemplate;
    for (let item of arFilms) {
        let tmpLine;
        tmpLine = lileTemplate.replace('{{name}}', item.name);
        tmpLine = tmpLine.replace('{{genre}}', item.genre);
        tmpLine = tmpLine.replace('{{year}}', item.year);
        tmpLine = tmpLine.replace('{{rating}}', item.rating);
        output += tmpLine;
    }

    output += endTemplate;
    $(selector).html(output);
}
function printFilters( arFilms, arProperties, selector ) {

    const startTemplate = '<br>{{name}}<br>';
    const lileTemplate = '<label><input type="checkbox" name="{{prop}}" value="{{name}}">{{name}}</label><br>';
    const endTemplate = '';

    let output = '';
    for (let prop in arProperties) {

        let tmpLine = startTemplate.replace('{{name}}', arProperties[prop]);
        let vals = [];
        for (let film of films) {
            if (!vals.includes(film[prop])) {
                vals.push(film[prop]);
            }
        }
        vals.sort();
        vals.forEach(function(item, index, array) {
            tmpLine += lileTemplate.replace("{{prop}}", prop ).replaceAll("{{name}}",item);
        });

        output += tmpLine;
    }

    output += endTemplate;
    $(selector).html(output);
}
/* / Ф выводящие фильтры слева */

function readCurFilters(selector, properties) {

    let result = [];
    for (let prop in properties) {
        result.push(prop);
        let searchIDs = $("#filters input[name='"+prop+"']:checkbox:checked").map(function(){
            return $(this).val();
        }).get();
        result[prop] = searchIDs;
    }
    return result;
}
function applyFilters( data, filter, properties) {

    let result = [];
    for (let film of data) {
        let ok = true;
        for (let prop in properties) {
            if (!filter[prop].length)
                continue;
            if (filter[prop].indexOf(film[prop]) === -1)
                ok = false;
        }
        if (ok) {
            result.push(film);
        };
    }
    return result;
}
