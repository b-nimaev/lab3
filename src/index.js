import _ from 'lodash';
import { films, properties } from './js/cinema/films.js';
import './style.scss';
    printFilms( films, '#elements' );
    printFilters( films, properties, '#filters');
    $('#filters input').change(function() {

        var dataOfInput = {
          name: $(this).attr('name'),
          value: $(this).attr('value')
        }

        let curFilter = readCurFilters('#filters input', properties);
        let filteredFilms = applyFilters( films, curFilter, properties);
        printFilms( filteredFilms, '#elements' );


        // console.log(result)

        /*
        for (let i = 0; i < newresult.length; i++) {
          let typeOfName = newresult[i],
              inputsHasCurrentType = $(`input[name=${typeOfName}]`);
        }
        */
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

    const startTemplate = '<section class={{classname}}><h4>{{name}}</h4>';
    const lileTemplate = '<label><input type="checkbox" name="{{prop}}" value="{{name}}">{{name}}</label>';
    const endTemplate = '';

    let output = '';
    for (let prop in arProperties) {

        let tmpLine1 = startTemplate.replace('{{name}}', arProperties[prop]);
        let tmpLine = tmpLine1.replace('{{classname}}', prop[0]);
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

        output += tmpLine + '</section>';
    }

    output += endTemplate;
    $(selector).html(output);
}
/* / Ф выводящие фильтры слева */

function readCurFilters(selector, properties, films) {

    let result = [];

    for (let prop in properties) {

        result.push(prop);

        let searchIDs = $("#filters input[name='"+prop+"']:checkbox:checked").map(function() {
            return $(this).val();
        }).get();

        result[prop] = searchIDs;

    }
    return result;
}
function applyFilters( data, filter, properties) {

    let result = [];

    // $('input').prop('disabled', true);

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
    let tempArray = {
      film: [],
      props: []
    }
    var allowInputs = [];

    for (let i = 0; i < result.length; i++) { /* films finded */
      let obj = result[i]; /* current film */

      tempArray.film.push(result[i].name);

      for (let key in obj) {
        // console.log(key)
        if ((tempArray.props.indexOf(key) == -1) && (key !== 'name')) {
          tempArray.props.push(key);
        }
      }

      // console.log(obj)
      for (let prop in tempArray.props) {
        allowInputs.push(obj[tempArray.props[prop]])
      }
    }

    var inputs = $('input');
    inputs.prop('disabled', true);

    inputs.each(function() {
      // console.log($(this).val())
      if (!(allowInputs.indexOf($(this).val()) == -1)) {
        // console.log($(this).val())
        $(this).prop('disabled', false)
      }

    })

    console.log(allowInputs) /* fiml props */
    return result;
}
