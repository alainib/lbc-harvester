console.clear();

var express = require("express");
var app = express();
const leboncoin = require("leboncoin-api");
var jsonfile = require("jsonfile");

var filtersIgnore = [
  "cheminés",
  "Davidson",
  "ressort",
  "gazon",
  "lapierre",
  "gamer",
  "pneus",
  "win10",
  "doudoune",
  "manger",
  "ampli",
  "amplificateur",
  "camescope",
  "casque",
  "casques",
  "classeur",
  "console",
  "consoles",
  "coolpix",
  "d-lux",
  "dlux",
  "enceinte",
  "enceintes",
  "finepix",
  "haut parleur",
  "jumelle",
  "laser",
  "lumix",
  "taille haie",
  "parabole",
  "montre",
  "perforateur",
  "médaille",
  "peugeot",
  "visseuse",
  "porte",
  "coulissante",
  "megapixel",
  "megapixels",
  "micro",
  "microscope",
  "minilux",
  "mixage",
  "nokia",
  "panasonic",
  "projecteur",
  "reparateur",
  "robot",
  "station",
  "telemetre",
  "disjoncteur",
  "telephone",
  "loue",
  "scanner",
  "clarinette",
  "moules",
  "fax",
  "numérique",
  "numerique",
  "informatique",
  "playmobil",
  "roue",
  "acer",
  "casques",
  "roue",
  "camping",
  "catamaran",
  "compteur électrique",
  "calculatrice",
  "encres",
  "encre",
  "billard",
  "chaise",
  "playmobil",
  "imprimante",
  "cartouche",
  "voiture",
  "vtt",
  "enceinte",
  "home cinéma",
  "laine",
  "tracteur",
  "tondeuse",
  "guitare",
  "vélo",
  "velo",
  "radiateur",
  "ikea",
  "trampoline",
  "bois",
  "medaille",
  "tonnelle",
  "canon 1Ds",
  "canon 5D",
  "canon 6D",
  "canon 7D",
  "canon D30",
  "canon D60",
  "canon 10D",
  "tuyau",
  "canon 20D",
  "canon 20Da",
  "canon 30D",
  "canon 40D",
  "canon 50D",
  "canon 60D",
  "canon 60Da",
  "canon 70D",
  "canon 77D",
  "canon 80D",
  "canon 300D",
  "canon DigitalRebel",
  "canon 350D",
  "canon RebelXT",
  "canon 400D",
  "canon RebelXTi",
  "canon 450D",
  "canon RebelXSi",
  "canon 500D",
  "canon RebelT1i",
  "canon 550D",
  "canon RebelT2i",
  "canon 600D",
  "canon RebelT3i",
  "canon 650D",
  "canon RebelT4i",
  "canon 700D",
  "canon RebelT5i",
  "canon 750D",
  "canon RebelT6i",
  "canon 760D",
  "canon RebelT6s",
  "canon 800D",
  "canon RebelT7i",
  "canon 1000D",
  "canon RebelXS",
  "canon 1100D",
  "canon RebelT3",
  "canon 1200D",
  "canon RebelT5",
  "canon 1300D",
  "canon RebelT6",
  "canon 100D",
  "vhs",
  "vtt"
];

let querys = {
  h: {
    fav: true,
    url:
      "samyang OR rokinon OR sony nex OR sony 6000 OR sony a6300 OR ilce OR sony a7 OR sony a7ii OR sony a7s OR sony fe"
  },
  g: {
    fav: true,
    url: "contax OR contarex OR icarex OR FLEKTOGON OR Rolleiflex OR asahi"
  },
  a: {
    fav: false,
    url:
      "35mm 1.2 OR 35mm 1.4 OR 35mm 1.8 OR 35mm 2 OR 35mm 2.8 OR 50mm 1.2 OR 50mm 1.4 OR 50mm 1.8 OR 50mm 2.8 OR 55mm 1.2 OR 55mm 1.4 OR 55mm 1.8 OR 55mm 2 OR 55mm 2.8 OR 50mm 2"
  },
  j: {
    fav: false,
    url:
      "minolta OR zeiss OR olympus OR canon OR nikon OR rollei OR rokkor OR contax OR yashica OR leica OR pentax "
  },
  b: {
    fav: false,
    url:
      "Contax OR Carl zeiss OR m42 OR bessa OR summicron OR argentique OR olympus om OR Minolta MD OR leicaflex OR leica"
  },
  c: {
    fav: false,
    url:
      "konica OR hexar OR konica OR Yashica OR Yashika OR Contax OR distagon OR pentax OR rokkor OR carl zeiss OR summicron OR elmarit OR sony nex OR minolta OR leitz OR m42 OR bessa OR voigtlander OR nokton OR wetzlar OR olympus om OR Voigtlander OR leicaflex OR leica OR argentique NOT lumix NOT panasonic NOT telemetre NOT laser NOT robot NOT nokia NOT jumelle NOT camescope NOT station NOT Classeur NOT projecteur NOT microscope NOT reparateur NOT coolpix NOT dlux NOT d-lux NOT megapixel NOT DOLMEN NOT abricar"
  },
  d: {
    fav: false,
    url:
      "50mm 1.2 OR 50mm 1.4 OR 50mm 1.6 OR 50mm 1.8 OR 50mm 2 OR 50mm 2.8 OR 50mm 3 OR 50mm 3.5 OR 50mm OR 52mm NOT lumix NOT panasonic NOT telemetre NOT laser NOT minilux NOT robot NOT nokia NOT jumelle NOT camescope NOT station NOT Classeur NOT projecteur NOT microscope NOT reparateur NOT coolpix NOT dlux NOT d-lux NOT megapixel NOT megapixels NOT mixage NOT ampli NOT finepix NOT amplificateur NOT camescope NOT enceinte NOT enceintes NOT micro NOT console NOT consoles NOT casques NOT casque NOT DOLMEN NOT abricar"
  },
  e: {
    fav: false,
    url:
      "35mm 1.2 OR 35mm 1.4  OR 35mm 1.6  OR 35mm 1.8  OR 35mm 2  OR 35mm 2.8  OR 35mm 3  OR 35mm 3.5  OR 35mm OR 57mm OR 24mm"
  },
  f: {
    fav: false,
    url: "50mm f1.2 OR  50mm F1,2 OR 50mm  F/1.2 OR 50mm F/1,2 OR 50mm 1:1,2 "
  },
  i: {
    fav: false,
    url:
      "100mm f2 OR 100mm f2.8 OR 135mm f2 OR 85mm OR 200mm 2.8 OR 200mm 2 OR 300mm 2.8 OR 400mm 2.8 OR 16-35mm "
  }
};

var lastids = {};

var createHtml = function(datafav, data) {
  cl("finish");
  datafav = tools_sortArrayOfObject(datafav, "timestamp");
  data = tools_sortArrayOfObject(data, "timestamp");

  var createAnnonceLi = function(annonce) {
    var htmltmp =
      '<li ><a target="_blank" href="' +
      annonce["link"] +
      '" title="' +
      annonce["title"] +
      '" class="list_item clearfix trackable" >';
    if (annonce["images"] != null && annonce["images"][0] != null) {
      htmltmp +=
        '<div class="item_image"><img style="display:block;  max-width: 250px;max-height: 150px;" content="' +
        annonce["images"][0] +
        '" src="' +
        annonce["images"][0] +
        '"></div>';
    }

    var d = new Date(annonce["date"]);
    htmltmp +=
      '<section class="item_infos">' +
      '<h2 class="item_title" itemprop="name"> ' +
      annonce["title"] +
      "</h2>" +
      "<p >à " +
      d.getHours() +
      ":" +
      d.getMinutes() +
      "   le  " +
      d.getUTCDate() +
      "/" +
      d.getMonth() +
      "/" +
      d.getFullYear() +
      "<br>" +
      annonce["location"]["department_name"] +
      " - " +
      annonce["location"]["city"] +
      "</p>" +
      '<h3 class="item_price" itemprop="price" content="750">' +
      annonce["price"] +
      "</h3>" +
      "</section>";

    htmltmp += "</a></li>";
    return htmltmp;
  };
  var html =
    "<!DOCTYPE html>" +
    "<html>" +
    "<head>" +
    '<meta charset="utf-8" />' +
    "<title>LBC harvester v1.5 !</title>" +
    '<link rel="stylesheet" type="text/css" href="//static.leboncoin.fr/css/beta_layout_70362.css">' +
    '<link rel="stylesheet" type="text/css" href="//static.leboncoin.fr/css/beta_styles_70362.css">' +
    "</head>" +
    '<body id="main" style="margin:50px;">' +
    "<h1>Nouvelles annonces seulement</h1>";

  html += "<h2>FAVORIS</h2><ul>";
  for (var i in datafav) {
    html += createAnnonceLi(datafav[i]);
  }
  html += " </ul><hr><br>";

  html += "<h2>Autre</h2><ul>";
  for (var i in data) {
    html += createAnnonceLi(data[i]);
  }
  html += " </ul>";

  html += "</body></html>";
  return html;
};

app.get("/reset", function(req, res) {
  resetLastIds();
  console.log("reset finish");
  startProcessing(res);
});

app.get("/", function(req, res) {
  startProcessing(res);
});

app.get("/test", function(req, res) {
  var search = new leboncoin.Search().setQuery("leica");

  search.run().then(function(data) {
    console.log("search", data);
    res.sendStatus(200);
  });
});

app.listen(3030, function() {
  console.log("Example app listening on port 3030!");
});

function startProcessing(res) {
  var finalresultats = [];
  var finalresultatsfav = [];
  var progression = 0;
  readLastIds();

  function getPage(idq, query, page, firstPageIds) {
    var search = new leboncoin.Search()
      .setPage(page)
      .setQuery(query["url"])
      .setFilter(leboncoin.FILTERS.PARTICULIER);
    /*
       verifie si toutes les pages on finit
       */
    function checkFinishAllPage() {
      progression++;
      var size = Object.keys(querys).length;
      if (progression >= size) {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(createHtml(finalresultatsfav, finalresultats));
        res.end();
      }
      writeLastIds();
    }

    /**
     * il faut récupérer les annonces d'une page (pagination) tant que on n'est pas sur une annonce deja vue
     * @param  idq : id de la requete ( a b c d...)
     * @param  ids : liste des ids temp
     */
    function checkFinishForThisPage(idq, ids, page) {
      if (page > 3) {
        return true;
      }
      for (var i in ids) {
        for (var l in lastids[idq]) {
          //	cl("search "+ids[i] + " == "+ lastids[idq][l]);
          if (ids[i] == lastids[idq][l]) {
            return true;
          }
        }
      }
      return false;
    }

    function cleanTitle(title) {
      var remove = ["+", "-", "(", ")", "[", "]"];
      for (var i in remove) {
        title = tools_replaceAll(title, remove[i], " ");
      }
      return title;
    }
    search.run().then(
      function(data) {
        var tempIds = []; // ids des annonces de la page courante
        // on rajoute toute les annonces de cette page

        console.log("length", JSON.stringify(data.results));

        for (var d in data.results) {
          var found = false;
          for (var l in lastids[idq]) {
            if (data.results[d]["id"] == lastids[idq][l]) {
              found = true;
            } else {
            }
          }
          // l'annonce na pas déja été ajoutée
          if (!found) {
            // on n'ajoute pas les annonces ayant un titre avec mot clé à ignorer

            data.results[d]["title"] = cleanTitle(data.results[d]["title"]);

            if (
              !tools_insideWordArray(data.results[d]["title"], filtersIgnore)
            ) {
              data.results[d]["timestamp"] = Date.parse(
                data.results[d]["date"]
              );
              if (query["fav"]) {
                tools_push_unique_object(
                  finalresultatsfav,
                  data.results[d],
                  "id"
                );
              } else {
                tools_push_unique_object(finalresultats, data.results[d], "id");
              }
            } else {
              cl("ignoring " + data.results[d]["title"]);
            }
          }

          tempIds.push(data.results[d]["id"]);
        }
        if (page == 1) {
          firstPageIds = tools_clone(tempIds);
        }

        if (checkFinishForThisPage(idq, tempIds, page)) {
          lastids[idq] = firstPageIds;
          checkFinishAllPage();
        } else {
          getPage(idq, query, ++page, firstPageIds);
        }
      },
      function(err) {
        console.error(err);
        checkFinishAllPage();
      }
    );
  }

  for (var q in querys) {
    getPage(q, querys[q], 1, []);
  }
}

// permet de recharger les users connectés en cas de crash ou de reload
var file = "./lastids.json";
var resetLastIds = function() {
  lastids = {};
  jsonfile.writeFile(file, { lastids: lastids }, function(err) {
    if (err) {
      console.error(err);
    }
  });
};
var writeLastIds = function() {
  if (!tools_defined(lastids)) {
    lastids = {};
  }
  jsonfile.writeFile(file, { lastids: lastids }, function(err) {
    if (err) {
      console.error(err);
    }
  });
};
var readLastIds = function() {
  jsonfile.readFile(file, function(err, obj) {
    if (tools_defined(obj)) {
      lastids = obj["lastids"];
    } else {
      lastids = {};
    }
  });
};

/**
 * tools function
 *
 */

var cl = function(data) {
  console.log(data);
};
var clj = function(data) {
  console.log("");
  console.log(JSON.stringify(data, undefined, 2));
  console.log("");
};

var clnj = function(astring, data) {
  console.log(astring);
  console.log(JSON.stringify(data, undefined, 2));
  console.log("---------------");
};

/***
 * test if object if defined
 * @param object
 * @returns {boolean}
 */
var tools_defined = function(object) {
  return (
    typeof object !== undefined &&
    typeof object !== "undefined" &&
    object !== null &&
    object !== ""
  );
};

/**
 * push the value in the array if it's not already in
 * @param arr
 * @param value
 * @returns {Array}
 */
function tools_push_unique(arr, value) {
  if (tools_defined(value)) {
    if (arr.indexOf(val) === -1) {
      arr.push(value);
    }
  }
}
/**
 * rajoute un object dans un tableau de facon unique
 * @param arr
 * @param obj
 * @param uniquefield
 * @returns {Array}
 */
function tools_push_unique_object(arr, obj, uniquefield) {
  if (!tools_defined(arr)) {
    arr = [];
  }
  if (tools_defined(obj) && tools_defined(obj[uniquefield])) {
    var found = false;
    for (var i in arr) {
      if (arr[i][uniquefield] == obj[uniquefield]) {
        found = true;
      }
    }
    if (!found) {
      arr.push(obj);
    }
  }
}

/**
 * order an array of object based on the field "fieldname" on the object
 * @param arr
 * @param fieldname
 */
function tools_sortArrayOfObject(arr, fieldname) {
  function compare(a, b) {
    var atmp = tools_isString(a[fieldname])
      ? a[fieldname].toLowerCase()
      : a[fieldname];
    var btmp = tools_isString(b[fieldname])
      ? b[fieldname].toLowerCase()
      : b[fieldname];
    if (atmp < btmp) return 1;
    if (atmp > btmp) return -1;
    return 0;
  }

  return arr.sort(compare);
}

function tools_isString(myVar) {
  return typeof myVar == "string" || myVar instanceof String;
}

/**
 * deep cloning
 * @param obj
 * @returns {Object}
 */
function tools_clone(obj) {
  //   return jQuery.extend(true, {}, obj);
  function clone(obj) {
    if (obj === null || typeof obj !== "object" || "isActiveClone" in obj)
      return obj;

    var temp = obj.constructor(); // changed

    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        obj["isActiveClone"] = null;
        temp[key] = clone(obj[key]);
        delete obj["isActiveClone"];
      }
    }
    return temp;
  }

  return clone(obj);
}

// cherche si searchOnString contient searchText
// sensé ne rechercher que les mots entier
function isMatch(searchOnString, searchText) {
  searchText = searchText.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
  return (
    searchOnString.match(new RegExp("\\b" + searchText + "\\b", "i")) != null
  );
}

function stringContain(str, substring) {
  return str.indexOf(substring) !== -1;
}

function tools_insideWordArray(word, array) {
  if (tools_defined(array) && tools_defined(word)) {
    word = word.toLowerCase();
    var length = array.length;
    for (var i = 0; i < length; i++) {
      array[i] = array[i].toLowerCase();
      if (isMatch(word, array[i])) {
        console.log(
          "ignoring : --" + word + "-- because of **" + array[i] + "**"
        );
        return true;
      }
    }
  }
  return false;
}

/**
 * replace all the occurence of "find" with "replace" in the "str" string
 * @param str
 * @param find
 * @param replace
 * @returns string
 *
 * http://stackoverflow.com/questions/1144783/replacing-all-occurrences-of-a-string-in-javascript
 */
function escapeRegExp(string) {
  return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}
function tools_replaceAll(str, find, replace) {
  if (str == null) {
    return null;
  }
  return str.replace(new RegExp(escapeRegExp(find), "g"), replace);
}
